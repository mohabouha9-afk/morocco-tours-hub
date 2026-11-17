// One-off prep for build-me4.js: reviews json + fix of the 6-day page keywords + image check.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const d = root + '.claude/tools/tour-build/';
const split = f => JSON.parse(fs.readFileSync(d + f, 'utf8')).split('</figure>').filter(Boolean).map(c => c + '</figure>');
const ag6 = split('ag6-reviews.json'), cc7 = split('cc7-reviews.json');
const pick = (arr, n) => arr.find(c => c.includes('<b>' + n + '</b>'));
fs.writeFileSync(d + 'me4-reviews.json', JSON.stringify(pick(ag6, 'Maria G.') + pick(cc7, 'Chloé D.') + pick(cc7, 'James T.')));
const KW_OLD = '<meta name="keywords" content="7 day coastal Morocco tour, Morocco coast tour from Marrakech, Essaouira, Imsouane, Taghazout, Paradise Valley, Agadir, Timlalin dunes, private Morocco tour">';
const KW_NEW = '<meta name="keywords" content="6 day Morocco tour, Agadir to Marrakech, Agadir to Essaouira, Taghazout, Paradise Valley, Imsouane, Essaouira, Marrakech guided tour, private Morocco tour">';
for (const f of [root + 'tours/6-day-morocco-tour-agadir-essaouira-marrakech.html', d + 'build-ag6.js']) {
  const t = fs.readFileSync(f, 'utf8'); fs.writeFileSync(f, t.split(KW_OLD).join(KW_NEW)); console.log('kw fixed', f.split('/').pop(), t.includes(KW_OLD));
}
const all = fs.readdirSync(root + 'tours').map(f => fs.readFileSync(root + 'tours/' + f, 'utf8')).join('');
const mm = all.match(/marrakech-medina-arch\.jpg" alt="[^"]*" width="\d+" height="\d+"/);
console.log('arch', mm && mm[0].slice(-30), fs.existsSync(root + 'tours/3-days-desert-tour-marrakech-to-merzouga.html'));
