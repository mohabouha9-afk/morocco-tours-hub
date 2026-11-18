// Build tours/3-day-fes-to-merzouga-desert-tour.html (NEW 2026-11-18: Fes -> Merzouga camp -> 4x4 day + Merzouga hotel -> Rissani, Erfoud, Ziz -> Fes)
// Template = the finished 3-day Fes -> Marrakech page. Research notes below. Never re-run on the finished page.
// Research (2026-11-18): moroccan-tour.com "3 Days Tour from Fes to Merzouga Desert | Ends Back in Fes" read in full:
//   D1 Fes-Ifrane-cedars-Midelt-Ziz-Merzouga (7 h drive), camel + camp · D2 Merzouga region by 4x4 (mine, nomads, Khamlia Gnawa,
//   palm grove, seasonal lake), night in a hotel · D3 Rissani souk (Tue/Thu/Sun), Erfoud fossils, Ziz viewpoint, Ifrane, Fes
//   (pick-up 08:30, back 17:00-19:00; camel 40 min-1.5 h; 4x4 to camp instead possible). GetYourGuide "From Fes: 3-Day, 2-Night
//   Trip to Erg Chebbi, Merzouga" + Fes desert listings (2-day round trips 4.8/2,176 and 4.8/512). OpenSEO had no credits.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/3-day-fes-to-marrakech-desert-tour.html';
const out = root + 'tours/3-day-fes-to-merzouga-desert-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/3-day-fes-to-merzouga-desert-tour.html';
const NAME = '3-Day Fes to Merzouga Desert Tour';
const TITLE = '3-Day Fes to Merzouga Desert Tour | Private Round Trip';
const DESC = 'Private 3-day desert tour from Fes and back: the Middle Atlas cedar forests to a sunset camel ride and a camp in the Merzouga dunes, a full day around Erg Chebbi by 4×4, then Rissani, Erfoud and the Ziz Valley back to Fes.';
const HERO = 'sahara-camel-group.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="3-day desert tour from Fes, Fes to Merzouga, Fez to Merzouga round trip, Merzouga tour from Fes, Sahara tour from Fes, Erg Chebbi, Khamlia, private desert tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/3-day-fes-to-marrakech-desert-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Fes → Ifrane → Cedar forest → Midelt → Ziz Valley → Merzouga',
    p: 'Pick-up at your riad or hotel in Fes around 07:30. Up into the Middle Atlas to Ifrane, the alpine town of red roofs, and the cedar forest near Azrou, where Barbary macaques sit by the road. Lunch in Midelt, then down the palm gorges of the Ziz Valley to the dunes of Erg Chebbi. Your big bags stay in the car: you ride a camel into the sand for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. Then the desert around Erg Chebbi with your driver: tea in the tent of a nomad family, Gnawa music in the village of Khamlia, the black stone desert and the old mines, and the Dayet Srij lake when a wet winter has filled it. A slow afternoon by the pool or on the dunes, and a night in a Merzouga hotel at the foot of the sand.',
    meta: [['car', 'Short drives around the dunes'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Erfoud → Ziz Valley → Fes',
    p: 'North by Rissani, the old caravan town of the Tafilalet, with its market and date stalls, and Erfoud, where workshops cut and polish fossils millions of years old. A last look over the palms of the Ziz Valley, then back over the Middle Atlas and through the cedars to Fes, at your riad, hotel, the train station or Fes airport in the early evening.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['flag', 'Drop-off at your Fes riad, hotel or airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-caravan-sunset\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Camels resting on the Erg Chebbi dunes near Merzouga" loading="eager"`, 'hero img');
rep('<span>3-Day Fes to Marrakech Desert Tour</span></nav>', '<span>3-Day Fes to Merzouga Desert Tour</span></nav>', 'crumb');
rep('<h1>3-Day Fes to Marrakech Desert Tour<span class="script">The Sahara on Your First Night</span></h1>', '<h1>3-Day Fes to Merzouga Desert Tour<span class="script">Two Nights by the Dunes, Back to Fes</span></h1>', 'h1');
rep('<small>Route</small><b>Fes → Marrakech</b>', '<small>Route</small><b>Fes round trip</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">The Sahara from Fes, with time to feel it. Over the cedar forests of the Middle Atlas and down the palm gorges of the Ziz Valley to the dunes of Erg Chebbi, for a sunset camel ride and a night in the camp. Then a whole day around Merzouga instead of driving straight back: nomad tea, Gnawa music in Khamlia, sandboarding and the quiet of the dunes.</p>
          <p class="dt-lead">On day 3 the road brings you home by the Rissani market, the fossil workshops of Erfoud and the Ziz Valley, back to your riad in Fes for dinner. Your own car and driver-guide for all three days, stops when you want them, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Fes → Marrakech</dd>', '<dd>Fes (round trip)</dd>', 'kf1');
rep(/(<dt>)Desert night(<\/dt><dd>)Camp in the dunes(<\/dd>)/, '$1Desert day$2A full day in Merzouga$3', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Barbary macaques in the cedar forest',
  'The palm gorges of the Ziz Valley',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'Tea with a nomad family',
  'Gnawa music in Khamlia',
  'The Rissani market and Erfoud fossils',
  'Ifrane, the alpine town of the Atlas',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ziz-valley-plateau.jpg', 'The Ziz Valley palm groves below the plateau', 1600, 1066],
  ['merzouga-camel-orange-dusk.jpg', 'Camels on the Merzouga dunes at dusk', 1300, 866],
  ['desert-camp-dunes.jpg', 'A desert camp among the Erg Chebbi dunes', 1600, 900],
  ['nomad-tent-tea.jpg', 'Mint tea in a nomad tent near Merzouga', 960, 1280],
  ['khamlia-gnawa.jpg', 'Gnawa musicians in the village of Khamlia', 1600, 1066],
  ['rissani-spice-market.jpg', 'Spice stalls in the Rissani market', 1600, 1066],
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
  '1 night in a Merzouga hotel',
  '2 dinners and 2 breakfasts',
  'Camel ride and sandboarding',
  'The 4×4 day around Merzouga',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Medina riads: we meet you at the nearest gate',
  'Early start on day 1, a little earlier in winter',
  'Small bag for the camp; luggage stays in the car',
  'Rissani market is busiest on Sun, Tue and Thu',
  'Dayet Srij only fills after a wet winter',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  'The sites on this route are free',
  '<b>Tips:</b> up to you, also for the Gnawa musicians',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Fes to Marrakech by the Sahara, about 1,060 km in 3 days\. <a href="[^"]*"/, '<span>Fes to Merzouga and back, about 1,000 km in 3 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Fes,Morocco&amp;destination=Fes,Morocco&amp;waypoints=Ifrane,Morocco%7CMidelt,Morocco%7CMerzouga,Morocco%7CKhamlia,Morocco%7CRissani,Morocco%7CErfoud,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations: Night 1 camp, Night 2 Merzouga hotel ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tombouctou')];
between('<div class="dt-acc-wrap"><table class="dt-acc">', '</table></div>',
`
            <thead><tr><th scope="col">Options</th><th scope="col">Night 1: Desert camp</th><th scope="col">Night 2: Merzouga hotel</th></tr></thead>
            <tbody>${['Standard', 'Midrange', 'Luxury'].map((n, i) => `<tr><th scope="row">${n}</th><td>${camp[i]}</td><td>${mzh[i]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers staying in Fes who want the Sahara',
  'Anyone flying home from Fes',
  'Families who want a slow day in the dunes',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want the Todra Gorge too? The <a href="4-day-fes-desert-tour.html">4-day Fes desert tour</a> adds a night at the gorge',
  'Going on to Marrakech? The <a href="3-day-fes-to-marrakech-desert-tour.html">3-day Fes to Marrakech tour</a> ends there',
  'Flying in to Errachidia? The <a href="3-day-errachidia-to-merzouga-desert-tour.html">3-day Errachidia tour</a> starts 2 hours from the dunes',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'fr3-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How far is Merzouga from Fes?', 'About 470 km, eight hours with stops for coffee, the cedar forest and lunch in Midelt. That is why the tour has a full day in Merzouga in the middle: you don’t spend two days in the car for one night in the dunes.'],
  ['Do we drive back the same road?', 'Mostly, because the Middle Atlas road is the only good way north. But the stops change: on the way back you see the Rissani market, the Erfoud fossil workshops and the Ziz Valley viewpoint, and you cross Ifrane and the cedars in the afternoon light.'],
  ['What do we do on the day in Merzouga?', 'Your driver takes you around Erg Chebbi by 4×4: a nomad family’s tent, Gnawa music in Khamlia, the black stone desert, old mines and the seasonal lake. Or keep it slow, with the pool and the dunes. Quads and buggies can be added.'],
  ['Can we sleep two nights in the camp?', 'Yes. The second night is in a Merzouga hotel so you get a real shower and a pool, but many guests stay in the camp both nights for a second sunset on the dunes. Tell us when you book.'],
  ['Can you pick us up at a riad in the Fes medina?', 'Yes. Cars can’t enter the medina, so your driver meets you at the nearest gate, often with someone from your riad to help with the bags. On day 3 we can also drop you at the train station or Fes airport.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A second night in the camp instead of the hotel',
  'Upgrade to a luxury camp',
  '<a href="merzouga-quad-biking.html">Quad biking</a> or a <a href="merzouga-buggy-tour.html">buggy</a> in the dunes (extra cost)',
  'A <a href="merzouga-medfouna-cooking-class.html">medfouna cooking class</a> on the desert day',
  'Drop-off at Fes airport or the train station',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="3-Day Fes to Marrakech Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%203-Day%20Fes%20to%20Marrakech%20Desert%20Tour.', 'information%20about%20the%203-Day%20Fes%20to%20Merzouga%20Desert%20Tour.', 'wa');
rep('<b>3-Day Fes to Marrakech</b><span>Free', '<b>3-Day Fes to Merzouga</b><span>Free', 'mbar');

// ---------- similar ----------
const si = s.indexOf('<ul class="htours__list dt-others__list">\n'); const sj = s.indexOf('        <li class="htours__end">', si);
s = s.slice(0, si + '<ul class="htours__list dt-others__list">\n'.length) + JSON.parse(fs.readFileSync(SP + 'fr3-similar.json', 'utf8')) + s.slice(sj);

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Fes pick-up, Ifrane and the cedar forest', 'Midelt and the Ziz Valley', 'Sunset camel ride and desert camp (night 1)', 'A day around Merzouga by 4×4: nomads, Khamlia, Erg Chebbi', 'Merzouga hotel (night 2)', 'Rissani market and Erfoud fossils', 'Ziz Valley, Ifrane and back to Fes'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
for (const bad of ['Dades', 'Todra Gorge walk', 'Aït Ben Haddou', 'Tichka', 'Taourirt', 'Valley of Roses']) if (main.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
