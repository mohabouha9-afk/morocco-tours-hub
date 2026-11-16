// Build tours/4-day-desert-tour-agadir-merzouga-marrakech.html (Agadir -> Ouarzazate -> Draa -> Merzouga -> Todra -> Dades -> Aït Ben Haddou -> Marrakech). Template = the approved 4-day Marrakech->Fes page. Never re-run on the finished page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/4-day-marrakech-to-fes-desert-tour-via-merzouga.html';
const out = root + 'tours/4-day-desert-tour-agadir-merzouga-marrakech.html';
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
const URL = 'https://moroccotourshub.com/tours/4-day-desert-tour-agadir-merzouga-marrakech.html';
const NAME = '4-Day Desert Tour from Agadir to Merzouga & Marrakech';
const TITLE = '4-Day Agadir to Merzouga Desert Tour | Ends in Marrakech';
const DESC = 'Private 4-day Sahara tour from Agadir: Taroudant and Taliouine to Ouarzazate, the Draa Valley to the Merzouga dunes and a camp night, then the Todra and Dades gorges and Aït Ben Haddou to Marrakech.';
const HERO = 'merzouga-camel-ride-group.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="4-day desert tour from Agadir, Agadir to Merzouga, Agadir desert tour, Sahara tour from Agadir, Agadir to Marrakech via the desert, private Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/4-day-marrakech-to-fes-desert-tour-via-merzouga\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Agadir → Taroudant → Taliouine → Ouarzazate',
    p: 'Pick-up at your hotel in Agadir around 08:00. Inland through the argan groves of the Souss Valley to Taroudant and a short walk by its red ramparts, then up into the Anti-Atlas to Taliouine, the saffron country, purple with flowers in late October and November. Ouarzazate in the afternoon, with time to walk into the Taourirt Kasbah before dinner if you like.',
    meta: [['car', 'About 390 km, about 6.5 hours on the road'], ['bed', 'Night: Ouarzazate'], ['food', 'Dinner & breakfast']] },
  { t: 'Ouarzazate → Agdz → Draa Valley → N’Kob → Merzouga',
    p: 'South over the Tizi n’Tinifift pass to Agdz and the long palm groves of the Draa Valley, then east by the quiet desert road through N’Kob, the village of forty-five kasbahs, and Alnif. The dunes of Erg Chebbi appear in the afternoon: leave your big bags in the car and ride a camel into the sand for sunset. Dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 365 km, about 6.5 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Erfoud → Todra Gorge → Dades Valley',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. Through Rissani, the old caravan town, and Erfoud with its fossil workshops, to the palm grove of Tinghir and a walk between the 300 m walls of the Todra Gorge. On to the Dades Valley for a quiet evening among the red cliffs.',
    meta: [['car', 'About 270 km, about 5 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Breakfast & dinner']] },
  { t: 'Dades → Valley of Roses → Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'Down the Road of a Thousand Kasbahs, through the Valley of Roses and the Skoura palm grove, to Aït Ben Haddou and a walk up through the ksar to its old granary. Then over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to Marrakech in the late afternoon, at your hotel or riad.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['flag', 'Drop-off at your Marrakech hotel or riad'], ['food', 'Breakfast']] },
];

