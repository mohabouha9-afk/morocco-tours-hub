// Build tours/2-day-fes-to-marrakech-desert-tour.html (NEW 2026-11-23, owner: "if we don't have it, add it").
// Fes -> Ifrane -> cedar forest -> Midelt -> Ziz -> Merzouga camp -> Tinghir -> Dades -> Ouarzazate -> Aït Ben Haddou (photo stop) -> Tichka -> Marrakech.
// Template = the finished 2-day Fes -> Merzouga page. Never re-run on the finished page.
// Research (2026-11-23, notes in .claude/research/tour-2day-fes-marrakech-research.md):
//   GetYourGuide "Fes: 2-Day Desert Tour to Fes or Marrakech" 4.7 / 452: leave Fes ~07:00, camel ~40 min, Marrakech option =
//   "9-to-10-hour transfer via the High Atlas and Tizi n'Tichka", arrival "around 8:00–9:30 PM", complaints: long and tiring,
//   no sightseeing stops on the Marrakech day (no Aït Ben Haddou), camp near the edge of the dunes.
//   moroccofabuloustravel.com 2-day Fes -> Marrakech: D1 ~500 km / 7 h 30, D2 ~560 km / ~9 h via Aït Ben Haddou panoramic view
//   and the High Atlas; "does not suit people who tend to experience motion sickness".
//   mouhoutours.com: D2 ~9 h, finish 17:00–19:00; recommends the 3-day tour for a slower pace.
//   OSRM: Fes -> Merzouga ~470 km (fm4-d1), Merzouga -> Tinghir -> Ouarzazate -> Aït Ben Haddou -> Marrakech 566 km (fm2-d2).
//   OpenSEO had no credits.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/2-day-fes-to-merzouga-desert-tour.html';
const out = root + 'tours/2-day-fes-to-marrakech-desert-tour.html';
if (fs.existsSync(out)) throw new Error('page exists: edit it directly');
let s = fs.readFileSync(tpl, 'utf8');
function rep(a, b, label) {
  if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
  else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
}
function between(start, end, inner, label) {
  const i = s.indexOf(start); if (i < 0) throw new Error('start ' + label);
  const j = s.indexOf(end, i + start.length); if (j < 0) throw new Error('end ' + label);
  s = s.slice(0, i + start.length) + inner + s.slice(j);
}
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));

