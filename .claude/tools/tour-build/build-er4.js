// Build tours/4-day-errachidia-to-merzouga-desert-tour.html (Errachidia -> Merzouga -> Todra Gorge -> Errachidia)
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/4-day-marrakech-to-fes-desert-tour-via-merzouga.html';
const out = root + 'tours/4-day-errachidia-to-merzouga-desert-tour.html';
// (a copy of the old page used to be kept as er4-before.html; old pages are in git history)
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

const URL = 'https://moroccotourshub.com/tours/4-day-errachidia-to-merzouga-desert-tour.html';
const NAME = '4-Day Errachidia to Merzouga & Todra Gorge Tour';
const TITLE = '4-Day Errachidia to Merzouga & Todra Gorge Tour | Private';
const DESC = 'Private 4-day loop from Errachidia airport: two nights by the Merzouga dunes with a sunset camel ride and a day in the Sahara, then a night at the Todra Gorge and back by the oasis road.';
const HERO = 'merzouga-caravan-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="4-day desert tour from Errachidia, Errachidia to Merzouga, Todra Gorge tour, Merzouga and Todra Gorge, Errachidia airport, private Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/4-day-marrakech-to-fes-desert-tour-via-merzouga\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Errachidia airport → Ziz palm grove → Erfoud → Merzouga',
    p: 'Your driver-guide meets you in the arrivals hall with your name on a sign, whatever time your flight lands; we follow your flight, so a delay is no problem. South along the palm groves of the Ziz Valley and through Erfoud, where the fossil workshops line the road, to Merzouga, about two hours. Dinner and a quiet night in a hotel at the edge of the dunes.',
    meta: [['car', 'About 125 km, about 2 hours on the road'], ['bed', 'Night: Merzouga hotel'], ['food', 'Dinner & breakfast']] },
  { t: 'A full day around Merzouga, sunset camel ride and the camp',
    p: 'A day around Merzouga by 4×4 at your pace: tea with a nomad family in their tent, Gnawa music in the village of Khamlia, the black stony desert and, after a wet winter, the seasonal lake of Dayet Srij. In the late afternoon, leave your big bags in the car, take a small bag and ride a camel into the Erg Chebbi dunes for sunset. Dinner in the camp, music around the fire and a sky full of stars.',
    meta: [['car', '4×4 tour around Merzouga'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Alnif → Tinghir → Todra Gorge',
    p: 'Sunrise and sandboarding on the dunes, then breakfast and back by camel or 4×4. Through the market town of Rissani (busiest on Sunday, Tuesday and Thursday) and west along the foot of the Jebel Saghro to Alnif, known for its trilobite fossils, and the Tinghir palm grove. You sleep at the Todra Gorge, so you walk between its 300 m walls in the late afternoon, when the day visitors have gone.',
    meta: [['car', 'About 220 km, about 4.5 hours on the road'], ['bed', 'Night: Todra Gorge'], ['food', 'Breakfast & dinner']] },
  { t: 'Todra Gorge → Tinejdad → Goulmima → Errachidia',
    p: 'An early walk in the gorge if you like, before the first cars arrive. Then east by the oasis road: in Tinejdad, Ksar El Khorbat, a fortified village from about 1860 that is still lived in, with a small museum of oasis life, and the old ksar town of Goulmima. We drop you at Errachidia airport in good time for your flight, or at your hotel.',
    meta: [['car', 'About 160 km, about 3 hours on the road'], ['flag', 'Drop-off at Errachidia airport or hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-ride-dunes\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan in the Erg Chebbi dunes at sunset" loading="eager"`, 'hero img');
rep('<span>4-Day Marrakech to Fes</span></nav>', '<span>4-Day Errachidia to Merzouga</span></nav>', 'crumb');
rep(/(aria-hidden="true"><path d="M12 21c4-4\.5 7-7\.6 7-11a7 7 0 10-14 0c0 3\.4 3 6\.5 7 11z"\/><circle cx="12" cy="10" r="2\.5"\/><\/svg>)Marrakech<\/span>/, '$1Errachidia</span>', 'chip');
rep('<h1>4-Day Marrakech to Fes Desert Tour<span class="script">With a Full Day in the Sahara</span></h1>', '<h1>4-Day Errachidia to Merzouga &amp; Todra Gorge<span class="script">The Dunes, the Gorge and the Oases</span></h1>', 'h1');
rep('<small>Route</small><b>Marrakech → Fes</b>', '<small>Start &amp; end</small><b>Errachidia</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Fly to Errachidia and you are at the Merzouga dunes two hours later. Two nights by Erg Chebbi, one in a hotel and one in a camp, with a whole day in the desert, a nomad family, the Gnawa musicians of Khamlia and a camel ride into the dunes for sunset.</p>
          <p class="dt-lead">Then the road turns west to the Todra Gorge, where you sleep at the foot of the cliffs and walk the gorge in the quiet hours, and comes back to the airport by the oasis villages of Tinejdad and Goulmima, never on the same road twice. Your own car, your own driver-guide, every flight met at any hour, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Fes</dd>', '<dd>Errachidia airport</dd>', 'kf1');
rep('<dt>Desert day</dt><dd>A full day in Merzouga</dd>', '<dt>Todra Gorge</dt><dd>A night at the gorge</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Airport pick-up for every flight, any hour',
  'A day around Merzouga by 4×4',
  'Gnawa music in Khamlia',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'The trilobite fossils of Alnif',
  'The Todra Gorge in the quiet hours',
  'Ksar El Khorbat and its oasis museum',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['merzouga-camel-ride-group.jpg', 'Riding camels into the Erg Chebbi dunes', 1300, 866],
  ['nomad-tent-tea.jpg', 'Mint tea in a nomad tent near Merzouga', 960, 1280],
  ['luxury-camp-night.jpg', 'A desert camp lit up at night in the dunes', 1600, 1066],
  ['sahara-camel-pink-sunset.jpg', 'A camel on the dunes under a pink sunset', 1300, 866],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['tinghir-oasis.jpg', 'The palm grove of Tinghir near the Todra Gorge', 1500, 1000],
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
  '1 night at the Todra Gorge',
  '3 dinners and 3 breakfasts',
  'Camel ride and sandboarding',
  '4×4 day around Merzouga',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your flight number when you book',
  'Small bag for the camp; luggage stays in the car',
  'The gorge walk is flat; bring shoes that can get wet',
  'Desert and gorge nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Oasis Museum, Ksar El Khorbat:</b> about 20 MAD',
  '<b>Free:</b> Khamlia, Rissani market and the Todra Gorge',
  '<b>Tips:</b> up to you, also for the Gnawa musicians',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Fes by the Sahara, about 1,100 km in 4 days\. <a href="[^"]*"/, '<span>Errachidia to the Sahara and the Todra Gorge, about 550 km in 4 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Errachidia+Airport,Morocco&amp;destination=Errachidia+Airport,Morocco&amp;waypoints=Erfoud,Morocco%7CMerzouga,Morocco%7CRissani,Morocco%7CAlnif,Morocco%7CTodra+Gorge,Morocco%7CTinejdad,Morocco%7CGoulmima,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (3 nights, 4 columns) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tombouctou')];
const tod = JSON.parse(fs.readFileSync(SP + 'todra-hotels.json', 'utf8')).map(([u, n]) => A(u, n));
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Options</th><th scope="col">Night 1: Merzouga hotel</th><th scope="col">Night 2: Desert camp</th><th scope="col">Night 3: Todra Gorge</th></tr></thead>
            <tbody>${['Standard', 'Midrange', 'Luxury'].map((lv, i) => `<tr><th scope="row">${lv}</th><td>${mzh[i]}</td><td>${camp[i]}</td><td>${tod[i]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers who want the dunes and the gorge without long drives',
  'Anyone flying in and out of Errachidia',
  'Walkers and photographers: dunes at sunrise, cliffs at sunset',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You only have 3 days: the <a href="3-day-errachidia-to-merzouga-desert-tour.html">3-day Errachidia to Merzouga tour</a> keeps the desert day and the camp',
  'You want to end in Marrakech: the <a href="5-day-errachidia-to-marrakech-desert-tour.html">5-day Errachidia to Marrakech tour</a> goes on by the Dades Valley and Aït Ben Haddou',
  'You fly into Fes: the <a href="4-day-fes-desert-tour.html">4-day Fes desert tour</a> makes a similar loop from Fes',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'er4-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Why sleep at the Todra Gorge instead of just stopping?', 'At midday the narrow part of the gorge fills with cars and day visitors. Sleeping there lets you walk it in the late afternoon and early morning, when it is quiet and the light on the cliffs is at its best.'],
  ['How long is the walk in the Todra Gorge?', 'The classic walk through the narrow part is flat and short, about 30 minutes to an hour on the riverbed. If you like walking, ask for a longer hike up through the palm groves and the villages above the gorge.'],
  ['Which flights go to Errachidia?', 'Royal Air Maroc flies from Casablanca and Rabat, Ryanair from Marrakech, and Transavia from Paris-Orly in season. Most flights land in the evening; we meet every flight, at any hour.'],
  ['What if my flight lands late at night or is delayed?', 'No problem. Your driver-guide follows your flight and waits in the arrivals hall with your name on a sign, then drives you to your hotel in Merzouga. That is why the first night is in a hotel and the camp comes on day 2.'],
  ['What is the desert camp like?', 'A private Berber tent with real beds in the Erg Chebbi dunes, with dinner and breakfast at the camp. All three camps in our table have a private bathroom in the tent; see the Accommodations section above.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'End the tour in Fes or Marrakech instead',
  'A longer hike above the Todra Gorge',
  'Quad biking or a longer camel ride (extra cost)',
  'Add the Dades Valley, one more night',
  'Both desert nights in the camp, if you land early',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking ----------
rep('value="4-Day Marrakech to Fes Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%204-Day%20Marrakech%20to%20Fes%20Desert%20Tour.', 'information%20about%20the%204-Day%20Errachidia%20to%20Merzouga%20and%20Todra%20Gorge%20Tour.', 'wa');
rep('<b>4-Day Marrakech to Fes</b><span>Free cancellation', '<b>4-Day Errachidia &amp; Todra</b><span>Free cancellation', 'mbar');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'er4-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Walkers and photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Errachidia airport pick-up, Ziz Valley and Erfoud', 'Merzouga hotel (night 1)', 'A day around Merzouga by 4×4, Khamlia', 'Sunset camel ride and desert camp (night 2)', 'Rissani, Alnif and Tinghir', 'Todra Gorge (night 3)', 'Ksar El Khorbat in Tinejdad, Goulmima, back to Errachidia'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Night 1: Dades', 'Pick-up in Marrakech', 'Taourirt', 'Fes around 19:00']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
