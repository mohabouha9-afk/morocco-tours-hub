// Build tours/agafay-desert-camp-overnight.html (NEW, 2026-11-18): a night in an Agafay desert camp from Marrakech.
// Template = the finished Agafay camel ride & dinner show page (same place, same evening, plus the night).
// Research (WebSearch 2026-11-18, OpenSEO out of credits): GetYourGuide Agafay camping category; overnight products
// 143–215 reviews (top 4.7/215: AC tent, 4-course dinner, show, Berber breakfast, pool), pick-up ~16:00–17:00, ~45 min drive,
// time confirmed on WhatsApp the day before. Camps from Tripadvisor (owner to confirm): Stellar Agafay Desert Camp 4.8/45 (pool),
// Agafay Luxury Camp 4.1/545 (two pools, one heated; some say overpriced, weak Wi-Fi), Inara Camp 4.4/251 on Tripadvisor (#3 of 26), Booking 9.2, in the Michelin Guide, heated pool, tents spaced apart.
// Facts reused from our own Agafay pages: 40 km / 40 min, stone desert, no dunes, medina gate pick-up, about 1 h camel ride,
// pick-up ~2.5 h before sunset (15:30 winter / 17:30 summer), stars weaker than the Sahara, beer €6–8 at some camps.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
let s = fs.readFileSync(root + 'tours/agafay-desert-camel-ride-dinner-show.html', 'utf8');
const dt = fs.readFileSync(root + 'day-trips.html', 'utf8');
function rep(a, b, label) {
  if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
  else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
}
function between(start, end, inner, label) {
  const i = s.indexOf(start); if (i < 0) throw new Error('start ' + label);
  const j = s.indexOf(end, i + start.length); if (j < 0) throw new Error('end ' + label);
  s = s.slice(0, i + start.length) + inner + s.slice(j);
}
const OUT = 'agafay-desert-camp-overnight.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Agafay Desert Camp Overnight';
const TITLE = 'Agafay Desert Camp Overnight from Marrakech | Private Night in a Tent';
const DESC = 'A private night in the Agafay desert, 40 minutes from Marrakech: hotel pick-up, a sunset camel ride, dinner with music and a fire show, your own tent with bathroom, sunrise over the Atlas and breakfast.';
const HERO = 'agafay-domes.jpg';

