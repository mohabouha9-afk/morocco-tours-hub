// Build tours/erg-chigaga-luxury-desert-camp.html (NEW, 2026-11-18, owner chose it): one night at a luxury camp in Erg Chigaga.
// Demand (US, on file): "erg chigaga luxury camp" 390/month, "erg chigaga camp" 390, "erg chigaga" 480, "m'hamid" 210 — no product page
// until now (camps only inside the 3/4/7-day tours). Research: .claude/research/tour-4day-erg-chigaga-research.md (M'Hamid → dunes
// ~50–60 km of piste, 1.5–2.5 h by 4×4; out to Foum Zguid ~3 h across the Iriqui dry lake; dunes ~50–60 m, lower than Erg Chebbi:
// sell remoteness, never "biggest dunes"; most guests arrive by 4×4, camel ride from camp at sunset). Booking listings (2026-11-18):
// a normal car cannot reach the camps, transfer from M'Hamid required; operators meet guests at their M'Hamid guesthouse or an
// agreed point; one charges €230 return for the 4×4. Camps = the 2 luxury ones on our tour pages (TA links). Template = the camp page.
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
const OUT = 'erg-chigaga-luxury-desert-camp.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Erg Chigaga Luxury Desert Camp';
const TITLE = 'Erg Chigaga Luxury Desert Camp | Private Night with 4×4 from M’Hamid';
const DESC = 'A night at a luxury camp in Erg Chigaga, Morocco’s wildest dunes: a private 4×4 from M’Hamid across the desert, a sunset camel ride, a tent with its own bathroom and hot shower, dinner by the fire and sunrise.';
const HERO = 'desert-camel-acacia-tree.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Erg Chigaga luxury camp, Erg Chigaga camp, Erg Chegaga desert camp, M\'Hamid desert camp, luxury desert camp Morocco, Erg Chigaga 4x4">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Camels resting by an acacia tree in an empty desert" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<a href="../destinations/merzouga.html">Merzouga</a><span class="sep">›</span><span>Desert Camp &amp; Camel Ride</span>', '<a href="../sahara-desert-tours.html">Sahara Desert Tours</a><span class="sep">›</span><span>Erg Chigaga Luxury Camp</span>', 'crumb');
rep(/(<span class="dt-hero__loc"><svg[\s\S]*?<\/svg>)Merzouga(<\/span>)/, '$1Erg Chigaga$2', 'loc');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Erg Chigaga Luxury Desert Camp<span class="script">Where the road ends and the dunes begin</span></h1>', 'h1');
rep('<b>Overnight, sunset to morning</b>', '<b>Overnight, about 24 hours</b>', 'f1');
rep('<b>Merzouga or your hotel</b>', '<b>M’Hamid</b>', 'f2');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Erg Chigaga lies beyond the end of the road: about two hours by 4×4 from M’Hamid, across stony plains and dry riverbeds, to a sea of dunes with no village in sight. You arrive in the afternoon, ride a camel to a ridge for the sunset and spend the night in a large tent with your own bathroom and hot shower.</p>
          <p class="dt-lead">The dunes are lower than in Merzouga, but the silence is deeper and the night sky darker. A private 4×4 with your driver takes you in and brings you back, and every detail is agreed before you arrive.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Meeting', 'M’Hamid, around 13:00', 0], ['4×4 to camp', 'About 2 h off-road', 1], ['Camel ride', 'About 1 hour at sunset', 2],
    ['Bathroom', 'Inside your tent', 3], ['Meals', 'Dinner and breakfast', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Off-road by 4×4 to the end of the piste', 'A sea of dunes with no village in sight', 'Sunset from a dune ridge by camel',
  'Your own toilet and hot shower', 'One of the darkest night skies in Morocco', 'Sunrise in total silence',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['desert-acacia-camels.jpg', 'Camels and an acacia tree on the way to the dunes'], ['camel-dune-ridge.jpg', 'Camels walking along a dune ridge'],
  ['luxury-camp-bathtub.jpg', 'A private bathroom inside a luxury desert tent'], ['desert-camp-lanterns.jpg', 'Lanterns lighting a desert camp after dark'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['Early afternoon', 'Meet us in M’Hamid', 'Around 13:00 at your guesthouse or our meeting point in M’Hamid, the last village on the road. Coming from Zagora or Ouarzazate? We can pick you up there instead; we confirm the time on WhatsApp the day before.'],
  ['Afternoon', 'Off-road to Erg Chigaga', 'About 2 hours by 4×4 across stony plains, dry riverbeds and small dunes, with a stop at an oasis well. Expect a bumpy, dusty ride: part of the adventure.'],
  ['Before sunset', 'Into your tent', 'Mint tea at the camp and time to settle into a large tent with a real bed and your own bathroom.'],
  ['Sunset', 'Camel ride to the ridge', 'About 1 hour by camel with your guide to a high dune for the sunset, then back to camp as the sky turns dark.'],
  ['Evening', 'Dinner and the stars', 'Dinner by the fire, Berber music, then a sky full of stars with no lights for many miles.'],
  ['Morning', 'Sunrise and back', 'Sunrise on the dunes, breakfast, then about 2 hours by 4×4 back to M’Hamid, or about 3 hours west across the Iriqui dry lake to Foum Zguid.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private 4×4 with driver, M’Hamid to the camp and back', 'A luxury tent with a real bed and linens', 'Your own toilet and hot shower inside the tent',
  'Camel ride of about 1 hour at sunset', 'Dinner and breakfast', 'Sandboards on the dunes', 'Water on the 4×4 drive',
].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Transport to M’Hamid', 'Lunch', 'Drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'A normal car cannot reach the camps: the 4×4 is needed', 'The 4×4 ride is bumpy: tell us about back problems',
  'Phone signal is weak or none at the camp', 'Winter nights reach 0–5 °C: bring a warm layer', 'Best from October to April; summer is very hot',
].map(t => li(INFO, t)).join(''), 'gtk');

