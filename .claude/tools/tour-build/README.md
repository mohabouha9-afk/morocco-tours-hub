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
- `build-bm14.js` → `tours/14-days-best-of-morocco.html` (14-day Casablanca loop, Essaouira ×2 + Oualidia night; template = the finished 8-day Imperial Cities page)
- `build-c16.js` → `tours/16-day-complete-morocco-tour.html` (derived from build-bm14.js by a patch script: + Asilah/Tangier night and an Aït Ben Haddou night)
- `build-c21.js` → `tours/21-day-complete-morocco-tour.html` (patched from build-c16.js: Tangier → Marrakech, two deserts, off-road legs, Taroudant, Imlil)
- `build-t17.js` → `tours/17-day-tangier-to-marrakech-grand-tour.html` (patched from build-c21.js: Midelt + Todra nights, Ouzina, Zagora, Essaouira end)
- `build-a18.js` → `tours/18-day-atlantic-morocco-tour-marrakech-to-dakhla.html` (18-day coast route to Dakhla; colspan cells for towns with one good hotel; template = the finished 8-day Imperial Cities page)
- `build-cc7.js` → `tours/7-day-coastal-morocco-tour-from-marrakech.html` (7-day coast loop, one row per stop with a colspan cell for Imsouane; template = the finished 8-day Imperial Cities page)
- `build-ag6.js` → `tours/6-day-morocco-tour-agadir-essaouira-marrakech.html` (6-day Agadir → Marrakech; derived from build-cc7.js by a patch script)
- `build-me4.js` → `tours/4-day-marrakech-essaouira-agadir-tour.html` (4-day Marrakech → Agadir; derived from build-ag6.js)
- `build-mkhub.js` → `destinations/marrakech.html` (destination page on the Merzouga hub shell; header copied untouched, URL swap only in head)
- `build-me3.js` → `tours/3-day-marrakech-essaouira-tour.html` (3-day Marrakech round trip with an Essaouira night; has a `dims()` helper that reads image sizes from other pages)
- `build-ms6.js` → `tours/6-day-marrakech-surroundings-tour.html` (6 days from one Marrakech riad, original route kept; derived from build-me3.js)
- `build-fc3.js` → `tours/3-day-fes-chefchaouen-volubilis-tour.html` (3-day Fes round trip, original route kept; copies hotel rows from a finished page with `cells()`)
- `build-ft4.js` → `tours/4-day-fes-to-tangier-via-chefchaouen.html` (4-day Fes → Tangier, original route kept; derived from build-fc3.js)
- `build-tc5.js` → `tours/5-day-tangier-chefchaouen-fes-tour.html` (5-day Tangier → Fes, original route kept; derived from build-ft4.js)
- `build-tm5.js` → `tours/5-day-morocco-tour-tangier-to-marrakech.html` (5-day Tangier → Marrakech via Fes + Merzouga camp, original route kept; `cellsFrom()` copies hotel rows from several pages)
- `build-nt7.js` → `tours/7-day-northern-morocco-tour.html` (7-day Tangier → Fes, original route kept; derived from build-tc5.js)
- `build-fy6.js` → `tours/6-day-morocco-family-tour-marrakech-merzouga.html` (6-day family loop to Merzouga, original route kept; derived from build-tm5.js)
- `build-hm9.js` → `tours/9-day-morocco-honeymoon-tour-from-marrakech.html` (9-day honeymoon loop, original route kept; derived from build-fy6.js)
- `build-yg9.js` → `tours/morocco-yoga-retreat-sahara-desert.html` (9-day yoga retreat, original route kept; derived from build-hm9.js)
- `build-ph11.js` → `tours/11-day-morocco-photography-tour-from-casablanca.html` (11-day photography tour, original route kept; derived from build-jn10.js)
- `build-fm3.js` → `tours/3-day-fes-to-marrakech-desert-tour.html` (NEW tour 2026-11-18, 3 days, 3-col table; template = the finished 3-day Rabat → Marrakech page)
- `build-fr3.js` → `tours/3-day-fes-to-merzouga-desert-tour.html` (NEW tour 2026-11-18, Fes round trip, camp + Merzouga hotel; template = the finished 3-day Fes → Marrakech page)
- `build-fr2.js` → `tours/2-day-fes-to-merzouga-desert-tour.html` (NEW tour 2026-11-18, 2-day Fes round trip, camp only; template = the finished 2-day Marrakech → Merzouga page)
- `build-mm4.js` → `tours/4-day-marrakech-to-merzouga-desert-tour.html` (NEW tour 2026-11-18, Marrakech round trip via Dades, Merzouga, Draa, Ouarzazate, Telouet; template = the finished 4-day Agadir page, re-orders its table rows)
- `build-mf2.js` → `tours/merzouga-to-fes-tour.html` (NEW tour 2026-11-18, starts in Merzouga, camp + drive to Fes; template = the finished 2-day Fes → Merzouga page)
- `build-mk3.js` → `tours/merzouga-to-marrakech-tour.html` (NEW tour 2026-11-18, starts in Merzouga, camp + Dades + Marrakech; template = the finished 3-day Fes → Marrakech page)
- `build-zg2.js` → `tours/2-day-marrakech-to-zagora-desert-tour.html` (NEW tour 2026-11-18, Marrakech round trip to a Zagora camp; template = the finished 2-day Marrakech → Merzouga page)
- `build-cm4.js` → `tours/4-day-casablanca-to-merzouga-desert-tour.html` (NEW tour 2026-11-19, Casablanca → Rabat → Fes → Merzouga camp → Dades → Marrakech, 4-col table; template = the approved 4-day Marrakech → Fes page, like build-ag4.js)
- `build-oz2.js` → `tours/2-day-ouarzazate-to-merzouga-desert-tour.html` (NEW tour 2026-11-23, 2-day Ouarzazate loop, camp only; template = the finished 2-day Marrakech → Merzouga page, like build-fr2.js; `oz2-link.js` = the one-off linking script)
- `st-lib.js` + `build-st.js` → the 6 student/group tours (one generic builder: replaces every block by structural markers, so a new tour = one config object; `node build-st.js <key|all>`)
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
- `build-fm2.js` → `tours/2-day-fes-to-marrakech-desert-tour.html` (NEW tour 2026-11-23, Fes → Merzouga camp → Marrakech; template = the finished 2-day Fes → Merzouga page; links by `fm2-link.js`)
