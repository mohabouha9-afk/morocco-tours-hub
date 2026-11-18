// Build tours/merzouga-camel-trek-2-nights.html (NEW, 2026-11-18): Merzouga 2-night camel trek (owner: "yes, we sell it").
// Demand: "camel trek morocco" 720/month (US, on file); desert-merzouga-tours.com's "2 Nights Camel Trekking in Merzouga" is its
// best seller with 1,618 reviews (more than its overnight 1,137, sunset 897, sunrise 907). Their format: meet ~2 h before sunset,
// 1–1.5 h camel ride to the camp, day 2 = a 4×4 day (nomads, Mfis mines, Khamlia, medfouna lunch), same camp again, back day 3.
// Standard camps share bathrooms, luxury have them in the tent; a free room to leave bags and shower; secure parking.
// Ours differs (owner confirmed a real trek): day 2 goes deeper into Erg Chebbi BY CAMEL, lunch and rest at a nomad family's tent,
// night 2 in a simple nomad camp. Our 4×4 day already exists as its own page. Template = the finished Merzouga camp page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const TPL = 'merzouga-desert-camp-camel-ride.html';
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
const OUT = 'merzouga-camel-trek-2-nights.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = '2-Night Camel Trek in Merzouga';
const TITLE = '2-Night Camel Trek in Merzouga | Private Erg Chebbi Trek &amp; Nomad Camp';
const TITLE_TXT = '2-Night Camel Trek in Merzouga | Private Erg Chebbi Trek & Nomad Camp';
const DESC = 'A private 2-night camel trek in the Erg Chebbi dunes at Merzouga: a night in a desert camp, a day deeper into the dunes by camel with lunch at a nomad family, a night in a simple nomad camp, and free parking for your car.';
const HERO = 'merzouga-camel-caravan-guide.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="camel trek Morocco, Merzouga camel trek, 2 night camel trek Merzouga, Erg Chebbi camel trek, nomad camp Merzouga, Sahara camel trekking">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel guide leading a caravan deep into the Erg Chebbi dunes" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Desert Camp &amp; Camel Ride</span>', '<span>2-Night Camel Trek</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>2-Night Camel Trek in Merzouga<span class="script">Deeper into Erg Chebbi by camel</span></h1>', 'h1');
rep('<b>Overnight, sunset to morning</b>', '<b>3 days, 2 nights</b>', 'f1');
rep('<a href="#stay">Your Camp</a>', '<a href="#stay">Your Nights</a>', 'tab');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Most visitors ride an hour into the dunes and back. On this trek you keep going: a first night in a desert camp, then a whole day by camel through the heart of Erg Chebbi, lunch and tea with a nomad family, and a second night in a small nomad camp far from any road.</p>
          <p class="dt-lead">The same camel guide walks with you all three days. We meet you in Merzouga, keep your car and big bags with us, and agree everything before you arrive: no fees on the way.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Meeting', '1.5 h before sunset', 0], ['Camel trek', 'About 6 hours in all', 1], ['Nights', 'Camp + nomad camp', 2],
    ['Meals', 'Full board on the trek', 3], ['Parking', 'Free in Merzouga', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Two sunsets and two sunrises in the dunes', 'A full day by camel through Erg Chebbi', 'Lunch and mint tea with a nomad family',
  'A night in a remote nomad camp', 'Stars with no lights for miles', 'The same camel guide all three days',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['camel-trek.webp', 'A camel trek crossing the dunes'], ['nomad-tent-tea.jpg', 'Mint tea poured inside a nomad tent'],
  ['camel-dune-ridge.jpg', 'Camels walking along a dune ridge'], ['desert-camp-lanterns.jpg', 'Lanterns lighting a desert camp after dark'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['Day 1, afternoon', 'Meet us in Merzouga', 'About 1.5 hours before sunset: around 16:30 in winter, 19:00 in summer. Your car and big bags stay with us; take a small soft bag for the camel. We confirm the time on WhatsApp the day before.'],
  ['Day 1, sunset', 'Ride to the desert camp', 'About 1.5 hours by camel, with a stop on a high dune for the sunset. Mint tea in camp, dinner, drums by the fire and your own tent for the night.'],
  ['Day 2, morning', 'Deeper into the dunes', 'Sunrise from the dunes, breakfast, then about 2 hours by camel through the heart of Erg Chebbi. Walk beside your camel whenever you want to stretch your legs.'],
  ['Day 2, midday', 'Lunch with a nomad family', 'Lunch and mint tea at a nomad family’s tent, then a long rest in the shade through the hottest hours.'],
  ['Day 2, evening', 'The nomad camp', 'About 1 hour more to a small, simple nomad camp. Sunset from the dunes, dinner by the fire and a sky full of stars, with no lights for miles.'],
  ['Day 3, morning', 'Sunrise and back', 'Sunrise, breakfast and about 1.5 to 2 hours by camel back to Merzouga. Take a shower in our room before you drive on; back around 10:30.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', [
  'A camel for each person, all three days', 'Your own camel guide on the whole trek', 'Night 1 in the desert camp of your choice', 'Night 2 in a simple nomad camp',
  '2 dinners, 2 breakfasts and lunch on day 2', 'Water and mint tea on the trek', 'Sandboards on the dunes', 'A room to leave your bags and shower', 'Free parking while you trek',
].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Transport to Merzouga', 'Drinks at the camp', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'Take one small soft bag: it rides on the camel', 'A scarf, sunglasses and sunscreen for the day on the sand',
  'Summer: we rest in the shade from about 12:00 to 16:00', 'Winter nights drop to about 3–5 °C: bring a warm layer', 'A bad back? A 4×4 can take you between the camps',
].map(t => li(INFO, t)).join(''), 'gtk');

// Your Nights (was Your Camp)
rep('<h2 class="dt-h2" id="dt-st">Your Camp</h2>', '<h2 class="dt-h2" id="dt-st">Your Nights</h2>', 'stay h2');
rep(/(id="dt-st">Your Nights<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1Night 1 is in a comfortable desert camp, about an hour into the dunes, with a bathroom in your tent. Choose your level when you book:$2', 'stay lead');
rep('<p class="dt-acc__note">Or similar, depending on availability. Prefer another camp? Tell us when you book.</p>',
  '<p class="dt-acc__note">Or similar, depending on availability. Night 2 is a small nomad camp deeper in the dunes: Berber tents, thick blankets and a simple shared toilet, no showers. Prefer comfort both nights? Sleep at your first camp again.</p>', 'stay note');

rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private trek, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A luxury tent on night 1', 'A third night and a longer trek', '<a href="merzouga-quad-biking.html">Quad biking</a> before you leave',
  'A <a href="merzouga-medfouna-cooking-class.html">medfouna cooking class</a> on day 2', 'A private dinner on a dune', 'Sunrise photos with your guide on the high ridge',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Travellers who want more than one night in the dunes', 'Walkers and photographers', 'Self-drivers with a few days in Merzouga'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'One night is enough? Our <a href="merzouga-desert-camp-camel-ride.html">desert camp night</a> has the sunset ride and sunrise',
  'Not keen on hours in the saddle? The <a href="merzouga-4x4-desert-day-tour.html">4×4 day tour</a> visits nomads and Khamlia by car',
  'Starting in Marrakech without a car? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> brings you here',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Lukas M.', 'Sarah L.', 'Aisha K.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['How long do we ride each day?', 'About 1.5 hours on day 1, about 3 hours on day 2 split by a long lunch break, and 1.5 to 2 hours on day 3. Your guide sets the pace, and you can walk beside your camel whenever you like.'],
  ['How simple is the nomad camp?', 'Simple on purpose: Berber tents, mattresses and thick blankets, dinner by the fire and a shared toilet, but no showers or electricity. If you would rather have comfort both nights, sleep at your first camp again.'],
  ['What do we do with our luggage?', 'Leave it with us in Merzouga with your car. Take one small soft bag with a warm layer, a toothbrush and your camera: it rides on the camel. You shower in our room when you come back.'],
  ['When is the best time for the trek?', 'October to April is the most pleasant. In summer we start early and rest through the midday heat; in winter the days are mild but the nights are cold.'],
  ['Can children do the trek?', 'Older children who are happy on a camel usually love it. With little ones we suggest one night at the desert camp instead, or a 4×4 between the camps.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your trek.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep('placeholder="Camp level, how you arrive, questions…"', 'placeholder="Camp level for night 1, how you arrive, questions…"', 'ph');
rep(/Up to 24 hours before your night\./g, 'Up to 24 hours before your trek.', 'trust');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$12-Night Camel Trek', 'mbar');
rep('Want to add a desert night to a Morocco tour?', 'Want to add this trek to a Morocco tour?', 'strip');
rep('<h2 id="hcta-title">Book Your Night in the Dunes</h2>', '<h2 id="hcta-title">Book Your Camel Trek</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your dates and how you arrive; we’ll meet you in Merzouga.', 'banner sub');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Adventure travellers', 'Self-drive travellers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your trek.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
ldTrip.name = NAME; void TITLE_TXT;
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Your Camp', 'your night', 'Milky Way', 'second night in the dunes']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
