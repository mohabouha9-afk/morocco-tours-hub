// Build tours/marrakech-three-valleys-day-trip.html (NEW, 2026-11-23): Three Valleys loop — Ourika, Asni, Kik plateau, Lake Lalla Takerkoust.
// Template = the finished Atlas Mountains & Imlil day trip. Research: .claude/research/three-valleys-research.md
// Map: route-map.mjs key "threevalleys" (run it after this script). Do NOT re-run on the finished page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const OUT = 'marrakech-three-valleys-day-trip.html';
let s = fs.readFileSync(root + 'tours/marrakech-atlas-mountains-day-trip.html', 'utf8');
const hub = fs.readFileSync(root + 'day-trips.html', 'utf8');
const palm = fs.readFileSync(root + 'tours/marrakech-palmeraie-camel-ride.html', 'utf8');
function rep(a, b, label) {
  if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
  else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
}
function between(start, end, inner, label) {
  const i = s.indexOf(start); if (i < 0) throw new Error('start ' + label);
  const j = s.indexOf(end, i + start.length); if (j < 0) throw new Error('end ' + label);
  s = s.slice(0, i + start.length) + inner + s.slice(j);
}
const TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const CROSS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>';
const INFO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/></svg>';
const PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
const lis = (ic, arr) => arr.map(t => `<li>${ic}<span>${t}</span></li>`).join('');
// icon of a key fact, by its <dt> label, from a given page
const dtIcon = (src, label) => { const i = src.indexOf(`<dt>${label}</dt>`); if (i < 0) throw new Error('icon ' + label); const a = src.lastIndexOf('<svg', i); return src.slice(a, src.indexOf('</svg>', a) + 6); };

