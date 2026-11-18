// Build tours/2-day-marrakech-to-zagora-desert-tour.html (NEW 2026-11-18: Marrakech -> Aït Ben Haddou -> Draa Valley -> Zagora camp -> Ouarzazate -> Marrakech)
// Template = the finished 2-day Marrakech -> Merzouga page. Never re-run on the finished page.
// Research (2026-11-18): marrakech-desert-trips.com "Private 2-Day Marrakech to Zagora Desert Tour" (4.7 / 1,331 reviews) read in full:
//   pick-up ~07:30; D1 Tichka, Aït Ben Haddou, Ouarzazate lunch, Tizi n'Tinifift, Agdz, Draa Valley (Tamnougalt), Zagora, sunset camel
//   ~1 h, camp; D2 sunrise ride, Ouarzazate (Taourirt, Atlas Studios optional), Tichka, Marrakech 5-6 PM; ~360 km each way, 6-7 h;
//   "Zagora's desert is flat hamada with smaller dunes - quieter than Merzouga, and the reason it fits in two days". Tripadvisor forum
//   "Marrakech Two-day Desert Tours": camps by Zagora have "tiny tiny half meter maximum high dunes. If you are expecting a desert trip
//   you will be very disappointed". merzougaglamping.com: "Tinfou is not Erg Chebbi". GYG 2-day Zagora review: "The tents are
//   obviously cold at night". Camps (Tripadvisor, Zagora specialty lodging): Zagora Desert Camp #3 (147 reviews), Tinfou Desertcamp #4
//   (66), Zagora Luxury Desert Camp #6 (34). Road = ec4-d1 (Marrakech -> Zagora) out, reversed back. On file: "zagora desert" 210/month.
//   Owner (2026-11-18) asked for this tour ("2-day Zagora first").
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const tpl = root + 'tours/2-day-marrakech-to-merzouga-desert-tour.html';
const out = root + 'tours/2-day-marrakech-to-zagora-desert-tour.html';
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

const URL = 'https://moroccotourshub.com/tours/2-day-marrakech-to-zagora-desert-tour.html';
const NAME = '2-Day Marrakech to Zagora Desert Tour';
const TITLE = '2-Day Zagora Desert Tour from Marrakech | Private';
const DESC = 'Private 2-day desert tour from Marrakech: over the High Atlas to Aït Ben Haddou, down the palm groves of the Draa Valley to Zagora for a sunset camel ride and a night in a desert camp, and back by Ouarzazate.';
const HERO = 'desert-acacia-camels.jpg';

// ---------- head ----------
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="2-day Zagora desert tour, Zagora desert tour from Marrakech, Marrakech to Zagora, 2-day desert tour from Marrakech, Draa Valley, Zagora camp, private desert tour">', 'kw');
rep(/https:\/\/moroccotourshub\.com\/tours\/2-day-marrakech-to-merzouga-desert-tour\.html/g, URL, 'urls');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');

const DAYS = [
  { t: 'Marrakech → Tizi n’Tichka → Aït Ben Haddou → Draa Valley → Zagora',
    p: 'Pick-up at your riad or hotel around 07:30. Over the High Atlas by the Tizi n’Tichka pass, 2,260 m, to Aït Ben Haddou and a walk up through the ksar with your driver-guide. Lunch in Ouarzazate, then over the Tizi n’Tinifift pass to Agdz and down the Draa Valley, a hundred kilometres of date palms and earthen kasbahs. Near Zagora you ride a camel into the desert for sunset, then dinner, drums by the fire and a night in the camp.',
    meta: [['car', 'About 360 km, about 7 hours on the road'], ['camel', 'Camel ride about 1 hour'], ['bed', 'Night: desert camp near Zagora'], ['food', 'Dinner & breakfast']] },
  { t: 'Sunrise → Draa Valley → Ouarzazate → Tizi n’Tichka → Marrakech',
    p: 'Up early for the sunrise over the desert, breakfast in the camp and back to your driver. The Draa Valley again in the morning light, with time for photos and mint tea, then Ouarzazate and the Taourirt Kasbah, or the film studios if you prefer. Back over the High Atlas to Marrakech in the late afternoon, at your hotel, riad or the airport.',
    meta: [['car', 'About 360 km, about 7 hours on the road'], ['flag', 'Drop-off at your Marrakech hotel or the airport'], ['food', 'Breakfast']] },
];

