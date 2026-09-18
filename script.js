/* SCATE — script.js */
(function () {
  "use strict";

  /* Mobile navigation ---------------------------------------------------- */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });

    // Tap anywhere outside the menu to close it
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Reset if the phone is rotated back to a wide layout
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  function closeMenu() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  /* Hero banner: hide the image slot if the file is not there yet --------- */
  var banner = document.getElementById("hero-image");
  var fallback = document.getElementById("hero-fallback");
  if (banner && fallback) {
    banner.addEventListener("load", function () {
      fallback.hidden = true;
      banner.parentElement.hidden = false;
    });
    banner.addEventListener("error", function () {
      banner.parentElement.hidden = true;
    });
  }

  /* Gallery lightbox ----------------------------------------------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxTitle = document.getElementById("lightbox-title");
  var lightboxText = document.getElementById("lightbox-text");
  var lastFocused = null;

  function openLightbox(title, text) {
    if (!lightbox) return;
    lastFocused = document.activeElement;
    lightboxTitle.textContent = title;
    lightboxText.textContent = text;
    lightbox.classList.add("is-open");
    lightbox.querySelector(".lightbox-close").focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll("[data-gallery]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openLightbox(btn.dataset.gallery, btn.dataset.caption || "Photos coming soon.");
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox || e.target.classList.contains("lightbox-close")) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* Contact form --------------------------------------------------------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form && status) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent =
        "Thanks — this form is not connected yet. Add your form service or email address in script.js to start receiving messages.";
    });
  }

  /* Footer year ---------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
