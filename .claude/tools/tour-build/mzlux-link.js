// Link the luxury camp into the Merzouga hub (card after the desert camp, chip "Luxury Camp", ItemList position 2) and the sitemap.
// Skips what is already there.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const PAGE = 'merzouga-luxury-desert-camp.html';
const C = JSON.parse(fs.readFileSync(__dirname + '/mz-cards.json', 'utf8'))[PAGE];
let h = fs.readFileSync(root + 'destinations/merzouga.html', 'utf8');
if (!h.includes('id="mz-lux"')) {
  const card = C.trim().replace('<li>', '<li id="mz-lux">').replace(`href="${PAGE}"`, `href="../tours/${PAGE}"`);
  const i = h.indexOf('          <li id="mz-sunset">'); if (i < 0) throw new Error('sunset card');
  h = h.slice(0, i) + '          ' + card + '\n' + h.slice(i);
  const a = h.indexOf('<li><a href="#mz-camp">'); const b = h.indexOf('</li>', a) + 5; if (a < 0) throw new Error('chip');
  const chip = h.slice(a, b).replace('#mz-camp', '#mz-lux').replace(/<span>[^<]*<\/span>/, '<span>Luxury Camp</span>');
  h = h.slice(0, b) + chip + h.slice(b);
  h = h.replace(/(<script type="application\/ld\+json">)(\{"@context":"https:\/\/schema\.org","@type":"ItemList","name":"Things to do in Merzouga".*?)(<\/script>)/, (all, x, j, y) => {
    const o = JSON.parse(j);
    o.itemListElement.splice(1, 0, { '@type': 'ListItem', position: 0, url: 'https://moroccotourshub.com/tours/' + PAGE, name: 'Merzouga Luxury Desert Camp' });
    o.itemListElement.forEach((e, k) => e.position = k + 1);
    return x + JSON.stringify(o) + y;
  });
  fs.writeFileSync(root + 'destinations/merzouga.html', h);
  console.log('hub linked');
}
let sm = fs.readFileSync(root + 'sitemap.xml', 'utf8');
if (!sm.includes(PAGE)) {
  sm = sm.replace(/(  <url><loc>https:\/\/moroccotourshub\.com\/tours\/merzouga-camel-trek-2-nights\.html<\/loc>.*?<\/url>\n)/, `$1  <url><loc>https://moroccotourshub.com/tours/${PAGE}</loc><lastmod>2026-11-18</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`);
  fs.writeFileSync(root + 'sitemap.xml', sm); console.log('sitemap');
}
