# Tour page build scripts

Scripts used on 2026-11-15 to rebuild multi-day tour pages (see `.claude/PERFECT-TOUR.md`).
Kept here as **templates for the next tour**, not to be re-run on finished pages.

**Warning:** each `build-*.js` rebuilds its page from scratch from the approved template
(`tours/4-day-marrakech-to-fes-desert-tour-via-merzouga.html`). Running it again on a finished
page **wipes every edit made to that page afterwards**. Edit finished pages directly.

## Files
- `build-fd4.js` → `tours/4-day-fes-desert-tour.html` (4-col accommodation table, 4 days)
- `build-er3.js` → `tours/3-day-errachidia-to-merzouga-desert-tour.html` (3 days, 3-col table: removes `dt-acc--4`)
- `build-er4.js` → `tours/4-day-errachidia-to-merzouga-desert-tour.html` (4 days, 4-col table)
- `build-er5.js` → `tours/5-day-errachidia-to-marrakech-desert-tour.html` (5 days, one row per night; template = the finished 4-day Errachidia page)
- `build-ag3.js` → `tours/3-day-desert-tour-from-agadir.html` (3 days, 3-col table; template = 4-day Marrakech → Fes)
- `build-rr3.js` → `tours/3-day-desert-tour-rabat-merzouga-rabat.html` (3 days, 3-col table; template = the finished 3-day Rabat → Marrakech page)
- `build-rb3.js` → `tours/3-day-desert-tour-rabat-merzouga-marrakech.html` (3 days, 3-col table; template = the finished 3-day Agadir page)
- `build-ag5.js` → `tours/5-day-desert-tour-agadir-merzouga-errachidia-airport.html` (5 days, one row per night; template = the finished 5-day Errachidia page)
- `build-ag4.js` → `tours/4-day-desert-tour-agadir-merzouga-marrakech.html` (4 days, 4-col table)
- `icons.part.js` — shared SVG icons + `li()` helper, loaded by the build scripts (`eval`).
- `cards.js` — `node cards.js <out.json> <tour1.html> <tour2.html> <tour3.html>`: grabs each tour's
  `.htour` card from any page and writes the 3 Similar Tours `<li>` cards as JSON.
- `*-reviews.json` — the 3 review cards per page (real reviews only, picked from pages that already show them).
- `*-similar.json` — the 3 Similar Tours cards per page (made with `cards.js`).
- `todra-hotels.json` — Todra Gorge hotels (Standard / Midrange / Luxury) with Tripadvisor links.

## Next tour: how to reuse
1. Copy the build script closest in length (3 or 4 days) to `build-<key>.js`, change `out`, URL, NAME,
   TITLE, DESC, HERO and every content block (days, highlights, gallery, included, costs, table,
   Great for / Think twice, FAQ, Make It Your Own, JSON-LD) **from the new research file**.
2. Make `<key>-reviews.json` and `<key>-similar.json` (see how they were made in the scripts' comments
   and `cards.js`).
3. `node build-<key>.js`, then the map: `node .claude/tools/tour-map-stops.js` and
   `node .claude/tools/route-map.mjs tours/<page>.html <key>` (from the project root).
4. The script warns about `LEFTOVER:` words from the template; check them.
