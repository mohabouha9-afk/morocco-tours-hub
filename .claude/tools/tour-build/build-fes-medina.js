// Build tours/fes-medina-guided-tour.html (NEW, 2026-11-23): private guided tour of the Fes medina.
// Template: the finished tours/marrakech-medina-guided-tour.html (experience wording, Walking Route map).
// Research: GetYourGuide / Headout Fes medina tours (3-3.5 h: Bou Inania, Nejjarine, Al-Attarine, Chouara tannery;
// "Fez medina and Royal Palace" tours start at the palace gates). Entry fees ~20 MAD each (Lonely Planet, Sygic).
// Route: Royal Palace gates (car, ~2 km / 10 min) → Bab Boujeloud → Bou Inania → Talaa Kebira → Nejjarine →
// Al-Attarine + Qaraouiyine doors → Seffarine → Chouara terrace. Walk ~1.7 km (OSRM foot), mostly downhill.
// After building: node .claude/tools/route-map.mjs tours/fes-medina-guided-tour.html fes-medina
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
function dims(f) { // real JPEG / WebP size from the file
  const b = fs.readFileSync(root + 'assets/images/' + f);
  if (f.endsWith('.webp')) { const i = b.indexOf('VP8'); if (b[i + 3] === 0x58) return [1 + b.readUIntLE(i + 12, 3), 1 + b.readUIntLE(i + 15, 3)]; if (b[i + 3] === 0x20) return [b.readUInt16LE(i + 14) & 0x3fff, b.readUInt16LE(i + 16) & 0x3fff]; const v = b.readUInt32LE(i + 9); return [1 + (v & 0x3fff), 1 + ((v >> 14) & 0x3fff)]; }
  let i = 2; while (i < b.length) { if (b[i] !== 0xFF) { i++; continue; } const m = b[i + 1]; if (m >= 0xC0 && m <= 0xC3) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; i += 2 + b.readUInt16BE(i + 2); }
  throw new Error('no dims ' + f);
}
const TPL = 'marrakech-medina-guided-tour.html';
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
const OUT = 'fes-medina-guided-tour.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Guided Tour of the Fes Medina';
const TITLE = 'Guided Tour of the Fes Medina | Private Walking Tour with a Local Guide';
const DESC = 'Private guided tour of the Fes medina: the Royal Palace gates, Bab Boujeloud, Bou Inania and Al-Attarine madrasas, Nejjarine and the Chouara tannery, at your pace with no shop stops unless you ask.';
const HERO = 'fes-royal-palace-gates.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

// ---------- hero ----------
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The golden gates of the Royal Palace in Fes" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Medina Guided Tour</span>', '<span>Fes Medina Tour</span>', 'crumb');
rep('</svg>Marrakech</span>\n      <h1>', '</svg>Fes</span>\n      <h1>', 'loc');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Guided Tour of the Fes Medina<span class="script">Madrasas, souks and the tanneries</span></h1>', 'h1');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Fes el-Bali is the oldest and largest medina in Morocco: some 9,000 lanes, no cars, and no map that really works. A local guide turns the maze into a story, from the golden gates of the Royal Palace and the Blue Gate to the carved madrasas, the coppersmiths and the Chouara tannery.</p>
          <p class="dt-lead">It is your private tour, so you set the pace and choose what to enter. Most of the walk goes downhill, and it ends where you can find your own way back. Do it on your first day in Fes.</p>
