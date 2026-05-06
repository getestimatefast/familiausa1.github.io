param(
  [string]$OutputPath = "assets/data/articles.json"
)

$ErrorActionPreference = "Stop"

function Get-FirstMatch {
  param(
    [string]$Text,
    [string]$Pattern
  )

  $match = [regex]::Match($Text, $Pattern, "IgnoreCase")
  if ($match.Success) {
    return (($match.Groups[1].Value -replace '<[^>]+>', '') -replace '\s+', ' ').Trim()
  }

  return ""
}

$articles = @()

foreach ($file in (Get-ChildItem -Path articles -Filter *.html -File | Sort-Object Name)) {
  $html = Get-Content -Raw -Encoding UTF8 -LiteralPath $file.FullName
  $title = Get-FirstMatch -Text $html -Pattern '<h1[^>]*>([\s\S]*?)</h1>'
  $description = Get-FirstMatch -Text $html -Pattern '<meta\s+name="description"\s+content="([^"]*)"[^>]*>'
  $category = Get-FirstMatch -Text $html -Pattern '<div class="eyebrow">([\s\S]*?)</div>'
  $date = Get-FirstMatch -Text $html -Pattern '"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})'
  $modified = Get-FirstMatch -Text $html -Pattern '"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})'
  $readTime = Get-FirstMatch -Text $html -Pattern '<span>(\d+\s*min[^<]*)</span>'

  if ([string]::IsNullOrWhiteSpace($title) -or [string]::IsNullOrWhiteSpace($date)) {
    continue
  }

  $articles += [pscustomobject]@{
    title = $title
    description = $description
    category = if ($category) { $category } else { "Vida nos EUA" }
    url = "articles/$($file.Name)"
    date = $date
    modified = if ($modified) { $modified } else { $date }
    readTime = if ($readTime) { $readTime } else { "8 min" }
  }
}

$articles = $articles | Sort-Object @{ Expression = "date"; Descending = $true }, @{ Expression = "modified"; Descending = $true }, @{ Expression = "url"; Descending = $false }
$output = @{ generatedAt = (Get-Date -Format "yyyy-MM-dd"); articles = $articles }
$json = $output | ConvertTo-Json -Depth 5
$directory = Split-Path -Parent $OutputPath

if (-not (Test-Path -LiteralPath $directory)) {
  New-Item -ItemType Directory -Path $directory | Out-Null
}

Set-Content -Encoding UTF8 -LiteralPath $OutputPath -Value $json
Write-Host "Article index generated at $OutputPath with $($articles.Count) articles."
