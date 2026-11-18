// Builds /desert-tours-from-fes.html — Page 3 of the desert hub-and-spoke plan (departure hub B).
// Reuses the shell, reviews block and tagged desert cards of the built sahara-desert-tours.html (run
// build-sdhub.js first). Run: node .claude/tools/tour-build/build-sdfs.js
// Research (2026-11-18, WebSearch): most operators sell Fes → Merzouga → Marrakech as 3 days (2 days "very
// rushed"); Fes → Merzouga ≈ 8 h; Ifrane stop ("little Switzerland") and the Azrou cedar forest with Barbary
// macaques; last day to Marrakech by Dades/Todra and Tichka. Our own tour-page facts reused: 470 km / 8 h,
// medina riads met at the nearest gate, train Fes → Marrakech ≈ 7 h by Rabat and Casablanca, don't feed the
// macaques, lunch in Midelt where you choose. Sources: magpie.travel, local-morocco-tours.com, lokalee.app.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

const hub = rd('sahara-desert-tours.html');
const idx = rd('tours/index.html');

// ---------- cards ----------
function hubCard(slug) {
  const re = new RegExp('<li(?: class="is-folded")? data-start="[a-z]+" data-way="[a-z]+">(<article class="htour"><a class="htour__link" href="tours/' + slug + '\\.html">[\\s\\S]*?</article>)</li>');
  const m = hub.match(re); if (!m) throw new Error('hub card missing: ' + slug); return m[1];
}
function idxCard(slug, tag, round) {
  const i = idx.indexOf('<article class="htour"><a class="htour__link" href="../tours/' + slug + '.html">');
  if (i < 0) throw new Error('index card missing: ' + slug);
  let c = idx.slice(i, idx.indexOf('</article>', i) + 10).replace(/href="\.\.\/tours\//g, 'href="tours/');
  return c.replace('<span class="htour__media">', `<span class="htour__media"><span class="htour__way${round ? '' : ' htour__way--one'}">${tag}</span>`);
}
const ul = (arr, cls = '') => `      <ul class="htours__list sdm-grid${cls}">\n${arr.map(c => '        <li>' + c + '</li>').join('\n')}\n      </ul>`;
const ROUND = ['2-day-fes-to-merzouga-desert-tour', '3-day-fes-to-merzouga-desert-tour', '4-day-fes-desert-tour'];
const ONEWAY = ['3-day-fes-to-marrakech-desert-tour', '4-day-fes-to-marrakech-desert-tour', '5-day-fes-to-marrakech-desert-tour', '10-day-merzouga-desert-nomad-experience'];
const roundCards = ROUND.map(hubCard);
const oneCards = ONEWAY.map(hubCard);
const allCards = roundCards.concat(oneCards);

// ---------- shared bits (from the hub page) ----------
const WA = hub.match(/<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12\.04[^"]*"\/><\/svg>/)[0];
const TIC = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICO = {
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  guide: '<circle cx="12" cy="7.5" r="3.5"/><path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5"/>',
  home: '<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  pin: '<path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  pass: '<path d="M3 19l6-10 4 6 3-4 5 8z"/>',
  kasbah: '<path d="M4 20V9l2-2 2 2v3h2V6l2-2 2 2v6h2V9l2-2 2 2v11z"/><path d="M10 20v-4h4v4"/>',
  palm: '<path d="M12 21V11"/><path d="M12 11c-1-3-4-4-7-3 2 0 4 1 5 3M12 11c1-3 4-4 7-3-2 0-4 1-5 3M12 11c-2-2-2-5 0-7 2 2 2 5 0 7"/>',
  gorge: '<path d="M4 20V5l4 3v12M20 20V5l-4 3v12"/><path d="M10 20c0-3 4-3 4-6"/>',
  dune: '<path d="M2 18c4-6 8-6 11-2 2-3 5-4 9 0"/><path d="M2 21h20"/><circle cx="17" cy="6" r="2"/>',
  tent: '<path d="M3 20L12 4l9 16H3z"/><path d="M12 4v16M9 20l3-6 3 6"/>',
  tree: '<path d="M12 3l6 8h-3l4 6H5l4-6H6z"/><path d="M12 17v4"/>',
  meal: '<path d="M7 3v8a2 2 0 002 2v8M5 3v6M9 3v6M17 3c-2 1-3 4-3 7h3v11"/>'
};

const ROUTE = [
  ['pin', 'Fes', 'Pick-up at 07:30'],
  ['home', 'Ifrane', 'The “little Switzerland”'],
  ['tree', 'Cedar forest', 'Barbary macaques near Azrou'],
  ['meal', 'Midelt', 'Lunch, where you choose'],
  ['palm', 'Ziz Valley', 'Palm gorges and a viewpoint'],
  ['dune', 'Merzouga', '470 km, sunset camel ride']
];
const routeHtml = ROUTE.map(r => `        <li class="sdm-route__stop"><span class="sdm-route__ic">${TIC(ICO[r[0]])}</span><h3>${r[1]}</h3><p>${r[2]}</p></li>`).join('\n');

const FAQ = [
  ['How far is Merzouga from Fes?', 'About 470 km, eight hours with stops for coffee in Ifrane, the cedar forest and lunch in Midelt. The road crosses the Middle Atlas, then follows the palm gorges of the Ziz Valley down to the dunes, and you arrive in time for the sunset camel ride.'],
  ['Is a 2-day desert tour from Fes enough?', 'For one night in the dunes, yes: the sunset camel ride, dinner at the camp and the sunrise. But each day is about eight hours on the road. The 3-day tour adds a full day around Merzouga, so you don’t spend two days in the car for one night in the dunes.'],
  ['Can you pick us up at a riad in the Fes medina?', 'Yes. Cars can’t enter the medina, so your driver meets you at the nearest gate, often with someone from your riad to help with the bags. Send us your riad’s name and we confirm the meeting point and time on WhatsApp.'],
  ['Should we come back to Fes or end in Marrakech?', 'If you fly home from Fes, take a round trip. If your trip goes on to Marrakech, end there: the train takes about seven hours by Rabat and Casablanca and sees none of the south, while our tours make the same move by the Sahara, the gorges and Aït Ben Haddou.'],
  ['Can we feed the macaques in the cedar forest?', 'Please don’t. Sellers by the road offer nuts and bread for the monkeys, but feeding makes them sick and aggressive. Your driver stops where you can watch them quietly from close by.'],
  ['Where do we eat lunch on the way?', 'Wherever you like. Your driver suggests a few local places in Midelt and you choose; there is no fixed restaurant and no buffet we take you to. Lunch is usually about €10–15 each.']
];
const faqHtml = FAQ.map((q, i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q[0]}</h3><span class="hfaq-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></summary>
            <div class="hfaq-item__a"><p>${q[1]}</p></div>
          </details>`).join('\n');

const BLOG = [
  ['best-things-to-do-in-fes', 'fes.jpg', 'Carved cedar door in a historic madrasa of Fes', 'Best Things to Do in Fes', 'The medina, madrasas and tanneries before or after the desert.', 1170, 1560],
  ['camel-trekking-in-merzouga', 'camel-trek.webp', 'Camel trek in the Erg Chebbi dunes', 'Camel Trekking in Merzouga', 'How long the ride is, how it feels and what to wear.', 1200, 800],
  ['sleeping-in-a-sahara-desert-camp', 'desert-camp.webp', 'A desert camp in the dunes', 'Sleeping in a Sahara Desert Camp', 'The ride in, dinner and music, the stars and the sunrise.', 1200, 800],
  ['best-time-to-visit-sahara-desert', 'camel-caravan.webp', 'Camel caravan in the Sahara', 'The Best Time to Visit the Sahara', 'Season by season: desert weather, summer heat and cold nights.', 1200, 800]
];
const blogHtml = BLOG.map(b => `          <li><article class="hblog-card"><a class="hblog-card__link" href="blog/${b[0]}.html">
            <span class="hblog-card__img"><img src="/assets/images/${b[1]}" alt="${b[2]}" width="${b[5]}" height="${b[6]}" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${b[3]}</h3><span class="hblog-card__ex">${b[4]}</span></span>
          </a></article></li>`).join('\n');

const reviews = hub.slice(hub.indexOf('<section class="hrev"'), hub.indexOf('<section class="hfaq sdh-faq"')).trim();
const T = s => `tours/${s}.html`;

// ---------- main ----------
const main = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/ziz-valley-plateau.jpg" alt="Palm groves of the Ziz Valley on the road from Fes to the Sahara" width="1600" height="1066" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="index.html">Home</a><span class="sep">›</span><a href="sahara-desert-tours.html">Sahara Desert Tours</a><span class="sep">›</span><span>From Fes</span></nav>
      <h1>Desert Tours from Fes<span class="script">Through the cedars to the dunes</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">Private trips from 2 to 10 days, over the Middle Atlas to the Erg Chebbi dunes at Merzouga. Come back to Fes, or cross the south and end in Marrakech.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why book your desert tour from Fes with us"><div class="wrap"><div class="trust__grid">
    <div class="trust__item">${TIC(ICO.home)}<b>Riad pick-up</b><small>At your hotel or the nearest gate.</small></div>
    <div class="trust__item">${TIC(ICO.guide)}<b>One driver-guide</b><small>The same person, first day to last.</small></div>
    <div class="trust__item">${TIC(ICO.shield)}<b>Always private</b><small>Stop wherever you like.</small></div>
    <div class="trust__item">${TIC(ICO.clock)}<b>Free cancellation</b><small>Up to 24 hours before.</small></div>
  </div></div></section>
  <section class="section cstart sdm-intro" aria-labelledby="sdm-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="sdm-intro-title">From Fes to the Sahara</h2>
      <p>Fes is the closest imperial city to Merzouga. The road climbs into the cedar forests of the Middle Atlas, where Barbary macaques live by the roadside, crosses the high plateau to Midelt, then drops through the palm gorges of the Ziz Valley to the Erg Chebbi dunes. It is about 470 km, a full day with stops, and you reach the camp in time for the sunset.</p>
      <p>Choose a round trip if you fly home from Fes, or a one-way tour if you are heading on to Marrakech: it replaces the seven-hour train and shows you the whole south on the way. Every tour below is private, with riad pick-up and the same driver-guide all the way.</p>
    </div>
  </div></section>
  <section class="section sdm-route" aria-labelledby="sdm-route-title"><div class="wrap">
    <div class="head-row"><div><h2 id="sdm-route-title">The Road to Merzouga</h2></div></div>
    <ol class="sdm-route__list">
${routeHtml}
    </ol>
  </div></section>
  <section class="section sdm-list" id="round-trips" aria-labelledby="sdm-round-title">
    <div class="wrap">
      <div class="head-row"><div><h2 id="sdm-round-title">Round Trips Back to Fes</h2><p class="sdh-count">${roundCards.length} tours, for flying home from Fes</p></div></div>
${ul(roundCards, ' mz-grid3')}
    </div>
  </section>
  <section class="section sdm-list" id="to-marrakech" aria-labelledby="sdm-mk-title">
    <div class="wrap">
      <div class="head-row"><div><h2 id="sdm-mk-title">One Way to Marrakech</h2><p class="sdh-count">${oneCards.length} tours that cross the desert and end in Marrakech</p></div></div>
${ul(oneCards)}
    </div>
  </section>
  <section class="section sdm-days" id="how-many-days" aria-labelledby="sdm-days-title"><div class="wrap">
    <div class="head-row"><div><h2 id="sdm-days-title">Which Fes Desert Tour Fits?</h2></div></div>
    <div class="dt-acc-wrap">
      <table class="dt-acc sdh-table sdm-table">
        <thead><tr><th scope="col">Tour</th><th scope="col">Nights</th><th scope="col">Longest drive</th><th scope="col">Best for</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="${T('2-day-fes-to-merzouga-desert-tour')}">2 days, back to Fes</a><small>One night in the dunes</small></th><td>Desert camp</td><td>About 8 hours, both days</td><td>Only two days free</td></tr>
          <tr><th scope="row"><a href="${T('3-day-fes-to-merzouga-desert-tour')}">3 days, back to Fes</a><small>A full day in Merzouga</small></th><td>Desert camp, Merzouga hotel</td><td>About 8 hours, first and last day</td><td>More time in the dunes</td></tr>
          <tr><th scope="row"><a href="${T('4-day-fes-desert-tour')}">4 days, Fes loop</a><small>Merzouga and the Todra Gorge</small></th><td>Camp, Merzouga, Todra Gorge</td><td>8 to 9 hours, on the last day</td><td>Seeing more of the south</td></tr>
          <tr><th scope="row"><a href="${T('3-day-fes-to-marrakech-desert-tour')}">3 days, to Marrakech</a><small>The desert on the way</small></th><td>Desert camp, Dades Valley</td><td>About 8 hours, on the first day</td><td>Going on to Marrakech</td></tr>
        </tbody>
      </table>
    </div>
  </div></section>
  <section class="section sdh-near" aria-label="Other ways to see the desert"><div class="wrap">
    <div class="sdh-near__grid">
      <div class="dtl-combine__box">
        <span class="dtl-combine__ic">${TIC(ICO.tent)}</span>
        <div class="dtl-combine__txt"><h3>Already in Merzouga?</h3><p>A night in the dunes, then a private drive north to Fes by the cedar forest.</p></div>
        <div class="dtl-combine__btns"><a class="hero-btn hero-btn--gold" href="${T('merzouga-to-fes-tour')}">Merzouga to Fes</a></div>
      </div>
      <div class="dtl-combine__box">
        <span class="dtl-combine__ic">${TIC(ICO.pin)}</span>
        <div class="dtl-combine__txt"><h3>Starting in Marrakech?</h3><p>Round trips and one-way tours over the High Atlas to the dunes.</p></div>
        <div class="dtl-combine__btns"><a class="hero-btn hero-btn--gold" href="desert-tours-from-marrakech.html">Desert Tours from Marrakech</a></div>
      </div>
    </div>
  </div></section>
  ${reviews}
  <section class="hfaq sdh-faq" aria-labelledby="sdm-faq-title">
    <div class="wrap hfaq__in hfaq__grid">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="sdm-faq-title">Desert Tours from Fes FAQ</h2>
        </header>
        <div class="hfaq__list">
${faqHtml}
        </div>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="faq.html">View All FAQs</a></div>
      </div>
      <aside class="hblog" aria-labelledby="sdm-blog-title">
        <header class="hrev__head hfaq__head">
          <h2 id="sdm-blog-title">Read Before You Go</h2>
        </header>
        <ul class="hblog__list">
${blogHtml}
        </ul>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="blog.html">Read More Articles</a></div>
      </aside>
    </div>
  </section>
  <section class="section dtl-combine" aria-labelledby="dtl-comb">
    <div class="wrap">
      <div class="dtl-combine__box">
        <span class="dtl-combine__ic">${TIC('<path d="M4 7h11M4 12h16M4 17h9"/><circle cx="19" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>')}</span>
        <div class="dtl-combine__txt"><h2 id="dtl-comb">Back to Fes or on to Marrakech?</h2><p>Tell us your dates and where you fly home from; we suggest the right route from Fes.</p></div>
        <div class="dtl-combine__btns">
          <a class="hero-btn dtl-combine__wa" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20help%20choosing%20a%20desert%20tour%20from%20Fes." target="_blank" rel="noopener">${WA}Chat on WhatsApp</a>
          <a class="hero-btn hero-btn--gold" href="contact.html">Request a Quote</a>
        </div>
      </div>
    </div>
  </section>
  <section class="hcta" aria-labelledby="hcta-title">
    <img class="hcta__bg" src="/assets/images/erg-chebbi-caravan-sunset.jpg" alt="Camel caravan crossing the Erg Chebbi dunes at sunset" width="1800" height="1200" loading="lazy">
    <div class="hcta__inner">
      <h2 id="hcta-title">From the Medina to the Dunes</h2>
      <p class="hcta__sub">Send us your dates; we reply on WhatsApp with your private route from Fes.</p>
      <div class="hcta__actions">
        <a class="hero-btn hero-btn--gold" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20to%20plan%20a%20desert%20tour%20from%20Fes." target="_blank" rel="noopener">${WA}Chat on WhatsApp</a>
        <a class="hero-btn hcta__quote" href="contact.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>Request a Quote</a>
      </div>
    </div>
  </section>
</main>`;

// ---------- head + JSON-LD ----------
const TITLE = 'Desert Tours from Fes | Private Sahara Trips to Merzouga, 2 to 10 Days';
const DESC = 'Private desert tours from Fes to Merzouga and the Erg Chebbi dunes: 2 to 10 days, back to Fes or ending in Marrakech. Riad pick-up, cedar forest, camel ride, camp.';
const URL = 'https://moroccotourshub.com/desert-tours-from-fes.html';
const IMG = 'https://moroccotourshub.com/assets/images/ziz-valley-plateau.jpg';
const j = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const items = allCards.map(c => ({ href: c.match(/href="([^"]+)"/)[1], name: c.match(/htour__title">([^<]*)/)[1].replace(/&amp;/g, '&') }));
const ld = [
  j({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Desert tours from Fes', itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/' + c.href, name: c.name })) }),
  j({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } })) }),
  j({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moroccotourshub.com/' },
    { '@type': 'ListItem', position: 2, name: 'Sahara Desert Tours', item: 'https://moroccotourshub.com/sahara-desert-tours.html' },
    { '@type': 'ListItem', position: 3, name: 'Desert Tours from Fes', item: URL }] })
].join('\n');

