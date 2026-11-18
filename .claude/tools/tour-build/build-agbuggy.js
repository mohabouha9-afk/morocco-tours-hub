// Build tours/agafay-desert-buggy-tour.html (NEW, 2026-11-18): Agafay buggy tour from Marrakech. Template = the Agafay quad biking page.
// Research (WebSearch 2026-11-18, OpenSEO out of credits): buggies are mostly 2-seaters (4-seat Can-Am for families), 1 or 2 hours;
// most Agafay operators want drivers 18+ with a driving licence (quad-marrakech.ma, marrakechquadbiking.com), one says 16; passengers
// most often from 6 (quad-marrakech.ma). Demand: Tripadvisor full-day buggy 5.0/135, GetYourGuide buggy + camel + dinner 4.9/97,
// buggy + dinner show 4.2/125, dune buggy 4.4/73. Worries in reviews: only ~1 hour of driving, dust, worn helmets, price for non-drivers.
// Route/map, times (09:00 or 15:00), mint tea in a Berber village and the lake viewpoint reused from our quad page.
// Photos: no Agafay buggy photo in assets; hero = merzouga-buggy-driver.jpg (Pexels, Morocco), no place named in alt texts.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const TPL = 'agafay-desert-quad-biking.html';
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
const OUT = 'agafay-desert-buggy-tour.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Agafay Desert Buggy Tour';
const TITLE = 'Agafay Desert Buggy Tour from Marrakech | Private Buggy for Two';
const DESC = 'Private buggy tour in the Agafay desert, 40 minutes from Marrakech: drive a 2-seat buggy side by side behind your guide, 1 or 2 hours over the hills, mint tea in a Berber village and hotel pick-up. Family buggies too.';
const HERO = 'merzouga-buggy-driver.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Agafay buggy, Agafay buggy tour, buggy Marrakech, dune buggy Marrakech, Agafay desert buggy, family buggy Marrakech">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A driver in a buggy with helmet and seat belt on" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Quad Biking</span>', '<span>Buggy Tour</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Agafay Desert Buggy Tour<span class="script">Side by side over the desert hills</span></h1>', 'h1');
rep('<b>3 to 4 hours (morning or afternoon)</b>', '<b>3 to 4 hours (morning or afternoon)</b>', 'f1');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Drive a buggy over the stony Agafay hills with your partner, a friend or your child beside you, following your guide on the desert tracks to a Berber village and the viewpoints over the High Atlas, 40 minutes from Marrakech.</p>
          <p class="dt-lead">Choose one hour on the tracks, or two hours with mint tea in a Berber village and the view over the Lalla Takerkoust lake on clear days. Roll bars, seat belts and helmets keep everyone safe, and family buggies take up to four. Your buggy is yours alone, never shared with strangers.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Times', 'Morning or afternoon', 0], ['Drive', '40 min from Marrakech', 1], ['Buggy ride', '1 or 2 hours', 2],
    ['Seats', '2, or 4 for families', 3], ['Driver', '18+ with a licence', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k % icons.length]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Side by side over the desert hills', 'The High Atlas on the horizon', 'Mint tea in a Berber village',
  'The lake viewpoint on clear days', 'Golden light on the afternoon drive', 'Seat belts and a roll bar for everyone',
].map(t => li(TICK, t)).join('') + '<li class="dt-high__more"><span>And much more along the way</span></li>', 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['merzouga-buggy-sunset.jpg', 'A buggy parked in the desert at sunset'], ['agafay-view.jpg', 'The stony Agafay hills with the Atlas behind'],
  ['agafay-sunset.jpg', 'Late-afternoon light over the Agafay desert'], ['agafay-aerial.jpg', 'Agafay seen from above'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['09:00 or 15:00', 'Pick-up in Marrakech', 'Your driver meets you at your hotel, or at the nearest gate if your riad is in the medina. We confirm the time on WhatsApp the day before.'],
  ['40 minutes later', 'Helmets and briefing', 'At the buggy base: helmets, goggles and a scarf for the dust, seat belts done, then a short briefing and a few slow turns until the driver feels at ease.'],
  ['On the tracks', 'Over the Agafay hills', 'Your guide drives in front on the desert tracks, at a pace that suits you, with stops for photos and the view of the Atlas.'],
  ['2-hour ride', 'Mint tea in a Berber village', 'On the longer ride, mint tea with a family in a Berber village, then a viewpoint over the Lalla Takerkoust lake on clear days.'],
  ['After the drive', 'Back to Marrakech', 'Wash off the dust, then your driver takes you back to your hotel, about 3 hours after pick-up for the 1-hour ride, 4 hours for the 2-hour ride.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', ['Hotel pick-up and drop-off in a private car', 'A 2-seat buggy, or a 4-seat family buggy', 'Guide driving in front', 'Helmets, goggles and a scarf', 'Fuel and the briefing', 'Mint tea on the 2-hour ride'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'Bring your driving licence', 'Agafay is stony hills, not sand dunes',
  'Summer: drive in the morning or late afternoon', 'Dust gets everywhere: protect your camera', 'Not for pregnant passengers or bad backs',
].map(t => li(INFO, t)).join(''), 'gtk');
rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private drive, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Drive at sunset, then the <a href="agafay-desert-camel-ride-dinner-show.html">camel ride and dinner show</a>', 'Stay the night at an <a href="agafay-desert-camp-overnight.html">Agafay camp</a>',
  'A longer 3-hour drive', 'Lunch and time by the pool at a camp', 'Photos and video taken by your guide', 'Child seats in the car',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Couples who want to share the ride', 'Parents with children from 6', 'Anyone who prefers a seat belt to a quad'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You want to ride on your own: our <a href="agafay-desert-quad-biking.html">Agafay quad biking</a> gives everyone a quad',
  'You want real sand dunes: our <a href="merzouga-buggy-tour.html">Merzouga buggy tour</a> drives the Erg Chebbi dunes',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Sarah L.', 'Lukas M.', 'Maria G.'].map(n => { const r = allRev.find(x => x.includes('<b>' + n + '</b>')); if (!r) throw new Error('rev ' + n); return r; }).join(''), 'rev');
const FAQ = [
  ['Who can drive the buggy?', 'Drivers need to be 18 or older with a valid driving licence; bring it with you. No off-road experience is needed: the briefing comes first and your guide sets the pace.'],
  ['How much time do we really drive?', 'The full hour or two hours you book, on the tracks. The pick-up, drive and briefing come on top, so plan about 3 hours door to door for the 1-hour ride and 4 hours for the 2-hour ride.'],
  ['Buggy or quad: which should we choose?', 'A buggy has seats, seat belts and a roll bar, and you ride side by side, so it suits couples and families. A quad gives everyone their own machine and feels more like riding a bike.'],
  ['Can children come?', 'Yes, from 6 years old as passengers, with a seat belt and a helmet. With two children, a 4-seat family buggy keeps everyone together.'],
  ['Is it dusty?', 'Yes, the tracks are dry most of the year. We give you goggles and a scarf; wear clothes you don’t mind getting dusty and keep your camera in a bag.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your ride.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the Agafay Desert Buggy Tour.")}"`, 'wa');
rep('placeholder="Hotel, questions, special requests…"', 'placeholder="2 or 4 seats, 1 or 2 hours, hotel…"', 'ph');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Agafay Buggy Tour', 'mbar');
rep('<h2 id="hcta-title">Book Your Quad Ride in Agafay</h2>', '<h2 id="hcta-title">Book Your Buggy Tour in Agafay</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and how many seats; we’ll pick you up at your hotel.', 'banner sub');
// map: same route as the quad
rep('By quad', 'By buggy', 'legend'); rep('"name":"Quad base"', '"name":"Buggy base"', 'map base');
// others: quad, camel & dinner, overnight (cards from day-trips.html)
const dt = fs.readFileSync(root + 'day-trips.html', 'utf8');
function card(id) { const m = dt.match(new RegExp('<li id="' + id + '">([\\s\\S]*?</a></article>)</li>')); if (!m) throw new Error('card ' + id); return '        <li>' + m[1].replace(/href="tours\//g, 'href="../tours/') + '</li>\n'; }
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', card('dt-quad') + card('dt-camel-dinner') + card('dt-agafay-night'), 'similar');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Adventure travellers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your ride.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>\n<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld trip');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['quad base', 'your own quad', 'Your quad', 'Quad ride', '16+', 'licence needed']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
