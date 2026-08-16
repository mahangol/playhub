/* ==========================================================================
   Product rendering + catalog logic
   ========================================================================== */

function coverArtStyle(cover) {
  return `--c-from:${cover.from};--c-to:${cover.to};--c-accent:${cover.accent}`;
}

function coverArtHTML(cover, title, showTitle) {
  return `<div class="cover-art" style="${coverArtStyle(cover)}">${
    showTitle ? `<span class="cover-title en">${title}</span>` : ""
  }</div>`;
}

function starsHTML(rating) {
  let out = "";
  for (let i = 1; i <= 5; i++) {
    out += icon(i <= rating ? "star" : "starOutline");
  }
  return out;
}

function badgeLabel(tag) {
  if (tag === "sale") return "تخفیف";
  if (tag === "new") return "جدید";
  if (tag === "popular") return "پرطرفدار";
  return "";
}

function productCardHTML(p) {
  const wishlisted = isWishlisted(p.id);
  return `
  <article class="product-card" data-id="${p.id}">
    <div class="product-card-media">
      ${coverArtHTML(p.cover, p.name, true)}
      ${p.tag ? `<span class="product-badge ${p.tag}">${badgeLabel(p.tag)}</span>` : ""}
      <button class="wishlist-btn ${wishlisted ? "active" : ""}" data-action="wishlist" data-id="${p.id}" aria-label="افزودن به علاقه‌مندی‌ها" aria-pressed="${wishlisted}">
        ${icon("heart")}
      </button>
      <span class="platform-chip en">${p.platform}</span>
    </div>
    <div class="product-card-body">
      <h3 class="product-name en" title="${p.name}">${p.name}</h3>
      <div class="product-meta">
        <span class="en">${p.platform} · ${p.category}</span>
        <span class="product-rating">${starsHTML(p.rating)}</span>
      </div>
      <div class="product-price-row">
        <span class="product-price">${formatToman(p.price)}</span>
        ${p.oldPrice ? `<span class="product-price-old">${formatToman(p.oldPrice)}</span>` : ""}
      </div>
      <button class="product-add-btn" data-action="add-cart" data-id="${p.id}">
        ${icon("cart")}
        <span>افزودن به سبد خرید</span>
      </button>
    </div>
  </article>`;
}

function categoryCardHTML(cat) {
  return `
  <a href="products.html${cat.filterKey ? `?${cat.filterKey}=${cat.filterVal}` : ""}" class="category-card">
    ${coverArtHTML(cat.cover, "", false)}
    <div class="category-card-body">
      <h3>${cat.label}</h3>
      <span class="arrow">${icon("arrowLeft")}</span>
    </div>
  </a>`;
}

function renderInto(selector, items, renderFn, emptyHTML) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (!items.length && emptyHTML) {
    el.innerHTML = emptyHTML;
    return;
  }
  el.innerHTML = items.map(renderFn).join("");
}

/* ---- Filtering / sorting (used on products.html) ---- */
function applyFilters(products, state) {
  let result = products.slice();

  if (state.query) {
    const q = state.query.trim().toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.platform.toLowerCase().includes(q)
    );
  }
  if (state.platforms && state.platforms.length) {
    result = result.filter((p) => state.platforms.includes(p.platform));
  }
  if (state.genres && state.genres.length) {
    result = result.filter((p) => state.genres.includes(p.category));
  }

  switch (state.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "popular":
      result.sort((a, b) => (b.tag === "popular") - (a.tag === "popular"));
      break;
    case "newest":
    default:
      result.sort((a, b) => (b.tag === "new") - (a.tag === "new") || b.id - a.id);
  }

  return result;
}

function emptyStateHTML(type) {
  const map = {
    search: {
      icon: "emptySearch",
      title: "نتیجه‌ای پیدا نشد",
      text: "عبارت دیگری را جستجو کنید یا فیلترها را تغییر دهید.",
    },
    filter: {
      icon: "emptySearch",
      title: "بازی‌ای با این فیلترها پیدا نشد",
      text: "می‌توانید فیلترها را بازنشانی کرده و دوباره تلاش کنید.",
    },
    cart: {
      icon: "emptyCart",
      title: "سبد خرید شما خالی است",
      text: "هنوز بازی‌ای به سبد خرید اضافه نکرده‌اید.",
    },
    wishlist: {
      icon: "emptyHeart",
      title: "لیست علاقه‌مندی‌ها خالی است",
      text: "بازی‌های مورد علاقه‌تان را با ضربه روی قلب ذخیره کنید.",
    },
  };
  const d = map[type] || map.search;
  return `
    <div class="empty-state">
      <span class="icon">${icon(d.icon)}</span>
      <h3>${d.title}</h3>
      <p>${d.text}</p>
    </div>`;
}
