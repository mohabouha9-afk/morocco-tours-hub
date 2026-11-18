// Build tours/merzouga-to-fes-tour.html (NEW 2026-11-18: meet in Merzouga -> afternoon around Erg Chebbi -> camp -> Rissani, Ziz, Midelt, Ifrane -> Fes)
// Template = the finished 2-day Fes -> Merzouga page. Never re-run on the finished page.
// Research (2026-11-18): GetYourGuide "One-Way Trip from Merzouga to Fes (Transportation Only)" 4.7 / 55: 8 hours, lunch in Midelt,
//   photo stops at the Ziz Gorges and Ziz Oasis; reviews: "it was a long ride", "the road was closed due to flooding and we had to
//   wait for a long time", stops in Ifrane for the monkeys and Zaïda for lunch. Other GYG transfers Merzouga -> Fes 4.8 / 74.
//   Tripadvisor forum "Getting from Merzouga to Fes": Supratours bus only at night (departs Merzouga ~19:00, Fes ~05:30), CTM from
//   Rissani ~20:00 (arr. ~05:00), daytime = local buses via Rissani/Errachidia; private grand taxi ~1,300 MAD. Reddit r/Morocco:
//   "bus from merzouga to ouarzazate then plane… Rent a car." rome2rio: one direct bus a day, ~11 h. OSRM Merzouga -> Fes ~470 km
//   (mzf3-d3). Angle: for travellers already in Merzouga (night bus, own trip, another tour): the camp night + a private daytime drive.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/2-day-fes-to-merzouga-desert-tour.html';
const out = root + 'tours/merzouga-to-fes-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/merzouga-to-fes-tour.html';
const NAME = '2-Day Merzouga to Fes Tour';
const TITLE = '2-Day Merzouga to Fes Tour: Desert Camp + Private Drive';
const DESC = 'Already in Merzouga? Spend the afternoon around the Erg Chebbi dunes, ride a camel to a desert camp for the night, then travel to Fes in daylight with your own driver, by Rissani, the Ziz Valley, Midelt and the cedar forests of Ifrane.';
const HERO = 'merzouga-white-camel.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Merzouga to Fes, Merzouga to Fes tour, Merzouga to Fes transfer, Merzouga to Fez, desert camp Merzouga, private driver Merzouga Fes, Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/2-day-fes-to-merzouga-desert-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Meet in Merzouga → Khamlia → Nomad family → Camel ride to the camp',
    p: 'Your driver meets you in Merzouga wherever you are: your hotel or riad, the bus stop, or where your last tour leaves you, by early afternoon at the latest. An easy afternoon around Erg Chebbi: Gnawa music in the village of Khamlia and mint tea in the tent of a nomad family. Your big bags stay in the car: you ride a camel into the dunes for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'Short drives around the dunes'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'Sunrise → Rissani → Ziz Valley → Midelt → Ifrane → Fes',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4 to your driver. North by Rissani, the old caravan town, and the palm gorges of the Ziz Valley, lunch in Midelt, then over the Middle Atlas to Ifrane and the cedar forest, where Barbary macaques sit by the road. In Fes in the early evening, at your riad, hotel, the train station or the airport.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['flag', 'Drop-off at your Fes riad, hotel or airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-ride-dunes\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A white camel resting on the Erg Chebbi dunes at Merzouga" loading="eager"`, 'hero img');
