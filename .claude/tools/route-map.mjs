// Day-trip route map (figure.rmap): a real map (OpenStreetMap tiles via Leaflet) with OUR layer on top —
// the route traced along the real roads, a branded icon pin at every stop, labels, a drive-time tag
// and an 8-point star compass (N/E/S/W).
//
// 1) Road geometry comes from the free OSRM router, fetched ONCE and saved in .claude/tools/routes/<key>.json:
//      curl -s -o raw.json "https://router.project-osrm.org/route/v1/driving/LON,LAT;LON,LAT?overview=full&geometries=geojson"
//      node .claude/tools/route-map.mjs --save <key> raw.json [tolerance]   (simplifies + saves)
//    Walking routes (medina lanes): use the foot router https://routing.openstreetmap.de/routed-foot/route/v1/foot/... and a finer tolerance (0.00004)
// 2) Build the map into a page:
//      node .claude/tools/route-map.mjs <page.html> <key>
// Re-running replaces the existing .rmap (or the old OpenStreetMap iframe .dt-map) and adds the Leaflet tags to <head>.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROUTES = path.join(DIR, 'routes');

const M = [-8.0089, 31.6295];
const PICKUP = { at: M, icon: 'hotel', name: 'Marrakech', note: 'Pick-up at your hotel', start: true, side: 'right' };
const TRIPS = {
  agafay: {
    title: 'Route map: Marrakech to the Agafay desert camp',
    legend: [], compassM: 'topleft', chip: { at: 0.45, text: '40 min drive' }, legs: [{ kind: 'car', road: 'agafay' }],
    stops: [PICKUP, { at: [-8.1879, 31.4897], icon: 'tent', name: 'Agafay camp', note: 'Camel ride, lunch, sunset', side: 'right' }],
  },
  ourika: {
    title: 'Route map: Marrakech up the Ourika valley to the Setti Fatma waterfalls',
    legend: [], chip: { at: 0.12, text: '1 to 1.5 h drive' }, legs: [{ kind: 'car', road: 'ourika' }],
    stops: [PICKUP, { at: 'route:0.72', icon: 'river', name: 'Ourika valley', note: 'River road, Berber villages', side: 'left' },
      { at: [-7.6767, 31.2236], icon: 'falls', name: 'Setti Fatma', note: 'Walk to the falls, lunch', side: 'right', sideM: 'left' }],
  },
  ouzoud: {
    title: 'Route map: Marrakech to the Ouzoud waterfalls',
    legend: [], chip: { at: 0.8, text: '2.5 to 3 h each way', textM: '2.5–3 h' }, legs: [{ kind: 'car', road: 'ouzoud' }],
    stops: [{ ...PICKUP, side: 'right' }, { at: 'route:0.55', icon: 'tea', name: 'Coffee stop', note: 'Halfway break', side: 'right' },
      { at: [-6.7189, 32.0156], icon: 'falls', name: 'Ouzoud falls', note: 'Boat, pools, lunch', side: 'left' }],
  },
  atlas: {
    title: 'Route map: Marrakech through the Moulay Brahim gorge to Imlil in the High Atlas',
    legend: [], chip: { at: 0.2, text: '1.5 h drive' }, legs: [{ kind: 'car', road: 'atlas' }],
    stops: [PICKUP, { at: 'route:0.55', icon: 'view', name: 'Moulay Brahim gorge', note: 'Views on the way', side: 'right' },
      { at: [-7.9196, 31.137], icon: 'peak', name: 'Imlil', note: 'Walk and lunch, 1,740 m', side: 'right' }],
  },
  essaouira: {
    title: 'Route map: Marrakech to Essaouira on the Atlantic coast',
    legend: [], chip: { at: 0.15, text: '2.5 to 3 h each way', textM: '2.5–3 h' }, legs: [{ kind: 'car', road: 'essaouira' }], compassM: 'topright', padM: [52, 56, 44, 40],
    stops: [{ ...PICKUP, side: 'right', sideM: 'top' }, { at: 'route:0.6', icon: 'tea', name: 'Coffee stop', note: 'Argan country', side: 'right', sideM: 'bottom' },
      { at: [-9.7700, 31.5125], icon: 'port', name: 'Essaouira', note: 'Medina, port, lunch', side: 'right', sideM: 'top' }],
  },
  camel: {
    title: 'Route map: Marrakech to the Agafay desert camp for the camel ride and dinner show',
    legend: [], compassM: 'topleft', chip: { at: 0.45, text: '40 min drive' }, legs: [{ kind: 'car', road: 'agafay' }],
    stops: [{ ...PICKUP, note: 'Pick-up in the afternoon' }, { at: [-8.1879, 31.4897], icon: 'camel', name: 'Agafay camp', note: 'Camel ride, dinner, fire show', side: 'right' }],
  },
  balloon: {
    title: 'Route map: Marrakech to the balloon take-off site towards Agafay, the flight and the landing',
    compassM: 'topleft',
    legend: [['car', 'By car'], ['air', 'By balloon']],
    chip: { at: 0.45, text: '30–45 min drive' },
    legs: [
      { kind: 'car', road: 'agafay', cut: 0.72 },
      { kind: 'air', path: [[-8.13407, 31.53468], [-8.150, 31.522], [-8.168, 31.512], [-8.186, 31.505], [-8.204, 31.500]] },
    ],
    stops: [
      { ...PICKUP, note: 'Pick-up before dawn', sideM: 'left' },
      { at: [-8.13407, 31.53468], icon: 'balloon', name: 'Take-off', note: 'Tea as the balloons fill', side: 'right' },
      { at: [-8.204, 31.500], icon: 'tea', name: 'Landing', note: 'Berber breakfast', side: 'left', sideM: 'right' },
    ],
  },
  medina: {
    title: 'Walking route through the Marrakech medina: Koutoubia, Bahia Palace, the Mellah, Jemaa el-Fnaa, the souks and Ben Youssef Madrasa',
    legend: [], chip: { at: 0.4, text: 'About 5 km on foot', textM: '5 km on foot' }, legs: [{ kind: 'walk', road: 'medina' }],
    pad: [150, 30, 150, 30], padM: [104, 22, 50, 40], compassM: 'topright',
    // 4 pins only: the medina is small, so close neighbours share a label (Bahia + Mellah, Jemaa el-Fnaa + souks)
    stops: [
      { at: [-7.99407, 31.62357], icon: 'minaret', name: 'Koutoubia', note: 'Meet your guide', start: true, side: 'left' },
      { at: [-7.98271, 31.62164], icon: 'kasbah', name: 'Bahia Palace', note: 'And the Mellah next door', side: 'right', sideM: 'bottom' },
      { at: [-7.98934, 31.62593], icon: 'square', name: 'Jemaa el-Fnaa', note: 'Then into the souks', side: 'left' },
      { at: [-7.98625, 31.63154], icon: 'arch', name: 'Ben Youssef', note: 'Madrasa, rooftop tea', side: 'right', sideM: 'left' },
    ],
  },
  hammam: {
    title: 'Route map: from your hotel by car to the medina, then a short walk to the hammam',
    legend: [['car', 'By car'], ['walk', 'On foot']], chip: { at: 0.5, text: '5–15 min drive', textM: '5–15 min' },
    legs: [{ kind: 'car', road: 'hammam-car' }, { kind: 'walk', road: 'hammam-foot' }],
    pad: [150, 64, 150, 30], padM: [30, 60, 30, 24], compassM: 'topright',
    stops: [
      { at: [-8.01051, 31.63379], icon: 'hotel', name: 'Your hotel', note: 'Pick-up (Guéliz shown)', start: true, side: 'right', sideM: 'right' },
      { at: [-7.99516, 31.62624], icon: 'minaret', name: 'Koutoubia', note: 'The car stops here', side: 'left', sideM: 'left' },
      { at: [-7.98927, 31.63055], icon: 'spa', name: 'The hammam', note: '10-minute walk', side: 'right', sideM: 'left' },
    ],
  },
  cooking: {
    title: 'Walking route of the cooking class: from the Koutoubia to the Mellah market, then the bread oven and the riad kitchen',
    legend: [], chip: { at: 0.3, text: 'About 2 km on foot', textM: '2 km on foot' }, legs: [{ kind: 'walk', road: 'cooking-foot' }],
    pad: [150, 40, 150, 56], padM: [60, 30, 60, 46], compassM: 'topright',
    stops: [
      { at: [-7.99407, 31.62357], icon: 'minaret', name: 'Koutoubia', note: 'Meet your cook', start: true, side: 'bottom' },
      { at: [-7.98186, 31.62088], icon: 'souk', name: 'Mellah market', note: 'Shop for your menu', side: 'right', sideM: 'bottom' },
      { at: [-7.98653, 31.6233], icon: 'tagine', name: 'Riad kitchen', note: 'Bread oven, cook, eat', side: 'top', sideM: 'top' },
    ],
  },
  majorelle: {
    title: 'Route map: the Majorelle Garden, then by car to the Kasbah quarter and on foot to the Bahia Palace, El Badi Palace and the Saadian Tombs',
    legend: [['car', 'By car'], ['walk', 'On foot']], chip: { at: 0.5, text: '10–20 min drive', textM: '10–20 min' },
    legs: [{ kind: 'car', road: 'maj-car' }, { kind: 'walk', road: 'maj-foot' }],
    pad: [150, 60, 150, 50], padM: [60, 64, 60, 52], compassM: 'topright',
    stops: [
      { at: [-8.00261, 31.64203], icon: 'garden', name: 'Majorelle Garden', note: 'First slot, 08:00', start: true, side: 'right', sideM: 'bottom' },
      // El Badi sits between these two (too close for its own pin at this scale): named in the Bahia label
      { at: [-7.98271, 31.62164], icon: 'kasbah', name: 'Bahia Palace', note: 'Then El Badi Palace', nameM: 'Kasbah palaces', side: 'right', sideM: 'bottom' },
      { at: [-7.98869, 31.61727], icon: 'dome', name: 'Saadian Tombs', note: 'Royal tombs', side: 'left', hideM: true },
    ],
  },
  food: {
    title: 'Walking route of the food tour: Koutoubia, the Mellah spice market, Riad Zitoun el Kedim and Jemaa el-Fnaa with the mechoui alley',
    legend: [], chip: { at: 0.3, text: 'About 2 km on foot', textM: '2 km on foot' }, legs: [{ kind: 'walk', road: 'food-foot' }],
    pad: [150, 72, 150, 50], padM: [60, 66, 60, 46], compassM: 'topright',
    stops: [
      { at: [-7.99407, 31.62357], icon: 'minaret', name: 'Koutoubia', note: 'Meet your guide', start: true, side: 'bottom' },
      { at: [-7.98386, 31.62119], icon: 'souk', name: 'Mellah market', note: 'Olives, spices, dates', side: 'right', sideM: 'bottom' },
      { at: [-7.98684, 31.62325], icon: 'tea', name: 'Riad Zitoun el Kedim', note: 'Msemen and harira', side: 'right', hideM: true },
      { at: [-7.98782, 31.62643], icon: 'square', name: 'Jemaa el-Fnaa', note: 'Mechoui alley, night stalls', side: 'top', sideM: 'top' },
    ],
  },
  airport: {
    title: 'Route map: Marrakech Menara Airport to the medina, about 6.5 km',
    legend: [], chip: { at: 0.5, text: '15–25 min drive', textM: '15–25 min' }, legs: [{ kind: 'car', road: 'airport' }],
    pad: [150, 50, 150, 50], padM: [60, 50, 60, 46], compassM: 'topleft',
    stops: [
      { at: [-8.02659, 31.60112], icon: 'plane', name: 'Marrakech Airport', note: 'Name sign in arrivals', start: true, side: 'right', sideM: 'right' },
      { at: [-7.99516, 31.62624], icon: 'kasbah', name: 'The medina', note: 'Walked to your riad door', side: 'left', sideM: 'left' },
    ],
  },
  quad: {
    title: 'Route map: Marrakech to the Agafay quad tracks',
    compassM: 'topleft',
    legend: [['car', 'By car'], ['quad', 'By quad']],
    chip: { at: 0.4, text: '40 min drive' },
    legs: [
      { kind: 'car', road: 'quad' },
      { kind: 'quad', path: [[-8.175, 31.47], [-8.215, 31.455], [-8.245, 31.428], [-8.225, 31.398], [-8.19, 31.385], [-8.165, 31.405], [-8.17, 31.44], [-8.175, 31.47]] },
    ],
    stops: [
      { at: [-8.0089, 31.6295], icon: 'hotel', name: 'Marrakech', note: 'Pick-up at your hotel', start: true, side: 'right' },
      { at: [-8.175, 31.47], icon: 'helmet', name: 'Quad base', note: 'Gear up and practice', side: 'right' },
      { at: [-8.245, 31.428], icon: 'tea', name: 'Berber village', note: 'Mint tea break', side: 'left', sideM: 'right' },
      { at: [-8.19, 31.385], icon: 'view', name: 'Lake viewpoint', note: 'Atlas on clear days', side: 'right' },
    ],
  },
  abh: {
    title: 'Route map: Marrakech over the Tizi n’Tichka pass to Aït Ben Haddou and Ouarzazate',
    legend: [],
    chip: { at: 0.28, text: '3.5 h each way' },
    padM: [24, 44, 96, 46],
    legs: [{ kind: 'car', road: 'abh' }],
    stops: [
      { at: [-8.0089, 31.6295], icon: 'hotel', name: 'Marrakech', note: 'Pick-up at your hotel', start: true, side: 'right' },
      { at: [-7.38, 31.287], icon: 'pass', name: 'Tizi n’Tichka', note: 'Pass at 2,260 m', side: 'right' },
      { at: [-7.129, 31.047], icon: 'kasbah', name: 'Aït Ben Haddou', note: '2 h in the ksar', side: 'left' },
      { at: [-6.9063, 30.9189], icon: 'film', name: 'Ouarzazate', note: 'Studios or kasbah', side: 'right', sideM: 'bottom' },
    ],
  },
};