// ---------- hero ----------
rep(/<img src="\/assets\/images\/hero-desert-caravan\.webp" alt="[^"]*" loading="eager"/, `<img src="/assets/images/${HERO}" alt="Camels resting by an acacia tree in the desert" loading="eager"`, 'hero img');
rep('<span>2-Day Desert Tour</span></nav>', '<span>2-Day Zagora Desert Tour</span></nav>', 'crumb');
rep('<h1>2-Day Marrakech to Merzouga Desert Tour<span class="script">The Sahara dunes in only two days</span></h1>', '<h1>2-Day Marrakech to Zagora Desert Tour<span class="script">The Draa Valley and a Night in the Desert</span></h1>', 'h1');

// ---------- overview ----------
between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
`          <p class="dt-lead">The shortest way from Marrakech to a night in the desert. Over the High Atlas to the ksar of Aït Ben Haddou, then down the Draa Valley, Morocco’s longest oasis, where kasbahs stand among a sea of date palms. Near Zagora a camel takes you into the desert for sunset, dinner by the fire and a sky full of stars.</p>
          <p class="dt-lead">Zagora is a desert of stone plains and low dunes, quiet and wide, and close enough for two days without a ten-hour drive. Your own car and driver-guide, stops when you want them, and no shop stops you didn’t ask for.</p>
`, 'overview');
rep(/(<dt>)Desert night(<\/dt><dd>)Camp in the dunes(<\/dd>)/, '$1Desert night$2Camp near Zagora$3', 'kf4');
between('<ul class="dt-ticks">', '<li class="dt-high__more">', [
  'The Tizi n’Tichka pass over the High Atlas',
  'Aït Ben Haddou on foot',
  'The palm groves of the Draa Valley',
  'Sunset camel ride near Zagora',
  'Dinner and drums by the fire',
  'A night under the desert stars',
  'Sunrise over the desert',
  'The Taourirt Kasbah in Ouarzazate',
].map(t => li(TICK, t)).join(''), 'highlights');

// ---------- gallery (no Erg Chebbi dune photos: Zagora has low dunes) ----------
between('<div class="dt-gal dt-gal--6">', '</div>\n        </section>', [
  ['ait-ben-haddou-kasbah-walk.jpg', 'Walking up through the ksar of Aït Ben Haddou', 1300, 866],
  ['tinghir-oasis.jpg', 'A palm oasis in the south of Morocco', 1500, 1000],
  ['desert-mesa.jpg', 'Open desert on the road south', 1600, 1066],
  ['camel-dune-ridge.jpg', 'Camels resting in the desert', 1170, 780],
  ['desert-camp-lanterns.jpg', 'Lanterns at a desert camp at night', 1600, 1067],
  ['ouarzazate-kasbah.jpg', 'Earthen kasbah towers in Ouarzazate', 1600, 1066],
].map(([f, a, w, h]) => `<figure><img src="/assets/images/${f}" alt="${a}"${w ? ` width="${w}" height="${h}"` : ''} loading="lazy"></figure>`).join(''), 'gallery');

// ---------- itinerary ----------
between('<ol class="dt-prog dt-prog--acc dt-prog--days">\n', '          </ol>', DAYS.map((d, i) =>
  `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">Day ${i + 1}</span><h3>${d.t}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${d.p}</p><ul class="dt-prog__meta">${d.meta.map(([ic, t]) => li(ICON[ic], t)).join('')}</ul></details></li>\n`).join(''), 'days');

