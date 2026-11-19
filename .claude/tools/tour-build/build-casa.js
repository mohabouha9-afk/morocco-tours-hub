// Build tours/hassan-ii-mosque-casablanca-city-tour.html (NEW, 2026-11-19, owner picked it from the demand list).
// Research: .claude/research/casablanca-hassan2-research.md (official mosque times/prices fmh2.ma, Headout half-day 4.4/119,
// Tours by Locals 4.7/33, layover advice GoWithGuide). Template = the Majorelle half-day page (car + walks, fees paid on site).
// No gallery: only one Casablanca photo in assets and the owner declined downloads (2026-11-19).
// After running: node .claude/tools/route-map.mjs tours/hassan-ii-mosque-casablanca-city-tour.html casa
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const TPL = 'majorelle-garden-palaces-marrakech-tour.html';
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
const OUT = 'hassan-ii-mosque-casablanca-city-tour.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Hassan II Mosque & Casablanca City Tour';
const TITLE = 'Hassan II Mosque &amp; Casablanca City Tour | Private Half Day with a Local Guide';
const DESC = 'Private half-day tour of Casablanca: a guided visit inside the Hassan II Mosque, the old medina and Sqala, Art Deco downtown, the Habous quarter and the Corniche, with a local guide and your own car. Hotel, port or airport pick-up.';
const HERO = 'casablanca.webp';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
if (/<meta name="keywords"/.test(s)) rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Hassan II Mosque tour, Casablanca city tour, Casablanca private tour, Hassan II Mosque guided visit, Casablanca half day tour, Casablanca layover tour">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The Hassan II Mosque and its minaret by the Atlantic in Casablanca at dusk" width="4032" height="3024" loading="eager"`, 'hero');
// menu: this is a Casablanca tour, not a Marrakech day trip
rep('<a href="../day-trips.html" class="is-active">Day Trips</a>', '<a href="../day-trips.html" class="">Day Trips</a>', 'menu dt');
rep('<a href="../tours/index.html" class="">Tours<svg', '<a href="../tours/index.html" class="is-active">Tours<svg', 'menu tours');
rep('<a href="../day-trips.html">Day Trips</a><span class="sep">›</span><span>Majorelle &amp; Palaces</span>',
  '<a href="morocco-tours-from-casablanca.html">Casablanca</a><span class="sep">›</span><span>Hassan II Mosque &amp; City Tour</span>', 'crumb');
rep(/(<span class="dt-hero__loc"><svg[\s\S]*?<\/svg>)Marrakech(<\/span>)/, '$1Casablanca$2', 'chip');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Hassan II Mosque &amp; Casablanca City Tour<span class="script">The great mosque on the Atlantic</span></h1>', 'h1');
rep('<b>About 5 hours (morning)</b>', '<b>About 5 hours</b>', 'dur');
rep('<b>Your hotel or riad</b>', '<b>Hotel, port or airport</b>', 'pickup');

// No gallery (one Casablanca photo only)
rep(/\s*<section class="dt-block" id="gallery"[\s\S]*?<\/section>/, '', 'gallery');
rep('<a href="#gallery">Gallery</a>', '', 'tab gallery');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Step inside the Hassan II Mosque, the great mosque on the Atlantic with a 210 m minaret and room for 25,000 worshippers, then see the city around it: the old medina, the white Art Deco downtown, the Habous quarter and the ocean road.</p>
          <p class="dt-lead">Visits inside run only at set times, so we plan your morning around one. Your guide explains the mosque before you go in, your car waits at each stop, and there are no shop stops. Ideal on arrival day, before a tour or on a long layover.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Times', '08:30 to about 13:30', 0], ['Mosque', 'Guided visit inside', 1], ['Sights', 'Mosque, medina, Habous', 2],
    ['Getting around', 'Private car, short walks', 3], ['Guide', 'Local guide included', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  '<b>Hassan II Mosque:</b> carved cedar, marble and a roof that opens to the sky',
  '<b>The esplanade:</b> the minaret above the waves',
  '<b>Old medina:</b> quiet lanes and the Sqala sea bastion',
  '<b>Downtown:</b> Art Deco façades around Place Mohammed V',
  '<b>Habous quarter:</b> arcades, olive sellers and almond pastries',
  '<b>The Corniche:</b> the ocean road to Aïn Diab',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
const P = [
  ['08:30', 'Pick-up at your hotel', 'Your driver and guide meet you at your hotel, the port or the airport. We confirm the time on WhatsApp the day before.'],
  ['09:00', 'Inside the Hassan II Mosque', 'A mosque guide leads the visit of the prayer hall and the ablution hall below, about 45–60 minutes; your guide gets your tickets and explains the story first.'],
  ['10:15', 'The esplanade and the ocean', 'Walk the huge square and the sea wall around the minaret, with time for photos, before the car takes you to the old town.'],
  ['10:45', 'Old medina and the Sqala', 'A short walk through the lanes of the old medina, past Bab Marrakech, to the cannons of the 18th-century Sqala bastion.'],
  ['11:30', 'Art Deco downtown', 'Place Mohammed V and its white 1920s–30s buildings, the Central Market and the Sacré-Cœur cathedral, mostly from the car with short stops.'],
  ['12:15', 'Habous quarter, then lunch', 'Arcaded lanes built in the 1930s, olive and spice sellers, almond pastries, the gates of the Royal Palace; then the Corniche for lunch or back to your hotel around 13:30.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private air-conditioned car and driver all morning (see <a href="../index.html#fleet">our fleet</a>)', 'Local professional guide',
  'Pick-up at your hotel, the port or the airport', 'Tickets bought for you at the mosque desk', 'Water in the car',
].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Mosque entry ticket (see below)', 'Lunch', 'Tips'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'Cover shoulders and knees: shorts and sleeveless tops are refused at the mosque',
  'Shoes come off inside; you get a bag to carry them', 'Fridays and Ramadan have fewer visit times: we plan around them',
  'No headscarf needed, but a light scarf is handy', 'Wheelchair or stroller? Tell us and we plan around the steps',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<div class="dt-card dt-costs"><h3>Costs on the day</h3><ul class="dt-ticks">', '</ul>', [
  '<b>Hassan II Mosque:</b> 140 MAD (students 70 MAD, children over 6: 30 MAD, under 6 free)',
  '<b>Lunch:</b> about €10–15, fish by the ocean or a café downtown', '<b>All other sites are free</b>',
  '<b>Tips:</b> up to you', '<b>Cash:</b> the mosque desk takes dirhams',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/(<p class="dt-map__note">[\s\S]*?<span>)[\s\S]*?(<\/span><\/p>)/, '$1The mosque, the old medina, downtown and the Habous are a few minutes apart by car; the Corniche is about 5 km along the ocean. <a href="https://www.openstreetmap.org/#map=14/33.5960/-7.6300" target="_blank" rel="noopener">Open the larger map</a>$2', 'map note');

rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private tour, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'An afternoon version with the 15:00 mosque visit', 'A layover version: airport pick-up and drop-off',
  'Add the Museum of Moroccan Judaism', 'Lunch at Rick’s Café or fish at the port',
  'Start your Morocco tour straight after: see <a href="morocco-tours-from-casablanca.html">our tours from Casablanca</a>', 'Child seats on request',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Your first day in Morocco, before a tour', 'Cruise and layover guests with a few hours', 'Architecture lovers: the mosque and Art Deco'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Starting a tour from Casablanca? The <a href="7-day-morocco-tour-from-casablanca.html">7-day tour from Casablanca</a> already visits the mosque on day 1',
  'Looking for souks and old-city life? Our <a href="marrakech-medina-guided-tour.html">Marrakech medina tour</a> is all about them',
  'Only a short layover? Under about 7 hours between flights, there is not enough time to leave the airport',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['James T.', 'Chloé D.', 'Aisha K.'].map(n => { const r = allRev.find(x => x.includes('<b>' + n + '</b>')); if (!r) throw new Error('rev ' + n); return r; }).join(''), 'rev');
const FAQ = [
  ['Who guides us inside the mosque?', 'Visitors can only go inside with a guide from the mosque itself, in English, French, Spanish or German. Your own guide buys the tickets, tells you the story before you go in and waits for you at the exit.'],
  ['Can we visit on a Friday?', 'Yes, but Friday has fewer visit times (09:00, 10:00 and 15:00), and during Ramadan the times change. Tell us your date and we book the morning around the next visit.'],
  ['Can we do it on a layover?', 'Yes, with about 7 hours or more between flights. The airport is about 35 km from the city (45–60 minutes); we pick you up at arrivals, plan the mosque and bring you back in time for check-in.'],
  ['Is Casablanca worth a day?', 'Half a day is right for most travellers: the mosque is the star, and the medina, Art Deco downtown and the Habous fill the rest of the morning. If you have more time, Rabat is an hour away.'],
  ['Will we stop at shops?', 'No. The Habous has olive sellers and pastry shops, and you can buy if you wish; nobody takes you to a shop you did not ask for.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1Hassan II Mosque &amp; Casablanca City Tour"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep('placeholder="Hotel, questions, special requests…"', 'placeholder="Hotel or flight times, questions…"', 'ph');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Hassan II Mosque &amp; City Tour', 'mbar');

// You May Also Like: 3 Casablanca tours (cards from the Casablanca city page)
const city = fs.readFileSync(root + 'tours/morocco-tours-from-casablanca.html', 'utf8');
const card = slug => { const i = city.indexOf(`<article class="htour"><a class="htour__link" href="../tours/${slug}">`); if (i < 0) throw new Error('card ' + slug); return city.slice(i, city.indexOf('</article>', i) + 10); };
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">',
  ['7-day-morocco-tour-from-casablanca.html', '8-day-morocco-imperial-cities-sahara-tour.html', '10-day-morocco-tour-casablanca-round.html'].map(x => `        <li>${card(x)}</li>\n`).join(''), 'others');
rep('<p class="dt-others__all"><a href="../day-trips.html">View all day trips</a></p>', '<p class="dt-others__all"><a href="morocco-tours-from-casablanca.html">View all tours from Casablanca</a></p>', 'all');
rep(/(<li class="htours__end"><a class="htour-more" href=")\.\.\/day-trips\.html(">[\s\S]*?<span class="htour-more__title">)[^<]*/, "$1morocco-tours-from-casablanca.html$2Tours from Casablanca", 'end');
rep('<h2 id="hcta-title">Book Your Majorelle Morning</h2>', '<h2 id="hcta-title">Book Your Casablanca Morning</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date; we pick you up and plan the mosque visit for you.', 'banner sub');

const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Cruise passengers', 'Layover travellers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>\n<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld trip');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Majorelle', 'Bahia', 'Marrakech', 'Saadian', 'Kasbah', 'riad']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