const esc = s => s.replace(/&/g, '&amp;');
let head = hub.slice(0, hub.indexOf('<body'));
head = head.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(TITLE)}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`)
  .replace(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="desert tour from Fes, Fes desert tour, Fes to Merzouga, Fez to Merzouga, Sahara tour from Fes, 3 day desert tour from Fes, Fes to Marrakech desert tour">')
  .replace(/https:\/\/moroccotourshub\.com\/sahara-desert-tours\.html/g, URL)
  .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(TITLE)}">`)
  .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(TITLE)}">`)
  .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${DESC}">`)
  .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${DESC}">`)
  .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${IMG}">`)
  .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${IMG}">`);
// swap the hub's 3 page-specific JSON-LD blocks (ItemList, FAQPage, BreadcrumbList) for this page's
head = head.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"ItemList"[\s\S]*?"@type":"BreadcrumbList"[\s\S]*?<\/script>/, ld);

const body = hub.slice(hub.indexOf('<body'));
let out = head + body.slice(0, body.indexOf('<main>')) + main + body.slice(body.indexOf('</main>') + 7);
// Desert Tours menu active (header rollout 2026-11-18), not Tours
out = out.replace('<a href="tours/index.html" class="is-active">', '<a href="tours/index.html" class="">').replace('<a href="sahara-desert-tours.html" class="">', '<a href="sahara-desert-tours.html" class="is-active">');
fs.writeFileSync(path.join(ROOT, 'desert-tours-from-fes.html'), out);
console.log('written', out.length, 'chars;', allCards.length, 'cards; ld blocks', (out.match(/application\/ld\+json/g) || []).length);
