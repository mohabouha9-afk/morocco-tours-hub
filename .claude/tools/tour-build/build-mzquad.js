// Build tours/merzouga-quad-biking.html (NEW, 2026-11-17): Merzouga activities page 3. Template = the finished sunset camel ride page.
// Research (WebSearch): 1-hour rides most common; quad + sandboarding listing 4.9/105 from ~US$38; 2-hour rides add a palm oasis and tea
// with a nomad family (Lokalee "2-Hour Quad Desert Tour, Dunes Oasis, Nomads Family & Sandboard"); drivers mostly 16+ (Civitatis 18+ with
// licence), younger as passengers; one quad per adult; helmet + goggles standard. Same age rules as our Agafay quad page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const TPL = 'merzouga-sunset-camel-ride.html';
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
const OUT = 'merzouga-quad-biking.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Quad Biking in the Merzouga Dunes';
const TITLE = 'Quad Biking in Merzouga: Erg Chebbi Dunes | Private Tour';
const DESC = 'Private quad biking in the Erg Chebbi dunes at Merzouga: 1 or 2 hours on your own quad with a guide in front, helmet and goggles, a sandboarding stop and, on the longer ride, tea with a nomad family.';
const HERO = 'merzouga-quad-biking.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="quad biking Merzouga, Merzouga quad tour, Erg Chebbi quad, ATV Merzouga, Sahara quad biking, Merzouga sandboarding">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Quad bikes on the Erg Chebbi dunes at Merzouga" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Sunset Camel Ride</span>', '<span>Quad Biking</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Quad Biking in the Merzouga Dunes<span class="script">Your own quad across Erg Chebbi</span></h1>', 'h1');
rep('<b>About 2.5 hours</b>', '<b>1 or 2 hours on the quad</b>', 'f1');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Ride your own quad across the golden dunes of Erg Chebbi with a guide in front, up and over the ridges, with a stop on top for the view and a go at sandboarding down the sand.</p>
          <p class="dt-lead">Choose one hour in the dunes, or two hours with a palm oasis and tea with a nomad family on the way. A briefing and a slow start on flat sand come first, so first-timers ride with confidence; helmet, goggles and a scarf are ready for you.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Times', 'Morning or afternoon', 0], ['Quad ride', '1 or 2 hours', 1], ['Your quad', 'One per adult', 2],
    ['Drivers', '16+, no licence needed', 3], ['Gear', 'Helmet and goggles', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Up and over the Erg Chebbi ridges', 'The view from the top of a high dune', 'Sandboarding down the sand',
  'A palm oasis in the middle of the dunes', 'Tea with a nomad family (2 hours)', 'Golden light on the late-afternoon ride',
].map(t => li(TICK, t)).join(''), 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['quad-merzouga.webp', 'A quad bike on the Merzouga dunes'], ['dune-ridge-solo.jpg', 'A sharp dune ridge in Erg Chebbi'],
  ['sandboarding.jpg', 'Sandboarding down a dune'], ['nomad-tent-tea.jpg', 'Tea in a nomad tent'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['Morning or afternoon', 'Meet us at the quad base', 'Morning around 9:00, or late afternoon about 2 hours before sunset; we confirm the time on WhatsApp the day before. We meet you at the base by the dunes or at your Merzouga hotel.'],
  ['Before the ride', 'Gear and briefing', 'Helmet, goggles and a scarf for the sand, then a short briefing and a few practice turns on flat sand until you feel at ease.'],
  ['On the dunes', 'Into Erg Chebbi', 'Your guide rides in front at a pace that suits the group, up and over the ridges, stopping on top for photos and the view.'],
  ['Halfway', 'Sandboarding stop', 'Climb a slope and take a sandboard down as many times as you like, then back on the quads.'],
  ['2-hour ride', 'Oasis and nomad tea', 'On the longer ride, on through the dunes to a palm oasis and a nomad family’s tent for mint tea and a talk about life in the desert.'],
  ['After the ride', 'Back at the base', 'About 1 or 2 hours after you set off, back at the base or your hotel, with time to shake the sand out of your shoes.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', ['Your own quad, one per adult', 'Guide riding in front', 'Helmet, goggles and a scarf', 'Briefing and practice on flat sand', 'Sandboards and fuel', 'Tea with a nomad family on the 2-hour ride'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Transport to Merzouga', 'Drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notinc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'Wear closed shoes and long trousers', 'Summer: ride in the morning or late afternoon',
  'Fine sand gets everywhere: protect your camera', 'Children ride as passengers with an adult driver', 'Not for pregnant riders or bad backs',
].map(t => li(INFO, t)).join(''), 'gtk');

rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private ride, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Ride at sunset, then a <a href="merzouga-sunset-camel-ride.html">camel ride</a>', 'Stay the night at a <a href="merzouga-desert-camp-camel-ride.html">desert camp</a>', 'A <a href="merzouga-buggy-tour.html">buggy for two</a> instead of quads',
  'On to Khamlia for Gnawa music', 'A longer ride to the far side of the dunes', 'Photos and video taken by your guide',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['First-timers: a briefing and a slow start', 'Friends and couples who like speed', 'Families with teenagers (drivers from 16)'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You prefer the quiet of the dunes: our <a href="merzouga-sunset-camel-ride.html">sunset camel ride</a>',
  'You are in Marrakech: our <a href="agafay-desert-quad-biking.html">Agafay quad biking</a> is 40 minutes from the city',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Lukas M.', 'Sarah L.', 'James T.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['Do I need a licence or experience?', 'No. Drivers need to be 16 or older, but no licence or quad experience is needed: the briefing and the practice on flat sand come first, and your guide sets an easy pace.'],
  ['Is it safe?', 'Yes, when you follow the guide. He rides in front, chooses the lines over the dunes and keeps the pace steady; helmets and goggles are always worn.'],
  ['Can children come?', 'Yes, as passengers with an adult driver, from about 8 years old. Teenagers from 16 can drive their own quad.'],
  ['One hour or two?', 'One hour gives you the dunes, the views and sandboarding. Two hours goes further, to a palm oasis and tea with a nomad family, with more time on the big dunes.'],
  ['Morning or afternoon?', 'Mornings are cooler and the sand is firmer, best in summer. The late afternoon has the golden light; finish just before sunset and add a camel ride.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your ride.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about Quad Biking in the Merzouga Dunes.")}"`, 'wa');
rep('placeholder="Sunset or sunrise, your hotel, questions…"', 'placeholder="1 or 2 hours, morning or afternoon, questions…"', 'ph');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Merzouga Quad Biking', 'mbar');
const C = JSON.parse(fs.readFileSync(SP + 'mz-cards.json', 'utf8'));
const tour3 = JSON.parse(fs.readFileSync(SP + 'mzsun-similar.json', 'utf8')).split('</li>')[0] + '</li>\n';
between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', C['merzouga-desert-camp-camel-ride.html'].replace(/\s*$/, '') + '\n' + C['merzouga-sunset-camel-ride.html'].replace(/\s*$/, '') + '\n' + tour3, 'similar');
rep('<h2 id="hcta-title">Book Your Sunset Ride</h2>', '<h2 id="hcta-title">Book Your Quad Ride</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and morning or afternoon; we’ll meet you in Merzouga.', 'banner sub');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Adventure travellers', 'Friends', 'Families with teenagers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your ride.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['camel guide', 'Sunset Camel', 'ridge for the sunset', 'sunrise']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
