// Builds tours/merzouga-transfers.html — private transfers from Merzouga to Fes or Marrakech (both on one page).
// Owner (2026-11-18): "add transfer from Merzouga to Fes or Marrakech, both destinations in one page; we sell
// transportation here, just like the Marrakech airport transfer". Shell = tours/marrakech-airport-transfer.html.
// Then run: node .claude/tools/route-map.mjs tours/merzouga-transfers.html mtr
// Research (2026-11-18, WebSearch): Merzouga → Marrakech ≈ 560 km over the Atlas and the Draa Valley, sold as a
// one-day private transfer (Daytrip lists 8 h 40 min driving; Aït Ben Haddou detour adds 1–2 h); Merzouga → Fes
// ≈ 8 h 30 with stops, lunch in Midelt, photo stops at the Ziz gorges, Ifrane/Azrou (lokalee, birdmi). Bus: no
// direct day bus to Marrakech (via Meknes ~15 h on Rome2Rio; Bookaway lists a Supratours 08:00 → ~20:00), the
// Fes bus runs overnight (our own merzouga-to-fes research). Competitors sell "sightseeing stops" as paid add-ons;
// our angle: private car, stops when you ask, door to door (riad gate + help with bags), train/airport drop-off.
// Sources: daytrip.com, bookaway.com, rome2rio.com, lokalee.app, birdmi.com. No prices on the page (site rule).
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const shell = rd('tours/marrakech-airport-transfer.html');
const idx = rd('tours/index.html');
const mz = JSON.parse(rd('.claude/tools/tour-build/mz-cards.json'));

const S = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const I = {
  pin: '<path d="M12 21c4-4.5 7-7.6 7-11a7 7 0 10-14 0c0 3.4 3 6.5 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  car: '<path d="M5 16V11l2-5h10l2 5v5"/><path d="M3 16h18v3H3zM5 11h14"/><circle cx="7.5" cy="16" r="1"/><circle cx="16.5" cy="16" r="1"/>',
  door: '<path d="M6 21V4h12v17M4 21h16"/><circle cx="14.5" cy="12.5" r=".8"/>',
  stop: '<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>',
  card: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18M7 15h3"/>',
  yes: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  no: '<path d="M7 7l10 10M17 7L7 17"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/>',
  coin: '<circle cx="12" cy="12" r="8.5"/><path d="M14.5 9.5c-.5-1-1.4-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1.1 1.6 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1.1 0-2-.5-2.5-1.5M12 6.5V8M12 16v1.5"/>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>'
};
const li = (ic, t) => `<li>${S(I[ic])}<span>${t}</span></li>`;

const STEPS = [
  ['The day before', 'Tell us where to find you', 'Your hotel or camp in Merzouga, your destination and the address at the other end. The evening before, you get your driver’s name and number on WhatsApp.'],
  ['After breakfast', 'Pick-up at your door', 'We suggest leaving around 08:00 to arrive before dark. Staying at a desert camp? The camp brings you out by camel or 4×4 and your driver waits at the meeting point.'],
  ['On the road', 'Stops when you want them', 'Coffee, photos or a stretch whenever you ask: the palm gorges of the Ziz Valley on the way to Fes, the Draa Valley palm groves on the way to Marrakech.'],
  ['Midday', 'Lunch where you choose', 'Your driver suggests a few local places, in Midelt on the Fes road or in the Draa Valley and Ouarzazate on the Marrakech road. No fixed restaurant.'],
  ['Late afternoon', 'To your hotel or riad', 'Cars cannot enter the medina lanes in Fes or Marrakech, so your driver parks at the nearest gate and helps you with the bags to the riad door.'],
  ['Catching a train or flight?', 'Station or airport drop-off', 'We can end at the train station or the airport in Fes or Marrakech. Tell us your departure time: we plan the start so you arrive with time to spare.']
];
const stepsHtml = STEPS.map((s, i) => `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i === 0 ? ' open' : ''}><summary><span class="dt-prog__t">${s[0]}</span><h3>${s[1]}</h3><span class="dt-prog__ic" aria-hidden="true">${I.plus}</span></summary><p>${s[2]}</p></details></li>`).join('\n');

