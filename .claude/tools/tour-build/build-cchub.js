// Builds destinations/chefchaouen.html (rebuilt destination page) from the finished Merzouga hub shell, same layout as build-mkhub.js.
// Cards taken from the old destinations/chefchaouen.html; facts only from our own pages
// (see .claude/research/chefchaouen-destination-research.md).
// Run from the project root: node .claude/tools/tour-build/build-cchub.js  (do NOT re-run: it overwrites its own card source)
const fs = require('fs');
const mz = fs.readFileSync('destinations/merzouga.html', 'utf8');
const old = fs.readFileSync('destinations/chefchaouen.html', 'utf8');

const head0 = mz.slice(0, mz.indexOf('<main>'));
const foot = mz.slice(mz.indexOf('</main>'));

// ---- cards from the old Fes page
function card(slug, newId) {
  const m = old.match(new RegExp('<article class="htour htour--dt"><a class="htour__link" href="\\.\\./tours/' + slug + '">[\\s\\S]*?</a></article>'));
  if (!m) throw new Error('card ' + slug);
  return '<li id="' + newId + '">' + m[0] + '</li>';
}
const IC = {
  spark: '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 18h18M6 18a6 6 0 0112 0"/><path d="M12 6v2M5.6 9.6l1.4 1.4M18.4 9.6L17 11"/></svg>',
  group: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5"/><path d="M16 5.5a3 3 0 010 5.8M17 20c0-2.6-.9-4.2-2.5-5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6L12 3z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.4"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  balloon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 00-6 6c0 3.5 3.5 6.5 5 8h2c1.5-1.5 5-4.5 5-8a6 6 0 00-6-6z"/><rect x="10" y="19" width="4" height="2.5" rx=".5"/><path d="M11 17l-.3 2M13 17l.3 2"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 16v-4l2-5h14l2 5v4H3z"/><path d="M3 12h18"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/></svg>',
  gate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 21V10a8 8 0 0116 0v11"/><path d="M8 21v-9a4 4 0 018 0v9M2 21h20"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4z"/><path d="M9 4v14M15 6v14"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M14.2 9.6c-.4-.6-1.2-1-2.2-1-1.3 0-2.2.7-2.2 1.6 0 2.2 4.4 1.2 4.4 3.4 0 .9-.9 1.6-2.2 1.6-1 0-1.8-.4-2.2-1M12 7v1.6M12 15.4V17"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13v-1a7 7 0 0114 0v1M5 13a2 2 0 00-2 2v1a2 2 0 002 2h1v-5H5zm14 0a2 2 0 012 2v1a2 2 0 01-2 2h-1v-5h1zM12 21h3a2 2 0 002-2v-1"/></svg>',
};
const tIc = s => s.replace('stroke-width="1.6"', 'stroke-width="1.7"');
const plus = '<span class="hfaq-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>';

function happart(id, title, items, extraClass) {
  return `  <section class="happart${extraClass ? ' ' + extraClass : ''}" aria-labelledby="${id}">
    <div class="wrap happart__in">
      <header class="hrev__head happart__head">
        <h2 id="${id}">${title}</h2>
      </header>
      <ul class="happart__grid">
${items.map(([ic, h, p]) => `        <li><article class="happart-card">
          <span class="happart-card__ic">${IC[ic]}</span>
          <h3>${h}</h3>
          <p>${p}</p>
        </article></li>`).join('\n')}
      </ul>
    </div>
  </section>
`;
}



const tripCards = [
  ['tangier-to-chefchaouen-day-trip.html', 'cc-tangier'], ['fes-to-chefchaouen-day-trip.html', 'cc-fes'],
].map(([a, b]) => card(a, b)).join('\n');

