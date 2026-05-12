# Auditoria tecnica SEO - FamiliaUSA1

Data: 2026-05-08
Repositorio: getestimatefast/familiausa1.github.io

## Resumo executivo

O site ja possui uma boa base para SEO: paginas estaticas leves, meta title/description, canonical, Open Graph, sitemap, robots, arquivo de indice de artigos e home parcialmente dinamica via `assets/data/articles.json` + `assets/js/recent-posts.js`.

As principais oportunidades agora sao: corrigir schema de video, reforcar schema Article/BlogPosting em artigos, automatizar melhor o destaque da home, padronizar encoding UTF-8, reduzir canibalizacao entre artigos parecidos e transformar sitemap/artigos recentes em fluxo mais automatizado.

## Evidencias encontradas

- `index.html` tem Google Analytics, canonical, Open Graph, Twitter card, schema WebSite e video em destaque.
- `assets/js/recent-posts.js` atualiza a home a partir de `assets/data/articles.json`.
- `assets/data/articles.json` lista os artigos com titulo, descricao, categoria, URL, data, modified e readTime.
- `sitemap.xml` existe e aponta para varias URLs do site.
- `robots.txt` existe e aponta para o sitemap.

## Prioridade 1 - VideoObject

Problema: a home possui iframe de YouTube, mas precisa de JSON-LD `VideoObject` completo para evitar erros no Google Search Console.

Campos obrigatorios/recomendados:

- `@context`
- `@type: VideoObject`
- `name`
- `description`
- `thumbnailUrl`
- `uploadDate`
- `contentUrl`
- `embedUrl`

Exemplo recomendado para o video atual:

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Video em destaque do Familia USA 1",
  "description": "Conteudo real sobre vida nos Estados Unidos, custo de vida, imigracao, trabalho e adaptacao para brasileiros.",
  "thumbnailUrl": "https://img.youtube.com/vi/Gt50g-13d68/maxresdefault.jpg",
  "uploadDate": "2026-05-06",
  "contentUrl": "https://www.youtube.com/watch?v=Gt50g-13d68",
  "embedUrl": "https://www.youtube-nocookie.com/embed/Gt50g-13d68"
}
```

Observacao: se a data real do upload nao estiver disponivel no build, usar a data de publicacao/atualizacao da pagina como fallback.

## Prioridade 2 - Sitemap e robots

Status: ambos existem.

Melhorias recomendadas:

- Atualizar `lastmod` da home para a data mais recente do indice de artigos.
- Garantir que todo artigo em `assets/data/articles.json` esteja no `sitemap.xml`.
- Criar um script de geracao para evitar divergencia manual.
- Remover BOM/linhas finais extras para manter XML limpo.

## Prioridade 3 - Encoding e entidades HTML

Problema encontrado: algumas entradas do `articles.json` possuem entidades HTML escapadas como `imigra\u0026ccedil;\u0026atilde;o` em vez de UTF-8 normal.

Impacto:

- Snippets ruins na home.
- Possivel perda de profissionalismo visual.
- Potencial impacto em CTR.

Acao recomendada:

- Normalizar o JSON para UTF-8 sem entidades HTML.
- Remover BOM dos arquivos quando possivel.

## Prioridade 4 - Canibalizacao SEO

Artigos com possivel sobreposicao:

1. `trabalho-nos-eua-para-brasileiros-2026.html` e `como-conseguir-trabalho-nos-eua-sendo-brasileiro-guia-2026.html`
   - Definir um como guia principal de busca ampla.
   - O outro pode virar artigo complementar sobre indicacao/networking ou trabalhos iniciais.

2. `vale-a-pena-morar-nos-eua-2026.html` e `vale-a-pena-morar-nos-eua-em-2026-a-verdade-sem-filtro.html`
   - Definir um artigo pilar.
   - O outro deve ter angulo diferente, como relato pessoal/vida real.

3. `quanto-custa-viver-nos-eua.html`, `custo-de-vida-nos-eua-2026-atualizado.html` e `custo-de-vida-na-florida-2026-quanto-sobra.html`
   - Manter `custo-de-vida-nos-eua-2026-atualizado.html` como pilar nacional.
   - Manter Florida como artigo regional.
   - Usar o artigo mais antigo como guia resumido ou redirecionar internamente para o pilar.

## Prioridade 5 - Home automatica

Status atual: a home ja usa `recent-posts.js` para atualizar grid e lista de recentes.

Melhorias recomendadas:

- Tornar a manchete principal dinamica via `articles.json` ou um arquivo `featured.json`.
- Evitar manchete fixa antiga, principalmente noticias quentes.
- Criar campo `featured: true` no JSON para selecionar destaque.
- Fallback pode continuar no HTML, mas o conteudo dinamico deve substituir o bloco principal.

## Prioridade 6 - Article/BlogPosting

Recomendacao para todos os artigos:

- `Article` ou `BlogPosting` JSON-LD.
- `headline`.
- `description`.
- `datePublished`.
- `dateModified`.
- `author`.
- `publisher`.
- `mainEntityOfPage`.
- `inLanguage: pt-BR`.

Para artigos YMYL (imigracao, saude, seguranca):

- Secao Fontes.
- Aviso de conteudo informativo.
- Links oficiais quando houver dados.
- Data clara de atualizacao.

## Prioridade 7 - Performance, mobile e acessibilidade

Pontos positivos:

- CSS unico e leve.
- Layout responsivo com media queries.
- Iframe com `loading="lazy"`.
- Home usa `youtube-nocookie`.

Melhorias recomendadas:

- Adicionar `font-display` se fontes externas forem usadas no futuro.
- Garantir `alt` em todas as imagens de artigos.
- Adicionar foco visivel para links/botoes.
- Evitar iframes acima da dobra quando possivel ou usar facade/lite embed para YouTube.

## Plano de implementacao seguro

1. Criar branch `seo-technical-audit-fixes`.
2. Corrigir `VideoObject` na home.
3. Criar ou ajustar script para gerar sitemap a partir do JSON.
4. Normalizar `articles.json`.
5. Criar suporte para destaque dinamico da home.
6. Auditar templates de artigos para `BlogPosting`.
7. Abrir PR com checklist de validacao.

## Checklist de validacao pos-merge

- Testar Rich Results para home e artigos com video.
- Validar sitemap no Search Console.
- Validar robots.txt.
- Conferir home no mobile.
- Conferir se artigos recentes aparecem corretamente.
- Monitorar Search Console por 7 a 14 dias.
