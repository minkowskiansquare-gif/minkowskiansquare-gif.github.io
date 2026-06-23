// 805 Bookkeeping — light progressive enhancement (no dependencies)

document.addEventListener("DOMContentLoaded", () => {
  // Current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form → Formspree (AJAX, so visitors stay on the page)
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form && status) {
    const setStatus = (msg, kind) => {
      status.textContent = msg;
      status.className = "form-status" + (kind ? " " + kind : "");
    };
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      // Guard: form ID not configured yet
      if (form.action.includes("YOUR_FORM_ID")) {
        setStatus("Form isn't connected yet — please email 805.bkkpg@gmail.com.", "err");
        return;
      }
      const btn = form.querySelector("button[type=submit]");
      if (btn) btn.disabled = true;
      setStatus("Sending…", "");
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (res.ok) {
          form.reset();
          setStatus("Thanks! Your message is on its way — I'll reply within one business day.", "ok");
        } else {
          const data = await res.json().catch(() => ({}));
          const msg = data.errors ? data.errors.map((x) => x.message).join(", ") : null;
          setStatus(msg || "Something went wrong. Please email 805.bkkpg@gmail.com.", "err");
        }
      } catch {
        setStatus("Network error. Please email 805.bkkpg@gmail.com.", "err");
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("open", open);
    };
    toggle.addEventListener("click", () =>
      setOpen(toggle.getAttribute("aria-expanded") !== "true")
    );
    // Close after picking a link
    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
  }

  // Scroll-reveal: tag the major blocks, then fade them in on scroll
  const revealTargets = document.querySelectorAll(
    ".section-head, .card, .about-copy, .about-art, .why-item, .contact-card, .hero-inner"
  );
  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
  });

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealTargets.forEach((el) => io.observe(el));
});
