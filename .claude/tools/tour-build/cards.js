// node cards.js <out.json> <file1.html> <file2.html> ... : grabs each tour's card (.htour) from any page and writes <li> list html
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const [outFile, ...want] = process.argv.slice(2);
const files = fs.readdirSync(root + 'tours').filter(f => f.endsWith('.html')).map(f => root + 'tours/' + f).concat([root + 'index.html']);
const texts = files.map(f => fs.readFileSync(f, 'utf8'));
const out = want.map(h => {
  for (const t of texts) {
    let i = t.indexOf('href="' + h + '"'); if (i < 0) i = t.indexOf('href="../tours/' + h + '"'); if (i < 0) i = t.indexOf('href="tours/' + h + '"');
    if (i < 0) continue;
    const a = t.lastIndexOf('<article class="htour">', i);
    if (a < 0 || i - a > 80) continue;
    const b = t.indexOf('</article>', i) + '</article>'.length;
    return '        <li>' + t.slice(a, b).replace(/href="(?:\.\.\/tours\/|tours\/)/, 'href="') + '</li>\n';
  }
  console.log('missing', h); return '';
});
fs.writeFileSync(outFile, JSON.stringify(out.join('')));
console.log('cards', out.filter(Boolean).length);
