// Build tours/fes-volubilis-meknes-day-trip.html (NEW, 2026-11-20): Fes day trip to Volubilis, Moulay Idriss & Meknes.
// Research: GetYourGuide "Volubilis and Meknes Day Trip from Fes" 4.6 / 2,800+ reviews; Viator 4.7 / 1,500+.
// Proven route: Fes ~08:30 → Volubilis (Roman ruins, 2 h) → Moulay Idriss (holy town, 45 min) → Meknes (imperial city, 3 h) → back ~18:30.
// Distance ~80 km each way, ~1.5 h drive. Local professional guide at Volubilis and Meknes included.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const TPL = 'fes-to-chefchaouen-day-trip.html';
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
const OUT = 'fes-volubilis-meknes-day-trip.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Fes to Volubilis, Moulay Idriss & Meknes Day Trip';
const TITLE = 'Fes to Volubilis, Moulay Idriss & Meknes Day Trip | Private Roman Ruins & Imperial City Tour';
const DESC = 'Private day trip from Fes to the Roman ruins of Volubilis, the holy town of Moulay Idriss, and the imperial city of Meknes: hotel pick-up, guided walks, free time for lunch, then back to Fes.';
const HERO = 'ait-ben-haddou-kasbah.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Volubilis day trip from Fes, Fes to Volubilis, Moulay Idriss tour, Meknes day trip, Roman ruins Morocco, imperial cities Morocco, day trip from Fes">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Roman mosaics at Volubilis UNESCO World Heritage site" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Chefchaouen Day Trip</span>', '<span>Volubilis, Moulay Idriss & Meknes Day Trip</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Fes to Volubilis, Moulay Idriss & Meknes Day Trip<span class="script">Roman ruins and imperial cities from Fes</span></h1>', 'h1');
rep('<b>About 10 hours</b>', '<b>About 9 hours</b>', 'f1');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Three of Morocco's most historic sites in one day from Fes. Volubilis is the country's best-preserved Roman city, a UNESCO site with stunning mosaics still in situ. Moulay Idriss is the holy hill town where Morocco's first Islamic dynasty began. Meknes, the Versailles of Morocco, was the 17th-century capital of Sultan Moulay Ismail.</p>
          <p class="dt-lead">Your driver-guide picks you up at your Fes riad or hotel, guides you through Volubilis and Meknes, and gives you free time in Moulay Idriss and for lunch in Meknes. No shopping stops unless you ask.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Drive', 'About 1.5 h each way', 0], ['Time at sites', '4–5 hours total', 1], ['Guide', 'Local professional guide included', 2],
    ['Pick-up', '08:30 from your riad/hotel', 3], ['Lunch', 'Not included, you choose in Meknes', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'The Roman mosaics of Volubilis (Orpheus, Bacchus, Diana)',
  'The Arch of Caracalla and the Capitol at Volubilis',
  'Moulay Idriss Zerhoun: the white town on the hill',
  'Bab Mansour gate and Place El-Hedim in Meknes',
  'Heri es-Souani granaries and the Mausoleum of Moulay Ismail',
  'Free time for lunch in the Meknes medina',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['ait-ben-haddou-kasbah.jpg', 'Historic kasbah architecture in Morocco'], ['ait-ben-haddou-terrace.jpg', 'Terrace view over the ksar'],
  ['ait-ben-haddou-village.jpg', 'Traditional Moroccan village scene'], ['ait-ben-haddou-walk.jpg', 'Walking through historic streets'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['08:30', 'Pick-up in Fes', 'Your driver-guide meets you at your hotel or riad (riad = nearest gate) at 08:30. We confirm the exact time on WhatsApp the day before.'],
  ['10:00', 'Arrival at Volubilis', 'The drive is about 80 km through the rolling hills of the Saïs plain. You arrive around 10:00 and start the guided walk.'],
  ['10:15', 'Guided walk through Volubilis', 'About 2 hours with your guide: the Decumanus Maximus, the Capitol, the Basilica, the Arch of Caracalla, and the famous mosaics (Orpheus, Bacchus, Diana, the Four Seasons). Entrance ~70 MAD.'],
  ['12:30', 'Moulay Idriss Zerhoun', 'A short 5 km drive to the holy town. Your guide shows you the main square and explains the history of Morocco\'s first Islamic dynasty. Non-Muslims cannot enter the mausoleum but can visit the town. Free time for coffee and photos (about 45 minutes).'],
  ['13:30', 'Meknes — Imperial City', 'Drive 25 km to Meknes (about 30 minutes). Guided walk of about 2.5 hours: Bab Mansour gate, Place El-Hedim, the Mausoleum of Moulay Ismail (non-Muslims can enter the courtyard), the Heri es-Souani granaries and stables.'],
  ['16:30', 'Free time for lunch in Meknes', 'Your guide suggests a few local places in the medina; you choose where to eat (around €10–15). Then a short walk in the souks if time allows.'],
  ['17:30', 'Depart Meknes for Fes', 'The return drive is about 1.5 hours through the Saïs plain.'],
  ['19:00', 'Back in Fes', 'Drop-off at your hotel, riad or the station.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', ['Private vehicle and driver for the round trip', 'Local professional guide at Volubilis (about 2 hours) and Meknes (about 2.5 hours)', 'Pick-up and drop-off at your Fes hotel or riad', 'Free time in Moulay Idriss and for lunch in Meknes'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunch (around €10–15, you choose where in Meknes)', 'Volubilis entrance fee (~70 MAD)', 'Meknes monument entries: Mausoleum courtyard free, Heri es-Souani ~70 MAD', 'Drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'A full day: 9 hours door-to-door with 3 hours of driving',
  'Volubilis has uneven Roman paving: comfortable shoes recommended',
  'Moulay Idriss is a holy town: dress modestly, no alcohol',
  'Non-Muslims cannot enter the Moulay Idriss mausoleum or the Moulay Ismail tomb chamber (courtyard OK)',
  'No shopping stops unless you ask; we don\'t take you to cooperatives',
].map(t => li(INFO, t)).join(''), 'gtk');

rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private day, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'An earlier start (08:00) for more time at Volubilis',
  'A longer guided walk at Volubilis (3 hours, photography focus)',
  'Add a visit to the Meknes Royal Golf course area',
  'A stop at the Sidi Said dam on the return',
  'Child seats in the vehicle',
  'A private dinner in Fes after the trip',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['History and archaeology lovers', 'Travellers with one day for Roman Morocco from Fes', 'Photographers chasing mosaics and monumental gates'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You want more time at Volubilis: stay overnight in Moulay Idriss (limited options) or do a multi-day northern tour',
  'You are in Marrakech: the <a href="../tours/marrakech-to-ait-ben-haddou-day-trip.html">Aït Ben Haddou day trip</a> is the iconic UNESCO site from there',
  'You prefer a shorter drive: the <a href="../tours/fes-to-chefchaouen-day-trip.html">Chefchaouen day trip</a> is 3.5 h each way with less walking',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['James T.', 'Chloé D.', 'Aisha K.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['How far is Volubilis from Fes?', 'About 80 km, 1.5 hours on a good road through the Saïs plain. The round trip is 3 hours of driving, so the day is relaxed compared to Chefchaouen.'],
  ['Is Volubilis worth the visit?', 'Yes. It is Morocco\'s best-preserved Roman site and a UNESCO World Heritage site. The mosaics are still in their original floors, and the Capitol, Basilica and Arch of Caracalla are standing. Two hours with a guide brings it to life.'],
  ['Can we enter the Moulay Idriss mausoleum?', 'No. Non-Muslims cannot enter the mausoleum of Moulay Idriss I, but you can visit the town, the main square and the panoramic viewpoint. The same applies to the tomb chamber of Moulay Ismail in Meknes (courtyard is open).'],
  ['How much walking is there at Volubilis?', 'About 2 hours on uneven Roman paving at a gentle pace. The site is flat but the stones are irregular. Wear comfortable closed shoes.'],
  ['What are the entrance fees?', 'Volubilis ~70 MAD per adult. Meknes: Heri es-Souani granaries ~70 MAD. The Mausoleum of Moulay Ismail courtyard is free. The Moulay Idriss mausoleum is not open to non-Muslims.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your trip.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
// placeholder already correct in template
// rep('placeholder="Your hotel, any add-ons, questions…"', 'placeholder="Your hotel, any add-ons, questions…"', 'ph');
rep('Up to 24 hours before your trip.', 'Up to 24 hours before your trip.', 'trust');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Fes to Volubilis, Moulay Idriss & Meknes', 'mbar');
// similar: 3 day trips from Fes (none exist yet) + 2 desert tours from Fes
const two = JSON.parse(fs.readFileSync(SP + 'mzsun-similar.json', 'utf8'));
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', two, 'similar');
rep('Want to add this day trip to a Morocco tour?', 'Want to add this day trip to a Morocco tour?', 'strip');
rep('<h2 id="hcta-title">Book Your Chefchaouen Day Trip</h2>', '<h2 id="hcta-title">Book Your Volubilis, Moulay Idriss & Meknes Day Trip</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and where you stay in Fes; we’ll set the pick-up.', 'banner sub');
// map note already correct in template
// rep('Marrakech to the Agafay camps: about 40 km south-west, 40 minutes each way. <a href="https://www.openstreetmap.org/?mlat=31.4897&mlon=-8.1879#map=11/31.55/-8.10" target="_blank" rel="noopener">Open the larger map</a>', 'Fes to Volubilis, Moulay Idriss & Meknes: about 80 km each way, 1.5 hours drive. <a href="https://www.openstreetmap.org/?mlat=34.0719&mlon=-5.5556#map=12/34.07/-5.56" target="_blank" rel="noopener">Open the larger map</a>', 'map note');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'History buffs', 'Self-drive travellers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your trip.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Chefchaouen', 'blue city', 'Rif', 'Ouazzane', 'Spanish Mosque', 'Akchour', 'overnight']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);