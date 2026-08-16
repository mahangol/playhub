/* ==========================================================================
   Global search overlay (navbar) — instant, case-insensitive
   ========================================================================== */

function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.platform.toLowerCase().includes(q)
  ).slice(0, 8);
}

function searchResultItemHTML(p) {
  return `
  <a class="search-result-item" href="products.html?q=${encodeURIComponent(p.name)}">
    <div class="cover-art" style="${coverArtStyle(p.cover)}"></div>
    <div class="info">
      <div class="name en">${p.name}</div>
      <div class="meta en">${p.platform} · ${p.category}</div>
    </div>
    <span class="price">${formatToman(p.price)}</span>
  </a>`;
}

function initSearchOverlay() {
  const overlay = document.getElementById("searchOverlay");
  const backdrop = document.getElementById("searchBackdrop");
  const input = document.getElementById("searchOverlayInput");
  const resultsEl = document.getElementById("searchOverlayResults");
  const openBtns = document.querySelectorAll('[data-action="open-search"]');
  const closeBtn = document.getElementById("searchOverlayClose");
  if (!overlay || !input) return;

  function open() {
    overlay.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => input.focus(), 200);
  }
  function close() {
    overlay.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => btn.addEventListener("click", open));
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  input.addEventListener("input", () => {
    const results = searchProducts(input.value);
    if (!input.value.trim()) {
      resultsEl.innerHTML = `<p style="color:var(--color-muted);font-size:.85rem">نام بازی، دسته‌بندی یا پلتفرم را تایپ کنید…</p>`;
      return;
    }
    resultsEl.innerHTML = results.length
      ? results.map(searchResultItemHTML).join("")
      : emptyStateHTML("search");
  });

  input.addEventListener("input", () => {}); // instant search, no debounce needed at this catalog size
}

document.addEventListener("DOMContentLoaded", initSearchOverlay);
