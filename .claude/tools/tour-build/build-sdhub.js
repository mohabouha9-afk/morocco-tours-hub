// Builds /sahara-desert-tours.html — the main Sahara desert hub (Page 1 of the desert hub-and-spoke plan).
// Shell (head links, header, footer) comes from day-trips.html (root page); the 27 desert cards come from
// tours/index.html #desert. Run: node .claude/tools/tour-build/build-sdhub.js
// Research (2026-11-18, WebSearch; OpenSEO out of credits): travellers ask Merzouga vs Zagora vs Agafay
// (40–60 min / 6–7 h / 9–10 h from Marrakech; Erg Chebbi up to ~150 m), how many days (1 Agafay, 2 Zagora,
// 3+ Merzouga; 2-day Merzouga = "many hours in the car"), private vs shared + solo, best season (Mar–May,
// Sep–Nov; ~40 °C in July; cold winter nights), safety, camp facilities. Sources in the session notes.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

const shell = rd('day-trips.html');
const idx = rd('tours/index.html');
const home = rd('index.html');

// ---------- cards ----------
const sec = idx.slice(idx.indexOf('<section class="section" id="desert">'), idx.indexOf('<section class="section" id="grand">'));
const raw = sec.split('<article class="htour">').slice(1).map(c => '<article class="htour">' + c.slice(0, c.indexOf('</article>') + 10));
if (raw.length !== 27) throw new Error('expected 27 desert cards, got ' + raw.length);
const ORDER = ['Marrakech', 'Fes', 'Merzouga', 'Errachidia', 'Agadir', 'Rabat'];
const cards = raw.map(c => {
  c = c.replace(/href="\.\.\/tours\//g, 'href="tours/');
  const href = c.match(/href="([^"]+)"/)[1];
  const title = c.match(/htour__title">([^<]*)/)[1];
  const days = parseInt(c.match(/htour__days">[\s\S]*?<\/svg>\s*(\d+)/)[1], 10);
  const start = c.match(/Start:<\/b>\s*([^<]*)/)[1].trim();
  let end = c.match(/End:<\/b>\s*([^<]*)/)[1].trim().replace(/ Airport$/i, '');
  const round = start === end;
  const tag = round ? 'Round trip' : 'Ends in ' + end;
  c = c.replace('<span class="htour__media">', `<span class="htour__media"><span class="htour__way${round ? '' : ' htour__way--one'}">${tag}</span>`);
  return { href, title, days, start, round, html: c };
});
cards.sort((a, b) => ORDER.indexOf(a.start) - ORDER.indexOf(b.start) || a.days - b.days);
const counts = {}; cards.forEach(c => counts[c.start] = (counts[c.start] || 0) + 1);
const li = cards.map((c, i) => `        <li${i >= 8 ? ' class="is-folded"' : ''} data-start="${c.start.toLowerCase()}" data-way="${c.round ? 'round' : 'one'}">${c.html}</li>`).join('\n');

const PIN = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
const ALLIC = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>';
const chips = [`<li><button type="button" class="is-on" data-city="all" aria-pressed="true">${ALLIC}<span>All cities</span><b>${cards.length}</b></button></li>`]
  .concat(ORDER.map(c => `<li><button type="button" data-city="${c.toLowerCase()}" aria-pressed="false">${PIN}<span>${c}</span><b>${counts[c]}</b></button></li>`)).join('');

// ---------- shared bits ----------
const WA = shell.match(/<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12\.04[^"]*"\/><\/svg>/)[0];
const IC = d => `<span class="happart-card__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg></span>`;
const TIC = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICO = {
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  guide: '<circle cx="12" cy="7.5" r="3.5"/><path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5"/>',
  noshop: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/>',
  tent: '<path d="M3 20L12 4l9 16H3z"/><path d="M12 4v16M9 20l3-6 3 6"/>',
  board: '<path d="M4 18c5-1 11-6 16-13"/><path d="M6.5 20.5l-3-3"/><path d="M19 3l2 2"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.4-.8-1.3-1.3-2.5-1.3-1.5 0-2.5.8-2.5 1.9 0 2.6 5 1.4 5 4 0 1.1-1 1.9-2.5 1.9-1.2 0-2.1-.5-2.5-1.3M12 6.8v1.4M12 15.8v1.4"/>',
  moon: '<path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a3 3 0 000-6h-4a3 3 0 010-6h6"/>',
  car: '<path d="M3 16v-4l2-5h14l2 5v4H3z"/><path d="M3 12h18"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/>'
};

const FAQ = [
  ['Which desert should we choose: Merzouga, Zagora, Erg Chigaga or Agafay?', 'For tall golden dunes, choose Merzouga: Erg Chebbi rises to about 150 m, and 3 days from Marrakech is the best length. Zagora is closer, with lower dunes, and fits 2 days. Erg Chigaga is wild and empty, reached by 4×4, in 4 days. Agafay is a stony desert 40 minutes from Marrakech, made for an evening.'],
  ['How many days do we need for a Sahara tour?', 'Two days is possible, but Merzouga is 9 to 10 hours from Marrakech each way, so it is mostly driving. Three days is the classic, with a night in the Dades Valley and a night in the dunes. Four days or more gives you a full day in Merzouga and no long drive day.'],
  ['Are your desert tours private? Can I come alone?', 'Yes, every desert tour on this page is private: your own vehicle and driver-guide, and your own timings. Solo travellers can book too. If you would rather share the cost with other travellers, ask about our 3-day shared group tour from Marrakech.'],
  ['When is the best time for a desert tour?', 'March to May and September to November, with warm days and cool nights. From June to August the dunes pass 40 °C, so we ride at sunset and sunrise. Winter days are sunny, but nights drop close to freezing: bring a warm jacket for the evening and the sunrise.'],
  ['Is the Sahara safe for tourists?', 'Yes. The desert routes are busy, well-kept roads with regular police checkpoints, and your driver-guide stays with you for the whole trip. Keep your passport with you, as checkpoints sometimes ask for it.'],
  ['What is the desert camp like?', 'You sleep in a tent with a real bed, and in our Merzouga camps every tent has its own bathroom. Dinner, music by the fire and breakfast are included. Each tour page lets you choose a standard, deluxe or luxury camp.']
];
const faqHtml = FAQ.map((q, i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}>
            <summary><h3>${q[0]}</h3><span class="hfaq-item__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></summary>
            <div class="hfaq-item__a"><p>${q[1]}</p></div>
          </details>`).join('\n');

const BLOG = [
  ['morocco-desert-tours-complete-guide', 'camel-caravan.webp', 'Camel caravan in the Sahara', 'How to Choose a Morocco Desert Tour', 'Which desert, how many days, private or shared, camps, costs and packing.'],
  ['merzouga-or-zagora', 'sahara-dunes.jpg', 'Sahara dunes in Morocco', 'Merzouga or Zagora?', 'Dune size, distance from Marrakech and days needed, side by side.'],
  ['3-days-vs-4-days-marrakech-to-merzouga', 'merzouga-camel-caravan-guide.jpg', 'Guide leading camels in Merzouga', '3 Days vs 4 Days to Merzouga', 'The pace, the driving and the desert time on each version.'],
  ['sleeping-in-a-sahara-desert-camp', 'desert-camp.webp', 'A desert camp in the dunes', 'Sleeping in a Sahara Desert Camp', 'The ride in, dinner and music, the stars and the sunrise.']
];
const blogHtml = BLOG.map(b => `          <li><article class="hblog-card"><a class="hblog-card__link" href="blog/${b[0]}.html">
            <span class="hblog-card__img"><img src="/assets/images/${b[1]}" alt="${b[2]}" width="1200" height="800" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${b[3]}</h3><span class="hblog-card__ex">${b[4]}</span></span>
          </a></article></li>`).join('\n');

const reviews = home.slice(home.indexOf('<section class="hrev"'), home.indexOf('<section class="hdest"')).trim();

const card = (ic, h, p) => `        <li><article class="happart-card">
          ${IC(ic)}
          <h3>${h}</h3>
          <p>${p}</p>
        </article></li>`;

// ---------- main ----------
const main = `<main>
  <section class="page-hero page-hero--lift">
    <div class="page-hero__bg"><img src="/assets/images/merzouga-camel-caravan.jpg" alt="Camel caravan crossing the Erg Chebbi dunes in the Moroccan Sahara" width="1600" height="1066" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="index.html">Home</a><span class="sep">›</span><a href="tours/index.html">Tours</a><span class="sep">›</span><span>Sahara Desert Tours</span></nav>
      <h1>Morocco Sahara Desert Tours<span class="script">Choose your dunes, your days, your road</span></h1>
      <p style="max-width:640px;color:rgba(255,255,255,.9)">Private desert tours from 2 to 10 days, to Merzouga, Zagora or Erg Chigaga. Start in Marrakech, Fes or Merzouga, and come back or end in another city.</p>
    </div>
  </section>
  <section class="trust trust--lift trust--dt" aria-label="Why book your desert tour with us"><div class="wrap"><div class="trust__grid">
    <div class="trust__item">${TIC(ICO.shield)}<b>Always private</b><small>Your own car, never strangers.</small></div>
    <div class="trust__item">${TIC(ICO.guide)}<b>One driver-guide</b><small>The same person, first day to last.</small></div>
    <div class="trust__item">${TIC(ICO.noshop)}<b>No shopping stops</b><small>Only the places you came for.</small></div>
    <div class="trust__item">${TIC(ICO.clock)}<b>Free cancellation</b><small>Up to 24 hours before.</small></div>
  </div></div></section>
  <section class="section cstart sdh-intro" aria-labelledby="sdh-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="sdh-intro-title">A Night in the Sahara, Your Way</h2>
      <p>The Sahara is the night most travellers remember from Morocco: a camel ride as the dunes turn red, dinner by the fire, and more stars than you have ever seen. We run every desert tour privately, with one driver-guide from the first morning to the last, and no shopping stops on the way.</p>
      <p>Choosing comes down to three things: which desert, how many days, and where you want to end. Merzouga has the tallest dunes but sits 9 to 10 hours from Marrakech, so we split the drive over two or three days. Zagora is closer, with lower dunes, and Erg Chigaga is the wild one, reached by 4×4. Pick your starting city below and see every tour that leaves from it, round trip or one way.</p>
    </div>
  </div></section>
  <section class="section sdh-tours" id="tours" aria-labelledby="sdh-tours-title">
    <nav class="tbar sdh-bar" aria-label="Filter desert tours"><div class="wrap tbar__bar">
      <div class="tbar__switch" role="group" aria-label="Type of trip">
        <button type="button" class="is-on" data-way="all" aria-pressed="true">All</button><button type="button" data-way="round" aria-pressed="false">Round trip</button><button type="button" data-way="one" aria-pressed="false">One way</button>
      </div>
      <ul class="tbar__list" aria-label="Starting city">${chips}</ul>
    </div></nav>
    <div class="wrap">
      <div class="head-row"><div><h2 id="sdh-tours-title">Find Your Desert Tour</h2><p class="sdh-count" aria-live="polite">${cards.length} desert tours</p></div></div>
      <ul class="htours__list sdh-grid" id="sdh-list">
${li}
      </ul>
      <div class="sdh-more"><button type="button" class="hdest__btn sdh-more__btn">Show All ${cards.length} Desert Tours</button></div>
      <p class="sdh-empty" hidden>No tour starts here with this type of trip. <button type="button" class="sdh-reset">Show all desert tours</button></p>
      <p class="sdh-note">Compare the road, the days and every option from your city: <a href="desert-tours-from-marrakech.html">desert tours from Marrakech</a> or <a href="desert-tours-from-fes.html">desert tours from Fes</a>.</p>
    </div>
  </section>
  <section class="section sdh-deserts" id="which-desert" aria-labelledby="sdh-which-title"><div class="wrap">
    <div class="head-row"><div><h2 id="sdh-which-title">Which Desert Is Right for You?</h2></div></div>
    <div class="dt-acc-wrap">
      <table class="dt-acc sdh-table">
        <thead><tr><th scope="col">Desert</th><th scope="col">From Marrakech</th><th scope="col">The dunes</th><th scope="col">Shortest trip</th></tr></thead>
        <tbody>
          <tr><th scope="row"><a href="destinations/merzouga.html">Merzouga</a><small>Tall dunes, the classic</small></th><td>9 to 10 hours (560 km); 8 hours from Fes</td><td>Erg Chebbi, golden sand up to about 150 m</td><td><a href="tours/3-days-desert-tour-marrakech-to-merzouga.html">3 days</a> (2 possible)</td></tr>
          <tr><th scope="row"><a href="tours/2-day-marrakech-to-zagora-desert-tour.html">Zagora</a><small>Short trips from Marrakech</small></th><td>About 6 hours, through the Draa Valley</td><td>Low dunes and stony desert</td><td><a href="tours/2-day-marrakech-to-zagora-desert-tour.html">2 days</a></td></tr>
          <tr><th scope="row"><a href="tours/4-day-marrakech-erg-chigaga-tour.html">Erg Chigaga</a><small>Wild and empty</small></th><td>About 8 hours, the last 50 km off-road by 4×4</td><td>Remote dune sea, about 50 to 60 m</td><td><a href="tours/4-day-marrakech-erg-chigaga-tour.html">4 days</a></td></tr>
          <tr><th scope="row"><a href="tours/marrakech-agafay-desert-day-trip.html">Agafay</a><small>One evening, no long drive</small></th><td>40 minutes</td><td>Stony hills, no sand dunes</td><td><a href="tours/agafay-desert-camel-ride-dinner-show.html">An evening</a> or <a href="tours/marrakech-agafay-desert-day-trip.html">a day</a></td></tr>
        </tbody>
      </table>
    </div>
    <p class="sdh-note">Still deciding? Read <a href="blog/merzouga-or-zagora.html">Merzouga or Zagora</a> for the full comparison.</p>
  </div></section>
  <section class="happart sdh-days" aria-labelledby="sdh-days-title">
    <div class="wrap happart__in">
      <header class="hrev__head happart__head">
        <h2 id="sdh-days-title">How Many Days Do You Need?</h2>
      </header>
      <ul class="happart__grid">
${card(ICO.moon, '2 Days', 'One night in the dunes when time is short; expect long drives both ways. <a class="sdh-link" href="tours/2-day-marrakech-to-merzouga-desert-tour.html">From Marrakech</a> or <a class="sdh-link" href="tours/2-day-fes-to-merzouga-desert-tour.html">from Fes</a>.')}
${card(ICO.sun, '3 Days', 'The classic: kasbahs, the Dades Valley and a camp in Erg Chebbi. <a class="sdh-link" href="tours/3-days-desert-tour-marrakech-to-merzouga.html">Round trip</a> or <a class="sdh-link" href="tours/3-day-marrakech-to-fes-desert-tour.html">on to Fes</a>.')}
${card(ICO.route, '4 Days or More', 'A full day in Merzouga and no long drive day. <a class="sdh-link" href="tours/4-day-marrakech-to-merzouga-desert-tour.html">4-day round trip</a> or <a class="sdh-link" href="tours/7-day-marrakech-erg-chigaga-merzouga-tour.html">both deserts in 7 days</a>.')}
      </ul>
    </div>
  </section>
  <section class="happart sdh-every" aria-labelledby="sdh-every-title">
    <div class="wrap happart__in">
      <header class="hrev__head happart__head">
        <h2 id="sdh-every-title">On Every Desert Tour</h2>
      </header>
      <ul class="happart__grid">
${card(ICO.sun, 'Camels at Sunset', 'About an hour on a camel into the dunes, not a 15-minute photo ride.')}
${card(ICO.tent, 'Camps in the Dunes', 'Real beds and, in Merzouga, a private bathroom in every tent.')}
${card(ICO.board, 'Sandboarding', 'Boards at the camp to slide down the dunes, free.')}
${card(ICO.guide, 'One Driver-Guide', 'The same English-speaking guide for the whole trip.')}
${card(ICO.coin, 'Price Agreed First', 'Lunches, tips and small entrance fees are listed on each tour.')}
${card(ICO.car, 'Comfortable Vehicles', 'Air-conditioned 4×4 or minivan, matched to your group.')}
      </ul>
    </div>
  </section>
  <section class="section sdh-near" aria-label="Already near the desert?"><div class="wrap">
    <div class="sdh-near__grid">
      <div class="dtl-combine__box">
        <span class="dtl-combine__ic">${TIC(ICO.tent)}</span>
        <div class="dtl-combine__txt"><h3>Already in Merzouga?</h3><p>A camp night, a sunset camel ride, quads, buggies and a 4×4 day.</p></div>
        <div class="dtl-combine__btns"><a class="hero-btn hero-btn--gold" href="destinations/merzouga.html">Things to Do in Merzouga</a></div>
      </div>
      <div class="dtl-combine__box">
        <span class="dtl-combine__ic">${TIC(ICO.clock)}</span>
        <div class="dtl-combine__txt"><h3>Only one free evening?</h3><p>Camels, dinner and a fire show in Agafay, 40 minutes from Marrakech.</p></div>
        <div class="dtl-combine__btns"><a class="hero-btn hero-btn--gold" href="tours/agafay-desert-camel-ride-dinner-show.html">Agafay at Sunset</a></div>
      </div>
    </div>
  </div></section>
  ${reviews}
  <section class="hfaq sdh-faq" aria-labelledby="sdh-faq-title">
    <div class="wrap hfaq__in hfaq__grid">
      <div class="hfaq__faq">
        <header class="hrev__head hfaq__head">
          <h2 id="sdh-faq-title">Desert Tour FAQ</h2>
        </header>
        <div class="hfaq__list">
${faqHtml}
        </div>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="faq.html">View All FAQs</a></div>
      </div>
      <aside class="hblog" aria-labelledby="sdh-blog-title">
        <header class="hrev__head hfaq__head">
          <h2 id="sdh-blog-title">Read Before You Go</h2>
        </header>
        <ul class="hblog__list">
${blogHtml}
        </ul>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="blog.html">Read More Articles</a></div>
      </aside>
    </div>
  </section>
  <section class="section dtl-combine" aria-labelledby="dtl-comb">
    <div class="wrap">
      <div class="dtl-combine__box">
        <span class="dtl-combine__ic">${TIC('<path d="M4 7h11M4 12h16M4 17h9"/><circle cx="19" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>')}</span>
        <div class="dtl-combine__txt"><h2 id="dtl-comb">Not sure which desert tour fits?</h2><p>Tell us your dates, your city and how you like to travel; we suggest the right route.</p></div>
        <div class="dtl-combine__btns">
          <a class="hero-btn dtl-combine__wa" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20help%20choosing%20a%20Sahara%20desert%20tour." target="_blank" rel="noopener">${WA}Chat on WhatsApp</a>
          <a class="hero-btn hero-btn--gold" href="contact.html">Request a Quote</a>
        </div>
      </div>
    </div>
  </section>
  <section class="hcta" aria-labelledby="hcta-title">
    <img class="hcta__bg" src="/assets/images/erg-chebbi-caravan-sunset.jpg" alt="Camel caravan crossing the Erg Chebbi dunes at sunset" width="1800" height="1200" loading="lazy">
    <div class="hcta__inner">
      <h2 id="hcta-title">Ready for Your Night in the Sahara?</h2>
      <p class="hcta__sub">Send us your dates; we reply on WhatsApp with your private route.</p>
      <div class="hcta__actions">
        <a class="hero-btn hero-btn--gold" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20to%20plan%20a%20Sahara%20desert%20tour." target="_blank" rel="noopener">${WA}Chat on WhatsApp</a>
        <a class="hero-btn hcta__quote" href="contact.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>Request a Quote</a>
      </div>
    </div>
  </section>
<script>
  (function(){
    var sec=document.getElementById('tours'); if(!sec) return;
    var items=[].slice.call(sec.querySelectorAll('#sdh-list > li')), list=document.getElementById('sdh-list');
    var cnt=sec.querySelector('.sdh-count'), empty=sec.querySelector('.sdh-empty');
    var city='all', way='all', open=false, more=sec.querySelector('.sdh-more');
    var WAY={all:'',round:' round-trip',one:' one-way'};
    function apply(scroll){
      var n=0, fold=city==='all'&&way==='all'&&!open;
      items.forEach(function(li){ var ok=(city==='all'||li.dataset.start===city)&&(way==='all'||li.dataset.way===way); li.hidden=!ok; if(ok) n++; li.classList.toggle('is-folded',fold&&n>8); });
      more.hidden=!fold;
      var name=city==='all'?'':' from '+sec.querySelector('[data-city="'+city+'"] span').textContent;
      cnt.textContent=n+WAY[way]+' desert tour'+(n===1?'':'s')+name;
      empty.hidden=n>0; list.hidden=n===0;
      list.scrollLeft=0;
      if(scroll){ var top=sec.getBoundingClientRect().top+window.scrollY-76; if(window.scrollY>top+40) window.scrollTo({top:top,behavior:'smooth'}); }
    }
    function press(group,btn){ group.forEach(function(b){ var on=b===btn; b.classList.toggle('is-on',on); b.setAttribute('aria-pressed',on); }); }
    var cityBtns=[].slice.call(sec.querySelectorAll('[data-city]')), wayBtns=[].slice.call(sec.querySelectorAll('.tbar__switch [data-way]'));
    cityBtns.forEach(function(b){ b.addEventListener('click',function(){ city=b.dataset.city; press(cityBtns,b); var cl=b.closest('.tbar__list'); if(cl.scrollWidth>cl.clientWidth) cl.scrollTo({left:cl.scrollLeft+b.getBoundingClientRect().left-cl.getBoundingClientRect().left-8,behavior:'smooth'}); apply(true); }); });
    wayBtns.forEach(function(b){ b.addEventListener('click',function(){ way=b.dataset.way; press(wayBtns,b); apply(true); }); });
    more.querySelector('button').addEventListener('click',function(){ open=true; apply(false); var f=items[8]&&items[8].querySelector('a'); if(f) f.focus({preventScroll:true}); });
    sec.querySelector('.sdh-reset').addEventListener('click',function(){ city='all'; way='all'; press(cityBtns,cityBtns[0]); press(wayBtns,wayBtns[0]); apply(false); });
    // deep links: sahara-desert-tours.html#from-fes opens filtered
    var m=location.hash.match(/^#from-([a-z]+)$/); if(m){ var b=sec.querySelector('[data-city="'+m[1]+'"]'); if(b){ city=m[1]; press(cityBtns,b); apply(false); setTimeout(function(){ window.scrollTo(0,sec.getBoundingClientRect().top+window.scrollY-76); },60); } }
  })();
  </script>
</main>`;

// ---------- head + JSON-LD ----------
const TITLE = 'Morocco Sahara Desert Tours | Private Trips from Marrakech &amp; Fes';
const DESC = 'Private Sahara desert tours in Morocco: 2 to 10 days to Merzouga, Zagora or Erg Chigaga, round trip or ending in Fes. Sunset camel ride, desert camp, one guide.';
const URL = 'https://moroccotourshub.com/sahara-desert-tours.html';
const IMG = 'https://moroccotourshub.com/assets/images/merzouga-camel-caravan.jpg';
const j = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const ld = [
  j({ '@context': 'https://schema.org', '@type': 'ItemList', name: 'Morocco Sahara desert tours', itemListElement: cards.map((c, i) => ({ '@type': 'ListItem', position: i + 1, url: 'https://moroccotourshub.com/' + c.href, name: c.title })) }),
  j({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1] } })) }),
  j({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moroccotourshub.com/' },
    { '@type': 'ListItem', position: 2, name: 'Tours', item: 'https://moroccotourshub.com/tours/index.html' },
    { '@type': 'ListItem', position: 3, name: 'Sahara Desert Tours', item: URL }] })
].join('\n');

let head = shell.slice(0, shell.indexOf('<body'));
head = head.replace(/<title>[\s\S]*?<\/title>/, `<title>${TITLE}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${DESC}">`)
  .replace(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="Morocco desert tours, Sahara desert tours, Morocco Sahara tour, Merzouga desert tour, Zagora desert tour, Erg Chigaga tour, desert tour from Marrakech, desert tour from Fes">')
  .replace(/https:\/\/moroccotourshub\.com\/day-trips\.html/g, URL)
  .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${TITLE}">`)
  .replace(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${TITLE}">`)
  .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${DESC}">`)
  .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${DESC}">`)
  .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${IMG}">`)
  .replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${IMG}">`)
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"ItemList"[\s\S]*?<\/script>/, ld);

let body = shell.slice(shell.indexOf('<body'));
const pre = body.slice(0, body.indexOf('<main>'));
const post = body.slice(body.indexOf('</main>') + 7);
const header = pre.replace('href="day-trips.html" class="is-active"', 'href="day-trips.html" class=""')
  .replace('<a href="tours/index.html" class="">Tours', '<a href="tours/index.html" class="is-active">Tours');

const out = head + header + main + post;
fs.writeFileSync(path.join(ROOT, 'sahara-desert-tours.html'), out);
console.log('written', out.length, 'chars;', cards.length, 'cards', counts);
