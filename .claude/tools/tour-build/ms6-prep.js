// One-off prep for build-ms6.js: reviews json (James T., Aisha K., Maria G.) + map TRIPS entry ms6.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const d = root + '.claude/tools/tour-build/';
const split = f => JSON.parse(fs.readFileSync(d + f, 'utf8')).split('</figure>').filter(Boolean).map(c => c + '</figure>');
const all = [...split('me4-reviews.json'), ...split('cc7-reviews.json')];
const pick = n => all.find(c => c.includes('<b>' + n + '</b>'));
fs.writeFileSync(d + 'ms6-reviews.json', JSON.stringify(pick('James T.') + pick('Aisha K.') + pick('Maria G.')));
const f = root + '.claude/tools/route-map.mjs'; let s = fs.readFileSync(f, 'utf8');
if (!s.includes('  ms6: {')) {
  const entry = `  ms6: {
    title: 'Route map: 6 days from one Marrakech riad, with day trips to the Ourika Valley, the Ouzoud Waterfalls, and over the High Atlas to Aït Ben Haddou and Ouarzazate',
    legend: [], chip: { at: 0.5, text: 'About 800 km of day trips', textM: '800 km' }, pad: [70, 50, 110, 50], padM: [40, 50, 40, 50],
    legs: [{ kind: 'car', road: 'ouzoud' }, { kind: 'car', road: 'ourika' }, { kind: 'car', road: 'abh' }],
    stops: [
      { at: [-8.0089, 31.6295], icon: 'hotel', name: 'Marrakech', note: 'Your riad, nights 1–5', start: true, side: 'left', sideM: 'left' },
      { at: [-7.6767, 31.2236], icon: 'falls', name: 'Ourika Valley', note: 'Day 3', side: 'left', sideM: 'bottom' },
      { at: [-6.7189, 32.0156], icon: 'falls', name: 'Ouzoud', note: 'Day 4', side: 'right', sideM: 'top' },
      { at: [-7.38, 31.287], icon: 'pass', name: 'Tizi n’Tichka', note: '', side: 'right', pinM: true, mini: true },
      { at: [-7.129, 31.047], icon: 'kasbah', name: 'Aït Ben Haddou', note: 'Day 5', side: 'left', sideM: 'left' },
      { at: [-6.9063, 30.9189], icon: 'film', name: 'Ouarzazate', note: '', side: 'right', pinM: true, mini: true },
    ],
  },
`;
  s = s.replace('  me3: {', entry + '  me3: {'); fs.writeFileSync(f, s);
}
console.log('ok', !!pick('James T.'), !!pick('Aisha K.'), !!pick('Maria G.'));
