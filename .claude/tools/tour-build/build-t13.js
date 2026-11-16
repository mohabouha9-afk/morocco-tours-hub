// Build tours/13-day-tangier-to-marrakech-tour.html (Tangier -> Chefchaouen x2 -> Volubilis/Meknes -> Fes x2 -> Merzouga camp + hotel -> Taouz
// -> Ouzina (off-road) -> Sidi Ali -> Paris-Dakar track -> Zagora -> Draa -> Ouarzazate -> Aït Ben Haddou -> Marrakech x3, ends day 13).
// Template = the finished 7-day Tangier -> Marrakech page. Never re-run on the finished page (it wipes later edits).
// Research (2026-11-16): OpenSEO US "erg chebbi" 1,600, "zagora" 880, "draa valley" 320, "zagora desert" 210, "morocco 2 week itinerary" 90,
// "14 day morocco itinerary" 90 ("13 day morocco itinerary" no data). SERP "13 day Morocco tour from Tangier": kimkim 13-day list (Essaouira,
// Fes, Merzouga), moroccan-tour.com "13 Day Absolute Morocco Tour from Tangier" read in full: Chefchaouen x2 (Cap Spartel, Caves of Hercules,
// Tetouan on day 1), Fes x2, luxury camp + Merzouga hotel, Dades, Marrakech x2, Essaouira, Casablanca, Rabat, Asilah, back to Tangier; guides in
// Chefchaouen, Fes and Marrakech; FAQ = private?, camel ride 40 min-1.5 h + 4x4 alternative, private tent bathroom, luggage on the camel ride,
// best time (spring/autumn), vehicles, diets, ages ("two-night stays in most destinations for a relaxed pace"), pick-up, expenses (meals €5-20).
// Our 12-day Grand Morocco already does Tangier -> Marrakech + Essaouira, so this 13-day keeps the old page's promise (Ouzina, Zagora,
// Ouarzazate) = the deep south: the 6-day / 7-day Ouzina route research applies (the Merzouga -> Ouzina -> Zagora crossing is split with a night
// in Ouzina; specialists Mirage, Family Morocco Tour, Porte de Sahara do the same). Best in spring and autumn (track heat in summer).
// OSRM: Zagora -> Ouarzazate 155 km + Ouarzazate -> Aït Ben Haddou 32 km (t13-d9, 187 km, ~3.7 h).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/7-day-morocco-tour-tangier-to-marrakech.html';
const out = root + 'tours/13-day-tangier-to-marrakech-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/13-day-tangier-to-marrakech-tour.html';
const NAME = '13-Day Morocco Tour from Tangier to Marrakech via the Deep South';
const TITLE = '13-Day Morocco Tour: Tangier to Marrakech via Merzouga | Private';
const DESC = 'A private 13-day Morocco tour from Tangier to Marrakech: two nights in Chefchaouen and Fes, two by the Merzouga dunes, off-road to Ouzina and Zagora on the Paris–Dakar tracks, the Draa Valley, Aït Ben Haddou and three nights in Marrakech.';
const HERO = 'grand-desert-plateau.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="13 day Morocco tour, 2 week Morocco itinerary, Tangier to Marrakech, Chefchaouen, Fes, Merzouga, Erg Chebbi, Ouzina, Zagora, Draa Valley, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/7-day-morocco-tour-tangier-to-marrakech\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Tangier → Cap Spartel → Tetouan → Chefchaouen',
    p: 'Your driver-guide meets you off the ferry at the port, at Tanger Med, at the airport or at your hotel. Cap Spartel, where the Mediterranean meets the Atlantic, the white medina of Tetouan, then up into the green Rif hills to Chefchaouen, the blue town.',
    meta: [['car', 'About 150 km, about 3 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast from day 2']] },
  { t: 'A free day in Chefchaouen',
    p: 'No driving: the quiet blue lanes before the day visitors arrive, the kasbah garden on Outa el Hammam square, sunset from the Spanish Mosque. Ask your driver for a half-day to the Akchour waterfalls if you like to walk.',
    meta: [['car', 'No driving unless you ask'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'South to Volubilis, the Roman town with its mosaics and triumphal arch, and Meknes, with the great gate of Bab Mansour. Your riad in the Fes medina by late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine and a rooftop above the Chouara tanneries. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30: Ifrane, the cedar forest with its Barbary macaques, lunch in Midelt and the palm gorges of the Ziz Valley to Erg Chebbi. A camel ride into the dunes for sunset, dinner and drums by the fire in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding, then a day with no long road: tea with a nomad family, the Gnawa musicians of Khamlia, the black stony plains and the lake of Dayet Srij after a wet winter. A hot shower and a calm night in a hotel by the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Taouz → Ouzina, off-road',
    p: 'South along the dunes to Taouz and its rock carvings, then off the tarmac onto desert tracks to Ouzina, a small oasis by its own quiet dunes, close to the Algerian border. Few cars, wide horizons and an evening in a family guesthouse.',
    meta: [['car', 'About 60 km, half of it off-road'], ['bed', 'Night: Ouzina guesthouse'], ['food', 'Breakfast & dinner']] },
  { t: 'Ouzina → Sidi Ali → the Paris–Dakar tracks → Zagora',
    p: 'The great desert crossing: by 4×4 past the dunes of Ramlia, the dry lake of Maider and the oasis of Sidi Ali, then west on the old Paris–Dakar rally tracks across the stony hamada to Zagora, in the palm groves of the Draa.',
    meta: [['car', 'About 170 km, most of it off-road'], ['bed', 'Night: Zagora'], ['food', 'Breakfast & dinner']] },
  { t: 'Zagora → Draa Valley → Ouarzazate → Aït Ben Haddou',
    p: 'North up the Draa Valley, a 100 km ribbon of palm groves and earthen kasbahs, over the Tizi n’Tinifift pass to Ouarzazate, then on to Aït Ben Haddou for a sunset walk up through the ksar and a night beside it.',
    meta: [['car', 'About 190 km, about 4 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Breakfast & dinner']] },
  { t: 'Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'An early look at the ksar in the morning light, then over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to your Marrakech riad by early afternoon.',
    meta: [['car', 'About 190 km, about 4 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided day in the Red City',
    p: 'With a local Marrakech guide: the Koutoubia, the painted ceilings of the Bahia Palace, the Ben Youssef Madrasa and the souks. Jemaa el-Fnaa comes alive after dark with music and food stalls.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a day of your own',
    p: 'A slow day after the desert: the Majorelle Garden, a hammam, a cooking class, or a day trip to the Atlas villages or Essaouira with your driver. Tell us what you like and we plan it with you.',
    meta: [['car', 'Free day, driver on request'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech, end of the tour',
    p: 'A last breakfast on the roof terrace, then your driver takes you to Marrakech airport, the train station or your next hotel, at the time that suits your flight.',
    meta: [['car', 'Airport or hotel transfer'], ['flag', 'Ends at Marrakech airport or your hotel'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-blue-dress-camel\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The open desert plateau of southern Morocco" loading="eager"`, 'hero img');
rep('<span>7-Day Tangier to Marrakech</span></nav>', '<span>13-Day Tangier to Marrakech</span></nav>', 'crumb');
rep('<h1>7-Day Morocco Tour from Tangier to Marrakech<span class="script">From the Ferry to the Dunes</span></h1>', '<h1>13-Day Morocco Tour from Tangier to Marrakech<span class="script">Through the Deep South</span></h1>', 'h1');
rep('<small>Duration</small><b>7 days / 6 nights', '<small>Duration</small><b>13 days / 12 nights', 'duration');
rep('<small>Departures</small><b>Every day, all year</b>', '<small>Best season</small><b>Spring and autumn</b>', 'season');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Thirteen days from the Strait of Gibraltar to Marrakech by the road few tours take. Two nights in the blue town of Chefchaouen, the Roman ruins of Volubilis and Meknes, two nights in Fes with a guided day in its medina, and two by the great dunes of Erg Chebbi.</p>
          <p class="dt-lead">Then the deep south: off-road to the quiet oasis of Ouzina, across the old Paris–Dakar rally tracks to Zagora, up the palm groves of the Draa Valley to Aït Ben Haddou, and three nights in Marrakech to finish slowly. Your own car and driver-guide all the way.</p>
`, 'overview');
rep('<dt>Desert</dt><dd>2 nights by the dunes</dd>', '<dt>Deep south</dt><dd>Ouzina and Zagora</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Cap Spartel, where two seas meet',
  'Two nights in blue Chefchaouen',
  'A guided day in the Fes medina',
  'Sunset camel ride on Erg Chebbi',
  'Tea with a nomad family',
  'Off-road to the oasis of Ouzina',
  'The Paris–Dakar tracks to Zagora',
  'The palm groves of the Draa Valley',
  'A night beside Aït Ben Haddou',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['chefchaouen.jpg', 'A blue lane in Chefchaouen', 1170, 1560],
  ['fes-royal-palace-gates.jpg', 'The brass gates of the royal palace in Fes', 1300, 866],
  ['merzouga-caravan-sunset.jpg', 'A camel caravan on Erg Chebbi at sunset', 1600, 1066],
  ['desert-acacia-camels.jpg', 'Camels by an acacia tree in the southern desert', 1600, 1066],
  ['ait-ben-haddou-village.jpg', 'The ksar of Aït Ben Haddou', 1600, 1066],
  ['marrakech-medina-arch.jpg', 'An arch in the Marrakech medina', 1600, 1260],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes and Marrakech',
  'Pick-up at Tangier port, airport or hotel',
  'Drop-off at Marrakech airport or your hotel',
  '12 nights as in the table below',
  '12 breakfasts and 5 dinners',
  'Camel ride, sandboarding, 4×4 days',
  'Fuel and motorway tolls',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your ferry or flight time',
  'Days 7–8 are bumpy desert tracks: we stop often',
  'Keep your passport handy near the border',
  'Desert and Atlas nights are cold in winter',
  'Bring cash: few card machines in the south',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Caves of Hercules:</b> small fee',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace:</b> 100 MAD; <b>Ben Youssef Madrasa:</b> about 50 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Tangier to Marrakech by Chefchaouen, Fes and the Sahara, about 1,550 km in 7 days\. <a href="[^"]*"/, '<span>Tangier to Marrakech by Chefchaouen, Fes, Merzouga, Ouzina and Zagora, about 1,500 km in 13 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Chefchaouen,Morocco%7CVolubilis,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7COuzina,Morocco%7CZagora,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const ouz = [A('https://www.tripadvisor.com/Hotel_Review-g3656510-d25429219-Reviews-Auberge_Erg_Ouzina-Ouzina_Meknes_Tafilalet_Region.html', 'Auberge Erg Ouzina'), A('https://www.tripadvisor.com/Hotel_Review-g3656510-d6851049-Reviews-Ouzina_Rimal-Ouzina_Meknes_Tafilalet_Region.html', 'Ouzina Rimal'), A('https://www.tripadvisor.com/Hotel_Review-g3656510-d3224434-Reviews-Auberge_Hotel_Porte_De_Sahara_Ouzina-Ouzina_Meknes_Tafilalet_Region.html', 'Porte de Sahara Ouzina')];
const zag = [A('https://www.tripadvisor.com/Hotel_Review-g304023-d3161742-Reviews-Kasbah_Ziwana-Zagora_Souss_Massa.html', 'Kasbah Ziwana'), A('https://www.tripadvisor.com/Hotel_Review-g304023-d1209859-Reviews-Riad_Lamane-Zagora_Souss_Massa.html', 'Riad Lamane'), A('https://www.booking.com/hotel/ma/kasbah-sirocco-zagora.html', 'Kasbah Sirocco')];
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144 Marrakech'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1–2: Chef&shy;chaouen', chf], ['3–4: Fes', fes], ['5: Desert camp', camp], ['6: Merzouga', mzh], ['7: Ouzina', ouz], ['8: Zagora', zag], ['9: Aït Ben Haddou', abh], ['10–12: Marra&shy;kech', mrk]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers with two weeks who want more than the usual loop',
  'Adventurers happy on a day or two of desert tracks',
  'Anyone who likes to end slowly, with three nights in Marrakech',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Bumpy tracks worry you? The <a href="12-days-grand-morocco.html">12-day Grand Morocco tour</a> stays on paved roads and ends in Essaouira',
  'Only 10 days? The <a href="10-day-morocco-tour-from-tangier.html">10-day tour from Tangier</a> keeps Chefchaouen, Fes and Merzouga',
  'Starting in Marrakech? The <a href="7-day-marrakech-erg-chigaga-merzouga-tour.html">7-day Erg Chigaga &amp; Merzouga tour</a> crosses the same deep south',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 't13-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How rough are the off-road days?', 'Days 7 and 8 are on stony desert tracks, with sandy patches, so the 4×4 rocks and bumps for a few hours. Our drivers know these tracks well and stop often. There is no climbing or walking needed, and children usually love it.'],
  ['Why a night in Ouzina?', 'Merzouga to Zagora by the desert tracks is too long for one comfortable day. A night in Ouzina, a small oasis with its own quiet dunes, splits the crossing and gives you an evening far from any crowd.'],
  ['Is it safe near the Algerian border?', 'Yes. The tracks pass through Moroccan army and police checkpoints, which are routine. Keep your passport handy; your driver does the talking and has made this crossing many times.'],
  ['When is the best time for this tour?', 'Spring and autumn, roughly March to May and September to November. Summer is very hot on the desert tracks, and winter nights are cold in the desert and over the Atlas, though the days are often sunny.'],
  ['Will you meet us at the ferry or the airport?', 'Yes, at any hour. Ferries from Tarifa arrive in the city port of Tangier; from Algeciras at Tanger Med, about 45 minutes away. Your driver-guide waits at the exit with your name and follows any delay.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A half-day hike to the Akchour waterfalls',
  'Upgrade to a luxury camp with heated tents',
  'Tamegroute’s green pottery and old library',
  'Quad biking or a buggy in the dunes (extra cost)',
  'A <a href="marrakech-hot-air-balloon-ride.html">balloon flight</a> or <a href="marrakech-cooking-class.html">cooking class</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="7-Day Morocco Tour from Tangier to Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%207-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'information%20about%20the%2013-Day%20Morocco%20Tour%20from%20Tangier%20to%20Marrakech.', 'wa');
rep('<b>7-Day Tangier to Marrakech</b><span>Free', '<b>13-Day Tangier to Marrakech</b><span>Free', 'mbar');
rep('The 7-day route is a starting point', 'The 13-day route is a starting point', 'banner');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 't13-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Adventure travellers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier, Cap Spartel and Tetouan', 'Chefchaouen (nights 1–2)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 3–4)', 'Ifrane, Midelt and a camel ride to a desert camp (night 5)', 'A day around Merzouga (night 6)', 'Taouz and off-road to Ouzina (night 7)', 'Sidi Ali and the Paris–Dakar tracks to Zagora (night 8)', 'Draa Valley, Ouarzazate and Aït Ben Haddou (night 9)', 'Tizi n’Tichka and Marrakech (nights 10–12)', 'Guided day in Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['From the Ferry to the Dunes', '7 days / 6', '2 nights by the dunes', '7-day route']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
