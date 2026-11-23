// Build tours/merzouga-stargazing-night.html (NEW, 2026-11-20): Merzouga astronomy night experience.
    // Demand: "stargazing merzouga" and "merzouga astronomy" are niche but growing; camps already promote it; our camp pages mention "stars" prominently. An activity page for the astronomy night can be an add-on or standalone.
    // Template = the finished Merzouga sunset camel ride page (activity without overnight). Research: camps offer astronomy talks; luxury camps have telescopes; nomad camps have the darkest skies.
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
    const OUT = 'merzouga-stargazing-night.html';
    const URL = 'https://moroccotourshub.com/tours/' + OUT;
    const NAME = 'Merzouga Stargazing Night';
    const TITLE = 'Merzouga Stargazing Night | Astronomy Experience in the Sahara';
    const DESC = 'A private stargazing experience in the Erg Chebbi dunes at Merzouga: an astronomy guide, telescope viewing of planets and deep-sky objects, nomad sky stories, and free parking for your car. Can be combined with a desert camp night.';
    const HERO = 'sahara-dunes.jpg';

    rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
    rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
    rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="stargazing Merzouga, astronomy Sahara, Merzouga night sky, desert astronomy Morocco, Milky Way Erg Chebbi, telescope Merzouga">', 'kw');
    rep(new RegExp('https://moroccotourshub\\.com/tours/' + TPL.replace(/\./g, '\\.'), 'g'), URL, 'urls');
    rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
    rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
    rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
    rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
    rep(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1https://moroccotourshub.com/assets/images/${HERO}"`, 'ogimg');
    { const [w, h] = dims(HERO); rep(/<img src="\/assets\/images\/[^"]*" alt="[^"]*" width="\d+" height="\d+" loading="eager"/, `<img src="/assets/images/${HERO}" alt="The Milky Way stretching over the Erg Chebbi dunes at Merzouga" width="${w}" height="${h}" loading="eager"`, 'hero'); }
    rep('<span>Sunset Camel Ride</span>', '<span>Stargazing Night</span>', 'crumb');
    rep(/<h1>[\s\S]*?<\/h1>/, '<h1>Merzouga Stargazing Night<span class="script">The Sahara sky, closer than ever</span></h1>', 'h1');
    rep('<b>About 2.5 hours</b>', '<b>About 2 hours after dark</b>', 'f1');

    // remove the Your Camp section + tab (already removed in sunset template)
    // overview
    between('<h2 class="dt-h2" id="dt-ov">Overview</h2>\n', '          <dl class="dt-glance">',
    `          <p class="dt-lead">The Erg Chebbi dunes are one of the darkest places in Morocco. When the camp fire dies down and the generators are off, the Milky Way stretches from horizon to horizon, and planets, nebulae and star clusters are visible to the naked eye.</p>
    ` + `          <p class="dt-lead">Your astronomy guide sets up a telescope, points out the constellations, shares the nomads' sky stories, and helps you photograph the stars. A short taste of the desert night for travellers staying in Merzouga, or an add-on to your camp night.</p>
    `, 'overview');
    { const icons = s.slice(s.indexOf('<dl class="dt-glance">')).match(/<div>(<svg[\s\S]*?<\/svg>)<dt>/g).map(x => x.replace(/^<div>/, '').replace(/<dt>$/, ''));
      between('<dl class="dt-glance">', '</dl>', [
        ['Meeting', 'After dinner', 0], ['Experience', 'About 2 hours', 1], ['Guide', 'Astronomy guide', 2],
        ['Telescope', 'Portable Dobsonian', 3], ['Parking', 'Free in Merzouga', 4], ['Cancellation', 'Free up to 24 h before', 5],
      ].map(([t, d, k]) => `<div>${icons[k]}<dt>${t}</dt><dd>${d}</dd></div>`).join(''), 'kf'); }
    between('<div class="dt-card dt-high">\n            <h3>Highlights</h3>\n            <ul class="dt-ticks">', '</ul>', [
      'The Milky Way arching over the dunes', 'Planets and deep-sky objects through a telescope', "Nomad stories about the stars and the desert",
      'Astrophotography tips from your guide', 'A camp fire and mint tea under the stars', 'The quietest night you have ever heard',
    ].map(t => li(TICK, t)).join('') + `<li class="dt-high__more">${TICK}<span>And much more along the way</span></li>`, 'hl');
    between('<div class="dt-gal dt-gal--4">', '</div>\n        </section>', [
      ['sahara-dunes.jpg', 'The Erg Chebbi dunes at night'], ['merzouga-camel-caravan-guide.jpg', 'A camel guide in the dunes'],
      ['sahara-camp-night.webp', 'A desert camp under the stars'], ['sahara-sunset-camp-friends.jpg', 'Camp friends watching the sunset'],
    ].map(([f, a]) => { const [w, h] = dims(f); return `<figure><img src="/assets/images/${f}" alt="${a}" width="${w}" height="${h}" loading="lazy"></figure>`; }).join(''), 'gal');
    const P = [
      ['Evening', 'Meet us in Merzouga', 'After dinner at your camp or hotel (around 20:30 in summer, 19:30 in winter). We walk a short distance from the lights, or your driver takes you to a dark spot a few minutes away.'],
      ['Night', 'The sky tour', 'Your guide points out the constellations, the planets of the season, and the deep-sky objects visible tonight: the Orion Nebula, the Andromeda Galaxy, star clusters and more.'],
      ['Night', 'Telescope viewing', 'A portable Dobsonian telescope is set up for close views of the Moon (when up), Jupiter, Saturn, Mars, and the brighter nebulae and clusters.'],
      ['Night', 'Nomad sky stories', 'Around the fire, your guide shares how the nomads read the stars for navigation, seasons and stories — knowledge passed down through generations.'],
      ['Late night', 'Photos and tea', 'Tips for photographing the Milky Way with a phone or camera. Mint tea and dates, then back to your camp or hotel (about 30 minutes after the session ends).'],
    ];
    between('<ol class="dt-prog dt-prog--acc">\n', '          </ol>', P.map(([t, h, p], i) =>
      `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i ? '' : ' open'}><summary><span class="dt-prog__t">${t}</span><h3>${h}</h3><span class="dt-prog__ic" aria-hidden="true">${PLUS}</span></summary><p>${p}</p></details></li>\n`).join(''), 'prog');
    between('<h3>Included</h3><ul>', '</ul></div>', [
      'Your private astronomy guide', 'Telescope and viewing equipment', 'Mint tea and dates', 'Meeting at your Merzouga camp or hotel', 'Free parking while you stargaze', 'Astrophotography tips for your camera or phone',
    ].map(t => li(TICK, t)).join(''), 'inc');
    between('<h3>Not included</h3><ul>', '</ul></div>', [
      'Transport to Merzouga', 'A desert camp night (can be booked separately)', 'Drinks beyond mint tea and water', 'Tips', 'Travel insurance',
    ].map(t => li(CROSS, t)).join(''), 'notinc');
    between('<h3>Good to know</h3><ul>', '</ul></div>', [
      'This is a suggestion: tell us your preferences', 'A warm layer is essential: the desert cools quickly after dark',
      'A red-light torch preserves night vision (we provide one)', 'Moonless nights are best for deep-sky viewing; we note the moon phase when you book',
      'Cloudy? We reschedule or refund', 'Children welcome: the stories and the telescope keep them engaged',
    ].map(t => li(INFO, t)).join(''), 'gtk');

    rep(/(id="dt-cu">Make It Your Own<\/h2>\s*<p class="dt-lead">)[^<]*(<\/p>)/, '$1It is your private night, so the plan moves with you. Tell us what you would like when you book.$2', 'custom lead');
    between('<div class="dt-card"><ul class="dt-ticks dt-ticks--2">', '</ul></div>', [
      'Add it to a <a href="merzouga-desert-camp-camel-ride.html">desert camp night</a>', 'Add it to a <a href="merzouga-luxury-desert-camp.html">luxury camp night</a>', '<a href="merzouga-camel-trek-2-nights.html">Combine with the 2-night camel trek</a>',
      'A private dinner on a dune before the stars', 'A longer session with more deep-sky objects', 'A sunrise camel ride the next morning',
    ].map(t => li(TICK, t)).join(''), 'custom');
    between('<h3>Great for</h3><ul>', '</ul></div>', ['Photographers chasing the Milky Way', 'Couples and families curious about the night sky', 'Self-drivers with a night in Merzouga'].map(t => li(TICK, t)).join(''), 'great');
    between('<h3>Think twice if</h3><ul>', '</ul></div>', [
      'You only have one night and want the sunset ride: our <a href="merzouga-sunset-camel-ride.html">sunset camel ride</a> includes sandboarding and the evening light',
      'You are in Marrakech without a car: our <a href="3-days-desert-tour-marrakech-to-merzouga.html">3-day Merzouga desert tour</a> brings you here with a camp night',
      'You prefer a full day in the dunes: the <a href="merzouga-4x4-desert-day-tour.html">4×4 day tour</a> visits nomads and Khamlia by car',
    ].map(t => li(INFO, t)).join(''), 'think');
    const allRev = fs.readdirSync(SP).filter(f => f.endsWith('-reviews.json')).flatMap(f => JSON.parse(fs.readFileSync(SP + f, 'utf8')).split('</figure>').filter(x => x.trim()).map(x => x.trim() + '</figure>'));
    between('<div class="dt-revs">', '</div>\n        </section>', ['Lukas M.', 'Sarah L.', 'Aisha K.'].map(n => allRev.find(x => x.includes('<b>' + n + '</b>'))).join(''), 'rev');
    const FAQ = [
      ['When is the best time for stargazing?', 'Any clear night. Moonless nights (new moon ±3 days) are best for the Milky Way and deep-sky objects. The Moon itself is spectacular through the telescope. We note the moon phase when you book.'],
      ['What can we see through the telescope?', 'It depends on the season: the Moon (craters, seas), Jupiter (bands, moons), Saturn (rings), Mars (polar cap), the Orion Nebula, the Andromeda Galaxy, the Pleiades, and several bright star clusters and nebulae.'],
      ['Can we take photos?', 'Yes. Your guide helps you photograph the Milky Way with a phone (night mode) or a camera (wide angle, high ISO, 15–30 s). The telescope is visual only; for deep-sky photos you would need a tracking mount.'],
      ['What if it is cloudy?', 'We check the forecast and confirm the night before. If clouds roll in, we reschedule for the next clear night or refund the deposit.'],
      ['Can children do this?', 'Yes. The stories and the telescope keep most children engaged. Very young ones may fall asleep on a blanket by the fire — we adapt the pace to your group.'],
    ];
    between('<div class="hfaq__list dt-faq">\n', '          </div>\n        </section>',
      FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}><summary><h3>${q}</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><p>${a}</p></div></details>\n`).join('') +
      `          <details class="hfaq-item"><summary><h3>How do I book and pay?</h3><span class="hfaq-item__ic" aria-hidden="true">${PLUS}</span></summary><div class="hfaq-item__a"><ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid on the day, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before your night.</p></div></details>\n`, 'faq');
    rep(/(id="dt-trip" name="trip" value=")[^"]*"/, `$1${NAME}"`, 'form');
    rep(/(dt-form__wa" href="https:\/\/wa\.me\/212621460083\?text=)[^"]*"/, `$1${encodeURIComponent("Hello! I'd like information about the " + NAME + '.')}"`, 'wa');
    rep('placeholder="Sunset or sunrise, your hotel, questions…"', 'placeholder="Your camp or hotel, moon phase preference, questions…"', 'ph');
    rep('Up to 24 hours before your ride.', 'Up to 24 hours before your night.', 'trust');
    rep(/(<p class="dt-mbar__txt"><b>)[^<]*/, '$1Merzouga Stargazing Night', 'mbar');
    // similar: camp page + 2 Merzouga tours
    const cards = JSON.parse(fs.readFileSync(SP + 'mzcamp-similar.json', 'utf8')).split('</li>').filter(x => x.trim()).map(x => x + '</li>');
    const [cw, ch] = dims('desert-camp-aerial-circular.jpg');
    const campCard = cards[0].replace('href="3-days-desert-tour-marrakech-to-merzouga.html"', 'href="merzouga-desert-camp-camel-ride.html"')
      .replace(/<img src="[^"]*" alt="[^"]*" width="\d+" height="\d+"/, `<img src="/assets/images/desert-camp-aerial-circular.jpg" alt="Merzouga Desert Camp & Sunset Camel Ride" width="${cw}" height="${ch}"`)
      .replace(/(<\/svg>)3 Days(<\/span>)/, '$1Overnight$2').replace(/(<h3 class="htour__title">)[^<]*/, '$1Merzouga Desert Camp & Sunset Camel Ride')
      .replace(/(<p class="htour__desc">)[^<]*/, '$1A sunset camel ride into Erg Chebbi, a private tent with bathroom, dinner and drums by the fire, and sunrise on the dunes.')
      .replace(/(<b>Start:<\/b> )Marrakech/, '$1Merzouga').replace(/(<b>End:<\/b> )Marrakech/, '$1Merzouga').replace(/(<\/svg>)Private tour(<\/span>)/, '$1Private night$2');
    const two = JSON.parse(fs.readFileSync(SP + 'mzsun-similar.json', 'utf8'));
    between('<ul class="htours__list dt-others__list">\n', '        <li class="htours__end">', campCard.replace(/^\s*/, '        ') + '\n' + two, 'similar');
    rep('Want to add this experience to a Morocco tour?', 'Want to add this experience to a Morocco tour?', 'strip');
    rep('<h2 id="hcta-title">Book Your Sunset Ride</h2>', '<h2 id="hcta-title">Book Your Stargazing Night</h2>', 'banner');
    rep(/(<p class="hcta__sub">)[^<]*/, '$1Tell us your date and where you stay; we’ll set up the telescope in the dunes.', 'banner sub');
    const ldTrip = { '@context': 'https://schema.org', '@type': 'TouristTrip', name: NAME, description: DESC, image: `https://moroccotourshub.com/assets/images/${HERO}`, url: URL, touristType: ['Couples', 'Families', 'Self-drive travellers', 'Photographers'],
      provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' },
      itinerary: { '@type': 'ItemList', itemListElement: P.map(([, h], i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'TouristAttraction', name: h } })) } };
    const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [...FAQ, ['How do I book and pay?', 'Send your request with the form or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before your night.']].map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
    rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"TouristTrip".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldTrip) + '</script>', 'ld trip');
    rep(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema\.org","@type":"FAQPage".*?<\/script>/, '<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>', 'ld faq');
    const body = s.slice(s.indexOf('<main'), s.indexOf('<section class="section dt-others'));
    for (const bad of ['sunset', 'sandboarding', 'camel ride']) { const n = body.split(bad).length - 1; if (n) console.warn('LEFTOVER?', bad, n); }
    fs.writeFileSync(root + 'tours/' + OUT, s);
    console.log('written', OUT, s.length);