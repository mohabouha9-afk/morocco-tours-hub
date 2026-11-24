// Builds destinations/essaouira.html (rebuilt destination page) from the finished Merzouga hub shell, same layout as build-cchub.js.
// Cards: day trip from destinations/marrakech.html (facts corrected to match the day-trip page), 3-day tour from tours/index.html.
// Facts only from our own pages (see .claude/research/essaouira-destination-research.md).
// Run from the project root: node .claude/tools/tour-build/build-eshub.js  (do not re-run after manual edits to the page)
const fs = require('fs');
const mz = fs.readFileSync('destinations/merzouga.html', 'utf8');
const mk = fs.readFileSync('destinations/marrakech.html', 'utf8');
const ti = fs.readFileSync('tours/index.html', 'utf8');

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

// ---- cards. The Marrakech-hub copy of the day-trip card still says "Argan cooperative stop" and "about 10 hours";
// the day-trip page says no shop stops, about 11 hours, local guide included, about 5 hours in town.
let dayCard = card(mk, 'marrakech-to-essaouira-day-trip.html', 'es-day')
  .replace('1 day (about 10 hours)', '1 day (about 11 hours)')
  .replace(/(<\/svg>)Argan cooperative stop/, '$1Local guide in the medina')
  .replace(/(<\/svg>)Free time in the medina/, '$1About 5 hours in town')
  .replace(/(<\/svg>)Back the same day/, '$1No shop stops');
if (/Argan cooperative|about 10 hours|Free time in the medina|Back the same day/.test(dayCard)) throw new Error('day card not patched');
const tripCards = [dayCard, card(ti, '3-day-marrakech-essaouira-tour.html', 'es-3day')].join('\n');

