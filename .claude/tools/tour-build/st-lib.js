// Shared builder for the student/group tours (2026-11-17). build(cfg) rebuilds one page from a finished tour page (cfg.tpl)
// by replacing every content block through structural markers. Never re-run on a finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
// 3 <td> cells (Standard, Midrange, Luxury) of a one-row-per-night table row on a finished page
function cells(file, label) {
  const SRC = fs.readFileSync(root + 'tours/' + file, 'utf8');
  const i = SRC.indexOf(label); if (i < 0) throw new Error('row ' + label + ' in ' + file);
  const row = SRC.slice(i, SRC.indexOf('</tr>', i));
  const tds = row.match(/<td>[\s\S]*?<\/td>/g); if (!tds || tds.length < 3) throw new Error('cells ' + label);
  return tds.slice(0, 3);
}
const PLACES = {
  dades: () => cells('7-day-morocco-tour-tangier-to-marrakech.html', ': Dades Valley</th>'),
  camp: () => cells('7-day-morocco-tour-tangier-to-marrakech.html', ': Desert camp</th>'),
  merz: () => cells('7-day-morocco-tour-tangier-to-marrakech.html', ': Merzouga</th>'),
  fes: () => cells('5-day-morocco-tour-tangier-to-marrakech.html', ': Fes</th>'),
  ouarzazate: () => cells('7-day-marrakech-erg-chigaga-merzouga-tour.html', ': Ouarzazate</th>'),
  marrakech: () => cells('5-day-morocco-tour-tangier-to-marrakech.html', ': Marra&shy;kech</th>'),
};
// nights = [[label, placeKey], ...]; ≤2 nights → columns per night, rows per level; else one row per night
function table(nights) {
  const c = nights.map(([, k]) => PLACES[k]());
  if (nights.length <= 2) {
    const head = `<thead><tr><th scope="col">Options</th>${nights.map(([l]) => `<th scope="col">${l}</th>`).join('')}</tr></thead>`;
    const body = ['Standard', 'Midrange', 'Luxury'].map((lv, i) => `<tr><th scope="row">${lv}</th>${c.map(x => x[i]).join('')}</tr>`).join('');
    return `<div class="dt-acc-wrap"><table class="dt-acc">\n            ${head}\n            <tbody>${body}</tbody>\n          </table></div>`;
  }
  const head = '<thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>';
  const body = nights.map(([l], i) => `<tr><th scope="row">${l}</th>${c[i].join('')}</tr>`).join('');
  return `<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">\n            ${head}\n            <tbody>${body}</tbody>\n          </table></div>`;
}
function pickReviews(names) {
  const all = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x + '</figure>'));
  return names.map(n => { const c = all.find(x => x.includes('<b>' + n + '</b>')); if (!c) throw new Error('no review ' + n); return c.trim(); }).join('');
}

