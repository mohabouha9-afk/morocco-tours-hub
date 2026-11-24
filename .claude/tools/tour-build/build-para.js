// Build tours/marrakech-paragliding.html (NEW, 2026-11-23): private tandem paragliding flight from Aguergour, Atlas foothills.
// Template = the finished horse riding page. Research: .claude/research/paragliding-research.md
// Reviews = the 3 general ones (kept from the template). Map: run `node .claude/tools/route-map.mjs tours/marrakech-paragliding.html paragliding` after.
// Do NOT re-run on the finished page (it rebuilds from the template).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const TPL = 'marrakech-palmeraie-horse-riding.html';
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
const SV = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const TICK = SV('<path d="M5 12.5l4.5 4.5L19 7.5"/>');
const CROSS = SV('<path d="M7 7l10 10M17 7L7 17"/>');
const INFO = SV('<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/>');
const PLUS = '<span class="dt-prog__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>';
const FQ = '<span class="hfaq-item__ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>';
const li = (ic, t) => `<li>${ic}<span>${t}</span></li>`;
const strip = t => t.replace(/<[^>]+>/g, '');
const jq = t => strip(t).replace(/"/g, '\\"');

const OUT = 'marrakech-paragliding.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Tandem Paragliding in Marrakech';
const TITLE = 'Paragliding in Marrakech | Private Tandem Flight over the Atlas';
const DESC = 'Private tandem paragliding from Marrakech: a licensed pilot, 10–20 minutes in the air over Lake Lalla Takerkoust and the Atlas foothills, no experience needed, hotel pick-up, new date or refund if the wind is wrong.';
const HERO = { src: 'high-atlas-valley-aerial.jpg', w: 1600, h: 1067, alt: 'A High Atlas valley seen from above' };

// ---- head
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/https:\/\/moroccotourshub\.com\/assets\/images\/horse-riders-dry-track-mountains\.jpg/g, 'https://moroccotourshub.com/assets/images/' + HERO.src, 'og img');

// ---- programme data (also feeds JSON-LD)
const PROG = [
  ['Pick-up', 'Pick-up at your hotel', 'Around 09:00, a little later in winter and earlier in July and August, when the afternoon wind comes up. We confirm the time on WhatsApp the evening before; in the medina we meet you at the nearest gate.'],
  ['About 1 h', 'Past Lake Lalla Takerkoust', 'Across the plain to the lake, then up into the Atlas foothills to the take-off at Aguergour, straight there with no shop on the way.'],
  ['At the take-off', 'Mint tea and briefing', 'Mint tea while the pilot reads the wind, then a short briefing on running at take-off, sitting in the harness and landing. Helmet and harness fitted.'],
  ['10–20 min', 'Your tandem flight', 'A few running steps and you are in the air, the lake below and the High Atlas in front, snowy from about December to April. Longer when the air lifts.'],
  ['After landing', 'Landing in the fields', 'A soft landing on foot in the fields below the take-off, where your driver is waiting with your bags.'],
  ['About 4 h after pick-up', 'Back to Marrakech', 'Back at your hotel by early afternoon, or stop for lunch by the lake on the way (around €10, not included).'],
];
const FAQ = [
  ['Is paragliding in Marrakech safe?', '<p>You fly in tandem with a licensed, experienced pilot from a paragliding school we work with every season, with a checked wing, a reserve parachute, a helmet and a harness. The pilot only flies when the wind is safe, and that call is final.</p>'],
  ['What happens if it is too windy?', '<p>The pilot checks the forecast the evening before and again at the take-off. Sometimes you wait over tea for the wind to settle; if the flight is called off, you choose a new date or a full refund. Book it early in your stay so a spare day is left.</p>'],
  ['Do I need to be fit or have experience?', '<p>No. The pilot flies the wing: you run a few steps down the slope at take-off and lift your legs to land. If walking is hard for you, tell us before you book.</p>'],
  ['I get motion sick. Can I still fly?', '<p>Yes. Have a light breakfast, take a travel-sickness tablet if you are prone to it, and tell the pilot: they keep the flight smooth, with no spins, and land early if you ask.</p>'],
  ['Can children fly?', '<p>Yes, from about 6 years old and 20 kg, as long as they can run a few steps with the pilot. Tell us their ages and weights when you book.</p>'],
  ['How do I book and pay?', '<ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before the flight.</p>'],
];

