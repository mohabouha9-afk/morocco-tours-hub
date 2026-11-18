// Build tours/merzouga-luxury-desert-camp.html (NEW, 2026-11-18, owner chose it): Merzouga luxury desert camp, luxury tier only.
// Research: marrakech-desert-trips.com "Merzouga Luxury Desert Camp — What to Expect" (Nov 2026): luxury = bathroom INSIDE the tent,
// hot shower evening and morning, real bed + hotel linens, in-tent power, silent generator, heater in winter, A/C tents in summer,
// quiet hours ~23:00 winter / midnight summer, camel or 4×4 arrival; disappointments = "luxury" with a shared bathroom, too hot/cold,
// generator noise, no power. Reviews elsewhere: cold showers, overpriced, dirty dining tent (Aladdin Camp); Tiziri: heaters on all night;
// Desert Heart Luxury Camp 9.4/695 on a booking site, heated bathroom floor. That guide also says camps are no longer allowed deep in
// the erg (edge of Erg Chebbi only) — not verified; the page makes no "deep in the dunes" claim. Template = the Merzouga camp page.
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
const OUT = 'merzouga-luxury-desert-camp.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Merzouga Luxury Desert Camp';
const TITLE = 'Merzouga Luxury Desert Camp | Private Tent with Bathroom &amp; Camel Ride';
const DESC = 'A night at a luxury desert camp in Merzouga: a private tent with its own bathroom and hot shower, a real bed, heating in winter, a sunset camel ride or 4×4, dinner by the fire and sunrise on the Erg Chebbi dunes.';
const HERO = 'luxury-camp-night.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Merzouga luxury camp, luxury desert camp Merzouga, Erg Chebbi luxury camp, Sahara luxury camp Morocco, glamping Merzouga, desert camp private bathroom">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Luxury desert tents lit up at night in the dunes" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Desert Camp &amp; Camel Ride</span>', '<span>Luxury Desert Camp</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Merzouga Luxury Desert Camp<span class="script">Hotel comfort, Sahara silence</span></h1>', 'h1');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">All the magic of a night in the Erg Chebbi dunes, without giving up your comforts: a large tent with a real bed and hotel linens, your own bathroom with a hot shower inside the tent, power to charge your phone and a heater on winter nights.</p>
          <p class="dt-lead">“Luxury” in the desert often means a nice photo and a shared bathroom. Here the bathroom is inside your tent and for you only, and we agree every detail before you arrive. Ride in by camel at sunset or come by 4×4: your choice.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Meeting', '1.5 h before sunset', 0], ['Arrival', 'By camel or 4×4', 1], ['Bathroom', 'Inside your tent', 2],
    ['Winter nights', 'Heater in the tent', 3], ['Meals', 'Dinner and breakfast', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'A real bed with hotel linens', 'Your own toilet and hot shower', 'A sunset camel ride into the dunes', 'Dinner, then drums by the fire',
  'Stars from your tent door', 'Sunrise on the dunes before breakfast',
].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['luxury-camp-aerial.webp', 'A luxury desert camp in the dunes seen from above'], ['luxury-camp-bathtub.jpg', 'A private bathroom inside a luxury desert tent'],
  ['dome-camp.jpg', 'Glass-roofed tents for watching the stars'], ['desert-camp-lanterns.jpg', 'Lanterns lighting a desert camp after dark'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['Late afternoon', 'Meet us in Merzouga', 'About 1.5 hours before sunset: around 16:30 in winter, 19:00 in summer. Your car and big bags stay with us; we confirm the time on WhatsApp the day before.'],
  ['Sunset', 'Camel or 4×4 to the camp', 'Ride a camel into the dunes with your own camel guide and stop on a high dune for the sunset, or come by 4×4 if you prefer not to ride.'],
  ['Dusk', 'Settle into your tent', 'Mint tea, then time for a hot shower in your own bathroom before dinner. Your tent has power to charge your phone and camera.'],
  ['Evening', 'Dinner and the fire', 'Soup or salads, tagine or couscous, fruit and pastries, then drums and songs by the fire. The camp goes quiet around 23:00 in winter, midnight in summer.'],
  ['Dawn', 'Sunrise on the dunes', 'Walk up the nearest dune for the sunrise; the first light on the sand is worth the early alarm.'],
  ['Morning', 'Breakfast and back', 'A hot shower, breakfast in camp, then back to Merzouga by camel or 4×4 around 9:00.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', [
  'A luxury tent with a real bed and hotel linens', 'Your own toilet and hot shower inside the tent', 'Towels and power in the tent', 'A heater on winter nights',
  'Camel ride with your guide, or a 4×4 transfer', 'Dinner and breakfast', 'Sandboards on the dunes', 'Free parking while you stay',
].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Transport to Merzouga', 'Drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'Light sleeper? Ask for a tent away from the fire', 'Winter nights reach 0–5 °C: bring a warm layer',
  'Summer: ask for an air-conditioned tent', 'Water is brought in: short showers keep it hot', 'Bring a headlamp for the walk to the dunes',
].map(t => li(INFO, t)).join(''), 'gtk');

