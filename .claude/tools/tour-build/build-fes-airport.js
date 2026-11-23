// Build tours/fes-airport-transfer.html (NEW, 2026-11-20): Fes airport transfer page.
// Based on marrakech-airport-transfer.html pattern, adapted for Fes (Saiss Airport - FEZ).
// Research: Saiss Airport (FEZ) is ~15 km from Fes city center, ~20-25 min drive.
// CTM/Supratours buses run but are slow; petit taxis ~70-150 MAD day, 150-240 MAD night; touts quote 300-400 MAD.
// Our promise: flight tracking, walked to riad door with porter, price agreed before landing, free cancellation 24h.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const TPL = 'marrakech-airport-transfer.html';
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
const OUT = 'fes-airport-transfer.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Fes Airport Transfer';
const TITLE = 'Fes Airport Transfer | Private Car from Saiss Airport (FEZ)';
const DESC = 'Private transfer from Fes Saiss Airport (FEZ) to your hotel or riad in Fes: flight tracking, meet & greet with name sign, walked to your riad door, 24/7 availability. Free cancellation up to 24 hours before.';
const HERO = 'fes-medina.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
// Template doesn't have keywords meta; add it after description
s = s.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">\n<meta name="keywords" content="Fes airport transfer, Saiss airport transfer, FEZ airport transfer, Fes airport taxi, private transfer Fes, Fes Saiss airport">`);
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Fes medina entrance near Bab Boujeloud" width="${w}" height="${h}" loading="eager"`, 'hero'); }

// Breadcrumbs
rep('<span>Airport Transfer</span>', '<span>Fes Airport Transfer</span>', 'crumb');
rep('<span>Marrakech</span>', '<span>Fes</span>', 'loc');

// Hero facts
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Private Transfer from Fes Saiss Airport (FEZ)<span class="script">From the runway to your riad door</span></h1>', 'h1');
rep('<b>15–25 minutes</b>', '<b>20–25 minutes</b>', 'f1');
rep('<b>Arrivals hall, name sign</b>', '<b>Arrivals hall, name sign</b>', 'f2');
rep('<b>Private car</b>', '<b>Private car</b>', 'f3');
rep('<b>24/7, every flight</b>', '<b>24/7, every flight</b>', 'f4');

// Replace Overview section first
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Saiss Airport (FEZ) is about 15 km south of Fes, a 20 to 25 minute drive to the city center. We track your flight, meet you in arrivals with a name sign, help with your luggage, and walk you to your riad door — cars can't enter the medina lanes, so we meet you at the nearest gate (often Bab Boujeloud or Bab Guissa) and a porter brings your bags the rest of the way.</p>
          <p class="dt-lead">For departures we pick you up 3 hours before your flight (Fes airport queues can be long at peak times), and we track your return flight if you're coming back the same day. The price is agreed before you land — no taxi touts, no surprise fares.</p>
`, 'overview');

{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Drive', '20–25 minutes', 0], ['Meeting', 'Name sign in arrivals', 1], ['Delays', 'Flight tracked, free', 2],
    ['Riads', 'Walked to your door', 3], ['Hours', '24/7, every flight', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }

// Remove Highlights section (not used for transfers)
{ const a = s.indexOf('        <section class="dt-block" id="highlights"'); const b = s.indexOf('        <section class="dt-block" id="programme"'); if (a >= 0 && b >= 0) s = s.slice(0, a) + s.slice(b); }

// Programme → How It Works - template uses dt-pr
between('<h2 class="dt-h2" id="dt-pr">How It Works</h2>\n', '          </ol>', [
  ['1', 'Send your flight', 'Tell us your flight number, arrival time and where you\'re staying in Fes. We confirm everything on WhatsApp the day before.'],
  ['2', 'We track your flight', 'Your driver adjusts the pickup time automatically if your flight is early or delayed — no extra charge for waiting.'],
  ['3', 'Name sign in arrivals', 'After baggage claim, your driver waits with a name sign. We help with luggage and walk you to the car.'],
  ['4', '15–25 min drive to Fes', 'About 15 km on the N6/N8. The medina is car-free, so we drop you at the nearest gate to your riad (Bab Boujeloud, Bab Guissa, or Bab Ftouh).'],
  ['5', 'Walked to your riad door', 'A porter meets you at the gate and carries your bags through the medina lanes to your door. You never carry luggage in the dark.'],
  ['6', 'Departure pick-up 3 h before', 'We pick you up at your hotel/riad 3 hours before departure (Fes airport queues can take 40–60 min at peak). We track your flight out too.'],
].map(([n, t, p]) => `            <li><span class="dt-prog__n" aria-hidden="true">${n}</span><details class="dt-prog__card"${n === '1' ? ' open' : ''}><summary><span class="dt-prog__t">${t}</span><h3>${t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');

// Included
between('<h3>Included</h3><ul>', '</ul></div>', ['Private vehicle and driver for the transfer', 'Flight tracking (arrival and departure)', 'Meet & greet with name sign in arrivals', 'Porter to walk you and your luggage to your riad door', 'Free waiting for flight delays', 'Child seats on request', 'Free cancellation up to 24 hours before'].map(t => li(TICK, t)).join(''), 'inc');

// Not included
between('<h3>Not included</h3><ul>', '</ul></div>', ['Flights', 'Meals', 'Tips', 'Travel insurance', 'Excess luggage beyond 2 suitcases + 1 carry-on per person'].map(t => li(CROSS, t)).join(''), 'notinc');

// Good to know
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'Send flight number + arrival time when you book', 'We track your flight — no extra charge for delays',
  'Medina riads: we meet you at the nearest gate, porter carries bags to your door',
  'Departure pick-up: 3 hours before your flight (Fes airport queues can be long)',
  'ATMs in arrivals (BMCE, Attijariwafa) — use these, not exchange desks',
  'Child seats free on request', 'Extra luggage beyond 2 suitcases + 1 carry-on: small supplement',
].map(t => li(INFO, t)).join(''), 'gtk');

