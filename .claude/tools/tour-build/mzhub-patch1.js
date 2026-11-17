// Owner edits on the Merzouga hub (2026-11-17), applied to the finished page (build-mzhub.js is now out of date; don't re-run it):
// 1) short overview after the trust strip (keyword text for later), 2) Combine Them = 4 cards (2×2 on phones), 3) FAQ next to 4 blog posts.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const f = root + 'destinations/merzouga.html';
let s = fs.readFileSync(f, 'utf8');
const HOME = fs.readFileSync(root + 'index.html', 'utf8');
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(x => x.endsWith('.html')).map(x => fs.readFileSync(root + d + x, 'utf8'))).join('');
function dims(n) { const mm = HTMLS.match(new RegExp(n.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + n); return [mm[1], mm[2]]; }
function rep(a, b, label) { if (!s.includes(a)) throw new Error('missing: ' + label); s = s.replace(a, b); }

// 1) overview
rep('  <nav class="tbar tbar--dt"', `  <section class="section cstart mz-intro" aria-labelledby="mz-intro-title"><div class="wrap">
    <div class="cstart__intro">
      <h2 class="cstart__title" id="mz-intro-title">Merzouga and the Erg Chebbi Dunes</h2>
      <p>Merzouga is a small village on the edge of Erg Chebbi, the highest sand dunes in Morocco, about 560 km from Marrakech and 470 km from Fes. Most visitors come for one night in a desert camp, but there is much more to do: sunset and sunrise camel rides, quad and buggy tours on the dunes, a day by 4×4 to nomad families and the Gnawa village of Khamlia, and a medfouna cooking class with a local family.</p>
      <p>Book one activity or combine several, always private and with the price agreed before you arrive. Below are all our things to do in Merzouga, ideas for combining them, and the desert tours that bring you here from Marrakech, Fes or Errachidia.</p>
    </div>
  </div></section>
  <nav class="tbar tbar--dt"`, 'intro');

// 2) 4th combo
const happIcons = HOME.match(/<span class="happart-card__ic">(<svg[\s\S]*?<\/svg>)<\/span>/g).map(x => x.replace('<span class="happart-card__ic">', '').replace('</span>', ''));
const ci = s.indexOf('<section class="happart mz-combos"'); const ce = s.indexOf('</ul>', ci);
s = s.slice(0, ce) + `        <li><article class="happart-card">
          <span class="happart-card__ic">${happIcons[3]}</span>
          <h3>Family Desert Day</h3>
          <p>A family buggy in the morning, the medfouna class after lunch, then a gentle sunset camel ride for everyone.</p>
        </article></li>
      ` + s.slice(ce);

// 3) FAQ + blog row (like the homepage)
const POSTS = [
  ['best-things-to-do-in-merzouga.html', 'merzouga-dune.jpg', 'Golden sand dune at Merzouga', 'Best Things to Do in Merzouga', 'Camel treks, desert camps, 4×4 trips, nomad visits, Gnawa music and sandboarding.'],
  ['camel-trekking-in-merzouga.html', 'camel-trek.webp', 'Camel trek in the Erg Chebbi dunes', 'Camel Trekking in Merzouga', 'How long the ride is, how it feels, what to wear and tips for the dunes.'],
  ['sleeping-in-a-sahara-desert-camp.html', 'desert-camp.webp', 'A desert camp in the dunes', 'Sleeping in a Sahara Desert Camp', 'From the sunset ride to dinner, stargazing and sunrise in Merzouga.'],
  ['best-time-to-visit-sahara-desert.html', 'camel-caravan.webp', 'Camel caravan in the Sahara', 'The Best Time to Visit the Sahara', 'A season-by-season guide to desert weather, summer heat and cold nights.'],
];
const blog = `      <aside class="hblog" aria-labelledby="mz-blog-title">
        <header class="hrev__head hfaq__head">
          <h2 id="mz-blog-title">Read Before You Go</h2>
        </header>
        <ul class="hblog__list">
${POSTS.map(([href, img, alt, t, ex]) => { const [w, h] = dims(img); return `          <li><article class="hblog-card"><a class="hblog-card__link" href="../blog/${href}">
            <span class="hblog-card__img"><img src="/assets/images/${img}" alt="${alt}" width="${w}" height="${h}" loading="lazy"></span>
            <span class="hblog-card__body"><h3 class="hblog-card__title">${t}</h3><span class="hblog-card__ex">${ex}</span></span>
          </a></article></li>`; }).join('\n')}
        </ul>
        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../blog.html">Read More Articles</a></div>
      </aside>
`;
rep('<div class="wrap hfaq__in">\n      <div class="hfaq__faq">', '<div class="wrap hfaq__in hfaq__grid">\n      <div class="hfaq__faq">', 'faq grid');
const fi = s.indexOf('<section class="hfaq mz-faq"'); const fl = s.indexOf('<div class="hfaq__list">', fi); const fe = s.indexOf('        </div>\n      </div>\n    </div>\n  </section>', fl);
if (fi < 0 || fl < 0 || fe < 0) throw new Error('faq end');
s = s.slice(0, fe) + '        </div>\n        <div class="hdest__more hfaq__more"><a class="hdest__btn" href="../faq.html">View All FAQs</a></div>\n      </div>\n' + blog + '    </div>\n  </section>' + s.slice(fe + '        </div>\n      </div>\n    </div>\n  </section>'.length);
fs.writeFileSync(f, s);
console.log('ok', s.includes('mz-intro'), (s.match(/happart-card"/g) || []).length, s.includes('mz-blog-title'));
