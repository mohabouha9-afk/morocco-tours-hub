// Builds destinations/erg-chigaga-zagora.html (desert hub: the southern Sahara) from the finished Merzouga hub shell,
// same structure as build-agafay.js. Tour cards copied from sahara-desert-tours.html; the luxury camp card is written here.
// Facts come only from our own pages (2-day Zagora, 3/4-day Erg Chigaga, Erg Chigaga luxury camp, Sahara hub table):
// Zagora ~360 km / 6–7 h; M'Hamid 7–8 h from Marrakech, 1.5 h from Zagora; last ~50 km off-road (1.5–2.5 h) by 4x4;
// Chigaga dunes ~50–60 m vs Erg Chebbi ~150 m; Iriqui dry lake on the old Paris–Dakar track to Foum Zguid;
// best Oct–Apr, Jun–Aug above 40 °C, Dec–Feb nights near freezing. Research: .claude/research/desert-content-gap-2026-11-23.md
// Run from the project root: node .claude/tools/tour-build/build-chigaga.js
const fs = require('fs');
const mz = fs.readFileSync('destinations/merzouga.html', 'utf8');
const sh = fs.readFileSync('sahara-desert-tours.html', 'utf8');
const OUT = 'destinations/erg-chigaga-zagora.html';

const head0 = mz.slice(0, mz.indexOf('<main>'));
const foot = mz.slice(mz.indexOf('</main>'));

function must(s, what) { if (!s) throw new Error('missing: ' + what); return s; }
function rep(s, a, b) { if (!s.includes(a)) throw new Error('not found: ' + a.slice(0, 60)); return s.replace(a, b); }

