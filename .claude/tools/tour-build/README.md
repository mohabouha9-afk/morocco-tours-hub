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
- `build-gm12.js` → `tours/12-days-grand-morocco.html` (12 days, one row per night; template = the finished 7-day Tangier → Marrakech page)
- `build-tg8.js` → `tours/8-day-morocco-tour-from-tangier.html` (8 days, one row per night; template = the finished 7-day Tangier → Marrakech page)
- `build-tc7.js` → `tours/7-day-tangier-to-marrakech-imperial-cities-tour.html` (7 days, no desert, one row per night; template = the finished 7-day Tangier → Marrakech page)
- `build-t13.js` → `tours/13-day-tangier-to-marrakech-tour.html` (13 days, deep south with off-road legs, one row per night; template = the finished 7-day Tangier → Marrakech page)
- `build-t14.js` → `tours/14-day-tangier-to-tangier-tour.html` (14-day loop, coast first, one row per night; template = the finished 7-day Tangier → Marrakech page)
- `build-c7.js` → `tours/7-day-morocco-tour-from-casablanca.html` (7 days, one row per night; template = the finished 7-day Tangier → Marrakech page)
- `build-c6.js` → `tours/6-day-casablanca-to-marrakech-tour.html` (6 days, one row per night; template = the finished 7-day Tangier → Marrakech page)
- `build-mc12.js` → `tours/12-day-marrakech-to-casablanca-tour.html` (12 days, Essaouira first, one row per night; template = the finished 7-day Tangier → Marrakech page)
- `build-mc13.js` → `tours/13-day-marrakech-to-casablanca-tour.html` (derived from build-mc12.js: + Meknes stop and a Rabat night)
- `build-m14.js` → `tours/14-day-morocco-tour-from-marrakech.html` (14-day Marrakech loop, coast last, one row per night)
- `build-mc15.js` → `tours/15-day-marrakech-to-casablanca-tour.html` (derived from build-mc13.js: + Chefchaouen day, Tangier, Asilah)
- `build-jn10.js` → `tours/10-days-morocco-journey.html` (10-day Casablanca → Marrakech, Rabat night + guided Marrakech day; template = the finished 8-day Imperial Cities page, like build-c9.js)
- `build-ag12.js` → `tours/12-day-morocco-tour-from-agadir.html` (12-day Agadir loop, desert first, coast last; template = the finished 8-day Imperial Cities page)
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
