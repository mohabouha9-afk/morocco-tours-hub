// Merzouga activity cards (one per activity page), saved to mz-cards.json so every Merzouga page can recommend the others.
// node mz-cards.js  -> rewrites mz-cards.json from the tour card template; add a new entry to A for each new activity page.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const SP = __dirname + '/';
const HTMLS = ['', 'tours/', 'destinations/', 'blog/'].flatMap(d => fs.readdirSync(root + d).filter(f => f.endsWith('.html')).map(f => fs.readFileSync(root + d + f, 'utf8'))).join('');
function dims(f) { const mm = HTMLS.match(new RegExp(f.replace(/\./g, '\\.') + '" alt="[^"]*" width="(\\d+)" height="(\\d+)"')); if (!mm) throw new Error('no dims ' + f); return [mm[1], mm[2]]; }
const tpl = JSON.parse(fs.readFileSync(SP + 'mzcamp-similar.json', 'utf8')).split('</li>')[0] + '</li>';
const A = {
  'merzouga-desert-camp-camel-ride.html': { img: 'desert-camp-aerial-circular.jpg', badge: 'Overnight', title: 'Merzouga Desert Camp &amp; Sunset Camel Ride', desc: 'A sunset camel ride into Erg Chebbi, a private tent with bathroom, dinner and drums by the fire, and sunrise on the dunes.', f3: 'Private night' },
  'merzouga-4x4-desert-day-tour.html': { img: 'khamlia-gnawa.jpg', badge: 'Full day', title: 'Merzouga 4×4 Desert Day Tour', desc: 'A private day around Erg Chebbi by 4×4: nomad tea, Gnawa music in Khamlia, the black desert, the Mfis mines and the lake.', f3: 'Private day' },
  'merzouga-medfouna-cooking-class.html': { img: 'cooking-shared-meal.jpg', badge: '3.5 hours', title: 'Medfouna Cooking Class in Merzouga', desc: 'Make medfouna, the Berber pizza of the desert, with a local family, bake it in the hot sand and share it with mint tea.', f3: 'Private class' },
  'merzouga-buggy-tour.html': { img: 'merzouga-buggy-dunes.jpg', badge: '1–2 hours', title: 'Merzouga Buggy Tour', desc: 'Drive a buggy side by side across the Erg Chebbi dunes behind your guide; nomad tea and the desert lake on the 2-hour ride.', f3: 'Private ride' },
  'merzouga-quad-biking.html': { img: 'quad-merzouga.webp', badge: '1–2 hours', title: 'Quad Biking in the Merzouga Dunes', desc: 'Your own quad across the Erg Chebbi dunes with a guide in front, a sandboarding stop and, on the 2-hour ride, nomad tea.', f3: 'Private ride' },
  'merzouga-sunset-camel-ride.html': { img: 'merzouga-camel-ride-dunes.jpg', badge: '2.5 hours', title: 'Merzouga Sunset Camel Ride', desc: 'Ride into the Erg Chebbi dunes with your own camel guide, watch the sunset from a high ridge and try sandboarding.', f3: 'Private ride' },
};
const out = {};
for (const [href, c] of Object.entries(A)) {
  const [w, h] = dims(c.img);
  out[href] = tpl.replace('href="3-days-desert-tour-marrakech-to-merzouga.html"', `href="${href}"`)
    .replace(/<img src="[^"]*" alt="[^"]*" width="\d+" height="\d+"/, `<img src="/assets/images/${c.img}" alt="${c.title}" width="${w}" height="${h}"`)
    .replace(/(<\/svg>)3 Days(<\/span>)/, `$1${c.badge}$2`).replace(/(<h3 class="htour__title">)[^<]*/, `$1${c.title}`)
    .replace(/(<p class="htour__desc">)[^<]*/, `$1${c.desc}`).replace(/(<b>Start:<\/b> )Marrakech/, '$1Merzouga').replace(/(<b>End:<\/b> )Marrakech/, '$1Merzouga')
    .replace(/(<\/svg>)Private tour(<\/span>)/, `$1${c.f3}$2`).replace(/^\s*/, '        ');
}
fs.writeFileSync(SP + 'mz-cards.json', JSON.stringify(out, null, 1));
console.log(Object.keys(out).length, 'cards');