// ---- JSON-LD
rep(/"@type":"TouristTrip","name":"[^"]*","description":"[^"]*"/, `"@type":"TouristTrip","name":"${NAME}","description":"${DESC}"`, 'ld trip');
rep(/"itemListElement":\[\{"@type":"ListItem","position":1,"name":"Pick-up at your hotel"[^\]]*\]/,
  '"itemListElement":[' + PROG.map((p, i) => `{"@type":"ListItem","position":${i + 1},"name":"${p[1]}"}`).join(',') + ']', 'ld itin');
rep(/"@type":"FAQPage","mainEntity":\[.*?\]\}<\/script>/,
  '"@type":"FAQPage","mainEntity":[' + FAQ.map(f => `{"@type":"Question","name":"${jq(f[0])}","acceptedAnswer":{"@type":"Answer","text":"${jq(f[1].replace(/<\/li><li>/g, ' ').replace(/<\/p><p>/g, ' ')).replace(/\s+/g, ' ').trim()}"}}`).join(',') + ']}</script>', 'ld faq');

// ---- hero
rep(/<img class="horse-hero-img" src="\/assets\/images\/[^"]+" alt="[^"]*" width="\d+" height="\d+"/,
  `<img src="/assets/images/${HERO.src}" alt="${HERO.alt}" width="${HERO.w}" height="${HERO.h}"`, 'hero img');
rep('<span>Palmeraie Horse Riding</span></nav>', '<span>Paragliding</span></nav>', 'crumb');
rep(/<h1>.*?<\/h1>/, `<h1>${NAME}<span class="script">Fly over the lake and the Atlas foothills</span></h1>`, 'h1');
rep('<b>About 3 hours (sunset or morning)</b>', '<b>About 4 hours (morning)</b>', 'fact dur');
rep('<b>Every day, all year</b>', '<b>Every day, wind allowing</b>', 'fact avail');

// ---- overview
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>', '<dl class="dt-glance">',
  '\n          <p class="dt-lead">Fly in tandem with a licensed pilot from Aguergour in the Atlas foothills, an hour from Marrakech: the blue lake of Lalla Takerkoust below you, the plain stretching back to the city and the High Atlas peaks in front.</p>\n' +
  '          <p class="dt-lead">No experience or fitness needed, just a few running steps. We only fly when the pilot says the wind is right; if it isn’t, you choose a new date or a full refund.</p>\n          ', 'overview');
