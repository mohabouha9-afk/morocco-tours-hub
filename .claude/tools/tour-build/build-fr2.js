// Build tours/2-day-fes-to-merzouga-desert-tour.html (NEW 2026-11-18: Fes -> Ifrane -> Midelt -> Ziz -> Merzouga camp -> back to Fes)
// Template = the finished 2-day Marrakech -> Merzouga page. Never re-run on the finished page.
// Research (2026-11-18): GetYourGuide "From Fez: Sahara Desert 2-Day Tour with Merzouga Camp Stay" 4.8 / 2,182 reviews read in full:
//   D1 Fes - Ifrane - cedar forest (macaques) - Midelt lunch - Ziz - Erfoud - Merzouga, camel ride at sunset, camp; D2 sunrise,
//   breakfast, drive back to Fes. "Duration from Fes to Merzouga around 7 hours, without stops". Medina riads: meeting points at
//   Bab Boujloud etc. Complaints: "The lunch at Kerrandou was lacking: 120 MAD for an empty buffet", "The fossil museum was also
//   more like a trinket shop", driver warned of "a tourist scam at the monkey forest", long journey. Other Fes 2-day round trips:
//   GYG 4.8 / 512 and 4.7 / 452. OSRM: Fes -> Merzouga ~470 km (fm4-d1), back ~470 km (mzf3-d3). OpenSEO had no credits.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/2-day-marrakech-to-merzouga-desert-tour.html';
const out = root + 'tours/2-day-fes-to-merzouga-desert-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/2-day-fes-to-merzouga-desert-tour.html';
const NAME = '2-Day Fes to Merzouga Desert Tour';
const TITLE = '2-Day Fes to Merzouga Desert Tour | Private Round Trip';
const DESC = 'Private 2-day desert tour from Fes and back: the Middle Atlas cedar forests and the Ziz Valley to a sunset camel ride and a night in a camp in the Merzouga dunes, then sunrise on Erg Chebbi and the road home to Fes.';
const HERO = 'merzouga-camel-ride-dunes.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="2-day desert tour from Fes, Fes to Merzouga 2 days, Fez to Merzouga, Merzouga tour from Fes, Sahara tour from Fes, Erg Chebbi camp, private desert tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/2-day-marrakech-to-merzouga-desert-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Fes → Ifrane → Cedar forest → Midelt → Ziz Valley → Merzouga',
    p: 'Pick-up at your riad or hotel in Fes around 07:30. Up into the Middle Atlas to Ifrane, the alpine town of red roofs, and the cedar forest near Azrou, where Barbary macaques sit by the road. Lunch in Midelt, wherever you like, then down the palm gorges of the Ziz Valley and past Erfoud to the dunes of Erg Chebbi. Your big bags stay in the car: you ride a camel into the sand for sunset, then dinner, drums by the fire and a night in the camp under the stars.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'Sunrise on Erg Chebbi → Ziz Valley → Midelt → Fes',
    p: 'Up early to climb a dune for sunrise, sandboarding if you like, breakfast in the camp and back by camel or 4×4 to your car. North along the Ziz Valley with a stop at the viewpoint over the palms, lunch in Midelt, and back over the Middle Atlas through the cedars to Fes, at your riad, hotel, the train station or Fes airport in the early evening.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['flag', 'Drop-off at your Fes riad, hotel or airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/hero-desert-caravan\.webp" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Riding camels over the Erg Chebbi dunes near Merzouga" loading="eager"`, 'hero img');
rep('<span>2-Day Desert Tour</span></nav>', '<span>2-Day Fes to Merzouga Desert Tour</span></nav>', 'crumb');
rep(/(<span class="dt-hero__loc">(?:<svg.*?<\/svg>)?)Marrakech<\/span>/, '$1Fes</span>', 'chip');
rep('<h1>2-Day Marrakech to Merzouga Desert Tour<span class="script">The Sahara dunes in only two days</span></h1>', '<h1>2-Day Fes to Merzouga Desert Tour<span class="script">One Night in the Dunes, Back to Fes</span></h1>', 'h1');
rep('<small>Start &amp; end</small><b>Marrakech</b>', '<small>Start &amp; end</small><b>Fes</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">The Sahara from Fes in two days. Over the cedar forests of the Middle Atlas, where Barbary macaques watch from the trees, and down the palm gorges of the Ziz Valley to the golden dunes of Erg Chebbi. A camel ride into the sand as the sun goes down, dinner and drums by the fire, and a night in a camp under more stars than you have ever seen.</p>
          <p class="dt-lead">At dawn you climb a dune for the sunrise, then the road takes you home to your riad in Fes. Your own car and driver-guide, stops when you want them, lunch where you choose, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep(/<dd>Marrakech<\/dd>/, '<dd>Fes (round trip)</dd>', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Barbary macaques in the cedar forest',
  'Ifrane, the alpine town of the Atlas',
  'The palm gorges of the Ziz Valley',
  'Sunset camel ride into Erg Chebbi',
  'Dinner and drums by the fire',
  'A night under the Sahara stars',
  'Sunrise and sandboarding on the dunes',
  'Lunch in Midelt below the Atlas',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['grand-fes-blue-gate.jpg', 'Bab Bou Jeloud, the blue gate of Fes', 975, 1300],
  ['ziz-valley-plateau.jpg', 'The Ziz Valley palm groves below the plateau', 1600, 1066],
  ['merzouga-camel-caravan.jpg', 'A camel caravan on the Merzouga dunes', 1600, 1066],
  ['luxury-camp-night.jpg', 'A desert camp lit up at night in the dunes', 1600, 1066],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp near Merzouga', 1600, 1067],
  ['sandboarding.jpg', 'Sandboarding down a dune at Erg Chebbi', 1170, 1560],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up and drop-off at your riad or hotel in Fes',
  '1 night in a desert camp',
  'Dinner and breakfast',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Long road days: we stop whenever you want',
  'Medina riads: we meet you at the nearest gate',
  'Small bag for the camp; luggage stays in the car',
  'Don’t buy food for the macaques from sellers',
  'Desert nights are cold in winter',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to the Sahara and back, about 1,120 km in 2 days\. <a href="[^"]*"/, '<span>Fes to Merzouga and back, about 940 km in 2 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Fes,Morocco&amp;destination=Fes,Morocco&amp;waypoints=Ifrane,Morocco%7CMidelt,Morocco%7CErfoud,Morocco%7CMerzouga,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (camp only, kept) ----------
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers in Fes with only two days',
  'Friends and couples happy with long road days',
  'Anyone who wants one night under the Sahara stars',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want more time in the dunes? The <a href="3-day-fes-to-merzouga-desert-tour.html">3-day Fes to Merzouga tour</a> adds a full day around Merzouga',
  'Going on to Marrakech? The <a href="3-day-fes-to-marrakech-desert-tour.html">3-day Fes to Marrakech tour</a> ends there',
  'Want the Todra Gorge too? The <a href="4-day-fes-desert-tour.html">4-day Fes desert tour</a> adds a night at the gorge',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'fr2-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is two days enough for the Sahara from Fes?', 'Yes, if you don’t mind the road: about eight hours each way with stops, and the reward is a sunset camel ride, a night in the dunes and the sunrise. With one more day, the 3-day tour adds a full, unhurried day around Merzouga.'],
  ['Will we reach the dunes for sunset?', 'Yes. We leave Fes around 07:30, a little earlier in winter when the sun sets early, so you are on your camel before the light turns gold. We confirm the time on WhatsApp the day before.'],
  ['Where do we eat lunch?', 'Wherever you like. Your driver suggests a few local places in Midelt on both days and you choose; there is no fixed restaurant and no buffet we take you to. Lunch is usually about €10–15 each.'],
  ['What happens to our luggage at the camp?', 'Your big bags stay locked in the car at the edge of the dunes. Bring a small bag with warm clothes, a toothbrush and a charger. If you prefer not to ride, a 4×4 can take you and your bags to the camp instead.'],
  ['Can we feed the macaques in the cedar forest?', 'Please don’t. Sellers by the road offer nuts and bread for the monkeys, but feeding makes them sick and aggressive. Your driver stops where you can watch them quietly from close by.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury camp',
  '<a href="merzouga-quad-biking.html">Quad biking</a> on the dunes (extra cost)',
  'A <a href="merzouga-buggy-tour.html">buggy for two</a> before sunset (extra cost)',
  'A 4×4 to the camp instead of the camel',
  'Drop-off at Fes airport or the train station',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="2-Day Marrakech to Merzouga Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%202-Day%20Marrakech%20to%20Merzouga%20Desert%20Tour.', 'information%20about%20the%202-Day%20Fes%20to%20Merzouga%20Desert%20Tour.', 'wa');
rep('<b>2-Day Merzouga Desert Tour</b><span>Free', '<b>2-Day Fes to Merzouga</b><span>Free', 'mbar');

// ---------- similar ----------
const si = s.indexOf('<ul class="htours__list dt-others__list">\n'); const sj = s.indexOf('        <li class="htours__end">', si);
s = s.slice(0, si + '<ul class="htours__list dt-others__list">\n'.length) + JSON.parse(fs.readFileSync(SP + 'fr2-similar.json', 'utf8')) + s.slice(sj);

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Friends', 'Solo travellers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Fes pick-up, Ifrane and the cedar forest', 'Midelt and the Ziz Valley', 'Sunset camel ride and desert camp', 'Sunrise and sandboarding on Erg Chebbi', 'Ziz Valley, Midelt and back to Fes'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
for (const bad of ['Tichka', 'Ouarzazate', 'Dades', 'Draa', 'High Atlas', '06:00']) if (main.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