// Your Camp: Erg Chigaga luxury camps
rep(/(id="dt-st">Your Camp<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1We book luxury camps where the bathroom is inside the tent and the water is hot. Our picks:$2', 'stay lead');
between('<table class="dt-acc">', '</table>', `
            <thead><tr><th scope="col">Camp</th><th scope="col">Your tent</th><th scope="col">Why we like it</th></tr></thead>
            <tbody><tr><th scope="row"><a href="https://www.tripadvisor.com/Hotel_Review-g664990-d1965447-Reviews-Erg_Chigaga_Luxury_Desert_Camp-M_Hamid_Souss_Massa.html" target="_blank" rel="noopener nofollow">Erg Chigaga Luxury Desert Camp</a></th><td>Large tent with its own bathroom and hot shower</td><td>Rated 4.9 from over 400 reviews</td></tr><tr><th scope="row"><a href="https://www.tripadvisor.com/Hotel_Review-g12912000-d17613059-Reviews-Desert_Luxury_Camp_Erg_Chigaga-El_Gouera_Souss_Massa.html" target="_blank" rel="noopener nofollow">Desert Luxury Camp Erg Chigaga</a></th><td>Tent with its own bathroom and flushing toilet</td><td>A smaller, quiet camp</td></tr></tbody>
          `, 'stay table');
rep('<p class="dt-acc__note">Or similar, depending on availability. Prefer another camp? Tell us when you book.</p>',
  '<p class="dt-acc__note">Or similar, depending on availability. Prefer a simpler camp with shared bathrooms? Ask us: it costs less.</p>', 'stay note');

rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private night, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A second night in the dunes', 'Out across the Iriqui dry lake to Foum Zguid', 'Pick-up in Zagora or Ouarzazate',
  'A sunrise camel ride too', 'A private dinner on a dune', 'Tamegroute pottery and library on the way in',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Travellers who want quiet, empty dunes', 'Couples looking for a remote night', 'Photographers chasing dark skies'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want the tallest dunes? Erg Chebbi is higher: our <a href="merzouga-luxury-desert-camp.html">Merzouga luxury camp</a>',
  'Starting in Marrakech? The <a href="3-day-marrakech-erg-chigaga-tour.html">3-day Erg Chigaga tour</a> brings you here and back',
  'A bumpy ride worries you? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> stays on paved roads to the dunes',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Sarah L.', 'Aisha K.', 'Chloé D.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['How do we get to M’Hamid?', 'M’Hamid is the last village on the road south, about 7 to 8 hours’ drive from Marrakech and 1.5 hours from Zagora. Drive yourself, take a bus to Zagora, or join our 3-day Erg Chigaga tour from Marrakech.'],
  ['Can we drive our own car to the camp?', 'Not in a normal car: the last 50 km or so are desert piste and soft sand. You leave your car in M’Hamid and we take you in by 4×4. Tell us your car when you book and we confirm where to park.'],
  ['Erg Chigaga or Merzouga?', 'Merzouga’s dunes are higher, up to about 150 m, and easy to reach on paved roads. Erg Chigaga’s are lower, about 50 to 60 m, but far more remote: no road, no village and very few people.'],
  ['What makes the camp “luxury”?', 'The bathroom is inside your tent and for you only, with a hot shower and a flushing toilet; a real bed with good linens; and a quieter camp. Simpler camps share their bathrooms.'],
  ['When is the best time to go?', 'October to April. From June to August days pass 40 °C and the 4×4 ride is tiring; from December to February nights drop close to freezing, so bring warm layers.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your night.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep('placeholder="Camp level, how you arrive, questions…"', 'placeholder="Where we meet you, your car, questions…"', 'ph');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Erg Chigaga Luxury Camp', 'mbar');
// You May Also Like: Erg Chigaga tours (cards copied from tours/index) + the Merzouga luxury camp
const IDX = fs.readFileSync(root + 'tours/index.html', 'utf8');
const card = slug => { const i = IDX.indexOf(`href="../tours/${slug}"`); const a = IDX.lastIndexOf('<article class="htour">', i); const b = IDX.indexOf('</article>', i) + 10; if (a < 0 || b < 10) throw new Error('card ' + slug); return '        <li>' + IDX.slice(a, b).replace(`href="../tours/${slug}"`, `href="${slug}"`) + '</li>\n'; };
const lux = JSON.parse(fs.readFileSync(SP + 'mz-cards.json', 'utf8'))['merzouga-luxury-desert-camp.html'].replace(/^\s*/, '        ').replace(/\s*$/, '\n');
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', card('3-day-marrakech-erg-chigaga-tour.html') + card('4-day-marrakech-erg-chigaga-tour.html') + lux, 'similar');
rep('<a href="../destinations/merzouga.html">All things to do in Merzouga</a>', '<a href="../sahara-desert-tours.html">All Sahara desert tours</a>', 'all link');
rep(/(<a class="htour-more" href=")\.\.\/destinations\/merzouga\.html("[\s\S]*?<span class="htour-more__title">)All Merzouga Activities/, '$1../sahara-desert-tours.html$2All Desert Tours', 'end link');
rep('<h2 id="hcta-title">Book Your Night in the Dunes</h2>', '<h2 id="hcta-title">Book Your Night in Erg Chigaga</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and where you start; we’ll meet you in M’Hamid.', 'banner sub');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Adventure travellers', 'Photographers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your night.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Merzouga', 'Standard', 'Deluxe', 'Milky Way', 'parking']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
