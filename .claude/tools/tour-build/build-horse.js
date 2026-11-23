// Build tours/marrakech-palmeraie-horse-riding.html (NEW, 2026-11-23): private horse ride in the Marrakech palm grove, sunset or morning.
// Template = the finished Palmeraie camel ride page. Research: .claude/research/horse-riding-research.md
// Reviews = the 3 general ones (kept from the template). Map: same Palmeraie road as the camel page, pin icon "palm".
// Do NOT re-run on the finished page (it rebuilds from the template).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const TPL = 'marrakech-palmeraie-camel-ride.html';
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

const OUT = 'marrakech-palmeraie-horse-riding.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Horse Riding in the Marrakech Palmeraie';
const TITLE = 'Horse Riding in Marrakech Palmeraie | Private, Beginners Welcome';
const DESC = 'Private horse ride in the Marrakech palm grove: a full hour in the saddle at sunset or in the morning, helmet and briefing, beginners led at their pace, mint tea, hotel pick-up 15–20 minutes away.';
const HERO = { src: 'marrakech-caleche-square.jpg', w: 1300, h: 866, alt: 'Horses waiting with their carriages on a square in Marrakech' };

// ---- head
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/palmeraie-camels-palm-trees\.jpg/g, HERO.src, 'og img');

// ---- programme data (also feeds JSON-LD)
const PROG = [
  ['Pick-up', 'Pick-up at your hotel', 'About 2 hours before sunset (around 15:30 in winter, 17:30 in summer) or at 09:00 for the morning ride. We confirm your time on WhatsApp the day before; in the medina we meet you at the nearest gate.'],
  ['15–20 min', 'Out to the stables', 'A short drive north of the medina to the stables in the palm grove, straight there with no shop on the way.'],
  ['Before the ride', 'Meet your horse', 'We match each rider to a horse by level and size, fit a helmet, and the horse guide shows you how to sit, hold the reins, stop and turn.'],
  ['One hour', 'Through the palms', 'A full hour on sandy tracks between the palms and earth villages. Beginners start led on a rope, then walk and trot; confident riders can canter.'],
  ['After the ride', 'Mint tea at the stables', 'Mint tea in the shade while the horses rest, with time to say goodbye to them and look at the photos your guide took on the way.'],
  ['About 3 h after pick-up', 'Back to your hotel', 'Back at your hotel or riad about 3 hours after pick-up, or we drop you at a restaurant or at Jemaa el-Fna if your evening goes on.'],
];
const FAQ = [
  ['I have never ridden a horse. Is that OK?', '<p>Yes. Most of our riders are beginners: you get a calm horse, a short lesson before you start, and the horse guide leads you on a rope until you feel ready. The pace follows the least experienced rider in your group.</p>'],
  ['Can children ride?', '<p>Yes, from about 6 years old on a gentle horse led on foot by the horse guide; from about 10 most children ride on their own. Tell us their ages and we bring the right horses and small helmets.</p>'],
  ['Are the horses well cared for?', '<p>We work with one stable we know: the horses are fed and shod properly, rest between rides and never go out in the midday heat. Each rider gets a horse that suits their weight, so tell us if anyone is over about 100 kg.</p>'],
  ['What should we wear?', '<p>Long trousers (jeans or cotton, not shorts or slippery leggings) and closed shoes with a small heel, no sandals. Add sunglasses, sun cream and a scarf for the dust; we provide the helmet.</p>'],
  ['Palmeraie or Agafay: where is it better to ride?', '<p>The Palmeraie is flat, shaded by palms and only 15 to 20 minutes away, which makes it the best choice for beginners and families. Agafay is a stony desert with views of the Atlas, about 45 minutes away; ask for it if you are a confident rider.</p>'],
  ['How do I book and pay?', '<ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before the ride.</p>'],
];

// ---- JSON-LD
rep(/"@type":"TouristTrip","name":"[^"]*","description":"[^"]*"/, `"@type":"TouristTrip","name":"${NAME}","description":"${DESC}"`, 'ld trip');
rep(/"itemListElement":\[\{"@type":"ListItem","position":1,"name":"Pick-up at your hotel"[^\]]*\]/,
  '"itemListElement":[' + PROG.map((p, i) => `{"@type":"ListItem","position":${i + 1},"name":"${p[1]}"}`).join(',') + ']', 'ld itin');
