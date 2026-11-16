// Build tours/10-day-merzouga-desert-nomad-experience.html (Fes -> Merzouga -> a night with a nomad family -> camp -> Todra -> Aït Ben Haddou -> Marrakech)
// Template = the finished 5-day Agadir -> Errachidia page. Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/5-day-desert-tour-agadir-merzouga-errachidia-airport.html';
const out = root + 'tours/10-day-merzouga-desert-nomad-experience.html';
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

const URL = 'https://moroccotourshub.com/tours/10-day-merzouga-desert-nomad-experience.html';
const NAME = '10-Day Fes to Marrakech Tour with a Nomad Experience';
const TITLE = '10-Day Fes to Marrakech Tour | Sahara Nomad Experience';
const DESC = 'Private 10-day Morocco itinerary from Fes to Marrakech: a guided day in the Fes medina, a night with a nomad family and a camel trek in the Merzouga dunes, the Todra Gorge, Aït Ben Haddou and three nights in Marrakech.';
const HERO = 'merzouga-caravan-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="10 day Morocco itinerary, Fes to Marrakech tour, Morocco nomad experience, night with nomads Merzouga, camel trek Morocco, Sahara desert tour, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/5-day-desert-tour-agadir-merzouga-errachidia-airport\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Fes: a guided day in the medina',
    p: 'Your driver-guide meets you at your riad in the morning with a local Fes guide. Into the medina by Bab Bou Jeloud, the Blue Gate, to the Bou Inania Madrasa, the Nejjarine fountain and the coppersmiths of Place Seffarine, and up to a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30: the alpine town of Ifrane, the cedar forest where Barbary macaques sit by the road, and lunch in Midelt under the Jebel Ayachi. Down the palm gorges of the Ziz Valley and past Erfoud to a hotel at the foot of the Erg Chebbi dunes, in time to watch them turn red.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga by 4×4, then by camel to the nomads',
    p: 'A morning around the dunes by 4×4: the Gnawa musicians of Khamlia and the old caravan market of Rissani. In the late afternoon your big bags stay at the hotel and you ride a camel, about an hour, to the tent of a nomad family who live from their goats and camels. Mint tea, dinner by the fire and a night in their camp.',
    meta: [['car', '4×4 morning around Merzouga'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: with a nomad family'], ['food', 'Breakfast & dinner']] },
  { t: 'A day with the nomads, then a camel trek across the dunes',
    p: 'Wake up in the open desert. Spend the morning at the family’s pace: walk out with the herds, fetch water from the well, bake bread in the embers and learn to tie a desert turban. After lunch with them, a camel trek of about two to three hours across the dunes of Erg Chebbi to a camp for the night.',
    meta: [['camel', 'Camel trek about 2–3 hours'], ['bed', 'Night: desert camp'], ['food', 'Breakfast, lunch & dinner']] },
  { t: 'Merzouga → Rissani → Alnif → Tinghir → Todra Gorge',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4 to your driver-guide. West along the Jebel Saghro, past Alnif and its trilobite fossils, to the palm grove of Tinghir. You sleep at the Todra Gorge and walk between its 300 m walls in the late afternoon, when the day visitors have left.',
    meta: [['car', 'About 220 km, about 4.5 hours on the road'], ['bed', 'Night: Todra Gorge'], ['food', 'Breakfast & dinner']] },
  { t: 'Todra → Dades Gorge → Valley of Roses → Skoura → Aït Ben Haddou',
    p: 'Up the Dades Gorge to the hairpin bends of Tissadrine, then down the Road of a Thousand Kasbahs through the Valley of Roses and the Skoura palm grove. Past Ouarzazate to Aït Ben Haddou, where you sleep beside the ksar and see it turn red at sunset.',
    meta: [['car', 'About 275 km, about 5.5 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Breakfast & dinner']] },
  { t: 'Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'An early walk up through the quiet lanes of the ksar to the old granary. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, with stops in the Berber villages, and down to Marrakech in the early afternoon. The evening is yours: Jemaa el-Fnaa comes alive at sunset.',
    meta: [['car', 'About 175 km, about 3.5 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided day in the medina',
    p: 'With a local guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Mellah, the souks and the Ben Youssef Madrasa, with mint tea on a rooftop. The afternoon is free for the gardens, a hammam or more of the souks.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'A day in the High Atlas: Imlil and the Toubkal valley',
    p: 'Your driver-guide takes you up to Imlil, about 1.5 hours away, below Jebel Toubkal. A walk with a local guide through walnut groves and Berber villages to Aremd, set to your pace, and lunch on a terrace facing the peaks. Back in Marrakech for the evening.',
    meta: [['car', 'About 130 km there and back'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: end of the tour',
    p: 'A free morning in Marrakech, then your driver-guide takes you to the airport or the train station at the time you need. The tour ends here, or we add more nights for you.',
    meta: [['flag', 'Drop-off at Marrakech airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-ride-dunes\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan crossing the Merzouga dunes at sunset" loading="eager"`, 'hero img');
rep('<span>5-Day Agadir to Merzouga</span></nav>', '<span>10-Day Fes to Marrakech: Nomad Experience</span></nav>', 'crumb');
rep('<circle cx="12" cy="10" r="2.5"/></svg>Agadir</span>', '<circle cx="12" cy="10" r="2.5"/></svg>Fes</span>', 'chip');
rep('<h1>5-Day Agadir to Merzouga Desert Tour<span class="script">Two Nights by the Dunes</span></h1>', '<h1>10-Day Fes to Marrakech Tour<span class="script">A Night with the Nomads</span></h1>', 'h1');
rep('<b>5 days / 4 nights</b>', '<b>10 days / 9 nights</b>', 'duration');
rep('<small>Route</small><b>Agadir → Errachidia</b>', '<small>Route</small><b>Fes → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Ten days from Fes to Marrakech with the Sahara at the heart of it. After a guided day in the medina of Fes, you cross the Middle Atlas to the dunes of Erg Chebbi and ride a camel to the tent of a nomad family, to share their dinner, their fire and a morning of their life, before a longer camel trek across the dunes to a camp.</p>
          <p class="dt-lead">Then the road west, taken slowly: a night at the Todra Gorge, the bends of the Dades, a night beside the ksar of Aït Ben Haddou and three nights in Marrakech, with a guided medina day and a day in the High Atlas. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Agadir → Errachidia</dd>', '<dd>Fes → Marrakech</dd>', 'kf1');
rep('<dt>Desert</dt><dd>2 nights by the dunes</dd>', '<dt>Nomads</dt><dd>A night in their tent</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'A guided day in the Fes medina',
  'Barbary macaques in the cedar forest',
  'A night with a nomad family',
  'A camel trek across Erg Chebbi',
  'Sunrise and sandboarding on the dunes',
  'The Todra Gorge in the quiet hours',
  'Sunset over the ksar of Aït Ben Haddou',
  'The souks and palaces of Marrakech',
  'A walk in the High Atlas at Imlil',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['fes-royal-palace-gates.jpg', 'The brass gates of the royal palace in Fes', 1300, 866],
  ['nomad-tent-tea.jpg', 'Mint tea in a nomad tent in the desert', 960, 1280],
  ['erg-chebbi-caravan-sunset.jpg', 'A camel caravan on the Erg Chebbi dunes at sunset', 1800, 1200],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['ait-ben-haddou-terrace-tea.jpg', 'Tea on a terrace facing Aït Ben Haddou', 1300, 867],
  ['jemaa-el-fna-evening-aerial.jpg', 'Jemaa el-Fnaa square in Marrakech at dusk', 1600, 1067],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes, Marrakech and Imlil',
  'Pick-up in Fes, drop-off in Marrakech',
  '9 nights as in the table below',
  'A night with a nomad family',
  '9 breakfasts, 6 dinners, 1 lunch',
  'Camel rides, camel trek, sandboarding',
  '4×4 morning around Merzouga',
  'Day trip to Imlil',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Other lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'The nomad night is simple: no shower, mats and blankets',
  'Small bag for the desert; luggage stays at the hotel',
  'Car-sick? Sit in front on the mountain bends',
  'Desert and mountain nights are cold in winter',
  'Bring cash for lunches and tips',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace, Marrakech:</b> 100 MAD',
  '<b>Ben Youssef Madrasa, Marrakech:</b> about 50 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you, also for the nomad family',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Agadir to Errachidia airport by the Sahara, about 1,100 km in 5 days\. <a href="[^"]*"/, '<span>Fes to Marrakech by the Sahara, about 1,300 km in 10 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Fes,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Ifrane,Morocco%7CMidelt,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CBoumalne+Dades,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tombouctou')];
const nomad = ['Nomad family tent', 'Nomad family tent', 'Nomad family tent'];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const tod = JSON.parse(fs.readFileSync(SP + 'todra-hotels.json', 'utf8')).map(([u, n]) => A(u, n.replace('Guesthouse Panorama Todra', 'Panorama Todra')));
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144 Marrakech'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1: Fes', fes], ['2: Merzouga', mzh], ['3: Nomad family', nomad], ['4: Desert camp', camp], ['5: Todra Gorge', tod], ['6: Aït Ben Haddou', abh], ['7–9: Marrakech', mrk]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers who want to meet people, not only see places',
  'Couples and friends with ten days for one great loop',
  'Anyone who wants the Sahara at a slow pace',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 5 days? The <a href="5-day-fes-to-marrakech-desert-tour.html">5-day Fes to Marrakech tour</a> keeps the dunes and Aït Ben Haddou',
  'Want two different deserts? The <a href="7-day-marrakech-erg-chigaga-merzouga-tour.html">7-day Erg Chigaga &amp; Merzouga tour</a> sleeps in both',
  'Want Chefchaouen too? The <a href="10-day-morocco-tour-marrakech-to-tangier.html">10-day Marrakech to Tangier tour</a> goes north',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'nm10-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['What is the night with the nomads like?', 'Simple and real: a woollen tent, mats and blankets, dinner by the fire with the family, and the open desert around you. There is no shower that night; the next night is in a camp with a private bathroom.'],
  ['Is the nomad visit a show for tourists?', 'No. You stay with a family who live from their goats and camels and move with the seasons. It is just your group, they are paid directly for hosting you, and you share their day rather than watch a show.'],
  ['How long are the camel rides?', 'About one hour to the nomad family on day 3, and two to three hours across the dunes on day 4, with stops. If you prefer less time on a camel, part of the way can be done by 4×4.'],
  ['Can we swap the nomad night for a second camp night?', 'Yes. Tell us when you book and we keep the camel trek and the visit to the family by day, with both nights in the camp.'],
  ['Can we end at Marrakech airport, or stay longer?', 'Yes. On day 10 we drive you to the airport at any time. If you want more days, we add nights in Marrakech or a trip to Essaouira on the coast.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A second camp night instead of the nomad night',
  'Upgrade to a luxury camp',
  'Essaouira instead of Imlil on day 9',
  'A <a href="marrakech-hammam-experience.html">hammam</a> or <a href="marrakech-cooking-class.html">cooking class</a> in Marrakech',
  'Pick-up at Fes airport or train station',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="5-Day Agadir to Merzouga Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%205-Day%20Agadir%20to%20Merzouga%20Desert%20Tour.', 'information%20about%20the%2010-Day%20Fes%20to%20Marrakech%20Nomad%20Experience%20Tour.', 'wa');
rep('<b>5-Day Agadir to Merzouga</b><span>Free', '<b>10-Day Fes to Marrakech</b><span>Free', 'mbar');
rep('The 5-day route is a starting point', 'The 10-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'nm10-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Guided day in the Fes medina', 'Ifrane, the cedar forest and Midelt', 'Merzouga hotel', 'Camel ride to a nomad family (night 3)', 'A day with the nomads and a camel trek to a desert camp', 'Todra Gorge (night 5)', 'Dades Gorge, Valley of Roses and Aït Ben Haddou (night 6)', 'Tizi n’Tichka pass and Marrakech', 'Guided day in the Marrakech medina', 'Imlil and the High Atlas'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Taroudant', 'Errachidia airport', 'Two Nights by the Dunes']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
