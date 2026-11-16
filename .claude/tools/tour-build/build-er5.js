// Build tours/5-day-errachidia-to-marrakech-desert-tour.html (Errachidia -> Merzouga -> Todra -> Dades -> Aït Ben Haddou -> Marrakech)
// Template = the finished 4-day Errachidia page. Never re-run on the finished 5-day page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/4-day-errachidia-to-merzouga-desert-tour.html';
const out = root + 'tours/5-day-errachidia-to-marrakech-desert-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/5-day-errachidia-to-marrakech-desert-tour.html';
const NAME = '5-Day Errachidia to Marrakech Desert Tour';
const TITLE = '5-Day Errachidia to Marrakech Desert Tour | Private';
const DESC = 'Private 5-day tour from Errachidia airport to Marrakech: two nights by the Merzouga dunes with a sunset camel ride, then the Todra and Dades gorges, Skoura and a night at Aït Ben Haddou, with no long drive days.';
const HERO = 'ait-ben-haddou-village.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Errachidia to Marrakech tour, 5-day desert tour from Errachidia, Merzouga to Marrakech, Dades Gorge, Todra Gorge, Aït Ben Haddou, private Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/4-day-errachidia-to-merzouga-desert-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Errachidia airport → Ziz Valley → Erfoud → Merzouga',
    p: 'Your driver-guide waits in arrivals with your name on a sign, at whatever hour you land; we follow your flight, so a delay changes nothing. The road runs south past the palm groves of the Ziz Valley and through Erfoud, the fossil town, and the first dunes of Erg Chebbi appear two hours later. Dinner and a good night’s sleep in a hotel at the foot of the dunes.',
    meta: [['car', 'About 125 km, about 2 hours on the road'], ['bed', 'Night: Merzouga hotel'], ['food', 'Dinner & breakfast']] },
  { t: 'A day around Merzouga, sunset camel ride and the camp',
    p: 'A whole day in the desert by 4×4, at your pace: mint tea with a nomad family in their tent, the Gnawa musicians of Khamlia, the black stony plains and, after a wet winter, the lake of Dayet Srij with its birds. In the late afternoon your big bags stay in the car and you ride a camel into the dunes for sunset. Dinner in the camp, drums by the fire and the stars.',
    meta: [['car', '4×4 day around Merzouga'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Alnif → Tinghir → Todra Gorge',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. West through Rissani, the old caravan town with its big market, and along the Jebel Saghro to Alnif, where trilobite fossils come out of the hills, and the long palm grove of Tinghir. You sleep at the Todra Gorge and walk between its 300 m walls in the late afternoon, when the day visitors have left.',
    meta: [['car', 'About 220 km, about 4.5 hours on the road'], ['bed', 'Night: Todra Gorge'], ['food', 'Breakfast & dinner']] },
  { t: 'Todra Gorge → Dades Gorge → Valley of Roses → Skoura → Aït Ben Haddou',
    p: 'Up the Dades Gorge past the Monkey Fingers rocks to the hairpin bends of Tissadrine, then down the Road of a Thousand Kasbahs: the Valley of Roses at Kelaat M’Gouna and the Skoura palm grove, where Kasbah Amridil, the kasbah once printed on the 50-dirham note, is open to visit. Past Ouarzazate to Aït Ben Haddou, where you sleep beside the ksar and see it turn red at sunset.',
    meta: [['car', 'About 275 km, about 5.5 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Breakfast & dinner']] },
  { t: 'Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'An early walk up through the ksar to the old granary, before the day groups from Marrakech arrive. Then over the High Atlas by the Tizi n’Tichka pass, 2,260 m, with stops at the viewpoints and the Berber villages, and down to Marrakech in the early afternoon. We drop you at your hotel or riad, or at Marrakech airport for an evening flight.',
    meta: [['car', 'About 175 km, about 3.5 hours on the road'], ['flag', 'Drop-off at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-caravan-sunset\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The ksar of Aït Ben Haddou above the river" loading="eager"`, 'hero img');
rep('<span>4-Day Errachidia to Merzouga</span></nav>', '<span>5-Day Errachidia to Marrakech</span></nav>', 'crumb');
rep('<h1>4-Day Errachidia to Merzouga &amp; Todra Gorge<span class="script">The Dunes, the Gorge and the Oases</span></h1>', '<h1>5-Day Errachidia to Marrakech Desert Tour<span class="script">From the Dunes to the Red City</span></h1>', 'h1');
rep('<b>4 days / 3 nights</b>', '<b>5 days / 4 nights</b>', 'duration');
rep('<small>Start &amp; end</small><b>Errachidia</b>', '<small>Route</small><b>Errachidia → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Land in Errachidia and two hours later you are at the Merzouga dunes. Two nights by Erg Chebbi, one in a hotel and one in a camp, give you a full day in the desert: a nomad family, the Gnawa music of Khamlia and a camel ride into the dunes for sunset.</p>
          <p class="dt-lead">Then the road to Marrakech, taken slowly over three days: a night at the Todra Gorge, the bends of the Dades Gorge, the kasbahs of Skoura and a night beside the ksar of Aït Ben Haddou, so you see the busiest sights in their quiet hours. Your own car and driver-guide all the way, every flight met at any hour, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Errachidia airport</dd>', '<dd>Errachidia → Marrakech</dd>', 'kf1');
rep('<dt>Todra Gorge</dt><dd>A night at the gorge</dd>', '<dt>Easy pace</dt><dd>No long drive days</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Airport pick-up for every flight, any hour',
  'Sunset camel ride and a night in the dunes',
  'Tea with nomads, Gnawa music in Khamlia',
  'The Todra Gorge in the quiet hours',
  'The hairpin bends of the Dades Gorge',
  'Kasbah Amridil in the Skoura palm grove',
  'Sunset over the ksar of Aït Ben Haddou',
  'The High Atlas by the Tizi n’Tichka pass',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['sahara-camel-pink-sunset.jpg', 'A camel on the dunes under a pink sunset', 1300, 866],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp in the dunes', 1600, 1067],
  ['todra-gorge-bridge.jpg', 'The river and the cliffs of the Todra Gorge', 1600, 1066],
  ['dades-road.jpg', 'The hairpin bends of the Dades Gorge road', 1080, 1349],
  ['dades-rocks.jpg', 'An old earthen kasbah in the Dades Valley', 1170, 1461],
  ['ait-ben-haddou-terrace.jpg', 'Aït Ben Haddou seen from a terrace', 1500, 1000],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up at Errachidia airport or hotel',
  'Drop-off at your Marrakech hotel or airport',
  '1 night in a Merzouga hotel',
  '1 night in a desert camp',
  '1 night at the Todra Gorge',
  '1 night at Aït Ben Haddou',
  '4 dinners and 4 breakfasts',
  'Camel ride, sandboarding, 4×4 day',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your flight numbers when you book',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the Dades and Tichka bends',
  'Desert and mountain nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Kasbah Amridil, Skoura:</b> about 30–40 MAD',
  '<b>Taourirt Kasbah, Ouarzazate:</b> small fee, if you go in',
  '<b>Free:</b> the Todra and Dades gorges, Aït Ben Haddou and Rissani market',
  '<b>Tips:</b> up to you, also for the Gnawa musicians',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Errachidia to the Sahara and the Todra Gorge, about 550 km in 4 days\. <a href="[^"]*"/, '<span>Errachidia to Marrakech by the Sahara, about 800 km in 5 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Errachidia+Airport,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Erfoud,Morocco%7CMerzouga,Morocco%7CRissani,Morocco%7CTodra+Gorge,Morocco%7CBoumalne+Dades,Morocco%7CSkoura,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (4 nights: one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tombouctou')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const tod = JSON.parse(fs.readFileSync(SP + 'todra-hotels.json', 'utf8')).map(([u, n]) => A(u, n));
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Merzouga', mzh], ['2: Desert camp', camp], ['3: Todra Gorge', tod], ['4: Aït Ben Haddou', abh]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers flying into Errachidia and home from Marrakech',
  'Anyone who wants dunes, gorges and kasbahs without long drives',
  'Photographers: dunes at sunrise, the ksar at sunset',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You fly home from Errachidia: the <a href="4-day-errachidia-to-merzouga-desert-tour.html">4-day Errachidia to Merzouga &amp; Todra Gorge tour</a> keeps the Merzouga hotel, the camp and the Todra night, then drives back to the airport',
  'You also want the north: end in Fes instead, then the <a href="4-day-fes-to-tangier-via-chefchaouen.html">4-day Fes to Tangier tour</a> adds the Fes medina, Volubilis and two nights in Chefchaouen',
  'You land in Fes: the <a href="5-day-fes-to-marrakech-desert-tour.html">5-day Fes to Marrakech tour</a> crosses the Middle Atlas to Merzouga, then takes the same Dades and Aït Ben Haddou road to Marrakech',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'er5-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How much driving is there each day?', 'About 2 hours on day 1 and a 4×4 day around Merzouga on day 2, then about 4.5, 5.5 and 3.5 hours on days 3 to 5, with stops. The 560 km from the desert to Marrakech is split over three days.'],
  ['Can we end the tour in Fes instead of Marrakech?', 'Yes. From Merzouga the road can go north instead, through the Ziz Valley, Midelt and the cedar forests of the Middle Atlas, to Fes. We rework days 3 to 5 so you keep your time in the dunes.'],
  ['Can we go on to Chefchaouen, Tangier, Rabat or Casablanca?', 'Yes, with the same car and driver-guide. From Fes the trip can go on to Chefchaouen and Tangier; from Marrakech to Casablanca and Rabat on the coast. Tell us how many days you have and we plan it.'],
  ['Why sleep at Aït Ben Haddou and not in Ouarzazate?', 'The day groups from Marrakech reach the ksar around midday. Sleeping next to it, you see it at sunset and walk it early in the morning, when the lanes are quiet. If you prefer Ouarzazate, 30 minutes away, we can change it.'],
  ['Can you drop us at Marrakech airport on the last day?', 'Yes. We leave Aït Ben Haddou after breakfast and reach Marrakech in the early afternoon, so an evening flight works well. For an earlier flight we leave at sunrise; send us your flight time when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'End the tour in Fes instead of Marrakech',
  'Go on to Chefchaouen, Tangier, Rabat or Casablanca',
  'Sleep in Ouarzazate or the Dades Valley instead',
  'Both desert nights in the camp, if you land early',
  'Quad biking or a longer camel ride (extra cost)',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="4-Day Errachidia to Merzouga & Todra Gorge Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%204-Day%20Errachidia%20to%20Merzouga%20and%20Todra%20Gorge%20Tour.', 'information%20about%20the%205-Day%20Errachidia%20to%20Marrakech%20Desert%20Tour.', 'wa');
rep('<b>4-Day Errachidia &amp; Todra</b><span>Free cancellation', '<b>5-Day Errachidia to Marrakech</b><span>Free cancellation', 'mbar');
rep('The 4-day route is a starting point', 'The 5-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'er5-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Errachidia airport pick-up, Ziz Valley and Erfoud', 'Merzouga hotel (night 1)', 'A day around Merzouga by 4×4, Khamlia', 'Sunset camel ride and desert camp (night 2)', 'Rissani, Alnif and Tinghir', 'Todra Gorge (night 3)', 'Dades Gorge, Valley of Roses and Skoura', 'Aït Ben Haddou (night 4)', 'Tizi n’Tichka pass and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Goulmima', 'Tinejdad', 'Khorbat', '4-day', '4-Day', 'Start and end', 'back to the airport']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
