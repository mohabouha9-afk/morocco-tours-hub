// Build tours/18-day-atlantic-morocco-tour-marrakech-to-dakhla.html (URL kept): 18-day Marrakech -> Dakhla down the Atlantic coast.
// Marrakech x2 (n1-2) -> Essaouira x2 (n3-4) -> Imsouane -> Taghazout x2 (n5-6) -> Agadir -> Ait Baha -> Tafraoute x2 (n7-8) -> Tiznit ->
// Mirleft x2 (n9-10, Legzira + Sidi Ifni day) -> Guelmim -> Tan-Tan -> Khnifiss lagoon -> Akhfennir (n11) -> Tarfaya -> Laayoune (n12) ->
// Boujdour -> Dakhla x5 (n13-17) -> Dakhla airport.
// Template = the finished 8-day Imperial Cities page (like build-t17.js). Never re-run on the finished page (it wipes later edits).
// Research (2026-11-17, WebSearch; OpenSEO project not found this session): no private Marrakech -> Dakhla tour on page 1; coast tours stop at
// Mirleft/Legzira/Sidi Ifni (8-day private ~US$1,422 pp, 3-day Mirleft/Sidi Ifni/Legzira from ~US$514) or Tan-Tan Plage (12-day 4WD).
// Safety: UK FCDO (updated 29 Jun 2026, current 17 Nov 2026) advises against all travel only within 40 km north/west of the Berm (incl. Es Semara)
// and south/east of it; "travel insurance could be invalidated" if you go against advice. The coastal N1 (Laayoune, Boujdour, Dakhla) is far west
// of the Berm. Sahara Overland (Nov 2026): N1 "straightforward and safe", frequent checkpoints, fuel between towns; avoid night driving.
// Dakhla airport (VIL): Royal Air Maroc to Casablanca (+ Agadir, Marrakech, Rabat, Laayoune per aggregators), Transavia Paris-Orly, Ryanair Madrid
// (route counts disagree between sources -> "we check times when you book").
// Dakhla sights: White Dune (island at high tide), Dragon Island (walk at low tide), oyster farms ~8 km out of town with tasting; kite lagoon.
// Khnifiss lagoon (Akhfennir) = winter flamingo/bird site; Saint-Exupery museum Tarfaya (opened 2004, call ahead). La Courbine d'Argent (Akhfennir)
// 9.1/40 = the one well-rated inn. Laayoune: Sahara Line (TA 4.15/432), Hotel Parador (Booking 8.3/504, no 5-star in town).
// Old page: Taghazout -> Agadir = a 20 km day, two nights in Tan-Tan with little to do, Laayoune -> Dakhla 530 km. Expert choices: 2 nights in
// Taghazout instead of an Agadir day, 2 nights in the Anti-Atlas at Tafraoute (painted rocks, Ammeln Valley, Ait Mansour gorge), a Legzira +
// Sidi Ifni day from Mirleft, one night by the Khnifiss lagoon, Tarfaya on the way to Laayoune; 5 nights in Dakhla kept.
// OSRM: d5 Essaouira-Imsouane-Taghazout 169 km 3.0 h · d7 Taghazout-Agadir-Ait Baha-Tafraoute 183 km 3.4 h · d9 Tafraoute-Tiznit-Mirleft 148 km
// 2.8 h · d10 Mirleft-Legzira-Sidi Ifni 33 km · d11 Mirleft-Guelmim-Tan-Tan-Akhfennir 370 km 4.8 h · d12 Akhfennir-Tarfaya-Laayoune 202 km 2.7 h ·
// d13 Laayoune-Boujdour-Dakhla 532 km 6.9 h. Roads: essaouira + a18-d5, d7, d9, d10, d11, d12, d13.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/18-day-atlantic-morocco-tour-marrakech-to-dakhla.html';
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

