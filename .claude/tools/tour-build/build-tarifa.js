// Build tours/tangier-day-tour-from-tarifa.html (NEW, 2026-11-24): private Tangier day for ferry passengers from Tarifa.
// Research: .claude/research/tangier-day-tour-from-tarifa-research.md (Baleària since May 2025, ~1 h crossing, passport stamp on board).
// Template = the FINISHED tours/tangier-to-chefchaouen-day-trip.html.
// Map: node .claude/tools/route-map.mjs tours/tangier-day-tour-from-tarifa.html tarifa-tangier  (after this script)
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const TPL = 'tangier-to-chefchaouen-day-trip.html';
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
const OUT = 'tangier-day-tour-from-tarifa.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Tangier Day Trip from Tarifa';
const TITLE = 'Tangier Day Trip from Tarifa | Private Tour from the Ferry';
const DESC = 'Private Tangier day trip for ferry passengers from Tarifa: met at Tangier Ville port, the medina and Kasbah with a local guide, Cap Spartel and the Caves of Hercules, back in time for your ferry.';
const HERO = ['grand-tangier-lighthouse.jpg', 1300, 866];

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Tangier day trip from Tarifa, Tarifa to Tangier tour, Tangier tour from Spain, Tarifa Tangier ferry day trip, private Tangier tour, Cap Spartel, Caves of Hercules">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO[0]}"`, 'ogimg');
rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO[0]}" alt="The Cap Spartel lighthouse among palm trees near Tangier" width="${HERO[1]}" height="${HERO[2]}" loading="eager"`, 'hero');
rep('<span>Tangier to Chefchaouen</span></nav>', '<span>Tangier from Tarifa</span></nav>', 'crumb');
rep(/(<span class="dt-hero__loc">[\s\S]*?<\/svg>)Tangier<\/span>/, '$1From Tarifa</span>', 'loc');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Tangier Day Trip from Tarifa<span class="script">Africa, one hour from Spain</span></h1>', 'h1');
rep('<small>Duration</small><b>About 10 hours</b>', '<small>In Tangier</small><b>About 6–7 hours</b>', 'f1');
rep('<small>Pick-up</small><b>Hotel, riad or port</b>', '<small>Meeting point</small><b>Tangier Ville port</b>', 'f2');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">From Tarifa, Morocco is about an hour away by ferry. We meet you at the Tangier Ville port exit and spend the day with you: the medina and the Kasbah on foot with a local guide, lunch where you like, then the coast road to Cap Spartel, where the Atlantic meets the Mediterranean, and the Caves of Hercules. You are back at the port in good time for your ferry.</p>
          <p class="dt-lead">It is just your party, not a coach group: no waiting for others, no fixed souk stop, and no shopping stops unless you ask. Your driver-guide plans the day around your ferry times, keeps the touts at a distance and stops wherever you want.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Ferry', 'Tarifa to Tangier, about 1 hour', 0], ['Meeting point', 'Tangier Ville port, name sign', 3], ['Time in Tangier', 'About 6–7 hours', 1],
    ['Guide', 'Local professional guide included', 2], ['Back at the port', '1 hour before your ferry', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'The Kasbah and its view across the Strait to Spain', 'The Grand Socco, the Petit Socco and the medina lanes', 'The American Legation, the first US property abroad',
  'Cap Spartel, where the Atlantic meets the Mediterranean', 'The Caves of Hercules and their Africa-shaped opening', 'A camel ride on the Atlantic beach, if you like',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['tangier.jpg', 'Camel ride on the Atlantic beach near the Caves of Hercules', 1170, 1553],
  ['tangier-train.jpg', 'Travellers at the Atlantic and Mediterranean signpost near Cap Spartel', 1170, 1560],
  ['tangier-kasbah-walls-sea.jpg', 'The Kasbah walls of Tangier above the Strait', 1600, 2133], ['tangier-medina-rooftops.jpg', 'Rooftops of the Tangier medina and its clock tower', 1200, 1798],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gal');
const P = [
  ['10:00', 'Meet at Tangier Ville port', 'Take the morning ferry from Tarifa (about 1 hour). Your passport is stamped on board, so join the police queue as soon as you sail. Your driver-guide waits at the port exit with a name sign.'],
  ['10:15', 'Medina and Kasbah on foot', 'About 2 hours with a local guide: the Grand and Petit Socco, the souks, the American Legation (entry optional) and up to the Kasbah for the view over the Strait.'],
  ['12:30', 'Lunch in Tangier', 'Your guide suggests a few places, from fresh fish to a tagine; you choose where to eat (around €10–15).'],
  ['14:00', 'Cap Spartel', 'About 25 minutes west along the coast to the lighthouse on the north-west tip of Africa, and the viewpoint where the Atlantic and the Mediterranean meet.'],
  ['14:45', 'Caves of Hercules and the beach', 'Ten minutes down the Atlantic coast: the sea caves with their Africa-shaped opening, then a walk or a short camel ride on the beach.'],
  ['16:30', 'Back to the port', 'About 20 minutes back to Tangier Ville. We plan to have you at the port at least 1 hour before your ferry; later sailings mean more time in Tangier.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', ['Private air-conditioned vehicle and driver for the day', 'Local professional guide in the medina and Kasbah', 'Meeting and drop-off at Tangier Ville port, with a name sign', 'A day planned around your ferry times'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Ferry tickets Tarifa ⇄ Tangier', 'Lunch (around €10–15, you choose where)', 'Museum and cave entries (optional)', 'Camel ride on the beach (optional)', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'Bring your passport: most European, UK, US, Canadian and Australian travellers need no visa',
  'Morocco is 1 hour behind Spain in summer and during Ramadan; in winter the clocks are the same',
  'Ferry times are local: check the time on both sides of the Strait',
  'Storms and strong east wind can stop the ferries: we keep an eye on the forecast with you',
  'The medina has slopes and stairs: wear comfortable shoes',
  'No shopping stops unless you ask',
].map(t => li(INFO, t)).join(''), 'gtk');
{ const blk = s.slice(s.indexOf('<h3>Costs on the day</h3>')); const COIN = blk.match(/<li>(<svg[\s\S]*?<\/svg>)/)[1];
  between('<h3>Costs on the day</h3><ul class="dt-ticks">', '</ul></div>', [
    '<b>Kasbah Museum:</b> about 20 MAD per adult (closed on Tuesdays, optional)',
    '<b>American Legation:</b> about 20 MAD per adult (closed on Sundays, optional)',
    '<b>Caves of Hercules:</b> a small fee at the entrance',
    '<b>All other sites are free:</b> the medina, the Grand and Petit Socco, the Kasbah square and Cap Spartel',
    '<b>Lunch:</b> around €10–15 per person, depending on what you eat',
    '<b>Camel ride:</b> paid to the camel owner; your guide helps you agree the price first',
    '<b>Tips:</b> up to you',
    '<b>Cash:</b> bring some dirhams; small payments are easier in cash',
  ].map(t => li(COIN, t)).join(''), 'costs'); }

between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Mint tea at Café Hafa, on the cliffs above the Strait',
  'Asilah, the white seaside town 45 minutes south, instead of the caves',
  'Coming by ferry from Algeciras? We meet you at Tanger Med, about 45 minutes from the city',
  'A later ferry back, for the sunset at Cap Spartel',
  'Stay the night and see Chefchaouen the next day',
  'Child seats in the vehicle',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Travellers on the Costa de la Luz, the Costa del Sol or in Gibraltar who want a day in Africa', 'First-time visitors who would rather not face the port touts alone', 'Families and couples who want their own pace, not a coach group'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You came for the blue city: Chefchaouen is too far with a ferry both ways in one day. Stay a night and take our <a href="../tours/tangier-to-chefchaouen-day-trip.html">Tangier to Chefchaouen day trip</a>',
  'You want more of Morocco than one city: the <a href="../tours/5-day-tangier-chefchaouen-fes-tour.html">5-day Tangier, Chefchaouen &amp; Fes tour</a> starts at the port',
  'Choppy seas make you sick: sit low in the middle of the ship, and if the forecast is bad, move your date for free',
].map(t => li(INFO, t)).join(''), 'think');

