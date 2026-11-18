// Build tours/4-day-marrakech-to-merzouga-desert-tour.html (NEW 2026-11-18: Marrakech -> Dades -> Merzouga camp -> Draa -> Ouarzazate -> Aït Ben Haddou -> Telouet -> Marrakech)
// Template = the finished 4-day Agadir -> Merzouga -> Marrakech page (4-col table). Never re-run on the finished page.
// Research (2026-11-18): Google #1 for "4 day desert tour from Marrakech to Merzouga" = marrakech-desert-trips.com
//   "4 Days Marrakech to Merzouga Desert Tour" (read): pick-up ~08:00; D1 Tichka, Aït Ben Haddou, Ouarzazate, Skoura, Rose Valley,
//   Dades (6 h) · D2 Todra, Erfoud, Rissani, Merzouga camel + camp (4 h) · D3 sunrise, Anti-Atlas, N'Kob, Draa, Agdz, Ouarzazate (6 h)
//   · D4 Aït Ben Haddou guided walk, Telouet, Tichka, Marrakech early evening (5 h); "One extra day eliminates the longest drive of
//   the 3-day tour", "no road repeated". Their other 4-day goes Zagora first. cameltripssahara/mouhoutours/marrakechtourcompany:
//   D1 Marrakech-Dades, D2 Merzouga, D3+D4 back (the long return). GYG "4-Day Desert Tour with 2 Nights in Merzouga" 4.1 / 115.
//   OSRM: d1 318 km 6 h · d2 mz3-d2 ~270 km · d3 = ag4-d2 reversed ~365 km · d4 (via Aït Ben Haddou + Telouet) 204 km 4.5 h.
//   Our change: Aït Ben Haddou only once (day 4, proper walk). OpenSEO had no credits ("4 day desert tour from marrakech" 30/month on file).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/4-day-desert-tour-agadir-merzouga-marrakech.html';
const out = root + 'tours/4-day-marrakech-to-merzouga-desert-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/4-day-marrakech-to-merzouga-desert-tour.html';
const NAME = '4-Day Marrakech to Merzouga Desert Tour';
const TITLE = '4-Day Marrakech to Merzouga Desert Tour | Private Round Trip';
const DESC = 'Private 4-day desert tour from Marrakech and back with no long drive days: the Dades and Todra gorges to a sunset camel ride and a camp in the Merzouga dunes, then the Draa Valley, Aït Ben Haddou and the Telouet Kasbah.';
const HERO = 'merzouga-camel-caravan.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="4-day desert tour from Marrakech, Marrakech to Merzouga 4 days, Merzouga round trip from Marrakech, Sahara tour from Marrakech, Draa Valley, Telouet, Aït Ben Haddou, private desert tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/4-day-desert-tour-agadir-merzouga-marrakech\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Marrakech → Tizi n’Tichka → Ouarzazate → Skoura → Dades Valley',
    p: 'Pick-up at your riad or hotel around 08:00. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, with stops in the Berber villages, then down to Ouarzazate and the Taourirt Kasbah. East through the palm grove and kasbahs of Skoura and the Valley of Roses to the Dades Valley, for an evening among red cliffs and a drive up to the gorge.',
    meta: [['car', 'About 320 km, about 6 hours on the road'], ['bed', 'Night: Dades Valley'], ['food', 'Dinner & breakfast']] },
  { t: 'Dades → Todra Gorge → Rissani → Merzouga',
    p: 'A short drive to Tinghir and a walk between the 300 m walls of the Todra Gorge, with time to enjoy it. Along the Jebel Saghro to Erfoud and Rissani, the old caravan town, and on to the dunes of Erg Chebbi. Your big bags stay in the car: you ride a camel into the sand for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 270 km, about 4–5 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Dinner & breakfast']] },
  { t: 'Merzouga → Alnif → N’Kob → Draa Valley → Ouarzazate',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. A different road home: west past Alnif, the trilobite fossil village, across the dark hills of the Jebel Saghro to the kasbahs of N’Kob, then along the date palms of the Draa Valley and through Agdz, the old caravan stop, to Ouarzazate for the night.',
    meta: [['car', 'About 365 km, about 6 hours on the road'], ['bed', 'Night: Ouarzazate'], ['food', 'Dinner & breakfast']] },
  { t: 'Ouarzazate → Aït Ben Haddou → Telouet → Marrakech',
    p: 'A short drive to Aït Ben Haddou and a proper walk with your driver-guide, up through the ksar to its old granary. Then the quiet road up the Ounila Valley to the Telouet Kasbah, the Glaoui palace with its painted ceilings and tiles, and back over the High Atlas to Marrakech in the late afternoon, at your hotel, riad or the airport.',
    meta: [['car', 'About 205 km, about 4–5 hours on the road'], ['flag', 'Drop-off at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/merzouga-camel-ride-group\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan on the Merzouga dunes" loading="eager"`, 'hero img');
rep('<span>4-Day Agadir to Merzouga &amp; Marrakech</span></nav>', '<span>4-Day Marrakech to Merzouga Desert Tour</span></nav>', 'crumb');
rep('r="2.5"/></svg>Agadir</span>', 'r="2.5"/></svg>Marrakech</span>', 'chip');
rep('<h1>4-Day Agadir to Merzouga Desert Tour<span class="script">Out by the Draa, Back by the Gorges</span></h1>', '<h1>4-Day Marrakech to Merzouga Desert Tour<span class="script">No Road Driven Twice</span></h1>', 'h1');
rep('<small>Route</small><b>Agadir → Marrakech</b>', '<small>Route</small><b>Marrakech round trip</b>', 'hero route');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">The Sahara from Marrakech at an easy pace. Over the High Atlas to the kasbahs of Skoura and the Dades Valley, a walk in the Todra Gorge, then a sunset camel ride into the dunes of Erg Chebbi and a night in the camp. One extra day means no ten-hour drive home.</p>
          <p class="dt-lead">You come back a different way: across the Jebel Saghro and along the palms of the Draa Valley, a night in Ouarzazate, then Aït Ben Haddou on foot and the painted halls of the Telouet Kasbah before the mountains bring you back to Marrakech. Your own car and driver-guide, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Agadir → Marrakech</dd>', '<dd>Marrakech round trip</dd>', 'kf1');
rep(/(<dt>)Desert night(<\/dt><dd>)Camp in the dunes(<\/dd>)/, '$1Easy pace$2No long drive days$3', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The Tizi n’Tichka pass over the High Atlas',
  'Skoura and the Valley of Roses',
  'A walk in the Todra Gorge',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'The date palms of the Draa Valley',
  'Aït Ben Haddou on foot',
  'The painted halls of the Telouet Kasbah',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['dades-road.jpg', 'The hairpin bends of the Dades Gorge road', 1080, 1349],
  ['todra-gorge-bridge.jpg', 'The river and the cliffs of the Todra Gorge', 1600, 1066],
  ['merzouga-camel-caravan-guide.jpg', 'A camel caravan led over the Merzouga dunes', 1300, 866],
  ['luxury-camp-night.jpg', 'A desert camp lit up at night in the dunes', 1600, 1066],
  ['desert-mesa.jpg', 'Open desert on the road back by the Jebel Saghro', 1600, 1066],
  ['ait-ben-haddou-kasbah-walk.jpg', 'Walking up through the ksar of Aït Ben Haddou', 1300, 866],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up and drop-off at your Marrakech riad or hotel',
  '1 night in the Dades Valley',
  '1 night in a desert camp',
  '1 night in Ouarzazate',
  '3 dinners and 3 breakfasts',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Medina riads: we meet you at the nearest gate',
  'Car-sick? Sit in front on the Tichka bends',
  'Small bag for the camp; luggage stays in the car',
  'Desert and mountain nights are cold in winter',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Taourirt Kasbah, Ouarzazate:</b> small fee, if you go in',
  '<b>Telouet Kasbah:</b> small fee at the door',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Agadir to Marrakech by the Sahara, about 1,350 km in 4 days\. <a href="[^"]*"/, '<span>Marrakech to the Sahara and back, about 1,160 km in 4 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Boumalne+Dades,Morocco%7CTodra+Gorge,Morocco%7CMerzouga,Morocco%7CNkob,Morocco%7COuarzazate,Morocco%7CAit+Ben+Haddou,Morocco%7CTelouet,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations: reorder the template rows (Ouarzazate | camp | Dades) -> Dades | camp | Ouarzazate ----------
{
  const a = s.indexOf('<div class="dt-acc-wrap"><table class="dt-acc'); const b = s.indexOf('</table></div>', a);
  let tb = s.slice(a, b);
  tb = tb.replace('<th scope="col">Night 1: Ouarzazate</th><th scope="col">Night 2: Desert camp</th><th scope="col">Night 3: Dades Valley</th>', '<th scope="col">Night 1: Dades Valley</th><th scope="col">Night 2: Desert camp</th><th scope="col">Night 3: Ouarzazate</th>');
  let n = 0;
  tb = tb.replace(/(<tr><th scope="row">[^<]*<\/th>)(<td>.*?<\/td>)(<td>.*?<\/td>)(<td>.*?<\/td>)(<\/tr>)/g, (m, h, c1, c2, c3, e) => { n++; return h + c3 + c2 + c1 + e; });
  if (n !== 3 || !tb.includes('Night 1: Dades Valley')) throw new Error('acc table ' + n);
  s = s.slice(0, a) + tb + s.slice(b);
}
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers flying in and out of Marrakech',
  'Families and anyone who prefers shorter days',
  'First-timers who want dunes, gorges and kasbahs',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Only have 3 days? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Marrakech to Merzouga tour</a> has the camp and the gorges',
  'Flying home from Fes? The <a href="4-day-marrakech-to-fes-desert-tour-via-merzouga.html">4-day Marrakech to Fes tour</a> ends there',
  'Want quieter, wilder dunes? The <a href="4-day-marrakech-erg-chigaga-tour.html">4-day Erg Chigaga tour</a> goes off-road',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'mm4-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Should we choose 3 or 4 days?', 'Four if you can. The 3-day tour ends with about ten hours on the road back to Marrakech; here that drive is split over two days, you come back a different way by the Draa Valley and Telouet, and no day is longer than about six hours.'],
  ['Do we drive back the same road?', 'No. You go out by the Dades Valley and the Todra Gorge and come back across the Jebel Saghro and the Draa Valley, then by Aït Ben Haddou and Telouet over the High Atlas. The only road you see twice is the Tichka pass.'],
  ['What is the Telouet Kasbah?', 'The old palace of the Glaoui family, who ruled the south from here until the 1950s. From outside it looks like a ruin; inside are painted cedar ceilings, carved plaster and tiled halls, and usually very few visitors. There is a small fee at the door.'],
  ['Can we see Aït Ben Haddou properly?', 'Yes, that is why it comes on the last morning, with no rush: your driver-guide walks you up through the ksar to the granary at the top. Nobody needs to pay a separate guide, and the houses inside may only ask for a small tip if you go in.'],
  ['Can you drop us at Marrakech airport?', 'Yes. We reach Marrakech in the late afternoon, so an evening flight works; for an earlier flight we can leave Ouarzazate sooner and skip Telouet. Send us your flight time when you book.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury camp',
  '<a href="merzouga-quad-biking.html">Quad biking</a> or a <a href="merzouga-buggy-tour.html">buggy</a> in the dunes (extra cost)',
  'A night at Aït Ben Haddou instead of Ouarzazate',
  'A <a href="marrakech-medina-guided-tour.html">medina tour</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Drop-off at Marrakech airport',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="4-Day Desert Tour from Agadir to Merzouga & Marrakech" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%204-Day%20Desert%20Tour%20from%20Agadir.', 'information%20about%20the%204-Day%20Marrakech%20to%20Merzouga%20Desert%20Tour.', 'wa');
rep('<b>4-Day Agadir to Merzouga</b><span>Free', '<b>4-Day Marrakech to Merzouga</b><span>Free', 'mbar');

// ---------- similar ----------
const si = s.indexOf('<ul class="htours__list dt-others__list">\n'); const sj = s.indexOf('        <li class="htours__end">', si);
s = s.slice(0, si + '<ul class="htours__list dt-others__list">\n'.length) + JSON.parse(fs.readFileSync(SP + 'mm4-similar.json', 'utf8')) + s.slice(sj);

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Photographers'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tizi n’Tichka pass and Ouarzazate', 'Skoura and the Dades Valley (night 1)', 'Todra Gorge and Rissani', 'Sunset camel ride and desert camp (night 2)', 'Alnif, N’Kob and the Draa Valley', 'Ouarzazate (night 3)', 'Aït Ben Haddou, Telouet Kasbah and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
for (const bad of ['Agadir', 'Taroudant', 'Taliouine', 'Atlantic']) if (main.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
