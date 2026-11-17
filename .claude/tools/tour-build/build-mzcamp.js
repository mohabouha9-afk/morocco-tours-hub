// Build tours/merzouga-desert-camp-camel-ride.html (NEW, 2026-11-17): overnight desert camp + sunset camel ride in Erg Chebbi,
// first page of the Merzouga activities set. Template = the finished Agafay camel ride & dinner page (experience layout).
// Owner: no "Costs on the day" box on this page (drinks/tips only under Not included); no map (meeting point not confirmed).
// Research (WebSearch 2026-11-17): standalone Merzouga camp + camel products on Expedia/Travelocity from about $75-77 pp,
// luxury tent + 1-h quad about $140; complaints = camps at the edge of the dunes by the road, directions to the camp, cold winter
// nights; camps arrange where self-drivers park (meeting point / guesthouse), no source confirms a guarded lot.
// Camps = the 3 used on every desert tour (Erg Chebbi Sahara Camp / Sandrock Luxury Camp / Desert Luxury Camp).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
let s = fs.readFileSync(root + 'tours/agafay-desert-camel-ride-dinner-show.html', 'utf8');
function rep(a, b, label) {
  if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
  else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
}
function between(start, end, inner, label) {
  const i = s.indexOf(start); if (i < 0) throw new Error('start ' + label);
  const j = s.indexOf(end, i + start.length); if (j < 0) throw new Error('end ' + label);
  s = s.slice(0, i + start.length) + inner + s.slice(j);
}
const OUT = 'merzouga-desert-camp-camel-ride.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Merzouga Desert Camp & Sunset Camel Ride';
const TITLE = 'Merzouga Desert Camp with Sunset Camel Ride | Erg Chebbi';
const DESC = 'A night in the Erg Chebbi dunes at Merzouga: a sunset camel ride with your own camel guide, a private tent with bathroom, dinner and drums by the fire, sunrise on the dunes and free parking for your car.';
const HERO = 'merzouga-camel-orange-dusk.jpg';

