// Build tours/4-day-marrakech-essaouira-agadir-tour.html (URL kept): 4-day Marrakech -> Essaouira -> Taghazout -> Agadir, one way.
// Marrakech guided day (n1) -> Essaouira (n2) -> Imsouane -> Taghazout (n3) -> Paradise Valley -> Agadir Oufella -> Agadir hotel or airport.
// Derived from build-ag6.js (template = the finished 8-day Imperial Cities page). Never re-run on the finished page (it wipes later edits).
// The reverse of the 6-day Agadir -> Marrakech tour, shorter: for travellers who end their trip with beach days in Agadir or fly out of Agadir.
// Research = the same coast research as build-cc7.js / build-ag6.js (no private 4-day Marrakech -> Agadir tour on page 1; G Adventures group
// "Moroccan Coast Explorer" 5 days; Agadir airport ~25 km from the city). Old page = generic boilerplate (Day 1–2 Marrakech, Day 3 Essaouira, Day 4 Agadir).
// Expert choices: night 3 in Taghazout (not Agadir) so day 4 has Paradise Valley in the morning, then Agadir Oufella and a drop at the guest's
// Agadir beach hotel or the airport. Reviews: Maria G., Chloé D., James T.
// OSRM: essaouira (Marrakech-Essaouira) ~180 km · a18-d5 Essaouira-Imsouane-Taghazout 169 km 3.0 h · cc7-d5 Taghazout-Paradise Valley 34 km ·
// me4-d4 Paradise Valley-Agadir Oufella-Agadir.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/4-day-marrakech-essaouira-agadir-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/4-day-marrakech-essaouira-agadir-tour.html';
const NAME = '4-Day Marrakech, Essaouira & Agadir Tour';
const TITLE = '4-Day Marrakech, Essaouira & Agadir Tour | Private';
const DESC = 'Private 4-day tour from Marrakech to Agadir: a guided day in the Marrakech medina, a night in Essaouira, the coast road by Imsouane to Taghazout, then Paradise Valley and Agadir, ending at your beach hotel or the airport.';
const HERO = 'essaouira-skala-port.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="4 day Morocco tour, Marrakech to Agadir, Marrakech Essaouira Agadir tour, Taghazout, Paradise Valley, Imsouane, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Marrakech: a guided day in the medina', p: 'Your driver-guide meets you at your riad in the morning with a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Saadian Tombs, the souks and the Ben Youssef Madrasa, with no shop stops unless you ask. The evening on Jemaa el-Fnaa as the food stalls light up.', meta: m('Day on foot in the medina', 'Night: Marrakech riad', 'Breakfast from day 2') },
  { t: 'Marrakech → Essaouira', p: 'West across the argan plains to the Atlantic. The afternoon in Essaouira’s white and blue medina, on the ramparts of the Skala and at the fishing port with its blue boats, with grilled fish by the harbour if you like, and the sun setting over the ocean.', meta: m('About 180 km, about 3 hours on the road', 'Night: Essaouira', 'Breakfast') },
  { t: 'Essaouira → Imsouane → Taghazout', p: 'A last walk by the port, then south on the coast road through argan hills to Imsouane, a fishing village with one of Africa’s longest waves, for a fish lunch by the bay. On to Taghazout, the surf village, in time for the sunset on the beach.', meta: m('About 170 km, about 3 hours on the road', 'Night: Taghazout', 'Breakfast') },
  { t: 'Paradise Valley → Agadir', p: 'An early drive into the hills to Paradise Valley, a palm gorge with turquoise rock pools for a swim before the heat. Then down to Agadir, up the Oufella hill for the view over the bay, and on to your beach hotel in Agadir or to Agadir airport.', meta: [['car', 'About 90 km in the day'], ['flag', 'Ends at your Agadir hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Blue fishing boats in the port of Essaouira on the Atlantic" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>4-Day Marrakech, Essaouira &amp; Agadir</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>4-Day Marrakech, Essaouira &amp; Agadir Tour<span class="script">From the Souks to the Sea</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Marrakech$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Marrakech → Agadir</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>4 days / 3 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Four days from the souks of Marrakech to the beaches of the south. A day in the medina with a local guide, a night in Essaouira’s white and blue old town by the ocean, then the coast road by the fishing village of Imsouane to Taghazout, the surf village.</p>
          <p class="dt-lead">On the last morning, a swim in the rock pools of Paradise Valley and the view from the Agadir Oufella hill, before we leave you at your Agadir beach hotel or the airport. Your own vehicle and driver-guide all the way, with stops wherever you like.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Ends in</dt><dd>Agadir, hotel or airport</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Marrakech → Agadir$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The Marrakech medina with a local guide',
  'Jemaa el-Fnaa as the stalls light up',
  'The ramparts and blue boats of Essaouira',
  'A fish lunch in Imsouane',
  'A night in the surf village of Taghazout',
  'The rock pools of Paradise Valley',
  'The view from Agadir Oufella',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery (placeholder: no Taghazout, Paradise Valley, Imsouane or Agadir photos in assets yet) ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['marrakech-medina-arch.jpg', 'An arch in the Marrakech medina', 1600, 1260],
  ['jemaa-el-fna-dusk-stalls.jpg', 'Jemaa el-Fnaa at dusk', 1600, 1066],
  ['spice-market-pyramids.jpg', 'Spices piled high in the souk', 1600, 1066],
  ['essaouira.jpg', 'The ramparts and blue boats of Essaouira', 1080, 1350],
  ['souk-shopping.jpg', 'Browsing the souks', 1600, 1066],
  ['fleet-minivan.jpg', 'Your private vehicle', 1000, 667],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C car or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide in Marrakech',
  'Pick-up at your Marrakech riad',
  'Drop-off at your Agadir hotel or the airport',
  '3 nights as in the table below',
  '3 breakfasts',
  'Fuel, tolls and parking',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, dinners and drinks', 'Entrance fees', 'Surf lessons', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Landing in Marrakech the day before? We meet your flight',
  'The ocean wind is cool: bring a layer',
  'Strong currents: swim in the sheltered bays',
  'Paradise Valley pools are lower after a dry summer',
  'Flying out of Agadir on day 4? An afternoon flight works best',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bahia Palace:</b> 100 MAD; <b>Saadian Tombs:</b> 100 MAD',
  '<b>Ben Youssef Madrasa:</b> about 50 MAD',
  '<b>Skala du Port, Essaouira:</b> small fee',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Marrakech to Agadir by Essaouira and the coast, about 460 km in 4 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Agadir,Morocco&amp;waypoints=Essaouira,Morocco%7CImsouane,Morocco%7CTaghazout,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (same places as the other coast tours, owner to confirm) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const B = (q, n) => A('https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(q), n);
const mar = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
const ess = [A('https://www.tripadvisor.com/Hotel_Review-g298349-d1170450-Reviews-Riad_Baladin-Essaouira_Marrakech_Safi.html', 'Riad Baladin'), A('https://www.madada.com/', 'Madada Mogador'), A('https://www.tripadvisor.com/Hotel_Review-g298349-d543543-Reviews-L_Heure_Bleue_Palais-Essaouira_Marrakech_Safi.html', 'L’Heure Bleue Palais')];
const tag = [B('World of Waves Surf House Taghazout', 'World of Waves Surf House'), B('Radisson Blu Resort Taghazout Bay Surf Village', 'Radisson Blu Surf Village'), B('Fairmont Taghazout Bay', 'Fairmont Taghazout Bay')];
const row = (n, r) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`;
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${row('1: Marra&shy;kech', mar)}${row('2: Essaouira', ess)}${row('3: Taghazout', tag)}</tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'from riads in the old towns to surf lodges by the sea.', 'acc intro');
rep('Prefer another hotel or camp? Tell us when you book.', 'Prefer another hotel? Tell us when you book.', 'acc note');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers ending their trip with beach days in Agadir',
  'A short first taste of Marrakech and the coast',
  'Couples and families who like short drives',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Landing in Agadir? The <a href="6-day-morocco-tour-agadir-essaouira-marrakech.html">6-day tour</a> runs the other way, to Marrakech',
  'Want two nights in Essaouira? The <a href="7-day-coastal-morocco-tour-from-marrakech.html">7-day coastal tour</a> gives it two',
  'Want the Sahara instead? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> leaves from Marrakech',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'me4-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['We land in Marrakech the day before. Can you meet us?', 'Yes. Your driver-guide meets your flight at Marrakech airport with your name on a sign, at any hour, and takes you to your riad. Tell us your flight and we add the extra night to the plan.'],
  ['Do we see Agadir itself?', 'Yes, on the last day: the view from the Agadir Oufella hill over the bay and the port, then your beach hotel. Agadir is a modern resort city, so most guests stay on a few days for the long sandy beach.'],
  ['Why sleep in Taghazout, not Agadir?', 'Taghazout is a small surf village 20 minutes north of Agadir, with more charm and Paradise Valley close by, so the last morning has a swim before Agadir. If you prefer a big Agadir hotel for night 3, tell us.'],
  ['How long are the drives?', 'About 3 hours from Marrakech to Essaouira, about 3 hours on the coast road to Taghazout with a lunch stop in Imsouane, and short hops on the last day. Day 1 is on foot in Marrakech.'],
  ['Can we fly home from Agadir on day 4?', 'Yes. Agadir airport is about 30 minutes from the city, with flights to Europe. With an afternoon flight we keep Paradise Valley and the Oufella view; with a morning flight we drive you straight to the airport.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A surf lesson in Taghazout',
  'A second night in Essaouira',
  'A <a href="marrakech-hot-air-balloon-ride.html">sunrise balloon flight</a> before you leave Marrakech',
  'A <a href="marrakech-food-tour.html">food tour</a> on your Marrakech evening',
  'A <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%204-Day%20Marrakech%2C%20Essaouira%20and%20Agadir%20Tour.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>4-Day Marrakech to Agadir</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 4-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'me4-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'First-time visitors'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Marrakech with a guided day (night 1)', 'Essaouira (night 2)', 'Imsouane', 'Taghazout (night 3)', 'Paradise Valley', 'Agadir Oufella and Agadir'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'Fes', 'camp', 'Imperial', 'Volubilis', 'Rabat', 'Sahara Tour', 'Erg Chebbi', 'desert camp']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