// ---------- texts ----------
const TITLE = 'Three Valleys Day Trip from Marrakech | Private Atlas Tour';
const DESC = 'Private Three Valleys day trip from Marrakech: mint tea in a Berber house in the Ourika valley, Asni, the Kik plateau and Lake Lalla Takerkoust in one loop.';
const URL = 'https://moroccotourshub.com/tours/' + OUT;
const HERO = { src: 'atlas-village-snow-peaks.jpg', alt: 'A Berber village below the snowy peaks of the High Atlas', w: 1800, h: 1200 };
const STEPS = [
  ['08:30', 'Pick-up in Marrakech', 'Your driver meets you at your hotel, or at the nearest gate if you stay in a medina riad. We confirm the time on WhatsApp the day before.'],
  ['09:10', 'Tea in an Ourika valley house', 'About 40 minutes south, a Berber family opens its home in the lower Ourika valley: mint tea, bread from the clay oven and a look at how the house works.'],
  ['10:15', 'Tahanaout and the Asni valley', 'Across to Tahanaout and up to Asni, about 45 minutes. On a Tuesday (Tahanaout) or a Saturday (Asni) you walk through the weekly souk; other days, the village and its views.'],
  ['12:30', 'Lunch in the Asni valley', 'Tagine or couscous with a Berber family or at a country restaurant facing the mountains. You pay on the spot, around €10 per person.'],
  ['14:00', 'Over the Kik plateau', 'Back through the Moulay Brahim gorge and up on to the plateau by 4×4: the Toubkal massif on one side, the lake far below on the other. Stop for photos whenever you like.'],
  ['15:30', 'Lake Lalla Takerkoust', 'Mint tea by the water or a camel ride on the shore, then 45–55 minutes back to Marrakech, at your hotel around 17:30.'],
];
const FAQ = [
  ['What are the three valleys?', '<p>Ourika, Asni below Toubkal, and the N’Fis valley around Lake Lalla Takerkoust, joined by the Kik plateau. Tours sell different mixes under the same name; ours is one loop, so you never drive the same road twice.</p>'],
  ['Is there a waterfall on this trip?', '<p>No, that is what makes room for the plateau and the lake. If waterfalls matter most, take the <a href="marrakech-ourika-valley-day-trip.html">Ourika Valley day trip</a> to Setti Fatma, or the <a href="marrakech-to-ouzoud-waterfalls-day-trip.html">Ouzoud day trip</a> for Morocco’s highest falls.</p>'],
  ['How long is the camel ride?', '<p>As long as you agree before you get on, usually 20–30 minutes along the shore. It is optional and paid to the camel man on the spot; your guide makes sure the price is fair.</p>'],
  ['Is it a lot of time in the car?', '<p>About four hours in all, but never much more than an hour at a stretch, with a stop after every drive. If you get car-sick, take the front seat: the plateau road has bends.</p>'],
  ['Will we stop at shops on the way?', '<p>No. The Berber house is a family home, not a shop, and nobody expects you to buy. Your guide is included all day, so you never pay a village guide either.</p>'],
  ['How do I book, and what if it rains?', '<ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before. After heavy rain we skip the plateau track and drive back on the paved road; if the weather is really bad, you choose a new date or a refund.</p>'],
];
const strip = h => h.replace(/<[^>]+>/g, '');

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/(<meta name="description" content=")[^"]*/, `$1${DESC}`, 'desc');
rep(/(<meta name="keywords" content=")[^"]*/, '$1Three Valleys Marrakech, three valleys day trip, Atlas Mountains day trip, Kik plateau, Lalla Takerkoust, Ourika valley, Asni, private day trip from Marrakech', 'kw');
rep('https://moroccotourshub.com/tours/marrakech-atlas-mountains-day-trip.html', URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*/, `$1${TITLE}`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*/, `$1${TITLE}`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*/, `$1${DESC}`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*/, `$1${DESC}`, 'twd');
rep('https://moroccotourshub.com/assets/images/atlas-berber-village.jpg', 'https://moroccotourshub.com/assets/images/' + HERO.src, 'og img');
const trip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: 'Three Valleys Day Trip from Marrakech', description: DESC, image: 'https://moroccotourshub.com/assets/images/' + HERO.src, url: URL, touristType: 'Private travellers',
  itinerary: { '@type': 'ItemList', itemListElement: STEPS.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x[1] })) },
  provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com' } };
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a).replace(/\s+/g, ' ').trim() } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"TouristTrip"[^<]*<\/script>/,
  `<script type="application/ld+json">${JSON.stringify(trip)}</script>\n<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`, 'ld');

// ---------- hero ----------
rep(/<img src="\/assets\/images\/atlas-berber-village.jpg" alt="[^"]*" width="1600" height="1000" loading="eager"/, `<img src="/assets/images/${HERO.src}" alt="${HERO.alt}" width="${HERO.w}" height="${HERO.h}" loading="eager"`, 'hero');
rep('<span>Atlas Mountains & Imlil Day Trip</span></nav>', '<span>Three Valleys Day Trip</span></nav>', 'crumb');
rep('<h1>Atlas Mountains & Imlil Day Trip<span class="script">Berber villages at the foot of Toubkal</span></h1>', '<h1>Three Valleys Day Trip<span class="script">The Atlas, the plateau and the lake in one day</span></h1>', 'h1');
rep('<b>About 8.5 hours</b>', '<b>About 9 hours</b>', 'dur');