rep('<span>2-Day Fes to Merzouga Desert Tour</span></nav>', '<span>2-Day Merzouga to Fes Tour</span></nav>', 'crumb');
rep(/(<span class="dt-hero__loc">(?:<svg.*?<\/svg>)?)Fes<\/span>/, '$1Merzouga</span>', 'chip');
rep('<h1>2-Day Fes to Merzouga Desert Tour<span class="script">One Night in the Dunes, Back to Fes</span></h1>', '<h1>2-Day Merzouga to Fes Tour<span class="script">A Night in the Dunes, Then North to Fes</span></h1>', 'h1');
rep('<small>Start &amp; end</small><b>Fes</b>', '<small>Start &amp; end</small><b>Merzouga → Fes</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Already in Merzouga, off the night bus or at the end of another trip, and heading north? This is the easy way to Fes. We meet you in the village, take you to the Gnawa musicians of Khamlia and a nomad family’s tent, then a camel carries you into the dunes of Erg Chebbi for sunset and a night in the camp.</p>
          <p class="dt-lead">In the morning your own driver takes you to Fes in daylight, not on the night bus: by the Rissani market, the palm gorges of the Ziz Valley and the cedar forests of Ifrane, stopping whenever you want, with lunch where you choose and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Fes (round trip)</dd>', '<dd>Merzouga → Fes</dd>', 'kf1');
rep(/(<dt>)Desert night(<\/dt><dd>)Camp in the dunes(<\/dd>)/, '$1Meeting$2Anywhere in Merzouga$3', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Gnawa music in Khamlia',
  'Mint tea with a nomad family',
  'Sunset camel ride into Erg Chebbi',
  'A night in a camp in the dunes',
  'Sunrise and sandboarding',
  'The Rissani market and the Ziz Valley',
  'Barbary macaques in the cedar forest',
  'Fes in daylight, not on the night bus',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['khamlia-gnawa.jpg', 'Gnawa musicians in the village of Khamlia', 1600, 1066],
  ['nomad-tent-tea.jpg', 'Mint tea in a nomad tent near Merzouga', 960, 1280],
  ['merzouga-camel-orange-dusk.jpg', 'Camels on the Merzouga dunes at dusk', 1300, 866],
  ['desert-camp-dunes.jpg', 'A desert camp among the Erg Chebbi dunes', 1600, 900],
  ['ziz-valley-plateau.jpg', 'The Ziz Valley palm groves below the plateau', 1600, 1066],
  ['grand-fes-blue-gate.jpg', 'Bab Bou Jeloud, the blue gate of Fes', 975, 1300],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Meeting anywhere in Merzouga',
  'Drop-off at your riad, hotel or station in Fes',
  '1 night in a desert camp',
  'Dinner and breakfast',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Tell us where and when you arrive in Merzouga',
  'Small bag for the camp; luggage stays in the car',
  'Rissani market is busiest on Sun, Tue and Thu',
  'After heavy rain, roads can close for a few hours',
  'Desert nights are cold in winter',
].map(t => li(INFO, t)).join(''), 'gtk');
rep(/<span>Fes to Merzouga and back, about 940 km in 2 days\. <a href="[^"]*"/, '<span>Merzouga to Fes by the Ziz Valley, about 470 km on day 2. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Merzouga,Morocco&amp;destination=Fes,Morocco&amp;waypoints=Khamlia,Morocco%7CRissani,Morocco%7CErfoud,Morocco%7CMidelt,Morocco%7CIfrane,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (camp only, kept) ----------
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers arriving in Merzouga by bus',
  'Anyone ending a southern trip in Merzouga',
  'Travellers who want Fes without the night bus',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Starting in Fes? The <a href="2-day-fes-to-merzouga-desert-tour.html">2-day Fes to Merzouga tour</a> is a round trip from Fes',
  'Want a full day in the dunes first? Add our <a href="merzouga-4x4-desert-day-tour.html">4×4 day around Merzouga</a>',
  'Flying in? The <a href="3-day-errachidia-to-merzouga-desert-tour.html">3-day Errachidia tour</a> starts at the airport, 2 hours from the dunes',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'mf2-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Why not take the bus from Merzouga to Fes?', 'You can, but the direct bus leaves Merzouga in the evening and arrives in Fes around dawn, so you see nothing of the road and lose a night’s sleep. By day you would change buses in Rissani and Errachidia. With your own driver you travel in daylight and stop where you like.'],
  ['Where do you meet us in Merzouga?', 'Wherever suits you: your hotel or riad, the bus stop in the village, or where another tour leaves you. Just send us the place and the time you arrive; we meet you by early afternoon so there is time for Khamlia before the camel ride.'],
  ['How long is the drive to Fes?', 'About 470 km and eight hours with stops: Rissani, the Ziz Valley viewpoint, lunch in Midelt and the cedar forest near Ifrane. We leave after breakfast and reach Fes in the early evening.'],
  ['Can we skip the camp and just drive to Fes?', 'Yes. If you have already slept in the dunes, we can do the drive alone in one day with the same stops and your own driver. Tell us when you book and we send a price for the private transfer.'],
  ['What happens to our luggage at the camp?', 'Your big bags stay locked in the car at the edge of the dunes. Bring a small bag with warm clothes, a toothbrush and a charger. If you prefer not to ride, a 4×4 can take you and your bags to the camp instead.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'After the night bus: a room to rest and shower first',
  'Upgrade to a luxury camp',
  '<a href="merzouga-quad-biking.html">Quad biking</a> or a <a href="merzouga-buggy-tour.html">buggy</a> before sunset (extra cost)',
  'A <a href="merzouga-medfouna-cooking-class.html">medfouna cooking class</a> in the afternoon',
  'Drop-off at Fes airport or the train station',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="2-Day Fes to Merzouga Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%202-Day%20Fes%20to%20Merzouga%20Desert%20Tour.', 'information%20about%20the%202-Day%20Merzouga%20to%20Fes%20Tour.', 'wa');
rep('<b>2-Day Fes to Merzouga</b><span>Free', '<b>2-Day Merzouga to Fes</b><span>Free', 'mbar');

// ---------- similar ----------
const si = s.indexOf('<ul class="htours__list dt-others__list">\n'); const sj = s.indexOf('        <li class="htours__end">', si);
s = s.slice(0, si + '<ul class="htours__list dt-others__list">\n'.length) + JSON.parse(fs.readFileSync(SP + 'mf2-similar.json', 'utf8')) + s.slice(sj);

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Backpackers', 'Couples', 'Friends', 'Solo travellers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Meeting in Merzouga', 'Khamlia and a nomad family', 'Sunset camel ride and desert camp', 'Sunrise on Erg Chebbi', 'Rissani and the Ziz Valley', 'Midelt, Ifrane and Fes'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
for (const bad of ['07:30', 'round trip', 'Back to Fes', 'Fes (round']) if (main.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