const G = [
  [SV('<path d="M3 11c4-5 14-5 18 0"/><path d="M5 11l7 8 7-8"/><path d="M12 11v8"/>'), 'Flight', '10–20 min in the air'],
  [SV('<path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/>'), 'Drive', 'About 1 h each way'],
  [SV('<circle cx="12" cy="7" r="3"/><path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6"/>'), 'Pilot', 'Licensed tandem pilot'],
  [SV('<path d="M4 18l5-6 4 3 7-9"/><path d="M15 6h5v5"/>'), 'Level', 'No experience needed'],
  [SV('<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>'), 'Guide', 'Local guide included'],
  [SV('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h3"/>'), 'Cancellation', 'Free up to 24 h before'],
];
rep(/<dl class="dt-glance">.*?<\/dl>/, '<dl class="dt-glance">' + G.map(g => `<div>${g[0]}<dt>${g[1]}</dt><dd>${g[2]}</dd></div>`).join('') + '</dl>', 'glance');
between('<h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Lake Lalla Takerkoust seen from the air',
  'The High Atlas in front, snowy in winter',
  'A running take-off and a soft landing',
  'A licensed pilot and all the gear',
  'Mint tea at the take-off',
  'And much more along the way',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---- gallery (placeholders until the owner approves real paragliding photos)
between('<div class="dt-gal dt-gal--4">', '</div>', [
  ['lalla-takerkoust-lake-atlas.jpg', 'Lake Lalla Takerkoust below the snowy peaks of the High Atlas', 1600, 2133],
  ['atlas-snow-autumn.jpg', 'High Atlas peaks with the first snow', 1600, 1066],
  ['nomad-tent-tea.jpg', 'Mint tea served in the shade', 960, 1280],
  ['lalla-takerkoust-sunset.jpg', 'Sunset over Lake Lalla Takerkoust', 1600, 2397],
].map(g => `<figure><img src="/assets/images/${g[0]}" alt="${g[1]}" width="${g[2]}" height="${g[3]}" loading="lazy"></figure>`).join(''), 'gallery');

// ---- programme
between('<ol class="dt-prog dt-prog--acc">', '</ol>', '\n' + PROG.map((p, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${p[0]}</span><h3>${p[1]}</h3>${PLUS}</summary><p>${p[2]}</p></details></li>\n`).join('') + '          ', 'programme');

// ---- included
between('<h3>Included</h3><ul>', '</ul>', [
  'Private air-conditioned car or minivan with driver (see <a href="../index.html#fleet">our fleet</a>)',
  'Local professional guide',
  'Tandem flight with a licensed pilot',
  'Helmet, harness and safety briefing',
  'Mint tea at the take-off',
  'Bottled water',
].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul>', [
  'Photos and video of your flight (optional, paid to the pilot)',
  'Lunch (around €10 by the lake)',
  'Tips (up to you)',
  'Travel insurance (check it covers paragliding)',
].map(t => li(CROSS, t)).join(''), 'noinc');
between('<h3>Good to know</h3><ul>', '</ul>', [
  'This is a suggestion: tell us your preferences',
  'Flyers from 20 to about 110 kg: tell us each person’s weight',
  'Closed shoes you can run in, and a light jacket: it is cooler up there',
  'Not possible in pregnancy or with heart or serious back problems',
].map(t => li(INFO, t)).join(''), 'gtk');

// ---- map note (the map itself comes from route-map.mjs)
rep(/<span>The Palmeraie is about 8 km north[^<]*<a href="[^"]*"/,
  '<span>Aguergour is about 55 km south-west of Marrakech, about 1 hour each way past Lake Lalla Takerkoust. <a href="https://www.openstreetmap.org/?mlat=31.2932&amp;mlon=-8.0814#map=10/31.46/-8.05"', 'map note');

// ---- make it your own
rep('It is your private ride, so the plan moves with you.', 'It is your private outing, so the plan moves with you.', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul>', [
  'Lunch by Lake Lalla Takerkoust after the flight',
  'A camel ride by the lake on the way back',
  'A sunset flight when the wind allows',
  'The Kik plateau and Asni valley after the flight (see our <a href="marrakech-three-valleys-day-trip.html">Three Valleys day trip</a>)',
  'An evening at our <a href="agafay-desert-camel-ride-dinner-show.html">Agafay camel ride &amp; dinner</a>',
  'Child seats in the car',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul>', [
  'A first taste of flying, with no experience needed',
  'Thrill-seekers who want more than a view',
  'Families with children from about 6',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul>', [
  'Nervous about heights or the running take-off? The <a href="marrakech-hot-air-balloon-ride.html">hot air balloon</a> rises gently',
  'Want your thrills on the ground? Try <a href="agafay-desert-quad-biking.html">Agafay quad biking</a>',
  'Only one free morning? Wind can move the flight; the <a href="marrakech-three-valleys-day-trip.html">Three Valleys day trip</a> sees the same lake by road',
].map(t => li(INFO, t)).join(''), 'think');

// ---- FAQ
between('<div class="hfaq__list dt-faq">', '</div>\n        </section>', '\n' + FAQ.map((f, i) =>
  `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${f[0]}</h3>${FQ}</summary><div class="hfaq-item__a">${f[1]}</div></details>\n`).join('') + '          ', 'faq');

// ---- booking, closing
rep('value="Horse Riding in the Marrakech Palmeraie" readonly', `value="${NAME}" readonly`, 'form');
rep("information%20about%20horse%20riding%20in%20the%20Marrakech%20Palmeraie.", "information%20about%20tandem%20paragliding%20in%20Marrakech.", 'wa');
rep('<h2 id="hcta-title">Book Your Palm Grove Horse Ride</h2>', '<h2 id="hcta-title">Book Your Tandem Flight</h2>', 'hcta');
rep('Tell us your hotel, your date and each rider’s level; we’ll pick you up at the door.', 'Tell us your hotel, your date and each flyer’s weight; we’ll confirm the wind the evening before.', 'hcta sub');
rep('<b>Horse Riding in the Marrakech Palmeraie</b><span>', `<b>${NAME}</b><span>`, 'mbar');

// ---- You May Also Like: balloon, Three Valleys, quad (cards from day-trips.html)
const dt = fs.readFileSync(root + 'day-trips.html', 'utf8');
const cardOf = id => { const i = dt.indexOf(`<li id="${id}">`); if (i < 0) throw new Error(id);
  return dt.slice(i, dt.indexOf('</a></article></li>', i) + '</a></article></li>'.length).replace(` id="${id}"`, '').replace('href="tours/', 'href="../tours/'); };
const a = s.indexOf('<ul class="htours__list dt-others__list">') + '<ul class="htours__list dt-others__list">'.length;
const b = s.indexOf('<li class="htours__end">', a);
if (a < 50 || b < 0) throw new Error('others');
s = s.slice(0, a) + '\n        ' + ['dt-balloon', 'dt-three-valleys', 'dt-quad'].map(cardOf).join('\n        ') + '\n        ' + s.slice(b);

fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
