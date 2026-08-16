/* ==========================================================================
   Login page interactions (front-end only — no real backend)
   ========================================================================== */

function initAuthForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let valid = true;

    [email, password].forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "var(--color-danger)";
        valid = false;
      } else {
        field.style.borderColor = "";
      }
    });

    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = "در حال ورود...";
    btn.disabled = true;
    setTimeout(() => {
      showToast("ورود با موفقیت انجام شد.");
      btn.textContent = originalText;
      btn.disabled = false;
    }, 1000);
  });

  document.getElementById("googleBtn")?.addEventListener("click", () => {
    showToast("ادامه با Google در دسترس نیست (نسخه دمو).");
  });
}

document.addEventListener("DOMContentLoaded", initAuthForm);
