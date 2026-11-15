# The Perfect Multi-Day Tour page — playbook

How to build (or rebuild) a multi-day tour page in `tours/`, the way the owner approved it on the
3-day Marrakech → Merzouga page (2026-11-14) and the tours built after it (2-day Merzouga, 3-day and
4-day Marrakech ⇄ Fes, 4-day and 5-day Fes → Marrakech, 5-day Marrakech → Fes).
Read this file, `.claude/OWNER-PROFILE.md` and the tour lines in `CLAUDE.md` before starting a tour.
Day trips have their own blueprint: `.claude/PERFECT-DAY-TRIP.md`.

---

## 1. The working process (always in this order)

1. **Pick the tour and read what exists.** The old page (itinerary, accommodation text, links),
   `CLAUDE.md` notes for related tours, and the earlier research files in `.claude/research/`.
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
5. **Build by script** from the latest approved tour page (same markup and classes), replacing every
   block's content. Keep a copy of the old page in the session scratchpad (`<tour>-before.html`).
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
| 7 | **Accommodations** `#stay` | intro line + table + "Or similar, depending on availability…" note → **Is this tour for you?** (Think twice if, full width) |
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
- **Think twice if** = the real alternatives the visitor weighs, each linked to a real tour of ours:
  **shorter**, **longer / slower / more places**, **the other direction**. No weak reasons.
- FAQ = the tour's own questions from research (only the booking FAQ repeats across pages).
  Answers ~3 lines.
- When the tour has **no monument visits** (2-day), don't mention fees, kasbahs to visit or a
  "Free:" line — only "short stops to stretch your legs and for lunch".

## 5. Costs & accommodations

- **Costs on the way:** lunches · each paid entrance fee on its own line (e.g. "Taourirt Kasbah:
  small fee, if you go in") · **one "Free: …" line** listing the free sites · tips. No "X is free"
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
    Riad Kniza · Fes = Dar Seffarine / Riad Dar Bensouda / Riad Fes.

## 6. Route map (`figure.rmap`, real Leaflet map)

- Real roads from OSRM, fetched once per day of driving:
  `curl.exe -s -o raw.json "https://router.project-osrm.org/route/v1/driving/LON,LAT;LON,LAT;…?overview=full&geometries=geojson"`
  then `node .claude/tools/route-map.mjs --save <key> raw.json 0.0006` (long routes), add a `TRIPS`
  entry, and `node .claude/tools/route-map.mjs tours/<page>.html <key>` (put `<div class="dt-map"></div>`
  where the map goes the first time). Use the OSRM km in the itinerary (round, "about 560 km").
- **Pin every stop AND places known for something** (Tizi n'Tichka pass, Taourirt, Dades, Todra,
  Erfoud fossils, Rissani market, Ziz Valley, Midelt, Ifrane, Draa…). Long routes `tall: true`.
  Minor stops `pinM` (small icon on phones, name on tap) or `mini`; `hideM` only if needed.
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

## 9. Tried and rejected (don't bring back)

- Downsides in key facts or the overview ("Longest drive").
- Anything under the booking box (side cards, "Read before you go" there, a "100% Local" ribbon).
- "Private or shared tour?" comparison table.
- "Great for" box (only "Think twice if" stays).
- "Read before you go" blog-links block (removed from the tour page).
- Navy-header / striped accommodation table with stars; a separate camp photo row under the table.
- More than 2 camp photos in the gallery; 8-photo gallery.
- Copying FAQs, reviews and gallery photos from the previous tour page.
- Centred hero title on laptop for the homepage (phones only).
