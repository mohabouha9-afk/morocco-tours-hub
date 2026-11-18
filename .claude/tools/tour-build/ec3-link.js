// Links tours/3-day-marrakech-erg-chigaga-tour.html: a card after the 2-day Zagora card on tours/index.html (Marrakech + Sahara
// sections), the Marrakech city page and the homepage Sahara row; chip counts on tours/index; sitemap. Skips files that have it.
const fs = require('fs');
const F = '3-day-marrakech-erg-chigaga-tour.html';
const NAME = '3-Day Marrakech to Erg Chigaga Desert Tour';
const DESC = 'Off-road by 4×4 to the wildest dunes: Aït Ben Haddou, the Draa Valley, a sunset camel ride and a camp in Erg Chigaga, back across the Iriqui dry lake.';
function addAfterZagora(file) {
  let s = fs.readFileSync(file, 'utf8');
  if (s.includes(F + '"')) { console.log('skip', file); return; }
  let n = 0, from = 0;
  for (;;) {
    const i = s.indexOf('2-day-marrakech-to-zagora-desert-tour.html"', from); if (i < 0) break;
    const a = s.lastIndexOf('<article class="htour">', i); const b = s.indexOf('</article>', i) + '</article>'.length;
    let card = s.slice(a, b)
      .replace('2-day-marrakech-to-zagora-desert-tour.html', F)
      .replace(/src="\/assets\/images\/desert-acacia-camels\.jpg" alt="[^"]*" width="\d+" height="\d+"/, `src="/assets/images/desert-camel-acacia-tree.jpg" alt="${NAME}" width="1300" height="867"`)
      .replace(/(<\/svg>)2 Days(<\/span>)/, '$13 Days$2')
      .replace(/<h3 class="htour__title">[^<]*<\/h3>/, `<h3 class="htour__title">${NAME}</h3>`)
      .replace(/<p class="htour__desc">[^<]*<\/p>/, `<p class="htour__desc">${DESC}</p>`);
    if (!card.includes(F) || !card.includes('desert-camel-acacia-tree') || !card.includes('3 Days')) throw new Error('card ' + file);
    // homepage/city pages may wrap cards in <li>
    const wrapped = s.slice(b, b + 12).startsWith('</li>');
    const ins = wrapped ? '</li>\n          <li>' + card : card;
    const at = wrapped ? b : b;
    s = s.slice(0, at) + ins + s.slice(at); n++; from = at + ins.length + 1;
  }
  if (file === 'tours/index.html') {
    s = s.replace('<a href="#morocco-tours-from-marrakech"><span>Marrakech</span><b>38</b>', '<a href="#morocco-tours-from-marrakech"><span>Marrakech</span><b>39</b>')
      .replace('<a href="#desert"><span>Sahara Desert</span><b>27</b>', '<a href="#desert"><span>Sahara Desert</span><b>28</b>');
  }
  fs.writeFileSync(file, s); console.log(file, n);
}
['tours/index.html', 'tours/morocco-tours-from-marrakech.html', 'index.html'].forEach(addAfterZagora);
let sm = fs.readFileSync('sitemap.xml', 'utf8');
if (!sm.includes(F)) { sm = sm.replace(/(  <url><loc>https:\/\/moroccotourshub\.com\/tours\/2-day-marrakech-to-zagora-desert-tour\.html<\/loc>[^\n]*\n)/, `$1  <url><loc>https://moroccotourshub.com/tours/${F}</loc><lastmod>2026-11-18</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>\n`); fs.writeFileSync('sitemap.xml', sm); console.log('sitemap', sm.includes(F)); }
