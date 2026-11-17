// One-off: update the 6 student/group tour cards site-wide (title, description, End) after build-st.js.
const fs = require('fs');
process.chdir('C:/Users/hay info/Downloads/my business/moroccotourshub');
const CARDS = {
  '3-day-marrakech-merzouga-group-tour.html': ['3-Day Marrakech to Merzouga Group Tour', 'Shared with other travellers: Aït Ben Haddou, the Dades Valley and the Todra Gorge, a sunset camel ride and a night in a desert camp.'],
  '3-day-marrakech-merzouga-student-tour.html': ['3-Day Morocco Student Tour from Marrakech to Merzouga', 'Private for your student group: Aït Ben Haddou, Dades and the Todra Gorge, a sunset camel ride and a desert camp. Free teacher place on large groups.'],
  '3-day-marrakech-to-fes-student-tour.html': ['3-Day Morocco Student Tour from Marrakech to Fes via Merzouga', 'Private for your student group: across the south to a desert camp, then the Ziz Valley, the cedar forest and Ifrane to Fes, with no drive back.'],
  '4-day-marrakech-merzouga-student-tour.html': ['4-Day Morocco Student Tour from Marrakech to Merzouga', 'Private for your student group: Dades, the Todra Gorge and a desert camp, then the Draa Valley and a night in Ouarzazate to break the drive home.'],
  '5-day-morocco-student-desert-tour-marrakech.html': ['5-Day Morocco Student Desert Tour from Marrakech', 'From Marrakech airport and back: a night in Marrakech, the High Atlas to a desert camp, a 4×4 day with Gnawa music and nomads, and both transfers.'],
  '5-day-morocco-student-tour-from-tangier.html': ['5-Day Morocco Student Tour from Tangier', 'Met off the ferry: Chefchaouen and Fes, a desert camp in Merzouga, the Todra Gorge and Aït Ben Haddou to Marrakech, then back to Tangier.', 'Tangier'],
};
const files = ['.', 'tours', 'destinations', 'blog'].flatMap(d => fs.readdirSync(d).filter(f => f.endsWith('.html')).map(f => d === '.' ? f : d + '/' + f));
for (const f of files) {
  let t = fs.readFileSync(f, 'utf8'); const o = t;
  for (const [H, [title, desc, endCity]] of Object.entries(CARDS)) {
    let i = t.indexOf(H);
    while (i >= 0) {
      const a = t.lastIndexOf('<article', i);
      if (a >= 0 && i - a < 200 && t.slice(a, i).indexOf('</article>') < 0) {
        const b = t.indexOf('</article>', i);
        let card = t.slice(a, b).replace(/(<h3 class="htour__title">)[^<]*(<\/h3>)/, `$1${title}$2`).replace(/(<p class="htour__desc">)[^<]*(<\/p>)/, `$1${desc}$2`).replace(/(<img [^>]*alt=")[^"]*(")/, `$1${title}$2`);
        if (endCity) card = card.replace(/(<b>End:<\/b> )[^<]*/, `$1${endCity}`);
        t = t.slice(0, a) + card + t.slice(b); i = t.indexOf(H, a + card.length);
      } else i = t.indexOf(H, i + 1);
    }
  }
  if (t !== o) { fs.writeFileSync(f, t); console.log('updated', f); }
}
