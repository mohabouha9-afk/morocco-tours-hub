// Builds tours/casablanca-to-marrakech-transfer.html — private transfer Casablanca ⇄ Marrakech, both directions on one page.
// Roadmap item 15 ("Casablanca → Marrakech private transfer", 1,600 on file). Derived from build-mtr.js (Merzouga transfers);
// shell = tours/marrakech-airport-transfer.html. Research: .claude/research/casablanca-marrakech-transfer-research.md
// Then run: node .claude/tools/route-map.mjs tours/casablanca-to-marrakech-transfer.html casa-mk
// Don't re-run on the finished page once it has been edited by hand. No prices on the page (site rule).
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const shell = rd('tours/marrakech-airport-transfer.html');
const idx = rd('tours/index.html');
const dtp = rd('day-trips.html');
const casa = rd('tours/morocco-tours-from-casablanca.html');

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
  ['Before you travel', 'Send your flight or address', 'Your flight number and landing time, or your pick-up address and time. The evening before, you get your driver’s name and number on WhatsApp.'],
  ['At Mohammed V airport', 'Your name on a sign', 'Your driver waits in the arrivals hall after customs. We track your flight, so a late landing or a long queue at passport control costs nothing extra.'],
  ['In Casablanca', 'Or pick-up at your door', 'From your hotel, the port or Casa Voyageurs station. Want to see the Hassan II Mosque first? We stop there before the motorway (see Extras).'],
  ['On the A7', 'About three hours of motorway', 'A smooth toll motorway all the way, with no mountain bends. Coffee or a toilet stop at a motorway rest area whenever you ask.'],
  ['Arriving in Marrakech', 'To your hotel or riad door', 'Cars cannot enter the medina lanes, so your driver parks at the nearest gate and helps you with the bags to the riad door.'],
  ['The other way', 'Marrakech to Casablanca or your flight', 'Pick-up at your riad gate or hotel. For a flight from Casablanca, we usually leave Marrakech about 6 hours before departure, so you reach the airport 3 hours ahead.']
];
const stepsHtml = STEPS.map((s, i) => `            <li><span class="dt-prog__n" aria-hidden="true">${i + 1}</span><details class="dt-prog__card"${i === 0 ? ' open' : ''}><summary><span class="dt-prog__t">${s[0]}</span><h3>${s[1]}</h3><span class="dt-prog__ic" aria-hidden="true">${I.plus}</span></summary><p>${s[2]}</p></details></li>`).join('\n');

const FAQ = [
  ['What if my flight is late or we land at night?', 'Your driver still waits. We follow your flight, so the pick-up moves with the real landing time, and we meet every flight, day or night. A night arrival means a quiet motorway: you are in Marrakech about three hours later.'],
  ['Can we stop at the Hassan II Mosque on the way?', 'Yes. The guided visit inside takes about an hour at set times (fewer on Fridays and in Ramadan), and the ticket is 140 MAD. Your luggage stays locked in the car with the driver. For more of the city, add our <a href="hassan-ii-mosque-casablanca-city-tour.html">Casablanca city tour</a> before the drive.'],
  ['We fly home from Casablanca. When do we leave Marrakech?', 'Usually about 6 hours before departure: around 3 hours on the road with a short stop, and 3 hours at the airport for check-in and security. For a morning flight we leave Marrakech in the night, so tell us your flight time and we plan it with you.'],
  ['Is three hours in the car tiring?', 'It is an easy drive: a straight, flat motorway with rest areas along the way. The car is air-conditioned, there is water on board, and you stop whenever you want.'],
  ['Can you also drive us to Rabat, Fes or Essaouira?', 'Yes, we drive between any two cities in Morocco. Tell us your route, or turn the drive into a trip with one of our <a href="morocco-tours-from-casablanca.html">tours from Casablanca</a>.'],
  ['How do I book and pay?', '<ol class="dt-steps"><li><b>Send your request</b> with the form or on WhatsApp: date, flight or pick-up place, and destination.</li><li><b>Pay a small deposit</b> to confirm; the rest is paid to your driver, in cash or by card.</li></ol><p>Cancellation is free up to 24 hours before.</p>']
];
const faqHtml = FAQ.map((q, i) => `          <details class="hfaq-item"${i === 0 ? ' open' : ''}><summary><h3>${q[0]}</h3><span class="hfaq-item__ic" aria-hidden="true">${I.plus}</span></summary><div class="hfaq-item__a">${q[1].startsWith('<') ? q[1] : '<p>' + q[1] + '</p>'}</div></details>`).join('\n');

