// Build tours/marrakech-palmeraie-camel-ride.html (NEW, 2026-11-23): camel ride in the Marrakech palm grove, morning or sunset.
// Template = the finished Agafay camel ride & dinner show page. Research: .claude/research/palmeraie-camel-ride-research.md
// Reviews = the 3 general ones (James T., Chloé D., Aisha K.) copied from the Majorelle page. Map: route-map.mjs key "palmeraie".
// Do NOT re-run on the finished page (it rebuilds from the template).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const TPL = 'agafay-desert-camel-ride-dinner-show.html';
let s = fs.readFileSync(root + 'tours/' + TPL, 'utf8');
function rep(a, b, label) {
  if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
  else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
}
function between(start, end, inner, label) {
  const i = s.indexOf(start); if (i < 0) throw new Error('start ' + label);
  const j = s.indexOf(end, i + start.length); if (j < 0) throw new Error('end ' + label);
  s = s.slice(0, i + start.length) + inner + s.slice(j);
}
const TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>';
const INFO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/></svg>';
const li = (ic, t) => `<li>${ic}<span>${t}</span></li>`;
const esc = t => t.replace(/&/g, '&amp;');

const OUT = 'marrakech-palmeraie-camel-ride.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Camel Ride in the Marrakech Palmeraie';
const TITLE = 'Camel Ride in Marrakech Palmeraie | Private, Sunset or Morning';
const DESC = 'Private camel ride in the Marrakech palm grove: a full hour on the camel at sunset or in the morning, mint tea with a Berber family, robe and turban, hotel pick-up 15–20 minutes away.';
const HERO = 'agafay-camel-caravan.jpg';

// ---- head
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const STEPS = [
  ['Pick-up', 'Pick-up at your hotel', 'About 2 hours before sunset (around 15:30 in winter, 17:30 in summer) or at 09:00 for the morning ride. We confirm your time on WhatsApp the day before; in the medina we meet you at the nearest gate.'],
  ['15–20 min', 'Out to the Palmeraie', 'A short drive north of the medina to the palm grove on the edge of the city, straight there with no shop on the way.'],
  ['Arrival', 'Mint tea with a Berber family', 'A welcome in a family home in the palm grove: mint tea and a homemade snack, then you put on a desert robe and turban for the ride.'],
  ['Before the ride', 'Meet your camel', 'The camel kneels so you can climb on, and your camel guide shows you how to sit and hold on as it stands up. Young children ride with a parent.'],
  ['One hour', 'Through the palms', 'A full hour at a walking pace on sandy tracks between the palms and small earth villages. Your guide walks with you and takes photos on the way.'],
  ['About 3 h after pick-up', 'Back to your hotel', 'Back at your hotel or riad about 3 hours after pick-up, or we drop you at a restaurant or at Jemaa el-Fna if your evening goes on.'],
];
const FAQ = [
  ['Is the camel ride really one hour?', 'Yes. Many shared rides in the Palmeraie last 20 to 40 minutes; yours is a full hour on the camel, not counting the tea and the drive. Ask if you would like it shorter or longer.'],
  ['Sunset or morning: which is better?', 'Sunset gives the warm light through the palms and the best photos, and it is cooler in summer. The morning is quieter and fits a day of sightseeing. Avoid the middle of the day from May to September: it is hot in the grove.'],
  ['Is the Palmeraie the desert?', 'No. It is a large palm grove on the edge of Marrakech, with sandy tracks, palms and small villages; after years of drought some palms are dry. The ride is about the palms, the villages and the light, not dunes.'],
  ['Are the camels treated well?', 'We work with a camel family we know: the camels rest between rides and are led at a walking pace. If you would rather not ride, walk beside the camels with your guide.'],
  ['What should we wear?', 'Trousers and closed shoes are the most comfortable on the saddle. We lend you a desert robe and a turban, which also keep the sun and dust off. Bring a warm layer for winter sunsets.'],
  ['How do I book and pay?', null],
];

