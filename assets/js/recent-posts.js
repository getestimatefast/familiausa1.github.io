(function () {
  const featuredGrid = document.querySelector("[data-recent-posts-grid]");
  const latestList = document.querySelector("[data-latest-posts-list]");

  if (!featuredGrid && !latestList) {
    return;
  }

  const escapeHtml = (value) =>
    String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const editorial = {
    "articles/erros-financeiros-culturais-imigrantes-eua.html": {
      title: "Por que muitos brasileiros quebram nos EUA mesmo ganhando em dólar",
      image: "assets/images/articles/erros-financeiros-imigrantes-eua.webp",
      alt: "Brasileiros nos EUA organizando dinheiro para evitar erros financeiros",
      badge: "🔥 MAIS LIDO",
      badgeClass: "badge-hot",
    },
    "articles/5-habitos-comuns-no-brasil-problemas-eua.html": {
      title: "Coisas normais no Brasil que podem trazer problemas graves nos EUA",
      image: "assets/images/articles/habitos-brasil-problemas-eua.webp",
      alt: "Brasileiros aprendendo costumes que podem gerar problemas nos Estados Unidos",
      badge: "🚨 ALERTA",
      badgeClass: "badge-alert",
    },
    "articles/como-abrir-conta-em-banco-nos-eua.html": {
      title: "O que muitos brasileiros erram ao abrir conta bancária nos EUA",
      image: "assets/images/articles/custo-de-vida-eua.webp",
      alt: "Brasileiro abrindo conta bancária nos Estados Unidos",
      badge: "🆕 NOVO",
      badgeClass: "badge-new",
    },
    "articles/situacoes-causar-deportacao-problemas-legais-eua.html": {
      title: "O que pode colocar muitos brasileiros em risco nos EUA",
      image: "assets/images/articles/deportacao-problemas-legais-eua.webp",
      alt: "Imigrante brasileiro lendo documentos legais nos Estados Unidos",
      badge: "🚨 ALERTA",
      badgeClass: "badge-alert",
    },
    "articles/como-matricular-filho-na-escola-nos-eua.html": {
      image: "assets/images/articles/matricular-filho-escola-eua.webp",
      alt: "Família brasileira preparando matrícula de filho na escola dos Estados Unidos",
      badge: "🆕 NOVO",
      badgeClass: "badge-new",
    },
    "articles/custo-de-vida-nos-eua-2026-atualizado.html": {
      image: "assets/images/articles/custo-de-vida-eua.webp",
      alt: "Custos reais de brasileiros vivendo nos Estados Unidos",
      badge: "🔥 MAIS LIDO",
      badgeClass: "badge-hot",
    },
  };

  const renderCard = (post) => {
    const override = editorial[post.url] || {};
    const title = override.title || post.title;
    const media = override.image
      ? `
            <a class="post-thumb" href="${escapeHtml(post.url)}">
              <img src="${escapeHtml(override.image)}" alt="${escapeHtml(override.alt || title)}" loading="lazy" />
              ${override.badge ? `<span class="content-badge ${escapeHtml(override.badgeClass)}">${escapeHtml(override.badge)}</span>` : ""}
            </a>`
      : "";

    return `
          <article class="card post-card">
            ${media}
            <div class="post-category">${escapeHtml(post.category)}</div>
            <h3><a href="${escapeHtml(post.url)}">${escapeHtml(title)}</a></h3>
            <p>${escapeHtml(post.description)}</p>
            <div class="post-meta">
              <span>${escapeHtml(post.readTime)}</span>
              <a class="read-more" href="${escapeHtml(post.url)}">Ler artigo →</a>
            </div>
          </article>`;
  };

  const renderLatest = (post, index) => `
            <article class="latest-item">
              <div class="number">${index + 1}</div>
              <div>
                <a class="latest-title" href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a>
                <div class="latest-copy">${escapeHtml(post.description)}</div>
              </div>
            </article>`;

  fetch("assets/data/articles.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) throw new Error("Article index unavailable");
      return response.json();
    })
    .then((data) => {
      const posts = Array.isArray(data.articles) ? data.articles : [];
      if (!posts.length) return;

      if (featuredGrid) {
        featuredGrid.innerHTML = posts.slice(0, 6).map(renderCard).join("");
      }

      if (latestList) {
        latestList.innerHTML = posts.slice(0, 3).map(renderLatest).join("");
      }
    })
    .catch(() => {
      // Keep the static fallback content if the generated index is unavailable.
    });
})();