// ---- tour cards from the Sahara hub
function card(slug, id) {
  const m = must(sh.match(new RegExp('<li[^>]*><article class="htour"><a class="htour__link" href="tours/' + slug + '\\.html">[\\s\\S]*?</a></article></li>')), slug);
  return m[0].replace(/^<li[^>]*>/, '<li id="' + id + '">').replace(/href="tours\//g, 'href="../tours/');
}
const ICF = {
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
};
const star = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9z"/></svg>';
const campCard = `<li id="ec-camp"><article class="htour htour--dt"><a class="htour__link" href="../tours/erg-chigaga-luxury-desert-camp.html">
            <span class="htour__media"><img src="/assets/images/camel-dune-ridge.jpg" alt="Camels walking along a dune ridge in Erg Chigaga" width="1170" height="780" loading="lazy"><span class="htour__days">${ICF.clock}1 Night</span></span>
            <span class="htour__body">
              <h3 class="htour__title">Erg Chigaga Luxury Desert Camp</h3>
              <span class="htour__meta">${ICF.pin}M’Hamid · 1 night in the dunes</span>
              <span class="htour__stars" role="img" aria-label="5 out of 5 stars">${star.repeat(5)}</span>
              <p class="htour__desc">Already in the south? A private 4×4 from M’Hamid, a sunset camel ride and a tent with its own bathroom.</p>
              <span class="htour__facts">
                <span class="htour__fact">${ICF.check}4×4 from M’Hamid</span>
                <span class="htour__fact">${ICF.check}Private bathroom</span>
                <span class="htour__fact">${ICF.check}Sunset camel ride</span>
              </span>
              <span class="htour__cta">View Details</span>
            </span>
          </a></article></li>`;
const cards = [
  card('2-day-marrakech-to-zagora-desert-tour', 'ec-zagora2'),
  card('3-day-marrakech-erg-chigaga-tour', 'ec-chigaga3'),
  card('4-day-marrakech-erg-chigaga-tour', 'ec-chigaga4'),
  campCard,
  card('6-day-marrakech-zagora-ouzina-merzouga-tour', 'ec-ouzina6'),
  card('7-day-marrakech-erg-chigaga-merzouga-tour', 'ec-both7'),
].join('\n');

const IC = {
  spark: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  group: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M16 5.5a3 3 0 010 5.8M17 20c0-2.6-.9-4.2-2.5-5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6L12 3z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.4"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 16v-4l2-5h14l2 5v4H3z"/><path d="M3 12h18"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/></svg>',
  gate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V10a8 8 0 0116 0v11"/><path d="M8 21v-9a4 4 0 018 0v9M2 21h20"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4z"/><path d="M9 4v14M15 6v14"/></svg>',
  palm: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21v-9"/><path d="M12 12c-1-3-4-4-7-3M12 12c1-3 4-4 7-3M12 12c-2-2-2-5 0-7M12 12c2-2 2-5 0-7"/><path d="M8 21h8"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5v-15z"/><path d="M4 20.5A2.5 2.5 0 016.5 18H20v3H6.5A2.5 2.5 0 014 20.5z"/></svg>',
  dune: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 18c3-5 6-8 10-8s7 3 10 8"/><path d="M7 18c2-2.5 4-3.5 6-3.5"/><circle cx="17" cy="6" r="2"/></svg>',
  flat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 16h20M5 19h14"/><path d="M4 12c2-1 4-1 6 0s4 1 6 0 4-1 4-1"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M14.2 9.6c-.4-.6-1.2-1-2.2-1-1.3 0-2.2.7-2.2 1.6 0 2.2 4.4 1.2 4.4 3.4 0 .9-.9 1.6-2.2 1.6-1 0-1.8-.4-2.2-1M12 7v1.6M12 15.4V17"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13v-1a7 7 0 0114 0v1M5 13a2 2 0 00-2 2v1a2 2 0 002 2h1v-5H5zm14 0a2 2 0 012 2v1a2 2 0 01-2 2h-1v-5h1zM12 21h3a2 2 0 002-2v-1"/></svg>',
};
const tIc = s => s.replace('stroke-width="1.6"', 'stroke-width="1.7"');
const plus = '<span class="hfaq-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>';

function happart(id, title, items, extraClass) {
  return `  <section class="happart${extraClass ? ' ' + extraClass : ''}" aria-labelledby="${id}">
    <div class="wrap happart__in">
      <header class="hrev__head happart__head">
        <h2 id="${id}">${title}</h2>
      </header>
      <ul class="happart__grid">
${items.map(([ic, h, p]) => `        <li><article class="happart-card">
          <span class="happart-card__ic">${IC[ic]}</span>
          <h3>${h}</h3>
          <p>${p}</p>
        </article></li>`).join('\n')}
      </ul>
    </div>
  </section>
`;
}

// ---- FAQ (HTML answers may hold links; JSON-LD gets the plain text)
const faq = [
  ['Erg Chigaga or Zagora: which should we choose?', 'Zagora if you have 2 days: low dunes and stony desert, about 6 to 7 hours from Marrakech on paved road. Erg Chigaga if you have 3 days or more: a real sea of dunes, 50 km past the end of the road, reached only by 4×4.'],
  ['Erg Chigaga or Merzouga?', 'Merzouga’s Erg Chebbi is taller, about 150 m, and easy to reach on paved roads, but busier. Erg Chigaga’s dunes are lower, about 50 to 60 m, yet the sand sea is bigger and almost empty: no village, no road, very few camps.'],
  ['How do we get to Erg Chigaga?', 'Drive to M’Hamid, the last village on the road south, about 7 to 8 hours from Marrakech or 1.5 hours from Zagora. From there it is about 50 km of desert track, 1.5 to 2.5 hours by 4×4. Our tours from Marrakech include the 4×4 all the way.'],
  ['Can we drive our own car or come by bus?', 'Yes, as far as M’Hamid: buses run there and to Zagora, and the road is paved. A normal car cannot reach the dunes, so you park in M’Hamid and we take you in by 4×4, as on our <a class="sdh-link" href="../tours/erg-chigaga-luxury-desert-camp.html">Erg Chigaga camp night</a>.'],
  ['When is the best time to go?', 'October to April. From June to August days pass 40 °C and the 4×4 ride is tiring; from December to February nights drop close to freezing, so bring warm layers. Book early for Christmas, New Year and Easter.'],
  ['How do I book and pay?', 'Send your request with the form on each tour page or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before.'],
];
const strip = s => s.replace(/<[^>]+>/g, '');
const faqHtml = faq.map(([q, a], i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q}</h3>${plus}</summary>
            <div class="hfaq-item__a"><p>${a}</p></div>
          </details>`).join('\n');
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };

const items = [
  ['tours/2-day-marrakech-to-zagora-desert-tour.html', '2-Day Marrakech to Zagora Desert Tour'],
  ['tours/3-day-marrakech-erg-chigaga-tour.html', '3-Day Marrakech to Erg Chigaga Desert Tour'],
  ['tours/4-day-marrakech-erg-chigaga-tour.html', '4-Day Marrakech to Erg Chigaga Tour'],
  ['tours/erg-chigaga-luxury-desert-camp.html', 'Erg Chigaga Luxury Desert Camp'],
  ['tours/6-day-marrakech-zagora-ouzina-merzouga-tour.html', '6-Day Marrakech, Zagora, Ouzina and Merzouga Tour'],
  ['tours/7-day-marrakech-erg-chigaga-merzouga-tour.html', '7-Day Marrakech to Erg Chigaga and Merzouga Tour'],
];
const listLd = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Erg Chigaga and Zagora desert tours', itemListElement: items.map(([u, n], i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/' + u, name: n })) };

// ---- head
const TITLE = 'Erg Chigaga &amp; Zagora Desert: Tours, Camps &amp; How to Get There';
const DESC = 'Private tours to Zagora and Erg Chigaga, the quiet desert of southern Morocco: 2 to 7 days from Marrakech by the Draa Valley, 4×4 into the dunes from M’Hamid, desert camps, and how they compare with Merzouga.';
let head = head0
  .replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="keywords" content=")[^"]*/, '$1Erg Chigaga, Zagora desert, Erg Chigaga tour, Zagora desert tour, Erg Chigaga camp, M’Hamid, Draa Valley, Erg Chigaga or Merzouga')
  .replace(/destinations\/merzouga\.html/g, 'destinations/erg-chigaga-zagora.html')
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/assets\/images\/merzouga-dune\.jpg/g, 'assets/images/desert-camel-acacia-tree.jpg')
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"ItemList"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(listLd) + '</script>')
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(faqLd) + '</script>');
// the Merzouga hub head carries duplicate ItemList/FAQPage copies: drop whatever Merzouga JSON-LD is left
head = head.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"(ItemList","name":"Things to do in Merzouga|FAQPage","mainEntity":\[\{"@type":"Question","name":"When is the best time to visit Merzouga)[^\n]*?<\/script>\r?\n?/g, '');
if ((head.match(/application\/ld\+json/g) || []).length !== 3) throw new Error('expected 3 JSON-LD blocks');
if (!head.includes('"Erg Chigaga and Zagora desert tours"') || !head.includes('Erg Chigaga or Zagora: which should we choose?')) throw new Error('JSON-LD not replaced');

const script = mz.slice(mz.lastIndexOf('<script>', mz.indexOf('</main>')), mz.indexOf('</main>'));
let combine = must(mz.match(/  <section class="section dtl-combine"[\s\S]*?<\/section>\n/), 'combine')[0];
combine = rep(combine, 'Want to add Merzouga to a Morocco tour?', 'Want to add the south to a Morocco tour?');
combine = rep(combine, 'add%20Merzouga%20activities%20to', 'add%20Zagora%20or%20Erg%20Chigaga%20to');
combine = rep(combine, 'We fit the activities you choose into your itinerary, with transfers and timings arranged.', 'Zagora or Erg Chigaga fits into a longer trip by Aït Ben Haddou; we plan the nights and the 4×4.');
let hcta = must(mz.match(/  <section class="hcta"[\s\S]*?<\/section>\n/), 'hcta')[0];
hcta = hcta.replace(/<img class="hcta__bg"[^>]*>/, '<img class="hcta__bg" src="/assets/images/desert-acacia-camels.jpg" alt="Camels and an acacia tree in the desert near Zagora" width="1600" height="1066" loading="lazy">');
hcta = rep(hcta, 'Plan Your Days in Merzouga', 'Plan Your Trip to Erg Chigaga');
hcta = rep(hcta, 'Tell us your dates and what you love; we’ll put the right activities together.', 'Tell us your dates and how many days you have; we’ll tell you if Zagora or Erg Chigaga fits.');
hcta = rep(hcta, 'planning%20my%20days%20in%20Merzouga', 'planning%20a%20trip%20to%20Erg%20Chigaga%20or%20Zagora');

const blog = [
  ['merzouga-or-zagora', 'sahara-dunes.jpg', 'Sand dunes in the Moroccan Sahara', 1200, 800, 'Merzouga or Zagora?', 'The two deserts you can reach from Marrakech, side by side.'],
  ['best-time-to-visit-sahara-desert', 'camel-caravan.webp', 'A camel caravan crossing the dunes', 1200, 800, 'The Best Time to Visit the Sahara', 'Heat, cold nights and sand winds, month by month.'],
  ['sleeping-in-a-sahara-desert-camp', 'desert-camp.webp', 'Tents of a desert camp in the dunes', 1200, 800, 'Sleeping in a Desert Camp', 'Tents, bathrooms, dinner and what to pack for the night.'],
  ['luxury-vs-standard-desert-camp', 'luxury-camp-night.jpg', 'A desert camp lit up at night', 1600, 1066, 'Luxury vs Standard Desert Camp', 'What changes between camps: tents, bathrooms, food and the price.'],
];
for (const b of blog) if (!fs.existsSync('blog/' + b[0] + '.html') || !fs.existsSync('assets/images/' + b[1])) throw new Error('blog/img ' + b[0]);
const blogHtml = blog.map(([u, img, alt, w, h, t, ex]) => `          <li><article class="hblog-card"><a class="hblog-card__link" href="../blog/${u}.html">
            <span class="hblog-card__img"><img src="/assets/images/${img}" alt="${alt}" width="${w}" height="${h}" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${t}</h3><span class="hblog-card__ex">${ex}</span></span>
          </a></article></li>`).join('\n');

const chips = [['ec-zagora2', '2 Days Zagora'], ['ec-chigaga3', '3 Days Chigaga'], ['ec-chigaga4', '4 Days Chigaga'], ['ec-camp', 'Luxury Camp'], ['ec-ouzina6', '6 Days + Merzouga'], ['ec-both7', '7 Days, Both Deserts']]
  .map(([id, n]) => `<li><a href="#${id}">${IC.spark}<span>${n}</span></a></li>`).join('');

const trust = [
  [IC.shield, 'Always private', 'Just your group, never strangers.'],
  [IC.car, '4×4 into the dunes', 'Your car and driver all the way.'],
  [IC.group, 'Local guide included', 'Drivers who know the tracks.'],
  [IC.clock, 'Free cancellation', 'Up to 24 hours before.'],
].map(([ic, b, s]) => `    <div class="trust__item">${tIc(ic)}<b>${b}</b><small>${s}</small></div>`).join('\n');

const main = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/desert-camel-acacia-tree.jpg" alt="Camels resting by an acacia tree in the empty desert of southern Morocco" width="1300" height="867" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="../index.html">Home</a><span class="sep">›</span><a href="../destinations/index.html">Destinations</a><span class="sep">›</span><span>Erg Chigaga &amp; Zagora</span></nav>
      <h1>Erg Chigaga &amp; Zagora<span class="script">The quiet south of the Sahara</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">Down the palm groves of the Draa Valley to Zagora, then past the end of the road to the wild dunes of Erg Chigaga. Fewer camps, no tour buses and real silence, by private 4×4 with a driver who knows the tracks.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why book Erg Chigaga and Zagora with us"><div class="wrap"><div class="trust__grid">
${trust}
  </div></div></section>
  <section class="section cstart mz-intro" aria-labelledby="ec-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="ec-intro-title">Zagora and Erg Chigaga, the Southern Sahara</h2>
      <p>South of Marrakech, over the High Atlas and past Aït Ben Haddou, the road follows the Draa Valley through palm groves and kasbahs to Zagora, about 6 to 7 hours away. Around Zagora the desert is stony with low dunes: the shortest real desert night from Marrakech, in 2 days. The road ends 1.5 hours further south at M’Hamid. From there, only a 4×4 reaches Erg Chigaga, about 50 km of desert track away: the biggest and emptiest dune sea in Morocco.</p>
      <p>Here are all our tours to the south: 2 days to Zagora, 3 or 4 days to Erg Chigaga, a camp night if you are already in M’Hamid, and longer tours that add Merzouga. Each one is private, and the price is agreed before you go.</p>
    </div>
  </div></section>
  <nav class="tbar tbar--dt" aria-label="Browse Erg Chigaga and Zagora tours"><div class="wrap tbar__bar">
    <ul class="tbar__list" id="list-ec">${chips}</ul>
  </div></nav>
  <section class="section dtl-list" id="desert-tours" aria-labelledby="ec-tours">
    <div class="wrap">
      <div class="head-row"><div><h2 id="ec-tours">Zagora &amp; Erg Chigaga Tours</h2></div></div>
      <ul class="htours__list dtl-grid">
${cards}
      </ul>
    </div>
  </section>
  <section class="section sdh-deserts" id="which-desert" aria-labelledby="ec-which-title"><div class="wrap">
    <div class="head-row"><div><h2 id="ec-which-title">Zagora, Erg Chigaga or Merzouga?</h2></div></div>
    <div class="dt-acc-wrap">
      <table class="dt-acc sdh-table">
        <thead><tr><th scope="col">Desert</th><th scope="col">From Marrakech</th><th scope="col">The dunes</th><th scope="col">Shortest trip</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="../tours/2-day-marrakech-to-zagora-desert-tour.html">Zagora</a><small>Short trips, paved road</small></th><td>About 6 to 7 hours (360 km), through the Draa Valley</td><td>Low dunes and stony desert</td><td><a href="../tours/2-day-marrakech-to-zagora-desert-tour.html">2 days</a></td></tr>
          <tr><th scope="row"><a href="../tours/3-day-marrakech-erg-chigaga-tour.html">Erg Chigaga</a><small>Wild and empty</small></th><td>About 8 hours, the last 50 km off-road by 4×4</td><td>Remote dune sea, about 50 to 60 m</td><td><a href="../tours/3-day-marrakech-erg-chigaga-tour.html">3 days</a></td></tr>
          <tr><th scope="row"><a href="merzouga.html">Merzouga</a><small>Tall dunes, the classic</small></th><td>9 to 10 hours (560 km)</td><td>Erg Chebbi, golden sand up to about 150 m</td><td><a href="../tours/3-days-desert-tour-marrakech-to-merzouga.html">3 days</a> (2 possible)</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sdh-note">Can’t choose? See both in <a href="../tours/7-day-marrakech-erg-chigaga-merzouga-tour.html">7 days</a>, read <a href="../blog/merzouga-or-zagora.html">Merzouga or Zagora</a>, or compare <a href="../sahara-desert-tours.html">all Sahara desert tours</a>.</p>
  </div></section>
${happart('ec-way', 'On the Way South', [
  ['gate', 'Aït Ben Haddou', 'The famous mud-brick ksar over the High Atlas, on every tour on the way out or back.'],
  ['palm', 'The Draa Valley', 'Palm groves, kasbahs and villages from Agdz to Zagora, the greenest road in the south.'],
  ['book', 'Tamegroute', 'Its green pottery and an old Koranic library, a short stop south of Zagora.'],
  ['pin', 'M’Hamid', 'The last village at the end of the road, where the 4×4 track to the dunes begins.'],
  ['dune', 'The Erg Chigaga Dunes', 'A sea of sand with few camps: a sunset camel ride, dinner by the fire and a sky full of stars.'],
  ['flat', 'The Iriqui Dry Lake', 'The way back by 4×4 across a flat lakebed on the old Paris–Dakar track to Foum Zguid.'],
], 'mz-combos')}${happart('ec-get', 'Getting to Erg Chigaga', [
  ['map', 'From Marrakech', 'Our tours pick you up at your hotel or riad and keep the same 4×4 and driver all the way, dunes included.'],
  ['car', 'Already in the south', 'Drive or take a bus to Zagora or M’Hamid. Leave your car in M’Hamid and we take you in by 4×4 for a <a class="sdh-link" href="../tours/erg-chigaga-luxury-desert-camp.html">night at the camp</a>.'],
  ['dune', 'With Merzouga too', 'Both deserts in one trip: the <a class="sdh-link" href="../tours/7-day-marrakech-erg-chigaga-merzouga-tour.html">7-day tour</a>, or Zagora and Ouzina on the way to Merzouga in <a class="sdh-link" href="../tours/6-day-marrakech-zagora-ouzina-merzouga-tour.html">6 days</a>.'],
], 'mz-getting')}${happart('ec-why', 'Why Book Erg Chigaga With Us', [
  ['coin', 'Transparent Pricing', 'What we agree on is what you pay; nothing extra at the camp.'],
  ['group', 'Always Private', 'Your own 4×4, driver and guide, never shared with strangers.'],
  ['car', 'The Right Vehicle', 'A 4×4 all the way, not a minivan that stops at the village camps.'],
  ['pin', 'Drivers Who Know the Tracks', 'They take the piste slowly and stop whenever you want.'],
  ['clock', 'Free Cancellation', 'Up to 24 hours before, with a small deposit to book.'],
  ['chat', 'Local Team 24/7', 'English-speaking and on WhatsApp, based in Marrakech.'],
])}  <section class="hfaq mz-faq" aria-labelledby="ec-faq-title">
    <div class="wrap hfaq__in hfaq__grid">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="ec-faq-title">Erg Chigaga &amp; Zagora FAQ</h2>
        </header>
        <div class="hfaq__list">
${faqHtml}
        </div>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../faq.html">View All FAQs</a></div>
      </div>
      <aside class="hblog" aria-labelledby="ec-blog-title">
        <header class="hrev__head hfaq__head">
          <h2 id="ec-blog-title">Read Before You Go</h2>
        </header>
        <ul class="hblog__list">
${blogHtml}
        </ul>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../blog.html">Read More Articles</a></div>
      </aside>
    </div>
  </section>
${combine}${hcta}${script}`;

const html = head + main + foot;
fs.writeFileSync(OUT, html);
console.log(OUT + ' written', html.length);