rep(/"@type":"TouristTrip","name":"[^"]*","description":"[^"]*","image":"[^"]*"/, `"@type":"TouristTrip","name":"${NAME}","description":"${DESC}","image":"https://moroccotourshub.com/assets/images/${HERO}"`, 'ld');
rep(/"itemListElement":\[\{"@type":"ListItem","position":1,"name":"Pick-up at your hotel"[^\]]*\]/, '"itemListElement":[' + STEPS.map((x, i) => `{"@type":"ListItem","position":${i + 1},"name":"${x[1]}"}`).join(',') + ']', 'ld-it');
{ const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a || 'Send your request with the form or on WhatsApp, then pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before.' } })) };
  rep('</head>', `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>\n</head>`, 'faqld'); }

// ---- hero
rep('<img src="/assets/images/agafay-sunset.jpg" alt="Sunset over the stony hills of the Agafay desert" width="1600" height="1000" loading="eager"',
  `<img src="/assets/images/${HERO}" alt="Riders on a camel caravan in the late-afternoon light near Marrakech" width="1600" height="1067" loading="eager"`, 'hero');
rep('<span>Camel Ride &amp; Dinner Show</span>', '<span>Palmeraie Camel Ride</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Camel Ride in the Marrakech Palmeraie<span class="script">An hour among the palms, minutes from the medina</span></h1>', 'h1');
rep('<b>5 to 7 hours (afternoon and evening)</b>', '<b>About 3 hours (sunset or morning)</b>', 'dur');

// ---- overview
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Ride a camel through the palm grove on the edge of Marrakech, past earth villages and old palms, with the warm sunset light coming through the trees, or in the cool quiet of the morning.</p>
          <p class="dt-lead">It is the easy way to ride a camel when you are only in the city for a few days: 15 to 20 minutes from your hotel, mint tea with a Berber family first, and a full hour on the camel instead of the usual short loop.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Times', 'Sunset or morning', 0], ['Drive', '15–20 min away', 1], ['Camel ride', 'A full hour', 2],
    ['Mint tea', 'With a Berber family', 3], ['Guide', 'Local guide included', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Golden light through the palms at sunset', 'Dressed in a desert robe and turban', 'Earth-walled villages inside the grove',
  'Snowy Atlas peaks behind the palms', 'Photos of your ride, taken by your guide',
].map(t => li(TICK, t)).join(''), 'hl');

// ---- gallery (placeholders until real Palmeraie photos: owner to approve)
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['desert-camel-acacia-tree.jpg', 'A camel resting under a tree', 1300, 867],
  ['nomad-tent-tea.jpg', 'A guest sharing mint tea with our local guide', 960, 1280],
  ['desert-acacia-camels.jpg', 'Camels walking between the trees', 1600, 1066],
  ['agafay-sunset.jpg', 'Sunset light over the countryside outside Marrakech', 1600, 1000],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gal');

// ---- programme
{ const ic = '<span class="dt-prog__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>';
  between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', STEPS.map(([t, h, p], i) =>
    `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3>${ic}</summary><p>${p}</p></details></li>\n`).join(''), 'prog'); }

