// One-off prep for build-ft4.js: reviews json (Aisha K., James T., Chloé D.) + map TRIPS entry ft4.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const d = root + '.claude/tools/tour-build/';
const split = f => JSON.parse(fs.readFileSync(d + f, 'utf8')).split('</figure>').filter(Boolean).map(c => c + '</figure>');
const all = [...split('me4-reviews.json'), ...split('cc7-reviews.json')];
const pick = n => all.find(c => c.includes('<b>' + n + '</b>'));
fs.writeFileSync(d + 'ft4-reviews.json', JSON.stringify(pick('Aisha K.') + pick('James T.') + pick('Chloé D.')));
const f = root + '.claude/tools/route-map.mjs'; let s = fs.readFileSync(f, 'utf8');
if (!s.includes('  ft4: {')) {
  const entry = `  ft4: {
    title: 'Route map: 4-day tour from Fes by Meknes, Volubilis and Moulay Idriss to Chefchaouen, a day at Akchour in the Rif, then on to Tangier and Cap Spartel',
    legend: [], chip: { at: 0.5, text: 'About 500 km', textM: '500 km' }, pad: [80, 50, 110, 50], padM: [40, 50, 40, 50],
    legs: [{ kind: 'car', road: 'mt7' }, { kind: 'car', road: 'ft4-d3' }, { kind: 'car', road: 'm7t-d7' }],
    stops: [
      { at: [-4.9998, 34.0331], icon: 'minaret', name: 'Fes', note: 'Start, night 1', start: true, side: 'right', sideM: 'right' },
      { at: [-5.5473, 33.8935], icon: 'arch', name: 'Meknes', note: '', side: 'left', pinM: true, mini: true },
      { at: [-5.554, 34.074], icon: 'ruins', name: 'Volubilis', note: '', side: 'left', pinM: true, mini: true },
      { at: [-5.2636, 35.1688], icon: 'kasbah', name: 'Chefchaouen', note: 'Nights 2–3', side: 'left', sideM: 'left' },
      { at: [-5.1819, 35.2426], icon: 'falls', name: 'Akchour', note: 'Day 3', side: 'right', sideM: 'right' },
      { at: [-5.9246, 35.7915], icon: 'view', name: 'Cap Spartel', note: '', side: 'left', pinM: true, mini: true },
      { at: [-5.813, 35.7855], icon: 'port', name: 'Tangier', note: 'End', side: 'right', sideM: 'right' },
    ],
  },
`;
  s = s.replace('  fc3: {', entry + '  fc3: {'); fs.writeFileSync(f, s);
}
console.log('ok', !!pick('Aisha K.'), !!pick('James T.'), !!pick('Chloé D.'));
