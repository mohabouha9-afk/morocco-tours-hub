// Link the new 2-day Fes -> Marrakech tour: clones the 3-day Fes -> Marrakech card on each listing page (one run only).
// Inserted before the 3-day card (sorted by days); on the homepage Sahara row it goes at the end (first 3 = Best Sellers).
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const OLD = '3-day-fes-to-marrakech-desert-tour.html', NEW = '2-day-fes-to-marrakech-desert-tour.html';
const DESC_OLD = 'The Sahara on your first night: the Middle Atlas cedar forests to a sunset camel ride in Merzouga, then the Todra Gorge, the Dades Valley and Aït Ben Haddou to Marrakech.';
const DESC_NEW = 'The quickest way to Marrakech with a Sahara night: the Middle Atlas cedars to a sunset camel ride in Merzouga, then the Dades Valley and Aït Ben Haddou to Marrakech.';
function card(li) {
  const c = li.split(OLD).join(NEW)
    .replace('src="/assets/images/merzouga-caravan-sunset.jpg"', 'src="/assets/images/sahara-caravan-ridge-golden.jpg"')
    .replace(/(sahara-caravan-ridge-golden\.jpg" alt=")[^"]*(" width=")\d+(" height=")\d+/, '$12-Day Fes to Marrakech Desert Tour$21800$31200')
    .replace(/(<span class="htour__days">(?:<svg.*?<\/svg>)?)3 Days/, '$12 Days')
    .replace('<h3 class="htour__title">3-Day Fes to Marrakech Desert Tour</h3>', '<h3 class="htour__title">2-Day Fes to Marrakech Desert Tour</h3>')
    .replace(/<span class="htour__ribbon">.*?<\/span><\/span>/, '');
  if (!c.includes(DESC_OLD)) throw new Error('desc');
  return c.replace(DESC_OLD, DESC_NEW);
}
for (const f of ['tours/index.html', 'tours/morocco-tours-from-fes.html', 'desert-tours-from-fes.html', 'sahara-desert-tours.html', 'index.html']) {
  let s = fs.readFileSync(root + f, 'utf8');
  if (s.includes(NEW)) { console.log('skip (linked)', f); continue; }
  const pre = f.startsWith('tours/') ? '../tours/' : 'tours/';
  let j = 0, n = 0;
  while ((j = s.indexOf('href="' + pre + OLD + '"', j)) >= 0) {
    const bare = f.startsWith('tours/'); // these pages use bare <article class="htour"> cards in a grid
    const a = bare ? s.lastIndexOf('<article class="htour">', j) : s.lastIndexOf('<li', j);
    const b = bare ? s.indexOf('</article>', j) + 10 : s.indexOf('</li>', j) + 5;
    const li = s.slice(a, b);
    if (!li.includes('class="htour"') || !li.includes(DESC_OLD) || b - a > 6000) { j += 10; continue; }
    const nc = card(li);
    if (f === 'index.html') { const end = s.indexOf('</ul>', b); s = s.slice(0, end) + nc + '\n' + s.slice(end); j = b; }
    else { s = s.slice(0, a) + nc + '\n' + s.slice(a); j = b + nc.length + 1; }
    n++;
  }
  fs.writeFileSync(root + f, s); console.log(f, n, 'cards');
}
