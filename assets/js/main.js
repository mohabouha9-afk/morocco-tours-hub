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

/* Homepage tour sliders (desert tours, day excursions): prev/next arrows move one view of cards; each arrow hides at its end */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.htours__track').forEach(function (track) {
    var prev = track.querySelector('.htours__nav--prev');
    var next = track.querySelector('.htours__nav--next');
    if (!prev || !next) return;
    var list = document.getElementById(next.getAttribute('aria-controls'));
    if (!list) return;
    function step(dir) {
      list.scrollBy({ left: dir * (list.clientWidth + 20), behavior: reduce ? 'auto' : 'smooth' });
    }
    function update() {
      prev.disabled = list.scrollLeft <= 6;
      next.disabled = list.scrollLeft >= list.scrollWidth - list.clientWidth - 6;
    }
    prev.addEventListener('click', function () { step(-1); });
    next.addEventListener('click', function () { step(1); });
    list.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})();

/* homepage footer: link lists are open on tablet/laptop, tap-to-open on phones */
(function () {
  var cols = document.querySelectorAll('.hfoot__col');
  if (!cols.length) return;
  var wide = window.matchMedia('(min-width: 768px)');
  function sync() { cols.forEach(function (d) { d.open = wide.matches; }); }
  cols.forEach(function (d) {
    d.addEventListener('toggle', function () { if (wide.matches && !d.open) d.open = true; });
  });
  if (wide.addEventListener) wide.addEventListener('change', sync); else wide.addListener(sync);
  sync();
})();

/* day-trip pages: hide the phone booking bar while the booking box itself is on screen */
(function () {
  var bar = document.querySelector('.dt-mbar'), box = document.querySelector('.dt-book');
  if (!bar || !box || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (e) { bar.classList.toggle('is-hidden', e[0].isIntersecting); }).observe(box);
})();

/* day-trip route map: real map (OpenStreetMap via Leaflet) + our route along the real roads,
   gold icon pins with labels, a drive-time tag and an 8-point star compass (N/E/S/W).
   Data lives in each figure's <script type="application/json" class="rmap__data"> (built by .claude/tools/route-map.mjs). */
