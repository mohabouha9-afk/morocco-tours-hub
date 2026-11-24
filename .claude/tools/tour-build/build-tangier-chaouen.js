// Build tours/tangier-to-chefchaouen-day-trip.html (NEW, 2026-11-24): Tangier day trip to Chefchaouen.
// Research: .claude/research/tangier-chefchaouen-day-trip-research.md (OSRM 124 km / ~2 h 20 via Tetouan).
// Template = the FINISHED tours/fes-to-chefchaouen-day-trip.html (keeps its fixes, reviews, booking box).
// Map: node .claude/tools/route-map.mjs tours/tangier-to-chefchaouen-day-trip.html tangier-chaouen  (after this script)
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
const OUT = 'tangier-to-chefchaouen-day-trip.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Tangier to Chefchaouen Day Trip';
const TITLE = 'Tangier to Chefchaouen Day Trip | Private Blue City Tour';
const DESC = 'Private day trip from Tangier to the blue city of Chefchaouen, about 2 hours away: pick-up at your hotel or the port, a guided walk through the medina, free time for lunch and photos, back the same evening.';
const HERO = 'grand-chefchaouen-blue.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Tangier to Chefchaouen day trip, Chefchaouen day trip from Tangier, Chefchaouen tour from Tangier, blue city Morocco, Tangier shore excursion, day trip from Tangier">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Blue houses of Chefchaouen below the Rif Mountains" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Chefchaouen Day Trip</span></nav>', '<span>Tangier to Chefchaouen</span></nav>', 'crumb');
rep(/(<span class="dt-hero__loc">[\s\S]*?<\/svg>)Fes<\/span>/, '$1Tangier</span>', 'loc');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Tangier to Chefchaouen Day Trip<span class="script">The blue city, two hours away</span></h1>', 'h1');
rep('<b>About 11 hours</b>', '<b>About 10 hours</b>', 'f1');
rep('<small>Pick-up</small><b>Your hotel or riad</b>', '<small>Pick-up</small><b>Hotel, riad or port</b>', 'f2');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">From Tangier, Chefchaouen is only about 2 to 2.5 hours away, past Tetouan and up into the green Rif Mountains. That short drive is what makes this day work: you get around four hours in the blue medina, with a local guide for the highlights and free time for lunch and photos, and you are back in Tangier for dinner.</p>
          <p class="dt-lead">It suits travellers who arrive by ferry from Spain, by cruise ship or by train and want to see Chefchaouen without changing hotel. Your driver stays with you all day, and there are no shopping stops unless you ask.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Drive', 'About 2–2.5 h each way', 0], ['Time in Chefchaouen', 'About 4 hours', 1], ['Guide', 'Local professional guide included', 2],
    ['Pick-up', '08:30, hotel, riad or port', 3], ['Lunch', 'Not included, you choose', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'The blue alleys and stairways of the medina', 'Plaza Uta el-Hammam and the red walls of the Kasbah', 'The Ras El Maa spring at the top of the town',
  'The Spanish Mosque viewpoint over the blue roofs', 'Green Rif Mountain roads past Tetouan', 'Free time for lunch, photos and local crafts',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['chefchaouen-blue-steps.jpg', 'Blue-washed steps in the Chefchaouen medina'], ['chefchaouen-city.webp', 'Chefchaouen on the slopes of the Rif Mountains'],
  ['chefchaouen-blue-hour.jpg', 'Chefchaouen at dusk, the blue walls lit up'], ['chefchaouen.jpg', 'A blue lane in the old town of Chefchaouen'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['08:30', 'Pick-up in Tangier', 'Your driver-guide meets you at your hotel, at the nearest gate to your riad, or at the Tangier Ville port exit with a name sign. We confirm the time on WhatsApp the day before.'],
  ['10:45', 'Through the Rif to Chefchaouen', 'About 120 km past Tetouan and into the Rif Mountains; the last hour is a winding mountain road. A coffee stop on the way if you like.'],
  ['11:00', 'Guided walk through the medina', 'About 2 hours with a local guide: Plaza Uta el-Hammam, the Kasbah (museum entry optional), the souks and the Ras El Maa spring.'],
  ['13:00', 'Lunch and free time', 'Your guide suggests a few places; you choose where to eat (around €10–15). Then explore on your own or walk up to the Spanish Mosque viewpoint, about 20 minutes uphill.'],
  ['16:00', 'Leave Chefchaouen', 'Meet your driver at the agreed gate and drive back down through the Rif towards the coast.'],
  ['18:30', 'Back in Tangier', 'Drop-off at your hotel, riad or the port, or at a restaurant if you go out for dinner. Cruise guests: the return is planned around your all-aboard time.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', ['Private air-conditioned vehicle and driver for the day', 'Local professional guide in Chefchaouen (about 2 hours)', 'Pick-up and drop-off at your Tangier hotel, riad or port', 'Free time to explore the blue city'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunch (around €10–15, you choose where)', 'Kasbah museum entry (about 60 MAD, optional)', 'Drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'About 10 hours door-to-door, 4.5 to 5 hours of it driving',
  'The medina is a hillside of lanes and stairs: wear comfortable shoes',
  'Summer middays are hot with little shade: bring water and a hat',
  'Winter in the Rif can be cold and wet: bring a jacket',
  'No shopping stops unless you ask',
].map(t => li(INFO, t)).join(''), 'gtk');
{ const blk = s.slice(s.indexOf('<h3>Costs on the day</h3>')); const COIN = blk.match(/<li>(<svg[\s\S]*?<\/svg>)/)[1];
  between('<h3>Costs on the day</h3><ul class="dt-ticks">', '</ul></div>', [
    '<b>Kasbah museum:</b> about 60 MAD per adult (optional)',
    '<b>All other sites are free:</b> the blue medina, Uta el-Hammam square, Ras El Maa and the Spanish Mosque viewpoint',
    '<b>Lunch in Chefchaouen:</b> around €10–15 per person, depending on what you eat',
    '<b>Public toilets:</b> a few dirhams, so keep some coins',
    '<b>Tips:</b> up to you',
    '<b>Cash:</b> bring some dirhams; small payments are easier in cash',
  ].map(t => li(COIN, t)).join(''), 'costs'); }

between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A one-hour walk in the white, UNESCO-listed medina of Tetouan on the way back (back around 19:30)',
  'The Akchour waterfalls instead of part of the medina time (best May to October)',
  'Sunset at the Spanish Mosque viewpoint, back in Tangier later in the evening',
  'Pick-up and drop-off at Tanger Med port: the drive is about the same length',
  'End the day in Fes instead of Tangier (about 3.5 h from Chefchaouen)',
  'Child seats in the vehicle',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Ferry and cruise visitors with one day in Tangier', 'Travellers based in Tangier who don’t want to change hotel', 'Photographers and first-time visitors to the blue city'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You want the blue alleys at sunrise and sunset: the <a href="../tours/5-day-tangier-chefchaouen-fes-tour.html">5-day Tangier, Chefchaouen &amp; Fes tour</a> sleeps there',
  'You are staying in Fes: the <a href="../tours/fes-to-chefchaouen-day-trip.html">Fes to Chefchaouen day trip</a> starts from your riad',
  'Winding roads make you car-sick: take the front seat for the last hour, and we stop whenever you need',
].map(t => li(INFO, t)).join(''), 'think');