// ---------- included ----------
between('<h3>Included</h3><ul>', '</ul></div>', [
  'Private A/C 4×4 or minivan (<a href="../index.html#fleet">see our fleet</a>)',
  'English-speaking driver-guide',
  'Pick-up and drop-off at your Marrakech riad or hotel',
  '1 night in a desert camp near Zagora',
  'Dinner and breakfast',
  'Camel ride at sunset',
  'Fuel',
].map(t => li(TICK, t)).join(''), 'included');
between('<h3>Not included</h3><ul>', '</ul></div>', ['Lunches and drinks', 'Entrance fees', 'Tips', 'Travel insurance'].map(t => li(CROSS, t)).join(''), 'notincl');
between('<h3>Good to know</h3><ul>', '</ul></div>', [
  'This is a suggestion: tell us your preferences',
  'Zagora has low dunes: the tall ones are in Merzouga',
  'Car-sick? Sit in front on the Tichka bends',
  'Small bag for the camp; luggage stays in the car',
  'Desert nights are cold: bring a warm layer',
  'Summer afternoons can pass 40 °C: we start early',
].map(t => li(INFO, t)).join(''), 'gtk');
between('<h3>Costs on the way</h3><ul class="dt-ticks">', '</ul></div>', [
  '<b>Lunches:</b> about €10–15 each; you choose where',
  '<b>Taourirt Kasbah, Ouarzazate:</b> small fee, if you go in',
  'All other sites are free',
  '<b>Tips:</b> up to you',
].map(t => li(COIN, t)).join(''), 'costs');
rep(/<span>Marrakech to the Sahara and back, about 1,120 km in 2 days\. <a href="[^"]*"/, '<span>Marrakech to Zagora and back, about 720 km in 2 days. <a href="https://www.google.com/maps/dir/?api=1&amp;origin=Marrakech,Morocco&amp;destination=Marrakech,Morocco&amp;waypoints=Ait+Ben+Haddou,Morocco%7COuarzazate,Morocco%7CAgdz,Morocco%7CZagora,Morocco&amp;travelmode=driving"', 'mapnote');

// ---------- accommodations: Zagora camps ----------
const A = (u, n) => `<a href="${u}" target="_blank" rel="noopener nofollow">${n}</a>`;
const camps = [A('https://www.tripadvisor.com/Hotel_Review-g304023-d8612265-Reviews-Zagora_Desert_Camp-Zagora_Souss_Massa.html', 'Zagora Desert Camp'), A('https://www.tripadvisor.com/Hotel_Review-g304023-d8633165-Reviews-Tinfou_Desertcamp-Zagora_Souss_Massa.html', 'Tinfou Desertcamp'), A('https://www.tripadvisor.com/Hotel_Review-g304023-d26435777-Reviews-Zagora_Luxury_Desert_Camp-Zagora_Souss_Massa.html', 'Zagora Luxury Desert Camp')];
rep(/(<p class="dt-lead">)Your night is in a desert camp in the Erg Chebbi dunes\.[^<]*(<\/p>)/, '$1Your night is in a desert camp near Zagora. Choose the comfort level that suits you:$2', 'acc intro');
between('<div class="dt-acc-wrap"><table class="dt-acc">', '</table></div>',
`
            <thead><tr><th scope="col">Options</th><th scope="col">Night near Zagora</th></tr></thead>
            <tbody>${['Standard', 'Midrange', 'Luxury'].map((n, i) => `<tr><th scope="row">${n}</th><td>${camps[i]}</td></tr>`).join('')}</tbody>
          `, 'acc');
between('<h3>Great for</h3><ul>', '</ul></div>', [
  'Travellers with only two days in Marrakech',
  'Families who prefer shorter road days',
  'Anyone who wants a quiet desert night',
].map(t => li(TICK, t)).join(''), 'great');
between('<h3>Think twice if</h3><ul>', '</ul></div>', [
  'Want the tall golden dunes? The <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga tour</a> reaches Erg Chebbi',
  'Only have one day? Our <a href="marrakech-agafay-desert-day-trip.html">Agafay day trip</a> is 40 minutes from Marrakech',
  'Want wild, empty dunes? The <a href="4-day-marrakech-erg-chigaga-tour.html">4-day Erg Chigaga tour</a> goes off-road',
].map(t => li(INFO, t)).join(''), 'think');

