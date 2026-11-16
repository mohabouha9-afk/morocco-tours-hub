// Build tours/10-day-morocco-tour-from-tangier.html (Tangier -> Asilah -> Chefchaouen -> Volubilis/Meknes -> Fes -> Merzouga -> Todra -> Aït Ben Haddou -> Marrakech)
// Template = the finished 10-day Marrakech -> Tangier page. Never re-run on the finished page (it wipes later edits).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/10-day-morocco-tour-marrakech-to-tangier.html';
const out = root + 'tours/10-day-morocco-tour-from-tangier.html';
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

const URL = 'https://moroccotourshub.com/tours/10-day-morocco-tour-from-tangier.html';
const NAME = '10-Day Morocco Tour from Tangier to Marrakech';
const TITLE = '10-Day Morocco Tour from Tangier | Ferry Pick-up to Marrakech';
const DESC = 'Private 10-day Morocco tour from Tangier, with pick-up at the ferry port: Asilah, two nights in Chefchaouen, Volubilis, Meknes and Fes, two nights by the Merzouga dunes, the Todra Gorge, Aït Ben Haddou and Marrakech.';
const HERO = 'grand-tangier-lighthouse.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Morocco tour from Tangier, Tangier to Marrakech tour, ferry from Spain to Morocco, Chefchaouen, Fes, Sahara desert tour, 10 day Morocco itinerary, private Morocco tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/10-day-morocco-tour-marrakech-to-tangier\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Tangier → Cap Spartel → Asilah → Chefchaouen',
    p: 'Your driver-guide meets you off the ferry at the port, or at Tangier airport or your hotel. Out to Cap Spartel, where the Atlantic meets the Mediterranean, then down the coast to Asilah, a whitewashed fishing town with murals on its walls, for lunch by the sea. Inland through the green Rif hills to Chefchaouen for the evening.',
    meta: [['car', 'About 215 km, about 3.5 hours on the road'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast from day 2']] },
  { t: 'Chefchaouen: a free day in the blue town',
    p: 'A slow day in the lanes of blue houses, the Outa el-Hammam square, the Kasbah garden and the Ras el-Maa spring, with sunset from the Spanish Mosque on the hill. For walkers, your driver-guide can take you to the Akchour waterfalls in the Talassemtane park instead.',
    meta: [['car', 'Free day; Akchour on request'], ['bed', 'Night: Chefchaouen'], ['food', 'Breakfast']] },
  { t: 'Chefchaouen → Volubilis → Meknes → Fes',
    p: 'South through the Rif to Volubilis, the Roman town on the plain, with its mosaics and triumphal arch, then Meknes, the city of Moulay Ismail, for the great gate of Bab Mansour and Place el-Hedim. On to Fes in the late afternoon.',
    meta: [['car', 'About 260 km, about 5 hours on the road'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes: a guided day in the medina',
    p: 'With a local Fes guide: the Bou Inania Madrasa, the Nejjarine fountain, the coppersmiths of Place Seffarine and a rooftop above the Chouara tanneries, ending at the brass gates of the Royal Palace. Shops only if you ask.',
    meta: [['car', 'Day on foot in the medina'], ['bed', 'Night: Fes riad'], ['food', 'Breakfast']] },
  { t: 'Fes → Ifrane → Midelt → Ziz Valley → Merzouga',
    p: 'South over the Middle Atlas around 07:30: Ifrane, the cedar forest of Azrou with its Barbary macaques, and lunch in Midelt. Down the palm gorges of the Ziz Valley to the dunes of Erg Chebbi, where you ride a camel into the sand for sunset. Dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'A full day around Merzouga by 4×4',
    p: 'Sunrise and sandboarding, breakfast, and back by camel or 4×4. A day in the desert at your pace: tea with a nomad family, the Gnawa musicians of Khamlia, the black stony plains and the Rissani market. A hot shower and a calm night in a hotel by the dunes.',
    meta: [['car', '4×4 day around Merzouga'], ['bed', 'Night: Merzouga hotel'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Alnif → Tinghir → Todra Gorge',
    p: 'West along the Jebel Saghro, past Alnif and its trilobite fossils, to the long palm grove of Tinghir. You sleep at the Todra Gorge and walk between its 300 m walls in the late afternoon, when the day visitors have gone.',
    meta: [['car', 'About 220 km, about 4.5 hours on the road'], ['bed', 'Night: Todra Gorge'], ['food', 'Breakfast & dinner']] },
  { t: 'Todra → Dades Gorge → Valley of Roses → Aït Ben Haddou',
    p: 'Up the Dades Gorge to the hairpin bends of Tissadrine, then the Road of a Thousand Kasbahs through the Valley of Roses and Skoura. Past Ouarzazate to Aït Ben Haddou, where you sleep beside the ksar and see it turn red at sunset.',
    meta: [['car', 'About 275 km, about 5.5 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Breakfast & dinner']] },
  { t: 'Aït Ben Haddou → Tizi n’Tichka → Marrakech',
    p: 'An early walk through the quiet lanes of the ksar, then over the High Atlas by the Tizi n’Tichka pass, 2,260 m, and down to Marrakech by lunchtime. The evening is yours on Jemaa el-Fnaa.',
    meta: [['car', 'About 175 km, about 3.5 hours on the road'], ['bed', 'Night: Marrakech riad'], ['food', 'Breakfast']] },
  { t: 'Marrakech: a guided morning and the end of the tour',
    p: 'With a local guide: the Koutoubia, the Bahia Palace, the souks and the Ben Youssef Madrasa. The tour ends at your riad, or we take you to Marrakech airport at the time you need.',
    meta: [['car', 'Morning on foot in the medina'], ['flag', 'Ends at your riad or Marrakech airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/grand-chefchaouen-blue\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The Cap Spartel lighthouse above the Strait near Tangier" loading="eager"`, 'hero img');
rep('<span>10-Day Marrakech to Tangier</span></nav>', '<span>10-Day Tour from Tangier</span></nav>', 'crumb');
rep('<circle cx="12" cy="10" r="2.5"/></svg>Marrakech</span>', '<circle cx="12" cy="10" r="2.5"/></svg>Tangier</span>', 'chip');
rep('<h1>10-Day Morocco Tour from Marrakech to Tangier<span class="script">From the Sahara to the Strait</span></h1>', '<h1>10-Day Morocco Tour from Tangier<span class="script">Off the Ferry, Into Morocco</span></h1>', 'h1');
rep('<small>Route</small><b>Marrakech → Tangier</b>', '<small>Route</small><b>Tangier → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Step off the ferry from Spain and your driver-guide is waiting. Ten days from the Strait of Gibraltar to Marrakech: the white seaside town of Asilah, two slow days in blue Chefchaouen, the Roman ruins of Volubilis and Meknes, and a guided day in the medina of Fes.</p>
          <p class="dt-lead">Then over the Middle Atlas to the dunes of Erg Chebbi for two nights, a camp after a sunset camel ride and a hotel after a day in the desert, back west with a night at the Todra Gorge and another beside the ksar of Aït Ben Haddou, and over the High Atlas to Marrakech. Your own car and driver-guide all the way, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Tangier</dd>', '<dd>Tangier → Marrakech</dd>', 'kf1');
rep('<dt>Blue town</dt><dd>2 nights in Chefchaouen</dd>', '<dt>Ferry</dt><dd>Met at Tangier port</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Cap Spartel and seaside Asilah',
  'Two slow days in blue Chefchaouen',
  'Volubilis and Bab Mansour in Meknes',
  'A guided day in the Fes medina',
  'Sunset camel ride and a night in the dunes',
  'A full day around Merzouga by 4×4',
  'The Todra Gorge in the quiet hours',
  'Sunset over the ksar of Aït Ben Haddou',
  'The souks and palaces of Marrakech',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['chefchaouen.jpg', 'A blue lane in Chefchaouen', 1170, 1560],
  ['fes-medina.jpg', 'A lane in the medina of Fes', 1170, 1560],
  ['sahara-camel-group.jpg', 'Camels resting on the dunes of the Sahara', 1600, 1066],
  ['tinghir-oasis-kasbahs.jpg', 'The palm grove and kasbahs of Tinghir', 1300, 867],
  ['ait-ben-haddou-river-crossing.jpg', 'The river crossing below Aït Ben Haddou', 1300, 866],
  ['jemaa-el-fna-dusk-stalls.jpg', 'Food stalls on Jemaa el-Fnaa at dusk', 1600, 1201],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Local guides in Fes and Marrakech',
  'Pick-up at Tangier port, airport or hotel',
  'Drop-off in Marrakech (riad or airport)',
  '9 nights as in the table below',
  '9 breakfasts and 5 dinners',
  'Camel ride, sandboarding, 4×4 day',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights and ferry tickets', 'Lunches, drinks, city dinners', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Send us your ferry or flight time',
  'Chefchaouen is steep: good shoes',
  'Small bag for the camp; luggage stays in the car',
  'Desert and Atlas nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Caves of Hercules:</b> small fee',
  '<b>Volubilis:</b> about 70–100 MAD',
  '<b>Bou Inania Madrasa, Fes:</b> about 20 MAD',
  '<b>Bahia Palace, Marrakech:</b> 100 MAD',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Tangier by the Sahara and Fes, about 1,600 km in 10 days\. <a href="[^"]*"/, '<span>Tangier to Marrakech by Fes and the Sahara, about 1,600 km in 10 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Tangier,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Asilah,Morocco%7CChefchaouen,Morocco%7CVolubilis,Morocco%7CFes,Morocco%7CMerzouga,Morocco%7CTodra+Gorge,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (one row per night) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const chf = [A('https://www.tripadvisor.com/Hotel_Review-g304013-d1186812-Reviews-Casa_Perleta-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Casa Perleta'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d952618-Reviews-Dar_Echchaouen-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Dar Ech&shy;chaouen'), A('https://www.tripadvisor.com/Hotel_Review-g304013-d3610465-Reviews-Lina_Ryad_Spa-Chefchaouen_Tanger_Tetouan_Al_Hoceima.html', 'Lina Ryad &amp; Spa')];
const fes = [A('https://www.tripadvisor.com/Hotel_Review-g293733-d609566-Reviews-Dar_Seffarine-Fez_Fez_Meknes.html', 'Dar Seffarine'), A('https://www.tripadvisor.com/Hotel_Review-g293733-d1633299-Reviews-Hotel_Spa_Riad_Dar_Bensouda-Fez_Fez_Meknes.html', 'Riad Dar Bensouda'), A('https://www.riadfes.com/', 'Riad Fes')];
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const mzh = [A('https://www.tripadvisor.com/Hotel_Review-g2621869-d6109008-Reviews-Riad_Madu-Hassilabied_Merzouga_Draa_Tafilalet.html', 'Riad Madu'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d522355-Reviews-Hotel_Kasbah_Mohayut-Merzouga_Draa_Tafilalet.html', 'Kasbah Mohayut'), A('https://www.tripadvisor.com/Hotel_Review-g304017-d15671830-Reviews-Kasbah_Hotel_Tombouctou-Merzouga_Draa_Tafilalet.html', 'Kasbah Hotel Tom&shy;bouctou')];
const tod = JSON.parse(fs.readFileSync(SP + 'todra-hotels.json', 'utf8')).map(([u, n]) => A(u, n.replace('Guesthouse Panorama Todra', 'Panorama Todra')));
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
const mrk = [A('https://www.tripadvisor.com/Hotel_Review-g293734-d2324065-Reviews-Riad_144_Marrakech-Marrakech_Marrakech_Safi.html', 'Riad 144 Marrakech'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d609383-Reviews-Riad_Dar_Anika-Marrakech_Marrakech_Safi.html', 'Riad Dar Anika'), A('https://www.tripadvisor.com/Hotel_Review-g293734-d482810-Reviews-Riad_Kniza-Marrakech_Marrakech_Safi.html', 'Riad Kniza')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Night</th><th scope="col">Standard</th><th scope="col">Midrange</th><th scope="col">Luxury</th></tr></thead>
            <tbody>${[['1–2: Chef&shy;chaouen', chf], ['3–4: Fes', fes], ['5: Desert camp', camp], ['6: Merzouga', mzh], ['7: Todra Gorge', tod], ['8: Aït Ben Haddou', abh], ['9: Marrakech', mrk]].map(([n, r]) => `<tr><th scope="row">${n}</th><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers crossing by ferry from Spain',
  'Road-trippers who want the north and the Sahara',
  'Anyone flying home from Marrakech',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Going back to Spain? The <a href="10-day-morocco-tour-marrakech-to-tangier.html">10-day Marrakech to Tangier tour</a> ends at the port',
  'Only have a week? The <a href="7-day-morocco-tour-tangier-to-marrakech.html">7-day Tangier to Marrakech tour</a> takes the same direction',
  'Just a few days in the north? The <a href="5-day-tangier-chefchaouen-fes-tour.html">5-day Tangier, Chefchaouen and Fes tour</a> skips the desert',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'tg10-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Will you meet us when the ferry from Spain arrives?', 'Yes. Ferries from Tarifa arrive at the port in the city of Tangier, and from Algeciras at Tanger Med, about 45 minutes away. Send us your crossing and time; your driver-guide waits at the exit with your name, and we follow any delay.'],
  ['Can we bring our own car on the ferry instead?', 'This tour is in our car with your driver-guide, so you leave your car in Spain. Many travellers park in Tarifa or Algeciras and cross on foot, which is quicker at the border.'],
  ['Why two nights in Chefchaouen?', 'Arriving by ferry often means a slow first morning. With a full free day in Chefchaouen you catch up, see the blue town early and late, and walk up to the Spanish Mosque for sunset or hike to the Akchour waterfalls.'],
  ['Which is the longest drive?', 'Day 5, Fes to Merzouga, about 470 km with stops in Ifrane, the cedar forest and Midelt, timed for the sunset camel ride. The other road days are three to five and a half hours.'],
  ['Can we end in Casablanca instead of Marrakech?', 'Yes. Marrakech to Casablanca is about 2.5 hours by motorway, so we can drop you at Casablanca airport on day 10 or add a night there.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A first night in Tangier if your ferry is late',
  'A guided hike to the Akchour waterfalls',
  'Upgrade to a luxury camp',
  'Quad biking or a buggy in the dunes (extra cost)',
  'A <a href="marrakech-hammam-experience.html">hammam</a> or <a href="marrakech-food-tour.html">food tour</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="10-Day Morocco Tour from Marrakech to Tangier" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%2010-Day%20Morocco%20Tour%20from%20Marrakech%20to%20Tangier.', 'information%20about%20the%2010-Day%20Morocco%20Tour%20from%20Tangier.', 'wa');
rep('<b>10-Day Marrakech to Tangier</b><span>Free', '<b>10-Day Tour from Tangier</b><span>Free', 'mbar');

// ---------- similar ----------
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'tg10-similar.json', 'utf8')), 'similar');

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Road-trippers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tangier port pick-up, Cap Spartel and Asilah', 'Chefchaouen (nights 1–2)', 'Volubilis and Meknes', 'Guided day in the Fes medina (nights 3–4)', 'Ifrane, Midelt and a camel ride to a desert camp (night 5)', 'A day around Merzouga by 4×4 (night 6)', 'Todra Gorge (night 7)', 'Dades Gorge and Aït Ben Haddou (night 8)', 'Tizi n’Tichka pass and Marrakech (night 9)', 'Guided morning in the Marrakech medina'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Tetouan', 'From the Sahara to the Strait', 'Night 9: Tangier']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
