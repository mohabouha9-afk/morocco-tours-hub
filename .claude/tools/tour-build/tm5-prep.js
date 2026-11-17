// One-off prep for build-tm5.js: reviews json (Lukas M., Sarah L. = desert reviews, + Maria G.) + map TRIPS entry tm5.
const fs = require('fs');
const root = 'C:/Users/hay info/Downloads/my business/moroccotourshub/';
const d = root + '.claude/tools/tour-build/';
const split = f => JSON.parse(fs.readFileSync(d + f, 'utf8')).split('</figure>').filter(Boolean).map(c => c + '</figure>');
const all = [...split('me4-reviews.json'), ...split('cc7-reviews.json'), ...split('tm7-reviews.json'), ...split('tg10-reviews.json')];
const pick = n => { const c = all.find(c => c.includes('<b>' + n + '</b>')); if (!c) throw new Error('no review ' + n); return c; };
fs.writeFileSync(d + 'tm5-reviews.json', JSON.stringify(pick('Lukas M.') + pick('Sarah L.') + pick('Maria G.')));
const f = root + '.claude/tools/route-map.mjs'; let s = fs.readFileSync(f, 'utf8');
if (!s.includes('  tm5: {')) {
  const entry = `  tm5: {
    title: 'Route map: 5-day tour from Tangier by Chefchaouen to Fes, over the Middle Atlas to the Merzouga dunes, back by the Todra Gorge, Dades and Aït Ben Haddou to Marrakech',
    legend: [], tall: true, chip: { at: 0.5, text: 'About 1,400 km', textM: '1,400 km' }, pad: [80, 50, 110, 50], padM: [40, 50, 40, 50],
    legs: [{ kind: 'car', road: 'fm4-d2' }, { kind: 'car', road: 'tm7-d1' }, { kind: 'car', road: 'fc3-d1' }, { kind: 'car', road: 'fm4-d1' }, { kind: 'car', road: 'fm4-d3' }],
    stops: [
      { at: [-5.813, 35.7855], icon: 'port', name: 'Tangier', note: 'Start', start: true, side: 'right', sideM: 'right' },
      { at: [-5.2636, 35.1688], icon: 'kasbah', name: 'Chefchaouen', note: '', side: 'right', pinM: true, mini: true },
      { at: [-4.9998, 34.0331], icon: 'minaret', name: 'Fes', note: 'Night 1', side: 'right', sideM: 'right' },
      { at: [-5.1106, 33.5228], icon: 'garden', name: 'Ifrane', note: '', side: 'left', pinM: true, mini: true },
      { at: [-4.7454, 32.68], icon: 'tagine', name: 'Midelt', note: '', side: 'left', pinM: true, mini: true },
      { at: [-4.3652, 32.1441], icon: 'palm', name: 'Ziz Valley', note: '', side: 'right', pinM: true, mini: true },
      { at: [-4.013, 31.099], icon: 'camel', name: 'Merzouga', note: 'Night 2, camp', side: 'right', sideM: 'left' },
      { at: [-5.588, 31.59], icon: 'river', name: 'Todra Gorge', note: '', side: 'top', pinM: true, mini: true },
      { at: [-5.983, 31.37], icon: 'view', name: 'Dades Valley', note: 'Night 3', side: 'bottom', sideM: 'bottom' },
      { at: [-7.129, 31.047], icon: 'kasbah', name: 'Aït Ben Haddou', note: '', side: 'bottom', pinM: true, mini: true },
      { at: [-7.38, 31.287], icon: 'pass', name: 'Tizi n’Tichka', note: '', side: 'right', pinM: true, mini: true },
      { at: [-8.0089, 31.6295], icon: 'minaret', name: 'Marrakech', note: 'Night 4, end', side: 'left', sideM: 'top' },
    ],
  },
`;
  s = s.replace('  tc5: {', entry + '  tc5: {'); fs.writeFileSync(f, s);
}
console.log('ok');
