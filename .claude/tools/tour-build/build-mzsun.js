// Build tours/merzouga-sunset-camel-ride.html (NEW, 2026-11-17): Merzouga activities page 2, a sunset camel ride without the night.
// Template = the finished Merzouga desert camp page (no Costs box, no map: owner). Research: Pelago "Merzouga Sunset Adventure"
// (bestseller, about 2.5 h: camel trek, sandboarding, sunset viewing); Trip.com quad + sandboarding 4.9/70 with reviewers praising the
// sunset and sunrise camel rides. Sunrise offered as the alternative.
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
const OUT = 'merzouga-sunset-camel-ride.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Merzouga Sunset Camel Ride';
const TITLE = 'Merzouga Sunset Camel Ride in the Erg Chebbi Dunes | Private';
const DESC = 'A private sunset camel ride in the Erg Chebbi dunes at Merzouga: about 2.5 hours with your own camel guide, the sunset from a high ridge, sandboarding, and free parking for your car. Sunrise rides too.';
const HERO = 'sahara-camel-pink-sunset.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Merzouga camel ride, sunset camel ride Merzouga, Erg Chebbi camel ride, camel trek Merzouga, sunrise camel ride Sahara, Merzouga sandboarding">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Camels crossing the dunes at a pink Sahara sunset" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Desert Camp &amp; Camel Ride</span>', '<span>Sunset Camel Ride</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Merzouga Sunset Camel Ride<span class="script">The dunes turn red, the camels walk on</span></h1>', 'h1');
rep('<b>Overnight, sunset to morning</b>', '<b>About 2.5 hours</b>', 'f1');

