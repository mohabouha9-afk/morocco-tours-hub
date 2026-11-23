// Link the Fes day trips, medina tour and airport transfer (2026-11-23):
// Fes city page (new "Day Trips & Transfers" section + chips), Fes destination page (new section), sitemap.
// Run once after the pages exist (and again after adding a page to CARDS); skips what is already there.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const CARDS = [
  { slug: 'fes-to-chefchaouen-day-trip.html', img: '/assets/images/chefchaouen-blue-steps.jpg', w: 800, h: 900,
    alt: 'The blue steps of the Chefchaouen medina in the Rif Mountains', len: 'Full day',
    title: 'Fes to Chefchaouen Day Trip',
    desc: 'The blue city in the Rif: a guided walk through the medina, the Kasbah and Ras El Maa, free time for photos and lunch, back in Fes by evening.',
    f2: '<b>Drive:</b> About 3.5 h each way' },
  { slug: 'fes-volubilis-meknes-day-trip.html', img: '/assets/images/ait-ben-haddou-kasbah.jpg', w: 800, h: 600,
    alt: 'Volubilis, Moulay Idriss and Meknes day trip from Fes', len: 'Full day',
    title: 'Volubilis, Moulay Idriss &amp; Meknes Day Trip',
    desc: 'Roman mosaics at Volubilis, the holy town of Moulay Idriss and the gates and granaries of Meknes, in one private day from Fes.',
    f2: '<b>Drive:</b> About 1.5 h to Volubilis' },
  { slug: 'fes-medina-guided-tour.html', img: '/assets/images/fes-royal-palace-gates.jpg', w: 1300, h: 866,
    alt: 'The golden gates of the Royal Palace in Fes', len: 'Half day',
    title: 'Guided Tour of the Fes Medina',
    desc: 'The Royal Palace gates, Bou Inania and Al-Attarine madrasas, the souks and the Chouara tannery from a rooftop, with no shop stops.',
    f2: '<b>Walk:</b> About 2 km, mostly downhill' },
  { slug: 'fes-airport-transfer.html', img: '/assets/images/fes-medina.jpg', w: 1200, h: 800,
    alt: 'The Fes medina near Bab Boujeloud', len: 'Transfer',
    title: 'Fes Airport Transfer (FEZ)',
    desc: 'Your driver tracks the flight, meets you with a name sign and walks you to your riad door. Every flight, day or night.',
    f2: '<b>Drive:</b> 20 to 25 min' },
];
// Middle Atlas day trip: added to CARDS once the page exists
if (fs.existsSync(root + 'tours/fes-middle-atlas-ifrane-azrou-day-trip.html')) CARDS.splice(2, 0,
  { slug: 'fes-middle-atlas-ifrane-azrou-day-trip.html', img: '/assets/images/atlas-mountains.jpeg', w: 800, h: 600,
    alt: 'Middle Atlas day trip from Fes to Ifrane and the Azrou cedar forest', len: 'Full day',
    title: 'Middle Atlas Day Trip: Ifrane &amp; Azrou',
    desc: 'Alpine-style Ifrane, the cedar forest of Azrou and its Barbary macaques, and lunch in the mountains, in one easy day from Fes.',
    f2: '<b>Drive:</b> About 1 h to Ifrane' });

const cf = root + 'tours/morocco-tours-from-fes.html';
let c = fs.readFileSync(cf, 'utf8');
const nb = c.indexOf('<section class="section" id="northern">');
const card0 = c.slice(c.indexOf('<article class="htour">', nb), c.indexOf('</article>', nb) + 10);
const mk = (k, pre) => {
  const card = card0
    .replace(/href="[^"]*"/, `href="${pre}tours/${k.slug}"`)
    .replace(/<img src="[^"]*" alt="[^"]*" width="\d+" height="\d+"/, `<img src="${k.img}" alt="${k.alt}" width="${k.w}" height="${k.h}"`)
    .replace(/(<\/svg>)3 Days(<\/span>)/, `$1${k.len}$2`)
    .replace(/<h3 class="htour__title">[^<]*/, `<h3 class="htour__title">${k.title}`)
    .replace(/<p class="htour__desc">[^<]*/, `<p class="htour__desc">${k.desc}`)
    .replace(/<b>End:<\/b> Fes/, k.f2);
  if (card === card0 || !card.includes(k.len)) throw new Error('card unchanged ' + k.slug);
  return card;
};
const SUB = 'Day trips, a guided medina walk and your airport pick-up.';
const grid = pre => CARDS.map(k => mk(k, pre)).join('');
if (!c.includes('id="daytrips"')) {
  const sec = `<section class="section" id="daytrips"><div class="wrap">
    <div class="head-row"><div><h2>Day Trips &amp; Transfers <span style="color:var(--muted);font-weight:500">from Fes</span></h2><p>${SUB}</p></div><a class="link-more" href="../destinations/fes.html">Discover Fes <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>
    <div class="tour-grid tour-grid--3">${grid('../')}</div>
  </div></section>
  `;
  c = c.replace('<section class="section cother"', sec + '<section class="section cother"');
  c = c.replace('<b>2</b></a></div></nav>', `<b>2</b></a><a href="#daytrips"><span class="cstart__cat"><span class="cstart__cat-name">Day Trips &amp; Transfers</span><small>${SUB}</small></span><b>${CARDS.length}</b></a></div></nav>`);
  c = c.replace('<a href="#northern">Northern Morocco Tours <b>2</b></a>', `<a href="#northern">Northern Morocco Tours <b>2</b></a><a href="#daytrips">Day Trips &amp; Transfers <b>${CARDS.length}</b></a>`);
  if (!c.includes('href="#daytrips"')) throw new Error('chips not added');
} else {
  // refresh the grid and counts (e.g. after a new page joins CARDS)
  c = c.replace(/(<section class="section" id="daytrips">[\s\S]*?<div class="tour-grid tour-grid--3">)[\s\S]*?(<\/div>\n  <\/div><\/section>)/, (m, a, b) => a + grid('../') + b);
  c = c.replace(/(href="#daytrips">[\s\S]*?<b>)\d+(<\/b>)/g, `$1${CARDS.length}$2`);
}
fs.writeFileSync(cf, c); console.log('city page linked:', CARDS.length);

const df = root + 'destinations/fes.html';
let d = fs.readFileSync(df, 'utf8');
const dsec = `<section class="section" id="fes-daytrips"><div class="wrap">
    <div class="head-row"><div><h2>Day Trips &amp; Experiences from Fes</h2><p>${SUB}</p></div><a class="link-more" href="../tours/morocco-tours-from-fes.html">All tours from Fes <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></div>
    <div class="tour-grid tour-grid--3">${grid('../')}</div>
  </div></section>
  `;
if (!d.includes('id="fes-daytrips"')) d = d.replace('<section class="section reviews">', dsec + '<section class="section reviews">');
else d = d.replace(/<section class="section" id="fes-daytrips">[\s\S]*?<\/div><\/section>\n  /, dsec);
if (!d.includes('id="fes-daytrips"')) throw new Error('destination not linked');
fs.writeFileSync(df, d); console.log('destination linked');

const sm = root + 'sitemap.xml'; let x = fs.readFileSync(sm, 'utf8');
for (const k of CARDS) if (!x.includes(k.slug)) { x = x.replace('</urlset>', `  <url><loc>https://moroccotourshub.com/tours/${k.slug}</loc><lastmod>2026-11-23</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n</urlset>`); console.log('sitemap +', k.slug); }
fs.writeFileSync(sm, x);