// ---- FAQ (HTML answers may hold links; JSON-LD gets the plain text)
const faq = [
  ['Is a day trip enough, or should we stay a night?', 'A day trip gives you about four hours in town: enough for the main lanes, the square, the Kasbah and lunch. If you can, stay one night: the day visitors leave in the afternoon, you see the sunset from the Spanish Mosque and walk the empty blue lanes the next morning. Two nights leave time for the Akchour waterfalls.'],
  ['Is it better to come from Tangier or from Fes?', 'From Tangier the drive is only about 2 to 2.5 hours, so the <a class="sdh-link" href="../tours/tangier-to-chefchaouen-day-trip.html">Tangier day trip</a> is the easier day. From Fes it is about 3.5 hours each way and an 11-hour day; if you are based in Fes, a night in Chefchaouen on the <a class="sdh-link" href="../tours/3-day-fes-chefchaouen-volubilis-tour.html">3-day tour</a> is more relaxed.'],
  ['Is Chefchaouen safe?', 'Yes, it is one of the calmest towns in Morocco. Expect shop owners to invite you in, and young men to offer you hashish from time to time: it is illegal in Morocco, so a polite “no, thank you” and walking on is enough. With your guide, nobody insists.'],
  ['When is the best time to visit Chefchaouen?', 'Spring (March to May) and autumn (September to November), with mild days for the steep lanes and the green hills around the town. Summer is cooler than the plains but busy, especially in August. Winter is cold and often wet, sometimes with snow on the peaks, but very quiet.'],
  ['Can we see the Akchour waterfalls?', 'Yes. Akchour is about half an hour into the Rif from Chefchaouen, with a river path to turquoise pools and waterfalls; it is best from May to October. Our <a class="sdh-link" href="../tours/4-day-fes-to-tangier-via-chefchaouen.html">4-day Fes to Tangier tour</a> gives it a full day, and either day trip can swap part of the medina time for it.'],
  ['How do I book and pay?', 'Send your request with the form on each tour page or on WhatsApp. Pay a 20–30% deposit by bank transfer to confirm; the rest is paid on arrival in cash (EUR, USD or MAD) or by card. Cancellation is free up to 24 hours before.'],
];
const strip = s => s.replace(/<[^>]+>/g, '');
const faqHtml = faq.map(([q, a], i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q}</h3>${plus}</summary>
            <div class="hfaq-item__a"><p>${a}</p></div>
          </details>`).join('\n');
const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) };

const items = [
  ['tours/tangier-to-chefchaouen-day-trip.html', 'Tangier to Chefchaouen Day Trip'],
  ['tours/fes-to-chefchaouen-day-trip.html', 'Fes to Chefchaouen Day Trip'],
  ['tours/3-day-fes-chefchaouen-volubilis-tour.html', '3-Day Fes, Chefchaouen & Volubilis Tour'],
  ['tours/4-day-fes-to-tangier-via-chefchaouen.html', '4-Day Fes to Tangier via Chefchaouen'],
  ['tours/5-day-tangier-chefchaouen-fes-tour.html', '5-Day Tangier, Chefchaouen & Fes Tour'],
  ['tours/7-day-northern-morocco-tour.html', '7-Day Northern Morocco Tour'],
];
const listLd = { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Things to do in Chefchaouen', itemListElement: items.map(([u, n], i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/' + u, name: n })) };

// ---- head (shell = Merzouga hub; URL and meta = Chefchaouen)
const HERO = 'grand-chefchaouen-blue.jpg';
const TITLE = 'Visit Chefchaouen with a Local: Private Tours, Day Trips &amp; Tips';
const DESC = 'Visit Chefchaouen, the blue city of the Rif: private day trips from Tangier and Fes, tours with a night in town, the Spanish Mosque, Ras El Maa and Akchour, how many days you need and how to get there.';
const hdrAt = head0.indexOf('<header');
const header = head0.slice(hdrAt).replace(' class="is-active"', ' class=""');
let head = head0.slice(0, hdrAt)
  .replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="keywords" content=")[^"]*/, '$1visit Chefchaouen, Chefchaouen private tour, Chefchaouen day trip, things to do in Chefchaouen, how many days in Chefchaouen, blue city Morocco, Akchour waterfalls')
  .replace(/destinations\/merzouga\.html/g, 'destinations/chefchaouen.html')
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${TITLE}`)
  .replace(/(<meta property="og:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${DESC}`)
  .replace(/assets\/images\/merzouga-dune\.jpg/g, 'assets/images/' + HERO)
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"ItemList"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(listLd) + '</script>')
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[^\n]*<\/script>/, '<script type="application/ld+json">' + JSON.stringify(faqLd) + '</script>');
if (!head.includes('"Things to do in Chefchaouen"') || !head.includes('Is a day trip enough, or should we stay a night?')) throw new Error('JSON-LD not replaced');

const script = mz.slice(mz.lastIndexOf('<script>', mz.indexOf('</main>')), mz.indexOf('</main>'))
  .replace("if(list.scrollWidth>list.clientWidth)", "if(li.tagName==='LI' && list.scrollWidth>list.clientWidth)")
  .replace("var c=li.querySelector('.htour'); c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash');", "var c=li.querySelector(':scope > .htour'); if(c){ c.classList.remove('is-flash'); void c.offsetWidth; c.classList.add('is-flash'); }");