const FAQ = [
  ['Is Chefchaouen worth a day trip from Tangier?', 'Yes, Tangier is the easiest place to do it from. The drive is about 2 to 2.5 hours, so you get around 4 hours in town: enough for the main sights, photos and lunch without rushing. If you want the quiet early morning and the evening light, stay a night instead.'],
  ['I’m arriving by cruise ship or ferry. Will I be back in time?', 'Tell us your all-aboard or ferry time when you book. We meet you at the Tangier Ville port exit with a name sign, shorten the free time if needed, and plan to have you back at the port with time to spare. From Tanger Med the drive is about the same length.'],
  ['Is it OK for children or older travellers?', 'Yes, at an easy pace. The town is on a hillside with stairs, so the guide can keep to the flatter lower medina and stop often. Strollers don’t work in the lanes; bring a baby carrier for small children.'],
  ['Can you pick us up in Tetouan or Asilah?', 'Yes. From Tetouan the drive is only about 1 hour 15 minutes each way. From Asilah, add about 45 minutes each way. Tell us where you are staying when you book.'],
];
const BOOK = ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your trip.'];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your trip.</p></div></details>\n`, 'faq');

rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep('placeholder="Your hotel, any add-ons, questions…"', 'placeholder="Your hotel or ship, any add-ons, questions…"', 'ph');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1' + NAME, 'mbar');
rep(/(<p class="dt-map__note">[\s\S]*?<span>)[\s\S]*?(<\/span><\/p>)/, '$1Tangier to Chefchaouen, past Tetouan and up through the Rif Mountains: about 120 km, 2 to 2.5 hours each way. <a href="https://www.openstreetmap.org/?mlat=35.1688&mlon=-5.2684#map=9/35.45/-5.50" target="_blank" rel="noopener">Open the larger map</a>$2', 'mapnote');

// related: no other Tangier day trips yet → tours that fit the same traveller
rep('<a href="#others">Other Day Trips</a>', '<a href="#others">You May Also Like</a>', 'tab');
rep('<h2 id="dt-oth">Other Day Trips</h2>', '<h2 id="dt-oth">You May Also Like</h2>', 'oth h2');
rep('<p class="dt-others__all"><a href="../day-trips.html">View all day trips</a></p>', '<p class="dt-others__all"><a href="../tours/morocco-tours-from-tangier.html">View all tours from Tangier</a></p>', 'oth all');
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'tc1-similar.json', 'utf8')), 'similar');
rep(/(<li class="htours__end"><a class="htour-more" href=")[^"]*("[\s\S]*?<span class="htour-more__title">)View All Day Trips/, '$1../tours/morocco-tours-from-tangier.html$2All Tours from Tangier', 'oth end');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and where you stay in Tangier, or your ship’s times; we’ll set the pick-up.', 'banner sub');

const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Photographers', 'Cruise passengers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, BOOK].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Fes', 'Ouazzane', 'Volubilis', '3.5 hours', '200 km', '11 hours']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('wrote', OUT);
