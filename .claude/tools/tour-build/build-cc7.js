// Build tours/7-day-coastal-morocco-tour-from-marrakech.html (URL kept): 7-day Marrakech round trip on the Atlantic coast.
// Marrakech -> Essaouira x2 (n1-2) -> Sidi Kaouki -> Imsouane (n3) -> Timlalin dunes -> Taghazout x2 (n4-5, Paradise Valley morning) ->
// Agadir (n6: Oufella, Souk El Had, beach) -> motorway -> Marrakech hotel/airport (or Agadir airport on request).
// Template = the finished 8-day Imperial Cities page (like build-a18.js). Never re-run on the finished page (it wipes later edits).
// Research (2026-11-17, WebSearch + Firecrawl; OpenSEO out of credits): no 7-day private tour on page 1 with this exact route. Closest:
// TourRadar 8-day private Marrakech -> Essaouira -> Imsouane -> Taghazout -> Agadir -> Tiznit/Tafraoute -> Marrakech; TourRadar 7-day
// Marrakech loop with 5 coastal cities (Essaouira, Taghazout, Paradise Valley, Agadir beach; adds Casablanca/El Jadida); Fodor's 7-day southern
// coast (Essaouira, Taghazout, Tiznit, Tafraoute, Taroudant). Prices seen ~US$1,470–2,500 pp.
// Timlalin dunes: just past Tamri on the N1 toward Essaouira, ~68 km from Agadir, dunes dozens of metres above the sea; sandboarding tours from
// Agadir/Taghazout (musement/TUI/lokalee). Nominatim: "Coastal Cliff & Timlalin Dunes" 30.762,-9.830.
// Imsouane: no ATM, most places cash only; bay crowded at low tide in high season; 2026 seafront construction dust (hostel guide).
// Imsouane hotels (aggregators quoting Tripadvisor): Windhouse 4.7/22, Imsouane Wood House 4.55/264 (one serious owner complaint on Trip.com),
// Imsouane Magic House 4.4/43 -> Standard = Magic House, Midrange+Luxury = Windhouse (no luxury hotel in the village).
// Agadir hotels: Hyatt Place Agadir (best-value beachfront breakfast), Royal Atlas Hotel & Spa, Sofitel Agadir Thalassa Sea & Spa (top pick).
// Paradise Valley: ~36 km from Taghazout, no public transport, rock pools, start early. Agadir Oufella cable car opened 2022 (~€9 one way per one
// undated listing, unverified) -> "a ticket if you ride it".
// Old page: Essaouira -> Imsouane "~180 km" (OSRM: 110 km), two nights in Agadir with a free day. Expert choices: 2 nights in Taghazout (Paradise
// Valley + surf/cliffs) and 1 in Agadir; Sidi Kaouki beach on the way to Imsouane.
// OSRM: d3 Essaouira-Sidi Kaouki-Imsouane 110 km 1.7 h · d4 Imsouane-Timlalin-Taghazout 73 km 1.9 h · d5 Taghazout-Paradise Valley 34 km 0.7 h ·
// d6 Taghazout-Agadir Oufella-Souk El Had 29 km · d7 Agadir-Marrakech 249 km 3.0 h. Roads: essaouira + cc7-d3..d7.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/8-day-morocco-imperial-cities-sahara-tour.html';
const out = root + 'tours/7-day-coastal-morocco-tour-from-marrakech.html';
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