// head
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep('<meta name="keywords" content="">', '<meta name="keywords" content="Merzouga desert camp, Erg Chebbi camp, Merzouga camel ride, overnight camel trek Merzouga, Merzouga luxury camp, Sahara camp Morocco">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/agafay-desert-camel-ride-dinner-show\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
rep(/<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/leaflet[^>]*>\n/, '', 'leaflet css');
rep(/<script src="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/leaflet[^>]*><\/script>\n/, '', 'leaflet js');

// hero
{ const [w, h] = dims(HERO);
  rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Camels in the Erg Chebbi dunes at dusk" width="${w}" height="${h}" loading="eager"`, 'hero img'); }
rep('<a href="../day-trips.html">Day Trips</a><span class="sep">›</span><span>Camel Ride &amp; Dinner Show</span>', '<a href="../destinations/merzouga.html">Merzouga</a><span class="sep">›</span><span>Desert Camp &amp; Camel Ride</span>', 'crumb');
rep(/(<span class="dt-hero__loc">(?:<svg[\s\S]*?<\/svg>)?)Marrakech(<\/span>)/, '$1Merzouga$2', 'chip');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Merzouga Desert Camp &amp; Sunset Camel Ride<span class="script">A night in the Erg Chebbi dunes</span></h1>', 'h1');
rep('<small>Duration</small><b>5 to 7 hours (afternoon and evening)</b>', '<small>Duration</small><b>Overnight, sunset to morning</b>', 'f1');
rep('<small>Pick-up</small><b>Your hotel or riad</b>', '<small>Meeting point</small><b>Merzouga or your hotel</b>', 'f2');

// tabs: add "Your Camp" after What's Included
rep('<a href="#included">What’s Included</a>', '<a href="#included">What’s Included</a><a href="#stay">Your Camp</a>', 'tabs');

// overview
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Ride a camel into the Erg Chebbi dunes as the sun goes down, spend the night in a desert camp with dinner, drums and a sky full of stars, and wake up for sunrise on the sand.</p>
          <p class="dt-lead">Come by car, by bus or with your own tour: we meet you in Merzouga, keep your car parked for free and take you into the dunes with your own camel guide. Choose a standard, deluxe or luxury tent; everything is agreed before you arrive.</p>
`, 'overview');
between('<dl class="dt-glance">', '</dl>', [
  ['Meeting', '1.5 h before sunset'], ['Camel ride', 'About 1 hour each way'], ['Tent', 'Private, with bathroom'],
  ['Meals', 'Dinner and breakfast'], ['Parking', 'Free in Merzouga'], ['Cancellation', 'Free up to 24 h before'],
].map(([t, d], i) => { const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g); const ic = icons[i % icons.length].replace(/^<div>/, '').replace(/<dt>$/, ''); return `<div>${ic}<dt>${t}</dt><dd>${d}</dd></div>`; }).join(''), 'key facts');
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'The dunes turning red and gold at sunset',
  'Mint tea when you reach the camp',
  'Dinner by lantern light, deep in the dunes',
  'Berber drums and songs around the fire',
  'The Milky Way on a moonless night',
  'Sunrise from the top of a dune',
].map(t => li(TICK, t)).join(''), 'highlights');

// gallery
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['merzouga-camel-caravan-guide.jpg', 'A camel guide leading a caravan into the Erg Chebbi dunes'],
  ['desert-camp-aerial-circular.jpg', 'A desert camp in the dunes seen from above'],
  ['luxury-camp-bathtub.jpg', 'A private bathroom inside a luxury desert tent'],
  ['desert-camp-lanterns.jpg', 'Lanterns lighting a desert camp after dark'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// programme
const P = [
  ['Afternoon', 'Meet us in Merzouga', 'About 1.5 hours before sunset: around 16:30 in winter, 19:00 in summer. We confirm the time and place on WhatsApp the day before. Park your car and keep a small bag for the night.'],
  ['Sunset', 'Camel ride into the dunes', 'About an hour at walking pace into Erg Chebbi with your own camel guide, stopping on a ridge to watch the sun go down. Try sandboarding there if you like.'],
  ['Dusk', 'Arrive at the camp', 'Mint tea, your tent, and time to climb a dune or sit by the fire. The desert cools quickly after dark, so put on your warm layer.'],
  ['Evening', 'Dinner and drums', 'Salads, a tagine and fruit, then Berber drums and songs around the fire. Step away from the lights for the stars on a clear night.'],
  ['Dawn', 'Sunrise on the dunes', 'We wake you about 30 minutes before sunrise to climb a dune and watch the sand turn from blue to gold.'],
  ['About 9:00', 'Breakfast and back', 'Breakfast at the camp, then about an hour back to Merzouga by camel or 4×4, where your car or driver is waiting.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'programme');

// included
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Camel ride to the camp and back, about 1 hour each way', 'Your own camel guide', 'One night in a private tent with bathroom',
  'Dinner, breakfast, mint tea and water', 'Sandboards at the camp', 'Free parking at the meeting point',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Transport to Merzouga', 'Soft drinks and alcohol', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Winter nights drop close to freezing: bring a warm layer',
  'Summer days reach 40 °C: the ride is timed for the evening',
  'Bring a small bag; big luggage stays in your car',
  'A torch or phone light helps around the camp at night',
  'Pregnant, or a bad back? Go to camp by 4×4',
].map(t => li(INFO, t)).join(''), 'gtk');
// no Costs on the day, no map (owner)
{ const a = s.indexOf('<div class="dt-card dt-costs">'); const b = s.indexOf('</p>', s.indexOf('<p class="dt-map__note">')) + '</p>'.length;
  if (a < 0 || b < a) throw new Error('costs/map'); s = s.slice(0, a).replace(/\s*$/, '\n') + s.slice(b).replace(/^\n/, ''); }

// Your Camp section (new, after What's Included)
const CAMP = [
  ['Standard', '<a href="https://www.booking.com/hotel/ma/well-equiped-desert-camp.html" target="_blank" rel="noopener nofollow">Erg Chebbi Sahara Camp</a>', 'Berber tent with a private bathroom'],
  ['Deluxe', '<a href="https://www.booking.com/hotel/ma/warru-desert-camp.html" target="_blank" rel="noopener nofollow">Sandrock Luxury Camp</a>', 'Larger tent with a private bathroom'],
  ['Luxury', '<a href="https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html" target="_blank" rel="noopener nofollow">Desert Luxury Camp</a>', 'Spacious tent with shower and toilet'],
];
rep('        <section class="dt-block" id="custom"', `        <section class="dt-block" id="stay" aria-labelledby="dt-st">
          <h2 class="dt-h2" id="dt-st">Your Camp</h2>
          <p class="dt-lead">Three comfort levels, all deep in the dunes and all with a bathroom in your tent. Choose yours when you book:</p>
          <div class="dt-acc-wrap"><table class="dt-acc">
            <thead><tr><th scope="col">Level</th><th scope="col">Camp</th><th scope="col">Your tent</th></tr></thead>
            <tbody>${CAMP.map(([l, c, t]) => `<tr><th scope="row">${l}</th><td>${c}</td><td>${t}</td></tr>`).join('')}</tbody>
          </table></div>
          <p class="dt-acc__note">Or similar, depending on availability. Prefer another camp? Tell us when you book.</p>
        </section>
        <section class="dt-block" id="custom"`, 'stay');

// Make It Your Own + fit
rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private night, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury tent', 'A second night in the dunes', 'A private dinner on a dune for a birthday or proposal',
  'A quad or buggy ride before the sunset', 'A 4×4 day around Merzouga the next morning', 'Pick-up from your hotel or Errachidia airport',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Self-drivers and travellers already in Merzouga', 'Couples who want a night under the stars', 'Families: slow camels and a bathroom in the tent'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You are in Marrakech without a car: our <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga desert tour</a> brings you here',
  'You start in Fes: the <a href="4-day-fes-desert-tour.html">4-day Fes desert tour</a> brings you here and back',
].map(t => li(INFO, t)).join(''), 'think');

// reviews: desert reviews
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Lukas M.', 'Sarah L.', 'Aisha K.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'reviews');

// FAQ
const FAQ = [
  ['How do we get to Merzouga?', 'By car it is about 560 km from Marrakech and 470 km from Fes; CTM and Supratours buses arrive every day, and Errachidia airport is about 2 hours away. We can pick you up on the way, or bring you on one of our desert tours.'],
  ['Where do we leave the car?', 'At our meeting point in Merzouga, free of charge, while you ride to the camp and back. Take a small bag for the night and leave the big luggage in the car.'],
  ['Is the camp far from the village?', 'Some camps sit at the edge of the dunes, by the road. We choose camps about an hour into the dunes by camel, so you see sand, not houses, and hear no engines at night.'],
  ['How cold is it at night?', 'From December to February nights can drop to about 3–5 °C. The tents have thick blankets, but bring a warm layer and a hat for the evening and the sunrise.'],
  ['Is it suitable for children?', 'Yes. The camels walk slowly and little ones ride with a parent or are led by the camel guide. If a child is unsure, part of the family can go to the camp by 4×4.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your night.</p></div></details>\n`, 'faq');

// booking
rep('value="Agafay Desert Camel Ride &amp; Dinner Show" readonly', `value="${NAME.replace('&', '&amp;')}" readonly`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + ' in Merzouga.')}"`, 'wa');
rep('placeholder="Hotel, questions, special requests…"', 'placeholder="Camp level, how you arrive, questions…"', 'msg ph');
rep('Up to 24 hours before the trip.', 'Up to 24 hours before your night.', 'trust');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Merzouga Desert Camp', 'mbar');

// others
rep('<p class="dt-others__all"><a href="../day-trips.html">View all day trips</a></p>', '<p class="dt-others__all"><a href="../destinations/merzouga.html">All things to do in Merzouga</a></p>', 'all link');
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'mzcamp-similar.json', 'utf8')), 'similar');
rep(/(<li class="htours__end"><a class="htour-more" href=")[^"]*("[\s\S]*?<span class="htour-more__title">)[^<]*/, '$1../destinations/merzouga.html$2All Merzouga Activities', 'end link');
rep('Want to add this experience to a Morocco tour?', 'Want to add a desert night to a Morocco tour?', 'strip');
rep('<h2 id="hcta-title">Book Your Sunset in Agafay</h2>', '<h2 id="hcta-title">Book Your Night in the Dunes</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and how you arrive; we’ll meet you in Merzouga.', 'banner sub');

// JSON-LD
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Self-drive travellers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your night.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>\n<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld');

const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
for (const bad of ['Agafay', 'Marrakech', 'fire show', 'day trip', 'Costs on']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
