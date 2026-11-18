// Build tours/3-day-marrakech-erg-chigaga-tour.html (NEW 2026-11-18, owner picked it from the roadmap: "3 day chigaga tour").
// Template = the finished 3-day Fes -> Marrakech page (3 days, 2 nights, 3-column table). Never re-run on the finished page.
// Research (2026-11-18; OpenSEO out of credits, "erg chigaga" ~480/month US on file from the 4-day research):
//   Google page 1 = Tripadvisor "3 Days From Marrakech To Erg Chigaga" (Marrakech - Aït Ben Haddou - Draa - M'Hamid / M'Hamid - Erg Chigaga /
//   Erg Chigaga - Foum Zguid - Taznakht - Marrakech), bookmundi, TourRadar, desertmajesty, atlasmountainsguide (night 1 Agdz), mouhoutours (Agdez),
//   atlastrekadventure, merzouga-tours. GetYourGuide "From Marrakesh: 3-Day Erg Chegaga" 4.9 / 17 read in full: reviews "you only really get
//   into the desert on the second day", "be prepared for long drives", "go for this tour over the cheaper minivan option: minivans just can't get
//   as deep into the desert as the Jeep can", ostriches/antelopes seen, a rug shop stop on day 3 (we: no shop stops).
//   OSRM: d1 Marrakech -> Aït Ben Haddou -> Ouarzazate -> Zagora 360 km (7.1 h); d2 Zagora -> Tamegroute -> M'Hamid 98 km (ec4-d2) + ~50 km off-road;
//   d3 ~100 km off-road (Iriqui) + Foum Zguid -> Taznakht -> Marrakech 314 km. Pick-up 07:00, camel ~1 h at sunset, camps/Zagora hotels = same as ec4.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/3-day-fes-to-marrakech-desert-tour.html';
const out = root + 'tours/3-day-marrakech-erg-chigaga-tour.html';
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

const FILE = '3-day-marrakech-erg-chigaga-tour.html';
const URL = 'https://moroccotourshub.com/tours/' + FILE;
const NAME = '3-Day Marrakech to Erg Chigaga Desert Tour';
const TITLE = '3-Day Erg Chigaga Desert Tour from Marrakech | Private 4×4';
const DESC = 'Private 3-day tour from Marrakech to the Erg Chigaga dunes: Aït Ben Haddou and the Draa Valley, off-road by 4×4 from M’Hamid to a camp in the dunes with a sunset camel ride, then across the Iriqui dry lake and back to Marrakech.';
const HERO = 'desert-camel-acacia-tree.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="3-day Erg Chigaga tour, Erg Chigaga desert tour from Marrakech, Marrakech to Erg Chigaga, Erg Chegaga, M’Hamid, Erg Chigaga camp, private 4x4 desert tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/3-day-fes-to-marrakech-desert-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