const URL = 'https://moroccotourshub.com/tours/7-day-coastal-morocco-tour-from-marrakech.html';
const NAME = '7-Day Coastal Morocco Tour from Marrakech';
const TITLE = '7-Day Coastal Morocco Tour from Marrakech | Private';
const DESC = 'Private 7-day Atlantic coast tour from Marrakech: two nights in Essaouira, the surf village of Imsouane, the Timlalin dunes above the ocean, two nights in Taghazout with Paradise Valley, and a night in Agadir.';
const HERO = 'essaouira-skala-port.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="7 day coastal Morocco tour, Morocco coast tour from Marrakech, Essaouira, Imsouane, Taghazout, Paradise Valley, Agadir, Timlalin dunes, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/8-day-morocco-imperial-cities-sahara-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const m = (km, bed, food) => [['car', km], ['bed', bed], ['food', food]];
const DAYS = [
  { t: 'Marrakech → Essaouira', p: 'Your driver-guide collects you at your hotel or riad in the morning and heads west across the argan plains to the Atlantic. The afternoon in Essaouira’s white and blue medina, on the ramparts of the Skala and at the fishing port, with grilled fish by the harbour if you like.', meta: m('About 180 km, about 3 hours on the road', 'Night: Essaouira', 'Breakfast from day 2') },
  { t: 'Essaouira: a free day by the sea', p: 'No packing today: the old Mellah and the Bayt Dakira house of memory, the woodworkers under the ramparts, a long walk on the beach, and the sun setting over the ocean from a rooftop.', meta: m('Free day', 'Night: Essaouira', 'Breakfast') },
  { t: 'Essaouira → Sidi Kaouki → Imsouane', p: 'South to the wide beach of Sidi Kaouki for a walk on the sand, then the coast road through argan hills to Imsouane, a fishing village with one of Africa’s longest waves. Fish lunch by the port, a slow afternoon on the bay and the sunset from the cliffs.', meta: m('About 110 km, about 2 hours on the road', 'Night: Imsouane', 'Breakfast') },
  { t: 'Imsouane → Timlalin dunes → Taghazout', p: 'Down the coast to the Timlalin dunes near Tamri, golden sand piled high above the Atlantic, for a walk to the top and the view. Then the banana fields of Tamri and the surf beaches to Taghazout, in time for a sunset on the bay.', meta: m('About 75 km, about 2 hours with the dunes', 'Night: Taghazout', 'Breakfast') },
  { t: 'Taghazout: Paradise Valley and the bay', p: 'An early drive into the hills to Paradise Valley, a palm gorge with turquoise rock pools for a swim before the heat. The afternoon back in Taghazout at your pace: a first surf lesson in the bay, the cliff path to the next beach or a café on the sand.', meta: m('About 70 km there and back', 'Night: Taghazout', 'Breakfast') },
  { t: 'Taghazout → Agadir', p: 'A short drive to Agadir. Up to the Agadir Oufella hill for the view over the bay and the port, then Souk El Had, one of the biggest markets in Morocco, for spices, fruit and argan oil. The evening on the long beach promenade and the marina.', meta: m('About 30 km, about 30 minutes on the road', 'Night: Agadir', 'Breakfast') },
  { t: 'Agadir → Marrakech', p: 'On the motorway over the edge of the High Atlas, with a stop for coffee or lunch on the way. You are back in Marrakech by early afternoon, at your hotel, your riad or Marrakech airport.', meta: [['car', 'About 250 km, about 3 hours on the road'], ['flag', 'Ends at your hotel or Marrakech airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-caravan\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Blue fishing boats in the port of Essaouira on the Atlantic" loading="eager"`, 'hero img');
rep('<span>8-Day Imperial Cities &amp; Sahara</span></nav>', '<span>7-Day Coastal Tour from Marrakech</span></nav>', 'crumb');
rep('<h1>8-Day Morocco Imperial Cities &amp; Sahara Tour<span class="script">Four Royal Cities and the Dunes</span></h1>', '<h1>7-Day Coastal Morocco Tour from Marrakech<span class="script">A Week on the Atlantic</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Casablanca(<\/span>)/, '$1Marrakech$2', 'chip');
rep('<small>Route</small><b>Casablanca → Marrakech</b>', '<small>Route</small><b>Marrakech round trip</b>', 'route');
rep('<b>8 days / 7 nights</b>', '<b>7 days / 6 nights</b>', 'duration');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">A week on Morocco’s Atlantic coast, with short drives and six nights by the ocean. Two slow days in Essaouira, the fishing and surf village of Imsouane, the Timlalin dunes high above the sea, and two nights in Taghazout with the rock pools of Paradise Valley.</p>
          <p class="dt-lead">A night in Agadir for the view from the Oufella hill and the great Souk El Had, then the motorway back to Marrakech. Your own vehicle and driver-guide all week, stopping for every beach, viewpoint and fish lunch you like, and never at a shop unless you ask.</p>
`, 'overview');
rep('<dt>Cities</dt><dd>4 imperial cities</dd>', '<dt>Coast</dt><dd>6 nights by the ocean</dd>', 'kf4');
rep(/(<dt>Start &amp; end<\/dt><dd>)[^<]*(<\/dd>)/, '$1Marrakech round trip$2', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Two slow days in Essaouira',
  'The ramparts and blue boats of the port',
  'The wide beach of Sidi Kaouki',
  'A night in the surf village of Imsouane',
  'The Timlalin dunes above the ocean',
  'The rock pools of Paradise Valley',
  'Two nights in Taghazout',
  'The view from Agadir Oufella',
  'Souk El Had, a giant market',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery (placeholder: no Imsouane, Taghazout, Paradise Valley or Agadir photos in assets yet; owner to approve real ones) ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['essaouira.jpg', 'The ramparts and blue boats of Essaouira', 1080, 1350],
  ['souk-shopping.jpg', 'Browsing the souks', 1600, 1066],
  ['sandboarding.jpg', 'Sandboarding down a dune', 1600, 1066],
  ['spice-market-pyramids.jpg', 'Spices piled high in the market', 1600, 1066],
  ['cooking-shared-meal.jpg', 'A Moroccan meal to share', 1600, 1066],
  ['fleet-minivan.jpg', 'Your private vehicle for the week', 1000, 667],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C car or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Hotel pick-up and drop-off in Marrakech',
  '6 nights as in the table below',
  '6 breakfasts',
  'Paradise Valley and the Timlalin dunes by car',
  'Fuel, tolls and parking',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Lunches, dinners and drinks', 'Surf lessons and sandboard hire', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Bring cash: Imsouane has no ATM',
  'The ocean wind is cool: bring a layer',
  'Strong currents: swim in the sheltered bays',
  'Paradise Valley pools are lower after a dry summer',
  'Good shoes for the dunes and the valley rocks',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Skala du Port, Essaouira:</b> small fee',
  '<b>Agadir Oufella cable car:</b> a ticket, if you ride it',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Casablanca to Marrakech by Fes and the Sahara, about 1,450 km in 8 days\. <a href="[^"]*"/, '<span>Marrakech round trip on the Atlantic coast, about 720 km in 7 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Essaouira,Morocco%7CImsouane,Morocco%7CTamri,Morocco%7CTaghazout,Morocco%7CAgadir,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per stop; my research picks, owner to confirm) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const B = (q, n) => A('https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(q), n);
const ess = [A('https://www.tripadvisor.com/Hotel_Review-g298349-d1170450-Reviews-Riad_Baladin-Essaouira_Marrakech_Safi.html', 'Riad Baladin'), A('https://www.madada.com/', 'Madada Mogador'), A('https://www.tripadvisor.com/Hotel_Review-g298349-d543543-Reviews-L_Heure_Bleue_Palais-Essaouira_Marrakech_Safi.html', 'L’Heure Bleue Palais')];
const tag = [B('World of Waves Surf House Taghazout', 'World of Waves Surf House'), B('Radisson Blu Resort Taghazout Bay Surf Village', 'Radisson Blu Surf Village'), B('Fairmont Taghazout Bay', 'Fairmont Taghazout Bay')];
const aga = [B('Hyatt Place Agadir', 'Hyatt Place Agadir'), B('Royal Atlas Hotel Spa Agadir', 'Royal Atlas Hotel &amp; Spa'), B('Sofitel Agadir Thalassa Sea Spa', 'Sofitel Agadir Thalassa')];
const row = (n, r) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`;
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${row('1–2: Essaouira', ess)}<tr><th scope="row">3: Imsouane</th><td>${B('Imsouane Magic House', 'Imsouane Magic House')}</td><td colspan="2">${B('Windhouse Imsouane', 'Windhouse')}, the best-rated small hotel in the village</td></tr>${row('4–5: Taghazout', tag)}${row('6: Agadir', aga)}</tbody>
          `, 'acc');
rep('from charming riads to a desert camp under the stars.', 'from riads in Essaouira to surf lodges and beach hotels.', 'acc intro');
rep('Prefer another hotel or camp? Tell us when you book.', 'Prefer another hotel? Tell us when you book.', 'acc note');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers who want the ocean more than the dunes',
  'Families and couples who like short drives',
  'First-time surfers and beach lovers',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 4 days? The <a href="4-day-marrakech-essaouira-agadir-tour.html">4-day tour</a> keeps Marrakech, Essaouira and Agadir',
  'Want the Sahara dunes too? The <a href="4-day-desert-tour-agadir-merzouga-marrakech.html">4-day Agadir desert tour</a> crosses to Merzouga',
  'Want more of the coast? The <a href="18-day-atlantic-morocco-tour-marrakech-to-dakhla.html">18-day Atlantic tour</a> goes on to Tafraoute and Dakhla',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'cc7-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Are the Timlalin dunes like the Sahara?', 'No. They are coastal dunes near Tamri, rising high above the ocean: a beautiful walk and view, and fun for sandboarding. For the great Sahara dunes, the Merzouga tours cross the Atlas to Erg Chebbi.'],
  ['Do we need to surf to enjoy this tour?', 'No. Imsouane and Taghazout are surf villages, but they are just as good for cliff walks, fish lunches and beach cafés. If you want a first lesson in a gentle bay, tell us and we book it.'],
  ['Is the ocean safe for swimming?', 'The Atlantic here has strong currents and big waves on the open beaches. Swim in the sheltered bays, such as Imsouane’s and Agadir’s wide bay, and in the rock pools of Paradise Valley. Your driver-guide knows the calm spots.'],
  ['Why only one night in Agadir?', 'Agadir is a modern beach city, rebuilt after the 1960 earthquake: worth a visit for the Oufella view, the souk and the promenade, but the charm of this coast is in Essaouira and the villages, so they get the extra nights.'],
  ['Can we end at Agadir airport?', 'Yes. Agadir airport is about 30 minutes from the city, with flights to Europe. We can drop you there on day 7 instead of driving back to Marrakech; tell us your flight time when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A surf lesson in Imsouane or Taghazout',
  'Sandboarding on the Timlalin dunes',
  'A third night in Essaouira',
  'End at Agadir airport, no drive back',
  'A <a href="marrakech-hammam-experience.html">hammam</a> or <a href="marrakech-cooking-class.html">cooking class</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="8-Day Morocco Imperial Cities & Sahara Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%208-Day%20Imperial%20Cities%20and%20Sahara%20Tour.', 'information%20about%20the%207-Day%20Coastal%20Morocco%20Tour%20from%20Marrakech.', 'wa');
rep('<b>8-Day Imperial Cities</b><span>Free', '<b>7-Day Coastal Tour</b><span>Free', 'mbar');
rep('The 8-day route is a starting point', 'The 7-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'cc7-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Surfers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Essaouira (nights 1–2)', 'Sidi Kaouki beach', 'Imsouane (night 3)', 'Timlalin dunes', 'Taghazout and Paradise Valley (nights 4–5)', 'Agadir Oufella and Souk El Had (night 6)', 'Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Casablanca', 'Fes', 'camp', 'Imperial', 'Volubilis', 'Rabat', 'Sahara Tour', 'Erg Chebbi', 'desert camp']) {
  const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
  const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n);
}
fs.writeFileSync(out, s);
console.log('written', s.length);
