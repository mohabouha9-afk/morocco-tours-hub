// Build tours/3-day-fes-to-marrakech-desert-tour.html (NEW 2026-11-18: Fes -> Ifrane -> Midelt -> Merzouga camp -> Todra -> Dades -> Aït Ben Haddou -> Marrakech)
// Template = the finished 3-day Rabat -> Merzouga -> Marrakech page (same route shape). Research: .claude/research/tour-3day-fes-marrakech-research.md
// Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/3-day-desert-tour-rabat-merzouga-marrakech.html';
const out = root + 'tours/3-day-fes-to-marrakech-desert-tour.html';
let s = fs.readFileSync(tpl, 'utf8');
function rep(a, b, label) {
  if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
  else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
}
function between(start, end, inner, label) {
  const i = s.indexOf(start); if (i < 0) throw new Error('start ' + label);
  const j = s.indexOf(end, i + start.length); if (j < 0) throw new Error('end ' + label);
  s = s.slice(0, i + start.length) + inner + s.slice(j);
}
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));

const URL = 'https://moroccotourshub.com/tours/3-day-fes-to-marrakech-desert-tour.html';
const NAME = '3-Day Fes to Marrakech Desert Tour';
const TITLE = '3-Day Fes to Marrakech Desert Tour via Merzouga | Private';
const DESC = 'Private 3-day desert tour from Fes to Marrakech: the Middle Atlas cedar forests and the Ziz Valley to a sunset camel ride and a night in the Merzouga dunes, then the Todra Gorge, the Dades Valley and Aït Ben Haddou.';
const HERO = 'merzouga-caravan-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="3-day desert tour from Fes to Marrakech, Fes to Marrakech desert tour, Fez to Marrakech via Merzouga, Sahara tour from Fes, Merzouga camp, Todra Gorge, Aït Ben Haddou, private desert tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/3-day-desert-tour-rabat-merzouga-marrakech\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Fes → Ifrane → Cedar forest → Midelt → Ziz Valley → Merzouga',
    p: 'Pick-up at your riad or hotel in Fes around 07:30. Up into the Middle Atlas to Ifrane, the alpine town of red roofs, and the cedar forest near Azrou, where Barbary macaques sit by the road. Lunch in Midelt below the Jebel Ayachi, then down the palm gorges of the Ziz Valley to Erfoud and the dunes. Your big bags stay in the car: you ride a camel into Erg Chebbi for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'Merzouga → Rissani → Tinghir → Todra Gorge → Dades Valley',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. Through Rissani, the old caravan town of the Tafilalet, and along the Jebel Saghro to the palm grove of Tinghir. A walk between the 300 m walls of the Todra Gorge, at your pace, then on to the Dades Valley for a quiet evening among red cliffs and kasbahs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'West along the Road of a Thousand Kasbahs, through the Valley of Roses and the Skoura palm grove, past Ouarzazate to Aït Ben Haddou. Your driver-guide walks you up through the ksar to its old granary. Then over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to Marrakech in the late afternoon, at your hotel, riad or the airport.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['flag', 'Drop-off at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/sahara-camel-pink-sunset\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan on the Erg Chebbi dunes at sunset" loading="eager"`, 'hero img');
rep('<span>3-Day Rabat to Merzouga &amp; Marrakech</span></nav>', '<span>3-Day Fes to Marrakech Desert Tour</span></nav>', 'crumb');
rep('r="2.5"/></svg>Rabat</span>', 'r="2.5"/></svg>Fes</span>', 'chip');
rep('<h1>3-Day Rabat to Merzouga Desert Tour<span class="script">From the Capital to the Dunes</span></h1>', '<h1>3-Day Fes to Marrakech Desert Tour<span class="script">The Sahara on Your First Night</span></h1>', 'h1');
rep('<small>Route</small><b>Rabat → Marrakech</b>', '<small>Route</small><b>Fes → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">The most beautiful way from Fes to Marrakech, with the Sahara on your very first night. Over the cedar forests of the Middle Atlas, where Barbary macaques watch from the trees, through Ifrane and Midelt and down the palm gorges of the Ziz Valley to the dunes of Erg Chebbi, for a sunset camel ride and a night in the camp.</p>
          <p class="dt-lead">Then the great road of the south: the Todra Gorge, an evening in the Dades Valley, the kasbahs of the Valley of Roses and Aït Ben Haddou, and over the High Atlas to your riad in Marrakech. Your own car and driver-guide for all three days, stops when you want them, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Rabat → Marrakech</dd>', '<dd>Fes → Marrakech</dd>', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Barbary macaques in the cedar forest',
  'Ifrane, the alpine town of the Atlas',
  'The palm gorges of the Ziz Valley',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'A walk in the Todra Gorge',
  'The Valley of Roses and Skoura',
  'Aït Ben Haddou and the Tizi n’Tichka pass',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery (different from the Rabat page) ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['grand-fes-blue-gate.jpg', 'Bab Bou Jeloud, the blue gate of Fes', 975, 1300],
  ['merzouga-camel-caravan-guide.jpg', 'A camel caravan led over the Merzouga dunes', 1300, 866],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp near Merzouga', 1600, 1067],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['dades-valley-villages.jpg', 'Earthen villages in the Dades Valley', 1500, 1000],
  ['ait-ben-haddou-terrace.jpg', 'Aït Ben Haddou seen from a terrace', 1500, 1000],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up at your riad or hotel in Fes',
  'Drop-off at your Marrakech hotel or airport',
  '1 night in a desert camp',
  '1 night in the Dades Valley',
  '2 dinners and 2 breakfasts',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Medina riads: we meet you at the nearest gate',
  'Early start on day 1, a little earlier in winter',
  'Small bag for the camp; luggage stays in the car',
  'Don’t feed the macaques: watch them from the car',
  'Phone signal is patchy in the dunes and gorges',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Taourirt Kasbah, Ouarzazate:</b> small fee, if you go in',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Rabat to Marrakech by the Sahara, about 1,200 km in 3 days\. <a href="[^"]*"/, '<span>Fes to Marrakech by the Sahara, about 1,060 km in 3 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Fes,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Ifrane,Morocco%7CMidelt,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CBoumalne+Dades,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations: Night 1 camp, Night 2 Dades (same table as the Rabat page) ----------
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers going from Fes to Marrakech with three days',
  'First-timers who want dunes, gorges and kasbahs',
  'Anyone flying home from Marrakech',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want a whole day in the dunes? The <a href="5-day-fes-to-marrakech-desert-tour.html">5-day Fes to Marrakech tour</a> adds a full day in Merzouga',
  'Coming back to Fes? The <a href="4-day-fes-desert-tour.html">4-day Fes desert tour</a> is a round trip',
  'Starting in Marrakech? Take the <a href="3-day-marrakech-to-fes-desert-tour.html">3-day Marrakech to Fes tour</a>',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'fm3-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Why not just take the train from Fes to Marrakech?', 'The train takes about seven hours by Rabat and Casablanca and sees none of the south. With three days, this tour makes the same move and adds the Middle Atlas, a night in the Sahara, the Todra Gorge and Aït Ben Haddou, then drops you at your riad in Marrakech.'],
  ['How long are the driving days?', 'Day 1 is the long one: about 470 km and eight hours with stops, and it ends with the sunset camel ride. Day 2 is about five hours and day 3 about six. It is your own car, so we stop for photos, coffee or a rest whenever you want.'],
  ['Can you pick us up at a riad in the Fes medina?', 'Yes. Cars can’t enter the medina, so your driver meets you at the nearest gate, often with someone from your riad to help with the bags. Send us your riad’s name and we confirm the meeting point and time on WhatsApp.'],
  ['What is the hotel like on the second night?', 'You choose the level in the table above: a family riad, a 4-star hotel or a 5-star hotel in the Dades Valley, all with private bathrooms. We name the place before you pay the deposit, so you know where you sleep.'],
  ['Can we skip the camel ride?', 'Yes. A 4×4 can take you to the camp at sunset and back in the morning instead, at no extra cost. Many guests ride in by camel and drive out, or swap the ride for a quad in the dunes, which costs extra.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A day trip to Volubilis and Meknes before you leave Fes',
  'A night in Midelt for a calmer first day',
  'Upgrade to a luxury camp',
  '<a href="merzouga-quad-biking.html">Quad biking</a> or a <a href="merzouga-buggy-tour.html">buggy</a> in the dunes (extra cost)',
  'A <a href="marrakech-medina-guided-tour.html">medina tour</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="3-Day Rabat to Merzouga Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%203-Day%20Rabat%20to%20Merzouga%20Desert%20Tour.', 'information%20about%20the%203-Day%20Fes%20to%20Marrakech%20Desert%20Tour.', 'wa');
rep('<b>3-Day Rabat to Merzouga</b><span>Free', '<b>3-Day Fes to Marrakech</b><span>Free', 'mbar');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'fm3-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Fes pick-up, Ifrane and the cedar forest', 'Midelt and the Ziz Valley', 'Sunset camel ride and desert camp (night 1)', 'Rissani and the Todra Gorge', 'Dades Valley (night 2)', 'Valley of Roses and Aït Ben Haddou', 'Tizi n’Tichka pass and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Rabat', 'Casablanca', 'Meknes or', 'capital']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