const FAQ = [
  ['How long is the drive to Fes or to Marrakech?', 'To Fes it is about 470 km, around 8 hours with stops for coffee and lunch in Midelt. To Marrakech it is about 560 km over the High Atlas, 9 to 10 hours with stops. Both are full days, so we leave in the morning and arrive before dark.'],
  ['Why a private car instead of the bus?', 'The buses take most of a day or run overnight, with changes and long stops. A private car leaves from your hotel when you want, stops where you ask and drops you at your riad, the station or the airport.'],
  ['Can you pick us up at our desert camp?', 'Yes. After breakfast the camp brings you out of the dunes by camel or 4×4, and your driver waits at the camp’s meeting point with your luggage loaded.'],
  ['Can we visit places on the way?', 'Yes, tell us when you book. On the Fes road the cedar forest and Ifrane are on the way. On the Marrakech road you can add the Todra Gorge or Aït Ben Haddou, which adds one to two hours. For a slower trip, see our tours from Merzouga with a night on the way.'],
  ['Do you also drive to Merzouga from Fes or Marrakech?', 'Yes, the same private transfer runs the other way. Send us your dates and where to pick you up, and we can book a night in a desert camp for your arrival.'],
  ['How do I book and pay?', '<ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp: date, pick-up place and destination.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid to your driver, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before.</p>']
];
const faqHtml = FAQ.map((q, i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}><summary><h3>${q[0]}</h3><span class="hfaq-item__ic" aria-hidden="true">${I.plus}</span></summary><div class="hfaq-item__a">${q[1].startsWith('<') ? q[1] : '<p>' + q[1] + '</p>'}</div></details>`).join('\n');

// related cards: the two tours that leave Merzouga + the desert camp night
function idxCard(slug) {
  const i = idx.indexOf('<article class="htour"><a class="htour__link" href="../tours/' + slug + '.html">');
  if (i < 0) throw new Error('card missing ' + slug);
  return idx.slice(i, idx.indexOf('</article>', i) + 10).replace(/href="\.\.\/tours\//g, 'href="');
}
const camp = mz['merzouga-desert-camp-camel-ride.html'];
const campCard = (typeof camp === 'string' ? camp : camp.html || camp.card).replace(/^\s*<li[^>]*>|<\/li>\s*$/g, '');
const others = [idxCard('merzouga-to-fes-tour'), idxCard('merzouga-to-marrakech-tour'), campCard].map(c => `          <li>${c}</li>`).join('\n');

const reviewsBlock = shell.slice(shell.indexOf('<div class="dt-revs">'), shell.indexOf('</section>', shell.indexOf('<div class="dt-revs">')));
const revSum = shell.match(/<p class="dt-revs__sum">[\s\S]*?<\/p>/)[0];
const WA = shell.match(/<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12\.04[^"]*"\/><\/svg>/)[0];
const fleet = shell.match(/<div class="dt-gal dt-gal--3">[\s\S]*?<\/div>/)[0];

const routeCard = (cls, title, sub, km, time, stops, drop) => `            <article class="dt-card mtr-route ${cls}">
              <h3>${title}<small>${sub}</small></h3>
              <dl class="mtr-route__facts"><div><dt>Distance</dt><dd>${km}</dd></div><div><dt>Drive</dt><dd>${time}</dd></div></dl>
              <ol class="mtr-route__stops">${stops.map(s => `<li>${s}</li>`).join('')}</ol>
              <p class="mtr-route__drop">${S(I.door)}<span>${drop}</span></p>
            </article>`;

const main = `<main>
  <section class="page-hero dt-hero mtr-hero">
    <div class="page-hero__bg"><img src="/assets/images/merzouga-transfer-4x4-dunes.jpg" alt="A 4×4 driving over the crest of a sand dune" width="1800" height="1286" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="../index.html">Home</a><span class="sep">›</span><a href="../destinations/merzouga.html">Merzouga</a><span class="sep">›</span><span>Transfers</span></nav>
      <span class="dt-hero__loc">${S(I.pin)}Merzouga</span>
      <h1>Private Transfer from Merzouga to Fes or Marrakech<span class="script">From the dunes to your door</span></h1>
      <ul class="dt-facts">
        <li>${S(I.pin)}<span><small>Routes</small><b>To Fes or Marrakech</b></span></li>
        <li>${S(I.door)}<span><small>Pick-up</small><b>Your hotel or camp</b></span></li>
        <li>${S(I.shield)}<span><small>Format</small><b>Private car</b></span></li>
        <li>${S(I.cal)}<span><small>Availability</small><b>Every day</b></span></li>
      </ul>
    </div>
  </section>
  <nav class="dtnav" aria-label="On this page"><div class="wrap dtnav__in">
    <a href="#overview">Overview</a><a href="#routes">The Two Routes</a><a href="#programme">How It Works</a><a href="#included">What’s Included</a><a href="#gallery">Our Vehicles</a><a href="#custom">Extras</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a><a href="#others">From Merzouga</a>
  </div></nav>
  <section class="section dt-body">
    <div class="wrap dt-grid">
      <div class="dt-main">
        <section class="dt-block" id="overview" aria-labelledby="dt-ov">
          <h2 class="dt-h2" id="dt-ov">Overview</h2>
          <p class="dt-lead">Leaving the desert is a long day on the road, and the buses make it longer. A private car collects you at your hotel or camp in Merzouga and drives you to Fes or Marrakech in one day, with stops whenever you want them.</p>
          <p class="dt-lead">Your driver drops you at your hotel, at the nearest gate to your riad with help for the bags, or at the train station or airport. The car and the timing are yours alone.</p>
          <dl class="dt-glance"><div>${S(I.clock)}<dt>To Fes</dt><dd>About 8 hours</dd></div><div>${S(I.clock)}<dt>To Marrakech</dt><dd>9 to 10 hours</dd></div><div>${S(I.pin)}<dt>Pick-up</dt><dd>Hotel or camp</dd></div><div>${S(I.door)}<dt>Drop-off</dt><dd>Door, station or airport</dd></div><div>${S(I.stop)}<dt>Stops</dt><dd>Whenever you ask</dd></div><div>${S(I.card)}<dt>Cancellation</dt><dd>Free up to 24 h before</dd></div></dl>
        </section>
        <section class="dt-block" id="routes" aria-labelledby="dt-ro">
          <h2 class="dt-h2" id="dt-ro">The Two Routes</h2>
          <div class="mtr-routes">
${routeCard('mtr-route--fes', 'To Fes', 'North over the Middle Atlas', 'About 470 km', 'About 8 hours', ['Merzouga', 'Erfoud', 'Ziz Valley gorges', 'Midelt, lunch', 'Cedar forest and Ifrane', 'Fes'], 'Hotel, riad gate, train station or Fes-Saïss airport')}
${routeCard('mtr-route--mk', 'To Marrakech', 'West over the High Atlas', 'About 560 km', '9 to 10 hours', ['Merzouga', 'Rissani and Alnif', 'Draa Valley palm groves', 'Ouarzazate', 'Tizi n’Tichka pass, 2,260 m', 'Marrakech'], 'Hotel, riad gate, train station or Menara airport')}
          </div>
          <h3 class="dt-h3">Route Map</h3>
          <div class="dt-map"></div>
          <p class="dt-map__note">${S(I.pin)}<span>Both roads from Merzouga, to Fes in the north and Marrakech in the west.</span></p>
        </section>
        <section class="dt-block" id="programme" aria-labelledby="dt-pr">
          <h2 class="dt-h2" id="dt-pr">How It Works</h2>
          <ol class="dt-prog dt-prog--acc">
${stepsHtml}
          </ol>
        </section>
        <section class="dt-block" id="included" aria-labelledby="dt-in">
          <h2 class="dt-h2" id="dt-in">What’s Included</h2>
          <div class="dt-inc">
            <div class="dt-card dt-inc__box dt-inc__box--yes"><h3>Included</h3><ul>${li('yes', 'Private air-conditioned car and driver (see <a href="../index.html#fleet">our fleet</a>)')}${li('yes', 'Pick-up at your hotel or camp meeting point')}${li('yes', 'Drop-off at your door, station or airport')}${li('yes', 'Help with your luggage to the riad door')}${li('yes', 'Fuel and parking')}${li('yes', 'Bottled water in the car')}</ul></div>
            <div class="dt-card dt-inc__box dt-inc__box--no"><h3>Not included</h3><ul>${li('no', 'Lunch and drinks')}${li('no', 'Tips for the driver')}${li('no', 'A night on the way (we can book one)')}</ul></div>
            <div class="dt-card dt-inc__box dt-inc__box--info"><h3>Good to know</h3><ul>${li('info', 'This is a suggestion: tell us your preferences')}${li('info', 'Leave in the morning to arrive before dark')}${li('info', 'The Tichka pass has many bends: ask for the front seat')}${li('info', 'After heavy rain or snow, roads can close for a few hours; we wait or take another road')}${li('info', 'Tell us about child seats and big luggage when you book')}</ul></div>
          </div>
          <div class="dt-card dt-costs"><h3>Costs on the day</h3><ul class="dt-ticks">${li('coin', '<b>The transfer:</b> agreed before the day; nothing extra for stops')}${li('coin', '<b>Lunch:</b> about €10–15 each, where you choose')}${li('coin', '<b>Driver:</b> tips up to you')}</ul></div>
        </section>
        <section class="dt-block" id="gallery" aria-labelledby="dt-ga">
          <h2 class="dt-h2" id="dt-ga">Our Vehicles</h2>
          ${fleet}
        </section>
        <section class="dt-block" id="custom" aria-labelledby="dt-cu">
          <h2 class="dt-h2" id="dt-cu">Extras</h2>
          <p class="dt-lead">Tell us when you book and we arrange it.</p>
          <div class="dt-card"><ul class="dt-ticks dt-ticks--2">${li('yes', 'A visit on the way: the Todra Gorge or Aït Ben Haddou to Marrakech, Ifrane to Fes')}${li('yes', 'A night on the way: see our <a href="merzouga-to-marrakech-tour.html">3-day Merzouga to Marrakech tour</a>')}${li('yes', 'A night in the dunes first: our <a href="merzouga-desert-camp-camel-ride.html">desert camp and camel ride</a>')}${li('yes', 'The same transfer the other way, to Merzouga')}${li('yes', 'Straight to Errachidia airport, Casablanca or Rabat')}${li('yes', 'Child and baby seats, or a bigger car for lots of luggage')}</ul></div>
        </section>
        <section class="dt-block" id="reviews" aria-labelledby="dt-rv">
          <h2 class="dt-h2" id="dt-rv">Reviews</h2>
          ${revSum}
          ${reviewsBlock}
        </section>
        <section class="dt-block" id="faq" aria-labelledby="dt-fq">
          <h2 class="dt-h2" id="dt-fq">Frequently Asked Questions</h2>
          <div class="hfaq__list dt-faq">
${faqHtml}
          </div>
        </section>
      </div>
      <aside class="dt-aside" id="book" aria-label="Book this transfer">
        <div class="dt-book">
          <p class="dt-book__label">Private transfer</p>
          <p class="dt-book__price">Book Your Transfer</p>
          <p class="dt-book__note dt-book__note--price">The price depends on your destination, the number of travellers and the size of car you need.</p>
          <p class="dt-book__trust">${S(I.yes)}<span><b>Transparent pricing</b>What we agree on is what you pay.</span></p>
          <p class="dt-book__trust">${S(I.yes)}<span><b>Free cancellation</b>Up to 24 hours before the trip.</span></p>
          <form class="dt-form" data-wa="212621460083" onsubmit="return moroccoForm(this)">
            <div class="form-field dt-form__trip"><label for="dt-trip">Transfer</label><select id="dt-trip" name="trip"><option>Merzouga to Fes</option><option>Merzouga to Marrakech</option><option>Fes to Merzouga</option><option>Marrakech to Merzouga</option></select></div>
            <div class="dt-form__row">
              <div class="form-field"><label for="dt-name">Full name</label><input id="dt-name" name="name" autocomplete="name" required placeholder="Your name"></div>
              <div class="form-field"><label for="dt-email">Email</label><input id="dt-email" name="email" type="email" autocomplete="email" required placeholder="you@email.com"></div>
            </div>
            <div class="form-field"><label for="dt-phone">WhatsApp number</label><input id="dt-phone" name="phone" type="tel" autocomplete="tel" placeholder="With country code"></div>
            <div class="dt-form__row">
              <div class="form-field"><label for="dt-date">Date</label><input id="dt-date" name="date" type="date"></div>
              <div class="form-field"><label for="dt-people">Travellers</label><select id="dt-people" name="travellers"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10 or more</option></select></div>
            </div>
            <div class="form-field"><label for="dt-msg">Message</label><textarea id="dt-msg" name="message" rows="2" placeholder="Hotel or camp in Merzouga, drop-off address…"></textarea></div>
            <button class="hero-btn hero-btn--gold dt-form__send" type="submit">Send Request</button>
            <a class="hero-btn dt-form__wa" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20information%20about%20a%20private%20transfer%20from%20Merzouga." target="_blank" rel="noopener">${WA}Ask on WhatsApp</a>
            <p id="formMsg" class="dt-form__msg" role="status"></p>
            <p class="dt-form__privacy">Your details stay with our team only.</p>
          </form>
          <p class="dt-book__call">Prefer to talk? <a href="tel:+212621460083">${S('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a1 1 0 01-1 1A17 17 0 014 5a1 1 0 011-1z"/>')}+212 621 460 083</a></p>
        </div>
      </aside>
    </div>
  </section>
  <section class="section dt-others" id="others" aria-labelledby="dt-oth">
    <div class="wrap">
      <div class="head-row"><div><h2 id="dt-oth">More Ways to Leave Merzouga</h2></div></div>
      <div class="htours__track dt-others__track">
        <ul class="htours__list dt-others__list">
${others}
        </ul>
      </div>
    </div>
  </section>
  <section class="section dtl-combine" aria-labelledby="dtl-comb">
    <div class="wrap">
      <div class="dtl-combine__box">
        <span class="dtl-combine__ic">${S('<path d="M4 7h11M4 12h16M4 17h9"/><circle cx="19" cy="7" r="2"/><circle cx="17" cy="17" r="2"/>')}</span>
        <div class="dtl-combine__txt"><h2 id="dtl-comb">Want us to plan the rest of your trip?</h2><p>We add the transfer to your itinerary, with the camp, the hotels and the timings arranged.</p></div>
        <div class="dtl-combine__btns">
          <a class="hero-btn dtl-combine__wa" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20help%20planning%20my%20trip%20from%20Merzouga." target="_blank" rel="noopener">${WA}Chat on WhatsApp</a>
          <a class="hero-btn hero-btn--gold" href="../contact.html">Request a Quote</a>
        </div>
      </div>
    </div>
  </section>
  <section class="hcta" aria-labelledby="hcta-title">
    <img class="hcta__bg" src="/assets/images/erg-chebbi-caravan-sunset.jpg" alt="Camel caravan crossing the Erg Chebbi dunes at sunset" width="1800" height="1200" loading="lazy">
    <div class="hcta__inner">
      <h2 id="hcta-title">Leave the Desert Without the Stress</h2>
      <p class="hcta__sub">Tell us where you are and where you’re going; we reply on WhatsApp with your private transfer.</p>
      <div class="hcta__actions">
        <a class="hero-btn hero-btn--gold" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20to%20book%20a%20private%20transfer%20from%20Merzouga." target="_blank" rel="noopener">${WA}Chat on WhatsApp</a>
        <a class="hero-btn hcta__quote" href="../contact.html">${S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>')}Request a Quote</a>
      </div>
    </div>
  </section>
</main>`;

// ---------- head ----------
const TITLE = 'Merzouga to Fes or Marrakech Transfer | Private Car with Driver';
const DESC = 'Private transfer from Merzouga to Fes (about 8 hours) or Marrakech (9 to 10 hours): pick-up at your hotel or desert camp, stops when you ask, drop-off at your riad, station or airport.';
const URL = 'https://moroccotourshub.com/tours/merzouga-transfers.html';
const IMG = 'https://moroccotourshub.com/assets/images/merzouga-transfer-4x4-dunes.jpg';
const esc = s => s.replace(/&/g, '&amp;');
const j = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const ld = j({ '@context': 'https://schema.org', '@type': 'TaxiService', name: 'Private Transfer from Merzouga to Fes or Marrakech', description: DESC, url: URL, areaServed: ['Merzouga', 'Fes', 'Marrakech'], image: IMG, provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' } })
  + '\n' + j({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() } })) });
let head = shell.slice(0, shell.indexOf('<body'))
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(TITLE)}</title>`)
  .replace(/https:\/\/moroccotourshub\.com\/tours\/marrakech-airport-transfer\.html/g, URL)
  .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*"/g, `$1${DESC}"`)
  .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*"/g, `$1${esc(TITLE)}"`)
  .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${IMG}"`)
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"TaxiService"[\s\S]*?<\/script>/, ld);
let body = shell.slice(shell.indexOf('<body'));
let pre = body.slice(0, body.indexOf('<main>')).replace(/ class="is-active"/g, ' class=""')
  .replace('<a href="../sahara-desert-tours.html" class="">Desert Tours', '<a href="../sahara-desert-tours.html" class="is-active">Desert Tours');
let post = body.slice(body.indexOf('</main>') + 7)
  .replace(/<div class="dt-mbar">[\s\S]*?<\/div>/, m => m.replace(/<b>[^<]*<\/b>/, '<b>Merzouga Transfer</b>'));
fs.writeFileSync(path.join(ROOT, 'tours/merzouga-transfers.html'), head + pre + main + post);
console.log('written');
