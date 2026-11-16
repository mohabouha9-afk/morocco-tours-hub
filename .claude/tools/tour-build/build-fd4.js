// Build tours/4-day-fes-desert-tour.html from the approved 4-day Marrakech -> Fes via Merzouga page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/4-day-marrakech-to-fes-desert-tour-via-merzouga.html';
const out = root + 'tours/4-day-fes-desert-tour.html';
// (a copy of the old page used to be kept as fd4-before.html; old pages are in git history)
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

const URL = 'https://moroccotourshub.com/tours/4-day-fes-desert-tour.html';
const NAME = '4-Day Fes Desert Tour';
const TITLE = '4-Day Fes Desert Tour to Merzouga & Back | Private Sahara Trip';
const DESC = 'Private 4-day desert tour from Fes and back: the Middle Atlas cedar forest, a sunset camel ride and a night in the Merzouga dunes, a full day in the Sahara, the Todra Gorge, then back to Fes.';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="4-day Fes desert tour, Fes to Merzouga, desert tour from Fes, Sahara tour from Fes, Fes Merzouga Fes, private Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/4-day-marrakech-to-fes-desert-tour-via-merzouga\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, '$1https://moroccotourshub.com/assets/images/merzouga-white-camel.jpg"', 'ogimg');

// ---------- data ----------
const DAYS = [
  { t: 'Fes → Ifrane → Cedar forest → Midelt → Ziz Valley → Merzouga',
    p: 'Pick-up at 07:30 at your hotel, or at the nearest gate if your riad is in the medina. Over the Middle Atlas to Ifrane and its Alpine-style houses, then the cedar forest near Azrou, home to Barbary macaques (please don’t feed them). Lunch in Midelt, then the palm-filled gorges of the Ziz Valley down to Merzouga. A camel takes you into the Erg Chebbi dunes for sunset; dinner in the camp, music around the fire and a sky full of stars.',
    meta: [['car', 'About 465 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'A full day around Merzouga',
    p: 'Wake early for sunrise over the dunes and try the sandboards before breakfast. Then a day around Merzouga by 4×4, at your pace: tea with a nomad family in their tent, Gnawa music in the village of Khamlia, the black stony desert and, after a wet winter, the seasonal lake. Free time on the dunes in the late afternoon, then the night is yours to choose: a hotel at the edge of the dunes, or a second night in the camp.',
    meta: [['car', '4×4 tour around Merzouga'], ['bed', 'Night: Merzouga hotel or camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Erfoud → Todra Gorge',
    p: 'A short driving day. In Rissani, the old caravan town, walk through the market (busiest on Sunday, Tuesday and Thursday), then see how fossils are cut and polished in Erfoud. West across the desert to the Tinghir palm grove and the Todra Gorge: walk on the flat riverbed between rock walls about 300 m high, in the quiet of the late afternoon. Dinner and night at the gorge.',
    meta: [['car', 'About 220 km, about 4 hours on the road'], ['bed', 'Night: Todra Gorge'], ['food', 'Breakfast & dinner']] },
  { t: 'Todra Gorge → Errachidia → Midelt → Ifrane → Fes',
    p: 'After breakfast, east along the foot of the High Atlas to Errachidia, then north over the Middle Atlas: lunch in Midelt, a last coffee in Ifrane and down to Fes. The road back is different from day 1 until Errachidia. Your driver-guide leaves you at your hotel or riad in Fes around 19:00, or at the train station or airport.',
    meta: [['car', 'About 490 km, 8 to 9 hours on the road'], ['flag', 'Back in Fes around 19:00'], ['food', 'Breakfast']] },
];
const ICON = {
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 13l1.5-4.5A2 2 0 017.4 7h9.2a2 2 0 011.9 1.5L20 13M4 13h16M4 13v4h2v-1.5h12V17h2v-4"/><circle cx="7.5" cy="15.5" r="1"/><circle cx="16.5" cy="15.5" r="1"/></svg>',
  camel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 20v-6l2-3h2l2 2 2-4h2l2 4 2-2 1.5 1.5L21 9"/><path d="M6 14v6M17 14v6"/></svg>',
  bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18V8M3 13h18v5M21 18v-5a3 3 0 00-3-3h-7v3"/><circle cx="7" cy="10.5" r="1.5"/></svg>',
  food: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3v8M4.5 3v5a2.5 2.5 0 005 0V3M7 11v10M16.5 3c-1.4 0-2.2 2-2.2 4.5S15 11 16.5 11v10"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/></svg>',
};
const TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>';
const INFO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/></svg>';
const COIN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.5-1-1.4-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1.1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1.1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5"/></svg>';
const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
const li = (ic, t) => `<li>${ic}<span>${t}</span></li>`;

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-ride-dunes\.jpg" alt="[^"]*" loading="eager"/, '<img src="/assets/images/merzouga-white-camel.jpg" alt="A white camel in the Erg Chebbi dunes at Merzouga" loading="eager"', 'hero img');
rep('<span>4-Day Marrakech to Fes</span></nav>', '<span>4-Day Fes Desert Tour</span></nav>', 'crumb');
rep(/aria-hidden="true"><path d="M12 21c4-4\.5 7-7\.6 7-11a7 7 0 10-14 0c0 3\.4 3 6\.5 7 11z"\/><circle cx="12" cy="10" r="2\.5"\/><\/svg>Marrakech<\/span>/, 'aria-hidden="true"><path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>Fes</span>', 'chip');
rep('<h1>4-Day Marrakech to Fes Desert Tour<span class="script">With a Full Day in the Sahara</span></h1>', '<h1>4-Day Fes Desert Tour<span class="script">To the Sahara and Back to Fes</span></h1>', 'h1');
rep('<small>Route</small><b>Marrakech → Fes</b>', '<small>Start &amp; end</small><b>Fes</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Four days from Fes to the Sahara and back, in your own car with your own driver-guide. Over the Middle Atlas cedar forests and down the palm gorges of the Ziz Valley, a camel takes you into the Erg Chebbi dunes for sunset and a night in the camp.</p>
          <p class="dt-lead">Then a whole day in the desert with a nomad family and the Gnawa musicians of Khamlia, and the way home goes by the Todra Gorge, so you don’t simply drive back the way you came. You end where you started: at your riad in Fes. Because the tour is private, you stop when you want, eat where you like and never stop at a shop you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Fes</dd>', '<dd>Fes (round trip)</dd>', 'kf1');
rep('<dt>Desert day</dt><dd>A full day in Merzouga</dd>', '<dt>Desert day</dt><dd>A full day in Merzouga</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Ifrane and the Middle Atlas cedar forest',
  'Barbary macaques among the cedars',
  'The palm gorges of the Ziz Valley',
  'Sunset camel ride and a night in the dunes',
  'A day around Merzouga by 4×4',
  'Gnawa music in Khamlia',
  'Rissani market and the Erfoud fossils',
  'The Todra Gorge, walls about 300 m high',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ziz-valley-plateau.jpg', 'The palm gorges of the Ziz Valley', 1600, 1066],
  ['merzouga-camel-caravan-guide.jpg', 'A camel caravan led into the Erg Chebbi dunes', 1300, 866],
  ['sahara-camp-night.webp', 'A desert camp in the dunes at night', 2240, 1260],
  ['rissani-spice-market.jpg', 'Spices at the market in Rissani', 1600, 1066],
  ['tinghir-oasis-kasbahs.jpg', 'Kasbahs and palms in the Tinghir oasis near the Todra Gorge', 1300, 867],
  ['todra-gorge-bridge.jpg', 'The Todra Gorge between high rock walls', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up and drop-off in Fes',
  '1 night in a desert camp',
  '1 night in Merzouga (hotel or camp)',
  '1 night at the Todra Gorge',
  '3 dinners and 3 breakfasts',
  'Camel ride and sandboarding',
  '4×4 day around Merzouga',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Tips', 'Travel insurance', 'Quad biking (on request)'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the mountain bends',
  'The seasonal lake only fills after a wet winter',
  'Winter nights are cold, and Ifrane can get snow',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Free:</b> the cedar forest, Ifrane, Rissani market and the Todra Gorge',
  '<b>Tips:</b> up to you, also for the Gnawa musicians',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Fes by the Sahara, about 1,100 km in 4 days\. <a href="[^"]*"/, '<span>Fes to the Sahara and back, about 1,200 km in 4 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Fes,Morocco&amp;destination=Fes,Morocco&amp;waypoints=Ifrane,Morocco%7CMidelt,Morocco%7CMerzouga,Morocco%7CRissani,Morocco%7CTodra+Gorge,Morocco%7CErrachidia,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tombouctou')];
const TODRA = JSON.parse(fs.readFileSync(SP + 'todra-hotels.json', 'utf8')); // [[url,name] x3], from research
const tod = TODRA.map(([u, n]) => A(u, n));
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Options</th><th scope="col">Night 1: Desert camp</th><th scope="col">Night 2: Merzouga</th><th scope="col">Night 3: Todra Gorge</th></tr></thead>
            <tbody>${['Standard', 'Midrange', 'Luxury'].map((lv, i) => `<tr><th scope="row">${lv}</th><td>${camp[i]}</td><td>${mzh[i]}<br><small>or the camp again</small></td><td>${tod[i]}</td></tr>`).join('')}</tbody>
          `, 'acc');
rep('<p class="dt-acc__note">Or similar, depending on availability. Prefer another hotel or camp? Tell us when you book.</p>', '<p class="dt-acc__note">Or similar, depending on availability. Night 2 is your choice: a hotel at the edge of the dunes, or a second night in the camp. Tell us when you book.</p>', 'accnote');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers staying in Fes who want to see the Sahara',
  'Anyone flying in and out of Fes',
  'Families: nomads, music and dunes at an easy pace',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You only have 3 days: the <a href="3-day-marrakech-to-fes-desert-tour.html">3-day Marrakech to Fes tour</a> crosses the Sahara in one go, if you can start in Marrakech',
  'You want more of the south: the <a href="5-day-fes-to-marrakech-desert-tour.html">5-day Fes to Marrakech tour</a> adds the Dades Valley and a night at Aït Ben Haddou',
  'You don’t need to come back to Fes: the <a href="4-day-fes-to-marrakech-desert-tour.html">4-day Fes to Marrakech tour</a> ends in Marrakech',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews: Lukas M., Chloé D., Aisha K. (check text in reviews.html) ----------
const REV = JSON.parse(fs.readFileSync(SP + 'fd4-reviews.json', 'utf8'));
between('<div class="dt-revs">', '</div>\n        </section>', REV, 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How far is Merzouga from Fes?', 'About 465 km, or around 8 hours with stops, over the Middle Atlas and down the Ziz Valley. That is why this tour gives the desert two nights and a full day, and comes home by the Todra Gorge instead of rushing straight back.'],
  ['Why come back to Fes instead of ending in Marrakech?', 'It suits travellers who fly in and out of Fes, keep their riad in Fes, or go on to Chefchaouen and the north. If your trip continues to Marrakech, the 4-day Fes to Marrakech tour is the better choice.'],
  ['Do we drive back on the same road?', 'Only the last part. Day 3 goes west through Rissani and Erfoud to the Todra Gorge, and day 4 runs along the foot of the High Atlas before joining the Middle Atlas road at Errachidia. With a 4×4, outside winter, you can come back by the mountain road through Aït Hani instead.'],
  ['Hotel or camp on the second night?', 'Your choice. A hotel at the edge of the dunes gives you a hot shower and a pool in summer; a second night in the camp gives you another sunset and the stars. Tell us when you book.'],
  ['Can we be picked up at our riad in the Fes medina?', 'Cars can’t enter the old medina, so your driver-guide meets you at the nearest gate, Bab Bou Jeloud or another one close to your riad. Ask your riad to walk you there; we confirm the exact place and time on WhatsApp.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Come back by the Aït Hani mountain road (4×4, not in winter)',
  'Quad biking or a longer camel ride on the desert day (extra cost)',
  'Split day 4 with a night in Ifrane',
  'Go on to Chefchaouen (<a href="3-day-fes-chefchaouen-volubilis-tour.html">3-day Fes, Chefchaouen &amp; Volubilis</a>)',
  'Add a guided day in the Fes medina',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking ----------
rep('value="4-Day Marrakech to Fes Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%204-Day%20Marrakech%20to%20Fes%20Desert%20Tour.', 'information%20about%20the%204-Day%20Fes%20Desert%20Tour.', 'wa');
rep('<b>4-Day Marrakech to Fes</b><span>Free cancellation', '<b>4-Day Fes Desert Tour</b><span>Free cancellation', 'mbar');

// ---------- similar tours ----------
const SIM = JSON.parse(fs.readFileSync(SP + 'fd4-similar.json', 'utf8')); // html of 3 <li> cards
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', SIM, 'similar');

// ---------- map: empty placeholder, route-map.mjs fills it ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: '4-Day Fes Desert Tour to Merzouga and Back', description: DESC, image: 'https://moroccotourshub.com/assets/images/merzouga-white-camel.jpg', url: URL, touristType: ['Couples', 'Families', 'Friends', 'Travellers staying in Fes'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Fes, Ifrane and the Middle Atlas cedar forest', 'Ziz Valley', 'Merzouga, camel ride and desert camp (night 1)', 'A day around Merzouga by 4×4, Khamlia (night 2)', 'Rissani and Erfoud', 'Todra Gorge (night 3)', 'Errachidia, Midelt and Ifrane, back to Fes'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

// leftovers check
for (const bad of ['Marrakech to Fes Desert Tour via Merzouga<', 'Night 1: Dades', 'Pick-up in Marrakech', 'Taourirt']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
