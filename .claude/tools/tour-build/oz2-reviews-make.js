// one-off: oz2-reviews.json = Lukas M. (fr2) + Sarah L. (zg2) + Maria G. (cm4), split on each review figure
const fs = require('fs');
const get = (f, who) => {
  const s = JSON.parse(fs.readFileSync(__dirname + '/' + f, 'utf8'));
  const parts = s.split('<figure class="hrev-card">').filter(Boolean).map(p => '<figure class="hrev-card">' + p);
  const r = parts.find(p => p.includes('<b>' + who + '</b>')); if (!r) throw new Error(who);
  return r.replace(/\s+$/, '');
};
const out = [get('fr2-reviews.json', 'Lukas M.'), get('zg2-reviews.json', 'Sarah L.'), get('cm4-reviews.json', 'Maria G.')].join('');
fs.writeFileSync(__dirname + '/oz2-reviews.json', JSON.stringify(out));
console.log('ok', out.length);