// ---- FAQ (HTML answers may hold links; JSON-LD gets the plain text)
const faq = [
  ['Is a day trip enough, or should we stay a night?', 'A day trip gives you about five hours in town: the medina, the ramparts, lunch at the port and a walk by the sea. If you can, stay one night: the day visitors leave in the late afternoon, you watch the sun set over the ocean from the Skala and see the blue boats come in the next morning. Our <a class="sdh-link" href="../tours/3-day-marrakech-essaouira-tour.html">3-day Marrakech &amp; Essaouira tour</a> does exactly that.'],
  ['Why not just take the bus from Marrakech?', 'The bus takes about 3 hours from the station on fixed times, so with taxis at both ends a day trip leaves little time by the sea. With a private car you leave from your door, stop when you like and come back when you are ready; the road is flat all the way, good news if you get car-sick.'],
  ['Is it windy? Can we swim?', 'The Atlantic wind blows most afternoons, strongest from June to August, so bring a light jacket even in summer. The long beach is better for walks, kitesurfing and camel or horse rides than for sunbathing; on calm days a swim is possible.'],
  ['When is the best time to visit Essaouira?', 'Spring and autumn, with mild sunny days and less wind. Summer stays fresh while Marrakech is hot, which is why many come for a break from the heat. Weekends are busier with Moroccan visitors; Tuesday to Thursday is calmer.'],
  ['Can we continue down the coast to Agadir?', 'Yes. From Essaouira the coast road runs south through argan hills to Imsouane and the surf village of Taghazout. Our <a class="sdh-link" href="../tours/4-day-marrakech-essaouira-agadir-tour.html">4-day tour</a> ends in Agadir, and the <a class="sdh-link" href="../tours/7-day-coastal-morocco-tour-from-marrakech.html">7-day coastal tour</a> gives you two nights in Essaouira before the coast and comes back to Marrakech.'],
  ['How do I book and pay?', 'Send your request with the form on each tour page or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before.'],
];
const strip = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
const faqHtml = faq.map(([q, a], i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q}</h3>${plus}</summary>
            <div class="hfaq-item__a"><p>${a}</p></div>
          </details>`).join('\n');
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };

const items = [
  ['tours/marrakech-to-essaouira-day-trip.html', 'Essaouira Day Trip from Marrakech'],
  ['tours/3-day-marrakech-essaouira-tour.html', '3-Day Marrakech & Essaouira Tour'],
  ['tours/4-day-marrakech-essaouira-agadir-tour.html', '4-Day Marrakech, Essaouira & Agadir Tour'],
  ['tours/6-day-morocco-tour-agadir-essaouira-marrakech.html', '6-Day Agadir to Marrakech Tour via Essaouira'],
  ['tours/7-day-coastal-morocco-tour-from-marrakech.html', '7-Day Coastal Morocco Tour from Marrakech'],
];
const listLd = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Things to do in Essaouira', itemListElement: items.map(([u, n], i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/' + u, name: n })) };

// ---- head (shell = Merzouga hub; URL and meta = Essaouira)
const HERO = 'essaouira-skala-port.jpg';
const TITLE = 'Visit Essaouira with a Local: Private Day Trips, Tours &amp; Tips';
const DESC = 'Visit Essaouira, the walled port on the Atlantic: a private day trip from Marrakech, tours with a night by the sea, the ramparts, the fishing port and the beach, how many days you need and how to get there.';
const hdrAt = head0.indexOf('<header');
const header = head0.slice(hdrAt).replace(' class="is-active"', ' class=""');
let head = head0.slice(0, hdrAt)
  .replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="keywords" content=")[^"]*/, '$1visit Essaouira, Essaouira day trip, Marrakech to Essaouira, things to do in Essaouira, how many days in Essaouira, Essaouira private tour, Morocco Atlantic coast')
  .replace(/destinations\/merzouga\.html/g, 'destinations/essaouira.html')
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/assets\/images\/merzouga-dune\.jpg/g, 'assets/images/' + HERO)
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"ItemList"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(listLd) + '</script>')
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(faqLd) + '</script>');
if (!head.includes('"Things to do in Essaouira"') || !head.includes('Why not just take the bus from Marrakech?')) throw new Error('JSON-LD not replaced');

const script = mz.slice(mz.lastIndexOf('<script>', mz.indexOf('</main>')), mz.indexOf('</main>'))
  .replace("if(list.scrollWidth>list.clientWidth)", "if(li.tagName==='LI' && list.scrollWidth>list.clientWidth)")
  .replace("var c=li.querySelector('.htour'); c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash');", "var c=li.querySelector(':scope > .htour'); if(c){ c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash'); }");
if (!script.includes("li.tagName==='LI'") || !script.includes('if(c){')) throw new Error('chip script not patched');
const combine = mz.match(/  <section class="section dtl-combine"[\s\S]*?<\/section>\n/)[0]
  .replace('Want to add Merzouga to a Morocco tour?', 'Want Essaouira in a longer tour?')
  .replace('add%20Merzouga%20activities%20to', 'add%20Essaouira%20to')
  .replace('We fit the activities you choose into your itinerary, with transfers and timings arranged.', 'Most of our tours from Marrakech, Casablanca and Agadir can add a night or two by the sea; we fit it into your route.');
const hcta = mz.match(/  <section class="hcta"[\s\S]*?<\/section>\n/)[0]
  .replace(/<img class="hcta__bg"[^>]*>/, '<img class="hcta__bg" src="/assets/images/essaouira.jpg" alt="The ramparts and blue boats of Essaouira" width="1080" height="1350" loading="lazy">')
  .replace('Plan Your Days in Merzouga', 'Plan Your Days in Essaouira')
  .replace('Tell us your dates and what you love; we’ll put the right activities together.', 'Tell us your dates and where you start; we’ll plan a day by the sea or a night on the Atlantic.')
  .replace('planning%20my%20days%20in%20Merzouga', 'planning%20my%20days%20in%20Essaouira');
if (combine.includes('Merzouga') || hcta.includes('Merzouga')) console.warn('WARN: Merzouga left in combine/hcta');

const blog = [
  ['best-things-to-do-in-essaouira', 'essaouira-skala-port.jpg', 'Blue fishing boats in the port of Essaouira', 1000, 667, 'Best Things to Do in Essaouira', 'The medina, the Skala ramparts, the port, the beach and Gnawa music.'],
  ['best-things-to-do-in-marrakech', 'marrakech-medina-walk.jpg', 'Walking through the alleys of the Marrakech medina', 800, 600, 'Best Things to Do in Marrakech', 'Where most Essaouira trips start: the medina, palaces and gardens.'],
  ['ultimate-7-day-morocco-itinerary', 'camel-caravan.webp', 'A camel caravan in the Sahara', 1080, 1440, 'The Ultimate 7-Day Morocco Itinerary', 'How to fit the coast, the cities and the desert into one week.'],
  ['best-morocco-itinerary-first-time-visitors', 'mosque-sunset.jpg', 'The Koutoubia minaret at sunset', 1600, 1067, 'Morocco Itinerary for First-Timers', 'Routes and days for a first trip to Morocco.'],
];
const blogHtml = blog.map(([u, img, alt, w, h, t, ex]) => `          <li><article class="hblog-card"><a class="hblog-card__link" href="../blog/${u}.html">
            <span class="hblog-card__img"><img src="/assets/images/${img}" alt="${alt}" width="${w}" height="${h}" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${t}</h3><span class="hblog-card__ex">${ex}</span></span>
          </a></article></li>`).join('\n');

const chips = [['tours', 'Day Trip or a Night'], ['in-town', 'In Essaouira'], ['how-many-days', 'How Many Days'], ['stay', 'Along the Coast'], ['getting-here', 'Getting Here']]
  .map(([id, n]) => `<li><a href="#${id}">${IC.spark}<span>${n}</span></a></li>`).join('');

const trust = [
  [IC.shield, 'Always private', 'Just your group, never strangers.'],
  [IC.car, 'Hotel or riad pick-up', 'In Marrakech or Agadir.'],
  [IC.coin, 'No shop stops', 'Unless you ask for one.'],
  [IC.clock, 'Free cancellation', 'Up to 24 hours before.'],
].map(([ic, b, s]) => `    <div class="trust__item">${tIc(ic)}<b>${b}</b><small>${s}</small></div>`).join('\n');

const main = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/${HERO}" alt="Blue fishing boats in the port of Essaouira below the ramparts" width="1000" height="667" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="../index.html">Home</a><span class="sep">›</span><a href="../destinations/index.html">Destinations</a><span class="sep">›</span><span>Essaouira</span></nav>
      <h1>Essaouira<span class="script">Sea air, at your own pace</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">A walled port on the Atlantic, with a UNESCO-listed medina, blue fishing boats and a sea wind that keeps it cool even in summer. Come on a private day trip from Marrakech, or stay a night for the sunset on the ramparts.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why visit Essaouira with us"><div class="wrap"><div class="trust__grid">
${trust}
  </div></div></section>
  <section class="section cstart mz-intro" aria-labelledby="es-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="es-intro-title">Essaouira, Without the Rush</h2>
      <p>Essaouira is the easy-going opposite of Marrakech: a small medina you can walk end to end, few touts, grilled fish at the port and a long beach. The catch is the road: 2.5 to 3 hours each way, and shared tours add a shop stop and leave you about four hours in town. In a private car you leave when you want, skip the shops and get about five hours by the sea, or stay the night and see the town when the day visitors have gone.</p>
      <p>Here is how we do Essaouira: the day trip from Marrakech, tours that sleep by the sea, what to see there, how long to stay and how to get there. Each trip is private, with pick-up at your hotel or riad, and the price is agreed before you go.</p>
    </div>
  </div></section>
  <nav class="tbar tbar--dt" aria-label="Browse Essaouira"><div class="wrap tbar__bar">
    <ul class="tbar__list" id="list-es">${chips}</ul>
  </div></nav>
  <section class="section dtl-list" id="tours" aria-labelledby="es-tours">
    <div class="wrap">
      <div class="head-row"><div><h2 id="es-tours">Essaouira from Marrakech</h2></div></div>
      <ul class="htours__list dtl-grid">
${tripCards}
      </ul>
      <p class="sdh-note">Prefer a shorter drive? The <a href="../tours/marrakech-ourika-valley-day-trip.html">Ourika Valley day trip</a> is about an hour from Marrakech. More ideas on our <a href="../day-trips.html">day trips page</a>.</p>
    </div>
  </section>
${happart('es-city', 'Things to Do in Essaouira', [
  ['map', 'The Medina', 'A UNESCO-listed walled town of white and blue houses, small enough to walk end to end and far calmer than the Marrakech souks. About 2–3 km on foot, mostly flat.'],
  ['gate', 'The Skala Ramparts', 'The sea walls with their row of bronze cannons facing the Atlantic: the best place in town for the sunset.'],
  ['wave', 'The Fishing Port', 'Blue boats, the morning catch on the quay and the harbour grills. Choose your fish and agree the price by weight before they cook it. The Skala du Port tower has a small entry fee.'],
  ['sun', 'The Beach', 'A long, windy bay for walks, kitesurfing, and camel or horse rides on the sand. Better for a stroll than for sunbathing.'],
  ['pin', 'The Mellah &amp; Bayt Dakira', 'The old Jewish quarter and its restored house of memory, a reminder of the Muslim and Jewish families who built the port together.'],
  ['spark', 'Crafts &amp; Gnawa Music', 'The thuya-wood workshops under the ramparts, art galleries and the Gnawa music the town is known for, with its famous festival each year. No shop stops with us: you buy only if you want to.'],
], 'mz-combos es-city')}${happart('es-days', 'How Many Days in Essaouira?', [
  ['clock', 'A Day Trip', 'About five hours in town from Marrakech: the medina and ramparts with a guide, lunch at the port and a walk by the sea.'],
  ['sun', 'One Night', 'The best fit for most: the sunset on the Skala and the port at its best hour, early morning as the boats come in.'],
  ['spark', 'Two Nights', 'A free day by the sea: the Mellah, the woodworkers, a long beach walk and a rooftop sunset, with no packing.'],
  ['map', 'On the Way South', 'Essaouira is the first stop of the coast road to Imsouane, Taghazout and Agadir. See the tours below.'],
], 'mz-combos es-days')}  <section class="section sdh-deserts" id="stay" aria-labelledby="es-stay-title"><div class="wrap">
    <div class="head-row"><div><h2 id="es-stay-title">Tours with Nights in Essaouira</h2><p>Sleep by the Atlantic, then follow the coast road south to the surf villages and Agadir.</p></div></div>
    <div class="dt-acc-wrap">
      <table class="dt-acc sdh-table">
        <thead><tr><th scope="col">Tour</th><th scope="col">Nights in Essaouira</th><th scope="col">Also on the way</th><th scope="col">Best for</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="../tours/3-day-marrakech-essaouira-tour.html">3 days, Marrakech loop</a><small>Back to Marrakech</small></th><td>One night</td><td>A guided day in the Marrakech medina</td><td>A short break by the sea</td></tr>
          <tr><th scope="row"><a href="../tours/4-day-marrakech-essaouira-agadir-tour.html">4 days, Marrakech to Agadir</a><small>Ends in Agadir</small></th><td>One night</td><td>Imsouane, Taghazout, Paradise Valley</td><td>Ending on the beach or flying out of Agadir</td></tr>
          <tr><th scope="row"><a href="../tours/6-day-morocco-tour-agadir-essaouira-marrakech.html">6 days, Agadir to Marrakech</a><small>From Agadir airport</small></th><td>One night</td><td>Taghazout, Paradise Valley, Imsouane, Marrakech</td><td>Flying into Agadir</td></tr>
          <tr><th scope="row"><a href="../tours/7-day-coastal-morocco-tour-from-marrakech.html">7 days, Atlantic coast</a><small>Back to Marrakech</small></th><td>Two nights</td><td>Sidi Kaouki, Imsouane, Timlalin dunes, Taghazout, Agadir</td><td>Seeing the whole coast</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sdh-note">Want the Sahara too? The <a href="../tours/14-day-morocco-tour-from-marrakech.html">14-day tour from Marrakech</a> and the <a href="../tours/12-day-marrakech-to-casablanca-tour.html">12-day Marrakech to Casablanca tour</a> both sleep in Essaouira, and the <a href="../tours/18-day-atlantic-morocco-tour-marrakech-to-dakhla.html">18-day Atlantic tour</a> follows the coast all the way to Dakhla.</p>
  </div></section>
${happart('es-get', 'Getting to Essaouira', [
  ['car', 'From Marrakech', 'About 180–190 km west on a flat road, 2.5 to 3 hours with a coffee stop. The easiest start, and good news if you get car-sick.'],
  ['wave', 'From Agadir', 'About 170 km on the coast road through argan hills by Imsouane, about 3 hours. Our <a class="sdh-link" href="../tours/6-day-morocco-tour-agadir-essaouira-marrakech.html">6-day tour</a> starts at Agadir airport.'],
  ['map', 'By Bus', 'About 3 hours from the Marrakech bus station on fixed times, plus taxis at both ends. Fine for a long stay, tight for a day trip.'],
  ['gate', 'To Your Riad', 'The medina is car-free, so your driver stops at the nearest gate and a porter with a cart takes your bags to the door.'],
], 'mz-combos es-getting')}${happart('es-why', 'Why Visit Essaouira With Us', [
  ['coin', 'Transparent Pricing', 'What we agree on is what you pay; no surprise extras on the day.'],
  ['group', 'Always Private', 'Your own driver and car, never shared with strangers.'],
  ['shield', 'No Shop Stops', 'No argan or craft shop built in; we stop only if you ask.'],
  ['pin', 'Local Guides', 'A local guide walks you through the medina, the Mellah and the ramparts.'],
  ['clock', 'Free Cancellation', 'Up to 24 hours before, with a small deposit to book.'],
  ['chat', 'Local Team 24/7', 'English-speaking and on WhatsApp, day and night.'],
])}  <section class="hfaq mz-faq" aria-labelledby="es-faq-title">
    <div class="wrap hfaq__in hfaq__grid">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="es-faq-title">Essaouira FAQ</h2>
        </header>
        <div class="hfaq__list">
${faqHtml}
        </div>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../faq.html">View All FAQs</a></div>
      </div>
      <aside class="hblog" aria-labelledby="es-blog-title">
        <header class="hrev__head hfaq__head">
          <h2 id="es-blog-title">Read Before You Go</h2>
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
  .replace('<section class="happart mz-combos es-city" aria-labelledby="es-city"', '<section class="happart mz-combos es-city" id="in-town" aria-labelledby="es-city"')
  .replace('<section class="happart mz-combos es-days" aria-labelledby="es-days"', '<section class="happart mz-combos es-days" id="how-many-days" aria-labelledby="es-days"')
  .replace('<section class="happart mz-combos es-getting" aria-labelledby="es-get"', '<section class="happart mz-combos es-getting" id="getting-here" aria-labelledby="es-get"');
for (const id of ['in-town', 'how-many-days', 'getting-here']) if (!main2.includes(`id="${id}"`)) throw new Error('chip id ' + id);
const out = head + header + main2 + foot;
fs.writeFileSync('destinations/essaouira.html', out);
console.log('destinations/essaouira.html written', out.length);