const URL = 'https://moroccotourshub.com/tours/18-day-atlantic-morocco-tour-marrakech-to-dakhla.html';
const NAME = '18-Day Atlantic Morocco Tour from Marrakech to Dakhla';
const TITLE = '18-Day Atlantic Morocco Tour: Marrakech to Dakhla | Private';
const DESC = 'Private 18-day road trip down Morocco’s Atlantic coast: Marrakech, Essaouira, the surf town of Taghazout, the painted rocks of Tafraoute, Legzira and Sidi Ifni, the Khnifiss lagoon, Tarfaya and five nights on the Dakhla lagoon.';
const HERO = 'essaouira-skala-port.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="18 day Morocco tour, Atlantic coast Morocco, Marrakech to Dakhla, Dakhla lagoon, Taghazout, Tafraoute, Legzira beach, Mirleft, Sidi Ifni, Morocco road trip, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Marrakech: arrival', p: 'Your driver-guide meets you at Marrakech airport with your name on a sign, at whatever hour you land, and takes you to your riad. If there is time, a first walk to Jemaa el-Fnaa as the food stalls light up.', meta: m('Airport to your riad, about 20 minutes', 'Night: Marrakech riad', 'Breakfast from day 2') },
  { t: 'Marrakech: a guided day in the medina', p: 'With a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Saadian Tombs, the souks and the Ben Youssef Madrasa. The afternoon is free for the Majorelle Garden, a hammam or a rooftop café.', meta: m('Day on foot in the medina', 'Night: Marrakech riad', 'Breakfast') },
  { t: 'Marrakech → Essaouira', p: 'West across the argan plains to the Atlantic. The afternoon in Essaouira’s white and blue medina, on the ramparts of the Skala and at the fishing port with its blue boats, with grilled fish by the harbour if you like.', meta: m('About 180 km, about 3 hours on the road', 'Night: Essaouira', 'Breakfast') },
  { t: 'Essaouira: a free day by the sea', p: 'No packing today: the Mellah and the Bayt Dakira house of memory, the woodworkers under the ramparts, a long walk on the beach and the sun setting over the ocean from a rooftop.', meta: m('Free day', 'Night: Essaouira', 'Breakfast') },
  { t: 'Essaouira → Imsouane → Taghazout', p: 'South on the coast road through argan hills to Imsouane, the fishing village with one of Africa’s longest waves, for lunch by the bay. On to Taghazout, the surf town, for the sunset.', meta: m('About 170 km, about 3 hours on the road', 'Night: Taghazout', 'Breakfast') },
  { t: 'Taghazout: surf, swim or rest', p: 'A day in the surf town at your pace: a surf lesson for beginners in the bay, a walk along the cliffs to the next beach, or the palm-lined rock pools of Paradise Valley in the hills behind, by car.', meta: m('Free day; Paradise Valley on request', 'Night: Taghazout', 'Breakfast') },
  { t: 'Taghazout → Agadir → Tafraoute', p: 'The view over the bay from the Agadir Oufella kasbah, then inland over the Anti-Atlas by Aït Baha, through argan and almond country, to Tafraoute in its valley of pink granite boulders.', meta: m('About 185 km, about 3.5 hours on the road', 'Night: Tafraoute', 'Breakfast') },
  { t: 'Tafraoute: painted rocks and almond valleys', p: 'A day in the Anti-Atlas: the painted blue boulders in the desert outside town, the villages of the Ammeln Valley under the Jbel Lekst, and the Aït Mansour gorge, a ribbon of palm trees between red cliffs.', meta: m('Short drives around Tafraoute', 'Night: Tafraoute', 'Breakfast') },
  { t: 'Tafraoute → Tiznit → Mirleft', p: 'Down from the mountains to Tiznit, the walled town of silversmiths, for its jewellery souk, then to the coast at Mirleft, a quiet village of cliffs and coves, for the evening.', meta: m('About 150 km, about 3 hours on the road', 'Night: Mirleft', 'Breakfast') },
  { t: 'Legzira beach and Sidi Ifni', p: 'Low tide on the red sand of Legzira, under its cliffs and its great stone arch, then Sidi Ifni, the old Spanish town with its art deco squares above the ocean. Back in Mirleft for sunset.', meta: m('About 70 km in the day', 'Night: Mirleft', 'Breakfast') },
  { t: 'Mirleft → Guelmim → Tan-Tan → Khnifiss lagoon', p: 'Through Guelmim, the old gateway to the Sahara, and Tan-Tan, the land of the Sahrawi nomads, onto the long coast road where the desert meets the ocean. A night at Akhfennir, beside the Khnifiss lagoon and its birds.', meta: m('About 370 km, about 5 hours on the road', 'Night: Akhfennir', 'Breakfast') },
  { t: 'Akhfennir → Tarfaya → Laayoune', p: 'Tarfaya, where Saint-Exupéry flew the airmail and dreamed up the Little Prince: the small museum, the old Casa del Mar fort in the waves. Then the dunes to Laayoune, the biggest city of the far south.', meta: m('About 200 km, about 3 hours on the road', 'Night: Laayoune', 'Breakfast') },
  { t: 'Laayoune → Boujdour → Dakhla', p: 'The great Atlantic Sahara road, straight and empty between the sand and the sea, with stops whenever you want and lunch in Boujdour. In the late afternoon, the turquoise lagoon of Dakhla opens on your right.', meta: m('About 530 km, about 7 hours on the road', 'Night: Dakhla', 'Breakfast') },
  { t: 'Dakhla: the White Dune and the oyster farms', p: 'The lagoon by 4×4 with your driver-guide: the White Dune, which becomes an island at high tide, and an oyster farm on the shore for a tasting straight from the water. Dragon Island when the tide is low.', meta: m('About 80 km around the lagoon', 'Night: Dakhla', 'Breakfast') },
  { t: 'Dakhla: on the water', p: 'The lagoon is one of the best kitesurfing spots in the world, with flat water and wind most of the year. Take a first kite or wing lesson, paddle a kayak, or just watch from a beach café.', meta: m('Free day; lessons on request', 'Night: Dakhla', 'Breakfast') },
  { t: 'Dakhla: where the desert meets the ocean', p: 'A day along the open coast by 4×4: cliffs of sand above empty beaches, fishermen’s camps and wide views over the Atlantic Sahara, with a picnic lunch by the sea.', meta: m('4×4 day along the coast', 'Night: Dakhla', 'Breakfast') },
  { t: 'Dakhla: a free day', p: 'A last slow day by the lagoon: a swim, a massage, a book in the shade, or one more session on the water before a sunset dinner of fresh fish.', meta: m('Free day', 'Night: Dakhla', 'Breakfast') },
  { t: 'Dakhla → the airport', p: 'A free morning, then your driver-guide takes you to Dakhla airport, a few minutes from town, at the time of your flight.', meta: [['car', 'Hotel to Dakhla airport, about 15 minutes'], ['flag', 'Ends at Dakhla airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Blue fishing boats in the port of Essaouira on the Atlantic" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>18-Day Atlantic Tour to Dakhla</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>18-Day Atlantic Morocco Tour to Dakhla<span class="script">Where the Sahara Meets the Ocean</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Marrakech$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Marrakech → Dakhla</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>18 days / 17 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Eighteen days down the Atlantic side of Morocco, from the Red City to the turquoise lagoon of Dakhla. Marrakech with a local guide, two slow days in Essaouira, the surf town of Taghazout, then inland to the painted rocks and almond valleys of Tafraoute in the Anti-Atlas.</p>
          <p class="dt-lead">Back on the coast at Mirleft for the red arch of Legzira and the Spanish streets of Sidi Ifni, then the great road where the Sahara runs into the sea: the Khnifiss lagoon, Saint-Exupéry’s Tarfaya and Laayoune. Five nights in Dakhla to finish, for the White Dune, the oyster farms and the kite lagoon. Your own vehicle and driver-guide all the way.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Dakhla</dt><dd>5 nights by the lagoon</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Marrakech → Dakhla$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'A guided day in the Marrakech medina',
  'Two slow days in Essaouira',
  'The surf town of Taghazout',
  'The painted rocks of Tafraoute',
  'The red cliffs and arch of Legzira',
  'Spanish art deco in Sidi Ifni',
  'The Khnifiss lagoon and its birds',
  'Saint-Exupéry’s Tarfaya',
  'The White Dune on the Dakhla lagoon',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery (owner to approve real coast photos: none of Taghazout, Tafraoute, Legzira or Dakhla in assets yet) ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['marrakech-medina-walk.jpg', 'Walking through the Marrakech medina', 1600, 1066],
  ['essaouira.jpg', 'The ramparts and blue boats of Essaouira', 1080, 1350],
  ['jemaa-el-fna-dusk-stalls.jpg', 'Jemaa el-Fnaa at dusk', 1600, 1066],
  ['desert-mesa.jpg', 'Open desert on the road south', 1600, 1066],
  ['grand-desert-plateau.jpg', 'The wide plains of the far south', 1800, 1200],
  ['sahara-sand-sunset.jpg', 'Sand and sunset in the Atlantic Sahara', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guide in Marrakech',
  'Marrakech and Dakhla airport transfers',
  '17 nights as in the table below',
  '17 breakfasts',
  'Two 4×4 days around Dakhla',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, dinners and drinks', 'Entrance fees', 'Surf and kite lessons, boat trips', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Passport handy: police checkpoints south of Tan-Tan',
  'Check your insurance covers the far south',
  'We drive the long days in daylight only',
  'Dakhla is windy: bring a windproof layer',
  'Bring cash: few card machines south of Guelmim',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bahia Palace:</b> 100 MAD; <b>Saadian Tombs:</b> 100 MAD',
  '<b>Skala du Port, Essaouira:</b> small fee',
  '<b>Saint-Exupéry museum, Tarfaya:</b> small fee, if open',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Marrakech to Dakhla along the Atlantic coast, about 2,100 km in 18 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Dakhla,Morocco&amp;waypoints=Essaouira,Morocco%7CTaghazout,Morocco%7CTafraoute,Morocco%7CMirleft,Morocco%7CAkhfennir,Morocco%7CLaayoune&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night; my research picks, owner to confirm) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const B = (q, n) => A('https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(q), n);
const mar = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
const ess = [A('https://www.tripadvisor.com/Hotel_Review-g298349-d1170450-Reviews-Riad_Baladin-Essaouira_Marrakech_Safi.html', 'Riad Baladin'), A('https://www.madada.com/', 'Madada Mogador'), A('https://www.tripadvisor.com/Hotel_Review-g298349-d543543-Reviews-L_Heure_Bleue_Palais-Essaouira_Marrakech_Safi.html', 'L’Heure Bleue Palais')];
const tag = [B('World of Waves Surf House Taghazout', 'World of Waves Surf House'), B('Radisson Blu Resort Taghazout Bay Surf Village', 'Radisson Blu Surf Village'), B('Fairmont Taghazout Bay', 'Fairmont Taghazout Bay')];
const taf = [B('Hotel Salama Tafraoute', 'Hotel Salama'), B('Hotel Les Amandiers Tafraoute', 'Hotel Les Amandiers'), B('Chez Amaliya Tafraoute', 'Chez Amaliya')];
const mir = [B('Auberge Dar Faycal Mirleft', 'Auberge Dar Fayçal'), B('Dar Najmat Mirleft', 'Dar Najmat'), B('Kasbah Tabelkoukt Mirleft', 'Kasbah Tabelkoukt')];
const dak = [B('Kite House Dakhla', 'Kite House Dakhla'), B('Dakhla Attitude', 'Dakhla Attitude'), B('Palais Rhoul Spa Dakhla', 'Palais Rhoul &amp; Spa')];
const row = (n, r) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`;
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${row('1–2: Marra&shy;kech', mar)}${row('3–4: Essaouira', ess)}${row('5–6: Taghazout', tag)}${row('7–8: Tafraoute', taf)}${row('9–10: Mirleft', mir)}<tr><th scope="row">11: Akhfennir</th><td colspan="3">${B('La Courbine d’Argent Akhfennir', 'La Courbine d’Argent')}, the best inn by the lagoon</td></tr><tr><th scope="row">12: Laayoune</th><td>${B('Sahara Line Hotel Laayoune', 'Sahara Line Hotel')}</td><td colspan="2">${B('Hotel Parador Laayoune', 'Hotel Parador')}</td></tr>${row('13–17: Dakhla', dak)}</tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'from riads in the old towns to surf lodges and lagoon hotels.', 'acc intro');
rep('Prefer another hotel or camp? Tell us when you book.', 'Prefer another hotel? Tell us when you book.', 'acc note');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers who want the ocean more than the dunes',
  'Surfers, kitesurfers and beach lovers',
  'Road-trippers who love wide, empty landscapes',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Long drives worry you? The <a href="7-day-coastal-morocco-tour-from-marrakech.html">7-day coastal tour</a> stays between Essaouira and Agadir',
  'Want the Sahara dunes too? The <a href="12-day-morocco-tour-from-agadir.html">12-day Agadir loop</a> adds Merzouga and Fes',
  'Flying home from Marrakech? The <a href="14-day-morocco-tour-from-marrakech.html">14-day Marrakech loop</a> ends by the sea in Essaouira',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'a18-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is the road to Dakhla safe?', 'Yes. The coast road is paved and used every day by locals, trucks and travellers, with police checkpoints where your driver-guide shows your passports. The UK advises against travel only near the Berm, far inland; our route stays on the coast. Check your insurance covers the region.'],
  ['How long are the drives?', 'Most days are 3 hours or less. Three are longer: Mirleft to Akhfennir, about 370 km; Akhfennir to Laayoune, about 200 km; and Laayoune to Dakhla, about 530 km and 7 hours on an empty, straight road, always in daylight, with stops whenever you want.'],
  ['How do we fly home from Dakhla?', 'Dakhla airport is a few minutes from town. Royal Air Maroc flies to Casablanca for connections, and there are direct flights to Paris-Orly and Madrid. Schedules change with the season, so we check the times with you when you book.'],
  ['What is there to do for five days in Dakhla?', 'The White Dune and Dragon Island at low tide, an oyster tasting on the shore, kite, wing or kayak lessons on the flat lagoon, and a 4×4 day along the open coast. Or simply rest: the slow last days are the point.'],
  ['Do we need to surf to enjoy Taghazout?', 'No. The bay has gentle waves for a first lesson, but Taghazout is just as good for cliff walks, beach cafés and the rock pools of Paradise Valley. Tell us if you want a lesson and we book it.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Kite or wing-foil lessons in Dakhla',
  'A surf lesson in Taghazout',
  'A <a href="marrakech-hot-air-balloon-ride.html">sunrise balloon flight</a> over Marrakech',
  'A <a href="marrakech-cooking-class.html">cooking class</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'A boat trip on the Dakhla lagoon',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%2018-Day%20Atlantic%20Morocco%20Tour%20to%20Dakhla.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>18-Day Atlantic Tour</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 18-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'a18-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Friends', 'Surfers', 'Road-trippers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Marrakech with a guided day (nights 1–2)', 'Essaouira (nights 3–4)', 'Imsouane and Taghazout (nights 5–6)', 'Agadir Oufella and Tafraoute (nights 7–8)', 'Tiznit and Mirleft (nights 9–10)', 'Legzira beach and Sidi Ifni', 'Guelmim, Tan-Tan and the Khnifiss lagoon (night 11)', 'Tarfaya and Laayoune (night 12)', 'Boujdour and Dakhla (nights 13–17)', 'Dakhla airport'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'Fes', 'Merzouga', 'camp', 'Imperial', 'Volubilis', 'Rabat', 'Sahara Tour', 'dunes of Erg']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