rep(/"@type":"FAQPage","mainEntity":\[.*?\]\}<\/script>/,
  '"@type":"FAQPage","mainEntity":[' + FAQ.map(f => `{"@type":"Question","name":"${jq(f[0])}","acceptedAnswer":{"@type":"Answer","text":"${jq(f[1].replace(/<\/li><li>/g, ' ').replace(/<\/p><p>/g, ' ')).replace(/\s+/g, ' ').trim()}"}}`).join(',') + ']}</script>', 'ld faq');

// ---- hero
rep(/<img class="palm-hero-img" src="\/assets\/images\/[^"]+" alt="[^"]*" width="\d+" height="\d+"/,
  `<img src="/assets/images/${HERO.src}" alt="${HERO.alt}" width="${HERO.w}" height="${HERO.h}"`, 'hero img');
rep('<span>Palmeraie Camel Ride</span></nav>', '<span>Palmeraie Horse Riding</span></nav>', 'crumb');
rep(/<h1>.*?<\/h1>/, `<h1>${NAME}<span class="script">An hour in the saddle among the palms</span></h1>`, 'h1');

// ---- overview
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>', '<dl class="dt-glance">',
  '\n          <p class="dt-lead">Ride a horse through the palm grove on the edge of Marrakech, on soft sandy tracks between the palms and small earth villages, in the warm light before sunset or the cool calm of the morning.</p>\n' +
  '          <p class="dt-lead">No riding experience needed: a calm horse matched to you, a helmet and a short lesson first, and a full hour in the saddle at your own pace, 15 to 20 minutes from your hotel.</p>\n          ', 'overview');
