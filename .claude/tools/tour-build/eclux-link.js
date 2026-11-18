// Link the Erg Chigaga luxury camp page from the 3 Erg Chigaga tours (accommodation note), the Merzouga luxury camp (Make It Your Own) and the sitemap.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const P = 'erg-chigaga-luxury-desert-camp.html';
for (const t of ['3-day-marrakech-erg-chigaga-tour', '4-day-marrakech-erg-chigaga-tour', '7-day-marrakech-erg-chigaga-merzouga-tour']) {
  const f = root + 'tours/' + t + '.html'; let s = fs.readFileSync(f, 'utf8');
  if (s.includes(`href="${P}"`)) continue;
  const old = 'Or similar, depending on availability. Prefer another hotel or camp? Tell us when you book.';
  if (!s.includes(old)) throw new Error('note ' + t);
  s = s.replace(old, `Or similar, depending on availability. Prefer another hotel or camp? Tell us when you book. <a href="${P}">More about our Erg Chigaga luxury camp</a>.`);
  fs.writeFileSync(f, s); console.log('linked', t);
}
{ const f = root + 'tours/merzouga-luxury-desert-camp.html'; let s = fs.readFileSync(f, 'utf8');
  if (!s.includes(`href="${P}"`)) { s = s.replace('<span>A second night at the camp</span>', `<span>A second night at the camp</span></li><li>${s.match(/<li>(<svg[^>]*>[\s\S]*?<\/svg>)<span>A second night at the camp/)[1]}<span>Or a remoter night: our <a href="${P}">Erg Chigaga luxury camp</a></span>`); fs.writeFileSync(f, s); console.log('linked merzouga lux'); } }
let sm = fs.readFileSync(root + 'sitemap.xml', 'utf8');
if (!sm.includes(P)) { sm = sm.replace(/(  <url><loc>https:\/\/moroccotourshub\.com\/tours\/merzouga-luxury-desert-camp\.html<\/loc>.*?<\/url>\n)/, `$1  <url><loc>https://moroccotourshub.com/tours/${P}</loc><lastmod>2026-11-18</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`); fs.writeFileSync(root + 'sitemap.xml', sm); console.log('sitemap'); }
