# FamiliaUSA1 Blog

Blog estÃ¡tico em HTML e CSS para o projeto FamiliaUSA1, com foco em conteÃºdo para brasileiros que vivem, chegaram ou querem morar nos Estados Unidos.

## Estrutura

- `index.html` - pÃ¡gina inicial
- `blog.html` - listagem de artigos
- `categorias.html` - categorias do blog
- `sobre.html` - pÃ¡gina sobre o projeto
- `article.html` - template para novos artigos
- `articles/` - artigos publicados
- `assets/css/styles.css` - estilos globais
- `robots.txt` - instruÃ§Ãµes para buscadores
- `sitemap.xml` - mapa do site

## PublicaÃ§Ã£o

Este projeto nÃ£o usa framework nem build. Para publicar:

1. Suba todos os arquivos para um repositÃ³rio no GitHub.
2. Ative GitHub Pages ou conecte o repositÃ³rio na Vercel.
3. Configure o domÃ­nio final.
4. Atualize o domÃ­nio em `robots.txt` e `sitemap.xml` se for diferente de `https://familiausa1.com`.

## Como criar novos artigos

1. Duplique `article.html`.
2. Renomeie o arquivo usando letras minÃºsculas e hÃ­fens.
3. Mova o arquivo para a pasta `articles/`.
4. Atualize tÃ­tulo, meta description, H1, conteÃºdo, fontes e links internos.
5. Adicione o novo artigo em `blog.html`, `categorias.html` e `sitemap.xml`.

