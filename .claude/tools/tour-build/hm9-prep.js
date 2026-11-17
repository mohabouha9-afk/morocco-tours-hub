// One-off prep for build-hm9.js: reviews json (Sarah L., Lukas M., Chloé D.) + map TRIPS entry hm9.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const d = root + '.claude/tools/tour-build/';
const split = f => JSON.parse(fs.readFileSync(d + f, 'utf8')).split('</figure>').filter(Boolean).map(c => c + '</figure>');
const all = [...split('tm5-reviews.json'), ...split('cc7-reviews.json')];
const pick = n => { const c = all.find(c => c.includes('<b>' + n + '</b>')); if (!c) throw new Error('no review ' + n); return c; };
fs.writeFileSync(d + 'hm9-reviews.json', JSON.stringify(pick('Sarah L.') + pick('Chloé D.') + pick('Lukas M.')));
const f = root + '.claude/tools/route-map.mjs'; let s = fs.readFileSync(f, 'utf8');
if (!s.includes('  hm9: {')) {
  const entry = `  hm9: {
    title: 'Route map: 9-day honeymoon from Marrakech over the High Atlas to Aït Ben Haddou and Ouarzazate, through Skoura and the Dades Valley, the Todra Gorge to the Merzouga dunes, Rissani, Erfoud and the Ziz Valley, then back by Aït Ben Haddou to Marrakech',
    legend: [], tall: true, chip: { at: 0.5, text: 'About 1,450 km', textM: '1,450 km' }, pad: [80, 50, 110, 50], padM: [40, 50, 40, 50],
    legs: [{ kind: 'car', road: 'ag5-d3' }, { kind: 'car', road: 'mf7-d1' }, { kind: 'car', road: 'ag5-d2' }, { kind: 'car', road: 'fy6-d5' }],
    stops: [
      { at: [-8.0089, 31.6295], icon: 'hotel', name: 'Marrakech', note: 'Nights 1 and 8', start: true, side: 'top', sideM: 'top' },
      { at: [-7.38, 31.287], icon: 'pass', name: 'Tizi n’Tichka', note: '', side: 'right', pinM: true, mini: true },
      { at: [-7.129, 31.047], icon: 'kasbah', name: 'Aït Ben Haddou', note: 'Night 7', side: 'left', sideM: 'left' },
      { at: [-6.9063, 30.9189], icon: 'film', name: 'Ouarzazate', note: 'Night 2', side: 'bottom', sideM: 'bottom' },
      { at: [-6.5636, 31.0623], icon: 'palm', name: 'Skoura', note: '', side: 'bottom', pinM: true, mini: true },
      { at: [-5.983, 31.37], icon: 'view', name: 'Dades Valley', note: 'Night 3', side: 'top', sideM: 'top' },
      { at: [-5.588, 31.59], icon: 'river', name: 'Todra Gorge', note: '', side: 'top', pinM: true, mini: true },
      { at: [-4.2654, 31.2797], icon: 'souk', name: 'Rissani', note: '', side: 'left', pinM: true, mini: true },
      { at: [-4.013, 31.099], icon: 'camel', name: 'Merzouga', note: 'Nights 4–5', side: 'right', sideM: 'left' },
      { at: [-4.2286, 31.4314], icon: 'fossil', name: 'Erfoud', note: 'Night 6', side: 'right', sideM: 'left' },
      { at: [-4.1785, 31.6878], icon: 'palm', name: 'Ziz Valley', note: '', side: 'right', pinM: true, mini: true },
    ],
  },
`;
  s = s.replace('  fy6: {', entry + '  fy6: {'); fs.writeFileSync(f, s);
}
console.log('ok');
