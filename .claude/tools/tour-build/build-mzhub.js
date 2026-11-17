// Build the Merzouga hub: destinations/merzouga.html (URL kept, header/footer/head plumbing kept, <main> replaced). 2026-11-17.
// Sections: hero (lifted) + trust strip · sticky chip bar → the 6 activity cards · Combine Them (3 combos, happart cards) · Desert tours
// to Merzouga (4 tour cards) · Why book with us (6 happart cards) · FAQ (hfaq accordion) · add-to-tour strip · closing banner.
// Components reused from day-trips.html (trust--dt, tbar--dt + chip script, dtl-grid, dtl-combine, hcta) and the homepage (happart, hfaq).
// Never re-run on the finished page without checking (it rebuilds <main> from scratch).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const f = root + 'destinations/merzouga.html';
let s = fs.readFileSync(f, 'utf8');
const DT = fs.readFileSync(root + 'day-trips.html', 'utf8');
const HOME = fs.readFileSync(root + 'index.html', 'utf8');
eval(fs.readFileSync(SP + 'icons.part.js', 'utf8').replace(/^const /gm, 'var '));
function rep(a, b, label) {
  if (typeof a === 'string') { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.split(a).join(b); }
  else { if (!a.test(s)) throw new Error('missing: ' + label); s = s.replace(a, b); }
}
const TITLE = 'Things to Do in Merzouga: Camel Rides, Camps &amp; Quads';
const DESC = 'Private things to do in Merzouga and the Erg Chebbi dunes: a night in a desert camp, sunset camel rides, quad and buggy tours, a 4×4 day with nomads and Gnawa music, a medfouna cooking class, and desert tours.';
rep(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`, 'title');
rep(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`, 'desc');
rep(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="things to do in Merzouga, Merzouga activities, Merzouga desert camp, Merzouga camel ride, quad biking Merzouga, Merzouga tours, Erg Chebbi">', 'kw');
rep(/(<meta property="og:title" content=")[^"]*"/, `$1${TITLE}"`, 'ogt');
rep(/(<meta name="twitter:title" content=")[^"]*"/, `$1${TITLE}"`, 'twt');
rep(/(<meta property="og:description" content=")[^"]*"/, `$1${DESC}"`, 'ogd');
rep(/(<meta name="twitter:description" content=")[^"]*"/, `$1${DESC}"`, 'twd');
rep('<body class="site2">', '<body class="site2 page-swap">', 'body');

// pieces from day-trips.html
const trustIcons = DT.match(/<div class="trust__item">(<svg[\s\S]*?<\/svg>)/g).map(x => x.replace('<div class="trust__item">', ''));
const chipPin = (DT.match(/<li><a href="#dt-ait-ben-haddou">(<svg[\s\S]*?<\/svg>)/) || [])[1];
const chipStar = (DT.match(/<li><a href="#dt-balloon">(<svg[\s\S]*?<\/svg>)/) || [])[1];
const combIc = (DT.match(/<span class="dtl-combine__ic">(<svg[\s\S]*?<\/svg>)<\/span>/) || [])[1];
const waIc = (DT.match(/dtl-combine__wa"[^>]*>(<svg[\s\S]*?<\/svg>)/) || [])[1];
const hctaIcons = DT.match(/<div class="hcta__actions">([\s\S]*?)<\/div>/)[1].match(/<svg[\s\S]*?<\/svg>/g);
const happIcons = HOME.match(/<span class="happart-card__ic">(<svg[\s\S]*?<\/svg>)<\/span>/g).map(x => x.replace('<span class="happart-card__ic">', '').replace('</span>', ''));
if (!chipPin || !chipStar || !combIc || !waIc || happIcons.length < 6 || trustIcons.length < 4) throw new Error('icons');
let chipScript = DT.slice(DT.indexOf('<script>\n  (function(){\n    var bar=document.querySelector(\'.tbar--dt\')'));
chipScript = chipScript.slice(0, chipScript.indexOf('</script>') + 9);
chipScript = chipScript.slice(0, chipScript.indexOf("    /* search")) + '  })();\n  </script>';

// activity cards (from mz-cards.json), with ids for the chips
const C = JSON.parse(fs.readFileSync(SP + 'mz-cards.json', 'utf8'));
const ACT = [
  ['merzouga-desert-camp-camel-ride.html', 'mz-camp', 'Desert Camp', chipStar],
  ['merzouga-sunset-camel-ride.html', 'mz-sunset', 'Sunset Camel Ride', chipStar],
  ['merzouga-quad-biking.html', 'mz-quad', 'Quad Biking', chipStar],
  ['merzouga-buggy-tour.html', 'mz-buggy', 'Buggy Tour', chipStar],
  ['merzouga-4x4-desert-day-tour.html', 'mz-4x4', '4×4 Day Tour', chipStar],
  ['merzouga-medfouna-cooking-class.html', 'mz-cooking', 'Cooking Class', chipStar],
];
const cardLis = ACT.map(([href, id]) => C[href].trim().replace('<li>', `<li id="${id}">`).replace(`href="${href}"`, `href="../tours/${href}"`)).map(x => '          ' + x).join('\n');
const tourLis = JSON.parse(fs.readFileSync(SP + 'mzhub-tours.json', 'utf8')).split('</li>').filter(x => x.trim()).map(x => '          ' + (x.trim() + '</li>').replace(/href="(?!\.\.\/|https?:)([^"]+\.html)"/, 'href="../tours/$1"')).join('\n');

const happ = (items) => items.map(([h, p, i]) => `        <li><article class="happart-card">
          <span class="happart-card__ic">${happIcons[i]}</span>
          <h3>${h}</h3>
          <p>${p}</p>
        </article></li>`).join('\n');
const COMBOS = [
  ['Sunset &amp; Stars', 'The sunset camel ride into a night at a desert camp, sandboarding, a fire and the stars, then sunrise on the dunes.', 0],
  ['Dunes &amp; Adrenaline', 'A quad or buggy ride on the big dunes in the late afternoon, then camels to the camp for the night.', 1],
  ['Real Merzouga', 'The 4×4 day with nomad tea, Gnawa music and the desert lake, ending with a medfouna class at a family home.', 2],
];
const WHY = [
  ['Transparent Pricing', 'What we agree on is what you pay; nothing extra at the camp.', 0],
  ['Always Private', 'Your own guide, quad, buggy or 4×4, never shared with strangers.', 1],
  ['No Shop Stops', 'No fossil or carpet shops unless you ask for them.', 2],
  ['Camps in the Dunes', 'About an hour into Erg Chebbi, away from the road.', 3],
  ['Free Cancellation', 'Up to 24 hours before, with a small deposit to book.', 4],
  ['Local Team 24/7', 'English-speaking guides who live around the dunes.', 5],
];
const FAQ = [
  ['When is the best time to visit Merzouga?', 'March to May and September to November, with warm days and cool nights. Winter days are sunny but nights drop close to freezing; from June to August the dunes pass 40 °C, so activities move to early morning and evening.'],
  ['How do we get to Merzouga?', 'By car it is about 560 km from Marrakech and 470 km from Fes; CTM and Supratours buses arrive every day, and Errachidia airport is about 2 hours away. We can pick you up, or bring you on one of our desert tours.'],
  ['Where can we leave a rental car?', 'At our meeting point in Merzouga, free of charge, while you ride to the camp or go out on an activity. Bring a small bag for the night and leave the big luggage in the car.'],
  ['Can we combine several activities?', 'Yes, and it is the best way to see Merzouga: a quad or 4×4 by day, camels at sunset and a night in the camp. Tell us your dates and we plan the timings.'],
  ['What should we wear in the desert?', 'Light layers, a scarf against sun and blowing sand, sunglasses and closed shoes; a warm jacket for evenings from November to March. Cover shoulders and knees in the villages.'],
  ['How do I book and pay?', 'Send your request with the form on each activity page or on WhatsApp. Pay a small deposit to confirm; the rest is paid on the day, in cash or by card. Cancellation is free up to 24 hours before.'],
];

const MAIN = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/dune-screensaver.jpg" alt="Wind-shaped dunes of Erg Chebbi at Merzouga" width="1080" height="1348" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="../index.html">Home</a><span class="sep">›</span><a href="../destinations/index.html">Destinations</a><span class="sep">›</span><span>Merzouga</span></nav>
      <h1>Merzouga<span class="script">Things to do in the Erg Chebbi dunes</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">The golden dunes of Erg Chebbi rise up to 150 m. Ride camels at sunset, sleep in a desert camp, race the dunes on a quad or a buggy and meet the families who live around them, all private and booked with a local team.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why book in Merzouga with us"><div class="wrap"><div class="trust__grid">
    <div class="trust__item">${trustIcons[1]}<b>Always private</b><small>Just your group, never strangers.</small></div>
    <div class="trust__item">${trustIcons[0]}<b>Price agreed first</b><small>Nothing extra to pay at the camp.</small></div>
    <div class="trust__item">${trustIcons[2]}<b>Free parking</b><small>Leave your car at our meeting point.</small></div>
    <div class="trust__item">${trustIcons[3]}<b>Local team 24/7</b><small>English-speaking, on WhatsApp.</small></div>
  </div></div></section>
  <nav class="tbar tbar--dt" aria-label="Browse things to do in Merzouga"><div class="wrap tbar__bar">
    <ul class="tbar__list" id="list-mz">${ACT.map(([, id, name, ic]) => `<li><a href="#${id}">${ic}<span>${name}</span></a></li>`).join('')}</ul>
  </div></nav>
  <section class="section dtl-list" id="things-to-do" aria-labelledby="mz-todo">
    <div class="wrap">
      <div class="head-row"><div><h2 id="mz-todo">Things to Do in Merzouga</h2></div></div>
      <ul class="htours__list dtl-grid mz-grid3">
${cardLis}
      </ul>
    </div>
  </section>
  <section class="happart mz-combos" aria-labelledby="mz-comb">
    <div class="wrap happart__in">
      <header class="hrev__head happart__head">
        <h2 id="mz-comb">Combine Them</h2>
      </header>
      <ul class="happart__grid">
${happ(COMBOS)}
      </ul>
    </div>
  </section>
  <section class="section dtl-list" id="desert-tours" aria-labelledby="mz-tours">
    <div class="wrap">
      <div class="head-row"><div><h2 id="mz-tours">Desert Tours to Merzouga</h2></div></div>
      <ul class="htours__list dtl-grid">
${tourLis}
      </ul>
    </div>
  </section>
  <section class="happart" aria-labelledby="mz-why">
    <div class="wrap happart__in">
      <header class="hrev__head happart__head">
        <h2 id="mz-why">Why Book Merzouga With Us</h2>
      </header>
      <ul class="happart__grid">
${happ(WHY)}
      </ul>
    </div>
  </section>
  <section class="hfaq mz-faq" aria-labelledby="mz-faq-title">
    <div class="wrap hfaq__in">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="mz-faq-title">Merzouga FAQ</h2>
        </header>
        <div class="hfaq__list">
${FAQ.map(([q, a], i) => `          <details class="hfaq-item"${i ? '' : ' open'}>
            <summary><h3>${q}</h3><span class="hfaq-item__ic">${PLUS}</span></summary>
            <div class="hfaq-item__a"><p>${a}</p></div>
          </details>`).join('\n')}
        </div>
      </div>
    </div>
  </section>
  <section class="section dtl-combine" aria-labelledby="dtl-comb">
    <div class="wrap">
      <div class="dtl-combine__box">
        <span class="dtl-combine__ic">${combIc}</span>
        <div class="dtl-combine__txt"><h2 id="dtl-comb">Want to add Merzouga to a Morocco tour?</h2><p>We fit the activities you choose into your itinerary, with transfers and timings arranged.</p></div>
        <div class="dtl-combine__btns">
          <a class="hero-btn dtl-combine__wa" href="https://wa.me/212621460083?text=${encodeURIComponent("Hello! I'd like to add Merzouga activities to my Morocco tour.")}" target="_blank" rel="noopener">${waIc}Chat on WhatsApp</a>
          <a class="hero-btn hero-btn--gold" href="../contact.html">Request a Quote</a>
        </div>
      </div>
    </div>
  </section>
  <section class="hcta" aria-labelledby="hcta-title">
    <img class="hcta__bg" src="/assets/images/erg-chebbi-caravan-sunset.jpg" alt="Camel caravan crossing the Erg Chebbi dunes at sunset" width="1800" height="1200" loading="lazy">
    <div class="hcta__inner">
      <h2 id="hcta-title">Plan Your Days in Merzouga</h2>
      <p class="hcta__sub">Tell us your dates and what you love; we’ll put the right activities together.</p>
      <div class="hcta__actions">
        <a class="hero-btn hero-btn--gold" href="https://wa.me/212621460083?text=${encodeURIComponent("Hello! I'd like help planning my days in Merzouga.")}" target="_blank" rel="noopener">${hctaIcons[0]}Chat on WhatsApp</a>
        <a class="hero-btn hcta__quote" href="../contact.html">${hctaIcons[1] || ''}Request a Quote</a>
      </div>
    </div>
  </section>
${chipScript}
</main>`;
rep(/<main>[\s\S]*?<\/main>/, MAIN, 'main');

// JSON-LD: activities ItemList + FAQPage
const ldList = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Things to do in Merzouga', itemListElement: ACT.map(([href, , name], i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/tours/' + href, name: C[href].match(/<h3 class="htour__title">([^<]*)/)[1].replace(/&amp;/g, '&') })) };
const ldFaq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) };
s = s.replace(/<\/head>/, '<script type="application/ld+json">' + JSON.stringify(ldList) + '</script>\n<script type="application/ld+json">' + JSON.stringify(ldFaq) + '</script>\n</head>');
fs.writeFileSync(f, s);
console.log('written', s.length);
