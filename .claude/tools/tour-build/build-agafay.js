// Builds destinations/agafay.html (desert hub Page 5) from the finished Merzouga hub shell.
// Cards are copied from day-trips.html. Facts come only from our own Agafay pages
// (40 km / 40 min, stone desert, no sand dunes, medina gate pick-up, Oct–May, summer middays above 35 °C,
// quad: drivers 16+, buggy for two; camel & dinner: overnight tent and earlier dinner on request).
// Run from the project root: node .claude/tools/tour-build/build-agafay.js
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
const cards = [
  card('dt-agafay', 'ag-day'),
  card('dt-camel-dinner', 'ag-camel'),
  card('dt-quad', 'ag-quad'),
  card('dt-balloon', 'ag-balloon'),
].join('\n');

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

// ---- FAQ (HTML answers may hold links; JSON-LD gets the plain text)
const faq = [
  ['Is Agafay a real desert?', 'Yes, but a stone desert: pale rolling hills and gravel plains with the High Atlas behind, and no sand dunes. For tall golden dunes you need Merzouga, about two days from Marrakech by road.'],
  ['How far is Agafay from Marrakech?', 'About 40 km south-west of the city, around 40 minutes by car. Every trip includes the pick-up at your hotel, or at the nearest gate if your riad is in the medina.'],
  ['When is the best time to visit Agafay?', 'October to May. Summer middays are hot, often above 35 °C, so in summer we go in the late afternoon or at sunrise. Evenings are cool from October to April: bring a jacket.'],
  ['Agafay or Merzouga?', 'Agafay if you only have an evening or a day: camels, dinner and the sunset without a long drive. Merzouga if you can give the desert 2 to 3 days and want real sand dunes. See our <a class="sdh-link" href="../desert-tours-from-marrakech.html">desert tours from Marrakech</a>.'],
  ['Can we stay the night in Agafay?', 'Yes. Add a night in a tent to the <a class="sdh-link" href="../tours/agafay-desert-camel-ride-dinner-show.html">camel ride and dinner show</a> and you wake up to the sunrise over the hills; we drive you back to Marrakech in the morning.'],
  ['How do I book and pay?', 'Send your request with the form on each activity page or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before.'],
];
const strip = s => s.replace(/<[^>]+>/g, '');
const faqHtml = faq.map(([q, a], i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q}</h3>${plus}</summary>
            <div class="hfaq-item__a"><p>${a}</p></div>
          </details>`).join('\n');
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };

const items = [
  ['tours/marrakech-agafay-desert-day-trip.html', 'Agafay Desert Day Trip'],
  ['tours/agafay-desert-camel-ride-dinner-show.html', 'Agafay Camel Ride & Dinner Show at Sunset'],
  ['tours/agafay-desert-quad-biking.html', 'Quad Biking in the Agafay Desert'],
  ['tours/marrakech-hot-air-balloon-ride.html', 'Hot Air Balloon Ride over Marrakech'],
];
const listLd = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Things to do in the Agafay desert', itemListElement: items.map(([u, n], i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/' + u, name: n })) };

// ---- head
const TITLE = 'Things to Do in Agafay Desert: Camels, Dinner, Quads &amp; Balloons';
const DESC = 'Private things to do in the Agafay desert, 40 minutes from Marrakech: a day trip with lunch and sunset, a camel ride and dinner show, quad biking and a sunrise balloon ride, all with hotel pick-up.';
let head = head0
  .replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="keywords" content=")[^"]*/, '$1things to do in Agafay, Agafay desert, Agafay desert Marrakech, Agafay camel ride, Agafay quad biking, Agafay dinner show, Agafay day trip')
  .replace(/destinations\/merzouga\.html/g, 'destinations/agafay.html')
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/assets\/images\/merzouga-dune\.jpg/g, 'assets/images/agafay-sunset.jpg')
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"ItemList"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(listLd) + '</script>')
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(faqLd) + '</script>');
if (!head.includes('"Things to do in the Agafay desert"') || !head.includes('Is Agafay a real desert?')) throw new Error('JSON-LD not replaced');

// keep the chip script from the Merzouga hub
const script = mz.slice(mz.lastIndexOf('<script>', mz.indexOf('</main>')), mz.indexOf('</main>'));
const combine = mz.match(/  <section class="section dtl-combine"[\s\S]*?<\/section>\n/)[0]
  .replace('Want to add Merzouga to a Morocco tour?', 'Want to add Agafay to a Morocco tour?')
  .replace('add%20Merzouga%20activities%20to', 'add%20an%20Agafay%20evening%20to')
  .replace('We fit the activities you choose into your itinerary, with transfers and timings arranged.', 'An evening in Agafay fits well on your first or last night in Marrakech; we arrange the pick-up and timings.');
const hcta = mz.match(/  <section class="hcta"[\s\S]*?<\/section>\n/)[0]
  .replace(/<img class="hcta__bg"[^>]*>/, '<img class="hcta__bg" src="/assets/images/agafay-domes.jpg" alt="Desert camp domes in the Agafay desert" width="1600" height="1000" loading="lazy">')
  .replace('Plan Your Days in Merzouga', 'Plan Your Evening in Agafay')
  .replace('Tell us your dates and what you love; we’ll put the right activities together.', 'Tell us your date and what you’d like to do; we’ll set the pick-up time around the sunset.')
  .replace('planning%20my%20days%20in%20Merzouga', 'planning%20a%20trip%20to%20Agafay');

const blog = [
  ['merzouga-or-zagora', 'merzouga-dune.jpg', 'Golden sand dune at Merzouga', 1200, 800, 'Merzouga or Zagora?', 'If Agafay leaves you wanting real dunes: the two Sahara deserts you can reach from Marrakech.'],
  ['best-things-to-do-in-marrakech', 'jemaa-el-fna-dusk-stalls.jpg', 'The food stalls of Jemaa el-Fnaa at dusk', 1600, 1201, 'Best Things to Do in Marrakech', 'The medina, the gardens, the food and the trips out of the city.'],
  ['best-time-to-visit-marrakech', 'marrakech-medina-walk.jpg', 'Walking through the alleys of the Marrakech medina', 800, 600, 'The Best Time to Visit Marrakech', 'Weather by season, summer heat and the cool desert evenings.'],
  ['luxury-vs-standard-desert-camp', 'luxury-camp-night.jpg', 'A desert camp lit up at night', 1600, 1066, 'Luxury vs Standard Desert Camp', 'What changes between camps: tents, bathrooms, food and the price.'],
];
const blogHtml = blog.map(([u, img, alt, w, h, t, ex]) => `          <li><article class="hblog-card"><a class="hblog-card__link" href="../blog/${u}.html">
            <span class="hblog-card__img"><img src="/assets/images/${img}" alt="${alt}" width="${w}" height="${h}" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${t}</h3><span class="hblog-card__ex">${ex}</span></span>
          </a></article></li>`).join('\n');

const chips = [['ag-day', 'Day Trip'], ['ag-camel', 'Camel &amp; Dinner'], ['ag-quad', 'Quad Biking'], ['ag-balloon', 'Balloon Ride']]
  .map(([id, n]) => `<li><a href="#${id}">${IC.spark}<span>${n}</span></a></li>`).join('');

const trust = [
  [IC.shield, 'Always private', 'Just your group, never strangers.'],
  [IC.car, 'Hotel pick-up', 'Or the nearest medina gate.'],
  [IC.group, 'Local guide included', 'With you from start to finish.'],
  [IC.clock, 'Free cancellation', 'Up to 24 hours before.'],
].map(([ic, b, s]) => `    <div class="trust__item">${tIc(ic)}<b>${b}</b><small>${s}</small></div>`).join('\n');

const main = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/agafay-sunset.jpg" alt="Sunset over the stony hills of the Agafay desert" width="1600" height="1000" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="../index.html">Home</a><span class="sep">›</span><a href="../destinations/index.html">Destinations</a><span class="sep">›</span><span>Agafay</span></nav>
      <h1>Agafay Desert<span class="script">Forty minutes from Marrakech</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">Pale stony hills under the High Atlas, camps with lanterns and pools, and big sunsets, close enough for an afternoon or an evening. Ride a camel, drive a quad, fly in a balloon at sunrise or stay for dinner by the fire, all private with hotel pick-up.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why book Agafay with us"><div class="wrap"><div class="trust__grid">
${trust}
  </div></div></section>
  <section class="section cstart mz-intro" aria-labelledby="ag-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="ag-intro-title">Agafay, the Desert Next to Marrakech</h2>
      <p>The Agafay desert starts about 40 km south-west of Marrakech, around 40 minutes by car. It is a stone desert, not a sea of sand: pale rolling hills and gravel plains, with the High Atlas on the horizon, snow-capped in winter. Desert camps are spread across the hills, so you get the silence, the camels and the sunset without the long road to the Sahara.</p>
      <p>Here are all our things to do in Agafay: a day trip with lunch and sunset, a camel ride with dinner and a fire show, quad biking on the desert tracks, and a sunrise balloon flight. Each one is private, with pick-up at your hotel, and the price is agreed before you go.</p>
    </div>
  </div></section>
  <nav class="tbar tbar--dt" aria-label="Browse things to do in Agafay"><div class="wrap tbar__bar">
    <ul class="tbar__list" id="list-ag">${chips}</ul>
  </div></nav>
  <section class="section dtl-list" id="things-to-do" aria-labelledby="ag-todo">
    <div class="wrap">
      <div class="head-row"><div><h2 id="ag-todo">Things to Do in Agafay</h2></div></div>
      <ul class="htours__list dtl-grid">
${cards}
      </ul>
    </div>
  </section>
${happart('ag-comb', 'Combine Them', [
  ['sun', 'Ride, Then Dinner', 'A quad ride in the late afternoon, then camels at sunset and dinner with music and a fire show.'],
  ['map', 'A Slow Day Out', 'The day trip: a camel ride, lunch and time by the pool at a camp, then the sunset before the drive back.'],
  ['balloon', 'Sky and Sand', 'The balloon at sunrise one morning and the camel ride and dinner show on another evening.'],
  ['group', 'With Children', 'Slow camels led by hand for little ones, a buggy for two instead of a quad, and an earlier dinner on request.'],
], 'mz-combos')}  <section class="section sdh-deserts" id="agafay-or-sahara" aria-labelledby="ag-which-title"><div class="wrap">
    <div class="head-row"><div><h2 id="ag-which-title">Agafay or the Sahara?</h2></div></div>
    <div class="dt-acc-wrap">
      <table class="dt-acc sdh-table">
        <thead><tr><th scope="col">Desert</th><th scope="col">From Marrakech</th><th scope="col">The landscape</th><th scope="col">Shortest trip</th></tr></thead>
        <tbody>
          <tr><th scope="row">Agafay<small>An evening, no long drive</small></th><td>40 minutes</td><td>Stony hills, no sand dunes</td><td><a href="../tours/agafay-desert-camel-ride-dinner-show.html">An evening</a> or <a href="../tours/marrakech-agafay-desert-day-trip.html">a day</a></td></tr>
          <tr><th scope="row"><a href="../tours/2-day-marrakech-to-zagora-desert-tour.html">Zagora</a><small>Short trips from Marrakech</small></th><td>About 6 hours, through the Draa Valley</td><td>Low dunes and stony desert</td><td><a href="../tours/2-day-marrakech-to-zagora-desert-tour.html">2 days</a></td></tr>
          <tr><th scope="row"><a href="merzouga.html">Merzouga</a><small>Tall dunes, the classic</small></th><td>9 to 10 hours (560 km)</td><td>Erg Chebbi, golden sand up to about 150 m</td><td><a href="../tours/3-days-desert-tour-marrakech-to-merzouga.html">3 days</a> (2 possible)</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sdh-note">Want the real dunes? Compare our <a href="../desert-tours-from-marrakech.html">desert tours from Marrakech</a> or <a href="../sahara-desert-tours.html">all Sahara desert tours</a>.</p>
  </div></section>
${happart('ag-get', 'Getting to Agafay', [
  ['pin', 'From Marrakech', 'About 40 km south-west, 40 minutes by car. Every trip includes the drive there and back with your driver.'],
  ['gate', 'From a medina riad', 'Cars cannot reach most riads, so your driver meets you at the nearest gate. We confirm the time and place on WhatsApp the day before.'],
  ['clock', 'Timed with the sun', 'Pick-up times follow the sunset for the evening trips and the sunrise for the balloon; we tell you the exact time when you book.'],
], 'mz-getting')}${happart('ag-why', 'Why Book Agafay With Us', [
  ['coin', 'Transparent Pricing', 'What we agree on is what you pay; nothing extra at the camp.'],
  ['group', 'Always Private', 'Your own car, guide and quad, never shared with strangers.'],
  ['shield', 'No Shop Stops', 'Straight to the desert, no argan or carpet shops on the way.'],
  ['pin', 'Local Guide Included', 'With you all day; nobody else to pay at the camp.'],
  ['clock', 'Free Cancellation', 'Up to 24 hours before, with a small deposit to book.'],
  ['chat', 'Local Team 24/7', 'English-speaking and on WhatsApp, based in Marrakech.'],
])}  <section class="hfaq mz-faq" aria-labelledby="ag-faq-title">
    <div class="wrap hfaq__in hfaq__grid">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="ag-faq-title">Agafay FAQ</h2>
        </header>
        <div class="hfaq__list">
${faqHtml}
        </div>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../faq.html">View All FAQs</a></div>
      </div>
      <aside class="hblog" aria-labelledby="ag-blog-title">
        <header class="hrev__head hfaq__head">
          <h2 id="ag-blog-title">Read Before You Go</h2>
        </header>
        <ul class="hblog__list">
${blogHtml}
        </ul>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../blog.html">Read More Articles</a></div>
      </aside>
    </div>
  </section>
${combine}${hcta}${script}`;

fs.writeFileSync('destinations/agafay.html', head + main + foot);
console.log('destinations/agafay.html written', (head + main + foot).length);