// ---------- overview ----------
const leadA = 'The Three Valleys day trip is a loop through the High Atlas foothills south of Marrakech: mint tea in a Berber house in the Ourika valley, the villages and weekly souks of the Asni valley, the high Kik plateau facing Toubkal, and Lake Lalla Takerkoust below the mountains.';
const leadB = 'It is the day for seeing a lot without long walks: about four hours on the road in short drives, never the same road twice, and each stop as long as you like. Your private 4×4 handles the plateau track, and your local professional guide explains village life as you go.';
rep(/<p class="dt-lead">Imlil is the mountain village[^<]*<\/p>\s*<p class="dt-lead">The walk is made for you[^<]*<\/p>/, `<p class="dt-lead">${leadA}</p>\n          <p class="dt-lead">${leadB}</p>`, 'leads');
const G = [
  [dtIcon(s, 'Pick-up'), 'Pick-up', '08:30, back around 17:30'],
  [dtIcon(s, 'Drive'), 'Drive', '160 km loop, about 4 h'],
  [dtIcon(palm, 'Camel ride'), 'Camel ride', 'Optional, by the lake'],
  [dtIcon(s, 'Guide'), 'Guide', 'Local guide included'],
  [dtIcon(s, 'Shopping stops'), 'Shopping stops', 'None, the day is yours'],
  [dtIcon(s, 'Cancellation'), 'Cancellation', 'Free up to 24 h before'],
];
between('<dl class="dt-glance">', '</dl>', G.map(([ic, t, d]) => `<div>${ic}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'glance');
between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', lis(TICK, [
  'Mint tea in a Berber family home',
  'A Berber souk on market days',
  'The Toubkal massif from the Kik plateau',
  'Lake Lalla Takerkoust below the Atlas',
  'Three valleys in one loop, no road twice',
  'A camel ride by the lake, if you like',
]), 'high');

// ---------- gallery ----------
const GAL = [['atlas-berber-village.jpg', 'Earth-built Berber village in the Atlas foothills', 1500, 1000], ['nomad-tent-tea.jpg', 'Mint tea poured for guests', 960, 1280], ['atlas-snow-autumn.jpg', 'High Atlas peaks with the first snow', 1600, 1066], ['atlas-mountains.jpeg', 'A green valley in the Atlas foothills', 720, 480]];
between('<div class="dt-gal dt-gal--4">', '</div>', GAL.map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gal');

// ---------- programme ----------
between('<ol class="dt-prog dt-prog--acc">', '</ol>', '\n' + STEPS.map(([t, h, p], i) => `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>`).join('\n') + '\n          ', 'prog');

// ---------- included ----------
between('<div class="dt-card dt-inc__box dt-inc__box--yes"><h3>Included</h3><ul>', '</ul>', lis(TICK, [
  'Private air-conditioned 4×4 with driver (<a href="../index.html#fleet">see our fleet</a>)',
  'Local professional guide all day',
  'Hotel or riad pick-up and drop-off in Marrakech',
  'Mint tea in the Berber house',
  'Bottled water',
  'English-speaking driver',
]), 'inc');
between('<div class="dt-card dt-inc__box dt-inc__box--no"><h3>Not included</h3><ul>', '</ul>', lis(CROSS, ['Lunch and drinks', 'Camel ride at the lake, if you want one', 'Tips', 'Travel insurance']), 'noinc');
between('<div class="dt-card dt-inc__box dt-inc__box--info"><h3>Good to know</h3><ul>', '</ul>', lis(INFO, [
  'This is a suggestion: tell us your preferences',
  'Weekly souks: Tuesday in Tahanaout, Saturday in Asni, Sunday at Lalla Takerkoust',
  'Little walking: short strolls on uneven ground, fine for most ages',
  'Bring a warm layer: the plateau is windy and cooler than Marrakech',
  'Dress modestly in the villages: shoulders and knees covered',
  'The roads have bends: ask for the front seat if you get car-sick',
]), 'info');
const costIc = (() => { const i = s.indexOf('<div class="dt-card dt-costs">'); const a = s.indexOf('<svg', i); return s.slice(a, s.indexOf('</svg>', a) + 6); })();
between('<div class="dt-card dt-costs"><h3>Costs on the day</h3><ul class="dt-ticks">', '</ul>', [
  '<b>Lunch in the Asni valley:</b> around €10 per person (about 100 MAD), depending on what you eat',
  '<b>Mint tea or a soft drink:</b> about 10–25 MAD',
  '<b>Camel ride at the lake:</b> optional; the price and the length are agreed before you get on',
  '<b>Tips:</b> up to you, including a thank-you for the Berber family',
  '<b>Cash:</b> bring some dirhams; the souks and village cafés rarely take cards',
].map(t => `<li>${costIc}<span>${t}</span></li>`).join(''), 'costs');
rep(/(<p class="dt-map__note">[\s\S]*?<\/svg><span>)[\s\S]*?(<\/span><\/p>)/, '$1Marrakech → Ourika → Asni → Kik plateau → Lalla Takerkoust → Marrakech: about 160 km, 4 hours of driving in short legs. <a href="https://www.openstreetmap.org/#map=10/31.40/-8.00" target="_blank" rel="noopener">Open the larger map</a>$2', 'mapnote');

// ---------- make it your own + fit ----------
between('<p class="dt-lead">It is your private day, so the plan moves with you. Tell us what you would like when you book.</p>\n          <div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul>', lis(TICK, [
  'Come on a Saturday for the big souk in Asni',
  'Add a short walk in Imlil, below Toubkal',
  'Lunch by the pool at a countryside inn (extra cost)',
  'Stay at the lake for sunset in summer',
  'An argan cooperative visit, only if you ask',
  'Child seats and special diets, on request',
]), 'custom');
between('<div class="dt-inc dt-fit"><div class="dt-card dt-inc__box dt-inc__box--yes"><h3>Great for</h3><ul>', '</ul>', lis(TICK, [
  'First visits: the Atlas, a souk and a lake in one day',
  'Travellers who would rather not hike',
  'Families and older travellers: short drives, long stops',
]), 'great');
between('<h3>Think twice if</h3><ul>', '</ul>', lis(INFO, [
  'You want waterfalls: the <a href="marrakech-ourika-valley-day-trip.html">Ourika Valley day trip</a> ends at the Setti Fatma falls',
  'You want a real mountain walk: the <a href="marrakech-atlas-mountains-day-trip.html">Atlas Mountains &amp; Imlil day trip</a> gives you hours on the trail',
]), 'twice');

// ---------- FAQ ----------
between('<div class="hfaq__list dt-faq">', '</div>\n        </section>\n      </div>\n      <aside', '\n' + FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a">${a}</div></details>`).join('\n') + '\n          ', 'faq');

