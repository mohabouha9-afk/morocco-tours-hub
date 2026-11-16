// Build tours/3-day-desert-tour-from-agadir.html (Agadir -> Aït Ben Haddou -> Merzouga -> Marrakech). Template = the approved 4-day Marrakech->Fes page. Never re-run on the finished page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/4-day-marrakech-to-fes-desert-tour-via-merzouga.html';
const out = root + 'tours/3-day-desert-tour-from-agadir.html';
// (a copy of the old page used to be kept as er3-before.html; old pages are in git history)
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
const URL = 'https://moroccotourshub.com/tours/3-day-desert-tour-from-agadir.html';
const NAME = '3-Day Desert Tour from Agadir to Merzouga & Marrakech';
const TITLE = '3-Day Agadir to Merzouga Desert Tour | Ends in Marrakech';
const DESC = 'Private 3-day Sahara tour from Agadir: Taroudant, the saffron country of Taliouine and a night at Aït Ben Haddou, then the gorges to the Merzouga dunes, a sunset camel ride and a camp night, ending in Marrakech.';
const HERO = 'merzouga-camel-caravan.jpg';

rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Agadir desert tour, Agadir to Merzouga, 3-day desert tour from Agadir, Sahara tour from Agadir, Agadir to Marrakech, private Sahara tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/4-day-marrakech-to-fes-desert-tour-via-merzouga\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Agadir → Taroudant → Taliouine → Ouarzazate → Aït Ben Haddou',
    p: 'Pick-up at your hotel in Agadir around 07:30. Inland through the argan country of the Souss Valley to Taroudant, where you walk a little along its red ramparts, then up into the Anti-Atlas to Taliouine, Morocco’s saffron country, with its purple flowers in late October and November. Past Ouarzazate to Aït Ben Haddou, where you sleep beside the ksar and watch it turn red at sunset.',
    meta: [['car', 'About 420 km, 7 to 8 hours on the road'], ['bed', 'Night: Aït Ben Haddou'], ['food', 'Dinner & breakfast']] },
  { t: 'Aït Ben Haddou → Skoura → Dades → Todra Gorge → Merzouga',
    p: 'An early walk up through the ksar before the day groups arrive, then east on the Road of a Thousand Kasbahs: the palm grove of Skoura, the Valley of Roses and the red Dades Valley. A short walk between the high walls of the Todra Gorge, then Tinghir and Erfoud to the Erg Chebbi dunes. Leave your big bags in the car and ride a camel into the dunes for sunset; dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 425 km, 7 to 8 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp'], ['food', 'Breakfast & dinner']] },
  { t: 'Merzouga → Rissani → Draa Valley → Tizi n’Tichka → Marrakech',
    p: 'Sunrise and sandboarding on the dunes, breakfast, and back by camel or 4×4. Through Rissani, the old caravan town, and west by Alnif and N’Kob into the long palm groves of the Draa Valley, then Ouarzazate and over the High Atlas by the Tizi n’Tichka pass, 2,260 m. In Marrakech in the evening, at your hotel or riad.',
    meta: [['car', 'About 560 km, 9 to 10 hours on the road'], ['flag', 'Drop-off at your Marrakech hotel or riad'], ['food', 'Breakfast']] },
];