const FAQ = [
  ['Do I book the ferry myself?', 'Yes. Buy a return ticket Tarifa ⇄ Tangier Ville with the ferry company (Baleària runs the route) and send us your sailing times. We plan the day around them and tell you if a later return gives you more to see.'],
  ['What if the ferry is late or cancelled?', 'Your driver follows your sailing and waits if it is late. If storms or strong wind cancel the crossing, you move your date for free or cancel and get your deposit back.'],
  ['Is Tangier safe? Will people hassle us?', 'Tangier is a lively, safe city by day. Unofficial “guides” wait at the port, but with your own guide beside you they leave you alone; a polite “no, thank you” is enough.'],
  ['Can we start from a hotel in Tangier instead?', 'Yes. If you sleep in Tangier, we pick you up at your hotel or the nearest gate to your riad, and the day can run longer, with no ferry to catch.'],
];
const BOOK = ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your trip.'];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your trip.</p></div></details>\n`, 'faq');

rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep('placeholder="Your hotel or ship, any add-ons, questions…"', 'placeholder="Your ferry times, any add-ons, questions…"', 'ph');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1' + NAME, 'mbar');
rep(/(<p class="dt-map__note">[\s\S]*?<span>)[\s\S]*?(<\/span><\/p>)/, '$1From Tangier Ville port out to Cap Spartel and the Caves of Hercules and back: about 36 km, 25 minutes to the cape. <a href="https://www.openstreetmap.org/?mlat=35.7915&mlon=-5.924#map=12/35.78/-5.87" target="_blank" rel="noopener">Open the larger map</a>$2', 'mapnote');

between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'tdt-similar.json', 'utf8')), 'similar');
rep('<h2 id="hcta-title">Book Your Chefchaouen Day Trip</h2>', '<h2 id="hcta-title">Book Your Tangier Day Trip</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and your ferry times; we’ll be waiting at the port.', 'banner sub');

const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO[0]}`, url: URL, touristType: ['Couples', 'Families', 'First-time visitors', 'Ferry passengers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, BOOK].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Chefchaouen', 'Tetouan', 'Rif', 'Kasbah museum', '10 hours', '120 km', 'Akchour', 'blue']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('wrote', OUT);
