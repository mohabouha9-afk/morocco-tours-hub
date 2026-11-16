// Build tours/5-day-desert-tour-agadir-merzouga-errachidia-airport.html (Agadir -> Aït Ben Haddou -> Dades -> Todra -> Merzouga camp + hotel -> Errachidia airport)
// Template = the finished 5-day Errachidia -> Marrakech page. Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/5-day-errachidia-to-marrakech-desert-tour.html';
const out = root + 'tours/5-day-desert-tour-agadir-merzouga-errachidia-airport.html';
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

const URL = 'https://moroccotourshub.com/tours/5-day-desert-tour-agadir-merzouga-errachidia-airport.html';
const NAME = '5-Day Agadir to Merzouga Desert Tour';
const TITLE = '5-Day Agadir to Merzouga Desert Tour | Errachidia Airport';
const DESC = 'Private 5-day desert tour from Agadir: Taroudant, a night at Aït Ben Haddou, the Dades and Todra gorges and two nights by the Merzouga dunes with a sunset camel ride, then drop-off at Errachidia airport.';
const HERO = 'merzouga-camel-ride-dunes.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Agadir to Merzouga, 5-day desert tour from Agadir, Errachidia airport, Sahara desert tour from Agadir, Aït Ben Haddou, Todra Gorge, private Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/5-day-errachidia-to-marrakech-desert-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Agadir → Taroudant → Taliouine → Ouarzazate → Aït Ben Haddou',
    p: 'Pick-up at your hotel in Agadir around 07:30. Inland through the argan groves of the Souss to Taroudant and its red earth ramparts, then up into the Anti-Atlas by Taliouine, where the saffron fields flower purple in late October and November. Past Ouarzazate to Aït Ben Haddou, where you sleep beside the ksar and watch it glow at sunset.',
    meta: [['car', 'About 420 km, about 7.5 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Dinner & breakfast']] },
  { t: 'Aït Ben Haddou → Ouarzazate → Skoura → Valley of Roses → Dades Gorge',
    p: 'An early walk up through the empty lanes of the ksar to the old granary, before the day groups arrive. Past the Taourirt Kasbah in Ouarzazate to the Skoura palm grove and Kasbah Amridil, then along the Road of a Thousand Kasbahs through the Valley of Roses. An easy afternoon up the Dades Gorge, past the Monkey Fingers rocks to the hairpin bends of Tissadrine.',
    meta: [['car', 'About 180 km, about 4 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Todra Gorge → Erfoud → Merzouga',
    p: 'To the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge in the morning, before the midday groups. East along the oasis road to Erfoud and past Rissani to the dunes of Erg Chebbi. Your big bags stay in the car and you ride a camel into the sand for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 320 km, about 6.5 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. Then a whole day in the desert at your pace: mint tea with a nomad family in their tent, the Gnawa musicians of Khamlia, the black stony plains, the lake of Dayet Srij after a wet winter and the old caravan market of Rissani. A quiet evening in a hotel at the foot of the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel (or Errachidia for an early flight)'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Erfoud → Ziz Valley → Errachidia airport',
    p: 'We leave at the time your flight needs. North through Erfoud and its fossil workshops and along the palm groves of the Ziz Valley to Errachidia, where your driver-guide helps you with your bags at the airport. No long drive back to the coast: the tour ends two hours from the dunes.',
    meta: [['car', 'About 120 km, about 2 hours on the road'], ['flag', 'Drop-off at Errachidia airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/ait-ben-haddou-village\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel ride over the dunes of Erg Chebbi" loading="eager"`, 'hero img');
rep('<span>5-Day Errachidia to Marrakech</span></nav>', '<span>5-Day Agadir to Merzouga</span></nav>', 'crumb');
rep('<circle cx="12" cy="10" r="2.5"/></svg>Errachidia</span>', '<circle cx="12" cy="10" r="2.5"/></svg>Agadir</span>', 'chip');
rep('<h1>5-Day Errachidia to Marrakech Desert Tour<span class="script">From the Dunes to the Red City</span></h1>', '<h1>5-Day Agadir to Merzouga Desert Tour<span class="script">Two Nights by the Dunes</span></h1>', 'h1');
rep('<small>Route</small><b>Errachidia → Marrakech</b>', '<small>Route</small><b>Agadir → Errachidia</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">From the beaches of Agadir across the whole of the south to the Sahara: the red walls of Taroudant, the saffron villages of the Anti-Atlas, a night beside the ksar of Aït Ben Haddou, the kasbahs of Skoura and the Dades and Todra gorges, at an easy pace.</p>
          <p class="dt-lead">Then two nights by the dunes of Erg Chebbi: a sunset camel ride and a night in the camp, and a whole day around Merzouga with nomads and Gnawa music. On the last morning you fly out from Errachidia, two hours away, instead of driving ten hours back. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Errachidia → Marrakech</dd>', '<dd>Agadir → Errachidia</dd>', 'kf1');
rep('<dt>Easy pace</dt><dd>No long drive days</dd>', '<dt>Desert</dt><dd>2 nights by the dunes</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The red ramparts of Taroudant',
  'Saffron country around Taliouine',
  'Sunset over the ksar of Aït Ben Haddou',
  'Kasbahs of Skoura, the Valley of Roses',
  'The hairpin bends of the Dades Gorge',
  'A morning walk in the Todra Gorge',
  'Sunset camel ride and a night in the dunes',
  'Nomad tea and Gnawa music',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-kasbah-walk.jpg', 'Walking up through the ksar of Aït Ben Haddou', 1300, 866],
  ['dades-valley-villages.jpg', 'Earthen villages in the Dades Valley', 1500, 1000],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['merzouga-camel-caravan-guide.jpg', 'A camel caravan led over the Merzouga dunes', 1300, 866],
  ['desert-camp-dunes.jpg', 'A desert camp among the dunes of Erg Chebbi', 1600, 900],
  ['khamlia-gnawa.jpg', 'Gnawa musicians in the village of Khamlia', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up at your hotel in Agadir',
  'Drop-off at Errachidia airport',
  '1 night at Aït Ben Haddou',
  '1 night in the Dades Valley',
  '1 night in a desert camp',
  '1 night in a Merzouga hotel',
  '4 dinners and 4 breakfasts',
  'Camel ride, sandboarding, 4×4 day',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your flight time when you book',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the mountain bends',
  'Desert and mountain nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Taourirt Kasbah, Ouarzazate:</b> small fee, if you go in',
  '<b>Kasbah Amridil, Skoura:</b> about 30–40 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you, also for the Gnawa musicians',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Errachidia to Marrakech by the Sahara, about 800 km in 5 days\. <a href="[^"]*"/, '<span>Agadir to Errachidia airport by the Sahara, about 1,100 km in 5 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Agadir,Morocco&amp;destination=Errachidia+Airport,Morocco&amp;waypoints=Taroudant,Morocco%7CTaliouine,Morocco%7CAit+Ben+Haddou,Morocco%7CSkoura,Morocco%7CBoumalne+Dades,Morocco%7CTodra+Gorge,Morocco%7CErfoud,Morocco%7CMerzouga,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (4 nights: one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tombouctou')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Aït Ben Haddou', abh], ['2: Dades Valley', dad], ['3: Desert camp', camp], ['4: Merzouga', mzh]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Holidaymakers in Agadir with five days for the south',
  'Travellers who want two nights in the desert, not one',
  'Anyone who would rather fly out than drive back',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 3 days? The <a href="3-day-desert-tour-from-agadir.html">3-day Agadir tour</a> keeps Aït Ben Haddou and the camp',
  'Flying home from Marrakech? The <a href="4-day-desert-tour-agadir-merzouga-marrakech.html">4-day Agadir tour</a> ends there',
  'Long drives worry you? Fly to Errachidia: the <a href="3-day-errachidia-to-merzouga-desert-tour.html">3-day Errachidia tour</a> is 2 hours from the dunes',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'ag5-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How far is Merzouga from Agadir?', 'About 10 hours by road, so we split it over three days with nights at Aït Ben Haddou and in the Dades Valley. Day 1 is the longest, about 7.5 hours with stops; the next two are about 4 and 6.5 hours.'],
  ['Why end at Errachidia airport and not back in Agadir?', 'Errachidia is two hours from the dunes, Agadir about ten. Flying out saves you a whole day in the car. Flights go to Casablanca and Rabat, with connections home, and to Marrakech and some European cities.'],
  ['What if our flight leaves early in the morning?', 'The Royal Air Maroc flight to Casablanca leaves Errachidia early, around 06:15. Then we drive to Errachidia after the desert day and you sleep in a hotel about 10 minutes from the airport. Send us your flight time when you book.'],
  ['Why one night in the camp and one in a hotel?', 'The camp gives you the sunset, the fire and the stars; the hotel gives you a hot shower and a calm last evening before your flight. If you prefer, both nights can be in the camp.'],
  ['Can we end in Fes or Marrakech instead?', 'Yes, with the same car and driver-guide. From Merzouga, Fes is about 8 hours north through the Middle Atlas; Marrakech is about 9 hours back over the High Atlas. We can also go on to Chefchaouen, Tangier, Rabat or Casablanca.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury camp',
  'Both desert nights in the camp',
  'Quad biking or a buggy in the dunes (extra cost)',
  'End in Fes or Marrakech instead of flying',
  'Go on to Chefchaouen, Tangier, Rabat or Casablanca',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="5-Day Errachidia to Marrakech Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%205-Day%20Errachidia%20to%20Marrakech%20Desert%20Tour.', 'information%20about%20the%205-Day%20Agadir%20to%20Merzouga%20Desert%20Tour.', 'wa');
rep('<b>5-Day Errachidia to Marrakech</b><span>Free cancellation', '<b>5-Day Agadir to Merzouga</b><span>Free cancellation', 'mbar');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'ag5-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Agadir pick-up, Taroudant and Taliouine', 'Aït Ben Haddou (night 1)', 'Ouarzazate, Skoura and the Valley of Roses', 'Dades Gorge (night 2)', 'Todra Gorge and Erfoud', 'Sunset camel ride and desert camp (night 3)', 'A day around Merzouga by 4×4, Khamlia and Rissani', 'Merzouga hotel (night 4)', 'Errachidia airport drop-off'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Tichka', 'Red City', 'Marrakech hotel', 'Alnif', 'Night 3: Todra', 'from Errachidia airport to']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