if (!script.includes("li.tagName==='LI'") || !script.includes('if(c){')) throw new Error('chip script not patched');
const combine = mz.match(/  <section class="section dtl-combine"[\s\S]*?<\/section>\n/)[0]
  .replace('Want to add Merzouga to a Morocco tour?', 'Want Chefchaouen in a longer tour?')
  .replace('add%20Merzouga%20activities%20to', 'add%20Chefchaouen%20to')
  .replace('We fit the activities you choose into your itinerary, with transfers and timings arranged.', 'Most of our tours from Tangier, Fes and Casablanca can add a night in the blue city; we fit it into your route.');
const hcta = mz.match(/  <section class="hcta"[\s\S]*?<\/section>\n/)[0]
  .replace(/<img class="hcta__bg"[^>]*>/, '<img class="hcta__bg" src="/assets/images/chefchaouen-blue-hour.jpg" alt="Evening light on the blue walls and stairways of Chefchaouen" width="1440" height="1920" loading="lazy">')
  .replace('Plan Your Days in Merzouga', 'Plan Your Days in Chefchaouen')
  .replace('Tell us your dates and what you love; we’ll put the right activities together.', 'Tell us your dates and where you start; we’ll plan a day trip or a night in the blue city.')
  .replace('planning%20my%20days%20in%20Merzouga', 'planning%20my%20days%20in%20Chefchaouen');
if (combine.includes('Merzouga') || hcta.includes('Merzouga')) console.warn('WARN: Merzouga left in combine/hcta');

const blog = [
  ['best-things-to-do-in-chefchaouen', 'chefchaouen.jpg', 'A blue lane in the Chefchaouen medina', 1170, 1560, 'Best Things to Do in Chefchaouen', 'The blue lanes, the Kasbah, Ras El Maa and the hike to Akchour.'],
  ['chefchaouen-why-the-city-is-blue', 'chefchaouen-blue-steps.jpg', 'Blue steps in the Chefchaouen medina', 800, 900, 'Why Is Chefchaouen Blue?', 'The history of the town and the stories behind the colour.'],
  ['best-time-to-visit-chefchaouen', 'chefchaouen-blue-hour.jpg', 'Evening light on the blue walls of Chefchaouen', 1440, 1920, 'The Best Time to Visit Chefchaouen', 'Season by season in the Rif, and when the crowds come.'],
  ['morocco-itinerary-from-tangier', 'tangier-kasbah-walls-sea.jpg', 'The Kasbah walls of Tangier above the sea', 1600, 2133, 'Morocco Itinerary from Tangier', 'Routes from the ferry port, by Chefchaouen and Fes.'],
];
const blogHtml = blog.map(([u, img, alt, w, h, t, ex]) => `          <li><article class="hblog-card"><a class="hblog-card__link" href="../blog/${u}.html">
            <span class="hblog-card__img"><img src="/assets/images/${img}" alt="${alt}" width="${w}" height="${h}" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${t}</h3><span class="hblog-card__ex">${ex}</span></span>
          </a></article></li>`).join('\n');

const chips = [['tours', 'Day Trips'], ['blue-city', 'In the Blue City'], ['how-many-days', 'How Many Days'], ['stay', 'Stay a Night'], ['getting-here', 'Getting Here']]
  .map(([id, n]) => `<li><a href="#${id}">${IC.spark}<span>${n}</span></a></li>`).join('');

const trust = [
  [IC.shield, 'Always private', 'Just your group, never strangers.'],
  [IC.car, 'Hotel or port pick-up', 'In Tangier, Fes or Tetouan.'],
  [IC.coin, 'No shop stops', 'Unless you ask for one.'],
  [IC.clock, 'Free cancellation', 'Up to 24 hours before.'],
].map(([ic, b, s]) => `    <div class="trust__item">${tIc(ic)}<b>${b}</b><small>${s}</small></div>`).join('\n');

const main = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/${HERO}" alt="Blue houses of Chefchaouen below the Rif Mountains" width="1300" height="866" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="../index.html">Home</a><span class="sep">›</span><a href="../destinations/index.html">Destinations</a><span class="sep">›</span><span>Chefchaouen</span></nav>
      <h1>Chefchaouen<span class="script">The blue city, at a slower pace</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">A small mountain town in the Rif, its lanes and stairways painted every shade of blue. Come on a private day trip from Tangier or Fes, or stay a night to see it at sunset and in the quiet early morning.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why visit Chefchaouen with us"><div class="wrap"><div class="trust__grid">
