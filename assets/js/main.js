// Morocco Tours Hub — front-end behaviour
(function () {
  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    var scrolled = window.scrollY > 10;
    header.style.boxShadow = scrolled ? "0 6px 20px rgba(14,42,65,.08)" : "none";
    header.classList.toggle("is-scrolled", scrolled);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Close mobile nav when clicking the backdrop
  var mnav = document.getElementById("mnav");
  if (mnav) {
    mnav.addEventListener("click", function (e) {
      if (e.target === mnav) mnav.classList.remove("open");
    });
  }
})();

// Gallery lightbox
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery__item[data-lightbox]"));
  if (!items.length) return;
  var srcs = items.map(function (a) { return a.getAttribute("href"); });
  var i = 0;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML =
    '<button class="lightbox__btn lightbox__close" aria-label="Close">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
    '<button class="lightbox__btn lightbox__prev" aria-label="Previous">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></button>' +
    '<img alt="Tour photo">' +
    '<button class="lightbox__btn lightbox__next" aria-label="Next">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>' +
    '<div class="lightbox__count"></div>';
  document.body.appendChild(box);

  var imgEl = box.querySelector("img");
  var countEl = box.querySelector(".lightbox__count");
  function show(n) { i = (n + srcs.length) % srcs.length; imgEl.src = srcs[i]; countEl.textContent = (i + 1) + " / " + srcs.length; }
  function open(n) { show(n); box.classList.add("open"); document.body.style.overflow = "hidden"; }
  function close() { box.classList.remove("open"); document.body.style.overflow = ""; }

  items.forEach(function (a, idx) {
    a.addEventListener("click", function (e) { e.preventDefault(); open(idx); });
  });
  box.querySelector(".lightbox__close").addEventListener("click", close);
  box.querySelector(".lightbox__prev").addEventListener("click", function (e) { e.stopPropagation(); show(i - 1); });
  box.querySelector(".lightbox__next").addEventListener("click", function (e) { e.stopPropagation(); show(i + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(i - 1);
    else if (e.key === "ArrowRight") show(i + 1);
  });
})();

// Contact / enquiry form -> opens WhatsApp with the details pre-filled.
// (Browser validates required fields before this runs.)
function moroccoForm(form) {
  var wa = form.getAttribute("data-wa") || "";
  var lines = [];
  var fields = form.querySelectorAll(".form-field");
  for (var i = 0; i < fields.length; i++) {
    var ctrl = fields[i].querySelector("input, textarea, select");
    if (!ctrl) continue;
    var val = (ctrl.value || "").trim();
    if (!val) continue;
    var label = fields[i].querySelector("label");
    lines.push((label ? label.textContent.trim() + ": " : "") + val);
  }
  var body = "Hello Morocco Tours Hub,\n\n" + lines.join("\n");
  if (wa) window.open("https://wa.me/" + wa + "?text=" + encodeURIComponent(body), "_blank");
  var msg = form.querySelector("#formMsg");
  if (msg) {
    msg.style.display = "block";
    msg.textContent = "Opening WhatsApp to send your message — if it doesn't open, write to us at +212 621 460 083.";
  }
  return false;
}


/* Homepage destinations (phone): one arrow slides to the next group of cards; at the end it turns round and goes back */
(function () {
  var btn = document.querySelector('.hdest__arrow');
  if (!btn) return;
  var list = document.getElementById(btn.getAttribute('aria-controls'));
  if (!list) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function atEnd() { return list.scrollLeft >= list.scrollWidth - list.clientWidth - 2; }
  function update() {
    var back = atEnd();
    btn.classList.toggle('is-back', back);
    btn.setAttribute('aria-label', back ? 'Back to first destinations' : 'More destinations');
  }
  btn.addEventListener('click', function () {
    var behavior = reduce ? 'auto' : 'smooth';
    if (atEnd()) list.scrollTo({ left: 0, behavior: behavior });
    else list.scrollBy({ left: list.clientWidth + 12, behavior: behavior });
  });
  list.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