(function () {
  var maps = document.querySelectorAll('.rmap');
  if (!maps.length || !window.L) return;
  var I = {
    hotel: '<path d="M3 18V8M3 13h18v5M21 18v-5a3 3 0 00-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.8"/>',
    helmet: '<path d="M4 15a8 8 0 0116 0v2H4z"/><path d="M12 7v4M4 15h8"/>',
    tea: '<path d="M5 9h11v5a5 5 0 01-5 5h-1a5 5 0 01-5-5z"/><path d="M16 11h1.5a2 2 0 010 4H16M9 3c0 1.5 1.5 1.5 1.5 3M12.5 3c0 1.5 1.5 1.5 1.5 3"/>',
    view: '<path d="M3 19l6-8 4 5 3-3 5 6z"/><circle cx="17" cy="7" r="2.2"/>',
    pass: '<path d="M2 19l7-11 4 6 2-3 7 8z"/><path d="M9 8l1.5 3"/>',
    kasbah: '<path d="M4 20V9l2-1.5L8 9v-3h3v3l1-1 1 1V6h3v3l2-1.5L20 9v11z"/><path d="M10 20v-4h4v4M7 12h1M16 12h1"/>',
    film: '<rect x="3" y="9" width="18" height="11" rx="1.5"/><path d="M3 9l2.5-4.5L21 4.5 21 9M8 4.6L6.8 9M13 4.5l-1.2 4.5M18 4.5L16.8 9"/>',
    quad: '<circle cx="6.5" cy="16.5" r="3"/><circle cx="17.5" cy="16.5" r="3"/><path d="M9.5 16.5h5M6.5 13.5L9 8h5l3.5 5.5M12 8V5.5"/>',
    tent: '<path d="M3 20L12 5l9 15z"/><path d="M12 5v15M9 20l3-5 3 5"/>',
    river: '<path d="M3 8c3-2 5 2 9 0s6-2 9 0M3 13c3-2 5 2 9 0s6-2 9 0M3 18c3-2 5 2 9 0s6-2 9 0"/>',
    falls: '<path d="M4 4h16M7 4v9M12 4v12M17 4v9"/><path d="M4 19c2.5-1.5 5-1.5 8 0s5.5 1.5 8 0"/>',
    peak: '<path d="M3 20l6.5-11 3.5 5 2.5-3.5L21 20z"/><path d="M8 11.5l1.5-2.5 1.5 2"/>',
    port: '<path d="M3 15h18l-2.5 4h-13z"/><path d="M12 4v11M12 5l6 7h-6"/>',
    balloon: '<path d="M12 3a6.5 6.5 0 00-6.5 6.5c0 3.6 3.6 6.5 5 7.5h3c1.4-1 5-3.9 5-7.5A6.5 6.5 0 0012 3z"/><path d="M12 3c-2 2-2.5 4.5-2.5 6.5S10.5 15 10.5 17M12 3c2 2 2.5 4.5 2.5 6.5S13.5 15 13.5 17"/><rect x="10" y="18.5" width="4" height="2.5" rx=".5"/>',
    minaret: '<path d="M9 21V8h6v13M8 8h8M10 8V5.5h4V8M12 5.5V3"/><path d="M5 21h14M11 14h2v3h-2z"/>',
    lantern: '<path d="M12 2v2M9 4h6l1 4H8z"/><path d="M8 8c-1 3-1 7 0 10h8c1-3 1-7 0-10"/><path d="M10 18l-.5 2.5h5L14 18M12 10v6"/>',
    square: '<path d="M3 10l2-5h14l2 5"/><path d="M3 10c0 1.4 1.3 2 2.6 2S8 11.4 8 10c0 1.4 1.4 2 2.7 2S13 11.4 13 10c0 1.4 1.4 2 2.7 2s2.6-.6 2.6-2"/><path d="M5 12v9M19 12v9M3 21h18"/>',
    souk: '<path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 10V6a3 3 0 016 0v4"/>',
    arch: '<path d="M4 21V10a8 8 0 0116 0v11"/><path d="M8 21v-9a4 4 0 018 0v9M2 21h20"/>',
    spa: '<path d="M4 15h16v1a5 5 0 01-5 5H9a5 5 0 01-5-5z"/><path d="M8 11c0-1.5 1.2-1.5 1.2-3S8 6.5 8 5M12 11c0-1.5 1.2-1.5 1.2-3S12 6.5 12 5M16 11c0-1.5 1.2-1.5 1.2-3S16 6.5 16 5"/>',
    tagine: '<path d="M3 17h18M5 17a7 7 0 0114 0"/><path d="M12 6.5V4.5M10.5 4.5h3M8.5 13.5c1-1.8 2-2.7 3.5-3"/><path d="M6 19.5h12"/>',
    garden: '<path d="M12 21v-8"/><path d="M12 13c-4 0-6-3-6-6 3 0 6 2 6 6zM12 11c0-4 2.5-7 6-7 0 3.5-2.5 7-6 7z"/><path d="M6 21h12"/>',
    ruins: '<path d="M3 20h18M5 20V9h3v11M10 20v-6h4v6M16 20V6h3v14"/><path d="M5 9l1.5-2L8 9M16 6l1.5-2L19 6"/>',
    dome: '<path d="M4 20h16M6 20v-6h12v6"/><path d="M6 14a6 6 0 0112 0M12 8V5.5M11 5.5h2"/><path d="M10 20v-3h4v3"/>',
    plane: '<path d="M10.5 4.5c0-1 .7-2 1.5-2s1.5 1 1.5 2v5l7 4v2l-7-2v4l2 1.5V20l-3.5-1L8.5 20v-1.5l2-1.5v-4l-7 2v-2l7-4z"/>',
    camel: '<path d="M3 20v-6l2-3h2l2 2 2-4h2l2 4 2-2 1.5 1.5L21 9"/><path d="M5 20v-4M9 20v-5M15 20v-5M18 20v-6"/>'
  };
  function svg(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[n] || '') + '</svg>'; }
  function star() {
    var d = '';
    for (var i = 0; i < 16; i++) { var a = -Math.PI / 2 + i * Math.PI / 8, r = i % 2 ? 9 : 17; d += (i ? 'L' : 'M') + (24 + Math.cos(a) * r).toFixed(1) + ' ' + (24 + Math.sin(a) * r).toFixed(1); }
    return '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="' + d + 'Z" class="rmap-compass__star"/><path d="M24 7l3.5 17H20.5z" class="rmap-compass__n"/><circle cx="24" cy="24" r="2.6" fill="#fff"/></svg>';
  }
  var touch = window.matchMedia('(hover: none)').matches;
  maps.forEach(function (fig) {
    var el = fig.querySelector('.rmap__map'), raw = fig.querySelector('.rmap__data');
    if (!el || !raw) return;
    var data = JSON.parse(raw.textContent), ll = function (p) { return [p[1], p[0]]; };
    var narrow = window.innerWidth <= 640;
    var map = L.map(el, { scrollWheelZoom: false, dragging: !touch, tap: false, zoomSnap: 0.25, attributionControl: true, zoomControl: !narrow });
    map.attributionControl.setPrefix(false);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 17, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>'
    }).addTo(map);
    var all = [];
    data.legs.forEach(function (leg) {
      var pts = leg.path.map(ll); all = all.concat(pts);
      L.polyline(pts, { color: '#fff', weight: leg.kind === 'car' ? 9 : 7, opacity: .95, lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(map);
      L.polyline(pts, leg.kind === 'car'
        ? { color: '#0e2a41', weight: 5, opacity: 1, lineCap: 'round', lineJoin: 'round', interactive: false }
        : leg.kind === 'walk' // on foot: navy dotted line (footsteps) along the real lanes
          ? { color: '#0e2a41', weight: 5, opacity: 1, dashArray: '0.1 9', lineCap: 'round', lineJoin: 'round', interactive: false }
          : { color: '#a5762a', weight: 4, opacity: 1, dashArray: '8 8', lineCap: 'round', interactive: false }).addTo(map);
    });
    data.stops.forEach(function (s) {
      if (narrow && s.hideM) return; // stops too close together on a phone: one pin speaks for both (nameM)
      var side = (narrow && s.sideM) || s.side || 'right';
      var icon = L.divIcon({ className: 'rmap-pin' + (s.start ? ' rmap-pin--start' : ''), html: svg(s.icon), iconSize: [34, 34], iconAnchor: [17, 17] });
      var m = L.marker(ll(s.at), { icon: icon, keyboard: false, title: s.name }).addTo(map);
      m.bindTooltip('<b>' + ((narrow && s.nameM) || s.name) + '</b><small>' + s.note + '</small>', {
        permanent: true, direction: side, offset: { left: [-20, 0], right: [20, 0], top: [0, -18], bottom: [0, 18] }[side] || [20, 0], className: 'rmap-tip rmap-tip--' + side
      });
      all.push(ll(s.at));
    });
    // drive-time tag on the road: tries points along the first leg (preferred spot first) and keeps
    // the first one that touches no pin, label, compass or legend — so it never covers anything
    var road = data.legs[0].path.map(ll);
    var chip = L.tooltip({ permanent: true, direction: 'center', className: 'rmap-chip', interactive: false }).setLatLng(road[0]).setContent((narrow && data.chip.textM) || data.chip.text).addTo(map);
    // position by real distance along the road (mountain bends have many more points than straight roads)
    var cum = [0]; for (var q = 1; q < road.length; q++) cum.push(cum[q - 1] + Math.hypot(road[q][0] - road[q - 1][0], road[q][1] - road[q - 1][1]));
    var pointAt = function (t) { var goal = cum[cum.length - 1] * Math.max(0, Math.min(1, t)); for (var q = 1; q < cum.length; q++) { if (cum[q] >= goal) { var f = (goal - cum[q - 1]) / ((cum[q] - cum[q - 1]) || 1); return [road[q - 1][0] + (road[q][0] - road[q - 1][0]) * f, road[q - 1][1] + (road[q][1] - road[q - 1][1]) * f]; } } return road[road.length - 1]; };
    var placeChip = function () {
      var el = chip.getElement(); if (!el) return;
      var tries = []; for (var k = 0.08; k <= 0.921; k += 0.04) tries.push(k);
      tries.sort(function (x, y) { return Math.abs(x - data.chip.at) - Math.abs(y - data.chip.at); });
      var box = fig.getBoundingClientRect(), others = [].slice.call(fig.querySelectorAll('.rmap-pin, .rmap-tip, .rmap-compass, .rmap__legend'));
      // on the road first; if every spot there is taken, just above/below the road, then a little further off it.
      // If nothing is fully free (tiny phone maps), keep the spot that covers the least of the pins and labels.
      var rects = others.map(function (o) { return o.getBoundingClientRect(); });
      var shifts = [[0, 0], [0, -26], [0, 26], [0, -44], [0, 44], [-56, -26], [56, -26], [-56, 26], [56, 26]];
      var best = null, bestCover = Infinity;
      for (var s = 0; s < shifts.length; s++) {
        chip.options.offset = L.point(shifts[s][0], shifts[s][1]);
        for (var i = 0; i < tries.length; i++) {
          chip.setLatLng(pointAt(tries[i]));
          var c = el.getBoundingClientRect();
          if (c.left < box.left + 4 || c.right > box.right - 4 || c.top < box.top + 4 || c.bottom > box.bottom - 4) continue;
          var cover = 0;
          rects.forEach(function (b) {
            var w = Math.min(c.right, b.right + 3) - Math.max(c.left, b.left - 3), h = Math.min(c.bottom, b.bottom + 3) - Math.max(c.top, b.top - 3);
            if (w > 0 && h > 0) cover += w * h;
          });
          if (!cover) return;
          if (cover < bestCover) { bestCover = cover; best = [s, i]; }
        }
      }
      if (best) { chip.options.offset = L.point(shifts[best[0]][0], shifts[best[0]][1]); chip.setLatLng(pointAt(tries[best[1]])); return; }
      chip.options.offset = L.point(0, 0);
      chip.setLatLng(pointAt(data.chip.at));
    };
    // compass: which way is north, east, south and west
    var Compass = L.Control.extend({ options: { position: narrow ? (data.compassM || 'topright') : 'topright' }, onAdd: function () {
      var d = L.DomUtil.create('div', 'rmap-compass');
      d.innerHTML = '<span class="rmap-compass__l rmap-compass__l--n">N</span><span class="rmap-compass__l rmap-compass__l--e">E</span><span class="rmap-compass__l rmap-compass__l--s">S</span><span class="rmap-compass__l rmap-compass__l--w">W</span>' + star();
      d.setAttribute('aria-hidden', 'true');
      return d;
    } });
    map.addControl(new Compass());
    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
    var fit = function () { map.invalidateSize(); map.fitBounds(L.latLngBounds(all), narrow ? (data.padM ? { paddingTopLeft: [data.padM[0], data.padM[1]], paddingBottomRight: [data.padM[2], data.padM[3]] } : { paddingTopLeft: [24, 44], paddingBottomRight: [96, 24] }) : (data.pad ? { paddingTopLeft: [data.pad[0], data.pad[1]], paddingBottomRight: [data.pad[2], data.pad[3]] } : { paddingTopLeft: [70, 60], paddingBottomRight: [150, 50] })); placeChip(); };
    map.on('zoomend', placeChip);
    fit();
    window.addEventListener('resize', function () { clearTimeout(fig._t); fig._t = setTimeout(fit, 200); });
  });
})();