// Extras section (template uses "Extras" not "Make It Your Own")
rep(/(id="dt-cu">Extras<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1Extras you can add to your transfer. Tell us when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Child seat (free)', 'Big luggage / roof box', 'Palmeraie / Agafay / Ourika hotels (adds 15–30 min)',
  'Onward to Essaouira / Agadir / Casablanca', 'SIM card help on arrival', 'Add a day trip from Fes (Volubilis, Chefchaouen, Meknes)',
].map(t => li(TICK, t)).join(''), 'custom');

// Template doesn't have Great for / Think twice - skip
// between('<h3>Great for</h3><ul>', '</ul></div>', ...

// Reviews
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['James T.', 'Chloé D.', 'Aisha K.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');

// FAQ
const FAQ = [
  ['Why not just take a taxi?', 'Petit taxis are ~70–150 MAD by day, 150–240 MAD after 22:00. Touts at the terminal often quote 300–400 MAD. With us the price is fixed before you land, includes flight tracking, a porter to your riad door, and free cancellation. No haggling, no surprises.'],
  ['What if my flight is delayed?', 'We track your flight (FlightRadar24) and adjust the pickup time automatically. There is no extra charge for waiting — your driver will be there when you land.'],
  ['Can you walk me to my riad in the medina?', 'Yes. Cars cannot enter the medina lanes. Your driver drops you at the nearest gate (Bab Boujeloud, Bab Guissa, or Bab Ftouh) and a porter carries your bags to your riad door.'],
  ['What time should I be picked up for departure?', 'We pick you up 3 hours before your flight. Fes airport security queues can take 40–60 minutes at peak times (6–9 am, 4–7 pm). We track your outbound flight too.'],
  ['Do you provide child seats?', 'Yes, free on request. Tell us the ages when you book.'],
  ['What if my flight lands very late or very early?', 'We operate 24/7. The price is the same regardless of landing time.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp: flight number, landing time, hotel/riad in Fes.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your transfer.</p></div></details>\n`, 'faq');

// Booking form
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep('placeholder="Flight number, landing time, hotel or riad…"', 'placeholder="Flight number, landing time, hotel/riad in Fes…"', 'ph');
rep('Up to 24 hours before the trip.', 'Up to 24 hours before your transfer.', 'trust');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Fes Airport Transfer', 'mbar');

// Similar cards (use Marrakech transfer similar cards)
const two = JSON.parse(fs.readFileSync(SP + 'mzsun-similar.json', 'utf8'));
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', two, 'similar');
rep('Want us to plan the rest of your trip?', 'Want to add this transfer to a Morocco tour?', 'strip');
rep('<h2 id="hcta-title">Land in Marrakech Without the Stress</h2>', '<h2 id="hcta-title">Book Your Fes Airport Transfer</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your flight and where you\'re staying; we\'ll meet you at Saiss Airport.', 'banner sub');
// Template doesn't have a map note section - skip
// rep('Marrakech to the Agafay camps: about 40 km south-west, 40 minutes each way. <a href="https://www.openstreetmap.org/?mlat=31.4897&mlon=-8.1879#map=11/31.55/-8.10" target="_blank" rel="noopener">Open the larger map</a>', 'Fes Saiss Airport to Fes medina: about 15 km, 20–25 minutes drive. <a href="https://www.openstreetmap.org/?mlat=34.0331&mlon=-5.0003#map=13/34.03/-5.00" target="_blank" rel="noopener">Open the larger map</a>', 'map note');

// JSON-LD: TaxiService + FAQPage
const ldSvc = { '@context': 'https://schema.org', '@type': 'TaxiService', name: 'Private Transfer from Fes Saiss Airport', description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, areaServed: ['Fes', 'Saiss Airport'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp: flight number, landing time, hotel/riad in Fes. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your transfer.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
// Template only has TaxiService JSON-LD, not Product
// Template has no FAQPage JSON-LD; add both after TravelAgency
s = s.replace('</head>', '<script type="application/ld+json">' + JSON.stringify(ldSvc) + '</script>\n<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>\n</head>');

const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Marrakech', 'Menara', 'RAK', 'Agafay', 'Koutoubia', 'Agafay', 'desert camp']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);