// ---------- booking ----------
rep('value="Atlas Mountains & Imlil Day Trip"', 'value="Three Valleys Day Trip"', 'form');
rep('the%20Atlas%20Mountains%20%26%20Imlil%20Day%20Trip.', 'the%20Three%20Valleys%20Day%20Trip.', 'wa');
rep(/(<div class="dt-mbar"[\s\S]*?<b[^>]*>)Atlas Mountains &(amp;)? Imlil Day Trip/, '$1Three Valleys Day Trip', 'mbar');

// ---------- other day trips: Ourika (kept), Atlas & Imlil, Agafay ----------
const card = id => { const i = hub.indexOf(`<li id="${id}">`); if (i < 0) throw new Error('card ' + id); return hub.slice(i, hub.indexOf('</li>', i) + 5).replace(`<li id="${id}">`, '<li>').replace('href="tours/', 'href="../tours/'); };
const L = s.indexOf('<ul class="htours__list dt-others__list">');
const A = s.indexOf('<li><article class="htour htour--dt"><a class="htour__link" href="../tours/marrakech-to-ait-ben-haddou-day-trip.html">', L);
const E = s.indexOf('<li class="htours__end">', A);
if (L < 0 || A < 0 || E < 0) throw new Error('others');
s = s.slice(0, A) + card('dt-imlil') + '\n        ' + card('dt-agafay') + '\n        ' + s.slice(E);

if (/Imlil Day Trip<\/span><\/nav>|Atlas Mountains & Imlil Day Trip"/.test(s)) throw new Error('leftover template text');
fs.writeFileSync(root + 'tours/' + OUT, s);
console.log('built tours/' + OUT, s.length);
