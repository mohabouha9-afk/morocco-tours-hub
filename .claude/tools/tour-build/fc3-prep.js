// One-off prep for build-fc3.js: reviews json (Chloé D., Maria G., Aisha K.) + map TRIPS entry fc3.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const d = root + '.claude/tools/tour-build/';
const split = f => JSON.parse(fs.readFileSync(d + f, 'utf8')).split('</figure>').filter(Boolean).map(c => c + '</figure>');
const all = [...split('me4-reviews.json'), ...split('cc7-reviews.json')];
const pick = n => all.find(c => c.includes('<b>' + n + '</b>'));
fs.writeFileSync(d + 'fc3-reviews.json', JSON.stringify(pick('Chloé D.') + pick('Maria G.') + pick('Aisha K.')));
const f = root + '.claude/tools/route-map.mjs'; let s = fs.readFileSync(f, 'utf8');
if (!s.includes('  fc3: {')) {
  const entry = `  fc3: {
    title: 'Route map: 3-day tour from Fes north through the Rif to Chefchaouen, back south by Volubilis, Moulay Idriss and Meknes to Fes',
    legend: [], chip: { at: 0.5, text: 'About 460 km', textM: '460 km' }, pad: [80, 50, 110, 50], padM: [40, 50, 40, 50],
    legs: [{ kind: 'car', road: 'fc3-d1' }, { kind: 'car', road: 'tg3' }],
    stops: [
      { at: [-4.9998, 34.0331], icon: 'minaret', name: 'Fes', note: 'Start and end, night 2', start: true, side: 'right', sideM: 'right' },
      { at: [-5.2636, 35.1688], icon: 'kasbah', name: 'Chefchaouen', note: 'Night 1', side: 'right', sideM: 'right' },
      { at: [-5.554, 34.074], icon: 'ruins', name: 'Volubilis', note: '', side: 'left', pinM: true, mini: true },
      { at: [-5.5203, 34.0556], icon: 'minaret', name: 'Moulay Idriss', note: '', side: 'bottom', pinM: true, mini: true },
      { at: [-5.5473, 33.8935], icon: 'arch', name: 'Meknes', note: '', side: 'left', pinM: true, mini: true },
    ],
  },
`;
  s = s.replace('  ms6: {', entry + '  ms6: {'); fs.writeFileSync(f, s);
}
console.log('ok', !!pick('Chloé D.'), !!pick('Maria G.'), !!pick('Aisha K.'));