rep(/<img src="\/assets\/images\/merzouga-camel-ride-dunes\.jpg" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="A camel caravan crossing the Erg Chebbi dunes" loading="eager"`, 'hero img');
rep('<span>4-Day Marrakech to Fes</span></nav>', '<span>3-Day Agadir to Merzouga &amp; Marrakech</span></nav>', 'crumb');
rep(/(aria-hidden="true"><path d="M12 21c4-4\.5 7-7\.6 7-11a7 7 0 10-14 0c0 3\.4 3 6\.5 7 11z"\/><circle cx="12" cy="10" r="2\.5"\/><\/svg>)Marrakech<\/span>/, '$1Agadir</span>', 'chip');
rep('<h1>4-Day Marrakech to Fes Desert Tour<span class="script">With a Full Day in the Sahara</span></h1>', '<h1>3-Day Agadir to Merzouga Desert Tour<span class="script">From the Atlantic to the Sahara</span></h1>', 'h1');
rep('<b>4 days / 3 nights</b>', '<b>3 days / 2 nights</b>', 'dur');
rep('<small>Route</small><b>Marrakech → Fes</b>', '<small>Route</small><b>Agadir → Marrakech</b>', 'hero route');

between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">Swap the beach for the Sahara. From Agadir the road climbs through the argan groves and the saffron villages of the Anti-Atlas to Aït Ben Haddou, where you sleep beside the ksar, then follows the kasbahs and gorges of the south to the great dunes of Erg Chebbi.</p>
          <p class="dt-lead">A camel ride into the dunes at sunset, a night in a desert camp and sunrise on the sand, then over the High Atlas to Marrakech. Your own car and driver-guide for three days, stops whenever you want them, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep('<dd>Marrakech → Fes</dd>', '<dd>Agadir → Marrakech</dd>', 'kf1');
rep('<dt>Desert day</dt><dd>A full day in Merzouga</dd>', '<dt>Desert night</dt><dd>Camp in the dunes</dd>', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The red ramparts of Taroudant',
  'Taliouine, Morocco’s saffron country',
  'Sunset over the ksar of Aït Ben Haddou',
  'Skoura palm grove and the Valley of Roses',
  'A walk in the Todra Gorge',
  'Sunset camel ride and a night in the dunes',
  'Sunrise and sandboarding on Erg Chebbi',
  'The Draa Valley and the Tizi n’Tichka pass',
].map(t => li(TICK, t)).join(''), 'highlights');

between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-kasbah-walk.jpg', 'Walking up through the ksar of Aït Ben Haddou', 1300, 866],
  ['dades-valley-red-green.jpg', 'Red cliffs and green fields in the Dades Valley', 1300, 867],
  ['todra-gorge-walk.jpg', 'Walking between the walls of the Todra Gorge', 1600, 1066],
  ['tinghir-oasis-kasbahs.jpg', 'Kasbahs above the Tinghir palm grove', 1300, 867],
  ['merzouga-camel-caravan-guide.jpg', 'A guide leading camels into the Erg Chebbi dunes', 1300, 866],
  ['desert-camp-dunes.jpg', 'A desert camp in the Erg Chebbi dunes', 1600, 900],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`).join(''), 'gallery');

between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up at your hotel in Agadir',
  'Drop-off at your hotel or riad in Marrakech',
  '1 night at Aït Ben Haddou',
  '1 night in a desert camp',
  '2 dinners and 2 breakfasts',
  'Camel ride and sandboarding',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Long road days: we stop whenever you want',
  'Small bag for the camp; luggage stays in the car',
  'Car-sick? Sit in front on the Tichka bends',
  'Saffron flowers late October to November',
  'Bring cash: few card machines on the road',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Free:</b> the Taroudant ramparts, Aït Ben Haddou and the Todra Gorge',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to Fes by the Sahara, about 1,100 km in 4 days\. <a href="[^"]*"/, '<span>Agadir to Marrakech by the Sahara, about 1,400 km in 3 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Agadir,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Taroudant,Morocco%7CTaliouine,Morocco%7CAit+Ben+Haddou,Morocco%7CTodra+Gorge,Morocco%7CMerzouga,Morocco%7CAgdz,Morocco&amp;travelmode=driving"', 'mapnote');