// related cards: Casablanca city tour (before the drive), medina tour (first day in Marrakech), 6-day Casablanca → Marrakech tour
function card(src, slug) {
  const m = src.match(new RegExp('<article class="htour[^"]*"><a class="htour__link" href="(?:\\.\\./)?(?:tours/)?' + slug + '\\.html">'));
  if (!m) throw new Error('card missing ' + slug);
  const i = m.index;
  return src.slice(i, src.indexOf('</article>', i) + 10)
    .replace(/href="(?:\.\.\/)?tours\//g, 'href="').replace(/src="assets\//g, 'src="/assets/');
}
const others = [card(casa, 'hassan-ii-mosque-casablanca-city-tour'), card(dtp, 'marrakech-medina-guided-tour'), card(idx, '6-day-casablanca-to-marrakech-tour')].map(c => `          <li>${c}</li>`).join('\n');

const reviewsBlock = shell.slice(shell.indexOf('<div class="dt-revs">'), shell.indexOf('</section>', shell.indexOf('<div class="dt-revs">')));
const revSum = shell.match(/<p class="dt-revs__sum">[\s\S]*?<\/p>/)[0];
const WA = shell.match(/<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12\.04[^"]*"\/><\/svg>/)[0];
const fleet = shell.match(/<div class="dt-gal dt-gal--3">[\s\S]*?<\/div>/)[0];

const routeCard = (cls, title, sub, facts, stops, drop) => `            <article class="dt-card mtr-route ${cls}">
              <h3>${title}<small>${sub}</small></h3>
              <dl class="mtr-route__facts">${facts.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl>
              <ol class="mtr-route__stops">${stops.map(s => `<li>${s}</li>`).join('')}</ol>
              <p class="mtr-route__drop">${S(I.door)}<span>${drop}</span></p>
            </article>`;

const main = `<main>
  <section class="page-hero dt-hero cmk-hero">
    <div class="page-hero__bg"><img src="/assets/images/casablanca.webp" alt="The Hassan II Mosque and its minaret by the Atlantic in Casablanca at dusk" width="4032" height="3024" loading="eager" fetchpriority="high"></div>
    <div class="wrap page-hero__inner">
      <nav class="breadcrumb"><a href="../index.html">Home</a><span class="sep">›</span><a href="morocco-tours-from-casablanca.html">Tours from Casablanca</a><span class="sep">›</span><span>Transfer to Marrakech</span></nav>
      <span class="dt-hero__loc">${S(I.pin)}Casablanca</span>
      <h1>Private Transfer Between Casablanca and Marrakech<span class="script">Door to door in about three hours</span></h1>
      <ul class="dt-facts">
        <li>${S(I.pin)}<span><small>Route</small><b>Both directions</b></span></li>
        <li>${S(I.door)}<span><small>Pick-up</small><b>Airport, hotel or port</b></span></li>
        <li>${S(I.shield)}<span><small>Format</small><b>Private car</b></span></li>
        <li>${S(I.cal)}<span><small>Availability</small><b>Every day</b></span></li>
      </ul>
    </div>
  </section>
  <nav class="dtnav" aria-label="On this page"><div class="wrap dtnav__in">
    <a href="#overview">Overview</a><a href="#routes">Both Directions</a><a href="#programme">How It Works</a><a href="#included">What’s Included</a><a href="#gallery">Our Vehicles</a><a href="#custom">Extras</a><a href="#reviews">Reviews</a><a href="#faq">FAQ</a><a href="#others">You May Also Like</a>
  </div></nav>
  <section class="section dt-body">
    <div class="wrap dt-grid">
      <div class="dt-main">
        <section class="dt-block" id="overview" aria-labelledby="dt-ov">
          <h2 class="dt-h2" id="dt-ov">Overview</h2>
          <p class="dt-lead">Most long-haul flights to Morocco land in Casablanca, and most travellers want to be in Marrakech. Your driver meets you in arrivals at Mohammed V airport, or at your Casablanca hotel, and takes you straight to Marrakech on the motorway. No train change at Casa Voyageurs, no haggling for a taxi after a long flight.</p>
          <p class="dt-lead">The same car runs the other way: from your riad or hotel in Marrakech to Casablanca, or straight to the airport for your flight home, timed so you arrive with hours to spare.</p>
          <dl class="dt-glance"><div>${S(I.clock)}<dt>Drive</dt><dd>About 3 hours</dd></div><div>${S(I.car)}<dt>Road</dt><dd>240 km of motorway</dd></div><div>${S(I.pin)}<dt>At the airport</dt><dd>Name sign in arrivals</dd></div><div>${S(I.shield)}<dt>Late flights</dt><dd>Tracked, nothing extra</dd></div><div>${S(I.door)}<dt>Drop-off</dt><dd>Riad door or airport</dd></div><div>${S(I.card)}<dt>Cancellation</dt><dd>Free up to 24 h before</dd></div></dl>
        </section>
        <section class="dt-block" id="routes" aria-labelledby="dt-ro">
          <h2 class="dt-h2" id="dt-ro">Both Directions</h2>
          <div class="mtr-routes">
${routeCard('cmk-route--south', 'Casablanca to Marrakech', 'From the airport or the city', [['From the airport', 'About 2 h 45'], ['From the city', 'About 3 hours']], ['Mohammed V airport or your hotel', 'A7 motorway south', 'Coffee stop on the way', 'Marrakech'], 'Hotel, riad gate with help for the bags, or Menara airport')}
${routeCard('cmk-route--north', 'Marrakech to Casablanca', 'To the city or your flight', [['To the airport', 'About 2 h 45'], ['To the city', 'About 3 hours']], ['Your riad gate or hotel', 'A7 motorway north', 'Coffee stop on the way', 'Casablanca'], 'Hotel, port, Casa Voyageurs station or Mohammed V airport')}
          </div>
          <h3 class="dt-h3">Route Map</h3>
          <div class="dt-map"></div>
          <p class="dt-map__note">${S(I.pin)}<span>The airport sits south of Casablanca, so from arrivals the drive is about 15 minutes shorter.</span></p>
          <h3 class="dt-h3">Train, Taxi or Private Car?</h3>
          <div class="dt-acc-wrap">
            <table class="dt-acc sdh-table cmk-table">
              <thead><tr><th scope="col">From the airport</th><th scope="col">Time to Marrakech</th><th scope="col">What to expect</th></tr></thead>
              <tbody>
                <tr><th scope="row">Train<small>Cheapest, if you travel light</small></th><td>About 3.5 hours or more</td><td>Change at Casa Voyageurs, where the wait can be long; airport trains run from about 07:00 to 23:00; then a taxi to your riad</td></tr>
                <tr><th scope="row">Taxi<small>From the rank outside arrivals</small></th><td>About 3 hours</td><td>The fare is bargained on the spot, after a long flight; ignore touts inside the terminal</td></tr>
                <tr><th scope="row">Private car<small>With us</small></th><td>About 3 hours, door to door</td><td>Price agreed before you fly, driver waiting however late you land, bags carried to your riad door</td></tr>
              </tbody>
            </table>
          </div>
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
            <div class="dt-card dt-inc__box dt-inc__box--yes"><h3>Included</h3><ul>${li('yes', 'Private air-conditioned car and driver (see <a href="../index.html#fleet">our fleet</a>)')}${li('yes', 'Meeting in arrivals, or pick-up at your hotel, port or station')}${li('yes', 'Flight tracking and waiting for late flights')}${li('yes', 'Drop-off at your door, station or airport')}${li('yes', 'Help with your luggage to the riad door')}${li('yes', 'Motorway tolls, fuel and parking')}${li('yes', 'Bottled water in the car')}</ul></div>
            <div class="dt-card dt-inc__box dt-inc__box--no"><h3>Not included</h3><ul>${li('no', 'Meals and drinks on the way')}${li('no', 'Hassan II Mosque ticket, if you stop')}${li('no', 'Tips for the driver')}</ul></div>
            <div class="dt-card dt-inc__box dt-inc__box--info"><h3>Good to know</h3><ul>${li('info', 'Casablanca traffic is heaviest on weekdays, 7–9 am and 4–7 pm: we plan around it')}${li('info', 'Send your flight number, not only the time')}${li('info', 'Tell us about child seats and big luggage when you book')}${li('info', 'Arriving with surfboards, bikes or golf bags? We send a bigger car')}</ul></div>
          </div>
          <div class="dt-card dt-costs"><h3>Costs on the day</h3><ul class="dt-ticks">${li('coin', '<b>The transfer:</b> agreed before you travel; nothing extra for a late flight or stops')}${li('coin', '<b>Hassan II Mosque:</b> 140 MAD, only if you stop for the visit')}${li('coin', '<b>Coffee or a snack:</b> a few euros at a rest area')}${li('coin', '<b>Driver:</b> tips up to you')}</ul></div>
        </section>
        <section class="dt-block" id="gallery" aria-labelledby="dt-ga">
          <h2 class="dt-h2" id="dt-ga">Our Vehicles</h2>
          ${fleet}
        </section>
        <section class="dt-block" id="custom" aria-labelledby="dt-cu">
          <h2 class="dt-h2" id="dt-cu">Extras</h2>
          <p class="dt-lead">Tell us when you book and we arrange it.</p>
          <div class="dt-card"><ul class="dt-ticks dt-ticks--2">${li('yes', 'The Hassan II Mosque on the way, or our <a href="hassan-ii-mosque-casablanca-city-tour.html">Casablanca city tour</a> first')}${li('yes', 'The coast road by El Jadida and its Portuguese old town')}${li('yes', 'Straight on to Essaouira, Agadir or the Agafay desert')}${li('yes', 'Your first morning in Marrakech: our <a href="marrakech-medina-guided-tour.html">medina guided tour</a>')}${li('yes', 'More than a transfer: our <a href="6-day-casablanca-to-marrakech-tour.html">6-day Casablanca to Marrakech tour</a>')}${li('yes', 'Child and baby seats, or a bigger car for lots of luggage')}</ul></div>
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
          <p class="dt-book__note dt-book__note--price">The price depends on your pick-up place, the number of travellers and the size of car you need.</p>
          <p class="dt-book__trust">${S(I.yes)}<span><b>Transparent pricing</b>What we agree on is what you pay.</span></p>
          <p class="dt-book__trust">${S(I.yes)}<span><b>Free cancellation</b>Up to 24 hours before the trip.</span></p>
          <form class="dt-form" data-wa="212621460083" onsubmit="return moroccoForm(this)">
            <div class="form-field dt-form__trip"><label for="dt-trip">Transfer</label><select id="dt-trip" name="trip"><option>Casablanca airport to Marrakech</option><option>Casablanca city to Marrakech</option><option>Marrakech to Casablanca airport</option><option>Marrakech to Casablanca city</option></select></div>
            <div class="dt-form__row">
              <div class="form-field"><label for="dt-name">Full name</label><input id="dt-name" name="name" autocomplete="name" required placeholder="Your name"></div>
              <div class="form-field"><label for="dt-email">Email</label><input id="dt-email" name="email" type="email" autocomplete="email" required placeholder="you@email.com"></div>
            </div>
            <div class="form-field"><label for="dt-phone">WhatsApp number</label><input id="dt-phone" name="phone" type="tel" autocomplete="tel" placeholder="With country code"></div>
            <div class="dt-form__row">
              <div class="form-field"><label for="dt-date">Date</label><input id="dt-date" name="date" type="date"></div>
              <div class="form-field"><label for="dt-people">Travellers</label><select id="dt-people" name="travellers"><option>1</option><option selected>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10 or more</option></select></div>
            </div>
            <div class="form-field"><label for="dt-msg">Message</label><textarea id="dt-msg" name="message" rows="2" placeholder="Flight number and time, or pick-up address…"></textarea></div>
            <button class="hero-btn hero-btn--gold dt-form__send" type="submit">Send Request</button>
            <a class="hero-btn dt-form__wa" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20information%20about%20a%20private%20transfer%20between%20Casablanca%20and%20Marrakech." target="_blank" rel="noopener">${WA}Ask on WhatsApp</a>
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
      <div class="head-row"><div><h2 id="dt-oth">You May Also Like</h2></div></div>
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
        <div class="dtl-combine__txt"><h2 id="dtl-comb">Want us to plan the rest of your trip?</h2><p>We add the transfer to your itinerary, with the hotels, the day trips and the timings arranged.</p></div>
        <div class="dtl-combine__btns">
          <a class="hero-btn dtl-combine__wa" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20help%20planning%20my%20trip%20from%20Casablanca." target="_blank" rel="noopener">${WA}Chat on WhatsApp</a>
          <a class="hero-btn hero-btn--gold" href="../contact.html">Request a Quote</a>
        </div>
      </div>
    </div>
  </section>
  <section class="hcta" aria-labelledby="hcta-title">
    <img class="hcta__bg" src="/assets/images/jemaa-el-fna-evening-aerial.jpg" alt="Jemaa el-Fnaa square in Marrakech at dusk" width="1600" height="1067" loading="lazy">
    <div class="hcta__inner">
      <h2 id="hcta-title">From Your Flight to Marrakech, No Stress</h2>
      <p class="hcta__sub">Send us your flight or your address; we reply on WhatsApp with your private transfer.</p>
      <div class="hcta__actions">
        <a class="hero-btn hero-btn--gold" href="https://wa.me/212621460083?text=Hello!%20I'd%20like%20to%20book%20a%20private%20transfer%20between%20Casablanca%20and%20Marrakech." target="_blank" rel="noopener">${WA}Chat on WhatsApp</a>
        <a class="hero-btn hcta__quote" href="../contact.html">${S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>')}Request a Quote</a>
      </div>
    </div>
  </section>
</main>`;

// ---------- head ----------
const TITLE = 'Casablanca to Marrakech Transfer | Private Driver, Both Ways';
const DESC = 'Private transfer between Casablanca and Marrakech, about 3 hours by motorway: name sign in arrivals at Mohammed V airport, flight tracked, drop-off at your riad door, and the same car back to Casablanca or your flight.';
const URL = 'https://moroccotourshub.com/tours/casablanca-to-marrakech-transfer.html';
const IMG = 'https://moroccotourshub.com/assets/images/casablanca.webp';
const esc = s => s.replace(/&/g, '&amp;');
const j = o => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const ld = j({ '@context': 'https://schema.org', '@type': 'TaxiService', name: 'Private Transfer Between Casablanca and Marrakech', description: DESC, url: URL, areaServed: ['Casablanca', 'Mohammed V International Airport', 'Marrakech'], image: IMG, provider: { '@type': 'TravelAgency', name: 'Morocco Tours Hub', url: 'https://moroccotourshub.com', telephone: '+212 621 460 083' } })
  + '\n' + j({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(q => ({ '@type': 'Question', name: q[0], acceptedAnswer: { '@type': 'Answer', text: q[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').replace(/ ([.,:;])/g, '$1').trim() } })) });
let head = shell.slice(0, shell.indexOf('<body'))
  .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(TITLE)}</title>`)
  .replace(/https:\/\/moroccotourshub\.com\/tours\/marrakech-airport-transfer\.html/g, URL)
  .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*"/g, `$1${DESC}"`)
  .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*"/g, `$1${esc(TITLE)}"`)
  .replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*"/g, `$1${IMG}"`)
  .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"TaxiService"[\s\S]*?<\/script>(\s*<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"FAQPage"[\s\S]*?<\/script>)?/, ld);
let body = shell.slice(shell.indexOf('<body'));
let pre = body.slice(0, body.indexOf('<main>'));
let post = body.slice(body.indexOf('</main>') + 7)
  .replace(/<div class="dt-mbar">[\s\S]*?<\/div>/, m => m.replace(/<b>[^<]*<\/b>/, '<b>Casablanca ⇄ Marrakech</b>'));
fs.writeFileSync(path.join(ROOT, 'tours/casablanca-to-marrakech-transfer.html'), head + pre + main + post);
console.log('written');
