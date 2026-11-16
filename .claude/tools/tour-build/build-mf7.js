// Build tours/7-days-morocco-tour.html (Marrakech -> Aït Ben Haddou -> Dades Gorge -> Merzouga camp + hotel -> Midelt -> Fes)
// Template = the finished 10-day nomad experience page. Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/10-day-merzouga-desert-nomad-experience.html';
const out = root + 'tours/7-days-morocco-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/7-days-morocco-tour.html';
const NAME = '7-Day Morocco Tour from Marrakech to Fes';
const TITLE = '7-Day Morocco Tour from Marrakech to Fes | Private Itinerary';
const DESC = 'Private 7-day Morocco itinerary from Marrakech to Fes: a night at Aït Ben Haddou, the Dades and Todra gorges, two nights by the Merzouga dunes, a night in Midelt, the Middle Atlas cedar forest and a guided day in Fes.';
const HERO = 'erg-chebbi-caravan-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="7 day Morocco itinerary, 7 day Morocco tour, Marrakech to Fes tour, one week in Morocco, Sahara desert tour, Merzouga, Fes medina, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/10-day-merzouga-desert-nomad-experience\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou',
    p: 'Pick-up at your hotel or riad in Marrakech around 09:00, no early start. Up into the High Atlas by the Tizi n’Tichka pass, 2,260 m, with stops at the viewpoints and the Berber villages, and down to Aït Ben Haddou in the early afternoon. Time to walk up through the ksar to its old granary and watch it turn red at sunset from your terrace.',
    meta: [['car', 'About 190 km, about 4 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Dinner & breakfast']] },
  { t: 'Aït Ben Haddou → Ouarzazate → Skoura → Valley of Roses → Dades Gorge',
    p: 'Past the Taourirt Kasbah in Ouarzazate to the Skoura palm grove and Kasbah Amridil, then along the Road of a Thousand Kasbahs through the Valley of Roses at Kelaat M’Gouna. An easy afternoon up the Dades Gorge, past the Monkey Fingers rocks to the hairpin bends of Tissadrine.',
    meta: [['car', 'About 180 km, about 4 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Todra Gorge → Erfoud → Merzouga',
    p: 'A morning walk between the 300 m walls of the Todra Gorge, before the midday groups. East along the oasis road to Erfoud and past Rissani to the dunes of Erg Chebbi. Your big bags stay in the car and you ride a camel into the sand for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 320 km, about 6.5 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. A whole day in the desert at your pace: mint tea with a nomad family, the Gnawa musicians of Khamlia, the black stony plains, the lake of Dayet Srij after a wet winter and the market of Rissani. A hot shower and a calm night in a hotel at the foot of the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Erfoud → Ziz Valley → Midelt',
    p: 'North past the fossil workshops of Erfoud and up the Ziz Valley, with stops above its palm gorges and the old ksour along the river. Over the Tizi n’Talghemt pass to Midelt, the apple town at the foot of Jebel Ayachi, for a quiet afternoon and a night in the cool air of the Atlas.',
    meta: [['car', 'About 260 km, about 4.5 hours on the road'], ['bed', 'Night: Midelt'], ['food', 'Breakfast & dinner']] },
  { t: 'Midelt → Azrou cedar forest → Ifrane → Fes',
    p: 'Across the Middle Atlas plateau to the cedar forest of Azrou, where Barbary macaques sit by the road, and coffee in Ifrane, the alpine town of red roofs. Down to Fes in the early afternoon: check in to your riad in the medina and take a first walk to the Bab Bou Jeloud, the Blue Gate, at dusk.',
    meta: [['car', 'About 205 km, about 4 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain and woodwork museum, the coppersmiths of Place Seffarine, the Al-Attarine Madrasa and a rooftop above the Chouara tanneries. Shops only if you ask. In the evening the tour ends at your riad, or we take you to Fes airport or the train station.',
    meta: [['car', 'Day on foot in the medina'], ['flag', 'Ends at your riad, Fes airport or the train'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-caravan-sunset\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan on the Erg Chebbi dunes at sunset" loading="eager"`, 'hero img');
rep('<span>10-Day Fes to Marrakech: Nomad Experience</span></nav>', '<span>7-Day Marrakech to Fes</span></nav>', 'crumb');
rep('<circle cx="12" cy="10" r="2.5"/></svg>Fes</span>', '<circle cx="12" cy="10" r="2.5"/></svg>Marrakech</span>', 'chip');
rep('<h1>10-Day Fes to Marrakech Tour<span class="script">A Night with the Nomads</span></h1>', '<h1>7-Day Morocco Tour from Marrakech to Fes<span class="script">One Week, at an Easy Pace</span></h1>', 'h1');
rep('<b>10 days / 9 nights</b>', '<b>7 days / 6 nights</b>', 'duration');
rep('<small>Route</small><b>Fes → Marrakech</b>', '<small>Route</small><b>Marrakech → Fes</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">One week from Marrakech to Fes, with time to enjoy each place instead of racing past it. Over the High Atlas to a night beside the ksar of Aït Ben Haddou, through the kasbahs of Skoura and the Valley of Roses, and up the Dades and Todra gorges to the dunes of Erg Chebbi.</p>
          <p class="dt-lead">Two nights by the dunes, one in a camp after a sunset camel ride and one in a hotel after a whole day in the desert. Then north through the Ziz Valley, a night in Midelt and the cedar forests of the Middle Atlas to Fes, for a guided day in the oldest medina of Morocco. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Fes → Marrakech</dd>', '<dd>Marrakech → Fes</dd>', 'kf1');
rep('<dt>Nomads</dt><dd>A night in their tent</dd>', '<dt>Easy pace</dt><dd>No long drive days</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The High Atlas by the Tizi n’Tichka pass',
  'Sunset over the ksar of Aït Ben Haddou',
  'The hairpin bends of the Dades Gorge',
  'A morning walk in the Todra Gorge',
  'Sunset camel ride and a night in the dunes',
  'A full day around Merzouga by 4×4',
  'The palm gorges of the Ziz Valley',
  'Barbary macaques in the cedar forest',
  'A guided day in the Fes medina',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-kasbah.jpg', 'The earthen kasbahs of Aït Ben Haddou', 1600, 1066],
  ['dades-valley-red-green.jpg', 'Red cliffs and green fields in the Dades Valley', 1300, 867],
  ['todra-gorge-bridge.jpg', 'The river and the cliffs of the Todra Gorge', 1600, 1066],
  ['merzouga-white-camel.jpg', 'A white camel on the Merzouga dunes', 1600, 900],
  ['desert-camp-aerial-circular.jpg', 'A desert camp in the dunes seen from above', 1600, 1067],
  ['fes-medina.jpg', 'A lane in the medina of Fes', 1170, 1560],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide for the Fes medina',
  'Pick-up in Marrakech, drop-off in Fes',
  '6 nights as in the table below',
  '6 breakfasts and 5 dinners',
  'Camel ride and sandboarding',
  '4×4 day around Merzouga',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the mountain bends',
  'Desert and Atlas nights are cold in winter',
  'Fes medina: comfortable shoes, it is all on foot',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Kasbah Amridil, Skoura:</b> about 30–40 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Al-Attarine Madrasa, Fes:</b> about 20 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Fes to Marrakech by the Sahara, about 1,300 km in 10 days\. <a href="[^"]*"/, '<span>Marrakech to Fes by the Sahara, about 1,200 km in 7 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Fes,Morocco&amp;waypoints=Ait+Ben+Haddou,Morocco%7CSkoura,Morocco%7CBoumalne+Dades,Morocco%7CTodra+Gorge,Morocco%7CMerzouga,Morocco%7CMidelt,Morocco%7CIfrane,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tombouctou')];
const mid = [A('https://www.tripadvisor.com/Hotel_Review-g580098-d12912047-Reviews-Kasbah_Izoran-Midelt_Meknes_Tafilalet_Region.html', 'Kasbah Izoran'), A('https://www.tripadvisor.com/Hotel_Review-g580098-d11868377-Reviews-Villa_Pomme_d_Or-Midelt_Meknes_Tafilalet_Region.html', 'Villa Pomme d’Or'), A('https://www.tripadvisor.com/Hotel_Review-g580098-d522341-Reviews-Kasbah_Asmaa-Midelt_Meknes_Tafilalet_Region.html', 'Kasbah Asmaa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Aït Ben Haddou', abh], ['2: Dades Valley', dad], ['3: Desert camp', camp], ['4: Merzouga', mzh], ['5: Midelt', mid], ['6: Fes', fes]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'First-timers with one week in Morocco',
  'Couples and families who want an easy pace',
  'Travellers flying into Marrakech and out of Fes',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 5 days? The <a href="5-day-marrakech-to-fes-sahara-desert-tour.html">5-day Marrakech to Fes tour</a> keeps the camp and the Fes day',
  'Flying home from Marrakech? The <a href="7-day-marrakech-erg-chigaga-merzouga-tour.html">7-day Erg Chigaga &amp; Merzouga tour</a> loops back there',
  'Want Chefchaouen too? The <a href="10-day-morocco-tour-marrakech-to-tangier.html">10-day Marrakech to Tangier tour</a> goes north',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'mf7-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How much driving is there each day?', 'About 4 hours on days 1 and 2, 6.5 hours on day 3, a 4×4 day in the desert on day 4, then about 4.5 and 4 hours on days 5 and 6, with stops. No day starts before breakfast and no day is a marathon.'],
  ['Why a night in Midelt instead of driving straight to Fes?', 'Merzouga to Fes is about 470 km in one go. Stopping in Midelt splits it into two easy halves, so you arrive in Fes in the early afternoon, rested, with time for a first walk in the medina.'],
  ['What do we see in Fes?', 'A full day on foot with a local guide: the Bou Inania and Al-Attarine madrasas, the Nejjarine fountain, the coppersmiths of Place Seffarine and the Chouara tanneries from a rooftop. The route can be shaped around what you like.'],
  ['Will we be taken to shops in the medina?', 'Only if you ask. The tanneries are seen from a leather shop’s terrace, which is free; you may look inside, but nobody expects you to buy.'],
  ['Can the tour end at Fes airport or the train station?', 'Yes. On day 7 we take you to Fes airport or the train after the medina day, or the next morning if you keep your riad one more night.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A <a href="marrakech-medina-guided-tour.html">Marrakech medina tour</a> before you leave',
  'Upgrade to a luxury camp',
  'Quad biking or a buggy in the dunes (extra cost)',
  'The Cirque de Jaffar by 4×4 near Midelt',
  'Volubilis and Meknes, or Chefchaouen, after Fes',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="10-Day Fes to Marrakech Tour with a Nomad Experience" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%2010-Day%20Fes%20to%20Marrakech%20Nomad%20Experience%20Tour.', 'information%20about%20the%207-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Fes.', 'wa');
rep('<b>10-Day Fes to Marrakech</b><span>Free', '<b>7-Day Marrakech to Fes</b><span>Free', 'mbar');
rep('The 10-day route is a starting point', 'The 7-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'mf7-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tizi n’Tichka pass', 'Aït Ben Haddou (night 1)', 'Skoura and the Valley of Roses', 'Dades Gorge (night 2)', 'Todra Gorge', 'Sunset camel ride and desert camp (night 3)', 'A day around Merzouga by 4×4 (night 4)', 'Ziz Valley and Midelt (night 5)', 'Azrou cedar forest and Ifrane', 'Guided day in the Fes medina'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['nomad family’s', 'Nomad family tent', 'Imlil', 'A Night with the Nomads']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
