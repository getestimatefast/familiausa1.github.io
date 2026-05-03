param(
  [switch]$Write
)

$ErrorActionPreference = "Stop"
$youtubePattern = '(?:youtube\.com/embed/|youtube\.com/watch\?v=|youtu\.be/)([A-Za-z0-9_-]{11})'

function Get-UniqueYoutubeIds {
  param([string]$Html)

  return [regex]::Matches($Html, $youtubePattern) |
    ForEach-Object { $_.Groups[1].Value } |
    Sort-Object -Unique
}

function Get-SchemaYoutubeIds {
  param([string]$Html)

  $ids = @()
  $blocks = [regex]::Matches(
    $Html,
    '<script type="application/ld\+json">([\s\S]*?)</script>'
  )

  foreach ($block in $blocks) {
    $json = $block.Groups[1].Value
    if ($json -notmatch 'VideoObject') { continue }
    $ids += [regex]::Matches($json, $youtubePattern) |
      ForEach-Object { $_.Groups[1].Value }
  }

  return $ids | Sort-Object -Unique
}

function Add-MissingVideoFields {
  param(
    [string]$Html,
    [string]$VideoId
  )

  $thumbnail = "https://img.youtube.com/vi/$VideoId/maxresdefault.jpg"
  $embedUrl = "https://www.youtube.com/embed/$VideoId"
  $contentUrl = "https://www.youtube.com/watch?v=$VideoId"
  $next = $Html

  if ($next -notlike "*`"thumbnailUrl`": `"$thumbnail`"*") {
    $next = $next.Replace(
      "`"embedUrl`": `"$embedUrl`"",
      "`"thumbnailUrl`": `"$thumbnail`",`n    `"embedUrl`": `"$embedUrl`""
    )
  }

  if ($next -notlike "*`"contentUrl`": `"$contentUrl`"*") {
    $next = $next.Replace(
      "`"embedUrl`": `"$embedUrl`"",
      "`"embedUrl`": `"$embedUrl`",`n    `"contentUrl`": `"$contentUrl`""
    )
  }

  return $next
}

$files = @()
$files += Get-ChildItem -Path . -Filter *.html -File
$files += Get-ChildItem -Path articles -Filter *.html -File
$failed = $false

foreach ($file in ($files | Sort-Object FullName)) {
  $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $file.FullName
  $embedIds = @(Get-UniqueYoutubeIds -Html $html)
  if ($embedIds.Count -eq 0) { continue }

  $schemaIds = @(Get-SchemaYoutubeIds -Html $html)
  $next = $html

  foreach ($id in $embedIds) {
    if ($schemaIds -notcontains $id) {
      Write-Error "$($file.FullName): missing VideoObject for YouTube video $id"
      $failed = $true
      continue
    }

    $next = Add-MissingVideoFields -Html $next -VideoId $id

    $required = @(
      "`"thumbnailUrl`": `"https://img.youtube.com/vi/$id/maxresdefault.jpg`"",
      "`"embedUrl`": `"https://www.youtube.com/embed/$id`"",
      "`"contentUrl`": `"https://www.youtube.com/watch?v=$id`"",
      "`"uploadDate`":"
    )

    foreach ($token in $required) {
      if ($next -notlike "*$token*") {
        Write-Error "$($file.FullName): missing $token for YouTube video $id"
        $failed = $true
      }
    }
  }

  if ($Write -and $next -ne $html) {
    Set-Content -Encoding UTF8 -NoNewline -LiteralPath $file.FullName -Value $next
    Write-Host "$($file.FullName): updated VideoObject schema"
  }
}

if ($failed) {
  exit 1
}

Write-Host "All YouTube embeds have complete VideoObject schema."