// ---- included (no Costs box: nothing to pay but tips)
between('<h3>Included</h3><ul>', '</ul>', [
  'Private air-conditioned car or minivan with driver (see <a href="../index.html#fleet">our fleet</a>)', 'Local professional guide',
  'Camel ride of a full hour', 'Mint tea and a snack with a Berber family', 'Desert robe and turban to wear', 'Bottled water',
].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul>', ['Lunch or dinner', 'Quad ride (on request, paid on site)', 'Tips (up to you)', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'ninc');
between('<h3>Good to know</h3><ul>', '</ul>', [
  'This is a suggestion: tell us your preferences', 'Tell us if a rider is over about 100 kg so we choose a strong camel',
  'Winter sunsets get cool quickly: bring a warm layer', 'Pregnant, or a bad back? Walk beside the camels with your guide',
].map(t => li(INFO, t)).join(''), 'gtk');
{ const a = s.indexOf('          <div class="dt-card dt-costs">'); const b = s.indexOf('</div>', s.indexOf('</ul>', a)) + 6; if (a < 0) throw new Error('costs'); s = s.slice(0, a) + s.slice(b + 1); }
rep(/<span>Agafay is about 40 km[\s\S]*?<\/span><\/p>/, '<span>The Palmeraie is about 8 km north of the medina, 15 to 20 minutes each way. <a href="https://www.openstreetmap.org/?mlat=31.6725&amp;mlon=-7.9605#map=13/31.651/-7.985" target="_blank" rel="noopener">Open the larger map</a></span></p>', 'mapnote');

// ---- make it your own + fit
rep('It is your private evening, so the plan moves with you.', 'It is your private ride, so the plan moves with you.', 'mio-lead');
between('<ul class="dt-ticks dt-ticks--2">', '</ul>', [
  'A longer ride, up to two hours', 'A quad ride in the palm grove before or after the camels',
  'The ride on the same day as our <a href="majorelle-garden-palaces-marrakech-tour.html">Majorelle Garden &amp; palaces tour</a>', 'Dinner after the sunset: we drop you at a restaurant',
  'A <a href="marrakech-hammam-experience.html">hammam and massage</a> to end the day', 'Child seats in the car',
].map(t => li(TICK, t)).join(''), 'mio');
between('<h3>Great for</h3><ul>', '</ul>', ['A first camel ride when time in Marrakech is short', 'Families: calm camels, children ride with a parent', 'Photos in a robe and turban among the palms'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul>', [
  'Want real desert scenery? Our <a href="agafay-desert-camel-ride-dinner-show.html">Agafay camel ride &amp; dinner</a> crosses stony hills facing the Atlas',
  'Dreaming of sand dunes? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga desert tour</a> takes you to the Sahara',
  'Rather spend a whole day outside the city? The <a href="marrakech-agafay-desert-day-trip.html">Agafay desert day trip</a> adds lunch at a camp',
].map(t => li(INFO, t)).join(''), 'think');

// ---- reviews: the 3 general ones
{ const m = fs.readFileSync(root + 'tours/majorelle-garden-palaces-marrakech-tour.html', 'utf8').match(/<div class="dt-revs">[\s\S]*?<\/figure><\/div>/);
  rep(/<div class="dt-revs">[\s\S]*?<\/figure><\/div>/, m[0], 'revs'); }

// ---- FAQ
{ const ic = '<span class="hfaq-item__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>';
  const book = '<ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before the ride.</p>';
  const a = s.indexOf('          <details class="hfaq-item" open>'); const b = s.lastIndexOf('</details>', s.indexOf('<aside class="dt-aside"')) + 10;
  s = s.slice(0, a) + FAQ.map(([q, ans], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3>${ic}</summary><div class="hfaq-item__a">${ans ? `<p>${ans}</p>` : book}</div></details>`).join('\n') + s.slice(b); }

// ---- booking box, others, banners
rep('value="Agafay Desert Camel Ride &amp; Dinner Show"', `value="${esc(NAME)}"`, 'form');
rep('<b>Agafay Desert Camel Ride &amp; Dinner Show</b>', `<b>${esc(NAME)}</b>`, 'mbar');
{ const dt = fs.readFileSync(root + 'day-trips.html', 'utf8');
  const card = id => { const a = dt.indexOf(`<li id="${id}">`); const b = dt.indexOf('</li>', a) + 5; return dt.slice(a, b).replace(`<li id="${id}">`, '<li>').replace('href="tours/', 'href="../tours/'); };
  const a = s.indexOf('<ul class="htours__list dt-others__list">') + '<ul class="htours__list dt-others__list">'.length; const b = s.indexOf('<li class="htours__end">', a);
  s = s.slice(0, a) + '\n        ' + ['dt-camel-dinner', 'dt-quad', 'dt-majorelle'].map(card).join('\n        ') + '\n        ' + s.slice(b); }
rep('<h2 id="hcta-title">Book Your Sunset in Agafay</h2>', '<h2 id="hcta-title">Book Your Palm Grove Camel Ride</h2>', 'cta');
rep('Tell us your hotel and your date; we’ll pick you up in the afternoon.', 'Tell us your hotel, your date and sunset or morning; we’ll pick you up at the door.', 'ctasub');

for (const w of ['Agafay camp', 'dinner show', 'fire show', '22:30', '40 min', 'Dinner &amp; show']) if (s.includes(w)) console.log('LEFTOVER:', w);
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT);
// After the build (done by hand on 2026-11-23): booking-box WhatsApp text -> "Palmeraie camel ride in Marrakech", then route-map.mjs <page> palmeraie.