function build(cfg) {
  let s = fs.readFileSync(root + 'tours/' + cfg.tpl, 'utf8');
  const tplURL = 'https://moroccotourshub.com/tours/' + cfg.tpl;
  const URL = 'https://moroccotourshub.com/tours/' + cfg.out;
  function rep(a, b, label) {
    if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
    else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
  }
  function between(start, end, inner, label) {
    const i = s.indexOf(start); if (i < 0) throw new Error('start ' + label);
    const j = s.indexOf(end, i + start.length); if (j < 0) throw new Error('end ' + label);
    s = s.slice(0, i + start.length) + inner + s.slice(j);
  }
  // head
  rep(/<title>[^<]*<\/title>/, `<title>${cfg.title}</title>`, 'title');
  rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${cfg.desc}">`, 'desc');
  rep(/<meta name="keywords" content="[^"]*">/, `<meta name="keywords" content="${cfg.keywords}">`, 'kw');
  rep(tplURL, URL, 'urls');
  rep(/(<meta property="og:title" content=")[^"]*"/, `$1${cfg.title}"`, 'ogt');
  rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${cfg.title}"`, 'twt');
  rep(/(<meta property="og:description" content=")[^"]*"/, `$1${cfg.desc}"`, 'ogd');
  rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${cfg.desc}"`, 'twd');
  rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${cfg.hero}"`, 'ogimg');
  // hero
  rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${cfg.hero}" alt="${cfg.heroAlt}" loading="eager"`, 'hero img');
  rep(/(<span class="sep">›<\/span><span>)[^<]*(<\/span><\/nav>)/, `$1${cfg.crumb}$2`, 'crumb');
  rep(/<h1>[\s\S]*?<\/h1>/, `<h1>${cfg.h1}<span class="script">${cfg.script}</span></h1>`, 'h1');
  rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)[^<]*(<\/span>)/, `$1${cfg.chip}$2`, 'chip');
  { let k = 0; const fa = s.indexOf('<ul class="dt-facts">'), fb = s.indexOf('</ul>', fa);
    s = s.slice(0, fa) + s.slice(fa, fb).replace(/<small>[^<]*<\/small><b>[^<]*<\/b>/g, () => { const [l, v] = cfg.facts[k++]; return `<small>${l}</small><b>${v}</b>`; }) + s.slice(fb);
    if (k !== 4) throw new Error('facts ' + k); }
  // overview
  between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">', cfg.overview.map(p => `          <p class="dt-lead">${p}</p>\n`).join(''), 'overview');
  { let k = 0; const ga = s.indexOf('<dl class="dt-glance">'), gb = s.indexOf('</dl>', ga);
    s = s.slice(0, ga) + s.slice(ga, gb).replace(/<dt>([^<]*)<\/dt><dd>([\s\S]*?)<\/dd>/g, (all, dt, dd) => { const i = k++; if (i === 0) return `<dt>${dt}</dt><dd>${cfg.kf1}</dd>`; if (i === 1) return `<dt>${dt}</dt><dd>${cfg.kfType}</dd>`; if (i === 3) return `<dt>${cfg.kf4[0]}</dt><dd>${cfg.kf4[1]}</dd>`; return all; }) + s.slice(gb);
    if (k !== 6) throw new Error('key facts ' + k); }
  between('<ul class="dt-ticks">', '<li class="dt-high__more">', cfg.highlights.map(t => li(TICK, t)).join(''), 'highlights');
  // gallery
  between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', cfg.gallery.map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');
  // itinerary
  between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', cfg.days.map((d, i) =>
    `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');
  // included
  between('<h3>Included</h3><ul>', '</ul></div>', cfg.incl.map(t => li(TICK, t)).join(''), 'included');
  between('<h3>Not included</h3><ul>', '</ul></div>', cfg.notIncl.map(t => li(CROSS, t)).join(''), 'notincl');
  between('<h3>Good to know</h3><ul>', '</ul></div>', cfg.gtk.map(t => li(INFO, t)).join(''), 'gtk');
  between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', cfg.costs.map(t => li(COIN, t)).join(''), 'costs');
  if (cfg.mapNote) rep(/(<p class="dt-map__note">(?:<svg[\s\S]*?<\/svg>)?<span>)[^<]*<a href="[^"]*"/, `$1${cfg.mapNote} <a href="${cfg.mapLink}"`, 'mapnote');
  // accommodations
  rep(/<div class="dt-acc-wrap"><table class="dt-acc[^"]*">[\s\S]*?<\/table><\/div>/, table(cfg.nights), 'acc');
  rep(/(id="dt-st">Accommodations<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, `$1${cfg.accIntro}$2`, 'acc intro');
  between('<h3>Great for</h3><ul>', '</ul></div>', cfg.great.map(t => li(TICK, t)).join(''), 'great');
  between('<h3>Think twice if</h3><ul>', '</ul></div>', cfg.think.map(t => li(INFO, t)).join(''), 'think');
  // reviews
  between('<div class="dt-revs">', '</div>\n        </section>', pickReviews(cfg.reviews), 'reviews');
  // FAQ
  const BOOK = ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.'];
  between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
    cfg.faq.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
    `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');
  // Make It Your Own
  rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, `$1${cfg.customLead}$2`, 'custom lead');
  between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', cfg.custom.map(t => li(TICK, t)).join(''), 'custom');
  // booking + banner
  rep(/(class="dt-book__label">)[^<]*/, `$1${cfg.bookLabel}`, 'book label');
  rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${cfg.name.replace(/&amp;/g, '&')}"`, 'form trip');
  rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + cfg.name.replace(/&amp;/g, '&') + '.')}"`, 'wa');
  rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, `$1${cfg.mbar}`, 'mbar');
  rep(/The \d+-day route is a starting point/, `The ${cfg.days.length}-day route is a starting point`, 'banner');
  if (cfg.bannerTitle) rep(/(<h2 id="hcta-title">)[^<]*/, '$1' + cfg.bannerTitle, 'banner title');
  if (cfg.bannerSub) rep(/(<p class="hcta__sub">)[^<]*/, `$1${cfg.bannerSub}`, 'banner sub');
  // similar
  between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + cfg.key + '-similar.json', 'utf8')), 'similar');
  // map
  if (cfg.newMap) { const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length; s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj); }
  // JSON-LD
  const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: cfg.name.replace(/&amp;/g, '&'), description: cfg.desc, image: `https://moroccotourshub.com/assets/images/${cfg.hero}`, url: URL, touristType: cfg.touristType, provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
    itinerary: { '@type': 'ItemList', itemListElement: cfg.ldStops.map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
  const strip = t => t.replace(/<[^>]+>/g, '');
  const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...cfg.faq, BOOK].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };
  rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
  rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  for (const bad of cfg.leftovers || []) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
  fs.writeFileSync(root + 'tours/' + cfg.out, s);
  console.log('written', cfg.out, s.length);
}
module.exports = { build };