// Your Camp: luxury only
rep(/(id="dt-st">Your Camp<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1We book luxury camps where the bathroom is inside the tent, the water is hot and the generator is quiet. Our picks:$2', 'stay lead');
between('<table class="dt-acc">', '</table>', `
            <thead><tr><th scope="col">Camp</th><th scope="col">Your tent</th><th scope="col">Why we like it</th></tr></thead>
            <tbody><tr><th scope="row"><a href="https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html" target="_blank" rel="noopener nofollow">Desert Luxury Camp</a></th><td>Large tent with its own bathroom and hot shower</td><td>Spacious tents and a calm camp</td></tr><tr><th scope="row"><a href="https://uk.hotels.com/ho1435270816/desert-heart-luxury-camp-taouz-morocco" target="_blank" rel="noopener nofollow">Desert Heart Luxury Camp</a></th><td>Tent with its own bathroom and a heated floor</td><td>Rated 9.4 from 695 guest reviews</td></tr></tbody>
          `, 'stay table');
rep('<p class="dt-acc__note">Or similar, depending on availability. Prefer another camp? Tell us when you book.</p>',
  '<p class="dt-acc__note">Or similar, depending on availability. Travelling on a budget? Our <a href="merzouga-desert-camp-camel-ride.html">desert camp night</a> has standard and deluxe tents too.</p>', 'stay note');

rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private night, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'An air-conditioned tent in summer', 'A private dinner on a dune, or a proposal set-up', 'A second night at the camp', 'Or a remoter night: our <a href="erg-chigaga-luxury-desert-camp.html">Erg Chigaga luxury camp</a>',
  '<a href="merzouga-quad-biking.html">Quad</a> or <a href="merzouga-buggy-tour.html">buggy</a> ride before sunset', 'A <a href="merzouga-4x4-desert-day-tour.html">4×4 day around Merzouga</a> the next day',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Honeymooners and couples celebrating', 'Travellers who sleep badly without their own bathroom', 'Families who want space and a real bed'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Happy with a simpler tent? Our <a href="merzouga-desert-camp-camel-ride.html">desert camp night</a> has standard tents with a bathroom',
  'Want more than one night? The <a href="merzouga-camel-trek-2-nights.html">2-night camel trek</a> goes deeper into the dunes',
  'Starting in Marrakech without a car? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> can include this camp',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Sarah L.', 'Lukas M.', 'Chloé D.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['What makes a camp “luxury”?', 'For us: the bathroom is inside your tent and for you only, with a hot shower; a real bed with good linens; power in the tent; a quiet generator; and heating in winter. If a camp shares its bathrooms, we do not call it luxury.'],
  ['Is it warm in winter and cool in summer?', 'From December to February nights drop to about 0–5 °C, so the tents have a heater and thick blankets. From June to August ask for an air-conditioned tent; spring and autumn need neither.'],
  ['Do we have to ride a camel?', 'No. Ride in by camel at sunset with your own camel guide, or come by 4×4. Many couples ride in and come back by 4×4 in the morning.'],
  ['Is there electricity and Wi-Fi?', 'There is power in the tent to charge phones and cameras. Wi-Fi is weak or missing in the dunes, so download what you need before you arrive; for most guests the quiet is part of the point.'],
  ['Will it be quiet at night?', 'The drums stop around 23:00 in winter and midnight in summer, and our camps keep their generators quiet. Light sleepers can ask for a tent away from the fire.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your night.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
rep('placeholder="Camp level, how you arrive, questions…"', 'placeholder="Camel or 4×4, how you arrive, an occasion, questions…"', 'ph');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Merzouga Luxury Camp', 'mbar');
rep('<h2 id="hcta-title">Book Your Night in the Dunes</h2>', '<h2 id="hcta-title">Book Your Luxury Desert Night</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and how you arrive; we’ll meet you in Merzouga.', 'banner sub');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Honeymooners', 'Families'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your night.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['Standard', 'Deluxe', 'an hour into the dunes', 'Milky Way']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);

// Link: camp page "Upgrade to a luxury tent" -> this page (once)
const cf = root + 'tours/' + TPL; let c = fs.readFileSync(cf, 'utf8');
if (!c.includes('href="merzouga-luxury-desert-camp.html"')) { c = c.replace('<span>Upgrade to a luxury tent</span>', '<span>Upgrade to a <a href="merzouga-luxury-desert-camp.html">luxury tent</a></span>'); fs.writeFileSync(cf, c); console.log('camp page linked'); }