rep(/<img src="\/assets\/images\/merzouga-camel-ride-dunes\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Riding camels into the Erg Chebbi dunes" loading="eager"`, 'hero img');
rep('<span>4-Day Marrakech to Fes</span></nav>', '<span>4-Day Agadir to Merzouga &amp; Marrakech</span></nav>', 'crumb');
rep(/(aria-hidden="true"><path d="M12 21c4-4\.5 7-7\.6 7-11a7 7 0 10-14 0c0 3\.4 3 6\.5 7 11z"\/><circle cx="12" cy="10" r="2\.5"\/><\/svg>)Marrakech<\/span>/, '$1Agadir</span>', 'chip');
rep('<h1>4-Day Marrakech to Fes Desert Tour<span class="script">With a Full Day in the Sahara</span></h1>', '<h1>4-Day Agadir to Merzouga Desert Tour<span class="script">Out by the Draa, Back by the Gorges</span></h1>', 'h1');
rep('<small>Route</small><b>Marrakech → Fes</b>', '<small>Route</small><b>Agadir → Marrakech</b>', 'hero route');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">From the beaches of Agadir to the dunes of the Sahara and on to Marrakech, without ever driving the same road twice. Out through the saffron villages of the Anti-Atlas and the palm groves of the Draa Valley, back through the Todra and Dades gorges and the kasbahs of the south.</p>
          <p class="dt-lead">A sunset camel ride and a night in a camp in the Erg Chebbi dunes, Aït Ben Haddou on the last morning, and days of five to seven hours on the road with plenty of stops. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Fes</dd>', '<dd>Agadir → Marrakech</dd>', 'kf1');
rep('<dt>Desert day</dt><dd>A full day in Merzouga</dd>', '<dt>Desert night</dt><dd>Camp in the dunes</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Taroudant and the saffron of Taliouine',
  'The Taourirt Kasbah in Ouarzazate',
  'The Draa Valley and the kasbahs of N’Kob',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'A walk in the Todra Gorge',
  'An evening in the Dades Valley',
  'Aït Ben Haddou and the Tizi n’Tichka pass',
].map(t => li(TICK, t)).join(''), 'highlights');

between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ouarzazate-taourirt.jpg', 'The Taourirt Kasbah in Ouarzazate', 1600, 1066],
  ['camel-dune-ridge.jpg', 'Camels on a dune ridge in Erg Chebbi', 1170, 780],
  ['luxury-camp-night.jpg', 'A desert camp lit up at night in the dunes', 1600, 1066],
  ['todra-gorge-bridge.jpg', 'The river and the cliffs of the Todra Gorge', 1600, 1066],
  ['dades-valley-villages.jpg', 'Villages and fields in the Dades Valley', 1500, 1000],
  ['ait-ben-haddou-kasbah.jpg', 'The ksar of Aït Ben Haddou', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up at your hotel in Agadir',
  'Drop-off at your hotel or riad in Marrakech',
  '1 night in Ouarzazate',
  '1 night in a desert camp',
  '1 night in the Dades Valley',
  '3 dinners and 3 breakfasts',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the mountain bends',
  'Desert and mountain nights are cold in winter',
  'Saffron flowers late October to November',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Taourirt Kasbah, Ouarzazate:</b> small fee, if you go in',
  '<b>Free:</b> the Taroudant ramparts, the Todra Gorge and Aït Ben Haddou',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Fes by the Sahara, about 1,100 km in 4 days\. <a href="[^"]*"/, '<span>Agadir to Marrakech by the Sahara, about 1,350 km in 4 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Agadir,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Taroudant,Morocco%7COuarzazate,Morocco%7CNkob,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CBoumalne+Dades,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const ouz = [A('https://www.tripadvisor.com/Hotel_Review-g16828469-d1491727-Reviews-Dar_Chamaa-Tabounte_Souss_Massa.html', 'Dar Chamaa'), A('https://www.tripadvisor.com/Hotel_Review-g304018-d505636-Reviews-Kenzi_Azghor_Hotel-Ouarzazate_Draa_Tafilalet.html', 'Kenzi Azghor Hotel'), A('https://www.tripadvisor.com/Hotel_Review-g304018-d480998-Reviews-Le_Berbere_Palace-Ouarzazate_Draa_Tafilalet.html', 'Le Berbère Palace')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const dad = [A('https://www.tripadvisor.com/Hotel_Review-g1025050-d17423481-Reviews-Riad_Rihana-Boumalne_Dades_Souss_Massa.html', 'Riad Rihana'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d9706744-Reviews-Citadelle_Gorges-Boumalne_Dades_Souss_Massa.html', 'Citadelle Gorges'), A('https://www.tripadvisor.com/Hotel_Review-g1025050-d1021449-Reviews-Hotel_Xaluca_Dades-Boumalne_Dades_Souss_Massa.html', 'Hotel Xaluca Dades')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Options</th><th scope="col">Night 1: Ouarzazate</th><th scope="col">Night 2: Desert camp</th><th scope="col">Night 3: Dades Valley</th></tr></thead>
            <tbody>${['Standard', 'Midrange', 'Luxury'].map((lv, i) => `<tr><th scope="row">${lv}</th><td>${ouz[i]}</td><td>${camp[i]}</td><td>${dad[i]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Holidaymakers in Agadir with four days to spare',
  'Travellers moving on from the coast to Marrakech',
  'First-timers who want dunes, gorges and kasbahs at an easy pace',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 3 days? The <a href="3-day-desert-tour-from-agadir.html">3-day Agadir tour</a> covers the same dunes',
  'Want more desert time? The <a href="5-day-desert-tour-agadir-merzouga-errachidia-airport.html">5-day Agadir tour</a> adds a day in Merzouga',
  'Just want a taste of the desert? Our <a href="marrakech-agafay-desert-day-trip.html">Agafay day trip</a> is 40 minutes from Marrakech',
].map(t => li(INFO, t)).join(''), 'think');