// ---------- reviews ----------
between('<div class="dt-revs">', '</div>\n        </section>', JSON.parse(fs.readFileSync(SP + 'zg2-reviews.json', 'utf8')), 'reviews');

// ---------- FAQ ----------
const FAQ = [
  ['Zagora or Merzouga: which desert should we choose?', 'Merzouga has the tall golden dunes of Erg Chebbi, but it is about 560 km from Marrakech, so it needs three days. Zagora is a stony desert with low dunes, quieter and closer, and it fits in two days. If the big dunes are what you dream of, choose Merzouga.'],
  ['How far is Zagora from Marrakech?', 'About 360 km, six to seven hours each way with stops for Aït Ben Haddou, lunch and photos in the Draa Valley. That is why we leave around 07:30 and reach the camp in time for sunset.'],
  ['Do we drive back the same road?', 'Yes, it is the only good road over the mountains. But the stops change: Aït Ben Haddou on the way out, the Draa in the morning light and the Taourirt Kasbah or the film studios in Ouarzazate on the way back.'],
  ['Is it good for children?', 'Yes. The road days are shorter than on the Merzouga tours, the camel ride can be shortened or replaced by a car to the camp, and we bring child seats on request. Bring warm clothes for the evening.'],
  ['What is the camp like?', 'Berber tents with beds and blankets, dinner and breakfast, music by the fire. Choose the level in the table above; tell us if you want a tent with its own bathroom and we confirm it before you pay the deposit.'],
];
between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
  FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
  `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a 20–30% deposit</b> by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card.</li></ol><p>Cancellation is free up to 24 hours before the tour.</p></div></details>\n`, 'faq');

// ---------- Make It Your Own ----------
between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
  'Upgrade to a luxury camp',
  'A sunrise camel ride before breakfast',
  'The Atlas film studios in Ouarzazate',
  'Tamegroute: potters and an old Koranic library',
  'A <a href="marrakech-medina-guided-tour.html">medina tour</a> or <a href="marrakech-hammam-experience.html">hammam</a> in Marrakech',
  'Child seats and special diets, on request',
].map(t => li(TICK, t)).join(''), 'custom');

// ---------- booking + banner ----------
rep('value="2-Day Marrakech to Merzouga Desert Tour" readonly', `value="${NAME}" readonly`, 'form trip');
rep('information%20about%20the%202-Day%20Marrakech%20to%20Merzouga%20Desert%20Tour.', 'information%20about%20the%202-Day%20Marrakech%20to%20Zagora%20Desert%20Tour.', 'wa');
rep('<b>2-Day Merzouga Desert Tour</b><span>Free', '<b>2-Day Zagora Desert Tour</b><span>Free', 'mbar');

// ---------- similar ----------
const si = s.indexOf('<ul class="htours__list dt-others__list">\n'); const sj = s.indexOf('        <li class="htours__end">', si);
s = s.slice(0, si + '<ul class="htours__list dt-others__list">\n'.length) + JSON.parse(fs.readFileSync(SP + 'zg2-similar.json', 'utf8')) + s.slice(sj);

// ---------- map placeholder ----------
const mi = s.indexOf('<figure class="rmap'); const mj = s.indexOf('</figure>', mi) + '</figure>'.length;
s = s.slice(0, mi) + '<div class="dt-map"></div>' + s.slice(mj);

// ---------- JSON-LD ----------
const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Friends'], provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
  itinerary: { '@type': 'ItemList', itemListElement: ['Tizi n’Tichka pass', 'Aït Ben Haddou', 'Draa Valley', 'Sunset camel ride and desert camp near Zagora', 'Ouarzazate and the Taourirt Kasbah', 'Back to Marrakech'].map((n, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: n } })) } };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before the tour.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');

const main = s.slice(s.indexOf('<main'), s.indexOf('</main>'));
for (const bad of ['Erg Chebbi camp', 'Dades', 'Todra', 'Draa Valley back', '06:00', 'sandboard']) if (main.includes(bad)) console.warn('LEFTOVER:', bad);
fs.writeFileSync(out, s);
console.log('written', s.length);
