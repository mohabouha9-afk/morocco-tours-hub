// Merzouga hub (2026-11-17, owner: "put all the desert tours here"): the 4-card "Desert Tours to Merzouga" grid becomes one slider
// row with all 20 desert tours from tours/index.html (#desert), same markup as the homepage "Sahara Desert Tours" row.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const f = root + 'destinations/merzouga.html';
let s = fs.readFileSync(f, 'utf8');
const IDX = fs.readFileSync(root + 'tours/index.html', 'utf8');
const HOME = fs.readFileSync(root + 'index.html', 'utf8');
const a = IDX.indexOf('id="desert"'); const b = IDX.indexOf('<section', a + 10); const sec = IDX.slice(a, b);
const cards = [...sec.matchAll(/<article class="htour[\s\S]*?<\/article>/g)].map(m => '<li>' + m[0] + '</li>');
if (cards.length !== 20) throw new Error('cards ' + cards.length);
const hi = HOME.indexOf('htours__list--slider'); const he = HOME.indexOf('</ul>', hi);
const navs = HOME.slice(he, HOME.indexOf('</div>', he)).match(/<button[\s\S]*?<\/button>/g).map(x => x.replace(/hdes-list/g, 'mz-tours-list').replace('Previous desert tours', 'Previous desert tours').replace('Next desert tours', 'Next desert tours'));
if (navs.length !== 2) throw new Error('navs');
const NEW = `  <section class="htours htours--desert mz-tours" id="desert-tours" aria-labelledby="mz-tours">
    <div class="wrap htours__in">
      <header class="hrev__head htours__head">
        <h2 id="mz-tours">Our Desert Tours</h2>
      </header>
      <div class="htours__track">
        <ul class="htours__list htours__list--slider" id="mz-tours-list">
${cards.map(c => '          ' + c.trim()).join('\n')}
        </ul>
        ${navs[0]}
        ${navs[1]}
      </div>
    </div>
  </section>`;
const si = s.indexOf('  <section class="section dtl-list" id="desert-tours"'); const se = s.indexOf('</section>', si) + '</section>'.length;
if (si < 0) throw new Error('old section');
s = s.slice(0, si) + NEW + s.slice(se);
fs.writeFileSync(f, s);
console.log('ok', cards.length, (s.match(/htour__link/g) || []).length);