// remove the Your Camp section + tab
rep('<a href="#stay">Your Camp</a>', '', 'tab');
{ const a = s.indexOf('        <section class="dt-block" id="stay"'); const b = s.indexOf('        <section class="dt-block" id="custom"'); if (a < 0 || b < a) throw new Error('stay'); s = s.slice(0, a) + s.slice(b); }

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Ride a camel into the Erg Chebbi dunes in the late afternoon, climb a high ridge for the sunset and try sandboarding down the sand, then ride back as the dunes turn blue and the first stars come out.</p>
          <p class="dt-lead">A short taste of the Sahara for travellers staying in Merzouga or passing through: your own camel guide, no camp night needed and nothing to pay on the spot. Prefer the morning? We run it at sunrise too.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Meeting', '1.5 h before sunset', 0], ['Camel ride', 'About 45 min each way', 1], ['Sandboarding', 'Free on the dunes', 3],
    ['Guide', 'Your own camel guide', 2], ['Parking', 'Free in Merzouga', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Golden light on the Erg Chebbi dunes', 'The sunset from the top of a ridge', 'Sandboarding down the sand',
  'Long camel shadows on the sand', 'The dunes turning blue after sunset', 'The first stars on the ride back',
].map(t => li(TICK, t)).join(''), 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['merzouga-camel-ride-dunes.jpg', 'A camel ride through the Merzouga dunes'], ['merzouga-white-camel.jpg', 'A white camel resting on the dunes'],
  ['sandboarding.jpg', 'Sandboarding down a dune'], ['camel-dune-ridge.jpg', 'Camels walking along a dune ridge'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['Late afternoon', 'Meet us in Merzouga', 'About 1.5 hours before sunset: around 16:30 in winter, 19:00 in summer. We meet you at your hotel or our meeting point and confirm the time on WhatsApp the day before.'],
  ['Before sunset', 'Into the dunes', 'About 45 minutes at walking pace into Erg Chebbi with your own camel guide, the sand turning gold around you as the sun drops.'],
  ['Sunset', 'Up on the ridge', 'Climb a high dune on foot for the sunset and photos, and take a sandboard down the slope as many times as you like.'],
  ['Dusk', 'Ride back under the first stars', 'About 45 minutes back while the dunes turn blue and the sky darkens. Bring a layer: it cools quickly once the sun has gone.'],
  ['After dark', 'Back in Merzouga', 'About 30 minutes after sunset, at your hotel or your car. Want to stay longer? Ask about dinner in the dunes or a night at the camp.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', ['Camel ride of about 1.5 hours in all', 'Your own camel guide', 'Sandboards on the dunes', 'Meeting at your Merzouga hotel or our meeting point', 'Free parking while you ride'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Transport to Merzouga', 'Drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'A scarf keeps off the sun and the blowing sand', 'Closed shoes or bare feet: sandals fill with sand',
  'Summer: the ride starts in the cooler evening', 'Winter: bring a warm layer for the ride back', 'Pregnant, or a bad back? Walk beside the caravan instead',
].map(t => li(INFO, t)).join(''), 'gtk');

rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private ride, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'A sunrise ride instead of sunset', 'Stay the night at a <a href="merzouga-desert-camp-camel-ride.html">desert camp</a>', 'A longer ride, deeper into the dunes',
  'A quad or buggy ride before the sunset', 'Mint tea and dates on the dunes', 'A private dinner on a dune afterwards',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Travellers staying in a Merzouga hotel', 'Children and first-time riders', 'Photographers chasing the evening light'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You want to sleep in the dunes: our <a href="merzouga-desert-camp-camel-ride.html">desert camp night</a> includes this ride',
  'You are in Marrakech without a car: our <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga desert tour</a> brings you here',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Lukas M.', 'Sarah L.', 'Chloé D.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['Sunset or sunrise: which is better?', 'Both are beautiful. Sunset is easier to fit into your day and the sand is warm; sunrise is quieter and cooler, best in summer. Tell us which you prefer when you book.'],
  ['Is riding a camel uncomfortable?', 'For about 45 minutes each way it is fine for most people. Hold on and lean back when the camel stands up and kneels down; your camel guide shows you how.'],
  ['Can children ride?', 'Yes. The camels walk slowly and young children ride with a parent or are led by the camel guide. Sandboarding is the part they usually love most.'],
  ['Are the camels treated well?', 'We work with camel teams we know: the camels rest between rides and walk at their own pace. If you would rather not ride, walk beside the caravan.'],
  ['What should we bring?', 'A scarf or hat, sunglasses, a warm layer for the ride back, and closed shoes. Leave bags in the car; a phone or camera is all you need.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your ride.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep('placeholder="Camp level, how you arrive, questions…"', 'placeholder="Sunset or sunrise, your hotel, questions…"', 'ph');
rep('Up to 24 hours before your night.', 'Up to 24 hours before your ride.', 'trust');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Merzouga Sunset Camel Ride', 'mbar');
// similar: camp page card (made from a tour card) + 2 Merzouga tours
const cards = JSON.parse(fs.readFileSync(SP + 'mzcamp-similar.json', 'utf8')).split('</li>').filter(x => x.trim()).map(x => x + '</li>');
const [cw, ch] = dims('desert-camp-aerial-circular.jpg');
const campCard = cards[0].replace('href="3-days-desert-tour-marrakech-to-merzouga.html"', 'href="merzouga-desert-camp-camel-ride.html"')
  .replace(/<img src="[^"]*" alt="[^"]*" width="\d+" height="\d+"/, `<img src="/assets/images/desert-camp-aerial-circular.jpg" alt="Merzouga Desert Camp &amp; Sunset Camel Ride" width="${cw}" height="${ch}"`)
  .replace(/(<\/svg>)3 Days(<\/span>)/, '$1Overnight$2').replace(/(<h3 class="htour__title">)[^<]*/, '$1Merzouga Desert Camp &amp; Sunset Camel Ride')
  .replace(/(<p class="htour__desc">)[^<]*/, '$1A sunset camel ride into Erg Chebbi, a private tent with bathroom, dinner and drums by the fire, and sunrise on the dunes.')
  .replace(/(<b>Start:<\/b> )Marrakech/, '$1Merzouga').replace(/(<b>End:<\/b> )Marrakech/, '$1Merzouga').replace(/(<\/svg>)Private tour(<\/span>)/, '$1Private night$2');
const two = JSON.parse(fs.readFileSync(SP + 'mzsun-similar.json', 'utf8'));
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', campCard.replace(/^\s*/, '        ') + '\n' + two, 'similar');
rep('Want to add a desert night to a Morocco tour?', 'Want to add this experience to a Morocco tour?', 'strip');
rep('<h2 id="hcta-title">Book Your Night in the Dunes</h2>', '<h2 id="hcta-title">Book Your Sunset Ride</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and where you stay; we’ll meet you in Merzouga.', 'banner sub');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Self-drive travellers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your ride.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['tent', 'Your Camp', 'overnight', 'breakfast', 'night.']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
