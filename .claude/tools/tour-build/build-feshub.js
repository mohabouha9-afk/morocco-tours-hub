// Builds destinations/fes.html (rebuilt destination page) from the finished Merzouga hub shell, same layout as build-mkhub.js.
// Cards taken from the old destinations/fes.html (made by fes-link.js); facts only from our own pages
// (see .claude/research/fes-destination-research.md).
// Run from the project root: node .claude/tools/tour-build/build-feshub.js  (do NOT re-run: it overwrites its own card source)
const fs = require('fs');
const mz = fs.readFileSync('destinations/merzouga.html', 'utf8');
const old = fs.readFileSync('destinations/fes.html', 'utf8');

const head0 = mz.slice(0, mz.indexOf('<main>'));
const foot = mz.slice(mz.indexOf('</main>'));

// ---- cards from the old Fes page
function card(slug, newId) {
  const m = old.match(new RegExp('<article class="htour htour--dt"><a class="htour__link" href="\\.\\./tours/' + slug + '">[\\s\\S]*?</a></article>'));
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
  balloon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 00-6 6c0 3.5 3.5 6.5 5 8h2c1.5-1.5 5-4.5 5-8a6 6 0 00-6-6z"/><rect x="10" y="19" width="4" height="2.5" rx=".5"/><path d="M11 17l-.3 2M13 17l.3 2"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 16v-4l2-5h14l2 5v4H3z"/><path d="M3 12h18"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/></svg>',
  gate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V10a8 8 0 0116 0v11"/><path d="M8 21v-9a4 4 0 018 0v9M2 21h20"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4z"/><path d="M9 4v14M15 6v14"/></svg>',
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


const tripCards = [
  ['fes-medina-guided-tour.html', 'fs-medina'], ['fes-to-chefchaouen-day-trip.html', 'fs-chaouen'],
  ['fes-volubilis-meknes-day-trip.html', 'fs-volubilis'], ['fes-middle-atlas-ifrane-azrou-day-trip.html', 'fs-atlas'],
].map(([a, b]) => card(a, b)).join('\n');

// ---- FAQ (HTML answers may hold links; JSON-LD gets the plain text)
const faq = [
  ['How many days do we need in Fes?', 'Two days for the medina, with a guide on the first one. Add a third day for Volubilis and Meknes, Chefchaouen or the Middle Atlas, and two to three more if you go on to the Sahara.'],
  ['Do we need a guide in the Fes medina?', 'Yes, more than in any other Moroccan city. The lanes are a real maze, phone maps lose their way, and young men offer to “show you the tannery” for money. With our <a class="sdh-link" href="../tours/fes-medina-guided-tour.html">medina tour</a> nobody bothers you, there are no shop stops, and your guide shows you landmarks to find your way alone.'],
  ['How do we get from the airport to our riad?', 'Fes Saiss airport is 20 to 25 minutes from the city. With our <a class="sdh-link" href="../tours/fes-airport-transfer.html">airport transfer</a> your driver tracks the flight and waits with your name; cars cannot enter the medina, so he stops at the nearest gate and a porter carries your bags to the riad door.'],
  ['When is the best time to visit Fes?', 'Spring (March to May) and autumn (September to November), when the weather is mild for walking the medina all day. Summer is hot and the lanes hold the heat, so we start early. Winter is cool and sometimes rainy, but quiet.'],
  ['Can we see the Sahara from Fes?', 'Yes. Merzouga is about 470 km away, eight hours through the cedar forests of the Middle Atlas and the Ziz Valley. Two days gives you one night in the dunes; three days adds a full day there. Compare them in our <a class="sdh-link" href="../desert-tours-from-fes.html">desert tours from Fes</a>.'],
  ['How do I book and pay?', 'Send your request with the form on each tour page or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before.'],
];
const strip = s => s.replace(/<[^>]+>/g, '');
const faqHtml = faq.map(([q, a], i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q}</h3>${plus}</summary>
            <div class="hfaq-item__a"><p>${a}</p></div>
          </details>`).join('\n');
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };

const items = [
  ['tours/fes-medina-guided-tour.html', 'Guided Tour of the Fes Medina'],
  ['tours/fes-to-chefchaouen-day-trip.html', 'Fes to Chefchaouen Day Trip'],
  ['tours/fes-volubilis-meknes-day-trip.html', 'Volubilis, Moulay Idriss & Meknes Day Trip'],
  ['tours/fes-middle-atlas-ifrane-azrou-day-trip.html', 'Middle Atlas Day Trip: Ifrane & Azrou'],
  ['tours/fes-airport-transfer.html', 'Fes Airport Transfer (FEZ)'],
  ['tours/2-day-fes-to-merzouga-desert-tour.html', '2-Day Fes to Merzouga Desert Tour'],
  ['tours/3-day-fes-to-merzouga-desert-tour.html', '3-Day Fes to Merzouga Desert Tour'],
  ['tours/4-day-fes-desert-tour.html', '4-Day Fes Desert Tour'],
  ['tours/3-day-fes-to-marrakech-desert-tour.html', '3-Day Fes to Marrakech Desert Tour'],
];
const listLd = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Things to do in Fes', itemListElement: items.map(([u, n], i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/' + u, name: n })) };

// ---- head (shell = Merzouga hub; URL and meta = Fes)
const HERO = 'fes-royal-palace-gates.jpg';
const TITLE = 'Visit Fes with a Local: Private Medina Tours, Day Trips &amp; Tips';
const DESC = 'Visit Fes on your terms: a private medina tour with no shop stops, the tanneries and madrasas, day trips to Chefchaouen, Volubilis and the Middle Atlas, how many days you need and the Sahara from Fes.';
const hdrAt = head0.indexOf('<header');
const header = head0.slice(hdrAt).replace(' class="is-active"', ' class=""');
let head = head0.slice(0, hdrAt)
  .replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="keywords" content=")[^"]*/, '$1visit Fes, Fes private tour, Fes medina guided tour, things to do in Fes, Fes day trips, how many days in Fes, Fes tannery')
  .replace(/destinations\/merzouga\.html/g, 'destinations/fes.html')
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/assets\/images\/merzouga-dune\.jpg/g, 'assets/images/' + HERO)
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"ItemList"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(listLd) + '</script>')
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(faqLd) + '</script>');
if (!head.includes('"Things to do in Fes"') || !head.includes('How many days do we need in Fes?')) throw new Error('JSON-LD not replaced');

const script = mz.slice(mz.lastIndexOf('<script>', mz.indexOf('</main>')), mz.indexOf('</main>'))
  .replace("if(list.scrollWidth>list.clientWidth)", "if(li.tagName==='LI' && list.scrollWidth>list.clientWidth)")
  .replace("var c=li.querySelector('.htour'); c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash');", "var c=li.querySelector(':scope > .htour'); if(c){ c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash'); }");
if (!script.includes("li.tagName==='LI'") || !script.includes('if(c){')) throw new Error('chip script not patched');
const combine = mz.match(/  <section class="section dtl-combine"[\s\S]*?<\/section>\n/)[0]
  .replace('Want to add Merzouga to a Morocco tour?', 'Want Fes in a longer tour?')
  .replace('add%20Merzouga%20activities%20to', 'add%20Fes%20days%20to')
  .replace('We fit the activities you choose into your itinerary, with transfers and timings arranged.', 'Many of our tours start or end in Fes; we add your medina days and day trips around the route.');
const hcta = mz.match(/  <section class="hcta"[\s\S]*?<\/section>\n/)[0]
  .replace(/<img class="hcta__bg"[^>]*>/, '<img class="hcta__bg" src="/assets/images/volubilis-basilica-moulay-idriss.jpg" alt="The Roman basilica of Volubilis with the town of Moulay Idriss on the hill behind" width="1600" height="1067" loading="lazy">')
  .replace('Plan Your Days in Merzouga', 'Plan Your Days in Fes')
  .replace('Tell us your dates and what you love; we’ll put the right activities together.', 'Tell us your dates and what you love; we’ll plan your days in the medina and out of it.')
  .replace('planning%20my%20days%20in%20Merzouga', 'planning%20my%20days%20in%20Fes');
if (combine.includes('Merzouga') || hcta.includes('Merzouga')) console.warn('WARN: Merzouga left in combine/hcta');

const blog = [
  ['best-things-to-do-in-fes', 'grand-fes-coppersmith.jpg', 'A coppersmith at work in the Fes medina', 975, 1300, 'Best Things to Do in Fes', 'The madrasas, the tanneries, the souks and the views over the old city.'],
  ['best-time-to-visit-fes', 'fes.jpg', 'A carved wooden door in the Fes medina', 1170, 1560, 'The Best Time to Visit Fes', 'Season by season, and why summer days start early.'],
  ['morocco-itinerary-marrakech-to-fes', 'merzouga-dune.jpg', 'Golden sand dune at Merzouga', 1200, 800, 'Marrakech to Fes Itinerary', 'Crossing Morocco between the two cities, by the desert.'],
  ['morocco-travel-tips-first-time-visitors', 'souk-carpets.jpg', 'Carpets hanging in a Moroccan souk', 800, 600, 'Morocco Travel Tips for First-Timers', 'Money, dress, haggling and the things worth knowing before you land.'],
];
const blogHtml = blog.map(([u, img, alt, w, h, t, ex]) => `          <li><article class="hblog-card"><a class="hblog-card__link" href="../blog/${u}.html">
            <span class="hblog-card__img"><img src="/assets/images/${img}" alt="${alt}" width="${w}" height="${h}" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${t}</h3><span class="hblog-card__ex">${ex}</span></span>
          </a></article></li>`).join('\n');

const chips = [['tours', 'Tours &amp; Day Trips'], ['medina', 'In the Medina'], ['how-many-days', 'How Many Days'], ['desert', 'The Desert'], ['getting-here', 'Getting Here']]
  .map(([id, n]) => `<li><a href="#${id}">${IC.spark}<span>${n}</span></a></li>`).join('');

const trust = [
  [IC.shield, 'Always private', 'Just your group, never strangers.'],
  [IC.gate, 'Riad pick-up', 'At the nearest medina gate.'],
  [IC.coin, 'No shop stops', 'Unless you ask for one.'],
  [IC.clock, 'Free cancellation', 'Up to 24 hours before.'],
].map(([ic, b, s]) => `    <div class="trust__item">${tIc(ic)}<b>${b}</b><small>${s}</small></div>`).join('\n');

const main = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/${HERO}" alt="The golden gates of the Royal Palace in Fes" width="1300" height="866" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="../index.html">Home</a><span class="sep">›</span><a href="../destinations/index.html">Destinations</a><span class="sep">›</span><span>Fes</span></nav>
      <h1>Fes<span class="script">The old medina, with a local</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">Morocco’s oldest imperial city: a car-free medina of some 9,000 lanes, madrasas of carved cedar and the tanneries seen from a rooftop. Explore it privately with a local guide, then head out to Chefchaouen, Volubilis or the Sahara.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why visit Fes with us"><div class="wrap"><div class="trust__grid">
${trust}
  </div></div></section>
  <section class="section cstart mz-intro" aria-labelledby="fs-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="fs-intro-title">Fes, Without Getting Lost</h2>
      <p>Fes el-Bali is the real medieval Morocco, and also the easiest place in the country to get lost: phone maps give up in the lanes, and young men offer to “show you the tannery”, then walk you into a leather shop. With a local guide the medina opens up instead: the madrasas, the craftsmen at work, the view over the dye pits.</p>
      <p>Here is everything we do in Fes: a guided medina tour, day trips to the blue city, the Roman ruins and the cedar forests, and the road to the Sahara. Each one is private, with pick-up at your riad or hotel, and the price is agreed before you go.</p>
    </div>
  </div></section>
  <nav class="tbar tbar--dt" aria-label="Browse Fes"><div class="wrap tbar__bar">
    <ul class="tbar__list" id="list-fs">${chips}</ul>
  </div></nav>
  <section class="section dtl-list" id="tours" aria-labelledby="fs-tours">
    <div class="wrap">
      <div class="head-row"><div><h2 id="fs-tours">Tours &amp; Day Trips from Fes</h2></div></div>
      <ul class="htours__list dtl-grid">
${tripCards}
      </ul>
      <p class="sdh-note">Landing in Fes? Book our <a href="../tours/fes-airport-transfer.html">Fes airport transfer</a>. For longer trips, see <a href="../tours/morocco-tours-from-fes.html">all tours that start in Fes</a>.</p>
    </div>
  </section>
${happart('fs-medina', 'Things to Do in the Fes Medina', [
  ['gate', 'Bab Boujeloud', 'The blue-tiled gate into the old city, where the two main lanes of the medina begin.'],
  ['spark', 'Bou Inania Madrasa', 'A 14th-century college of carved cedar, stucco and zellij, one of the few religious buildings open to non-Muslims.'],
  ['map', 'Al-Qaraouiyine', 'Founded in 859 and often called the oldest university in the world. Look into the courtyard from the doors; the Al-Attarine Madrasa next door shows the same art inside.'],
  ['sun', 'Chouara Tannery', 'The honeycomb of dye pits, seen from a leather-shop terrace. With us you look, and leave without buying.'],
  ['group', 'Seffarine &amp; Nejjarine', 'Coppersmiths hammering in their square, and a merchants’ inn turned museum of wooden crafts beside a tiled fountain.'],
  ['pin', 'The Marinid Tombs', 'Ruins on the hill above the medina, with the whole old city below you at sunset. See most of these in one morning on our <a class="sdh-link" href="../tours/fes-medina-guided-tour.html">medina tour</a>.'],
], 'mz-combos fs-medina')}${happart('fs-days', 'How Many Days in Fes?', [
  ['clock', 'One Day', 'The medina with a guide in the morning, then the Marinid Tombs for the sunset over the old city.'],
  ['spark', 'Two Days', 'Go back alone to the lanes you liked, and add the Mellah, the Nejjarine museum and the Jnan Sbil gardens.'],
  ['map', 'Three Days', 'Add one day trip: Volubilis and Meknes, the blue city of Chefchaouen, or the cedars of the Middle Atlas.'],
  ['sun', 'Four Days or More', 'Add the desert: 2 to 3 days to the dunes of Merzouga, or carry on to Marrakech by the Sahara.'],
], 'mz-combos fs-days')}  <section class="section sdh-deserts" id="desert" aria-labelledby="fs-desert-title"><div class="wrap">
    <div class="head-row"><div><h2 id="fs-desert-title">The Desert from Fes</h2><p>Merzouga is about 470 km away, eight hours through Ifrane, the cedar forest, Midelt and the Ziz Valley.</p></div></div>
    <div class="dt-acc-wrap">
      <table class="dt-acc sdh-table">
        <thead><tr><th scope="col">Tour</th><th scope="col">Nights</th><th scope="col">Longest drive</th><th scope="col">Best for</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="../tours/2-day-fes-to-merzouga-desert-tour.html">2 days, back to Fes</a><small>One night in the dunes</small></th><td>Desert camp</td><td>About 8 hours, both days</td><td>Only two days free</td></tr>
          <tr><th scope="row"><a href="../tours/3-day-fes-to-merzouga-desert-tour.html">3 days, back to Fes</a><small>A full day in Merzouga</small></th><td>Desert camp, Merzouga hotel</td><td>About 8 hours, first and last day</td><td>More time in the dunes</td></tr>
          <tr><th scope="row"><a href="../tours/4-day-fes-desert-tour.html">4 days, Fes loop</a><small>Merzouga and the Todra Gorge</small></th><td>Camp, Merzouga, Todra Gorge</td><td>8 to 9 hours, on the last day</td><td>Seeing more of the south</td></tr>
          <tr><th scope="row"><a href="../tours/3-day-fes-to-marrakech-desert-tour.html">3 days, to Marrakech</a><small>The desert on the way</small></th><td>Desert camp, Dades Valley</td><td>About 8 hours, on the first day</td><td>Going on to Marrakech</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sdh-note">Compare every option in our <a href="../desert-tours-from-fes.html">desert tours from Fes</a>. Heading north instead? See the <a href="../tours/3-day-fes-chefchaouen-volubilis-tour.html">3-day Fes, Chefchaouen &amp; Volubilis tour</a>.</p>
  </div></section>
${happart('fs-get', 'Getting to Fes', [
  ['pin', 'From the Airport', 'Fes Saiss airport is 20 to 25 minutes from the city. Our <a class="sdh-link" href="../tours/fes-airport-transfer.html">airport transfer</a> tracks your flight, day or night.'],
  ['map', 'From Marrakech', 'The train takes about 7 hours by Rabat and Casablanca and sees none of the south. Our <a class="sdh-link" href="../tours/3-day-marrakech-to-fes-desert-tour.html">3-day Marrakech to Fes tour</a> crosses the Sahara instead.'],
  ['car', 'From Tangier', 'Come down through the blue city: our <a class="sdh-link" href="../tours/5-day-tangier-chefchaouen-fes-tour.html">5-day Tangier, Chefchaouen &amp; Fes tour</a> ends in Fes.'],
  ['gate', 'To a Medina Riad', 'Cars cannot enter the lanes, so your driver stops at the nearest gate (Bab Boujeloud, Bab Guissa or Bab Ftouh) and a porter carries your bags to the door.'],
], 'mz-combos fs-getting')}${happart('fs-why', 'Why Visit Fes With Us', [
  ['coin', 'Transparent Pricing', 'What we agree on is what you pay; no surprise extras on the day.'],
  ['group', 'Always Private', 'Your own guide and driver, never shared with strangers.'],
  ['shield', 'No Shop Stops', 'No commissions from carpet or leather shops; you only buy if you want to.'],
  ['pin', 'Local Guides', 'They know the lanes, the craftsmen and the quiet way round.'],
  ['clock', 'Free Cancellation', 'Up to 24 hours before, with a small deposit to book.'],
  ['chat', 'Local Team 24/7', 'English-speaking and on WhatsApp, day and night.'],
])}  <section class="hfaq mz-faq" aria-labelledby="fs-faq-title">
    <div class="wrap hfaq__in hfaq__grid">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="fs-faq-title">Fes FAQ</h2>
        </header>
        <div class="hfaq__list">
${faqHtml}
        </div>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../faq.html">View All FAQs</a></div>
      </div>
      <aside class="hblog" aria-labelledby="fs-blog-title">
        <header class="hrev__head hfaq__head">
          <h2 id="fs-blog-title">Read Before You Go</h2>
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
  .replace('<section class="happart mz-combos fs-medina" aria-labelledby="fs-medina"', '<section class="happart mz-combos fs-medina" id="medina" aria-labelledby="fs-medina"')
  .replace('<section class="happart mz-combos fs-days" aria-labelledby="fs-days"', '<section class="happart mz-combos fs-days" id="how-many-days" aria-labelledby="fs-days"')
  .replace('<section class="happart mz-combos fs-getting" aria-labelledby="fs-get"', '<section class="happart mz-combos fs-getting" id="getting-here" aria-labelledby="fs-get"');
for (const id of ['medina', 'how-many-days', 'getting-here']) if (!main2.includes(`id="${id}"`)) throw new Error('chip id ' + id);
const out = head + header + main2 + foot;
fs.writeFileSync('destinations/fes.html', out);
console.log('destinations/fes.html written', out.length);