const G = [
  [SV('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'), 'Times', 'Sunset or morning'],
  [SV('<path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/>'), 'Drive', '15–20 min away'],
  [SV('<path d="M3 18h18"/><path d="M7 18a5 5 0 0110 0"/><path d="M12 6v2M5.6 9.6l1.4 1.4M18.4 9.6L17 11"/>'), 'Horse ride', 'A full hour'],
  [SV('<circle cx="12" cy="7" r="3"/><path d="M5 20c0-3.9 3.1-6 7-6s7 2.1 7 6"/>'), 'Level', 'Beginners welcome'],
  [SV('<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>'), 'Guide', 'Local guide included'],
  [SV('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h3"/>'), 'Cancellation', 'Free up to 24 h before'],
];
rep(/<dl class="dt-glance">.*?<\/dl>/, '<dl class="dt-glance">' + G.map(g => `<div>${g[0]}<dt>${g[1]}</dt><dd>${g[2]}</dd></div>`).join('') + '</dl>', 'glance');
between('<h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Golden light through the palms at sunset',
  'A calm horse matched to your level',
  'Earth-walled villages inside the grove',
  'Snowy Atlas peaks behind the palms',
  'Photos of your ride, taken by your guide',
  'And much more along the way',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---- gallery (placeholders until the owner approves real Palmeraie horse photos)
between('<div class="dt-gal dt-gal--4">', '</div>', [
  ['palmeraie-camels-palm-trees.jpg', 'Date palms and sandy tracks in the Marrakech Palmeraie', 1600, 1405],
  ['agafay-view.jpg', 'The stony Agafay hills with the Atlas behind', 800, 600],
  ['nomad-tent-tea.jpg', 'Mint tea served in the shade', 960, 1280],
  ['agafay-sunset.jpg', 'Sunset light over the countryside outside Marrakech', 1600, 1000],
].map(g => `<figure><img src="/assets/images/${g[0]}" alt="${g[1]}" width="${g[2]}" height="${g[3]}" loading="lazy"></figure>`).join(''), 'gallery');

// ---- programme
between('<ol class="dt-prog dt-prog--acc">', '</ol>', '\n' + PROG.map((p, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${p[0]}</span><h3>${p[1]}</h3>${PLUS}</summary><p>${p[2]}</p></details></li>\n`).join('') + '          ', 'programme');

// ---- included
between('<h3>Included</h3><ul>', '</ul>', [
  'Private air-conditioned car or minivan with driver (see <a href="../index.html#fleet">our fleet</a>)',
  'Local professional guide',
  'Horse ride of a full hour with the stable’s horse guide',
  'Helmet in your size and a short lesson',
  'Mint tea at the stables',
  'Bottled water',
].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul>', [
  'Lunch or dinner', 'Tips (up to you)', 'Travel insurance',
].map(t => li(CROSS, t)).join(''), 'noinc');
between('<h3>Good to know</h3><ul>', '</ul>', [
  'This is a suggestion: tell us your preferences',
  'Tell us each rider’s level and if anyone is over about 100 kg',
  'Winter sunsets get cool quickly: bring a warm layer',
  'Pregnant, or a bad back? Our <a href="marrakech-palmeraie-camel-ride.html">camel ride</a> is gentler',
].map(t => li(INFO, t)).join(''), 'gtk');

// ---- map
rep(/Route map: Marrakech medina to the Palmeraie palm grove for the camel ride/g, 'Route map: Marrakech medina to the stables in the Palmeraie palm grove for the horse ride', 'map title');
rep('"icon":"camel","name":"Palmeraie","note":"Tea, camel ride in the palms"', '"icon":"palm","name":"Palmeraie","note":"Stables, horse ride in the palms"', 'map stop');

// ---- make it your own
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul>', [
  'A longer ride, up to two hours',
  'Ride in the Agafay desert instead, facing the Atlas (longer drive)',
  'A <a href="marrakech-palmeraie-camel-ride.html">camel ride in the palms</a> the same afternoon',
  'The ride on the same day as our <a href="majorelle-garden-palaces-marrakech-tour.html">Majorelle Garden &amp; palaces tour</a>',
  'Dinner after the sunset: we drop you at a restaurant',
  'Child seats in the car',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul>', [
  'A first ride on a horse, with a lesson and a calm horse',
  'Riders who want to trot and canter among the palms',
  'Families with children from about 6',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul>', [
  'Nervous about riding? The <a href="marrakech-palmeraie-camel-ride.html">Palmeraie camel ride</a> goes at a slow walk',
  'Want desert scenery and an evening out? The <a href="agafay-desert-camel-ride-dinner-show.html">Agafay camel ride &amp; dinner</a> adds the camp',
  'Rather explore on foot? The <a href="marrakech-atlas-mountains-day-trip.html">Atlas &amp; Imlil day trip</a> walks through Berber villages',
].map(t => li(INFO, t)).join(''), 'think');

// ---- FAQ
between('<div class="hfaq__list dt-faq">', '</div>\n        </section>', '\n' + FAQ.map((f, i) =>
  `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${f[0]}</h3>${FQ}</summary><div class="hfaq-item__a">${f[1]}</div></details>\n`).join('') + '          ', 'faq');

// ---- booking, others, closing
rep('value="Camel Ride in the Marrakech Palmeraie" readonly', `value="${NAME}" readonly`, 'form');
rep("information%20about%20the%20Palmeraie%20camel%20ride%20in%20Marrakech.", "information%20about%20horse%20riding%20in%20the%20Marrakech%20Palmeraie.", 'wa');
rep('<h2 id="hcta-title">Book Your Palm Grove Camel Ride</h2>', '<h2 id="hcta-title">Book Your Palm Grove Horse Ride</h2>', 'hcta');
rep('Tell us your hotel, your date and sunset or morning; we’ll pick you up at the door.', 'Tell us your hotel, your date and each rider’s level; we’ll pick you up at the door.', 'hcta sub');
rep('<b>Camel Ride in the Marrakech Palmeraie</b><span>', `<b>${NAME}</b><span>`, 'mbar');

// You May Also Like: replace the Agafay camel & dinner card with the Palmeraie camel card from day-trips.html
const dt = fs.readFileSync(root + 'day-trips.html', 'utf8');
const ci = dt.indexOf('<li id="dt-palmeraie">');
let card = dt.slice(ci, dt.indexOf('</a></article></li>', ci) + '</a></article></li>'.length)
  .replace(' id="dt-palmeraie"', '').replace('href="tours/', 'href="../tours/')
  .replace('desert-camel-acacia-tree.jpg" alt="A camel resting under a tree" width="1300" height="867"', 'palmeraie-camels-palm-trees.jpg" alt="Saddled camels among the date palms of the Palmeraie" width="1600" height="1405"');
const oi = s.indexOf('<li><article class="htour htour--dt"><a class="htour__link" href="../tours/agafay-desert-camel-ride-dinner-show.html">');
if (oi < 0) throw new Error('others card');
const oj = s.indexOf('</a></article></li>', oi) + '</a></article></li>'.length;
s = s.slice(0, oi) + card + s.slice(oj);

fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
