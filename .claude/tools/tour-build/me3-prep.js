// One-off prep for build-me3.js: reviews json (Aisha K., Maria G., Chloé D.) + map TRIPS entry me3.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const d = root + '.claude/tools/tour-build/';
const split = f => JSON.parse(fs.readFileSync(d + f, 'utf8')).split('</figure>').filter(Boolean).map(c => c + '</figure>');
const all = [...split('me4-reviews.json'), ...split('cc7-reviews.json')];
const pick = n => all.find(c => c.includes('<b>' + n + '</b>'));
fs.writeFileSync(d + 'me3-reviews.json', JSON.stringify(pick('Aisha K.') + pick('Maria G.') + pick('Chloé D.')));
const f = root + '.claude/tools/route-map.mjs'; let s = fs.readFileSync(f, 'utf8');
if (!s.includes('  me3: {')) {
  const entry = `  me3: {
    title: 'Route map: 3-day tour from Marrakech west across the argan plains to Essaouira and back',
    legend: [], chip: { at: 0.5, text: 'About 180 km each way', textM: '180 km' }, pad: [70, 50, 90, 50], padM: [40, 50, 40, 50],
    legs: [{ kind: 'car', road: 'essaouira' }],
    stops: [
      { at: [-8.0089, 31.6295], icon: 'minaret', name: 'Marrakech', note: 'Start and end, night 1', start: true, side: 'right', sideM: 'bottom' },
      { at: [-9.77, 31.5125], icon: 'port', name: 'Essaouira', note: 'Night 2', side: 'left', sideM: 'bottom' },
    ],
  },
`;
  s = s.replace('  me4: {', entry + '  me4: {'); fs.writeFileSync(f, s);
}
console.log('ok', !!pick('Aisha K.'), !!pick('Maria G.'), !!pick('Chloé D.'));