between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'ag4-reviews.json', 'utf8')), 'reviews');

const FAQ = [
  ['How long is each day on the road?', 'About 390 km on day 1, 365 km on day 2, 270 km on day 3 and 320 km on day 4: five to seven hours a day with stops for photos, coffee and lunch. Agadir to Merzouga is about 10 hours by road, so splitting it keeps every day easy.'],
  ['Why out by the Draa Valley and back by the gorges?', 'So you never drive the same road twice. The southern road by the Draa palm groves and N’Kob is quiet and leads you straight to the dunes; the way back takes in the Todra and Dades gorges and Aït Ben Haddou.'],
  ['Can the tour end back in Agadir?', 'Marrakech is about 3 hours from Agadir by motorway, so we can drive you back the next day. Or we turn the route into a 5-day trip that ends on the coast; tell us when you book.'],
  ['What do we do in Ouarzazate on the first evening?', 'You arrive in the afternoon, in time to walk into the Taourirt Kasbah, the old home of the Glaoui family, or to see the outside of the Atlas film studios. Or simply rest by the pool after the drive.'],
  ['When is the best time to go?', 'Spring (March to May) and autumn (September to November) are the most pleasant. Summer days in the desert pass 40 °C, so we start early; winter nights in the camp and the mountains are cold, and blankets are provided.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Quad biking in the Merzouga dunes (extra cost)',
  'Upgrade to a luxury desert camp',
  'A short hike in the Dades Gorge',
  'Drive back to Agadir the next day',
  'A <a href="marrakech-medina-guided-tour.html">medina tour</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

rep('value="4-Day Marrakech to Fes Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%204-Day%20Marrakech%20to%20Fes%20Desert%20Tour.', 'information%20about%20the%204-Day%20Desert%20Tour%20from%20Agadir.', 'wa');
rep('<b>4-Day Marrakech to Fes</b><span>Free cancellation', '<b>4-Day Agadir to Merzouga</b><span>Free cancellation', 'mbar');

between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'ag4-similar.json', 'utf8')), 'similar');

const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Holidaymakers in Agadir'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Agadir hotel pick-up', 'Taroudant and Taliouine', 'Ouarzazate (night 1)', 'Draa Valley and N’Kob', 'Sunset camel ride and Merzouga desert camp (night 2)', 'Rissani, Erfoud and the Todra Gorge', 'Dades Valley (night 3)', 'Valley of Roses and Aït Ben Haddou', 'Tizi n’Tichka pass and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Khamlia', 'Merzouga hotel', 'Ifrane', 'Fes', 'Night 3: Merzouga']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
