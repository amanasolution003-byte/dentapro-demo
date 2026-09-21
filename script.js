/* ============================================================
   DentaPro Distribution — interactions du site vitrine
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Scroll progress bar ---------- */
  const progress = document.querySelector(".scroll-progress");
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    if (progress) progress.style.transform = `scaleX(${p})`;
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Navbar state ---------- */
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  const mobile = document.getElementById("navMobile");
  if (nav) {
    const toggleNav = () => {
      const scrolled = window.scrollY > 24;
      nav.classList.toggle("scrolled", scrolled);
    };
    window.addEventListener("scroll", toggleNav, { passive: true });
    toggleNav();
  }
  if (burger && mobile) {
    burger.addEventListener("click", () => {
      const open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mobile.hidden = open;
      document.body.style.overflow = open ? "" : "hidden";
    });
    mobile.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
        document.body.style.overflow = "";
      })
    );
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 60}ms`;
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("revealed"));
  }

  /* ---------- Animated counters ---------- */
  const fmtFr = new Intl.NumberFormat("fr-FR");
  const counters = document.querySelectorAll(".stat-num");
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      const display = decimals
        ? value.toLocaleString("fr-FR", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fmtFr.format(Math.round(value));
      el.textContent = display + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => cio.observe(el));
  } else {
    counters.forEach((el) => {
      el.textContent =
        fmtFr.format(parseFloat(el.dataset.count || "0")) + (el.dataset.suffix || "");
    });
  }

  /* ---------- Testimonials slider ---------- */
  const track = document.getElementById("sliderTrack");
  const dotsWrap = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("prevQuote");
  const nextBtn = document.getElementById("nextQuote");
  if (track) {
    const slides = Array.from(track.children);
    let index = 0;
    let timer = null;
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      if (i === 0) dot.classList.add("active");
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);
    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle("active", j === index));
    };
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);
    const play = () => {
      stop();
      timer = setInterval(next, 6000);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };
    prevBtn.addEventListener("click", () => { stop(); prev(); play(); });
    nextBtn.addEventListener("click", () => { stop(); next(); play(); });
    dots.forEach((d, i) =>
      d.addEventListener("click", () => { stop(); goTo(i); play(); })
    );
    track.addEventListener("mouseenter", stop);
    track.addEventListener("mouseleave", play);
    play();
  }

  /* ---------- Contact form (démo) ---------- */
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      if (!name || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        showToast("Veuillez renseigner un nom et un e-mail valides.", true);
        return;
      }
      showToast("✓ Merci ! Votre demande de devis a bien été transmise. (Démo)");
      form.reset();
    });
  }
  function showToast(msg, isError) {
    toast.textContent = msg;
    toast.classList.toggle("error", !!isError);
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 4500);
  }

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();