${trust}
  </div></div></section>
  <section class="section cstart mz-intro" aria-labelledby="cc-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="cc-intro-title">Chefchaouen, Before the Crowds</h2>
      <p>Chefchaouen is calmer and cooler than the big imperial cities, and small enough to walk end to end. The only catch is its fame: from late morning the main lanes fill with day visitors and photo queues. So we time your visit: a guided walk first, then free time away from the busy corners, or a night in town for the empty lanes at sunrise and the sunset from the Spanish Mosque.</p>
      <p>Here is how we do Chefchaouen: day trips from Tangier and Fes, tours that sleep in the blue city, what to see there, how long to stay and how to get there. Each trip is private, with pick-up at your hotel, riad or port, and the price is agreed before you go.</p>
    </div>
  </div></section>
  <nav class="tbar tbar--dt" aria-label="Browse Chefchaouen"><div class="wrap tbar__bar">
    <ul class="tbar__list" id="list-cc">${chips}</ul>
  </div></nav>
  <section class="section dtl-list" id="tours" aria-labelledby="cc-tours">
    <div class="wrap">
      <div class="head-row"><div><h2 id="cc-tours">Day Trips to Chefchaouen</h2></div></div>
      <ul class="htours__list dtl-grid">
${tripCards}
      </ul>
      <p class="sdh-note">Staying in Tetouan or Asilah? We pick you up there too. For longer trips, see <a href="../tours/morocco-tours-from-tangier.html">tours from Tangier</a> and <a href="../tours/morocco-tours-from-fes.html">tours from Fes</a>.</p>
    </div>
  </section>
${happart('cc-city', 'Things to Do in Chefchaouen', [
  ['map', 'The Blue Medina', 'Lanes, stairways and doorways in every shade of blue. Come early for soft light and empty streets, and ask before photographing people.'],
  ['gate', 'Uta el-Hammam &amp; the Kasbah', 'The main square, with cafés under the red walls of the 15th-century Kasbah. Its small museum and garden cost about 60 MAD; the tower looks over the roofs.'],
  ['sun', 'The Spanish Mosque', 'A 15 to 20-minute walk uphill to the best view of the town, with the whole blue city below the Rif peaks at sunset.'],
  ['pin', 'Ras El Maa', 'The spring at the top of the medina, where the river comes out of the mountain and locals meet by the water.'],
  ['coin', 'Local Crafts', 'Wool blankets and garments, woven rugs, leather and the local goat cheese. With us there are no shop stops: you buy only if you want to.'],
  ['spark', 'Akchour Waterfalls', 'Half an hour into the Rif: a river path through a green gorge to turquoise pools, best from May to October. A full day on our <a class="sdh-link" href="../tours/4-day-fes-to-tangier-via-chefchaouen.html">4-day Fes to Tangier tour</a>.'],
], 'mz-combos cc-city')}${happart('cc-days', 'How Many Days in Chefchaouen?', [
  ['clock', 'A Day Trip', 'About four hours in town from Tangier, four to five from Fes: the medina with a guide, lunch and free time.'],
  ['sun', 'One Night', 'The best fit for most: the sunset from the Spanish Mosque and the empty lanes the next morning, before the day visitors arrive.'],
  ['spark', 'Two Nights', 'Add a day at the Akchour waterfalls, or simply slow down in the cafés of the square.'],
  ['map', 'As Part of a Tour', 'Chefchaouen sits between Tangier and Fes, so most northern routes sleep here on the way. See the tours below.'],
], 'mz-combos cc-days')}  <section class="section sdh-deserts" id="stay" aria-labelledby="cc-stay-title"><div class="wrap">
    <div class="head-row"><div><h2 id="cc-stay-title">Tours with a Night in Chefchaouen</h2><p>Sleep in the blue city on the way between Tangier, Fes and the Roman ruins of Volubilis.</p></div></div>
    <div class="dt-acc-wrap">
      <table class="dt-acc sdh-table">
        <thead><tr><th scope="col">Tour</th><th scope="col">Nights in Chefchaouen</th><th scope="col">Also on the way</th><th scope="col">Best for</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="../tours/3-day-fes-chefchaouen-volubilis-tour.html">3 days, Fes loop</a><small>Back to Fes</small></th><td>One night</td><td>Volubilis, Moulay Idriss, Meknes, Fes medina</td><td>Staying in Fes</td></tr>
          <tr><th scope="row"><a href="../tours/4-day-fes-to-tangier-via-chefchaouen.html">4 days, Fes to Tangier</a><small>With a day at Akchour</small></th><td>Two nights</td><td>Fes medina, Meknes, Volubilis, Tangier</td><td>Taking the ferry to Spain</td></tr>
          <tr><th scope="row"><a href="../tours/5-day-tangier-chefchaouen-fes-tour.html">5 days, Tangier to Fes</a><small>Two nights in Fes</small></th><td>One night</td><td>Tangier, Cap Spartel, Volubilis, Meknes</td><td>Arriving by ferry</td></tr>
          <tr><th scope="row"><a href="../tours/7-day-northern-morocco-tour.html">7 days, northern Morocco</a><small>Coast and mountains</small></th><td>Two nights</td><td>Asilah, Larache, Akchour, Volubilis, Fes</td><td>Seeing all of the north</td></tr>
        </tbody>
      </table>
    </div>
    <p class="sdh-note">Want the Sahara too? The <a href="../tours/8-day-morocco-tour-from-tangier.html">8-day tour from Tangier</a> and the <a href="../tours/7-day-morocco-tour-from-casablanca.html">7-day tour from Casablanca</a> both sleep in Chefchaouen on the way to the dunes.</p>
  </div></section>