// ---- --save: simplify an OSRM response (Douglas–Peucker, ~25 m) and keep it for builds
if (process.argv[2] === '--save') {
  const [, , , key, raw, tolArg] = process.argv;
  const coords = JSON.parse(fs.readFileSync(raw, 'utf8')).routes[0].geometry.coordinates;
  const tol = tolArg ? +tolArg : 0.00025; // optional 3rd arg: finer for walking routes (e.g. 0.00004 ≈ 4 m)
  const dp = (pts) => {
    if (pts.length < 3) return pts;
    const [a, b] = [pts[0], pts[pts.length - 1]];
    let max = 0, idx = 0;
    for (let i = 1; i < pts.length - 1; i++) {
      const p = pts[i], dx = b[0] - a[0], dy = b[1] - a[1];
      const d = Math.abs(dy * p[0] - dx * p[1] + b[0] * a[1] - b[1] * a[0]) / (Math.hypot(dx, dy) || 1);
      if (d > max) { max = d; idx = i; }
    }
    return max > tol ? dp(pts.slice(0, idx + 1)).slice(0, -1).concat(dp(pts.slice(idx))) : [a, b];
  };
  const out = dp(coords).map(([x, y]) => [+x.toFixed(5), +y.toFixed(5)]);
  fs.mkdirSync(ROUTES, { recursive: true });
  fs.writeFileSync(path.join(ROUTES, key + '.json'), JSON.stringify(out));
  console.log('saved', key, coords.length, '→', out.length, 'points');
  process.exit(0);
}

