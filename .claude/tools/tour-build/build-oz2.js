// Build tours/2-day-ouarzazate-to-merzouga-desert-tour.html (NEW 2026-11-23: Ouarzazate -> Skoura -> Valley of Roses -> Dades -> Todra -> Merzouga camp
//   -> Rissani -> Alnif -> Tazzarine -> N'Kob -> Draa -> Ouarzazate). Template = the finished 2-day Marrakech -> Merzouga page (like build-fr2.js).
// Research: .claude/research/tour-ouarzazate-merzouga-research.md (Mouhou 2-day loop, GYG 2-day small group 4.2 / 18 "rushed", "same road both ways",
//   Fabulous 3-day, PDT 3-day). OSRM: day 1 about 390 km / 7.1 h (with the Todra Gorge spur), day 2 about 360 km / 7.0 h (oz2-d1, oz2-d2).
// Never re-run on the finished page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/2-day-marrakech-to-merzouga-desert-tour.html';
const out = root + 'tours/2-day-ouarzazate-to-merzouga-desert-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/2-day-ouarzazate-to-merzouga-desert-tour.html';
const NAME = '2-Day Ouarzazate to Merzouga Desert Tour';
const TITLE = '2-Day Ouarzazate to Merzouga Desert Tour | Private Loop';
const DESC = 'Private 2-day desert tour from Ouarzazate: out by Skoura, the Dades Valley and the Todra Gorge to a sunset camel ride and a camp in the Merzouga dunes, back by Rissani, Alnif and the N’Kob kasbahs. No road twice.';
const HERO = 'merzouga-caravan-sunset.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Ouarzazate to Merzouga, Ouarzazate desert tour, 2-day desert tour from Ouarzazate, Merzouga tour from Ouarzazate, Sahara tour from Ouarzazate, Erg Chebbi camp, private desert tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/2-day-marrakech-to-merzouga-desert-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Ouarzazate → Skoura → Valley of Roses → Dades → Todra Gorge → Merzouga',
    p: 'Pick-up at your hotel or riad in Ouarzazate, or at the airport, around 07:30. East on the Road of a Thousand Kasbahs: the palm grove of Skoura and Kasbah Amridil, the rose gardens of Kalaat M’Gouna and the red villages of the Dades Valley. Lunch where you like, then a walk between the 300-metre walls of the Todra Gorge, and on past Erfoud to the dunes of Erg Chebbi. Your big bags stay in the car: you ride a camel into the sand for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 390 km, about 8 to 9 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'Sunrise on Erg Chebbi → Rissani → Alnif → N’Kob → Draa Valley → Ouarzazate',
    p: 'Up early to climb a dune for sunrise, sandboarding if you like, breakfast in the camp and back by camel or 4×4 to your car. A different road home: Rissani, the old caravan town, then west past Alnif, the fossil village, across the dark hills of the Jebel Saghro to Tazzarine and the kasbahs of N’Kob, and along the date palms of the Draa Valley to Ouarzazate, at your hotel or the airport in the early evening.',
    meta: [['car', 'About 360 km, about 8 hours on the road'], ['flag', 'Drop-off at your Ouarzazate hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/hero-desert-caravan\.webp" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan crossing the Merzouga dunes at sunset" loading="eager"`, 'hero img');
rep('<span>2-Day Desert Tour</span></nav>', '<span>2-Day Ouarzazate to Merzouga Desert Tour</span></nav>', 'crumb');
rep(/(<span class="dt-hero__loc">(?:<svg.*?<\/svg>)?)Marrakech<\/span>/, '$1Ouarzazate</span>', 'chip');
rep('<h1>2-Day Marrakech to Merzouga Desert Tour<span class="script">The Sahara dunes in only two days</span></h1>', '<h1>2-Day Ouarzazate to Merzouga Desert Tour<span class="script">Gorges Out, Oases Back</span></h1>', 'h1');
rep('<small>Start &amp; end</small><b>Marrakech</b>', '<small>Start &amp; end</small><b>Ouarzazate</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">From Ouarzazate, the Sahara is already close. In two days you ride the Road of a Thousand Kasbahs through the palms of Skoura, the Valley of Roses and the Dades Valley, walk into the Todra Gorge and reach the golden dunes of Erg Chebbi for a camel ride at sunset and a night in a camp under the stars.</p>
          <p class="dt-lead">At dawn you climb a dune for the sunrise, then come home a different way: Rissani, the fossils of Alnif and the old kasbahs of N’Kob on the quiet southern road. No road twice, your own car and driver-guide, stops when you want them and no shop stops you didn’t ask for.</p>
`, 'overview');
rep(/<dd>Marrakech<\/dd>/, '<dd>Ouarzazate (loop)</dd>', 'kf1');
rep('<dt>Desert night</dt><dd>Camp in the dunes</dd>', '<dt>Route</dt><dd>Gorges out, oases back</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The palm grove and kasbahs of Skoura',
  'The Valley of Roses and the Dades Valley',
  'A walk in the Todra Gorge',
  'Sunset camel ride into Erg Chebbi',
  'A night in a camp under the stars',
  'Sunrise and sandboarding on the dunes',
  'Rissani, the old caravan town',
  'Alnif fossils and the N’Kob kasbahs',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['dades-valley-villages.jpg', 'Earth villages and green fields in the Dades Valley', 1500, 1000],
  ['todra-gorge-walk.jpg', 'Walking between the high walls of the Todra Gorge', 1600, 1066],
  ['tinghir-oasis-kasbahs.jpg', 'Kasbahs above the palm oasis of Tinghir', 1300, 867],
  ['merzouga-camel-caravan.jpg', 'A camel caravan on the Merzouga dunes', 1600, 1066],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp near Merzouga', 1600, 1067],
  ['rissani-spice-market.jpg', 'Spices for sale in the Rissani market', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up and drop-off at your Ouarzazate hotel or the airport',
  '1 night in a desert camp',
  'Dinner and breakfast',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Long road days: we stop whenever you want',
  'Staying in Skoura or Aït Ben Haddou? We pick you up there',
  'Small bag for the camp; luggage stays in the car',
  'Winter: an earlier start to reach the dunes for sunset',
  'Desert nights are cold in winter',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Kasbah Amridil, Skoura:</b> small fee, if you go in',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to the Sahara and back, about 1,120 km in 2 days\. <a href="[^"]*"/, '<span>Ouarzazate to Merzouga and back by the southern road, about 750 km in 2 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Ouarzazate,Morocco&amp;destination=Ouarzazate,Morocco&amp;waypoints=Skoura,Morocco%7CBoumalne+Dades,Morocco%7CTodra+Gorge,Morocco%7CMerzouga,Morocco%7CRissani,Morocco%7CAlnif,Morocco%7CNkob,Morocco%7CAgdz,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations (camp only, kept) ----------
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers already in Ouarzazate or flying in there',
  'Self-drivers who want the dunes without the long drive',
  'Anyone who likes to see new country both ways',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Long drives tire you? We can add a night in the Dades Valley to split the road',
  'Starting in Marrakech? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Marrakech to Merzouga tour</a> picks you up at your riad',
  'Want wilder, emptier dunes? The <a href="3-day-marrakech-erg-chigaga-tour.html">3-day Erg Chigaga tour</a> goes off-road to a remote camp',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'oz2-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['How long is the drive from Ouarzazate to Merzouga?', 'About 390 km and 7 hours of driving, so 8 to 9 hours with the stops at Skoura, the Dades Valley and the Todra Gorge. The way back by the southern road is about 360 km. It is a lot of road, but every hour of it is new country.'],
  ['Why come back a different way?', 'Most tours drive the same road twice. We come home by the quiet southern road: Rissani, the fossil village of Alnif, the Jebel Saghro hills, Tazzarine, the kasbahs of N’Kob and the palms of the Draa Valley. Different landscapes, very little traffic.'],
  ['Is it a private tour or a shared minibus?', 'Private: only your group, in your own car with your own driver-guide. Everyone gets a window seat, you stop for photos when you want and nobody rushes you.'],
  ['Will we reach the dunes for sunset?', 'Yes. We leave Ouarzazate around 07:30, a little earlier in winter when the sun sets early, so you are on your camel before the light turns gold. We agree the exact pick-up time on WhatsApp when you book.'],
  ['Can you pick us up at Ouarzazate airport?', 'Yes, we meet you at the airport or at your hotel or riad in town, and drop you back at either one at the end. Arriving the evening before? Spend the night in Ouarzazate and we leave the next morning.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a <a href="merzouga-luxury-desert-camp.html">luxury camp</a>',
  '<a href="merzouga-quad-biking.html">Quad biking</a> on the dunes (extra cost)',
  'A <a href="merzouga-buggy-tour.html">buggy for two</a> before sunset (extra cost)',
  'A second night with a <a href="merzouga-4x4-desert-day-tour.html">4×4 day around Merzouga</a>',
  'End in Fes instead, still in 2 days',
  'Go on to Marrakech by Aït Ben Haddou (one more day)',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="2-Day Marrakech to Merzouga Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%202-Day%20Marrakech%20to%20Merzouga%20Desert%20Tour.', 'information%20about%20the%202-Day%20Ouarzazate%20to%20Merzouga%20Desert%20Tour.', 'wa');
rep('<b>2-Day Merzouga Desert Tour</b><span>Free', '<b>2-Day Ouarzazate to Merzouga</b><span>Free', 'mbar');

// ---------- similar ----------
const si = s.indexOf('<ul class="htours__list dt-others__list">\n'); const sj = s.indexOf('        <li class="htours__end">', si);
s = s.slice(0, si + '<ul class="htours__list dt-others__list">\n'.length) + JSON.parse(fs.readFileSync(SP + 'oz2-similar.json', 'utf8')) + s.slice(sj);

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Friends', 'Families', 'Solo travellers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Ouarzazate pick-up, Skoura and Kasbah Amridil', 'Valley of Roses and the Dades Valley', 'Todra Gorge walk', 'Sunset camel ride and desert camp', 'Sunrise and sandboarding on Erg Chebbi', 'Rissani, Alnif and the N’Kob kasbahs', 'Draa Valley and back to Ouarzazate'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
for (const bad of ['Tichka', 'High Atlas', 'Marrakech to Merzouga Desert Tour<', '06:00', 'Taourirt']) if (main.includes(bad)) console.warn('LEFTOVER:', bad);
if (fs.existsSync(out)) throw new Error('page exists, never re-run');
fs.writeFileSync(out, s);
console.log('written', s.length);
