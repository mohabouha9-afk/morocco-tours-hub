// Build tours/toubkal-2-day-trek-from-marrakech.html (NEW, 2026-11-19, owner: "Yes, Toubkal", then "look at what others do").
// Research: .claude/research/toubkal-2day-research.md (Howlanders private 2-day, TourRadar 79556, explore.co.uk; standard product =
// refuge night, mountain guide, mule, cook + meals, transfers; mid-April to mid-November recommended; winter needs crampons).
// Template = the Atlas & Imlil day-trip page. After running: node .claude/tools/route-map.mjs tours/toubkal-2-day-trek-from-marrakech.html toubkal
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const TPL = 'marrakech-atlas-mountains-day-trip.html';
let s = fs.readFileSync(root + 'tours/' + TPL, 'utf8');
function rep(a, b, label) {
  if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
  else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
}
function between(start, end, inner, label) {
  const i = s.indexOf(start); if (i < 0) throw new Error('start ' + label);
  const j = s.indexOf(end, i + start.length); if (j < 0) throw new Error('end ' + label);
  s = s.slice(0, i + start.length) + inner + s.slice(j);
}
const OUT = 'toubkal-2-day-trek-from-marrakech.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Toubkal 2-Day Trek from Marrakech';
const TITLE = 'Toubkal 2-Day Trek from Marrakech | Private Summit Climb with a Mountain Guide';
const DESC = 'Climb Jebel Toubkal (4,167 m), the highest peak in North Africa, in 2 days from Marrakech: private car to Imlil, a local mountain guide, a mule for your bags, a cook, a night in the Toubkal refuge and the summit at dawn.';
const HERO = 'atlas-village-snow-peaks.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
if (/<meta name="keywords"/.test(s)) rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Toubkal 2 day trek, Toubkal trek from Marrakech, climb Mount Toubkal, Jebel Toubkal summit, Toubkal refuge, Imlil trek">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A Berber village below the snowy peaks of the High Atlas" width="1800" height="1200" loading="eager"`, 'hero');
rep(/<span>Atlas Mountains (&amp;|&) Imlil Day Trip<\/span><\/nav>/, '<span>Toubkal 2-Day Trek</span></nav>', 'crumb');
rep(/(<span class="dt-hero__loc"><svg[\s\S]*?<\/svg>)Marrakech(<\/span>)/, '$1High Atlas$2', 'chip');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Toubkal 2-Day Trek from Marrakech<span class="script">To the roof of North Africa</span></h1>', 'h1');
rep('<b>About 8.5 hours</b>', '<b>2 days, 1 night</b>', 'dur');
rep('<b>Your hotel or riad</b>', '<b>Your Marrakech hotel</b>', 'pickup');
rep(/<small>Availability<\/small><b>All year round<\/b>/, '<small>Best season</small><b>Mid-April to mid-November</b>', 'season');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Stand on the summit of Jebel Toubkal, at 4,167 m the highest peak in North Africa, with the whole High Atlas below you. Day one climbs from Imlil through Berber villages to the mountain refuge; day two starts before dawn for the summit, then walks all the way down.</p>
          <p class="dt-lead">It is a hard trek, not a climb: no ropes or skills, but long days and thin air. Your mountain guide sets a steady pace, a mule carries your bags and a cook feeds you, so all you carry is a day pack.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Summit', '4,167 m, at dawn', 0], ['Walking', '5–6 h, then 10–12 h', 1], ['Night', 'Mountain refuge, 3,207 m', 2],
    ['Level', 'Fit hikers, no climbing', 3], ['Guide', 'Local guide included', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k % icons.length]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  '<b>Jebel Toubkal:</b> the highest summit in North Africa',
  '<b>Sunrise on the way up:</b> the Atlas turning pink',
  '<b>Aremd:</b> a Berber village of stone houses and walnut terraces',
  '<b>Sidi Chamharouch:</b> the white shrine on its boulder',
  '<b>The refuge:</b> a night at 3,207 m under the peaks',
  '<b>Your mule and cook:</b> you carry only a day pack',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['atlas-snow.jpg', 'Snow on the High Atlas peaks', 1600, 1066], ['atlas-berber-village.jpg', 'A Berber village in the High Atlas', 1500, 1000],
  ['atlas-snow-autumn.jpg', 'High Atlas peaks with the first snow', 1600, 1066], ['atlas-mountains.jpeg', 'A green valley in the High Atlas', 720, 480],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gal');
rep(/<h2 class="dt-h2" id="dt-pr">Programme<\/h2>/, '<h2 class="dt-h2" id="dt-pr">Itinerary</h2>', 'prog h2');
rep('<a href="#programme">Programme</a>', '<a href="#programme">Itinerary</a>', 'tab prog');
const P = [
  ['Day 1 · 08:00', 'Marrakech to Imlil', 'Pick-up at your hotel and about 1.5 hours by car to Imlil (1,740 m), where you meet your guide, the mule and the cook. Big luggage stays in your Marrakech hotel or in Imlil.'],
  ['Day 1 · 10:00', 'Up the Mizane valley', 'Through Aremd and its walnut terraces, then along the valley to the shrine of Sidi Chamharouch for a cooked lunch, about 2.5 hours.'],
  ['Day 1 · afternoon', 'To the Toubkal refuge', 'About 3 more hours up to the refuge at 3,207 m: in all 5–6 hours and 12 km today. Tea, a hot dinner and an early night in a shared room.'],
  ['Day 2 · about 05:00', 'The summit', 'Breakfast by head torch, then about 3 hours up the south cirque, steep scree and rock with no climbing, to 4,167 m and the view over the whole Atlas.'],
  ['Day 2 · mid-morning', 'Back to the refuge', 'Down the same path in 2–3 hours for lunch at the refuge and a rest; your bags go down with the mule.'],
  ['Day 2 · afternoon', 'Down to Imlil and Marrakech', 'About 4 hours down the valley to Imlil, 10–12 hours of walking today in all, then the car back to your Marrakech hotel in the evening.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private car Marrakech to Imlil and back (see <a href="../index.html#fleet">our fleet</a>)', 'Local professional mountain guide for the whole trek',
  'A mule for your main bags', 'A cook and all meals: lunch and dinner on day 1, breakfast and lunch on day 2', 'One night in the Toubkal refuge (shared room)', 'Drinking water and tea on the trail',
].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Sleeping bag (bring or rent)', 'Winter crampons and ice axe', 'Drinks at the refuge', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'The refuge has shared rooms and bathrooms; hot water is limited',
  'The summit is cold and windy even in summer: bring a warm jacket, hat and gloves', 'At 4,167 m the air is thin: walk slowly and tell your guide about headaches',
  'November to April there is snow: crampons and mountain experience needed', 'Bring boots you have walked in and a head torch',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<div class="dt-card dt-costs"><h3>Costs on the day</h3><ul class="dt-ticks">', '</ul>', [
  '<b>Sleeping bag:</b> about €2.50 a day to rent in Imlil', '<b>Winter gear:</b> crampons about €5 and an ice axe about €3 a day',
  '<b>Drinks:</b> soft drinks and snacks sold at the refuge', '<b>Tips:</b> up to you, for the guide, cook and muleteer', '<b>Cash:</b> bring dirhams, there is no cash machine on the trail',
].map(t => li(COIN, t)).join(''), 'costs');
rep('<h3 class="dt-h3">Day Trip Map</h3>', '<h3 class="dt-h3">Trek Map</h3>', 'map h3');
rep(/(<p class="dt-map__note">[\s\S]*?<span>)[\s\S]*?(<\/span><\/p>)/, '$1Imlil is about 65 km south of Marrakech, 1.5 hours by car; the trail between Aremd and the refuge is drawn approximately. <a href="https://www.openstreetmap.org/?mlat=31.0598&amp;mlon=-7.9149#map=12/31.0950/-7.9200" target="_blank" rel="noopener">Open the larger map</a>$2', 'map note');

rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private trek, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A 3-day version: a first night in Imlil for an easier climb', 'A private room at the refuge, when one is free',
  'A night in Imlil after the summit instead of driving back', 'A winter trek with crampons, for experienced hikers',
  'Vegetarian or other diets for the cook', 'Start with our <a href="marrakech-atlas-mountains-day-trip.html">Atlas &amp; Imlil day trip</a> to test your legs',
].map(t => li(TICK, t)).join(''), 'custom');
rep('<h3 class="dt-h3">Is this trip for you?</h3>', '<h3 class="dt-h3">Is this trek for you?</h3>', 'fit h3');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Fit hikers who want a real summit', 'Travellers short on time: the peak in 2 days', 'Groups of friends ticking off a big climb'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want mountains without a long climb? Our <a href="marrakech-atlas-mountains-day-trip.html">Atlas &amp; Imlil day trip</a> has walks set to you',
  'New to altitude? Ask for the 3-day version, with a night in Imlil first',
  'Prefer valleys and waterfalls? Our <a href="marrakech-ourika-valley-day-trip.html">Ourika Valley day trip</a> is gentle',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['James T.', 'Chloé D.', 'Aisha K.'].map(n => { const r = allRev.find(x => x.includes('<b>' + n + '</b>')); if (!r) throw new Error('rev ' + n); return r; }).join(''), 'rev');
const FAQ = [
  ['How fit do I need to be?', 'Fit enough to walk uphill for 5–6 hours one day and 10–12 hours the next. No climbing skills are needed, but regular hiking helps a lot; if you are unsure, the 3-day version is easier.'],
  ['Will I get altitude sickness?', 'Some people feel headaches or tiredness above 3,000 m. Your guide keeps a slow pace and watches the group; if it gets worse, you turn back, which is the only real cure. A night in Imlil first (3-day version) helps.'],
  ['Do we need a guide?', 'Yes. A guide is required on the Toubkal trail, and yours is included: a local professional mountain guide who stays with you from Imlil to the summit and back.'],
  ['What is the refuge like?', 'A stone mountain hut with shared rooms of bunk beds, shared bathrooms, a heated dining room and hot meals. Hot water is limited, and a sleeping bag or liner is useful.'],
  ['Can we do it in winter?', 'From about November to April the summit is under snow and ice, so crampons, an ice axe and some mountain experience are needed. We check conditions before your date; mid-April to mid-November is easiest.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before the trek.</p></div></details>\n`, 'faq');
