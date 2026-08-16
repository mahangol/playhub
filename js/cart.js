/* ==========================================================================
   Cart + Wishlist — localStorage-backed state
   ========================================================================== */

const STORAGE_CART = "playhub_cart";
const STORAGE_WISHLIST = "playhub_wishlist";

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    /* storage unavailable — fail silently */
  }
}

function getCart() {
  return readStorage(STORAGE_CART, []); // [{id, qty}]
}
function setCart(cart) {
  writeStorage(STORAGE_CART, cart);
  updateCartBadge();
}
function getWishlist() {
  return readStorage(STORAGE_WISHLIST, []); // [id]
}
function setWishlist(list) {
  writeStorage(STORAGE_WISHLIST, list);
}
function isWishlisted(id) {
  return getWishlist().includes(id);
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  setCart(cart);
  const product = PRODUCTS.find((p) => p.id === id);
  if (product) showToast(`${product.name} به سبد خرید اضافه شد.`);
  renderCartDrawer();
}

function removeFromCart(id) {
  setCart(getCart().filter((i) => i.id !== id));
  renderCartDrawer();
}

function updateCartQty(id, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    setCart(cart.filter((i) => i.id !== id));
  } else {
    setCart(cart);
  }
  renderCartDrawer();
}

function toggleWishlist(id, btnEl) {
  let list = getWishlist();
  const active = list.includes(id);
  if (active) {
    list = list.filter((i) => i !== id);
  } else {
    list.push(id);
  }
  setWishlist(list);
  if (btnEl) {
    btnEl.classList.toggle("active", !active);
    btnEl.setAttribute("aria-pressed", String(!active));
    btnEl.classList.remove("pulse");
    void btnEl.offsetWidth;
    btnEl.classList.add("pulse");
  }
  const product = PRODUCTS.find((p) => p.id === id);
  if (product && !active) showToast(`${product.name} به علاقه‌مندی‌ها اضافه شد.`);
}

function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function cartTotal() {
  return getCart().reduce((sum, i) => {
    const p = PRODUCTS.find((pp) => pp.id === i.id);
    return sum + (p ? p.price * i.qty : 0);
  }, 0);
}

function updateCartBadge() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    const count = cartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

function cartItemHTML(item, product) {
  return `
  <div class="cart-item" data-id="${product.id}">
    <div class="cover-art" style="${coverArtStyle(product.cover)}"></div>
    <div class="cart-item-info">
      <span class="name en">${product.name}</span>
      <span class="en" style="color:var(--color-muted);font-size:.78rem">${product.platform}</span>
      <div class="cart-item-qty">
        <button class="qty-btn" data-action="qty-dec" data-id="${product.id}" aria-label="کاهش تعداد">${icon("minus")}</button>
        <span class="en" style="min-width:18px;text-align:center">${item.qty}</span>
        <button class="qty-btn" data-action="qty-inc" data-id="${product.id}" aria-label="افزایش تعداد">${icon("plus")}</button>
      </div>
    </div>
    <div class="cart-item-actions">
      <button class="cart-item-remove" data-action="remove" data-id="${product.id}" aria-label="حذف از سبد خرید">${icon("trash")}</button>
      <span class="product-price">${formatToman(product.price * item.qty)}</span>
    </div>
  </div>`;
}

function renderCartDrawer() {
  const listEl = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  if (!listEl) return;
  const cart = getCart();

  if (!cart.length) {
    listEl.innerHTML = emptyStateHTML("cart");
  } else {
    listEl.innerHTML = cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.id);
        return product ? cartItemHTML(item, product) : "";
      })
      .join("");
  }
  if (totalEl) totalEl.textContent = formatToman(cartTotal());
  updateCartBadge();
}

/* Delegated click handling for cart/wishlist actions anywhere on the page */
document.addEventListener("click", (e) => {
  const wishBtn = e.target.closest('[data-action="wishlist"]');
  if (wishBtn) {
    toggleWishlist(Number(wishBtn.dataset.id), wishBtn);
    return;
  }
  const addBtn = e.target.closest('[data-action="add-cart"]');
  if (addBtn) {
    addToCart(Number(addBtn.dataset.id));
    return;
  }
  const decBtn = e.target.closest('[data-action="qty-dec"]');
  if (decBtn) {
    updateCartQty(Number(decBtn.dataset.id), -1);
    return;
  }
  const incBtn = e.target.closest('[data-action="qty-inc"]');
  if (incBtn) {
    updateCartQty(Number(incBtn.dataset.id), 1);
    return;
  }
  const removeBtn = e.target.closest('[data-action="remove"]');
  if (removeBtn) {
    removeFromCart(Number(removeBtn.dataset.id));
    return;
  }
});

/* Toast notifications */
function showToast(message) {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span class="icon">${icon("check")}</span><p>${message}</p>`;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("leaving");
    setTimeout(() => toast.remove(), 280);
  }, 2600);
}
