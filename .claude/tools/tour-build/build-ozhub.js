// Builds destinations/ouarzazate.html (rebuilt destination page) from the finished Merzouga hub shell, same layout as build-eshub.js.
// Cards: Ait Ben Haddou day trip from destinations/marrakech.html (duration corrected to the day-trip page), 2-day and 3-day tours from tours/index.html.
// Facts only from our own pages (see .claude/research/ouarzazate-destination-research.md).
// Run from the project root: node .claude/tools/tour-build/build-ozhub.js  (do not re-run after manual edits to the page)
const fs = require("fs");
const mz = fs.readFileSync("destinations/merzouga.html", "utf8");
const mk = fs.readFileSync("destinations/marrakech.html", "utf8");
const ti = fs.readFileSync("tours/index.html", "utf8");

const head0 = mz.slice(0, mz.indexOf('<main>'));
const foot = mz.slice(mz.indexOf('</main>'));

function card(src, slug, newId) {
  const m = src.match(new RegExp('<article class="htour[^"]*"><a class="htour__link" href="\\.\\./tours/' + slug + '">[\\s\\S]*?</a></article>'));
  if (!m) throw new Error('card ' + slug);
  return '<li id="' + newId + '">' + m[0] + '</li>';
}
const IC = {
  spark: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18h18M6 18a6 6 0 0112 0"/><path d="M12 6v2M5.6 9.6l1.4 1.4M18.4 9.6L17 11"/></svg>',
  group: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M16 5.5a3 3 0 010 5.8M17 20c0-2.6-.9-4.2-2.5-5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6L12 3z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.4"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 16v-4l2-5h14l2 5v4H3z"/><path d="M3 12h18"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/></svg>',
  gate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V10a8 8 0 0116 0v11"/><path d="M8 21v-9a4 4 0 018 0v9M2 21h20"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4z"/><path d="M9 4v14M15 6v14"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M14.2 9.6c-.4-.6-1.2-1-2.2-1-1.3 0-2.2.7-2.2 1.6 0 2.2 4.4 1.2 4.4 3.4 0 .9-.9 1.6-2.2 1.6-1 0-1.8-.4-2.2-1M12 7v1.6M12 15.4V17"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13v-1a7 7 0 0114 0v1M5 13a2 2 0 00-2 2v1a2 2 0 002 2h1v-5H5zm14 0a2 2 0 012 2v1a2 2 0 01-2 2h-1v-5h1zM12 21h3a2 2 0 002-2v-1"/></svg>',
  wave: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M2 17c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5"/><path d="M2 7c2 0 2-1.5 4-1.5S8 7 10 7s2-1.5 4-1.5S16 7 18 7s2-1.5 4-1.5"/></svg>',
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

// ---- cards. The Marrakech-hub copy of the Ait Ben Haddou card says "about 11 hours"; the day-trip page says about 12.
const abhCard = card(mk, 'marrakech-to-ait-ben-haddou-day-trip.html', 'oz-abh').replace('1 day (about 11 hours)', '1 day (about 12 hours)');
if (abhCard.includes('about 11 hours')) throw new Error('abh card not patched');
const tripCards = [abhCard, card(ti, '2-day-ouarzazate-to-merzouga-desert-tour.html', 'oz-2day'), card(ti, '3-days-desert-tour-marrakech-to-merzouga.html', 'oz-3day')].join('\n');

// ---- FAQ (HTML answers may hold links; JSON-LD gets the plain text)
const faq = [
  ['Is the day trip from Marrakech worth it?', 'Yes, if the Sahara is not in your plans: you cross the High Atlas, walk the ksar of Aït Ben Haddou with a guide and see Ouarzazate in one long day, about 7 hours on the road in total. If you are going to the desert anyway, skip the day trip: Aït Ben Haddou is day one of our <a class="sdh-link" href="../tours/3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a>.'],
  ['Should we stay a night in Aït Ben Haddou or in Ouarzazate?', 'Aït Ben Haddou for the ksar at its best: the sunset on the clay walls and a quiet sunrise before the day visitors arrive. Ouarzazate, about half an hour away, has more hotels and is closer to the studios and the Taourirt Kasbah. Both work as a first night on the way to the desert.'],
  ['Is the Tizi n’Tichka road safe? I get car-sick.', 'Yes, it is a good paved road, but it climbs to 2,260 m with many bends, and road works can add some time. Ask for the front seat, and we stop at the viewpoints and whenever you need. From December to February the pass can be cold or snowy; your driver checks the road the day before.'],
  ['When is the best time to visit Ouarzazate?', 'Spring and autumn, with warm days and cool nights. Summer is very hot in the ksar and the valleys, so we start early. Winter days are sunny and pleasant, but nights are cold and the pass may have snow.'],
  ['Can we start a desert tour in Ouarzazate?', 'Yes. Our <a class="sdh-link" href="../tours/2-day-ouarzazate-to-merzouga-desert-tour.html">2-day Ouarzazate to Merzouga tour</a> picks you up at your hotel or the airport around 07:30, goes out by the Dades Valley and the Todra Gorge to a camp in the dunes, and comes back by the southern oases. Staying in Skoura or Aït Ben Haddou? We pick you up there.'],
  ['How do I book and pay?', 'Send your request with the form on each tour page or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before.'],
];
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
const faqHtml = faq.map(([q, a], i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q}</h3>${plus}</summary>
            <div class="hfaq-item__a"><p>${a}</p></div>
          </details>`).join('\n');
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };

const items = [
  ['tours/marrakech-to-ait-ben-haddou-day-trip.html', 'Aït Ben Haddou & Ouarzazate Day Trip from Marrakech'],
  ['tours/2-day-ouarzazate-to-merzouga-desert-tour.html', '2-Day Ouarzazate to Merzouga Desert Tour'],
  ['tours/3-days-desert-tour-marrakech-to-merzouga.html', '3-Day Marrakech to Merzouga Desert Tour'],
  ['tours/4-day-marrakech-to-merzouga-desert-tour.html', '4-Day Marrakech to Merzouga Desert Tour'],
  ['tours/4-day-marrakech-erg-chigaga-tour.html', '4-Day Erg Chigaga Desert Tour from Marrakech'],
  ['tours/7-days-morocco-tour.html', '7-Day Morocco Tour from Marrakech to Fes'],
  ['tours/5-day-fes-to-marrakech-desert-tour.html', '5-Day Fes to Marrakech Desert Tour'],
];
const listLd = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Things to do in Ouarzazate', itemListElement: items.map(([u, n], i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/' + u, name: n })) };

// ---- head (shell = Merzouga hub; URL and meta = Ouarzazate)
const HERO = 'ait-ben-haddou-kasbah.jpg';
const TITLE = 'Visit Ouarzazate &amp; Aït Ben Haddou: Private Tours, Day Trips &amp; Tips';
const DESC = 'Visit Ouarzazate, Aït Ben Haddou and the Dades Valley with a local: a private day trip from Marrakech, desert tours that start or stop here, the kasbahs and film studios, how many days you need and how to get there.';
const hdrAt = head0.indexOf('<header');
const header = head0.slice(hdrAt).replace(' class="is-active"', ' class=""');
let head = head0.slice(0, hdrAt)
  .replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="keywords" content=")[^"]*/, '$1visit Ouarzazate, Ait Ben Haddou, Ouarzazate tour, Ait Ben Haddou day trip, Marrakech to Ouarzazate, Dades Valley, things to do in Ouarzazate, Atlas Film Studios')
  .replace(/destinations\/merzouga\.html/g, 'destinations/ouarzazate.html')
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/assets\/images\/merzouga-dune\.jpg/g, 'assets/images/' + HERO)
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"ItemList"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(listLd) + '</script>')
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(faqLd) + '</script>');
if (!head.includes('"Things to do in Ouarzazate"') || !head.includes('Can we start a desert tour in Ouarzazate?')) throw new Error('JSON-LD not replaced');

const script = mz.slice(mz.lastIndexOf('<script>', mz.indexOf('</main>')), mz.indexOf('</main>'))
  .replace("if(list.scrollWidth>list.clientWidth)", "if(li.tagName==='LI' && list.scrollWidth>list.clientWidth)")
  .replace("var c=li.querySelector('.htour'); c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash');", "var c=li.querySelector(':scope > .htour'); if(c){ c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash'); }");
if (!script.includes("li.tagName==='LI'") || !script.includes('if(c){')) throw new Error('chip script not patched');
const combine = mz.match(/  <section class="section dtl-combine"[\s\S]*?<\/section>\n/)[0]
  .replace('Want to add Merzouga to a Morocco tour?', 'Want a night in the kasbahs on your tour?')
  .replace('add%20Merzouga%20activities%20to', 'add%20Ouarzazate%20or%20A%C3%AFt%20Ben%20Haddou%20to')
  .replace('We fit the activities you choose into your itinerary, with transfers and timings arranged.', 'Most of our desert tours cross Ouarzazate; we can add a night in Aït Ben Haddou, Skoura or the Dades Valley to your route.');
const hcta = mz.match(/  <section class="hcta"[\s\S]*?<\/section>\n/)[0]
  .replace(/<img class="hcta__bg"[^>]*>/, '<img class="hcta__bg" src="/assets/images/dades-road.jpg" alt="The winding road up the Dades Gorge" width="1080" height="1349" loading="lazy">')
  .replace('Plan Your Days in Merzouga', 'Plan Your Days in Ouarzazate')
  .replace('Tell us your dates and what you love; we’ll put the right activities together.', 'Tell us your dates and where you start; we’ll plan the kasbahs, the valleys and the road to the dunes.')
  .replace('planning%20my%20days%20in%20Merzouga', 'planning%20my%20days%20in%20Ouarzazate');
if (/Merzouga<|Merzouga /.test(hcta) || combine.includes('Merzouga')) console.warn('WARN: Merzouga left in combine/hcta');

const blog = [
  ['best-things-to-do-in-ouarzazate', 'ouarzazate-taourirt.jpg', 'Taourirt Kasbah in Ouarzazate', 1600, 1066, 'Best Things to Do in Ouarzazate', 'Aït Ben Haddou, the Taourirt Kasbah, the film studios and the Fint oasis.'],
  ['best-things-to-do-in-dades-valley', 'dades-valley.jpg', 'Kasbahs and fields in the Dades Valley', 702, 456, 'Best Things to Do in the Dades Valley', 'The gorge switchbacks, the Monkey Fingers and the kasbah villages.'],
  ['best-things-to-do-in-todra-gorge', 'todra-gorge-walk.jpg', 'Walking between the high walls of the Todra Gorge', 1600, 1066, 'Best Things to Do at the Todra Gorge', 'Walks between the canyon walls, on the road to the dunes.'],
  ['marrakech-to-merzouga-route-guide', 'atlas-snow-autumn.jpg', 'High Atlas peaks on the way to the Tichka pass', 1600, 1066, 'Marrakech to Merzouga: The Route Guide', 'Stop by stop over the Atlas, through Ouarzazate to the Sahara.'],
];
const blogHtml = blog.map(([u, img, alt, w, h, t, ex]) => `          <li><article class="hblog-card"><a class="hblog-card__link" href="../blog/${u}.html">
            <span class="hblog-card__img"><img src="/assets/images/${img}" alt="${alt}" width="${w}" height="${h}" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${t}</h3><span class="hblog-card__ex">${ex}</span></span>
          </a></article></li>`).join('\n');

const chips = [['tours', 'Tours &amp; Day Trips'], ['sights', 'Kasbahs &amp; Valleys'], ['how-many-days', 'How Many Days'], ['stay', 'On the Way to the Desert'], ['getting-here', 'Getting Here']]
  .map(([id, n]) => `<li><a href="#${id}">${IC.spark}<span>${n}</span></a></li>`).join('');

const trust = [
  [IC.shield, 'Always private', 'Just your group, never strangers.'],
  [IC.car, 'Hotel or airport pick-up', 'In Marrakech or Ouarzazate.'],
  [IC.coin, 'No shop stops', 'Unless you ask for one.'],
  [IC.clock, 'Free cancellation', 'Up to 24 hours before.'],
].map(([ic, b, s]) => `    <div class="trust__item">${tIc(ic)}<b>${b}</b><small>${s}</small></div>`).join('\n');

const main = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/${HERO}" alt="The earthen ksar of Aït Ben Haddou above the river, near Ouarzazate" width="1600" height="1066" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="../index.html">Home</a><span class="sep">›</span><a href="../destinations/index.html">Destinations</a><span class="sep">›</span><span>Ouarzazate</span></nav>
      <h1>Ouarzazate &amp; Aït Ben Haddou<span class="script">Kasbahs on the road to the Sahara</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">South of the High Atlas, the clay ksar of Aït Ben Haddou, the film studios of Ouarzazate and the Road of a Thousand Kasbahs to the Dades Valley. Come on a private day trip from Marrakech, or stop here on your way to the dunes.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why visit Ouarzazate with us"><div class="wrap"><div class="trust__grid">
${trust}
  </div></div></section>
  <section class="section cstart mz-intro" aria-labelledby="oz-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="oz-intro-title">More Than a Photo Stop</h2>
      <p>Most travellers see Ouarzazate on day one of a desert tour: a long drive over the Tizi n’Tichka pass and an hour at Aït Ben Haddou between coaches. It deserves more. With your own guide you cross the river, climb to the old granary above the ksar and choose between the film studios and the Taourirt Kasbah, and with a night here you see the clay walls at sunset and sunrise, when the day visitors have gone.</p>
      <p>Here is how we do Ouarzazate: the day trip from Marrakech, desert tours that start or sleep here, the kasbahs and valleys around it, how long to stay and how to get there. Each trip is private, with pick-up at your hotel, riad or Ouarzazate airport, and the price is agreed before you go.</p>
    </div>
  </div></section>
  <nav class="tbar tbar--dt" aria-label="Browse Ouarzazate"><div class="wrap tbar__bar">
    <ul class="tbar__list" id="list-oz">${chips}</ul>
  </div></nav>
  <section class="section dtl-list" id="tours" aria-labelledby="oz-tours">
    <div class="wrap">
      <div class="head-row"><div><h2 id="oz-tours">Tours &amp; Day Trips to Ouarzazate</h2></div></div>
      <ul class="htours__list dtl-grid">
${tripCards}
      </ul>
      <p class="sdh-note">Long drives or bends bother you? The <a href="../tours/marrakech-atlas-mountains-day-trip.html">Atlas Mountains &amp; Imlil day trip</a> is 1.5 hours from Marrakech. All our desert routes are on the <a href="../sahara-desert-tours.html">Sahara desert tours</a> page.</p>
    </div>
  </section>
${happart('oz-city', 'Things to Do around Ouarzazate', [
  ['gate', 'The Ksar of Aït Ben Haddou', 'The UNESCO-listed clay village of Gladiator and Game of Thrones, above the Ounila river. Cross the river, walk the alleys and climb to the old granary for the view. A few houses inside ask a few dirhams to go in.'],
  ['pin', 'The Taourirt Kasbah', 'In Ouarzazate itself: the 19th-century palace of the Glaoui family, a maze of towers, rooms and painted ceilings. A small entry fee.'],
  ['spark', 'The Atlas Film Studios', 'Morocco’s film capital: walk the sets of the international films shot in the desert around town, on a guided visit (about 80 MAD).'],
  ['sun', 'Skoura &amp; Kasbah Amridil', 'A palm oasis just east of Ouarzazate on the kasbah road, with the restored Kasbah Amridil, one of the finest in the south (small fee to go in).'],
  ['map', 'The Valley of Roses &amp; the Dades', 'The rose gardens of Kalaat M’Gouna, then the red villages, the Monkey Fingers rocks and the hairpin road up the Dades Gorge.'],
  ['car', 'Telouet on the Old Road', 'The Glaoui palace on the old caravan road over the Atlas, with painted cedar ceilings, carved plaster and tiled halls. An easy add-on to the day trip or on the way back to Marrakech.'],
], 'mz-combos oz-city')}${happart('oz-days', 'How Many Days around Ouarzazate?', [
  ['clock', 'A Day Trip', 'From Marrakech: about two hours in the ksar with a guide, an hour at the studios or the kasbah, and about 7 hours on the road.'],
  ['sun', 'One Night', 'The best fit for most: Aït Ben Haddou at sunset and sunrise, and no rush back over the pass.'],
  ['spark', 'Two Nights', 'Add Skoura, the Valley of Roses and a night in the Dades Valley, with walks in the gorge.'],
  ['map', 'On a Desert Tour', 'Ouarzazate sits on the road from Marrakech to Merzouga and Erg Chigaga, so most of our desert tours stop or sleep here. See the tours below.'],
], 'mz-combos oz-days')}  <section class="section sdh-deserts" id="stay" aria-labelledby="oz-stay-title"><div class="wrap">
    <div class="head-row"><div><h2 id="oz-stay-title">Desert Tours through Ouarzazate</h2><p>Every road from Marrakech to the dunes crosses Ouarzazate. Pick the night that suits you.</p></div></div>
    <div class="dt-acc-wrap">
      <table class="dt-acc sdh-table">
        <thead><tr><th scope="col">Tour</th><th scope="col">Night on the kasbah road</th><th scope="col">Desert</th><th scope="col">Best for</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="../tours/2-day-ouarzazate-to-merzouga-desert-tour.html">2 days, from Ouarzazate</a><small>Ouarzazate loop</small></th><td>Starts and ends in Ouarzazate</td><td>Merzouga, one camp night</td><td>Already in Ouarzazate or flying in</td></tr>
          <tr><th scope="row"><a href="../tours/3-days-desert-tour-marrakech-to-merzouga.html">3 days, Marrakech loop</a><small>Back to Marrakech</small></th><td>Aït Ben Haddou on the way, night in the Dades Valley</td><td>Merzouga</td><td>A first desert trip</td></tr>
          <tr><th scope="row"><a href="../tours/4-day-marrakech-to-merzouga-desert-tour.html">4 days, Marrakech loop</a><small>Telouet on the way back</small></th><td>Dades Valley and Ouarzazate</td><td>Merzouga</td><td>Shorter drives each day</td></tr>
          <tr><th scope="row"><a href="../tours/4-day-marrakech-erg-chigaga-tour.html">4 days, Erg Chigaga</a><small>Back to Marrakech</small></th><td>Ouarzazate</td><td>Erg Chigaga</td><td>Wilder, quieter dunes</td></tr>
          <tr><th scope="row"><a href="../tours/7-days-morocco-tour.html">7 days, Marrakech to Fes</a><small>Ends in Fes</small></th><td>Aït Ben Haddou and the Dades Valley</td><td>Merzouga</td><td>Ending in Fes</td></tr>
          <tr><th scope="row"><a href="../tours/5-day-fes-to-marrakech-desert-tour.html">5 days, Fes to Marrakech</a><small>Ends in Marrakech</small></th><td>Dades Valley and Aït Ben Haddou</td><td>Merzouga</td><td>Starting in Fes</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sdh-note">Not sure which desert to choose? See <a href="../destinations/merzouga.html">Merzouga</a> and <a href="../destinations/erg-chigaga-zagora.html">Erg Chigaga &amp; Zagora</a>.</p>
  </div></section>
${happart('oz-get', 'Getting to Ouarzazate', [
  ['car', 'From Marrakech', 'About 190 km to Aït Ben Haddou over the Tizi n’Tichka pass, 3.5 hours with stops, then half an hour on to Ouarzazate.'],
  ['sun', 'Over the Pass', 'A good paved road up to 2,260 m with many bends: ask for the front seat if you get car-sick. Cold or snowy from December to February.'],
  ['pin', 'By Air', 'Ouarzazate has a small airport. We pick you up there for our <a class="sdh-link" href="../tours/2-day-ouarzazate-to-merzouga-desert-tour.html">2-day desert tour</a> or any private route.'],
  ['map', 'On to the Desert', 'About 140 km and 2.5 hours to the Dades Gorge, and about 360 km to the Merzouga dunes: a full day with stops.'],
], 'mz-combos oz-getting')}${happart('oz-why', 'Why Visit Ouarzazate With Us', [
  ['coin', 'Transparent Pricing', 'What we agree on is what you pay; no surprise extras on the day.'],
  ['group', 'Always Private', 'Your own driver and car, never shared with strangers.'],
  ['shield', 'No Shop Stops', 'No carpet or argan shop built in; we stop only if you ask.'],
  ['pin', 'Local Guides', 'A local guide walks you through the ksar, up to the granary.'],
  ['clock', 'Free Cancellation', 'Up to 24 hours before, with a small deposit to book.'],
  ['chat', 'Local Team 24/7', 'English-speaking and on WhatsApp, day and night.'],
])}  <section class="hfaq mz-faq" aria-labelledby="oz-faq-title">
    <div class="wrap hfaq__in hfaq__grid">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="oz-faq-title">Ouarzazate FAQ</h2>
        </header>
        <div class="hfaq__list">
${faqHtml}
        </div>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../faq.html">View All FAQs</a></div>
      </div>
      <aside class="hblog" aria-labelledby="oz-blog-title">
        <header class="hrev__head hfaq__head">
          <h2 id="oz-blog-title">Read Before You Go</h2>
        </header>
        <ul class="hblog__list">
${blogHtml}
        </ul>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../blog.html">Read More Articles</a></div>
      </aside>
    </div>
  </section>
${combine}${hcta}${script}`;

const main2 = main
  .replace('<section class="happart mz-combos oz-city" aria-labelledby="oz-city"', '<section class="happart mz-combos oz-city" id="sights" aria-labelledby="oz-city"')
  .replace('<section class="happart mz-combos oz-days" aria-labelledby="oz-days"', '<section class="happart mz-combos oz-days" id="how-many-days" aria-labelledby="oz-days"')
  .replace('<section class="happart mz-combos oz-getting" aria-labelledby="oz-get"', '<section class="happart mz-combos oz-getting" id="getting-here" aria-labelledby="oz-get"');
for (const id of ['sights', 'how-many-days', 'getting-here']) if (!main2.includes(`id="${id}"`)) throw new Error('chip id ' + id);
const out = head + header + main2 + foot;
fs.writeFileSync('destinations/ouarzazate.html', out);
console.log('destinations/ouarzazate.html written', out.length);
