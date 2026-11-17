// Build tours/merzouga-4x4-desert-day-tour.html (NEW, 2026-11-17): Merzouga activities page 5, a full day around Erg Chebbi by 4×4.
// Template = the finished buggy page. Research (WebSearch): full-day private 4×4 tours run 6-8 h (half-day 3-4 h): Erg Chebbi viewpoints,
// Gnawa music in Khamlia, tea/lunch with a nomad family, the black (volcanic) desert, the abandoned Mfis (Mefes) lead mines, the seasonal
// lake (Dayet Srij); Rissani mostly in multi-day tours. Same 4×4 day as day 2 of our Merzouga tours.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const TPL = 'merzouga-buggy-tour.html';
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
const OUT = 'merzouga-4x4-desert-day-tour.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Merzouga 4×4 Desert Day Tour';
const TITLE = 'Merzouga 4×4 Day Tour: Khamlia, Nomads &amp; Erg Chebbi | Private';
const DESC = 'A private full day around Erg Chebbi by 4×4 from your Merzouga hotel: tea with a nomad family, Gnawa music in Khamlia, the black desert, the old Mfis mines, the desert lake in season and the big dunes.';
const HERO = 'grand-desert-plateau.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Merzouga 4x4 tour, Merzouga day tour, Khamlia Gnawa music, Merzouga nomad family visit, Erg Chebbi 4x4, things to do in Merzouga">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The open desert around Erg Chebbi" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Buggy Tour</span>', '<span>4×4 Day Tour</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Merzouga 4×4 Desert Day Tour<span class="script">Around Erg Chebbi in one day</span></h1>', 'h1');
rep('<b>1 or 2 hours in the buggy</b>', '<b>Full day, about 7 hours</b>', 'f1');
rep('<small>Meeting point</small><b>Merzouga or your hotel</b>', '<small>Pick-up</small><b>Your Merzouga hotel</b>', 'f2');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">A whole day around the Erg Chebbi dunes in a private 4×4: tea in a nomad family’s tent, Gnawa music in the village of Khamlia, the black desert of volcanic stones, the abandoned Mfis mines and the desert lake of Dayet Srij when it holds water.</p>
          <p class="dt-lead">Your driver-guide knows the tracks and the families who live along them, so you see the life around the dunes, not only the sand. Lunch is where you like it, and there is time for sandboarding and the big dunes before the late-afternoon light.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Times', '9:00 to about 16:00', 0], ['Vehicle', 'Private 4×4 with driver', 2], ['Stops', 'Nomads, Khamlia, lake', 1],
    ['Guide', 'Driver-guide included', 3], ['Pick-up', 'Your Merzouga hotel', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Mint tea in a nomad family’s tent', 'Gnawa drums and songs in Khamlia', 'The black desert of volcanic stones',
  'The old Mfis mines and their ghost village', 'Flamingos on Dayet Srij after a wet winter', 'Sandboarding on the big dunes',
].map(t => li(TICK, t)).join(''), 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['fleet-4x4-land-cruiser.jpg', 'A 4×4 Land Cruiser'], ['khamlia-gnawa.jpg', 'Gnawa musicians in Khamlia'],
  ['nomad-tent-tea.jpg', 'Tea in a nomad tent'], ['dunes-sunset.webp', 'The Erg Chebbi dunes in the late afternoon'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['9:00', 'Pick-up at your hotel', 'Your driver-guide collects you at your Merzouga hotel or camp in a private 4×4; we confirm the time on WhatsApp the day before.'],
  ['Morning', 'Nomad family and the black desert', 'Off-road around the dunes to a nomad family’s tent for mint tea and a talk about desert life, then across the black desert of volcanic stones.'],
  ['Late morning', 'The Mfis mines', 'The abandoned lead mines of Mfis and the empty miners’ village, with wide views back to the dunes.'],
  ['Midday', 'Lunch your way', 'Lunch in a village restaurant or a simple meal with a nomad family, about €10, then a slow hour out of the midday sun.'],
  ['Afternoon', 'Khamlia and Dayet Srij', 'Gnawa music in Khamlia, a village founded by families from south of the Sahara, then the lake of Dayet Srij when it holds water.'],
  ['About 16:00', 'Big dunes and back', 'Sandboarding and photos on the high dunes, then back to your hotel, or straight to a sunset camel ride.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', [`Private air-conditioned 4×4 with driver-guide (see <a href="../index.html#fleet">our fleet</a>)`, 'Pick-up and drop-off at your Merzouga hotel or camp', 'Tea with a nomad family', 'Gnawa music in Khamlia', 'Sandboards', 'Water and fuel'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunch', 'Drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'Bumpy desert tracks: tell us about bad backs', 'Dayet Srij is often dry in summer and autumn',
  'Summer: an early start and a long midday break', 'Bring a scarf, sunglasses and sun cream', 'Child seats on request',
].map(t => li(INFO, t)).join(''), 'gtk');
rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private day, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'End with a <a href="merzouga-sunset-camel-ride.html">sunset camel ride</a>', 'Stay the night at a <a href="merzouga-desert-camp-camel-ride.html">desert camp</a>', 'Rissani market and its old ksar',
  'A half day of 3 to 4 hours', 'A <a href="merzouga-quad-biking.html">quad ride</a> on the big dunes', 'Fossil workshops in Erfoud, only if you ask',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['A second day in Merzouga', 'Families: short drives between stops', 'Travellers curious about desert life'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You only have a few hours: our <a href="merzouga-buggy-tour.html">buggy tour</a> or <a href="merzouga-quad-biking.html">quad biking</a>',
  'You want to drive yourself: our <a href="merzouga-buggy-tour.html">buggy tour</a> puts you at the wheel',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Lukas M.', 'Aisha K.', 'James T.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['Is the nomad visit staged?', 'No. We visit families who live around the dunes with their goats and camels, and we bring tea, sugar or bread as is the custom. There is no show and nothing to buy.'],
  ['What is Gnawa music?', 'Spiritual music with drums, iron castanets and songs, brought by families from south of the Sahara. In Khamlia the musicians play for visitors in their own house.'],
  ['Will the lake have water?', 'Dayet Srij fills after winter rain, usually from winter to spring, and is often dry in summer and autumn. When it is full, flamingos sometimes stop there.'],
  ['Can we do half a day?', 'Yes. A morning or afternoon of 3 to 4 hours covers the nomads, Khamlia and the dunes; the full day adds the black desert, the mines and the lake.'],
  ['Is it suitable for children?', 'Yes. The drives between stops are short, there are dunes to slide down and animals at the nomad camp. Tell us their ages for child seats.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your tour.</p></div></details>\n`, 'faq');
rep(/(class="dt-book__label">)[^<]*/, '$1Private day tour', 'label');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the Merzouga 4x4 Desert Day Tour.")}"`, 'wa');
rep('placeholder="2 or 4 seats, 1 or 2 hours, questions…"', 'placeholder="Your hotel, full or half day, questions…"', 'ph');
rep('Up to 24 hours before your ride.', 'Up to 24 hours before your tour.', 'trust');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Merzouga 4×4 Day Tour', 'mbar');
rep('<h2 id="hcta-title">Book Your Buggy Tour</h2>', '<h2 id="hcta-title">Book Your Day Around the Dunes</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and your hotel; we’ll pick you up in Merzouga.', 'banner sub');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Families', 'Couples', 'Culture travellers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['buggy base', 'seat belt', 'licence', 'Passengers', 'Your ride', 'your ride']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