${happart('cc-get', 'Getting to Chefchaouen', [
  ['pin', 'No Airport or Train', 'Chefchaouen is reached by road only. The nearest airports are Tangier and Fes, and we drive you from either.'],
  ['car', 'From Tangier', 'About 120 km, 2 to 2.5 hours past Tetouan. We meet ferry and cruise guests at the port exit on our <a class="sdh-link" href="../tours/tangier-to-chefchaouen-day-trip.html">Tangier day trip</a>.'],
  ['map', 'From Fes', 'About 200 km, 3.5 hours through the Rif foothills and Ouazzane. Our <a class="sdh-link" href="../tours/fes-to-chefchaouen-day-trip.html">Fes day trip</a> leaves at 08:00 and is back by 19:30.'],
  ['gate', 'To Your Riad', 'Cars cannot enter the medina lanes, so your driver stops at the nearest gate. The town is on a slope with stairs: pack light and wear good shoes.'],
], 'mz-combos cc-getting')}${happart('cc-why', 'Why Visit Chefchaouen With Us', [
  ['coin', 'Transparent Pricing', 'What we agree on is what you pay; no surprise extras on the day.'],
  ['group', 'Always Private', 'Your own guide and driver, never shared with strangers.'],
  ['shield', 'No Shop Stops', 'No commissions from carpet or craft shops; you only buy if you want to.'],
  ['pin', 'Local Guides', 'They know the quiet lanes, the best viewpoints and when the crowds come.'],
  ['clock', 'Free Cancellation', 'Up to 24 hours before, with a small deposit to book.'],
  ['chat', 'Local Team 24/7', 'English-speaking and on WhatsApp, day and night.'],
])}  <section class="hfaq mz-faq" aria-labelledby="cc-faq-title">
    <div class="wrap hfaq__in hfaq__grid">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="cc-faq-title">Chefchaouen FAQ</h2>
        </header>
        <div class="hfaq__list">
${faqHtml}
        </div>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../faq.html">View All FAQs</a></div>
      </div>
      <aside class="hblog" aria-labelledby="cc-blog-title">
        <header class="hrev__head hfaq__head">
          <h2 id="cc-blog-title">Read Before You Go</h2>
        </header>
        <ul class="hblog__list">
${blogHtml}
        </ul>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../blog.html">Read More Articles</a></div>
      </aside>
    </div>
  </section>
${combine}${hcta}${script}`;

const main2 = main
  .replace('<section class="happart mz-combos cc-city" aria-labelledby="cc-city"', '<section class="happart mz-combos cc-city" id="blue-city" aria-labelledby="cc-city"')
  .replace('<section class="happart mz-combos cc-days" aria-labelledby="cc-days"', '<section class="happart mz-combos cc-days" id="how-many-days" aria-labelledby="cc-days"')
  .replace('<section class="happart mz-combos cc-getting" aria-labelledby="cc-get"', '<section class="happart mz-combos cc-getting" id="getting-here" aria-labelledby="cc-get"');
for (const id of ['blue-city', 'how-many-days', 'getting-here']) if (!main2.includes(`id="${id}"`)) throw new Error('chip id ' + id);
const out = head + header + main2 + foot;
fs.writeFileSync('destinations/chefchaouen.html', out);
console.log('destinations/chefchaouen.html written', out.length);
