// Build tours/merzouga-medfouna-cooking-class.html (NEW, 2026-11-17): Merzouga activities page 6, a private medfouna cooking class.
// Template = the finished 4×4 day page. Research (WebSearch): medfouna/madfouna = the "Berber pizza" of the Merzouga-Rissani-Erfoud area,
// name from the Arabic for "buried": bread dough sealed around a filling of minced meat, onions, herbs and spices, traditionally baked
// buried in hot sand or under the coals (Atlas Obscura, Kiss from the World, MarocMama). Merzouga classes sold at about US$30 (3.5 h,
// 26 five-star ratings) to US$59 (private, about 4 h, "make Berber madfouna in sand"). No medfouna photo in assets yet.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const TPL = 'merzouga-4x4-desert-day-tour.html';
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
const OUT = 'merzouga-medfouna-cooking-class.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Medfouna Cooking Class in Merzouga';
const TITLE = 'Medfouna Cooking Class in Merzouga | Berber Pizza Baked in Sand';
const DESC = 'A private cooking class in Merzouga with a local family: make medfouna, the Berber pizza of the desert, from dough to filling, bake it in the hot sand, then share it with a salad and mint tea.';
const HERO = 'nomad-tent-tea.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Merzouga cooking class, medfouna, madfouna, Berber pizza, Moroccan cooking class Sahara, things to do in Merzouga">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Mint tea served in a desert tent" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>4×4 Day Tour</span>', '<span>Medfouna Cooking Class</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Medfouna Cooking Class in Merzouga<span class="script">The Berber pizza, baked in the sand</span></h1>', 'h1');
rep('<b>Full day, about 7 hours</b>', '<b>About 3.5 hours</b>', 'f1');
rep('<small>Pick-up</small><b>Your Merzouga hotel</b>', '<small>Where</small><b>A family home in Merzouga</b>', 'f2');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Cook medfouna with a local family, the stuffed bread the people of Merzouga and Rissani call their pizza: knead the dough, mix the spiced filling, seal it, and bury it in the hot sand under the embers to bake.</p>
          <p class="dt-lead">While it bakes, make a Moroccan salad and learn to pour mint tea the desert way, then sit down together to eat what you made. It is hands-on from start to finish, with a vegetarian filling for anyone who wants one.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Times', '10:00 or 16:00 start', 0], ['Hands-on', 'Dough to filling, yourself', 1], ['Baked', 'In the hot sand', 2],
    ['Meal', 'You eat what you make', 3], ['Diets', 'Vegetarian on request', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Kneading bread dough with a local family', 'A filling of meat, onion and desert spices', 'Burying the bread in the hot sand',
  'Learning the high mint-tea pour', 'A Moroccan salad from fresh vegetables', 'Sharing the meal you cooked',
].map(t => li(TICK, t)).join(''), 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['cooking-shared-meal.jpg', 'A shared table of Moroccan dishes and bread'], ['spice-market-pyramids.jpg', 'Moroccan spices piled in cones'],
  ['cooking-tagine-lid.jpg', 'Lifting the lid of a vegetable tagine'], ['nomad-life.jpg', 'A family camp near the dunes'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['10:00 or 16:00', 'Welcome and mint tea', 'Meet us in Merzouga or at your hotel; a short walk or drive to a family home near the dunes, where the class starts with tea.'],
  ['Hands-on', 'Make the dough', 'Flour, water, yeast and salt, kneaded by hand until smooth, then left to rest while you prepare the filling.'],
  ['Hands-on', 'The filling', 'Chop onion, parsley and coriander, mix them with minced meat and the family’s spices, or with vegetables for a vegetarian version.'],
  ['Into the sand', 'Seal and bury it', 'Roll out two rounds, seal the filling between them and lay the bread in hot sand under the embers to bake for about half an hour.'],
  ['While it bakes', 'Salad and tea', 'Make a fresh Moroccan salad and learn the high pour that gives mint tea its foam.'],
  ['About 3.5 hours', 'Eat together', 'Dig out the medfouna, brush off the sand and share it with the family, then back to your hotel or on to a camel ride.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', ['Private class with a local family', 'All ingredients', 'The meal you cook, with salad', 'Mint tea and water', 'The recipe to take home', 'Meeting in Merzouga or at your hotel'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Transport to Merzouga', 'Soft drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'Tell us about allergies when you book', 'The meat is halal; no pork or alcohol',
  'The afternoon class can end with dinner', 'Children are welcome to cook too', 'Hands get floury: wear clothes you can wash',
].map(t => li(INFO, t)).join(''), 'gtk');
rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private class, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Shop for the ingredients at Rissani market', 'A vegetable tagine as well', 'Finish with a <a href="merzouga-sunset-camel-ride.html">sunset camel ride</a>',
  'Cook at your <a href="merzouga-desert-camp-camel-ride.html">desert camp</a> instead', 'Add the <a href="merzouga-4x4-desert-day-tour.html">4×4 day</a> the same day', 'A class for a whole group',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Food lovers who want a local recipe', 'Families: children love the sand oven', 'A slower afternoon between desert rides'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You are in Marrakech: our <a href="marrakech-cooking-class.html">Marrakech cooking class</a> starts at the market',
  'You would rather be out on the dunes: the <a href="merzouga-4x4-desert-day-tour.html">4×4 day tour</a> includes nomad tea',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Chloé D.', 'Aisha K.', 'Maria G.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['What is medfouna?', 'A round bread stuffed with spiced minced meat, onion and herbs, from the Merzouga, Rissani and Erfoud area. Its name means “buried”: it is baked buried in hot sand under the embers.'],
  ['Do we really cook, or just watch?', 'You cook. Everyone kneads their own dough, makes the filling and seals the bread; the family guides you and looks after the fire.'],
  ['Can you make it vegetarian?', 'Yes. The vegetarian medfouna is filled with vegetables, onion and herbs; tell us when you book, and about any allergies.'],
  ['Is it clean to bake bread in the sand?', 'Yes. The sand is heated under the embers and the bread is sealed; you brush off the outside before eating, as families here have done for generations.'],
  ['Morning or afternoon?', 'The 10:00 class ends with lunch; the 16:00 class ends with an early dinner, and in summer it is the cooler choice.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your class.</p></div></details>\n`, 'faq');
rep(/(class="dt-book__label">)[^<]*/, '$1Private cooking class', 'label');
rep('<label for="dt-trip">Experience</label>', '<label for="dt-trip">Class</label>', 'field');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the Medfouna Cooking Class in Merzouga.")}"`, 'wa');
rep('placeholder="Your hotel, full or half day, questions…"', 'placeholder="Morning or afternoon, diets, questions…"', 'ph');
rep('Up to 24 hours before your tour.', 'Up to 24 hours before your class.', 'trust');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Medfouna Cooking Class', 'mbar');
rep('aria-label="Book this experience"', 'aria-label="Book this class"', 'aria');
rep('<h2 id="hcta-title">Book Your Day Around the Dunes</h2>', '<h2 id="hcta-title">Book Your Cooking Class</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and morning or afternoon; we’ll meet you in Merzouga.', 'banner sub');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Food lovers', 'Families', 'Couples'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your class.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['4×4 with driver', 'Mfis', 'Dayet', 'your tour', 'Private day tour']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