const [, , file, key] = process.argv;
const T = TRIPS[key];
if (!T) throw new Error('trip key: ' + Object.keys(TRIPS).join(', '));
const cutAt = (P, t) => { // keep the first t (0–1) of a road by distance
  let tot = 0; const seg = []; for (let i = 0; i < P.length - 1; i++) { const l = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]); seg.push(l); tot += l; }
  let goal = tot * t; const out = [P[0]];
  for (let i = 0; i < seg.length; i++) { if (goal <= seg[i]) { const f = goal / seg[i]; out.push([+(P[i][0] + (P[i + 1][0] - P[i][0]) * f).toFixed(5), +(P[i][1] + (P[i + 1][1] - P[i][1]) * f).toFixed(5)]); return out; } goal -= seg[i]; out.push(P[i + 1]); }
  return out;
};
const legs = T.legs.map(l => { let p = l.road ? JSON.parse(fs.readFileSync(path.join(ROUTES, l.road + '.json'), 'utf8')) : l.path; if (l.cut) p = cutAt(p, l.cut); return { kind: l.kind, path: p }; });
// side / sideM (phones): 'right' (default), 'left', 'top' or 'bottom' of the pin; hideM: no pin on phones; nameM: phone label
// a stop can sit part-way along the real road: at: 'route:0.45' = 45% of the first leg's distance
const alongRoute = (P, t) => {
  const seg = []; let tot = 0;
  for (let i = 0; i < P.length - 1; i++) { const l = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]); seg.push(l); tot += l; }
  let goal = tot * t;
  for (let i = 0; i < seg.length; i++) { if (goal <= seg[i]) { const f = goal / seg[i]; return [+(P[i][0] + (P[i + 1][0] - P[i][0]) * f).toFixed(5), +(P[i][1] + (P[i + 1][1] - P[i][1]) * f).toFixed(5)]; } goal -= seg[i]; }
  return P[P.length - 1];
};
const stops = T.stops.map(s => typeof s.at === 'string' ? { ...s, at: alongRoute(legs[0].path, parseFloat(s.at.split(':')[1])) } : s);
const data = { legs, stops, chip: T.chip, compassM: T.compassM, padM: T.padM, pad: T.pad }; // pad / padM = laptop / phone map padding [left, top, right, bottom] px