// ---------- hero ----------
rep('<img src="/assets/images/merzouga-caravan-sunset.jpg" alt="A camel caravan on the Erg Chebbi dunes at sunset" loading="eager"', `<img src="/assets/images/${HERO}" alt="A camel under an acacia tree in the deep south" loading="eager"`, 'hero img');
rep('<span>3-Day Fes to Marrakech Desert Tour</span></nav>', '<span>3-Day Erg Chigaga Desert Tour</span></nav>', 'crumb');
rep('<h1>3-Day Fes to Marrakech Desert Tour<span class="script">The Sahara on Your First Night</span></h1>', '<h1>3-Day Marrakech to Erg Chigaga Desert Tour<span class="script">Off-Road to the Wildest Dunes</span></h1>', 'h1');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Fes(<\/span>)/, '$1Marrakech$2', 'chip');
rep('<small>Route</small><b>Fes → Marrakech</b>', '<small>Route</small><b>Marrakech round trip</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Erg Chigaga is the Sahara the way you imagine it: a sea of dunes at the end of the road, with no village and no tarmac, reached only by 4×4. In three days you cross the High Atlas, walk through Aït Ben Haddou, follow the palm groves of the Draa Valley to the edge of the desert and leave the road at M’Hamid for the dunes.</p>
          <p class="dt-lead">A camel takes you to the top of a dune for sunset, the camp waits with dinner and drums, and the night sky is darker than anywhere near a town. On the way back you cross the Iriqui dry lake on the old Paris–Dakar track. Your own 4×4 and driver-guide the whole way, stops when you want them and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dt>Start &amp; end</dt><dd>Fes → Marrakech</dd>', '<dt>Start &amp; end</dt><dd>Marrakech (round trip)</dd>', 'kf1');
rep(/(<dt>)Desert night(<\/dt><dd>)Camp in the dunes(<\/dd>)/, '$1Desert$2Off-road by 4×4$3', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The Tizi n’Tichka pass over the High Atlas',
  'Aït Ben Haddou on foot',
  'The palm groves of the Draa Valley',
  'Off-road by 4×4 from M’Hamid',
  'Sunset camel ride in Erg Chigaga',
  'A camp alone in the dunes',
  'Sunrise and sandboarding',
  'The Iriqui dry lake',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-kasbah-walk.jpg', 'Walking up through the ksar of Aït Ben Haddou', 1300, 866],
  ['tinghir-oasis.jpg', 'A palm oasis in the south of Morocco', 1500, 1000],
  ['desert-mesa.jpg', 'Open desert on the road south', 1600, 1066],
  ['camel-dune-ridge.jpg', 'Camels resting in the desert', 1170, 780],
  ['dune-ridge-solo.jpg', 'A lone walker on an empty dune crest', 1170, 1560],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp at night', 1600, 1067],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
const DAYS = [
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou → Draa Valley → Zagora',
    p: 'Pick-up at your riad or hotel around 07:00. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, to Aït Ben Haddou and a walk up through the ksar with your driver-guide. Lunch in Ouarzazate, then over the Tizi n’Tinifift pass to Agdz and down the Draa Valley, a hundred kilometres of date palms and earthen kasbahs, to your hotel in Zagora.',
    meta: [['car', 'About 360 km, about 7 hours on the road'], ['bed', 'Night: hotel in Zagora'], ['food', 'Dinner & breakfast']] },
  { t: 'Zagora → Tamegroute → M’Hamid → off-road → Erg Chigaga',
    p: 'A short morning to Tamegroute, its green pottery and its old Koranic library, then M’Hamid, the last village at the end of the road. Here the tarmac stops: about 50 km by 4×4 across stony plains and small oases, with a picnic lunch on the way. A camel takes you up the dunes for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 100 km of road, then about 50 km off-road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp in Erg Chigaga'], ['food', 'Dinner & breakfast']] },
  { t: 'Sunrise → Iriqui dry lake → Foum Zguid → Taznakht → Marrakech',
    p: 'Up early for the sunrise and a try at sandboarding, then breakfast and back in the 4×4. About 100 km off-road across the flat bed of the Iriqui lake on the old Paris–Dakar track to Foum Zguid, then the road by Taznakht, the carpet town, and over the High Atlas to Marrakech in the early evening, at your hotel, riad or the airport.',
    meta: [['car', 'About 100 km off-road, then about 315 km of road'], ['flag', 'Drop-off at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up and drop-off at your Marrakech riad or hotel',
  '1 night in a Zagora hotel, 1 night in a desert camp',
  '2 dinners and 2 breakfasts',
  'Camel ride at sunset and sandboards',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Small bag for the camp; luggage stays in the 4×4',
  'Bumpy desert track? Your driver takes it slowly',
  'Car-sick? Sit in front on the mountain bends',
  'Winter nights are near freezing: bring a warm layer',
  'Bring cash: few card machines in the south',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Tamegroute library:</b> a small donation',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Fes to Marrakech by the Sahara, about 1,060 km in 3 days\. <a href="[^"]*"/, '<span>Marrakech to Erg Chigaga and back, about 920 km in 3 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Ait+Ben+Haddou,Morocco%7CZagora,Morocco%7CM%27Hamid+El+Ghizlane,Morocco%7CFoum+Zguid,Morocco%7CTaznakht,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (same places as the 4-day Erg Chigaga tour) ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const Z = [A('https://www.tripadvisor.com/Hotel_Review-g304023-d3161742-Reviews-Kasbah_Ziwana-Zagora_Souss_Massa.html', 'Kasbah Ziwana'), A('https://www.tripadvisor.com/Hotel_Review-g304023-d1209859-Reviews-Riad_Lamane-Zagora_Souss_Massa.html', 'Riad Lamane'), A('https://www.booking.com/hotel/ma/kasbah-sirocco-zagora.html', 'Kasbah Sirocco')];
const C = [A('https://www.tripadvisor.com/Hotel_Review-g12912000-d15122198-Reviews-Camp_Al_Koutban-El_Gouera_Souss_Massa.html', 'Camp Al Koutban'), A('https://www.tripadvisor.com/Hotel_Review-g12912000-d17613059-Reviews-Desert_Luxury_Camp_Erg_Chigaga-El_Gouera_Souss_Massa.html', 'Desert Luxury Camp Erg Chigaga'), A('https://www.tripadvisor.com/Hotel_Review-g664990-d1965447-Reviews-Erg_Chigaga_Luxury_Desert_Camp-M_Hamid_Souss_Massa.html', 'Erg Chigaga Luxury Desert Camp')];
rep('<thead><tr><th scope="col">Options</th><th scope="col">Night 1: Desert camp</th><th scope="col">Night 2: Dades Valley</th></tr></thead>', '<thead><tr><th scope="col">Options</th><th scope="col">Night 1: Zagora</th><th scope="col">Night 2: Erg Chigaga camp</th></tr></thead>', 'thead');
between('<tbody>', '</tbody>', ['Standard', 'Midrange', 'Luxury'].map((n, i) => `<tr><th scope="row">${n}</th><td>${Z[i]}</td><td>${C[i]}</td></tr>`).join(''), 'tbody');
rep(/(<p class="dt-lead">)We carefully select comfortable, authentic accommodation[^<]*(<\/p>)/, '$1A hotel in the Draa Valley, then a camp alone in the dunes. Choose the comfort level that suits you; the standard camp has shared bathrooms, the other two have one in your tent:$2', 'acc intro');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers who want quiet, empty dunes',
  'Adventurers happy on a bumpy desert track',
  'Photographers: oases, dunes and the dry lake',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Long drives worry you? The <a href="4-day-marrakech-erg-chigaga-tour.html">4-day Erg Chigaga tour</a> adds a night in Ouarzazate',
  'Want the tall golden dunes? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> reaches Erg Chebbi',
  'Only have two days? The <a href="2-day-marrakech-to-zagora-desert-tour.html">2-day Zagora tour</a> stays on paved roads',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews: Sarah L., Lukas M., Aisha K. ----------
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Sarah L.', 'Lukas M.', 'Aisha K.'].map(n => { const r = allRev.find(x => x.includes('<b>' + n + '</b>')); if (!r) throw new Error('rev ' + n); return r; }).join(''), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is three days enough for Erg Chigaga?', 'Yes, for one night in the dunes. Day 1 brings you to the Draa Valley, you reach the dunes on day 2 in time for sunset, and day 3 is the drive home. If you want a slower return, the 4-day tour adds a night in Ouarzazate.'],
  ['How rough is the off-road drive?', 'About 50 km on day 2 and 100 km on day 3, on sandy and stony tracks with some bumps. Your driver knows the desert and takes it slowly; tell us about back problems and we plan more stops.'],
  ['Why a 4×4 and not a minivan?', 'There is no road after M’Hamid. Minivans stop at camps near the village; only a 4×4 reaches the big dunes and crosses the dry lake on the way back. Your 4×4 stays with you all three days.'],
  ['Erg Chigaga or Merzouga?', 'Erg Chigaga is wilder and quieter: no village, no road and fewer camps, with dunes of about 50–60 m. Merzouga’s Erg Chebbi is taller, about 150 m, and easier to reach on paved roads. Choose Chigaga for the adventure, Merzouga for the biggest dunes.'],
  ['How long is the last day?', 'The longest of the three: about 100 km off-road and 315 km of road, with stops for lunch and photos. We leave after breakfast and reach Marrakech in the early evening.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury camp',
  'A sunrise camel ride before breakfast',
  'A quad ride in the dunes (extra)',
  'The Atlas film studios in Ouarzazate',
  'A <a href="marrakech-medina-guided-tour.html">medina tour</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="3-Day Fes to Marrakech Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%203-Day%20Fes%20to%20Marrakech%20Desert%20Tour.', 'information%20about%20the%203-Day%20Marrakech%20to%20Erg%20Chigaga%20Desert%20Tour.', 'wa');
rep('<b>3-Day Fes to Marrakech</b><span>Free', '<b>3-Day Erg Chigaga Tour</b><span>Free', 'mbar');

// ---------- similar ----------
const si = s.indexOf('<ul class="htours__list dt-others__list">\n'); const sj = s.indexOf('        <li class="htours__end">', si);
s = s.slice(0, si + '<ul class="htours__list dt-others__list">\n'.length) + JSON.parse(fs.readFileSync(SP + 'ec3-similar.json', 'utf8')) + s.slice(sj);

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Adventure travellers', 'Couples', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tizi n’Tichka pass', 'Aït Ben Haddou', 'Draa Valley and Zagora', 'Tamegroute', 'M’Hamid and the off-road drive', 'Sunset camel ride and camp in Erg Chigaga', 'Iriqui dry lake', 'Foum Zguid and Taznakht', 'Back to Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

const main = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Fes', 'Merzouga camp', 'Dades', 'Todra', 'Midelt', 'Ifrane', 'Erg Chebbi dunes', '07:30']) if (main.includes(bad)) console.warn('LEFTOVER:', bad, main.split(bad).length - 1);
fs.writeFileSync(out, s);
console.log('written', s.length);
