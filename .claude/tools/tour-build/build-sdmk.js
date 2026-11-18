// Builds /desert-tours-from-marrakech.html — Page 2 of the desert hub-and-spoke plan (departure hub A).
// Reuses the shell and the tagged desert cards of the built sahara-desert-tours.html (run build-sdhub.js first),
// plus 4 desert-route cards from other themes in tours/index.html.
// Run: node .claude/tools/tour-build/build-sdmk.js
// Research (2026-11-18, WebSearch): 2-day Merzouga from Marrakech = an 11.5 h driving day (07:30–19:00);
// 3-day tours sleep in the Dades; medina riads are met at the closest point reachable by car; Tizi n'Tichka
// has hundreds of bends (car-sickness tablet, front seat) and closes for snow some winter days; small bag for
// the camp, big luggage stays in the vehicle. Sources: sun-trails.com, thenextguide.com, aswesawit.com,
// civitatis.com, lokalee.app.
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
const ROUND = ['2-day-marrakech-to-merzouga-desert-tour', '2-day-marrakech-to-zagora-desert-tour', '3-day-marrakech-erg-chigaga-tour', '3-days-desert-tour-marrakech-to-merzouga', '4-day-marrakech-to-merzouga-desert-tour', '4-day-marrakech-erg-chigaga-tour', '6-day-marrakech-zagora-ouzina-merzouga-tour', '7-day-marrakech-erg-chigaga-merzouga-tour'];
const ONEWAY = ['3-day-marrakech-to-fes-desert-tour', '4-day-marrakech-to-fes-desert-tour-via-merzouga', '5-day-marrakech-to-fes-sahara-desert-tour'];
const roundCards = ROUND.map(hubCard);
const oneCards = ONEWAY.map(hubCard).concat([idxCard('7-days-morocco-tour', 'Ends in Fes', false)]);
const themeCards = [idxCard('6-day-morocco-family-tour-marrakech-merzouga', 'Round trip', true), idxCard('9-day-morocco-honeymoon-tour-from-marrakech', 'Round trip', true), idxCard('morocco-yoga-retreat-sahara-desert', 'Round trip', true)];
const allCards = roundCards.concat(oneCards, themeCards);

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
  tent: '<path d="M3 20L12 4l9 16H3z"/><path d="M12 4v16M9 20l3-6 3 6"/>'
};

const ROUTE = [
  ['pin', 'Marrakech', 'Pick-up at 08:00'],
  ['pass', 'Tizi n’Tichka', 'High Atlas pass, 2,260 m'],
  ['kasbah', 'Aït Ben Haddou', 'Clay ksar, about 3.5 h in'],
  ['palm', 'Dades Valley', 'Night 1 on 3- and 4-day tours'],
  ['gorge', 'Todra Gorge', 'A walk between the cliffs'],
  ['dune', 'Merzouga', '560 km, the Erg Chebbi dunes']
];
const routeHtml = ROUTE.map(r => `        <li class="sdm-route__stop"><span class="sdm-route__ic">${TIC(ICO[r[0]])}</span><h3>${r[1]}</h3><p>${r[2]}</p></li>`).join('\n');

