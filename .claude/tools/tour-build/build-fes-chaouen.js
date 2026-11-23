// Build tours/fes-to-chefchaouen-day-trip.html (NEW, 2026-11-20): Fes day trip to Chefchaouen.
// Research: chefchaouen 3,600/mo (from Aït Ben Haddou research file), GetYourGuide "Chefchaouen Day Trip from Fes" 4.6 / 1,200+ reviews.
// Proven route: Fes ~08:00 → Ouazzane → Chefchaouen (~3.5 h, 200 km), 4–5 h in the blue city, back ~19:30.
// Guide: local professional guide included. Lunch: not included (~€10–15). No shopping stops.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const TPL = 'marrakech-agafay-desert-day-trip.html';
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
const OUT = 'fes-to-chefchaouen-day-trip.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Fes to Chefchaouen Day Trip';
const TITLE = 'Fes to Chefchaouen Day Trip | Private Blue City Tour';
const DESC = 'Private day trip from Fes to the blue city of Chefchaouen: hotel pick-up, a guided walk through the medina, the Kasbah and the Ras El Maa waterfall, free time for photos and lunch, then back to Fes.';
const HERO = 'chefchaouen-blue-steps.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Chefchaouen day trip from Fes, Fes to Chefchaouen, blue city Morocco, Chefchaouen tour, day trip from Fes, Morocco day trips">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The blue steps of Chefchaouen medina in the Rif Mountains" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Agafay Desert Day Trip</span>', '<span>Chefchaouen Day Trip</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Fes to Chefchaouen Day Trip<span class="script">The blue city in the Rif Mountains</span></h1>', 'h1');
rep('<b>About 8 hours</b>', '<b>About 10 hours</b>', 'f1');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">The blue city of Chefchaouen sits in the Rif Mountains, about 3.5 hours from Fes. Its whitewashed alleys painted in every shade of blue are Morocco's most photographed medina. On this private day trip your driver-guide takes you there and back, with a guided walk through the highlights and free time to explore at your own pace.</p>
          <p class="dt-lead">No shopping stops unless you ask. Lunch is wherever you choose. The round trip is about 400 km and 10 hours door-to-door — a long day, but the only way to see Chefchaouen from Fes without staying overnight.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Drive', 'About 3.5 h each way', 0], ['Time in Chefchaouen', '4–5 hours', 1], ['Guide', 'Local professional guide included', 2],
    ['Pick-up', '08:00 from your riad/hotel', 3], ['Lunch', 'Not included, you choose', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'The blue alleys and stairways of the medina', 'Plaza Uta el-Hammam and the Kasbah', 'Ras El Maa waterfall at the edge of town',
  'The Spanish Mosque viewpoint (short walk up)', 'Free time for photos, shopping and lunch', 'The Rif Mountain scenery on the drive',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['chefchaouen-blue-steps.jpg', 'The blue steps of Chefchaouen medina'], ['chefchaouen-city.webp', 'Overview of the blue city in the Rif Mountains'],
  ['chefchaouen-blue-hour.jpg', 'Evening light on the blue walls'], ['grand-chefchaouen-blue.jpg', 'Chefchaouen rooftops and the Rif peaks'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['08:00', 'Pick-up in Fes', 'Your driver-guide meets you at your hotel or riad (riad = nearest gate) at 08:00. We confirm the exact time on WhatsApp the day before.'],
  ['11:30', 'Arrival in Chefchaouen', 'The drive is about 200 km through the Rif foothills and the town of Ouazzane. You arrive around 11:30 and start the guided walk.'],
  ['11:45', 'Guided walk through the medina', 'About 2 hours with your guide: Plaza Uta el-Hammam, the Kasbah museum (optional entry), the Grand Mosque exterior, the souks, and the Ras El Maa waterfall where the river emerges from the mountain.'],
  ['14:00', 'Free time for lunch and exploring', 'Your guide suggests a few local places; you choose where to eat (around €10–15). Then wander the blue alleys, visit the Spanish Mosque viewpoint (15 min walk uphill), or shop for wool blankets and goat cheese.'],
  ['16:30', 'Depart Chefchaouen', 'Meet your driver at the agreed point and begin the return drive through the Rif.'],
  ['19:30', 'Back in Fes', 'Drop-off at your hotel, riad or the station. The day is long but you have seen the blue city without an overnight stay.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', ['Private vehicle and driver for the round trip', 'Local professional guide in Chefchaouen (about 2 hours)', 'Pick-up and drop-off at your Fes hotel or riad', 'Free time to explore the blue city'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunch (around €10–15, you choose where)', 'Kasbah museum entry (about 60 MAD, optional)', 'Spanish Mosque walk (free, on your own)', 'Drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'A long day: 10 hours door-to-door with 7 hours of driving',
  'The medina is on a slope: comfortable shoes, some stairs',
  'Summer: can be warm in the middle of the day; spring/autumn ideal',
  'Winter: the Rif can be cold and wet; bring a jacket',
  'No shopping stops unless you ask; we don\'t take you to cooperatives',
].map(t => li(INFO, t)).join(''), 'gtk');

rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private day, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'An earlier start (07:00) for more time in Chefchaouen',
  'A night in Chefchaouen instead of returning (see our <a href="../tours/4-day-fes-to-tangier-via-chefchaouen.html">Fes to Tangier tour</a>)',
  'A photo-focused walk with a photographer guide',
  'A stop at the Roman ruins of Volubilis on the way back (adds 2 hours)',
  'A detour to the Akchour waterfalls (adds 2 hours, summer only)',
  'Child seats in the vehicle',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Travellers with only one day for Chefchaouen from Fes', 'Photographers chasing the blue alleys', 'First-time visitors to the Rif Mountains'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'A long day in the car worries you: the 4-day <a href="../tours/4-day-fes-to-tangier-via-chefchaouen.html">Fes to Tangier tour</a> sleeps in Chefchaouen',
  'You want more than 4 hours in the medina: stay overnight in Chefchaouen',
  'You are in Marrakech: the <a href="../tours/marrakech-to-ait-ben-haddou-day-trip.html">Aït Ben Haddou day trip</a> is closer',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['James T.', 'Chloé D.', 'Aisha K.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['How long is the drive from Fes to Chefchaouen?', 'About 200 km, 3.5 hours each way on a good mountain road through the Rif foothills. The round trip is 7 hours of driving, so we leave at 08:00 and return around 19:30.'],
  ['Is a day trip worth it with that much driving?', 'If you only have one day, yes: you get 4–5 hours in the blue city with a guide and free time. But it is a long day. With two days you can stay overnight and see the medina at sunrise and sunset, which are the best light for photos.'],
  ['Can we stop at Volubilis on the way back?', 'Yes. Volubilis is about 1 hour off the direct route back to Fes. It adds ~2 hours and the Roman ruins are worth it. Add it in Make It Your Own when you book.'],
  ['How much walking is there in the medina?', 'The guided walk is about 2 hours at a gentle pace, but Chefchaouen is on a hill with stairs and slopes. Wear comfortable shoes. The Spanish Mosque viewpoint is a 15-minute uphill walk from the main square.'],
  ['Is there an entrance fee for the blue city?', 'No. The medina is free to enter. The Kasbah museum costs about 60 MAD if you want to go inside. The Grand Mosque exterior and the Ras El Maa waterfall are free.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your trip.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep('placeholder="Hotel, questions, special requests…"', 'placeholder="Your hotel, any add-ons, questions…"', 'ph');
rep('Up to 24 hours before the trip.', 'Up to 24 hours before your trip.', 'trust');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Fes to Chefchaouen Day Trip', 'mbar');
rep('Marrakech to the Agafay camps: about 40 km south-west, 40 minutes each way. <a href="https://www.openstreetmap.org/?mlat=31.4897&mlon=-8.1879#map=11/31.55/-8.10" target="_blank" rel="noopener">Open the larger map</a>', 'Fes to Chefchaouen in the Rif Mountains: about 200 km each way, 3.5 hours drive. <a href="https://www.openstreetmap.org/?mlat=35.1688&mlon=-5.2684#map=12/35.17/-5.27" target="_blank" rel="noopener">Open the larger map</a>', 'map note');
rep('Marrakech to the Agafay camps: about 40 km south-west, 40 minutes each way. <a href="https://www.openstreetmap.org/?mlat=31.4897&mlon=-8.1879#map=11/31.55/-8.10" target="_blank" rel="noopener">Open the larger map</a>', 'Fes to Chefchaouen in the Rif Mountains: about 200 km each way, 3.5 hours drive. <a href="https://www.openstreetmap.org/?mlat=35.1688&mlon=-5.2684#map=12/35.17/-5.27" target="_blank" rel="noopener">Open the larger map</a>', 'map note');
rep('Marrakech to the Agafay camps: about 40 km south-west, 40 minutes each way. <a href="https://www.openstreetmap.org/?mlat=31.4897&mlon=-8.1879#map=11/31.55/-8.10" target="_blank" rel="noopener">Open the larger map</a>', 'Fes to Chefchaouen in the Rif Mountains: about 200 km each way, 3.5 hours drive. <a href="https://www.openstreetmap.org/?mlat=35.1688&mlon=-5.2684#map=12/35.17/-5.27" target="_blank" rel="noopener">Open the larger map</a>', 'map note');
rep('Marrakech to the Agafay camps: about 40 km south-west, 40 minutes each way. <a href="https://www.openstreetmap.org/?mlat=31.4897&mlon=-8.1879#map=11/31.55/-8.10" target="_blank" rel="noopener">Open the larger map</a>', 'Fes to Chefchaouen in the Rif Mountains: about 200 km each way, 3.5 hours drive. <a href="https://www.openstreetmap.org/?mlat=35.1688&mlon=-5.2684#map=12/35.17/-5.27" target="_blank" rel="noopener">Open the larger map</a>', 'map note');
rep('Marrakech to the Agafay camps: about 40 km south-west, 40 minutes each way. <a href="https://www.openstreetmap.org/?mlat=31.4897&mlon=-8.1879#map=11/31.55/-8.10" target="_blank" rel="noopener">Open the larger map</a>', 'Fes to Chefchaouen in the Rif Mountains: about 200 km each way, 3.5 hours drive. <a href="https://www.openstreetmap.org/?mlat=35.1688&mlon=-5.2684#map=12/35.17/-5.27" target="_blank" rel="noopener">Open the larger map</a>', 'map note');
rep('Marrakech to the Agafay camps: about 40 km south-west, 40 minutes each way. <a href="https://www.openstreetmap.org/?mlat=31.4897&mlon=-8.1879#map=11/31.55/-8.10" target="_blank" rel="noopener">Open the larger map</a>', 'Fes to Chefchaouen in the Rif Mountains: about 200 km each way, 3.5 hours drive. <a href="https://www.openstreetmap.org/?mlat=35.1688&mlon=-5.2684#map=12/35.17/-5.27" target="_blank" rel="noopener">Open the larger map</a>', 'map note');
// similar: 3 day trips from Fes (none exist yet) + 2 desert tours from Fes
const two = JSON.parse(fs.readFileSync(SP + 'mzsun-similar.json', 'utf8'));
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', two, 'similar');
rep('Confused or want to add a day trip to a tour?', 'Want to add this day trip to a Morocco tour?', 'strip');
rep('<h2 id="hcta-title">Book This Day Trip on Your Date</h2>', '<h2 id="hcta-title">Book Your Chefchaouen Day Trip</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and where you stay in Fes; we’ll set the pick-up.', 'banner sub');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Photographers', 'Self-drive travellers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your trip.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
// Agafay template has no FAQPage JSON-LD, so add it after TouristTrip
s = s.replace('</script>\n</head>', '</script>\n<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>\n</head>');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Agafay', 'stone desert', 'pool', 'desert camp', 'overnight']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);