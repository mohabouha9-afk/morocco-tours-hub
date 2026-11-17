// One-off prep for build-tc5.js: reviews json (Maria G., James T., Aisha K.) + map TRIPS entry tc5.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const d = root + '.claude/tools/tour-build/';
const split = f => JSON.parse(fs.readFileSync(d + f, 'utf8')).split('</figure>').filter(Boolean).map(c => c + '</figure>');
const all = [...split('me4-reviews.json'), ...split('cc7-reviews.json')];
const pick = n => all.find(c => c.includes('<b>' + n + '</b>'));
fs.writeFileSync(d + 'tc5-reviews.json', JSON.stringify(pick('Maria G.') + pick('James T.') + pick('Aisha K.')));
const f = root + '.claude/tools/route-map.mjs'; let s = fs.readFileSync(f, 'utf8');
if (!s.includes('  tc5: {')) {
  const entry = `  tc5: {
    title: 'Route map: 5-day tour from Tangier and Cap Spartel through the Rif to Chefchaouen, then by Volubilis, Moulay Idriss and Meknes to Fes',
    legend: [], chip: { at: 0.5, text: 'About 450 km', textM: '450 km' }, pad: [80, 50, 110, 50], padM: [40, 50, 40, 50],
    legs: [{ kind: 'car', road: 'tg3' }, { kind: 'car', road: 'tm7-d1' }],
    stops: [
      { at: [-5.813, 35.7855], icon: 'port', name: 'Tangier', note: 'Start, night 1', start: true, side: 'right', sideM: 'right' },
      { at: [-5.9246, 35.7915], icon: 'view', name: 'Cap Spartel', note: '', side: 'left', pinM: true, mini: true },
      { at: [-5.2636, 35.1688], icon: 'kasbah', name: 'Chefchaouen', note: 'Night 2', side: 'right', sideM: 'right' },
      { at: [-5.554, 34.074], icon: 'ruins', name: 'Volubilis', note: '', side: 'left', pinM: true, mini: true },
      { at: [-5.5203, 34.0556], icon: 'minaret', name: 'Moulay Idriss', note: '', side: 'bottom', pinM: true, mini: true },
      { at: [-5.5473, 33.8935], icon: 'arch', name: 'Meknes', note: '', side: 'left', pinM: true, mini: true },
      { at: [-4.9998, 34.0331], icon: 'minaret', name: 'Fes', note: 'Nights 3–4, end', side: 'right', sideM: 'right' },
    ],
  },
`;
  s = s.replace('  ft4: {', entry + '  ft4: {'); fs.writeFileSync(f, s);
}
console.log('ok', !!pick('Maria G.'), !!pick('James T.'), !!pick('Aisha K.'));
