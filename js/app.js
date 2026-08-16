/* ==========================================================================
   App-wide behavior shared across all pages
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initMobileDrawer();
  initCartDrawer();
  initRevealOnScroll();
  initCarousels();
  markActiveNavLink();
  renderCartDrawer();
});

/* ---- Sticky navbar background on scroll ---- */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---- Mobile drawer menu ---- */
function initMobileDrawer() {
  const toggle = document.querySelector(".navbar-mobile-toggle");
  const drawer = document.getElementById("mobileDrawer");
  const backdrop = document.getElementById("mobileDrawerBackdrop");
  const closeBtn = document.getElementById("mobileDrawerClose");
  if (!toggle || !drawer) return;

  function open() {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
  toggle.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

/* ---- Cart drawer ---- */
function initCartDrawer() {
  const drawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("cartBackdrop");
  const openBtns = document.querySelectorAll('[data-action="open-cart"]');
  const closeBtn = document.getElementById("cartDrawerClose");
  const continueBtn = document.getElementById("cartContinue");
  if (!drawer) return;

  function open() {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    renderCartDrawer();
  }
  function close() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }
  openBtns.forEach((btn) => btn.addEventListener("click", open));
  closeBtn?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  continueBtn?.addEventListener("click", close);

  document.getElementById("cartCheckout")?.addEventListener("click", () => {
    if (!getCart().length) return;
    showToast("در حال انتقال به تسویه‌حساب (نسخه دمو)...");
  });
}

/* ---- Scroll reveal ---- */
function initRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---- Horizontal carousel nav buttons ---- */
function initCarousels() {
  document.querySelectorAll(".carousel-wrap").forEach((wrap) => {
    const track = wrap.querySelector(".carousel-track");
    const prev = wrap.querySelector('[data-action="carousel-prev"]');
    const next = wrap.querySelector('[data-action="carousel-next"]');
    if (!track) return;
    const scrollAmount = () => track.clientWidth * 0.7;
    prev?.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount(), behavior: "smooth" }); // RTL: left = forward in visual reading order
    });
    next?.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });
  });
}

/* ---- Highlight active nav link ---- */
function markActiveNavLink() {
  const page = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar-links a, .mobile-drawer-nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}
