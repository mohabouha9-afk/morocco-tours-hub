// Link the 2-night camel trek into the Merzouga hub (card after the sunset ride, chip, ItemList) and the sitemap. Skips what is there.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const C = JSON.parse(fs.readFileSync(__dirname + '/mz-cards.json', 'utf8'))['merzouga-camel-trek-2-nights.html'];
let h = fs.readFileSync(root + 'destinations/merzouga.html', 'utf8');
if (!h.includes('id="mz-trek"')) {
  const card = C.trim().replace('<li>', '<li id="mz-trek">').replace('href="merzouga-camel-trek-2-nights.html"', 'href="../tours/merzouga-camel-trek-2-nights.html"');
  const i = h.indexOf('          <li id="mz-quad">'); if (i < 0) throw new Error('quad card');
  h = h.slice(0, i) + '          ' + card + '\n' + h.slice(i);
  // chip: copy the sunset chip
  const m = h.match(/<li><a href="#mz-sunset">[\s\S]*?<\/li>/); if (!m) throw new Error('chip');
  h = h.replace(m[0], m[0] + m[0].replace('#mz-sunset', '#mz-trek').replace(/<span>[^<]*<\/span>/, '<span>Camel Trek</span>'));
  // ItemList
  h = h.replace(/(<script type="application\/ld\+json">)(\{"@context":"https:\/\/schema\.org","@type":"ItemList","name":"Things to do in Merzouga".*?)(<\/script>)/, (all, a, j, b) => {
    const o = JSON.parse(j);
    o.itemListElement.splice(2, 0, { '@type': 'ListItem', position: 0, url: 'https://moroccotourshub.com/tours/merzouga-camel-trek-2-nights.html', name: '2-Night Camel Trek in Merzouga' });
    o.itemListElement.forEach((x, k) => x.position = k + 1);
    return a + JSON.stringify(o) + b;
  });
  fs.writeFileSync(root + 'destinations/merzouga.html', h);
  console.log('hub linked');
}
let sm = fs.readFileSync(root + 'sitemap.xml', 'utf8');
if (!sm.includes('merzouga-camel-trek-2-nights')) {
  sm = sm.replace(/(  <url><loc>https:\/\/moroccotourshub\.com\/tours\/merzouga-transfers\.html<\/loc>.*?<\/url>\n)/, '$1  <url><loc>https://moroccotourshub.com/tours/merzouga-camel-trek-2-nights.html</loc><lastmod>2026-11-18</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n');
  fs.writeFileSync(root + 'sitemap.xml', sm); console.log('sitemap');
}
