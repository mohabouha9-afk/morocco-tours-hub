// Build tours/3-day-desert-tour-rabat-merzouga-rabat.html (Rabat -> Ifrane -> Merzouga camp -> Ziz -> Midelt -> Azrou -> Meknes -> Volubilis -> Rabat)
// Template = the finished 3-day Rabat -> Marrakech page. Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/3-day-desert-tour-rabat-merzouga-marrakech.html';
const out = root + 'tours/3-day-desert-tour-rabat-merzouga-rabat.html';
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

const URL = 'https://moroccotourshub.com/tours/3-day-desert-tour-rabat-merzouga-rabat.html';
const NAME = '3-Day Rabat Desert Tour to Merzouga';
const TITLE = '3-Day Rabat Desert Tour to Merzouga & Back | Private';
const DESC = 'Private 3-day round trip from Rabat to the Sahara: a sunset camel ride and a camp in the Merzouga dunes, the Ziz Valley and Midelt, then back by the cedar forest of Azrou, Meknes and the Roman ruins of Volubilis.';
const HERO = 'merzouga-camel-caravan-guide.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Rabat desert tour, Rabat to Merzouga and back, 3-day Sahara tour from Rabat, Merzouga camp, Volubilis, Meknes, Midelt, private Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/3-day-desert-tour-rabat-merzouga-marrakech\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Rabat → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'Pick-up at your hotel or riad in Rabat around 06:30. Up onto the Middle Atlas for coffee in Ifrane, the town of red roofs and lawns, then across the high plateau to Midelt for lunch, with the snowy ridge of Jebel Ayachi behind it. South through the palm gorges of the Ziz Valley to the dunes of Erg Chebbi, where you leave your big bags in the car and ride a camel into the sand for sunset. Dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 600 km, about 9 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'Merzouga → Khamlia → Erfoud → Ziz Valley → Midelt',
    p: 'Wake up for the sunrise over the dunes and try sandboarding before breakfast, then back by camel or 4×4. A morning around Merzouga by 4×4: mint tea with a nomad family and the Gnawa musicians of Khamlia. After lunch, north past the fossil workshops of Erfoud and up the Ziz Valley, with stops above its palm gorges, to a quiet night in Midelt, the apple town of the Atlas.',
    meta: [['car', 'About 260 km, about 4.5 hours on the road'], ['bed', 'Night: Midelt'], ['food', 'Breakfast & dinner']] },
  { t: 'Midelt → Azrou → Meknes → Volubilis → Rabat',
    p: 'Over the Col du Zad to the cedar forest of Azrou, where Barbary macaques sit by the road. On to Meknes, the city of Moulay Ismail, for the great gate of Bab Mansour, Place el-Hedim and lunch in the old town. In the afternoon, a walk through Volubilis, the Roman town on the plain, with its mosaics and triumphal arch, then back to Rabat in the early evening.',
    meta: [['car', 'About 390 km, about 6.5 hours on the road'], ['flag', 'Drop-off at your hotel or riad in Rabat'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/sahara-camel-pink-sunset\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan led over the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>3-Day Rabat to Merzouga &amp; Marrakech</span></nav>', '<span>3-Day Rabat to Merzouga &amp; Back</span></nav>', 'crumb');
rep('<h1>3-Day Rabat to Merzouga Desert Tour<span class="script">From the Capital to the Dunes</span></h1>', '<h1>3-Day Rabat Desert Tour to Merzouga<span class="script">To the Sahara and Back</span></h1>', 'h1');
rep('<small>Route</small><b>Rabat → Marrakech</b>', '<small>Start &amp; end</small><b>Rabat</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Three days from Rabat to the Sahara and back. Over the Middle Atlas and down the Ziz Valley to the dunes of Erg Chebbi, for a sunset camel ride, a night in the camp and a morning with the nomads and the Gnawa musicians of Khamlia.</p>
          <p class="dt-lead">The way home is a different trip: the cedar forest of Azrou and its macaques, the imperial city of Meknes and the Roman ruins of Volubilis, before you are back in Rabat in the evening. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Rabat → Marrakech</dd>', '<dd>Rabat (round trip)</dd>', 'kf1');
rep('<dt>Desert night</dt><dd>Camp in the dunes</dd>', '<dt>Way back</dt><dd>Meknes and Volubilis</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Coffee in Ifrane, the alpine town',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'Nomad tea and Gnawa music in Khamlia',
  'The palm gorges of the Ziz Valley',
  'Barbary macaques in the Azrou cedars',
  'Bab Mansour and the old city of Meknes',
  'The Roman mosaics of Volubilis',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['merzouga-camel-ride-group.jpg', 'A camel ride over the dunes of Erg Chebbi', 1300, 866],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp in the dunes', 1600, 1067],
  ['sandboarding.jpg', 'Sandboarding down a dune at Merzouga', 1170, 1560],
  ['nomad-life.jpg', 'A nomad tent in the desert near Merzouga', 1200, 675],
  ['khamlia-gnawa.jpg', 'Gnawa musicians in the village of Khamlia', 1600, 1066],
  ['ziz-valley-plateau.jpg', 'The Ziz Valley palm groves below the plateau', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up and drop-off at your hotel in Rabat',
  '1 night in a desert camp',
  '1 night in Midelt',
  '2 dinners and 2 breakfasts',
  'Camel ride and sandboarding',
  '4×4 morning around Merzouga',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Long first day: we stop whenever you want',
  'Small bag for the camp; luggage stays in the car',
  'Volubilis has little shade: hat and water',
  'Midelt and desert nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Volubilis:</b> about 70–100 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you, also for the Gnawa musicians',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Rabat to Marrakech by the Sahara, about 1,200 km in 3 days\. <a href="[^"]*"/, '<span>Rabat to the Sahara and back, about 1,250 km in 3 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Rabat,Morocco&amp;destination=Rabat,Morocco&amp;waypoints=Ifrane,Morocco%7CMidelt,Morocco%7CMerzouga,Morocco%7CAzrou,Morocco%7CMeknes,Morocco%7CVolubilis,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (2 nights) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mid = [A('https://www.tripadvisor.com/Hotel_Review-g580098-d12912047-Reviews-Kasbah_Izoran-Midelt_Meknes_Tafilalet_Region.html', 'Kasbah Izoran'), A('https://www.tripadvisor.com/Hotel_Review-g580098-d11868377-Reviews-Villa_Pomme_d_Or-Midelt_Meknes_Tafilalet_Region.html', 'Villa Pomme d’Or'), A('https://www.tripadvisor.com/Hotel_Review-g580098-d522341-Reviews-Kasbah_Asmaa-Midelt_Meknes_Tafilalet_Region.html', 'Kasbah Asmaa')];
between('<div class="dt-acc-wrap"><table class="dt-acc">', '</table></div>',
`
            <thead><tr><th scope="col">Options</th><th scope="col">Night 1: Desert camp</th><th scope="col">Night 2: Midelt</th></tr></thead>
            <tbody>${['Standard', 'Midrange', 'Luxury'].map((n, i) => `<tr><th scope="row">${n}</th><td>${camp[i]}</td><td>${mid[i]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers based in Rabat or Casablanca',
  'Anyone who wants the desert and Volubilis in one trip',
  'Families with a long weekend to spare',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Flying out of Marrakech? The <a href="3-day-desert-tour-rabat-merzouga-marrakech.html">3-day Rabat to Marrakech tour</a> ends there',
  'Long first day worries you? Take the train to Fes for the <a href="4-day-fes-desert-tour.html">4-day Fes desert tour</a>',
  'Only want a taste of the dunes? The <a href="2-day-marrakech-to-merzouga-desert-tour.html">2-day Merzouga tour</a> starts in Marrakech',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'rr3-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is three days enough to go from Rabat to the Sahara and back?', 'Yes, with an early start. Day 1 is the long one, about nine hours with stops, so you reach the dunes for sunset. The way back is split with a night in Midelt, so days 2 and 3 are about 4.5 and 6.5 hours.'],
  ['Why come back by Meknes and Volubilis?', 'So the last day is more than a drive. Meknes has the great gate of Bab Mansour and an old town that sees few tourists; Volubilis is the best Roman site in Morocco. Both sit on the road home to Rabat.'],
  ['Do we need a guide at Volubilis?', 'Not to walk around, and your driver-guide shows you the main mosaics. Official guides wait at the entrance if you want a full tour; you pay them there.'],
  ['Can you pick us up in Casablanca?', 'Yes. Casablanca adds about an hour each way, so we start a little earlier on day 1 and drop you back in the evening on day 3.'],
  ['Is it a good trip for children?', 'Yes. The camel ride is gentle, the camp has proper beds and dinner, and the stops break up the drive. We bring child seats on request; tell us the ages when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Pick-up and drop-off in Casablanca',
  'Upgrade to a luxury camp',
  'Quad biking or a buggy in the dunes (extra cost)',
  'A night in Fes on the way back (4 days)',
  'An official guide at Volubilis',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="3-Day Rabat to Merzouga Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%203-Day%20Rabat%20to%20Merzouga%20Desert%20Tour.', 'information%20about%20the%203-Day%20Rabat%20Desert%20Tour%20to%20Merzouga.', 'wa');
rep('<b>3-Day Rabat to Merzouga</b><span>Free', '<b>3-Day Rabat Desert Tour</b><span>Free', 'mbar');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'rr3-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Rabat pick-up, Ifrane and Midelt', 'Ziz Valley', 'Sunset camel ride and desert camp (night 1)', 'Morning around Merzouga, Khamlia', 'Erfoud and Midelt (night 2)', 'Azrou cedar forest', 'Meknes and Volubilis', 'Back to Rabat'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Todra', 'Dades', 'Ben Haddou', 'Tichka', 'Capital to the Dunes']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