const URL = 'https://moroccotourshub.com/tours/2-day-fes-to-marrakech-desert-tour.html';
const NAME = '2-Day Fes to Marrakech Desert Tour';
const TITLE = '2-Day Fes to Marrakech Desert Tour via Merzouga | Private';
const DESC = 'Private 2-day desert tour from Fes to Marrakech: the Middle Atlas cedars and the Ziz Valley to a sunset camel ride and a night in the Merzouga dunes, then the Dades Valley, Aït Ben Haddou and the High Atlas to Marrakech.';
const HERO = 'sahara-caravan-ridge-golden.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="2-day desert tour from Fes to Marrakech, Fes to Marrakech desert tour 2 days, Fez to Marrakech via Merzouga, Fes to Marrakech via the Sahara, Merzouga camp, private desert tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/2-day-fes-to-merzouga-desert-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Fes → Ifrane → Cedar forest → Midelt → Ziz Valley → Merzouga',
    p: 'Pick-up at your riad or hotel in Fes at about 07:30. The road climbs into the Middle Atlas: a short stop in Ifrane, then the cedar forest near Azrou to watch the Barbary macaques. Lunch in Midelt below the Ayachi peaks, the viewpoint over the palms of the Ziz Valley, and on past Erfoud to the dunes of Erg Chebbi. Leave your big bags in the car, ride a camel into the sand for sunset, and spend the night in the camp with dinner and drums by the fire.',
    meta: [['car', 'About 470 km, about 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'Merzouga → Tinghir → Dades Valley → Aït Ben Haddou → Marrakech',
    p: 'Climb a dune for sunrise, sandboard if you like, then breakfast and back to the car by camel or 4×4; we leave Merzouga at about 08:00. West through the palm oasis of Tinghir, the kasbahs of the Dades Valley and the Valley of Roses to Ouarzazate, with lunch on the way. A photo stop at Aït Ben Haddou, then over the High Atlas by the Tizi n’Tichka pass to your riad or hotel in Marrakech in the evening.',
    meta: [['car', 'About 560 km, about 10 hours on the road'], ['flag', 'Drop-off at your Marrakech riad, hotel or airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep('<img src="/assets/images/merzouga-camel-ride-dunes.jpg" alt="Riding camels over the Erg Chebbi dunes near Merzouga" loading="eager"', `<img src="/assets/images/${HERO}" alt="A camel caravan on a golden dune ridge in the Sahara" loading="eager"`, 'hero img');
rep('<span>2-Day Fes to Merzouga Desert Tour</span></nav>', `<span>${NAME}</span></nav>`, 'crumb');
rep(/<h1>2-Day Fes to Merzouga Desert Tour<span class="script">[^<]*<\/span><\/h1>/, `<h1>${NAME}<span class="script">The Sahara on the Way to Marrakech</span></h1>`, 'h1');
rep('<small>Start &amp; end</small><b>Fes</b>', '<small>Start &amp; end</small><b>Fes → Marrakech</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">The quickest way from Fes to Marrakech that still gives you the Sahara. Over the cedar forests of the Middle Atlas, where Barbary macaques watch from the trees, and down the palms of the Ziz Valley to the golden dunes of Erg Chebbi. A camel ride into the sand at sunset, dinner and drums by the fire, and a night in a camp under the stars.</p>
          <p class="dt-lead">After sunrise on the dunes, the road crosses the south of Morocco: the oasis of Tinghir, the kasbahs of the Dades Valley, a photo stop at Aït Ben Haddou and the High Atlas, to your riad in Marrakech the same evening. Your own car and driver-guide, stops when you want them, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Fes (round trip)</dd>', '<dd>Fes → Marrakech</dd>', 'kf1');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'Barbary macaques in the cedar forest',
  'Ifrane, the alpine town of the Atlas',
  'Sunset camel ride into Erg Chebbi',
  'A night under the Sahara stars',
  'Sunrise and sandboarding on the dunes',
  'Kasbahs of the Dades Valley',
  'Aït Ben Haddou from the viewpoint',
  'The High Atlas by the Tichka pass',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['grand-fes-blue-gate.jpg', 'Bab Bou Jeloud, the blue gate of Fes', 975, 1300],
  ['ziz-valley-plateau.jpg', 'The Ziz Valley palm groves below the plateau', 1600, 1066],
  ['merzouga-camel-orange-dusk.jpg', 'Camels on the Merzouga dunes at dusk', 1300, 866],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp near Merzouga', 1600, 1067],
  ['tinghir-oasis-kasbahs.jpg', 'Kasbahs above the palm oasis of Tinghir', 1300, 867],
  ['ait-ben-haddou-village.jpg', 'The ksar of Aït Ben Haddou on its hill', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up in Fes, drop-off in Marrakech',
  '1 night in a desert camp',
  'Dinner and breakfast',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Day 2 is long: we stop whenever you want',
  'Car-sick? Sit in front on the Tichka bends',
  'Medina riads: we meet you at the nearest gate',
  'Small bag for the camp; luggage stays in the car',
  'Desert nights are cold in winter',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Fes to Merzouga and back, about 940 km in 2 days\. <a href="[^"]*"/, '<span>Fes to the Sahara and on to Marrakech, about 1,040 km in 2 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Fes,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Ifrane,Morocco%7CMidelt,Morocco%7CMerzouga,Morocco%7CTinghir,Morocco%7CAit+Ben+Haddou,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (camp only, kept) ----------
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers going from Fes to Marrakech in two days',
  'Couples and friends happy with long road days',
  'Anyone who wants a Sahara night on the way',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Long drives tire you? The <a href="3-day-fes-to-marrakech-desert-tour.html">3-day Fes to Marrakech tour</a> adds a night in the Dades Valley',
  'Flying home from Fes? The <a href="2-day-fes-to-merzouga-desert-tour.html">2-day Fes to Merzouga tour</a> brings you back to Fes',
  'Want a full day in the dunes? The <a href="5-day-fes-to-marrakech-desert-tour.html">5-day Fes to Marrakech tour</a> adds a day around Merzouga',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'fm2-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Is two days enough to go from Fes to Marrakech through the Sahara?', 'Yes, if you don’t mind long road days: about 8 hours on day 1 and about 10 on day 2, stops included. You still get the sunset camel ride, a night in the dunes and the sunrise. If you would rather break the drive, the 3-day tour adds a night in the Dades Valley and the Todra Gorge.'],
  ['What time do we reach Marrakech?', 'Usually in the evening, around 19:00 to 20:00, depending on your stops. We drop you at your riad (or the nearest medina gate), your hotel or Marrakech airport. Please don’t book a flight for that evening: fly out the next day.'],
  ['Why not take the train from Fes to Marrakech?', 'The train takes about 7 hours and shows you nothing of the south. On this tour the same journey becomes a camel ride, a night in the Sahara, the kasbahs of the Dades Valley and the High Atlas, with your bags in the car the whole way.'],
  ['Do we stop at Aït Ben Haddou?', 'Yes, for photos from the viewpoint across the river. Walking up through the old ksar takes about an hour more, which a 10-hour day can’t fit comfortably. To go inside, ask us for an early start, or take the 3-day tour, where your driver-guide walks you through it.'],
  ['I get car-sick. Is the Tichka road hard?', 'The Tizi n’Tichka is a good, wide road, but its bends last about an hour. Sit in the front seat, keep lunch light and tell your driver whenever you want to stop: it is your own car, so the stops are yours.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury camp',
  '<a href="merzouga-quad-biking.html">Quad biking</a> on the dunes (extra cost)',
  'A <a href="merzouga-buggy-tour.html">buggy for two</a> before sunset (extra cost)',
  'A 4×4 to the camp instead of the camel',
  'A <a href="marrakech-medina-guided-tour.html">guided Marrakech medina walk</a> the next day',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="2-Day Fes to Merzouga Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%202-Day%20Fes%20to%20Merzouga%20Desert%20Tour.', 'information%20about%20the%202-Day%20Fes%20to%20Marrakech%20Desert%20Tour.', 'wa');
rep('<b>2-Day Fes to Merzouga</b><span>Free', '<b>2-Day Fes to Marrakech</b><span>Free', 'mbar');

// ---------- similar ----------
const si = s.indexOf('<ul class="htours__list dt-others__list">\n'); const sj = s.indexOf('        <li class="htours__end">', si);
s = s.slice(0, si + '<ul class="htours__list dt-others__list">\n'.length) + JSON.parse(fs.readFileSync(SP + 'fm2-similar.json', 'utf8')) + s.slice(sj);

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Friends', 'Solo travellers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Fes pick-up, Ifrane and the cedar forest', 'Midelt and the Ziz Valley', 'Sunset camel ride and desert camp in Merzouga', 'Tinghir and the Dades Valley', 'Aït Ben Haddou and the Tizi n’Tichka pass', 'Drop-off in Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
for (const bad of ['round trip', 'back to Fes', 'home to Fes', 'both days', 'Fes airport', 'macaques from sellers']) if (main.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