// head
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep('<meta name="keywords" content="">', '<meta name="keywords" content="Agafay desert camp, Agafay overnight, Agafay luxury camp, night in Agafay desert, Agafay glamping, desert camp near Marrakech">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/agafay-desert-camel-ride-dinner-show\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

// hero
{ const [w, h] = dims(HERO);
  rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Desert camp domes in the Agafay desert" width="${w}" height="${h}" loading="eager"`, 'hero img'); }
rep('<span>Camel Ride &amp; Dinner Show</span>', '<span>Desert Camp Overnight</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Agafay Desert Camp Overnight<span class="script">Wake up in the desert, 40 minutes from Marrakech</span></h1>', 'h1');
rep('<small>Duration</small><b>5 to 7 hours (afternoon and evening)</b>', '<small>Duration</small><b>Overnight, afternoon to next morning</b>', 'f1');

// tabs: add "Your Camp"
rep('<a href="#included">What’s Included</a>', '<a href="#included">What’s Included</a><a href="#stay">Your Camp</a>', 'tabs');

// overview
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Leave Marrakech in the afternoon, ride a camel over the stony Agafay hills as the sun sets behind them, and stay for dinner, music and a fire show. When the evening visitors drive back to the city, you stay: your own tent, a quiet night and the sunrise over the High Atlas.</p>
          <p class="dt-lead">It is the easiest night in the desert from Marrakech, with no long drive. Agafay is a stone desert, not sand dunes, so if the Sahara dunes are your dream, look at our Merzouga tours instead. Choose a standard, deluxe or luxury camp; everything is agreed before you go.</p>
`, 'overview');
between('<dl class="dt-glance">', '</dl>', [
  ['Pick-up', 'Afternoon, your hotel'], ['Drive', '40 min from Marrakech'], ['Camel ride', 'About 1 hour at sunset'],
  ['Tent', 'Private, with bathroom'], ['Meals', 'Dinner and breakfast'], ['Cancellation', 'Free up to 24 h before'],
].map(([t, d], i) => { const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g); const ic = icons[i % icons.length].replace(/^<div>/, '').replace(/<dt>$/, ''); return `<div>${ic}<dt>${t}</dt><dd>${d}</dd></div>`; }).join(''), 'key facts');
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Golden light over the hills and the Atlas',
  'A slow camel ride as the sun goes down',
  'Dinner by lantern light, music and fire',
  'A quiet camp once the visitors leave',
  'Sunrise over the High Atlas from your tent',
  'Breakfast, then back by late morning',
].map(t => li(TICK, t)).join('') + '<li class="dt-high__more"><span>And much more along the way</span></li>', 'highlights');

// gallery
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['agafay-aerial.jpg', 'A desert camp in the Agafay hills, with camels grazing beside it'],
  ['agafay-camel-caravan.jpg', 'A camel caravan crossing the stony Agafay hills in the late afternoon'],
  ['agafay-fire.jpg', 'Campfire at a desert camp in Agafay after dark'],
  ['agafay-pool.jpg', 'Pool at a desert camp in Agafay'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gallery');

// programme
const P = [
  ['Afternoon', 'Pick-up in Marrakech', 'About 2.5 hours before sunset: around 15:30 in winter, 17:30 in summer. Your driver meets you at your hotel, or at the nearest gate if your riad is in the medina. Bring a small bag for the night.'],
  ['Arrival', 'Your tent and mint tea', 'Forty minutes later you are in the hills. Leave your bag in your tent, have a mint tea and look out over the Atlas.'],
  ['Sunset', 'Camel ride over the hills', 'About an hour on a camel at walking pace, timed so you are out on the hills when the sun goes down and the Atlas turns pink.'],
  ['Evening', 'Dinner, music and fire show', 'Salads, a tagine or couscous and fruit by lantern light, then Gnawa music and a fire show. The evening visitors leave after the show; you stay on by the fire.'],
  ['Dawn', 'Sunrise over the Atlas', 'Get up early to watch the light reach the hills and the mountains behind them, the quietest hour in Agafay.'],
  ['Morning', 'Breakfast and back', 'Breakfast at the camp, a swim if your camp has a pool and the weather is warm, then your driver takes you back to Marrakech by late morning.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'programme');

// included
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Hotel pick-up and drop-off in a private car', 'Local guide with you from start to finish', 'Camel ride at sunset, about 1 hour',
  'One night in a private tent with bathroom', 'Dinner with music and a fire show', 'Breakfast, mint tea and water',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Soft drinks and alcohol', 'Quad or buggy rides', 'Massage or spa at the camp', 'Tips'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Agafay is a stone desert, not sand dunes',
  'Nights are cold from November to March: bring a warm layer',
  'Summer days are hot, often above 35 °C',
  'Camps have gravel paths and a few steps: tell us about wheelchairs or strollers',
  'You see more stars than in the city, fewer than in the Sahara',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<div class="dt-card dt-costs"><h3>Costs on the day</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Soft drinks:</b> about 20–30 MAD at the camp', '<b>Alcohol:</b> only at some camps, about €6–8 for a beer',
  '<b>Quad or buggy ride:</b> on request, priced before you ride', '<b>Tips:</b> up to you', '<b>Cash:</b> bring some dirhams, camps rarely take cards',
].map(t => { const ic = s.slice(s.indexOf('<div class="dt-card dt-costs">')).match(/<li>(<svg[\s\S]*?<\/svg>)/)[1]; return `<li>${ic}<span>${t}</span></li>`; }).join(''), 'costs');

// Your Camp section (after What's Included)
const CAMP = [
  ['Standard', '<a href="https://www.tripadvisor.com/Hotel_Review-g293734-d33883316-Reviews-Stellar_Agafay_Desert_Camp-Marrakech_Marrakech_Safi.html" target="_blank" rel="noopener nofollow">Stellar Agafay Desert Camp</a>', 'Tent with private bathroom; pool'],
  ['Deluxe', '<a href="https://www.tripadvisor.com/Hotel_Review-g15276171-d13447988-Reviews-Agafay_Luxury_Camp-Agafay_Marrakech_Safi.html" target="_blank" rel="noopener nofollow">Agafay Luxury Camp</a>', 'Large tent with shower; two pools, one heated'],
  ['Luxury', '<a href="https://guide.michelin.com/en/hotels-stays/marrakech/inara-camp-12003" target="_blank" rel="noopener nofollow">Inara Camp</a>', 'Spacious tent set apart; heated pool'],
];
rep('        <section class="dt-block" id="custom"', `        <section class="dt-block" id="stay" aria-labelledby="dt-st">
          <h2 class="dt-h2" id="dt-st">Your Camp</h2>
          <p class="dt-lead">Three comfort levels, all with a bathroom in your tent. Choose yours when you book:</p>
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
  'Upgrade to a luxury tent', 'A private dinner for a birthday, proposal or honeymoon',
  'A <a href="agafay-desert-quad-biking.html">quad</a> or buggy ride before the sunset', 'A second night in the desert',
  'An earlier dinner and bedtime for children', 'Drop-off at Marrakech airport after breakfast',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['A first or last night in Marrakech', 'Couples and special occasions', 'Families: no long drive, slow camels'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You dream of sand dunes: the <a href="2-day-marrakech-to-merzouga-desert-tour.html">2-day Merzouga desert tour</a> takes you to Erg Chebbi',
  'You only want the evening: the <a href="agafay-desert-camel-ride-dinner-show.html">camel ride and dinner show</a> brings you back by 22:30',
].map(t => li(INFO, t)).join(''), 'think');

// FAQ
const FAQ = [
  ['Is Agafay a real desert camp?', 'Yes, but in a stone desert: pale hills and gravel plains with the High Atlas behind, and no sand dunes. The camps are real tented camps, from simple Berber tents to spacious luxury tents with a pool.'],
  ['Will the camp be noisy?', 'Dinner can be lively when evening visitors are there for the show. They leave after it, around 22:00, and the camp goes quiet. Ask us for a smaller camp if you want calm from the start.'],
  ['How cold is it at night?', 'From November to March nights are cold, a few degrees above freezing in December and January. The tents have thick blankets; bring a warm layer and a hat for the evening and the sunrise.'],
  ['Will we see the stars?', 'More than in Marrakech, on a clear night away from the camp lights. The glow of the city keeps the sky lighter than in the Sahara: for the Milky Way, Merzouga is the place.'],
  ['Is it suitable for children?', 'Yes. The drive is short, the camels walk slowly and little ones are led by hand. We can ask the camp for an earlier dinner, and a family tent at most camps.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your night.</p></div></details>\n`, 'faq');

// booking
rep('value="Agafay Desert Camel Ride &amp; Dinner Show" readonly', `value="${NAME}" readonly`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep('placeholder="Hotel, questions, special requests…"', 'placeholder="Hotel, camp level, questions…"', 'msg ph');
rep('Up to 24 hours before the trip.', 'Up to 24 hours before your night.', 'trust');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Agafay Camp Overnight', 'mbar');

// others: camel & dinner, quad, balloon (cards from day-trips.html); "View all day trips" links kept (owner: link them to the Marrakech day trips)
function card(id) { const m = dt.match(new RegExp('<li id="' + id + '">([\\s\\S]*?</a></article>)</li>')); if (!m) throw new Error('card ' + id); return '        <li>' + m[1].replace(/href="tours\//g, 'href="../tours/') + '</li>\n'; }
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', card('dt-camel-dinner') + card('dt-quad') + card('dt-balloon'), 'similar');
rep('Want to add this experience to a Morocco tour?', 'Want to add a desert night to a Morocco tour?', 'strip');
rep('<h2 id="hcta-title">Book Your Sunset in Agafay</h2>', '<h2 id="hcta-title">Book Your Night in Agafay</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and your hotel; we’ll time the pick-up with the sunset.', 'banner sub');

// JSON-LD
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your night.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
s = s.replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>\n?/, '');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>\n<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld');

const body = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
for (const bad of ['5 to 7 hours', 'evening experience', 'Book Your Sunset', 'Camel Ride &amp; Dinner Show</span>']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