const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const camp = [A('https://www.booking.com/hotel/ma/well-equiped-desert-camp.html', 'Erg Chebbi Sahara Camp'), A('https://www.booking.com/hotel/ma/warru-desert-camp.html', 'Sandrock Luxury Camp'), A('https://www.tripadvisor.com/Hotel_Review-g946425-d6000567-Reviews-Desert_Luxury_Camp-Erg_Chebbi_Meknes_Tafilalet_Region.html', 'Desert Luxury Camp')];
const abh = [A('https://www.tripadvisor.com/Hotel_Review-g304011-d2073042-Reviews-Kasbah_Tebi-Ait_Ben_Haddou_Souss_Massa.html', 'Kasbah Tebi'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d4288838-Reviews-Riad_Caravane-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Caravane'), A('https://www.tripadvisor.com/Hotel_Review-g304011-d1237228-Reviews-Riad_Ksar_Ighnda-Ait_Ben_Haddou_Souss_Massa.html', 'Riad Ksar Ighnda')];
between('<div class="dt-acc-wrap"><table class="dt-acc dt-acc--4">', '</table></div>',
`
            <thead><tr><th scope="col">Options</th><th scope="col">Night 1: Aït Ben Haddou</th><th scope="col">Night 2: Desert camp</th></tr></thead>
            <tbody>${['Standard', 'Midrange', 'Luxury'].map((lv, i) => `<tr><th scope="row">${lv}</th><td>${abh[i]}</td><td>${camp[i]}</td></tr>`).join('')}</tbody>
          `, 'acc');
rep('<table class="dt-acc dt-acc--4">', '<table class="dt-acc">', 'acc class');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Holidaymakers in Agadir who want the real Sahara',
  'Travellers moving on from the coast to Marrakech',
  'Anyone with 3 days who wants the big Merzouga dunes',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'You prefer shorter road days: the <a href="4-day-desert-tour-agadir-merzouga-marrakech.html">4-day Agadir to Merzouga tour</a> sleeps in Ouarzazate, the camp and the Dades Valley, so the last day to Marrakech is about 360 km',
  'You want a full day in the dunes and fly home from Errachidia: the <a href="5-day-desert-tour-agadir-merzouga-errachidia-airport.html">5-day Agadir to Merzouga tour</a> adds a day around Merzouga and ends at Errachidia airport',
  'You can start from Marrakech, 3 hours from Agadir: the <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Marrakech to Merzouga tour</a> is a round trip with nights in the Dades Valley and the camp',
].map(t => li(INFO, t)).join(''), 'think');

between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'ag3-reviews.json', 'utf8')), 'reviews');

const FAQ = [
  ['How long are the drives from Agadir?', 'About 420 km on day 1 and 425 km on day 2, 7 to 8 hours each with stops, then about 560 km to Marrakech on day 3. Merzouga is around 10 hours from Agadir by road, so a 3-day tour always means long road days; the 4-day tour splits them.'],
  ['Why does the tour end in Marrakech, not back in Agadir?', 'Merzouga to Agadir is more than 700 km, too far for one day. Marrakech is 560 km away, and from there Agadir is about 3 hours by motorway. We can drive you back the next day, or plan a 4-day trip that returns to the coast.'],
  ['Why sleep at Aït Ben Haddou?', 'It is the right halfway point and the best place to be at sunset: the day groups from Marrakech leave in the afternoon, so you see the ksar turn red and walk it early next morning while the lanes are quiet.'],
  ['Will we reach the dunes in time for sunset?', 'Yes. We leave Aït Ben Haddou early on day 2 and keep the stops short, so you reach Merzouga in the afternoon for the camel ride at sunset. In winter, when the days are short, we leave a little earlier.'],
  ['Can you pick us up in Taghazout or Tamraght?', 'Yes, we pick up anywhere around Agadir, including Taghazout, Tamraght and the hotels on the bay. Send us your hotel name when you book and we confirm the time on WhatsApp the day before.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Drive back to Agadir from Marrakech the next day',
  'Drop-off at Marrakech airport instead',
  'Add a night in the Dades Valley',
  'Visit a saffron cooperative in Taliouine',
  'Quad biking or a longer camel ride (extra cost)',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

rep('value="4-Day Marrakech to Fes Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%204-Day%20Marrakech%20to%20Fes%20Desert%20Tour.', 'information%20about%20the%203-Day%20Desert%20Tour%20from%20Agadir.', 'wa');
rep('<b>4-Day Marrakech to Fes</b><span>Free cancellation', '<b>3-Day Agadir to Merzouga</b><span>Free cancellation', 'mbar');
rep('<p class="hcta__sub">The 4-day route is a starting point', '<p class="hcta__sub">The 3-day route is a starting point', 'cta');

between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', JSON.parse(fs.readFileSync(SP + 'ag3-similar.json', 'utf8')), 'similar');

const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends', 'Holidaymakers in Agadir'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Agadir hotel pick-up', 'Taroudant ramparts', 'Taliouine saffron country', 'Aït Ben Haddou (night 1)', 'Skoura, Valley of Roses and Dades Valley', 'Todra Gorge', 'Sunset camel ride and Merzouga desert camp (night 2)', 'Rissani and the Draa Valley', 'Tizi n’Tichka pass and Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

for (const bad of ['Khamlia', 'Merzouga hotel', '4-day route', 'Night 3', 'Ifrane']) if (s.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);