rep('aria-label="Book this day trip', 'aria-label="Book this trek', 'aria');
rep('dt-book__label">Private day trip', 'dt-book__label">Private trek', 'label');
rep('<label for="dt-trip">Day trip', '<label for="dt-trip">Trek', 'form label');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep(/placeholder="[^"]*"><\/textarea>/, 'placeholder="Hotel, hiking experience, questions…"></textarea>', 'ph');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Toubkal 2-Day Trek', 'mbar');
rep('dt-oth">Other Day Trips', 'dt-oth">You May Also Like', 'others h2');
rep('<a href="#others">Other Day Trips</a>', '<a href="#others">You May Also Like</a>', 'tab others');
// You May Also Like: Atlas day trip, Ourika, Ouzoud (cards from day-trips.html)
const dtp = fs.readFileSync(root + 'day-trips.html', 'utf8');
const card = id => { const i = dtp.indexOf(`<li id="${id}">`); if (i < 0) throw new Error('card ' + id); return dtp.slice(dtp.indexOf('<article', i), dtp.indexOf('</article>', i) + 10).replace(/href="tours\//g, 'href="'); };
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', ['dt-imlil', 'dt-ourika', 'dt-ouzoud'].map(x => `        <li>${card(x)}</li>\n`).join(''), 'others');
rep('dtl-comb">Confused or want to add a day trip to a tour?', 'dtl-comb">Want to add this trek to a Morocco tour?', 'strip');
rep('<h2 id="hcta-title">Book This Day Trip on Your Date</h2>', '<h2 id="hcta-title">Book Your Toubkal Trek</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your dates and your hiking experience; we arrange the guide, the mule and the refuge.', 'banner sub');

const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Hikers', 'Adventure travellers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before the trek.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>\n<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld trip');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['day trip', 'Day trip', 'Asni market', 'Kasbah du Toubkal', 'mule ride', 'Tizi n']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
