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

  const renderCard = (post) => `
          <article class="card post-card">
            <div class="post-category">${escapeHtml(post.category)}</div>
            <h3><a href="${escapeHtml(post.url)}">${escapeHtml(post.title)}</a></h3>
            <p>${escapeHtml(post.description)}</p>
            <div class="post-meta">
              <span>${escapeHtml(post.readTime)}</span>
              <a class="read-more" href="${escapeHtml(post.url)}">Ler artigo →</a>
            </div>
          </article>`;

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
