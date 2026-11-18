# The Perfect Multi-Day Tour page — playbook

How to build (or rebuild) a multi-day tour page in `tours/`, the way the owner approved it on the
3-day Marrakech → Merzouga page (2026-11-14) and the tours built after it (2-day Merzouga, 3-day and
4-day Marrakech ⇄ Fes, 4-day and 5-day Fes → Marrakech, 5-day Marrakech → Fes, 4-day Marrakech → Erg Chigaga).
**Owner (2026-11-17): for each new tour, read ONLY this file, then build.** Everything needed is here (process, rules, places in use, map tools); do not re-read CLAUDE.md, OWNER-PROFILE.md or old research files first. Look up a related tour in CLAUDE.md only if a specific fact is missing.
Day trips have their own blueprint: `.claude/PERFECT-DAY-TRIP.md`.

---

**Owner rule (2026-11-17): modify the tours we have, never invent new ones.** Keep each tour's original route (days, nights, stops) and rebuild only the layout and the writing; propose route changes to the owner instead of making them.

## 1. The working process (always in this order)

1. **Pick the tour** (section 10 lists what is left) and read its old page once (itinerary, links).
2. **Research first. Never copy the previous page's content** (owner, 2026-11-15).
   - Keyword volumes with **OpenSEO** (`get_keyword_metrics`, project "Default", US market).
   - Who ranks on Google page 1 for the main keyword (`firecrawl_search`).
   - Read 1–2 top pages in full: always **moroccofabuloustravel.com** (owner's reference for tours) +
     the top GetYourGuide/Viator listing (rating, review count, pick-up/return times, inclusions,
     the complaints in reviews).
   - Forum worries: Reddit (read threads through Alexandria → `scrapecreators` `reddit/post-comments`;
     Firecrawl can't scrape Reddit), TripAdvisor forum.
   - Facts that change money/time (entrance fees, ticket rules, distances) from several sources;
     when sources disagree, say so and write the safe version ("small fee at the door").
   - Save everything to `.claude/research/<tour>-research.md` with links and short quotes.
3. **Find what is unique about this tour** (e.g. the 5-day Marrakech → Fes ends with a guided Fes
   medina day). Lead with it: key fact 4, overview, one FAQ.
4. **Ask the owner only what research can't answer** (pick-up time, who guides, camel ride length,
   which camps/hotels, cancellation, extras). Ask in one short numbered list. Never write a guess
   as a fact. If the owner says "you choose / you are the expert", choose from research and **tell
   them what you chose and why**, flagged "owner to confirm".
   Owner (2026-11-16): "search, look what others do, you are the expert" → for route, nights, end point
   and stops, decide from research yourself (check distances with OSRM) instead of asking; ask only facts
   only the owner knows (pick-up time, which camps they use).
5. **Build by script** from the latest approved tour page (same markup and classes), replacing every
   block's content. Keep a copy of the old page in the session scratchpad (`<tour>-before.html`).
   Template scripts + helpers (`cards.js` for Similar Tours cards, shared icons) are in
   `.claude/tools/tour-build/` (read its README: never re-run a script on a finished page).
   After building, **update this tour's card text/title on every page that links to it**
   (homepage, tours/index, city page, related tours) so the old route isn't described there.
6. **Route map** (see section 6), then **link the page** (section 7).
7. **Check it yourself** at 1366×768, 768 and 375 (section 8) before reporting. Share a screenshot
   only when it helps; say plainly what was checked and what still needs the owner.
8. **Log it** in `CLAUDE.md` (one "Done/Update" paragraph per change, with "Owner to confirm") and
   update this file when the owner sets a new rule.
9. **Commit/push only when the owner asks** ("save changes" = commit; "push" = push the current
   branch). Use a message file for `git commit -F` (PowerShell breaks here-strings).

## 2. Page order (final, approved)

Right column on laptop = **only the booking box**, so it follows the visitor down to the last line.
Nothing else goes under it (tried and reverted: Make It Your Own, costs, guides, a comparison table).

| # | Block | Notes |
|---|---|---|
| 1 | Hero `section.page-hero.dt-hero` | gold city chip, h1 = tour name + `.script` line, 4 facts: Duration, Start & end, Format: Private, Departures |
| 2 | Section bar `nav.dtnav` | centred on laptop, gold dots, active section in gold (scroll-spy in main.js) |
| 3 | **Overview** `#overview` | 2 short selling paragraphs → 6 key facts → Highlights |
| 4 | **Gallery** `#gallery` | `.dt-gal--6`: 6 photos, 3 per row (2 on phones), **max 2 photos of the camp** |
| 5 | **Itinerary** `#itinerary` | `ol.dt-prog.dt-prog--acc.dt-prog--days`: one open/close card per day (day 1 open), ~3–4 lines, then a meta line `ul.dt-prog__meta`: km + hours on the road · Night: … · meals |
| 6 | **What's Included** `#included` | Included / Not included / Good to know → **Costs on the way** → **Tour Map** (`h3.dt-h3` + `figure.rmap` + one-line note) |
| 7 | **Accommodations** `#stay` | intro line + table + "Or similar, depending on availability…" note → **Is this tour for you?** = two boxes like the day trips: **Great for** (3 lines, tour-specific) + **Think twice if** (owner, 2026-11-15) |
| 8 | **Reviews** `#reviews` | 4.9 from 5,000+ + Read more reviews + 3 site reviews (real, from reviews.html) |
| 9 | **FAQ** `#faq` | 6 questions, first open, FAQPage JSON-LD built from the visible FAQ |
| 10 | **Make It Your Own** `#custom` | one line + 6 options in 2 columns (`.dt-ticks--2`), even number |
| side | Booking box `aside.dt-aside.dt-aside--guides#book > .dt-aside__stick > .dt-book` | "Private tour" / **Book Your Dates** / price note / 2 trust lines / form → WhatsApp / Ask on WhatsApp / "Local agency · 7+ years · 24/7 +212…" |
| 11 | **Similar Tours** `section.dt-others` | "View all tours" link above (laptop), 3 `.htour` cards, gold arrow link at the end of the swipe row (phones) |
| 12 | Closing banner `section.hcta` | "Want to Change This Itinerary?" + "The N-day route is a starting point…" |
| fixed | Phone bar `div.dt-mbar` | tour short name + "Free cancellation up to 24 h" + BOOK YOUR DATES |

## 3. Fixed content (owner decisions — same on every tour)

- **Key facts = exactly 6, in this order:** Start & end (one card, "Fes → Marrakech" or "Marrakech")
  · Type: Private tour · Accommodation: "Check below" (link to `#stay`) · **one tour-specific fact**
  (e.g. "Desert night: Camp in the dunes", "Fes medina: Guided day included") · Payment: Small
  deposit to book · Cancellation: Free up to 24 h before. Values short, one line each at 1366.
- **No price** anywhere (not on the page, not in JSON-LD). Booking note: "The price depends on your
  dates, your accommodation and the number of travellers." No "we reply within 24 hours".
- Trust lines: **Transparent pricing** – What we agree on is what you pay · **Free cancellation** –
  Up to 24 hours before the tour.
- **Payment:** 20–30% deposit by bank transfer, the rest on arrival in cash (EUR, USD or MAD) or by
  card. FAQ "How do I book and pay?" = 2 numbered steps + "Cancellation is free up to 24 hours before
  the tour."
- **One driver-guide does the whole tour** (no separate paid guide at the sites).
- **Camel ride ≈ 1 hour** at sunset; back by camel or 4×4; sandboarding included (desert tours).
- **Monument entrance fees are never included** — list them only in Costs on the way.
- **Lunches not included**, honest cost "about €10–15 each; you choose where". Tips "up to you",
  never an amount. No soft-drinks line.
- **No shopping stops** unless the guest asks (say it in the overview / FAQ, not as a key fact).
- Pick-up at the hotel, or the nearest gate for medina riads; exact time confirmed on WhatsApp.
  A **winter early start** is mentioned only in Good to know.
- Good to know **starts with** "This is a suggestion: tell us your preferences".
- Highlights **end with** `li.dt-high__more` "And much more along the way".
- Reviews: only real ones from reviews.html; desert reviews (Lukas M., Sarah L.) on desert tours.
- Vehicle: "Private A/C 4×4 or minivan (see our fleet → `../index.html#fleet`)".

## 4. Writing rules learned with the owner

- **The top sells.** No downsides in the hero, overview or key facts (rejected: "Longest drive:
  Day 3, 9 to 10 hours"). The road is sold as part of the trip.
- **A downside only next to its solution or a better tour** ("Car-sick? Sit in front on the Tichka
  bends", "Long drives tire you: the 3-day tour splits the drive"). Honest facts (km/hours) live in
  the itinerary meta lines and the FAQ.
- **Short wording when the idea is clear** and there is no SEO reason ("Hotel pick-up and drop-off").
- **Say each thing once** across key facts, highlights, itinerary, included, FAQ.
- **Think twice if** (owner, final rule 2026-11-16): **exactly 3 lines, each a short question + short
  answer**, about the visitor's **worries and preferences** ("is this tour right for me?") → a better-fitting
  tour **or one of our services**. Each answer names the one real difference, read from the linked page
  (never vague: "similar road", "more than the desert"). Typical angles: shorter / longer or slower / other
  start or direction / just a taste. Examples (3-day Agadir): "Long drives worry you? The 4-day Agadir tour
  adds a night in the Dades Valley" · "Starting in Marrakech? Take the 3-day Marrakech to Merzouga tour" ·
  "Just want a taste of the desert? Our Agafay day trip is 40 minutes from Marrakech".
  Rejected: long lines ("You want a full day in the dunes and fly home from Errachidia: the 5-day … adds …
  and ends at …"), weak reasons ("You will see Fes on your own").
- **Make It Your Own** = **add-ons and upgrades to this tour**, incl. our services, linked where a page
  exists (quad biking in the Merzouga dunes, upgrade to a luxury camp, a medina tour or hammam in
  Marrakech, end in Fes, go on to Chefchaouen…). 6 items.
- **Never the same item in Think twice and Make It Your Own.** Be flexible: pick what fits each tour,
  never a fixed list.
- FAQ = the tour's own questions from research (only the booking FAQ repeats across pages).
  Answers ~3 lines.
- When the tour has **no monument visits** (2-day), don't mention fees, kasbahs to visit or a
  "Free:" line — only "short stops to stretch your legs and for lunch".

## 5. Costs & accommodations

- **Costs on the way:** lunches · each paid entrance fee on its own line (e.g. "Taourirt Kasbah:
  small fee, if you go in") · **one line "All other sites are free"** (owner, 2026-11-16: never list the free sites by name) · tips. No "X is free"
  sentences, no "houses ask 10–20 MAD", no soft drinks.
- **Accommodations** (section + tab name "Accommodations", owner's wording):
  - Plain table `.dt-acc-wrap > table.dt-acc` (white box, muted uppercase header, thin lines —
    the navy header/stripes/stars version was rejected as too heavy).
  - Content = **real places with links** (Tripadvisor/Booking, `target="_blank" rel="noopener nofollow"`),
    3 levels Standard / Midrange / Luxury, + "Or similar, depending on availability…".
  - 1–2 nights: columns = Options | Night 1 | Night 2. 3 nights: 4 columns (`.dt-acc--4`).
    4+ nights: **one row per night**, columns Standard / Midrange / Luxury.
  - Places in use so far (my research picks, owner to confirm): Dades = Riad Rihana / Citadelle Gorges /
    Hotel Xaluca Dades · Merzouga camps = Erg Chebbi Sahara Camp / Sandrock Luxury Camp / Desert
    Luxury Camp · Merzouga hotel = Riad Madu / Kasbah Mohayut / Kasbah Hotel Tombouctou · Aït Ben
    Haddou = Kasbah Tebi / Riad Caravane / Riad Ksar Ighnda · Marrakech = Riad 144 / Riad Dar Anika /
    Riad Kniza · Fes = Dar Seffarine / Riad Dar Bensouda / Riad Fes · Zagora = Kasbah Ziwana / Riad Lamane / Kasbah Sirocco · Erg Chigaga = Camp Al Koutban (shared bathrooms) / Desert Luxury Camp Erg Chigaga / Erg Chigaga Luxury Desert Camp · Ouarzazate = Dar Chamaa / Kenzi Azghor Hotel / Le Berbère Palace · Todra Gorge = Guesthouse Panorama Todra / La Petite Gorge / Auberge Le Festival · Midelt = Kasbah Izoran / Villa Pomme d’Or / Kasbah Asmaa · Rabat = Riad Dar Saidi / Riad Zyo / Sofitel Jardin des Roses · Chefchaouen = Casa Perleta / Dar Echchaouen / Lina Ryad & Spa · Tangier = Hilton Garden Inn City Center / Grand Hotel Villa de France / Fairmont Tazi Palace · Casablanca = Barceló Anfa / Le Casablanca Hotel / Four Seasons · Erfoud = Kasbah Tizimi / Kasbah Xaluca / Palais Masandoïa · Oualidia = Dar Beldi / Hôtel L’Hippocampe / La Sultana Oualidia · Imsouane = Imsouane Magic House / Windhouse (Midrange + Luxury) · Agadir = Hyatt Place / Royal Atlas Hotel & Spa / Sofitel Agadir Thalassa · Taghazout = World of Waves Surf House / Radisson Blu Surf Village / Fairmont Taghazout Bay.

## 6. Route map (`figure.rmap`, real Leaflet map)

- Real roads from OSRM, fetched once per day of driving:
  `curl.exe -s -o raw.json "https://router.project-osrm.org/route/v1/driving/LON,LAT;LON,LAT;…?overview=full&geometries=geojson"`
  then `node .claude/tools/route-map.mjs --save <key> raw.json 0.0006` (long routes), add a `TRIPS`
  entry, and `node .claude/tools/route-map.mjs tours/<page>.html <key>` (put `<div class="dt-map"></div>`
  where the map goes the first time). Use the OSRM km in the itinerary (round, "about 560 km").
- **Pin every stop AND places known for something** (Tizi n'Tichka pass, Taourirt, Dades, Todra,
  Erfoud fossils, Rissani market, Ziz Valley, Midelt, Ifrane, Draa…). Long routes `tall: true`.
  Minor stops `pinM` (small icon on phones, name on tap) or `mini`; `hideM` only if needed.
- **Stops of the desert-tour maps live in `.claude/tools/tour-map-stops.js`** (shared stop names/icons
  `S.*`, one list per trip key). Add the new tour's list there, run `node .claude/tools/tour-map-stops.js`
  (it rewrites the `stops:` of each TRIPS entry in route-map.mjs), then build the page's map. Long
  routes that reuse roads can copy an existing TRIPS entry (title, chip text) and reuse its saved roads;
  reversed routes = reversed copies of saved road files (e.g. `fm4-d1` = `mzf3-d3` reversed).
- Off-road desert legs (no road for OSRM) = hand-drawn `{ kind: 'quad', path: [...] }` legs, legend label "Off-road by 4×4" (ec4).
- Map note = **one line + a Google Maps link**: "{Route}, about N km in N days. See the route on
  Google Maps" (google.com/maps/dir with the main stops, new tab). No distance list under the map.
- Check by script: no label overlaps, nothing off-map at 1366 and 375; zoom works (buttons, Ctrl/⌘ +
  wheel, pinch).

## 7. Linking a new or renamed tour

sitemap.xml · tours/index.html (its city + theme sections, and the chip counts in `nav.tbar`) · the
city page (`tours/morocco-tours-from-<city>.html`) · the homepage Sahara row if it's a desert tour
(add at the end; first 3 are Best Sellers) · related tours' "Think twice" / Similar Tours lines.
Header mega-menu counts are NOT changed without asking (header rollout = confirm first).

## 8. Technical checklist

- Body `site2 page-swap`; title ≤ ~60 chars with the main keyword; own meta/og/twitter description;
  canonical/hreflang/og:url = the page URL; JSON-LD = TravelAgency + **TouristTrip** (itinerary,
  no price) + **FAQPage** built from the visible FAQ (check every JSON-LD parses).
- At **1366×768**: booking box ≤ ~620px tall and on screen to the last line; key facts and
  highlights one line each; gallery 3 per row; map clean; tabs all point to a section; no console errors.
- At **768 and 375**: no sideways scroll (`scrollWidth = innerWidth`), tables fit, map labels clean,
  phone bar shows and hides while the booking box is visible.
- Shell notes (Windows): use Node scripts in the scratchpad for edits with curly quotes or long HTML;
  `[IO.File]::WriteAllText` with UTF-8 no BOM; lazy images report width 0 until scrolled into view.

**Keywords check (2026-11-17):** when deriving a build script from another tour's script, replace the `<meta name="keywords">` line too (the 6-day Agadir page shipped with the 7-day page's keywords).
**Template check (2026-11-17):** pages built from the 8-day template must also replace the hero chip (`span.dt-hero__loc`, it holds an icon) and the hero `<small>Route</small>` value — the 12-day Agadir, 14-day and 16-day pages shipped with "Casablanca → Marrakech" there. Check all three (chip, hero route, key fact 1) by script after each build.

## 9. Tried and rejected (don't bring back)

- Downsides in key facts or the overview ("Longest drive").
- Anything under the booking box (side cards, "Read before you go" there, a "100% Local" ribbon).
- "Private or shared tour?" comparison table.
- "Read before you go" blog-links block (removed from the tour page).
- Navy-header / striped accommodation table with stars; a separate camp photo row under the table.
- More than 2 camp photos in the gallery; 8-photo gallery.
- Copying FAQs, reviews and gallery photos from the previous tour page.
- Centred hero title on laptop for the homepage (phones only).

## 10. Progress (update when a tour is done)

**Rebuilt (20 desert tours, all logged in CLAUDE.md):** 2-day Marrakech → Merzouga · 3-day Marrakech → Merzouga ·
3-day Marrakech → Fes · 4-day Marrakech → Fes via Merzouga · 4-day Fes → Marrakech · 5-day Fes → Marrakech ·
5-day Marrakech → Fes · 4-day Erg Chigaga · 6-day Zagora/Ouzina/Merzouga · 7-day Erg Chigaga & Merzouga ·
4-day Fes desert loop (Fes → Merzouga → Todra → Fes) · 3-day Errachidia · 4-day Errachidia (Todra Gorge loop) · 5-day Errachidia → Marrakech · 3-day Agadir → Merzouga → Marrakech · 4-day Agadir → Merzouga → Marrakech · 5-day Agadir → Merzouga → Errachidia airport · 3-day Rabat → Merzouga → Marrakech · 3-day Rabat → Merzouga → Rabat.

**Desert tours still on the old layout:**
student/group desert tours. Then the grand, northern, coast and themed tours.
**Grand tours started (2026-11-16, owner: student/group desert tours skipped for now — group clashes with 100% private):** 7-day Marrakech → Fes, 8-day Imperial Cities & Sahara, 10-day Marrakech → Tangier, 10-day Tangier → Marrakech, 9-day Casablanca → Marrakech, 10-day Casablanca round, 10-day Marrakech → Casablanca, 8-day Marrakech → Casablanca, 7-day Marrakech → Tangier, 7-day Tangier → Marrakech, 12-day Grand Morocco (Tangier → Marrakech), 8-day Tangier → Marrakech, 7-day Imperial Cities (Tangier → Marrakech), 13-day Tangier → Marrakech via the deep south, 14-day Tangier loop, 7-day Casablanca → Marrakech, 6-day Casablanca → Marrakech, 12-day Marrakech → Casablanca, 13-day Marrakech → Casablanca, 14-day Marrakech round trip, 15-day Marrakech → Casablanca, 10-day Casablanca → Marrakech (10-days-morocco-journey), 12-day Agadir loop, 14-day Best of Morocco (Casablanca loop), 16-day Complete Morocco, 21-day Complete Morocco, 17-day Tangier → Marrakech done — **all grand tours rebuilt**.
**Coast tours started (2026-11-17):** 18-day Atlantic Marrakech → Dakhla, 7-day Coastal Marrakech round trip (Essaouira, Imsouane, Taghazout, Agadir), 6-day Agadir → Marrakech via Essaouira, 4-day Marrakech → Essaouira → Agadir, 3-day Marrakech & Essaouira, 6-day Marrakech & surroundings (original route kept) — **all coast tours done**.
**Northern tours started (2026-11-17):** 3-day Fes, Chefchaouen & Volubilis, 4-day Fes → Tangier via Chefchaouen, 5-day Tangier, Chefchaouen & Fes, 5-day Tangier → Marrakech, 7-day northern (original routes kept) — **all northern tours done**.
**Themed tours started (2026-11-17):** 6-day family tour, 9-day honeymoon tour, 9-day yoga retreat, 11-day photography tour (original routes kept) — **all themed tours done**.
**Student/group tours done (2026-11-17):** 3-day group (stays SHARED, owner), 3-day student Merzouga, 3-day student Fes, 4-day student, 5-day student Marrakech airport, 5-day student Tangier. Student perks (owner): free place for the teacher/organiser on large groups + lower price per person for bigger groups, no numbers. **Every tour page is now rebuilt.**
**New tours from the content roadmap (2026-11-18):** 3-day Fes → Marrakech (build-fm3.js), 3-day Fes → Merzouga → Fes (build-fr3.js), 2-day Fes → Merzouga → Fes (build-fr2.js), 4-day Marrakech → Merzouga → Marrakech (build-mm4.js), 2-day Merzouga → Fes (build-mf2.js), 3-day Merzouga → Marrakech (build-mk3.js). Next candidates: Priority 1 in .claude/research/content-roadmap-2026-11.md.
**Reviews in use:** only 6 real ones exist (Sarah L., James T., Maria G., Lukas M., Chloé D., Aisha K.); vary the trio per page.
**Next tour:** the northern, coast and themed tours.
**Grand-tour research (owner, 2026-11-16):** "search the web and analyze the top ranking pages" — read the Google page-1 results in full (Tripadvisor listings with ratings + reviewer complaints, moroccofabuloustravel.com, 1–2 agency pages), follow the proven route structure, and answer the reviewers' complaints on the page (FAQ, Good to know). Notes go in the build script header (no research file).
**Phone table rule (2026-11-16):** long one-word names (Chefchaouen, Echchaouen, Tombouctou) can push the accommodations table wider than a 375px phone; check `.dt-acc-wrap` scrollWidth and add &shy; soft hyphens to the culprit cells (laptop shows the full word).
**Still to update:** the 13 tours rebuilt before 2026-11-16 have the older, longer Think twice lines (no services) — apply the final rule when the owner asks.
Check which pages are done with: `grep -l dt-prog--days tours/*.html`.

**Errachidia airport tours (rule learned 2026-11-15):** most flights land in the evening, so the first night is a
Merzouga hotel and the camp comes on day 2; we meet every flight at any hour; ending in Fes or Marrakech is offered. One-way tours also offer going on beyond the desert (Chefchaouen, Tangier, Rabat, Casablanca) in the FAQ + Make It Your Own, and drop-off at the arrival city's airport (owner, 2026-11-16). **Tours ending at Errachidia airport:** the daily Royal Air Maroc flight to Casablanca leaves ~06:15, so for that flight the last night is in Errachidia (≈10 min from the airport), otherwise a Merzouga hotel.