const legend = T.legend.map(([kind, t]) => `<span><i class="rmap__key rmap__key--${kind}" aria-hidden="true"></i>${t}</span>`).join('');
const html = `<figure class="rmap" aria-label="${T.title}">
    <div class="rmap__map" role="img" aria-label="${T.title}"></div>
    ${T.legend.length ? `<span class="rmap__legend">${legend}</span>` : ''}
    <script type="application/json" class="rmap__data">${JSON.stringify(data)}</script>
  </figure>`;

let page = fs.readFileSync(file, 'utf8');
let a = page.indexOf('<figure class="rmap"'), b;
if (a >= 0) b = page.indexOf('</figure>', a) + 9;
else { a = page.indexOf('<div class="dt-map">'); if (a < 0) throw new Error('no map on page'); b = page.indexOf('</div>', a) + 6; }
page = page.slice(0, a) + html + page.slice(b);
// Leaflet (map engine) only on pages that have a route map
const tags = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css">\n<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js" defer></script>\n';
if (!page.includes('leaflet.min.js')) page = page.replace('<link rel="stylesheet" href="/assets/css/styles.css">', tags + '<link rel="stylesheet" href="/assets/css/styles.css">');
fs.writeFileSync(file, page);
console.log('ok', key, legs.map(l => l.kind + ':' + l.path.length).join(' '), Math.round(html.length / 1024) + ' KB');
