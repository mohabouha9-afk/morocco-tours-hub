// Build tours/merzouga-buggy-tour.html (NEW, 2026-11-17): Merzouga activities page 4. Template = the finished quad biking page.
// Research (WebSearch): Merzouga buggies are 2-seat Polaris RZR (4-seat on some bases), fully guided, about 1 hour most often; longer tiers
// add oases, a nomad family with tea and the seasonal lake (Civitatis 3 tiers ~US$156 to ~US$516); drivers 18+ with a valid driving
// licence (Civitatis, MarHire), passengers from 5 (Civitatis). Photos (owner approved the download 2026-11-17, free licences, no credit needed): merzouga-buggy-dunes.jpg = Unsplash Roberto Nickson eXV74Ia7Log (California dunes, landscape crop); merzouga-buggy-driver.jpg = Pexels Abdelkarim Achtaou 4480822 (Morocco); merzouga-buggy-sunset.jpg = Unsplash Ciprian Stoenescu PTFwr_PL--w.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const TPL = 'merzouga-quad-biking.html';
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
const OUT = 'merzouga-buggy-tour.html';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const NAME = 'Merzouga Buggy Tour in the Erg Chebbi Dunes';
const TITLE = 'Merzouga Buggy Tour: Erg Chebbi Dunes for Two | Private';
const DESC = 'Private buggy tour in the Erg Chebbi dunes at Merzouga: drive a 2-seat buggy side by side with a guide in front, 1 or 2 hours, with nomad tea and the desert lake on the longer ride. Family buggies too.';
const HERO = 'merzouga-buggy-dunes.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Merzouga buggy tour, buggy Erg Chebbi, Merzouga dune buggy, Sahara buggy tour, Merzouga activities for couples, family buggy Merzouga">', 'kw');
rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
{ const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A buggy throwing up sand on the dunes" width="${w}" height="${h}" loading="eager"`, 'hero'); }
rep('<span>Quad Biking</span>', '<span>Buggy Tour</span>', 'crumb');
rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Merzouga Buggy Tour<span class="script">Side by side across Erg Chebbi</span></h1>', 'h1');
rep('<b>1 or 2 hours on the quad</b>', '<b>1 or 2 hours in the buggy</b>', 'f1');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Drive a buggy across the Erg Chebbi dunes with your partner, a friend or your children beside you, following your guide up and over the ridges to the best viewpoints, with stops for photos on top.</p>
          <p class="dt-lead">Choose one hour in the dunes, or two hours with tea at a nomad family’s tent and the desert lake of Dayet Srij when it holds water. Roll bars, seat belts and helmets keep everyone safe, and family buggies take up to four.</p>
`, 'overview');
{ const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
  between('<dl class="dt-glance">', '</dl>', [
    ['Times', 'Morning or afternoon', 0], ['Buggy ride', '1 or 2 hours', 1], ['Seats', '2, or 4 for families', 2],
    ['Driver', '18+ with a licence', 3], ['Passengers', 'From 5 years old', 4], ['Cancellation', 'Free up to 24 h before', 5],
  ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
  'Side by side over the Erg Chebbi ridges', 'Viewpoints high above the dunes', 'Photos on top of a big dune',
  'Tea with a nomad family (2 hours)', 'The desert lake of Dayet Srij in season', 'Golden light on the late-afternoon drive',
].map(t => li(TICK, t)).join(''), 'hl');
between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
  ['merzouga-buggy-sunset.jpg', 'A buggy on red dunes at sunset'], ['merzouga-buggy-driver.jpg', 'A driver in a buggy with helmet and seat belt on'],
  ['merzouga-dunes.webp', 'The Merzouga dunes in the afternoon'], ['nomad-life.jpg', 'A nomad family’s camp near the dunes'],
].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
const P = [
  ['Morning or afternoon', 'Meet us at the buggy base', 'Morning around 9:00, or late afternoon about 2 hours before sunset; we confirm the time on WhatsApp the day before. We meet you at the base by the dunes or at your Merzouga hotel.'],
  ['Before the drive', 'Helmets and briefing', 'Helmets on, seat belts done, then a short briefing and a few slow turns on flat sand until the driver feels at ease.'],
  ['On the dunes', 'Into Erg Chebbi', 'Your guide drives in front on the best lines over the ridges, at a pace that suits you, with stops on top for photos and the view.'],
  ['Viewpoint', 'High above the dunes', 'A stop on a high dune to look out over Erg Chebbi, the palm groves and, on clear days, the Algerian border hills.'],
  ['2-hour ride', 'Nomad tea and the desert lake', 'On the longer ride, mint tea at a nomad family’s tent, then the lake of Dayet Srij, where flamingos sometimes stop after a wet winter.'],
  ['After the drive', 'Back at the base', 'About 1 or 2 hours after you set off, back at the base or your hotel, dusty and smiling.'],
];
between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
between('<h3>Included</h3><ul>', '</ul></div>', ['A 2-seat buggy, or a 4-seat family buggy', 'Guide driving in front', 'Helmets, seat belts and goggles', 'Briefing and practice on flat sand', 'Fuel', 'Tea with a nomad family on the 2-hour ride'].map(t => li(TICK, t)).join(''), 'inc');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences', 'Bring your driving licence', 'Summer: drive in the morning or late afternoon',
  'Fine sand gets everywhere: protect your camera', 'A scarf keeps the dust off your face', 'Not for pregnant passengers or bad backs',
].map(t => li(INFO, t)).join(''), 'gtk');
rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private drive, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Drive at sunset, then a <a href="merzouga-sunset-camel-ride.html">camel ride</a>', 'Stay the night at a <a href="merzouga-desert-camp-camel-ride.html">desert camp</a>', 'A sandboarding stop on the big dunes',
  'On to Khamlia for Gnawa music', 'A longer 3-hour drive with more oases', 'Photos and video taken by your guide',
].map(t => li(TICK, t)).join(''), 'custom');
between('<h3>Great for</h3><ul>', '</ul></div>', ['Couples who want to share the ride', 'Parents with children from 5', 'Anyone who prefers a seat belt to a quad'].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You want to ride on your own: our <a href="merzouga-quad-biking.html">quad biking</a> gives everyone a quad',
  'You prefer the quiet of the dunes: our <a href="merzouga-sunset-camel-ride.html">sunset camel ride</a>',
].map(t => li(INFO, t)).join(''), 'think');
const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
between('<div class="dt-revs">', '</div>\n        </section>', ['Sarah L.', 'Lukas M.', 'Maria G.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
const FAQ = [
  ['Who can drive the buggy?', 'Drivers need to be 18 or older with a valid driving licence; bring it with you. No off-road experience is needed: the briefing comes first and your guide sets the pace.'],
  ['Buggy or quad: which should we choose?', 'A buggy has seats, seat belts and a roll bar, and you ride side by side, so it suits couples and families. A quad gives everyone their own machine and feels more like riding a bike.'],
  ['Can children come?', 'Yes, from 5 years old as passengers, with seat belts and a helmet. With two children, a 4-seat family buggy keeps everyone together.'],
  ['Is it safe?', 'Yes, when you follow the guide. He drives in front, picks the lines over the dunes and keeps the speed steady; seat belts and helmets are always worn.'],
  ['One hour or two?', 'One hour gives you the dunes and the viewpoints. Two hours goes further, to tea with a nomad family and the desert lake of Dayet Srij when it has water.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your ride.</p></div></details>\n`, 'faq');
rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the Merzouga Buggy Tour.")}"`, 'wa');
rep('placeholder="1 or 2 hours, morning or afternoon, questions…"', 'placeholder="2 or 4 seats, 1 or 2 hours, questions…"', 'ph');
rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Merzouga Buggy Tour', 'mbar');
rep('<h2 id="hcta-title">Book Your Quad Ride</h2>', '<h2 id="hcta-title">Book Your Buggy Tour</h2>', 'banner');
rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and how many seats; we’ll meet you in Merzouga.', 'banner sub');
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Adventure travellers'],
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your ride.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
for (const bad of ['quad base', 'your own quad', 'Your quad', 'sandboard down', 'Sandboarding stop', '16']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('written', OUT, s.length);
