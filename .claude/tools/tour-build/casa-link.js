// Link the Hassan II Mosque & Casablanca city tour (2026-11-19): Casablanca city page (new "Day Tours" section + chips) and sitemap.
// Skips what is already there.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SLUG = 'hassan-ii-mosque-casablanca-city-tour.html';
const cf = root + 'tours/morocco-tours-from-casablanca.html';
let c = fs.readFileSync(cf, 'utf8');
if (!c.includes(SLUG)) {
  const ph = c.indexOf('<section class="section" id="photography">');
  const card0 = c.slice(c.indexOf('<article class="htour">', ph), c.indexOf('</article>', ph) + 10);
  let card = card0
    .replace(/href="[^"]*"/, `href="../tours/${SLUG}"`)
    .replace(/<img src="[^"]*" alt="[^"]*" width="\d+" height="\d+"/, '<img src="/assets/images/casablanca.webp" alt="The Hassan II Mosque in Casablanca at dusk" width="4032" height="3024"')
    .replace(/(<\/svg>)11 Days(<\/span>)/, '$1Half day$2')
    .replace(/<h3 class="htour__title">[^<]*/, '<h3 class="htour__title">Hassan II Mosque &amp; Casablanca City Tour')
    .replace(/<p class="htour__desc">[^<]*/, '<p class="htour__desc">A guided visit inside the Hassan II Mosque, then the old medina, Art Deco downtown, the Habous quarter and the Corniche, with a local guide and your own car.')
    .replace(/<b>End:<\/b> Casablanca/, '<b>Length:</b> About 5 hours');
  if (card === card0) throw new Error('card unchanged');
  const sec = `<section class="section" id="day-tours"><div class="wrap">
    <div class="head-row"><div><h2>Day Tours <span style="color:var(--muted);font-weight:500">in Casablanca</span></h2><p>Half a day in the city, on arrival or before your tour.</p></div></div>
    <div class="tour-grid tour-grid--3">${card}</div>
  </div></section>
  `;
  c = c.replace('<section class="section cother"', sec + '<section class="section cother"');
  c = c.replace('<b>1</b></a></div></nav>', '<b>1</b></a><a href="#day-tours"><span class="cstart__cat"><span class="cstart__cat-name">Day Tours</span><small>Half a day in the city, on arrival or before your tour.</small></span><b>1</b></a></div></nav>');
  c = c.replace('<a href="#photography">Photography Tours <b>1</b></a>', '<a href="#photography">Photography Tours <b>1</b></a><a href="#day-tours">Day Tours <b>1</b></a>');
  fs.writeFileSync(cf, c); console.log('city page linked');
}
const sm = root + 'sitemap.xml'; let x = fs.readFileSync(sm, 'utf8');
if (!x.includes(SLUG)) { x = x.replace('</urlset>', `  <url><loc>https://moroccotourshub.com/tours/${SLUG}</loc><lastmod>2026-11-19</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>\n</urlset>`); fs.writeFileSync(sm, x); console.log('sitemap'); }
