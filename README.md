# FamiliaUSA1 Blog

Blog estático em HTML e CSS para o projeto FamiliaUSA1, com foco em conteúdo para brasileiros que vivem, chegaram ou querem morar nos Estados Unidos.

## Estrutura

- `index.html` - página inicial
- `blog.html` - listagem de artigos
- `categorias.html` - categorias do blog
- `sobre.html` - página sobre o projeto
- `article.html` - template para novos artigos
- `articles/` - artigos publicados
- `assets/css/styles.css` - estilos globais
- `robots.txt` - instruções para buscadores
- `sitemap.xml` - mapa do site

## Publicação

Este projeto não usa framework nem build. Para publicar:

1. Suba todos os arquivos para um repositório no GitHub.
2. Ative GitHub Pages ou conecte o repositório na Vercel.
3. Configure o domínio final.
4. Atualize o domínio em `robots.txt` e `sitemap.xml` se for diferente de `https://familiausa1.com`.

## Como criar novos artigos

1. Duplique `article.html`.
2. Renomeie o arquivo usando letras minúsculas e hífens.
3. Mova o arquivo para a pasta `articles/`.
4. Atualize título, meta description, H1, conteúdo, fontes e links internos.
5. Adicione o novo artigo em `blog.html`, `categorias.html` e `sitemap.xml`.