`, 'overview');

{ const g = s.slice(s.indexOf('<dl class="dt-glance">'), s.indexOf('</dl>', s.indexOf('<dl class="dt-glance">')));
  const items = g.match(/<div>[\s\S]*?<\/div>/g); if (items.length !== 6) throw new Error('kf count');
  const vals = ['09:00 or 15:00 start', 'About 2 km, mostly downhill', 'Madrasas, souks, tannery', 'None unless you ask', 'Local guide included', 'Free up to 24 h before'];
  between('<dl class="dt-glance">', '</dl>', items.map((x, k) => x.replace(/<dd>[^<]*<\/dd>/, `<dd>${vals[k]}</dd>`)).join(''), 'kf'); }

between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  '<b>Royal Palace:</b> the seven golden doors on Place des Alaouites',
  '<b>Bab Boujeloud:</b> the Blue Gate into the old medina',
  '<b>Bou Inania Madrasa:</b> cedar, stucco and zellij from the 14th century',
  '<b>Al-Attarine Madrasa:</b> the finest courtyard in Fes, by the Qaraouiyine',
  '<b>Seffarine Square:</b> coppersmiths hammering pots in the open',
  '<b>Chouara Tannery:</b> the dye pits seen from a terrace above',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['fes-guide.jpg', 'Travellers at the golden doors of the Royal Palace in Fes'],
  ['grand-fes-blue-gate.jpg', 'Bab Boujeloud, the Blue Gate of the Fes medina'],
  ['fes-medina.jpg', 'A carved cedar doorway with calligraphy in the Fes medina'],
  ['grand-fes-coppersmith.jpg', 'A coppersmith at work near Seffarine Square'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');

// ---------- programme ----------
const P = [
  ['09:00', 'Pick-up and the Royal Palace', 'Your guide and driver collect you at your riad gate or hotel and drive to the golden doors of the Royal Palace (closed to visitors) for photos. We confirm the time on WhatsApp the day before.'],
  ['09:30', 'Bab Boujeloud and Bou Inania', 'A 10-minute drive to the Blue Gate, then on foot into the Bou Inania Madrasa: carved cedar, stucco and a marble courtyard. About 30 minutes inside.'],
  ['10:15', 'Down the Talaa Kebira', 'The main lane runs downhill past bakeries, butchers, spice stalls and old fountains. Your guide explains how the medina still works, street by street.'],
  ['10:45', 'Nejjarine and Al-Attarine', 'The Nejjarine fountain and its woodwork museum in an old caravanserai, then the Al-Attarine Madrasa and a look through the doors of the Qaraouiyine (Muslims only inside).'],
  ['11:45', 'Seffarine and the Chouara Tannery', 'Coppersmiths at work on Seffarine Square, then the dye pits from a leather shop terrace. Mint leaves help with the smell; you never have to buy.'],
  ['12:30', 'Rooftop tea and the way back', 'Mint tea on a rooftop café, then your guide walks you to your riad or to a taxi at Bab Rcif, or shows you how to explore alone.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Local professional guide, 3 to 4 hours, only for you',
  'Pick-up at your riad gate or hotel, and the short drive to the medina',
  'Route and pace planned around you',
  'Mint tea on a rooftop café',
  'No shop stops unless you ask',
].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', [
  'Entry tickets to the madrasas and the museum',
  'Lunch and drinks',
  'Anything you buy in the souks',
  'Tips',
].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'Lanes are steep in places and slippery when wet: wear closed shoes',
  'Donkeys and carts pass in the lanes: step aside when you hear “balak”',
  'On Friday many shops close, so the souks are quieter',
  'Wheelchair or stroller? Tell us: the medina has steps; we plan the best way',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<div class="dt-card dt-costs"><h3>Costs on the day</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Bou Inania Madrasa:</b> about 20 MAD per adult',
  '<b>Al-Attarine Madrasa:</b> about 20 MAD per adult',
  '<b>Nejjarine Museum:</b> about 20 MAD per adult (optional)',
  '<b>Lunch:</b> around €10 depending on what you eat',
  '<b>Tips:</b> up to you',
  '<b>Cash:</b> bring dirhams; ticket desks and small shops prefer cash',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<p class="dt-map__note">([\s\S]*?)<span>[\s\S]*?<\/span><\/p>/, `<p class="dt-map__note">$1<span>A 10-minute drive from the Royal Palace, then about 2 km on foot through the real lanes, from Bab Boujeloud down to the Chouara Tannery. <a href="https://www.openstreetmap.org/#map=16/34.0640/-4.9780" target="_blank" rel="noopener">Open the larger map</a></span></p>`, 'map note');

// ---------- make it your own / fit ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'The Merinid Tombs or Borj Nord for the view over the whole medina',
  'The Mellah, the old Jewish quarter, next to the Royal Palace',
  'A potters’ and zellij workshop visit outside the walls',
  'A slower family pace with more breaks',
  'An afternoon start at 15:00 in summer',
  'A carpet or leather shop, only if you ask',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Your first day in Fes',
  'Travellers who want history, not a shopping tour',
  'Families and couples who like to walk at their own pace',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You want more than the city: the <a href="fes-volubilis-meknes-day-trip.html">Volubilis, Moulay Idriss &amp; Meknes day trip</a>',
  'You are in Marrakech: the <a href="marrakech-medina-guided-tour.html">Marrakech medina tour</a>',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews: the 3 general site reviews ----------
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
{ const r = ['James T.', 'Chloé D.', 'Aisha K.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))); if (r.some(x => !x)) throw new Error('review missing'); between('<div class="dt-revs">', '</div>\n        </section>', r.join(''), 'rev'); }

// ---------- FAQ ----------
const FAQ = [
  ['Will we be taken to shops?', 'No, not unless you ask. Fes is known for tours that end in carpet and leather shops; ours earns nothing from them. To see the tannery we use a leather shop terrace, and you leave without buying.'],
  ['Is a guide worth it in the Fes medina?', 'Yes, more than in any other Moroccan city. The lanes are a real maze, phone maps lose their way, and young men offer to “show you the tannery” for money. With your guide nobody bothers you, and he shows you landmarks to find your way alone.'],
  ['How hard is the walk?', 'About 2 km in 3 to 4 hours, mostly downhill from Bab Boujeloud. Some lanes are steep and stepped. Wear closed shoes; we stop at cafés whenever you want.'],
  ['Can we go inside the Qaraouiyine?', 'The mosque is open to Muslims only. Everyone can look into its courtyard from the doors, and the Al-Attarine Madrasa next door shows the same art inside.'],
  ['What should we wear?', 'Comfortable closed shoes, and clothes that cover shoulders and knees, out of respect. A light scarf helps in the sun and at the tannery.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your tour.</p></div></details>\n`, 'faq');

