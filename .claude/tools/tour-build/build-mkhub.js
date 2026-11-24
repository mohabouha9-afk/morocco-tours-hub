// Builds destinations/marrakech.html (rebuilt destination page) from the finished Merzouga hub shell.
// Cards copied from day-trips.html; facts only from our own pages (see .claude/research/marrakech-destination-research.md).
// Run from the project root: node .claude/tools/tour-build/build-mkhub.js  (do NOT re-run after manual edits)
const fs = require('fs');
const mz = fs.readFileSync('destinations/merzouga.html', 'utf8');
const dt = fs.readFileSync('day-trips.html', 'utf8');

const head0 = mz.slice(0, mz.indexOf('<main>'));
const foot = mz.slice(mz.indexOf('</main>'));

// ---- cards from day-trips.html
function card(id, newId) {
  const m = dt.match(new RegExp('<li id="' + id + '">[\\s\\S]*?</a></article></li>'));
  if (!m) throw new Error('card ' + id);
  return m[0].replace('<li id="' + id + '">', '<li id="' + newId + '">').replace(/href="tours\//g, 'href="../tours/');
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


const cityCards = [
  ['dt-medina', 'mk-medina'], ['dt-majorelle', 'mk-majorelle'], ['dt-food', 'mk-food'],
  ['dt-cooking', 'mk-cooking'], ['dt-hammam', 'mk-hammam'], ['dt-palmeraie', 'mk-camel'],
  ['dt-horse', 'mk-horse'], ['dt-balloon', 'mk-balloon'], ['dt-paragliding', 'mk-paragliding'],
].map(([a, b]) => card(a, b)).join('\n');
const tripCards = [
  ['dt-imlil', 'mk-atlas'], ['dt-ourika', 'mk-ourika'], ['dt-essaouira', 'mk-essaouira'],
  ['dt-ait-ben-haddou', 'mk-abh'], ['dt-three-valleys', 'mk-valleys'], ['dt-ouzoud', 'mk-ouzoud'],
].map(([a, b]) => card(a, b)).join('\n');

// ---- FAQ (HTML answers may hold links; JSON-LD gets the plain text)
const faq = [
  ['How many days do we need in Marrakech?', 'Two to three days for the city itself: the medina, the gardens and palaces, an evening in Jemaa el-Fnaa. Add one day for each day trip, and two to three more if you want the Sahara.'],
  ['Do we need a guide in the medina?', 'On your first day, yes. The lanes are a maze, signposts are few and people offer to “help” for a fee. With our <a class="sdh-link" href="../tours/marrakech-medina-guided-tour.html">medina tour</a> nobody bothers you, there are no shop stops, and your guide shows you how to find your way back alone.'],
  ['How do we get from the airport to our riad?', 'Menara airport is 5 km from the medina, 15 to 25 minutes by car. With our <a class="sdh-link" href="../tours/marrakech-airport-transfer.html">airport transfer</a> your driver waits in arrivals with your name, then walks you from the nearest gate to the riad door, so no taxi haggling.'],
  ['When is the best time to visit Marrakech?', 'Spring (March to May) and autumn (September to November): warm days and comfortable evenings. Summer is often above 40 °C, so we sightsee early and late. Winter days are mild and sunny, with cool evenings.'],
  ['Can we see the Sahara from Marrakech?', 'Yes. Agafay, 40 minutes away, gives you camels and a sunset in an evening, without dunes. For sand dunes, Zagora takes 2 days and Merzouga 3. Compare them in our <a class="sdh-link" href="../desert-tours-from-marrakech.html">desert tours from Marrakech</a>.'],
  ['How do I book and pay?', 'Send your request with the form on each tour page or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before.'],
];
const strip = s => s.replace(/<[^>]+>/g, '');
const faqHtml = faq.map(([q, a], i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q}</h3>${plus}</summary>
            <div class="hfaq-item__a"><p>${a}</p></div>
          </details>`).join('\n');
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };

const items = [
  ['tours/marrakech-medina-guided-tour.html', 'Guided Tour of the Marrakech Medina'],
  ['tours/majorelle-garden-palaces-marrakech-tour.html', 'Majorelle Garden & Palaces Tour'],
  ['tours/marrakech-food-tour.html', 'Marrakech Food Tour'],
  ['tours/marrakech-cooking-class.html', 'Marrakech Cooking Class'],
  ['tours/marrakech-hammam-experience.html', 'Marrakech Hammam Experience'],
  ['tours/marrakech-palmeraie-camel-ride.html', 'Palmeraie Camel Ride'],
  ['tours/marrakech-palmeraie-horse-riding.html', 'Palmeraie Horse Riding'],
  ['tours/marrakech-hot-air-balloon-ride.html', 'Hot Air Balloon Ride over Marrakech'],
  ['tours/marrakech-paragliding.html', 'Tandem Paragliding in Marrakech'],
  ['tours/marrakech-atlas-mountains-day-trip.html', 'Atlas Mountains & Imlil Day Trip'],
  ['tours/marrakech-ourika-valley-day-trip.html', 'Ourika Valley Day Trip'],
  ['tours/marrakech-to-essaouira-day-trip.html', 'Marrakech to Essaouira Day Trip'],
  ['tours/marrakech-to-ait-ben-haddou-day-trip.html', 'Marrakech to Aït Ben Haddou Day Trip'],
  ['tours/marrakech-three-valleys-day-trip.html', 'Three Valleys Day Trip'],
  ['tours/marrakech-to-ouzoud-waterfalls-day-trip.html', 'Marrakech to Ouzoud Waterfalls Day Trip'],
];
const listLd = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Things to do in Marrakech', itemListElement: items.map(([u, n], i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/' + u, name: n })) };

// ---- head (shell = Merzouga hub; URL and meta = Marrakech)
const TITLE = 'Visit Marrakech with a Local: Private Tours, Day Trips &amp; Tips';
const DESC = 'Visit Marrakech on your terms: a private medina tour with no shop stops, Majorelle and the palaces, food, hammam and balloon rides, the best day trips, how many days you need and how to get there.';
// replacements only inside <head>; the copied header keeps its menu links, without the hub's active item
const hdrAt = head0.indexOf('<header');
const header = head0.slice(hdrAt).replace(' class="is-active"', ' class=""');
let head = head0.slice(0, hdrAt)
  .replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="keywords" content=")[^"]*/, '$1visit Marrakech, Marrakech private tour, Marrakech guided tour, things to do in Marrakech, Marrakech day trips, how many days in Marrakech, Marrakech medina guide')
  .replace(/destinations\/merzouga\.html/g, 'destinations/marrakech.html')
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/assets\/images\/merzouga-dune\.jpg/g, 'assets/images/jemaa-el-fna-evening-aerial.jpg')
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"ItemList"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(listLd) + '</script>')
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(faqLd) + '</script>');
if (!head.includes('"Things to do in Marrakech"') || !head.includes('How many days do we need in Marrakech?')) throw new Error('JSON-LD not replaced');
if (false && /merzouga/i.test(head.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"TravelAgency"[^\n]*/, '').replace(/<header[\s\S]*$/, ''))) console.warn('WARN: "merzouga" still in <head>');

// chips here point to sections, not cards: guard the card-only steps
const script = mz.slice(mz.lastIndexOf('<script>', mz.indexOf('</main>')), mz.indexOf('</main>'))
  .replace("if(list.scrollWidth>list.clientWidth)", "if(li.tagName==='LI' && list.scrollWidth>list.clientWidth)")
  .replace("var c=li.querySelector('.htour'); c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash');", "var c=li.querySelector(':scope > .htour'); if(c){ c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash'); }");
if (!script.includes("li.tagName==='LI'") || !script.includes('if(c){')) throw new Error('chip script not patched');
const combine = mz.match(/  <section class="section dtl-combine"[\s\S]*?<\/section>\n/)[0]
  .replace('Want to add Merzouga to a Morocco tour?', 'Want Marrakech in a longer tour?')
  .replace('add%20Merzouga%20activities%20to', 'add%20Marrakech%20days%20to')
  .replace('We fit the activities you choose into your itinerary, with transfers and timings arranged.', 'Most of our tours start or end in Marrakech; we add your city days and activities around the route.');
const hcta = mz.match(/  <section class="hcta"[\s\S]*?<\/section>\n/)[0]
  .replace(/<img class="hcta__bg"[^>]*>/, '<img class="hcta__bg" src="/assets/images/bahia-palace-courtyard.jpg" alt="The tiled courtyard of the Bahia Palace in Marrakech" width="1600" height="1067" loading="lazy">')
  .replace('Plan Your Days in Merzouga', 'Plan Your Days in Marrakech')
  .replace('Tell us your dates and what you love; we’ll put the right activities together.', 'Tell us your dates and what you love; we’ll plan your days in the city and out of it.')
  .replace('planning%20my%20days%20in%20Merzouga', 'planning%20my%20days%20in%20Marrakech');
if (combine.includes('Merzouga') || hcta.includes('Merzouga')) console.warn('WARN: Merzouga left in combine/hcta');

const blog = [
  ['best-things-to-do-in-marrakech', 'jemaa-el-fna-dusk-stalls.jpg', 'The food stalls of Jemaa el-Fnaa at dusk', 1600, 1201, 'Best Things to Do in Marrakech', 'The medina, the gardens, the food and the trips out of the city.'],
  ['best-time-to-visit-marrakech', 'marrakech-medina-walk.jpg', 'Walking through the alleys of the Marrakech medina', 800, 600, 'The Best Time to Visit Marrakech', 'Weather by season, summer heat and the cool winter evenings.'],
  ['morocco-travel-tips-first-time-visitors', 'souk-carpets.jpg', 'Carpets hanging in a Marrakech souk', 800, 600, 'Morocco Travel Tips for First-Timers', 'Money, dress, haggling and the things worth knowing before you land.'],
  ['3-days-vs-4-days-marrakech-to-merzouga', 'merzouga-dune.jpg', 'Golden sand dune at Merzouga', 1200, 800, '3 or 4 Days to Merzouga?', 'If you add the Sahara: what the extra day changes.'],
];
const blogHtml = blog.map(([u, img, alt, w, h, t, ex]) => `          <li><article class="hblog-card"><a class="hblog-card__link" href="../blog/${u}.html">
            <span class="hblog-card__img"><img src="/assets/images/${img}" alt="${alt}" width="${w}" height="${h}" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${t}</h3><span class="hblog-card__ex">${ex}</span></span>
          </a></article></li>`).join('\n');

const chips = [['things-to-do', 'In the City'], ['day-trips', 'Day Trips'], ['how-many-days', 'How Many Days'], ['desert', 'The Desert'], ['getting-here', 'Getting Here']]
  .map(([id, n]) => `<li><a href="#${id}">${IC.spark}<span>${n}</span></a></li>`).join('');

const trust = [
  [IC.shield, 'Always private', 'Just your group, never strangers.'],
  [IC.gate, 'Riad pick-up', 'At the nearest medina gate.'],
  [IC.group, 'Local guides', 'Born and raised in Marrakech.'],
  [IC.clock, 'Free cancellation', 'Up to 24 hours before.'],
].map(([ic, b, s]) => `    <div class="trust__item">${tIc(ic)}<b>${b}</b><small>${s}</small></div>`).join('\n');

const main = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/jemaa-el-fna-evening-aerial.jpg" alt="Jemaa el-Fnaa square at dusk with the Koutoubia minaret behind" width="1600" height="1066" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="../index.html">Home</a><span class="sep">›</span><a href="../destinations/index.html">Destinations</a><span class="sep">›</span><span>Marrakech</span></nav>
      <h1>Marrakech<span class="script">The Red City, at your pace</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">Souks and palaces, gardens and rooftop sunsets, then the Atlas, the coast and the desert just outside the walls. See it all with a local guide, privately, without the hassle.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why visit Marrakech with us"><div class="wrap"><div class="trust__grid">
${trust}
  </div></div></section>
  <section class="section cstart mz-intro" aria-labelledby="mk-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="mk-intro-title">Marrakech, Without the Hassle</h2>
      <p>Marrakech is where most Morocco trips begin, and the city can be a lot on day one: lanes with no signposts, airport taxis that skip the meter, “guides” who ask for money after showing you the way. A local at your side turns all of that into the good part: the souks, the palaces, the food stalls at dusk.</p>
      <p>Here is everything we do in Marrakech: tours in the city, day trips to the Atlas, the coast and the waterfalls, and the desert. Each one is private, with pick-up at your riad or hotel, and the price is agreed before you go.</p>
    </div>
  </div></section>
  <nav class="tbar tbar--dt" aria-label="Browse Marrakech"><div class="wrap tbar__bar">
    <ul class="tbar__list" id="list-mk">${chips}</ul>
  </div></nav>
  <section class="section dtl-list" id="things-to-do" aria-labelledby="mk-todo">
    <div class="wrap">
      <div class="head-row"><div><h2 id="mk-todo">Things to Do in Marrakech</h2></div></div>
      <ul class="htours__list dtl-grid">
${cityCards}
      </ul>
    </div>
  </section>
  <section class="section dtl-list" id="day-trips" aria-labelledby="mk-trips">
    <div class="wrap">
      <div class="head-row"><div><h2 id="mk-trips">Day Trips from Marrakech</h2></div></div>
      <ul class="htours__list dtl-grid">
${tripCards}
      </ul>
      <p class="sdh-note">See all of them, plus quads, buggies and the Agafay desert, on our <a href="../day-trips.html">Marrakech day trips</a> page.</p>
    </div>
  </section>
${happart('mk-days', 'How Many Days in Marrakech?', [
  ['clock', 'One Day', 'The medina with a guide in the morning, then Jemaa el-Fnaa at dusk, or our food tour for dinner.'],
  ['spark', 'Two Days', 'Add Majorelle and the palaces at 08:00, before the crowds, and a hammam or cooking class in the afternoon.'],
  ['map', 'Three Days', 'Add one day trip: the Atlas villages, the Ourika Valley or Essaouira on the coast.'],
  ['sun', 'Four Days or More', 'Add the desert: an evening in Agafay, or 2 to 3 days to the dunes of Zagora or Merzouga.'],
], 'mz-combos mk-days')}  <section class="section sdh-deserts" id="desert" aria-labelledby="mk-desert-title"><div class="wrap">
    <div class="head-row"><div><h2 id="mk-desert-title">The Desert from Marrakech</h2></div></div>
    <div class="dt-acc-wrap">
      <table class="dt-acc sdh-table">
        <thead><tr><th scope="col">Desert</th><th scope="col">From Marrakech</th><th scope="col">The landscape</th><th scope="col">Shortest trip</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="agafay.html">Agafay</a><small>An evening, no long drive</small></th><td>40 minutes</td><td>Stony hills, no sand dunes</td><td><a href="../tours/agafay-desert-camel-ride-dinner-show.html">An evening</a> or <a href="../tours/marrakech-agafay-desert-day-trip.html">a day</a></td></tr>
          <tr><th scope="row"><a href="erg-chigaga-zagora.html">Zagora</a><small>Short trips, paved road</small></th><td>About 6 to 7 hours, through the Draa Valley</td><td>Low dunes and stony desert</td><td><a href="../tours/2-day-marrakech-to-zagora-desert-tour.html">2 days</a></td></tr>
          <tr><th scope="row"><a href="erg-chigaga-zagora.html">Erg Chigaga</a><small>Wild and empty</small></th><td>About 8 hours, the last 50 km by 4×4</td><td>Remote dune sea, about 50 to 60 m</td><td><a href="../tours/3-day-marrakech-erg-chigaga-tour.html">3 days</a></td></tr>
          <tr><th scope="row"><a href="merzouga.html">Merzouga</a><small>Tall dunes, the classic</small></th><td>9 to 10 hours (560 km)</td><td>Erg Chebbi, golden sand up to about 150 m</td><td><a href="../tours/3-days-desert-tour-marrakech-to-merzouga.html">3 days</a> (2 possible)</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sdh-note">Compare every option in our <a href="../desert-tours-from-marrakech.html">desert tours from Marrakech</a>, or see <a href="../tours/morocco-tours-from-marrakech.html">all tours that start in Marrakech</a>.</p>
  </div></section>
${happart('mk-get', 'Getting to Marrakech', [
  ['pin', 'From the Airport', 'Menara airport is 5 km from the medina, 15 to 25 minutes. Book our <a class="sdh-link" href="../tours/marrakech-airport-transfer.html">airport transfer</a> and skip the taxi haggling.'],
  ['car', 'From Casablanca', 'About 3 hours on the motorway, door to door with our <a class="sdh-link" href="../tours/casablanca-to-marrakech-transfer.html">private transfer</a>; by train from the airport you change at Casa Voyageurs.'],
  ['map', 'From Fes', 'Make the desert your transfer: our <a class="sdh-link" href="../tours/3-day-fes-to-marrakech-desert-tour.html">3-day Fes to Marrakech tour</a> crosses the Sahara on the way.'],
  ['gate', 'To a Medina Riad', 'Cars cannot enter the lanes, so your driver stops at the nearest gate and walks you to the riad door.'],
], 'mz-combos mk-getting')}${happart('mk-why', 'Why Visit Marrakech With Us', [
  ['coin', 'Transparent Pricing', 'What we agree on is what you pay; no surprise extras on the day.'],
  ['group', 'Always Private', 'Your own guide and driver, never shared with strangers.'],
  ['shield', 'No Shop Stops', 'No commissions from shops; you only buy if you want to.'],
  ['pin', 'Local Guides', 'They grew up in these lanes and know where to eat.'],
  ['clock', 'Free Cancellation', 'Up to 24 hours before, with a small deposit to book.'],
  ['chat', 'Local Team 24/7', 'English-speaking and on WhatsApp, based in Marrakech.'],
])}  <section class="hfaq mz-faq" aria-labelledby="mk-faq-title">
    <div class="wrap hfaq__in hfaq__grid">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="mk-faq-title">Marrakech FAQ</h2>
        </header>
        <div class="hfaq__list">
${faqHtml}
        </div>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../faq.html">View All FAQs</a></div>
      </div>
      <aside class="hblog" aria-labelledby="mk-blog-title">
        <header class="hrev__head hfaq__head">
          <h2 id="mk-blog-title">Read Before You Go</h2>
        </header>
        <ul class="hblog__list">
${blogHtml}
        </ul>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../blog.html">Read More Articles</a></div>
      </aside>
    </div>
  </section>
${combine}${hcta}${script}`;

// chip targets for the two card sections built by happart()
const main2 = main.replace('<section class="happart mz-combos mk-days" aria-labelledby="mk-days"', '<section class="happart mz-combos mk-days" id="how-many-days" aria-labelledby="mk-days"').replace('<section class="happart mz-combos mk-getting" aria-labelledby="mk-get"', '<section class="happart mz-combos mk-getting" id="getting-here" aria-labelledby="mk-get"');
if (!main2.includes('id="how-many-days"') || !main2.includes('id="getting-here"')) throw new Error('chip ids');
const out = head + header + main2 + foot;
fs.writeFileSync('destinations/marrakech.html', out);
console.log('destinations/marrakech.html written', out.length);
