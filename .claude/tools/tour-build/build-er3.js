// Build tours/3-day-errachidia-to-merzouga-desert-tour.html from the approved 4-day Marrakech -> Fes via Merzouga page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/4-day-marrakech-to-fes-desert-tour-via-merzouga.html';
const out = root + 'tours/3-day-errachidia-to-merzouga-desert-tour.html';
// (a copy of the old page used to be kept as er3-before.html; old pages are in git history)
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

const URL = 'https://moroccotourshub.com/tours/3-day-errachidia-to-merzouga-desert-tour.html';
const NAME = '3-Day Errachidia to Merzouga Desert Tour';
const TITLE = '3-Day Errachidia to Merzouga Desert Tour | Airport Pick-up';
const DESC = 'Private 3-day desert tour from Errachidia airport: two hours to the Merzouga dunes, a full day around the Sahara by 4×4, a sunset camel ride and a night in the camp. Any flight, any hour.';
const HERO = 'merzouga-camel-orange-dusk.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Errachidia to Merzouga, Errachidia airport to Merzouga, 3-day desert tour from Errachidia, Merzouga tour, private Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/4-day-marrakech-to-fes-desert-tour-via-merzouga\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const PLANE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.5 13.5L3 11l1.5-1.5 8 1L17 6c1-1 2.5-1 3 0s0 2-1 3l-4.5 4.5 1 8L14 23l-2.5-7.5L8 19v2.5L6.5 23 5 19l-4-1.5L2.5 16H5z"/></svg>';
const DAYS = [
  { t: 'Errachidia airport → Ziz palm grove → Erfoud → Merzouga',
    p: 'Your driver-guide meets you in the arrivals hall with your name on a sign, whatever time your flight lands; we follow your flight, so a delay is no problem. South along the palm groves of the Ziz Valley and through Erfoud to Merzouga, about two hours. Dinner and a quiet night in a hotel at the edge of the dunes, so you wake up rested, right next to the Sahara.',
    meta: [['car', 'About 125 km, about 2 hours on the road'], ['bed', 'Night: Merzouga hotel'], ['food', 'Dinner & breakfast']] },
  { t: 'A full day around Merzouga, sunset camel ride and the camp',
    p: 'Sunrise from the dunes if you like, then a day around Merzouga by 4×4 at your pace: tea with a nomad family in their tent, Gnawa music in the village of Khamlia, the black stony desert and, after a wet winter, the seasonal lake of Dayet Srij. In the late afternoon, leave your big bags at the hotel, take a small bag and ride a camel into the Erg Chebbi dunes for sunset. Dinner in the camp, music around the fire and a sky full of stars.',
    meta: [['car', '4×4 tour around Merzouga'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Erfoud → Errachidia',
    p: 'Wake for sunrise on the dunes and try the sandboards, then breakfast at the camp and back by camel or 4×4. In Rissani, the old caravan town, walk through the market (busiest on Sunday, Tuesday and Thursday), then see how fossils are cut and polished in Erfoud. North along the Ziz palm groves to Errachidia: we drop you at the airport in good time for your flight, or at your hotel. Prefer to go on? We can end the tour in Fes or Marrakech instead.',
    meta: [['car', 'About 135 km, about 2.5 hours on the road'], ['flag', 'Drop-off at Errachidia airport or hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-ride-dunes\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Camels in the Erg Chebbi dunes at Merzouga at dusk" loading="eager"`, 'hero img');
rep('<span>4-Day Marrakech to Fes</span></nav>', '<span>3-Day Errachidia to Merzouga</span></nav>', 'crumb');
rep(/(aria-hidden="true"><path d="M12 21c4-4\.5 7-7\.6 7-11a7 7 0 10-14 0c0 3\.4 3 6\.5 7 11z"\/><circle cx="12" cy="10" r="2\.5"\/><\/svg>)Marrakech<\/span>/, '$1Errachidia</span>', 'chip');
rep('<h1>4-Day Marrakech to Fes Desert Tour<span class="script">With a Full Day in the Sahara</span></h1>', '<h1>3-Day Errachidia to Merzouga Desert Tour<span class="script">From the Plane to the Dunes</span></h1>', 'h1');
rep('<b>4 days / 3 nights</b>', '<b>3 days / 2 nights</b>', 'dur');
rep('<small>Route</small><b>Marrakech → Fes</b>', '<small>Start &amp; end</small><b>Errachidia</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">The quickest way into the Sahara: fly to Errachidia and you are at the Merzouga dunes about two hours later. Three days in your own car with your own driver-guide, and almost all of it spent in the desert instead of on the road.</p>
          <p class="dt-lead">A first night in a hotel by the dunes, then a whole day around Merzouga with a nomad family and the Gnawa musicians of Khamlia, a camel ride into Erg Chebbi for sunset and a night in the camp. We meet every flight, at any hour, and you can finish back at the airport or carry on to Fes or Marrakech. No groups and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Fes</dd>', '<dd>Errachidia airport</dd>', 'kf1');
rep('<dt>Desert day</dt><dd>A full day in Merzouga</dd>', '<dt>To the dunes</dt><dd>About 2 hours</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Airport pick-up for every flight, any hour',
  'The palm groves of the Ziz Valley',
  'A day around Merzouga by 4×4',
  'Tea with a nomad family in their tent',
  'Gnawa music in Khamlia',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'Rissani market and the Erfoud fossils',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['merzouga-dunes.webp', 'The Erg Chebbi dunes at Merzouga', 2240, 1260],
  ['nomad-life.jpg', 'A nomad family’s tent in the desert near Merzouga', 1200, 675],
  ['khamlia-gnawa.jpg', 'Gnawa musicians in Khamlia near Merzouga', 1600, 1066],
  ['merzouga-camel-caravan.jpg', 'A camel caravan crossing the Erg Chebbi dunes', 1600, 1066],
  ['desert-camp-aerial-circular.jpg', 'A desert camp in the dunes seen from above', 1600, 1067],
  ['rissani-market-street.jpg', 'A street in the Rissani market', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up and drop-off at Errachidia airport or hotel',
  '1 night in a Merzouga hotel',
  '1 night in a desert camp',
  '2 dinners and 2 breakfasts',
  'Camel ride and sandboarding',
  '4×4 day around Merzouga',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches and drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your flight number when you book',
  'Small bag for the camp; luggage stays at the hotel',
  'The seasonal lake only fills after a wet winter',
  'Desert nights are cold from November to February',
  'Bring cash: few card machines around Merzouga',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Free:</b> the Ziz palm groves, Khamlia and Rissani market',
  '<b>Tips:</b> up to you, also for the Gnawa musicians',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Fes by the Sahara, about 1,100 km in 4 days\. <a href="[^"]*"/, '<span>Errachidia airport to Merzouga and back, about 300 km in 3 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Errachidia+Airport,Morocco&amp;destination=Errachidia+Airport,Morocco&amp;waypoints=Erfoud,Morocco%7CMerzouga,Morocco%7CKhamlia,Morocco%7CRissani,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (2 nights: Options | Night 1 | Night 2) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tombouctou')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Options</th><th scope="col">Night 1: Merzouga hotel</th><th scope="col">Night 2: Desert camp</th></tr></thead>
            <tbody>${['Standard', 'Midrange', 'Luxury'].map((lv, i) => `<tr><th scope="row">${lv}</th><td>${mzh[i]}</td><td>${camp[i]}</td></tr>`).join('')}</tbody>
          `, 'acc');
rep('<table class="dt-acc dt-acc--4">', '<table class="dt-acc">', 'acc class');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers short on time who want real desert time',
  'Anyone flying into Errachidia from Casablanca, Rabat, Marrakech or Paris',
  'Families: short drives, nomads, music and dunes',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You want one more day in the dunes: the <a href="4-day-errachidia-to-merzouga-desert-tour.html">4-day Errachidia to Merzouga tour</a> adds a second desert day',
  'You want the gorges and kasbahs too: the <a href="5-day-errachidia-to-marrakech-desert-tour.html">5-day Errachidia to Marrakech tour</a> goes on by the Todra Gorge and Aït Ben Haddou',
  'You fly into Marrakech: the <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Marrakech to Merzouga tour</a> starts there',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'er3-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How far is Merzouga from Errachidia airport?', 'About 125 km, or around two hours by road through the Ziz palm groves and Erfoud. It is the closest airport to the Erg Chebbi dunes, which is why a short trip from here leaves so much time for the desert.'],
  ['Which flights go to Errachidia?', 'Royal Air Maroc flies from Casablanca and Rabat, Ryanair from Marrakech, and Transavia from Paris-Orly in season. Most flights land in the evening; we meet every flight, at any hour.'],
  ['What if my flight lands late at night or is delayed?', 'No problem. Your driver-guide follows your flight and waits in the arrivals hall with your name on a sign, then drives you to your hotel in Merzouga. That is why the first night is in a hotel and the camp comes on day 2.'],
  ['Can we end the tour in Fes or Marrakech instead?', 'Yes. On day 3 we can drive you on to Fes over the Middle Atlas (about 8 hours) or to Marrakech by the Todra Gorge and the High Atlas (about 9 hours). Tell us when you book.'],
  ['What is the desert camp like?', 'A private Berber tent with real beds in the Erg Chebbi dunes, with dinner and breakfast at the camp. All three camps in our table have a private bathroom in the tent; see the Accommodations section above.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'End the tour in Fes or Marrakech instead',
  'Both nights in the camp, if you land early',
  'Quad biking or a longer camel ride (extra cost)',
  'Add a day at the Todra Gorge',
  'Start or end at your hotel in Errachidia',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking ----------
rep('value="4-Day Marrakech to Fes Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%204-Day%20Marrakech%20to%20Fes%20Desert%20Tour.', 'information%20about%20the%203-Day%20Errachidia%20to%20Merzouga%20Desert%20Tour.', 'wa');
rep('<b>4-Day Marrakech to Fes</b><span>Free cancellation', '<b>3-Day Errachidia to Merzouga</b><span>Free cancellation', 'mbar');
rep('<p class="hcta__sub">The 4-day route is a starting point', '<p class="hcta__sub">The 3-day route is a starting point', 'cta');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'er3-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Travellers short on time'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Errachidia airport pick-up', 'Ziz Valley palm groves and Erfoud', 'Merzouga hotel (night 1)', 'A day around Merzouga by 4×4, Khamlia', 'Sunset camel ride and desert camp (night 2)', 'Rissani market and Erfoud fossils', 'Back to Errachidia airport'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Night 1: Dades', 'Pick-up in Marrakech', 'Taourirt', 'Fes around 19:00', '4-day route']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