const FAQ = [
  ['How far is the Sahara from Marrakech?', 'Merzouga is about 560 km away, 9 to 10 hours of driving without stops. Zagora is closer, about 6 hours, with lower dunes. Agafay is 40 minutes away but is a stony desert, not sand dunes. On our tours the road is split with stops at Aït Ben Haddou and the gorges.'],
  ['Is a 2-day desert tour from Marrakech worth it?', 'If two days is all you have, yes: you get the sunset camel ride, a night in the dunes and the sunrise. But each day is 9 to 10 hours on the road. With three days the drive is split by a night in the Dades Valley, and the 2-day Zagora tour has less driving with lower dunes.'],
  ['Can you pick us up from our riad in the medina?', 'Yes. Cars cannot enter the medina lanes, so your driver-guide meets you at the nearest gate to your riad at 08:00. Most riads will walk you there with your bags. Hotels outside the medina are picked up at the door.'],
  ['I get car sick. Is the Tizi n’Tichka road a problem?', 'It is a good paved mountain road, but it has many bends. Take a tablet before you leave, sit in the front seat, and tell your driver-guide when you need a break: we stop whenever you want. In winter, snow can close the pass for a few hours; we wait or change the plan.'],
  ['Can we end in Fes instead of coming back to Marrakech?', 'Yes. Our 3, 4 and 5-day tours cross the desert and end in Fes, so you never drive the same road back. The 7-day tour adds a night in Midelt and a guided day in Fes.'],
  ['What happens to our luggage on the desert night?', 'Take a small bag with what you need for the night. Your big luggage stays in the vehicle with your driver-guide and is waiting for you in the morning.']
];
const faqHtml = FAQ.map((q, i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q[0]}</h3><span class="hfaq-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></summary>
            <div class="hfaq-item__a"><p>${q[1]}</p></div>
          </details>`).join('\n');

const BLOG = [
  ['marrakech-to-merzouga-route-guide', 'dades-road.jpg', 'Winding road through the Dades Valley', 'Marrakech to Merzouga: The Route', 'Every stop on the road, with drive times and where to sleep.'],
  ['3-days-vs-4-days-marrakech-to-merzouga', 'merzouga-camel-caravan-guide.jpg', 'Guide leading camels in Merzouga', '3 Days vs 4 Days to Merzouga', 'The pace, the driving and the desert time on each version.'],
  ['merzouga-or-zagora', 'sahara-dunes.jpg', 'Sahara dunes in Morocco', 'Merzouga or Zagora?', 'Dune size, distance from Marrakech and days needed, side by side.'],
  ['best-time-to-visit-sahara-desert', 'camel-caravan.webp', 'Camel caravan in the Sahara', 'The Best Time to Visit the Sahara', 'Season by season: desert weather, summer heat and cold nights.']
];
const blogHtml = BLOG.map(b => `          <li><article class="hblog-card"><a class="hblog-card__link" href="blog/${b[0]}.html">
            <span class="hblog-card__img"><img src="/assets/images/${b[1]}" alt="${b[2]}" width="1200" height="800" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${b[3]}</h3><span class="hblog-card__ex">${b[4]}</span></span>
          </a></article></li>`).join('\n');

const reviews = hub.slice(hub.indexOf('<section class="hrev"'), hub.indexOf('<section class="hfaq sdh-faq"')).trim();
const T = s => `tours/${s}.html`;

// ---------- main ----------
const main = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/sahara-camel-pink-sunset.jpg" alt="Camels resting on the dunes of the Sahara at a pink sunset" width="1300" height="866" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="index.html">Home</a><span class="sep">›</span><a href="sahara-desert-tours.html">Sahara Desert Tours</a><span class="sep">›</span><span>From Marrakech</span></nav>
      <h1>Desert Tours from Marrakech<span class="script">From the Red City to the dunes</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">Private trips from 2 to 9 days, over the High Atlas to Merzouga, Zagora or Erg Chigaga. Come back to Marrakech, or cross the desert and end in Fes.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why book your desert tour from Marrakech with us"><div class="wrap"><div class="trust__grid">
    <div class="trust__item">${TIC(ICO.home)}<b>Riad pick-up</b><small>At your hotel or the nearest gate.</small></div>
    <div class="trust__item">${TIC(ICO.guide)}<b>One driver-guide</b><small>The same person, first day to last.</small></div>
    <div class="trust__item">${TIC(ICO.shield)}<b>Always private</b><small>Stop wherever you like.</small></div>
    <div class="trust__item">${TIC(ICO.clock)}<b>Free cancellation</b><small>Up to 24 hours before.</small></div>
  </div></div></section>
  <section class="section cstart sdm-intro" aria-labelledby="sdm-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="sdm-intro-title">From Marrakech to the Sahara</h2>
      <p>Marrakech is where most Sahara trips begin. The road climbs over the High Atlas, passes the clay ksar of Aït Ben Haddou and the palm valleys of the south, and ends where the Erg Chebbi dunes rise out of the stony plain at Merzouga. It is a long way, about 560 km, so the length of your tour decides how much of it you enjoy and how much you just drive.</p>
      <p>Choose a round trip if you fly home from Marrakech, or a one-way tour if you are heading on to Fes. Every tour below is private, with hotel or riad pick-up and the same driver-guide all the way.</p>
    </div>
  </div></section>
  <section class="section sdm-route" aria-labelledby="sdm-route-title"><div class="wrap">
    <div class="head-row"><div><h2 id="sdm-route-title">The Road to Merzouga</h2></div></div>
    <ol class="sdm-route__list">
${routeHtml}
    </ol>
    <p class="sdh-note">The full road, stop by stop: <a href="blog/marrakech-to-merzouga-route-guide.html">Marrakech to Merzouga route guide</a>.</p>
  </div></section>
  <section class="section sdm-list" id="round-trips" aria-labelledby="sdm-round-title">
    <div class="wrap">
      <div class="head-row"><div><h2 id="sdm-round-title">Round Trips Back to Marrakech</h2><p class="sdh-count">${roundCards.length} tours, for flying home from Marrakech</p></div></div>
${ul(roundCards)}
    </div>
  </section>
  <section class="section sdm-list" id="to-fes" aria-labelledby="sdm-fes-title">
    <div class="wrap">
      <div class="head-row"><div><h2 id="sdm-fes-title">One Way to Fes</h2><p class="sdh-count">${oneCards.length} tours that cross the desert and end in Fes</p></div></div>
${ul(oneCards)}
    </div>
  </section>
  <section class="section sdm-days" id="how-many-days" aria-labelledby="sdm-days-title"><div class="wrap">
    <div class="head-row"><div><h2 id="sdm-days-title">2, 3 or 4 Days from Marrakech?</h2></div></div>
    <div class="dt-acc-wrap">
      <table class="dt-acc sdh-table sdm-table">
        <thead><tr><th scope="col">Tour</th><th scope="col">Nights</th><th scope="col">Longest drive</th><th scope="col">Best for</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="${T('2-day-marrakech-to-merzouga-desert-tour')}">2 days, Merzouga</a><small>Tall dunes in a hurry</small></th><td>Desert camp</td><td>9 to 10 hours, both days</td><td>Only two days free</td></tr>
          <tr><th scope="row"><a href="${T('2-day-marrakech-to-zagora-desert-tour')}">2 days, Zagora</a><small>Shorter road, lower dunes</small></th><td>Camp near Zagora</td><td>About 6 hours</td><td>A desert night without the long drive</td></tr>
          <tr><th scope="row"><a href="${T('3-days-desert-tour-marrakech-to-merzouga')}">3 days, Merzouga</a><small>The classic</small></th><td>Dades Valley, desert camp</td><td>9 to 10 hours, on the way back</td><td>A first Sahara trip</td></tr>
          <tr><th scope="row"><a href="${T('4-day-marrakech-to-merzouga-desert-tour')}">4 days, Merzouga</a><small>No long drive day</small></th><td>Dades, camp, Ouarzazate</td><td>About 6 hours</td><td>An easy pace, back by the Draa Valley</td></tr>
        </tbody>
      </table>
    </div>
  </div></section>
  <section class="section sdm-list" id="themes" aria-labelledby="sdm-theme-title">
    <div class="wrap">
      <div class="head-row"><div><h2 id="sdm-theme-title">Desert Trips for Families, Couples &amp; Wellness</h2></div></div>
${ul(themeCards, ' mz-grid3')}
    </div>
  </section>
  <section class="section sdh-near" aria-label="Other ways to see the desert"><div class="wrap">
    <div class="sdh-near__grid">
      <div class="dtl-combine__box">
        <span class="dtl-combine__ic">${TIC(ICO.clock)}</span>
        <div class="dtl-combine__txt"><h3>Only one free evening?</h3><p>Camels, dinner and a fire show in Agafay, 40 minutes from Marrakech. <a class="sdh-link" href="destinations/agafay.html">All things to do in Agafay</a></p></div>
        <div class="dtl-combine__btns"><a class="hero-btn hero-btn--gold" href="${T('agafay-desert-camel-ride-dinner-show')}">Agafay at Sunset</a></div>
      </div>
      <div class="dtl-combine__box">
        <span class="dtl-combine__ic">${TIC(ICO.pin)}</span>
        <div class="dtl-combine__txt"><h3>Starting in another city?</h3><p>Desert tours from Fes, Merzouga, Errachidia, Agadir and Rabat.</p></div>
        <div class="dtl-combine__btns"><a class="hero-btn hero-btn--gold" href="sahara-desert-tours.html">All Sahara Desert Tours</a></div>
      </div>
    </div>
  </div></section>
  ${reviews}
  <section class="hfaq sdh-faq" aria-labelledby="sdm-faq-title">
    <div class="wrap hfaq__in hfaq__grid">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="sdm-faq-title">Desert Tours from Marrakech FAQ</h2>
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
        <div class="dtl-combine__txt"><h2 id="dtl-comb">Not sure how many days to take?</h2><p>Tell us your dates and where you fly home from; we suggest the right route from Marrakech.</p></div>
        <div class="dtl-combine__btns">
          <a class="hero-btn dtl-combine__wa" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20help%20choosing%20a%20desert%20tour%20from%20Marrakech." target="_blank" rel="noopener">${WA}Chat on WhatsApp</a>
          <a class="hero-btn hero-btn--gold" href="contact.html">Request a Quote</a>
        </div>
      </div>
    </div>
  </section>
  <section class="hcta" aria-labelledby="hcta-title">
    <img class="hcta__bg" src="/assets/images/erg-chebbi-caravan-sunset.jpg" alt="Camel caravan crossing the Erg Chebbi dunes at sunset" width="1800" height="1200" loading="lazy">
    <div class="hcta__inner">
      <h2 id="hcta-title">Leave Marrakech for the Dunes</h2>
      <p class="hcta__sub">Send us your dates; we reply on WhatsApp with your private route.</p>
      <div class="hcta__actions">
        <a class="hero-btn hero-btn--gold" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20to%20plan%20a%20desert%20tour%20from%20Marrakech." target="_blank" rel="noopener">${WA}Chat on WhatsApp</a>
        <a class="hero-btn hcta__quote" href="contact.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>Request a Quote</a>
      </div>
    </div>
  </section>
</main>`;

// ---------- head + JSON-LD ----------
const TITLE = 'Desert Tours from Marrakech | Private Sahara Trips, 2 to 9 Days';
const DESC = 'Private desert tours from Marrakech to Merzouga, Zagora or Erg Chigaga: 2 to 9 days, round trip or ending in Fes. Riad pick-up, sunset camel ride, desert camp.';
const URL = 'https://moroccotourshub.com/desert-tours-from-marrakech.html';
const IMG = 'https://moroccotourshub.com/assets/images/sahara-camel-pink-sunset.jpg';
const j = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const items = allCards.map(c => ({ href: c.match(/href="([^"]+)"/)[1], name: c.match(/htour__title">([^<]*)/)[1].replace(/&amp;/g, '&') }));
const ld = [
  j({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Desert tours from Marrakech', itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/' + c.href, name: c.name })) }),
  j({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } })) }),
  j({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moroccotourshub.com/' },
    { '@type': 'ListItem', position: 2, name: 'Sahara Desert Tours', item: 'https://moroccotourshub.com/sahara-desert-tours.html' },
    { '@type': 'ListItem', position: 3, name: 'Desert Tours from Marrakech', item: URL }] })
].join('\n');

const esc = s => s.replace(/&/g, '&amp;');
let head = hub.slice(0, hub.indexOf('<body'));
head = head.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(TITLE)}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`)
  .replace(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="desert tour from Marrakech, Marrakech desert tour, Marrakech to Merzouga, Sahara tour from Marrakech, 3 day desert tour from Marrakech, 2 day desert tour from Marrakech, Marrakech to Fes desert tour">')
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
fs.writeFileSync(path.join(ROOT, 'desert-tours-from-marrakech.html'), out);
console.log('written', out.length, 'chars;', allCards.length, 'cards; ld blocks', (out.match(/application\/ld\+json/g) || []).length);
