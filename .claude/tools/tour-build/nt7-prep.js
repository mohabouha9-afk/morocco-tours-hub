// One-off prep for build-nt7.js: reviews json (Chloé D., Aisha K., Maria G.) + map TRIPS entry nt7.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const d = root + '.claude/tools/tour-build/';
const split = f => JSON.parse(fs.readFileSync(d + f, 'utf8')).split('</figure>').filter(Boolean).map(c => c + '</figure>');
const all = [...split('me4-reviews.json'), ...split('cc7-reviews.json')];
const pick = n => { const c = all.find(c => c.includes('<b>' + n + '</b>')); if (!c) throw new Error('no review ' + n); return c; };
fs.writeFileSync(d + 'nt7-reviews.json', JSON.stringify(pick('Chloé D.') + pick('Aisha K.') + pick('Maria G.')));
const f = root + '.claude/tools/route-map.mjs'; let s = fs.readFileSync(f, 'utf8');
if (!s.includes('  nt7: {')) {
  const entry = `  nt7: {
    title: 'Route map: 7-day northern Morocco tour from Tangier and Cap Spartel, down the Atlantic to Asilah and Larache, up into the Rif to Chefchaouen and Akchour, then by Volubilis, Moulay Idriss and Meknes to Fes',
    legend: [], chip: { at: 0.5, text: 'About 750 km', textM: '750 km' }, pad: [80, 50, 110, 50], padM: [40, 50, 40, 50],
    legs: [{ kind: 'car', road: 'tg3' }, { kind: 'car', road: 'nt7-d2' }, { kind: 'car', road: 'tm7-d1' }, { kind: 'car', road: 'ft4-d3' }],
    stops: [
      { at: [-5.813, 35.7855], icon: 'port', name: 'Tangier', note: 'Start, nights 1–2', start: true, side: 'right', sideM: 'right' },
      { at: [-5.9246, 35.7915], icon: 'view', name: 'Cap Spartel', note: '', side: 'left', pinM: true, mini: true },
      { at: [-6.0346, 35.4651], icon: 'arch', name: 'Asilah', note: 'Day 2', side: 'left', sideM: 'left' },
      { at: [-6.1557, 35.1932], icon: 'port', name: 'Larache', note: '', side: 'left', pinM: true, mini: true },
      { at: [-5.2636, 35.1688], icon: 'kasbah', name: 'Chefchaouen', note: 'Nights 3–4', side: 'bottom', sideM: 'bottom' },
      { at: [-5.1819, 35.2426], icon: 'falls', name: 'Akchour', note: '', side: 'right', pinM: true, mini: true },
      { at: [-5.554, 34.074], icon: 'ruins', name: 'Volubilis', note: '', side: 'left', pinM: true, mini: true },
      { at: [-5.5473, 33.8935], icon: 'arch', name: 'Meknes', note: '', side: 'left', pinM: true, mini: true },
      { at: [-4.9998, 34.0331], icon: 'minaret', name: 'Fes', note: 'Nights 5–6, end', side: 'right', sideM: 'right' },
    ],
  },
`;
  s = s.replace('  tm5: {', entry + '  tm5: {'); fs.writeFileSync(f, s);
}
console.log('ok');