// ---------- booking ----------
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.').replace(/'/g, "'")}"`, 'wa');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1' + NAME, 'mbar');
rep(/(<h2 id="hcta-title">)[^<]*/, '$1Book Your Fes Medina Tour', 'banner');

// ---------- You May Also Like: 3 Fes cards ----------
const ul = s.indexOf('<ul class="htours__list dt-others__list">');
const tplCard = s.slice(ul, s.indexOf('</li>', ul) + 5).replace(/^[\s\S]*?<li>/, '<li>');
const CARDS = [
  { href: 'fes-to-chefchaouen-day-trip.html', img: 'chefchaouen-blue-steps.jpg', alt: 'The blue steps of the Chefchaouen medina', days: 'Full day', title: 'Fes to Chefchaouen Day Trip', meta: 'Fes · Full day (08:00 to about 19:30)', desc: 'The blue city in the Rif Mountains: a guided walk through its medina, the Kasbah and the Ras El Maa spring, then free time.', facts: ['Local guide in Chefchaouen', 'About 3.5 h each way', 'Private car and driver'] },
  { href: '2-day-fes-to-merzouga-desert-tour.html', img: 'merzouga-camel-caravan.jpg', alt: 'A camel caravan in the Merzouga dunes', days: '2 days', title: '2-Day Fes to Merzouga Desert Tour', meta: 'Fes · 2 days, 1 night in the dunes', desc: 'Cedar forests and the Ziz Valley to a sunset camel ride and a night in a Merzouga desert camp, back in Fes the next evening.', facts: ['Sunset camel ride', 'Night in a desert camp', 'Back in Fes on day 2'] },
  { href: '3-day-fes-chefchaouen-volubilis-tour.html', img: 'chefchaouen-city.webp', alt: 'The blue houses of Chefchaouen', days: '3 days', title: '3-Day Fes, Chefchaouen & Volubilis Tour', meta: 'Fes · 3 days round trip', desc: 'A night in blue Chefchaouen, the Roman ruins of Volubilis, holy Moulay Idriss and imperial Meknes, then a guided day in Fes.', facts: ['Night in Chefchaouen', 'Volubilis and Meknes', 'Guided day in Fes'] },
];
const cards = CARDS.map(c => { const [w, h] = dims(c.img); let x = tplCard;
  x = x.replace(/href="[^"]*"/, `href="../tours/${c.href}"`).replace(/<img src="[^"]*" alt="[^"]*" width="\d+" height="\d+"/, `<img src="/assets/images/${c.img}" alt="${c.alt}" width="${w}" height="${h}"`)
    .replace(/(<\/svg>)[^<]*(<\/span><\/span>)/, `$1${c.days}$2`).replace(/(htour__title">)[^<]*/, `$1${c.title}`).replace(/(<\/svg>)[^<]*(<\/span>\s*<span class="htour__stars")/, `$1${c.meta}$2`)
    .replace(/(htour__desc">)[^<]*/, `$1${c.desc}`);
  let k = 0; x = x.replace(/(<span class="htour__fact">[\s\S]*?<\/svg>)[^<]*/g, (m, a) => a + c.facts[k++]); if (k !== 3) throw new Error('card facts');
  return '        ' + x + '\n'; }).join('');
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', cards, 'similar');

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Solo travellers', 'History lovers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Royal Palace of Fes', 'Bab Boujeloud', 'Bou Inania Madrasa', 'Nejjarine Museum of Wooden Arts', 'Al-Attarine Madrasa', 'Chouara Tannery'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/[“”]/g, '"') } })) };
// template has no FAQPage block: add it after the TouristTrip block
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, () => '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>\n<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld trip');
if (/"@type":"BreadcrumbList"/.test(s)) rep(/("@type":"ListItem","position":3,"name":")[^"]*/, '$1Fes Medina Tour', 'ld crumb');

const body = s.slice(s.indexOf('<main'), s.indexOf('<footer'));
for (const bad of ['Marrakech', 'Koutoubia', 'Bahia', 'Jemaa', 'Ben Youssef', 'Majorelle', 'Agafay']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
