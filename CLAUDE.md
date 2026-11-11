# CLAUDE.md — Morocco Tours Hub website

## The business
- **Morocco Tours Hub** — local Moroccan tour operator. Live site: https://moroccotourshub.com/
- Sells **100% private, tailor-made tours**: Sahara desert, imperial cities, Atlas mountains, Atlantic coast, plus day trips from Marrakech.
- Value props: private & customisable, expert local driver-guides, comfortable vehicles (4x4s, minivans, minibuses), flexible payment (small deposit, balance on arrival).
- Audience: international travellers who want authentic, flexible, reliable, high-quality trips.
- Tone (for when copy work starts): warm, professional, authentic, inspiring.
- Target keywords: "private Morocco tours", "Sahara desert trips", "custom Morocco itineraries".
- WhatsApp: **+212 621 460 083** → link `https://wa.me/212621460083` (use for header, hero, CTA banner, floating button).
- Goal set by the owner: make the redesign genuinely **amazing** — high craft, not generic. Claude has latitude to make sensible design decisions.

## Current phase: STRUCTURE & DESIGN ONLY
- We are redesigning **layout, section order and visual design** of the homepage first (`index.html` + `assets/css/styles.css`).
- **Do not rewrite copy yet.** Keep existing text, headings, links, prices and tour data; move/restyle them. Content and SEO rewrites come in a later phase.
- Work **one section at a time**, as the user directs. Don't redesign sections that weren't asked for.

## Design reference
- Reference site: https://agenciamarrocostours.com/en/ — imitate its **structure, section hierarchy, layout patterns and UX**, not its assets.
- Reference homepage order: Header (mega-menu: Tours by city, Destinations) + WhatsApp CTA → full-bleed hero (headline, 2 CTAs, Tripadvisor badge, 5 trust icons strip) → Destinations image grid → About (text + 4 stat counters + image) → Tours card grid (duration badge, reviews, start/end, "View details") → "What makes us different" 6-card grid → FAQ accordion → Reviews carousel → Excursions card grid → CTA banner (image background, WhatsApp + Quote) → rich footer (popular tours, destinations, contact) → floating WhatsApp button.
- **Never copy** their text, images, logo, brand name, colours or code. Use our own brand, our own images from `assets/images/`, our own content.

## Project facts
- Plain static site: 162 HTML pages, **no build step, no templating**. One stylesheet `assets/css/styles.css` (design tokens in `:root`), one script `assets/js/main.js`.
- Folders: `tours/` (tour pages + `tours/index.html`), `destinations/`, `blog/`, root pages (about, contact, reviews, themed tours…), `assets/images/` (jpg/webp).
- **Header and footer are copy-pasted into every page.** A header/footer change must be applied to all 162 files (scripted find/replace) — confirm with the user before doing that.
- Paths are root-absolute (`/assets/...`), so pages must be served from the project root, not opened as `file:///`.
- `styles.css` is shared by every page: when changing a shared class, check it doesn't break tour/blog pages. Prefer new, homepage-scoped classes for redesigned sections.
- Keep existing SEO plumbing intact: `<title>`, meta description, canonical, hreflang, JSON-LD, `sitemap.xml`, `robots.txt`, URLs/filenames.

## Brand tokens (from styles.css — use these, don't invent new brand colours)
- Navy `--navy #0e2a41` / `--navy-deep #0a2033` / `--navy-800 #14344f`
- Gold `--gold #c0913b` / `--gold-light #d9b464` / `--gold-deep #a5762a`
- Neutrals `--cream #faf6ee`, `--cream-2 #f4ecdd`, `--sand #f7f1e6`, `--ink #16324a`, `--muted #5c6b78`, `--line #e7ddca`
- Fonts: Playfair Display (headings), Poppins (body), Dancing Script (accents only)
- Radius 16px / 10px; shadows `--shadow-sm`, `--shadow`, `--shadow-lg` (navy-tinted)

## Code rules
- Invoke the `frontend-design` skill before writing frontend code.
- Semantic HTML5 (`header`, `nav`, `main`, `section` with headings, `article` for cards, `footer`); one `h1` per page.
- Mobile-first and fully responsive; test at 375px, 768px and 1280px.
- Edit the existing `styles.css` (no Tailwind CDN, no new frameworks) unless the user decides otherwise.
- Remove redundant/dead markup and CSS as sections are rebuilt.
- Every clickable element has hover, focus-visible and active states. Animate only `transform`/`opacity`; never `transition: all`.
- Images: real images from `assets/images/`, with `alt`, `width`/`height`, `loading="lazy"` (except the hero).
- Give the user modular, self-contained section blocks when they ask for copy-paste code.

## Preview & checking
- Start the local server: `node serve.mjs` → http://localhost:3000 (don't start a second one if running).
- View pages in the built-in browser at localhost, never `file:///`. Compare against the reference at desktop and mobile widths before calling a section done.

## Progress log (homepage redesign)
**Done (2026-11-10/11) — header + hero top, homepage only (`index.html`):**
- **Overlay header**: `<header class="site-header site-header--overlay">` sits on the hero photo (transparent, white links, gold active underline). On scroll (`main.js` toggles `.is-scrolled` at >10px) a **black** bar fades in (`::before`, opacity only). Other pages still use the old white sticky header.
- **Logo**: homepage uses `assets/images/logo-white.png` — generated from `logo.png`: word MOROCCO + man + tagline + swoosh white; **camels & palm trees stay dark**; gold star, lantern and gold streaks removed from the word (first O replaced by a copy of a clean O; M has a few tiny gaps — a designer file would be cleaner). Originals `logo.png` / `logo-light.png` untouched. Owner rejected: cream-badge behind logo, cream-lettering version.
- **Header actions** (right side, menu centred): round outlined **WhatsApp icon** (`.header-wa`) + solid gold square-ish **CONTACT US** block (`.header-contact`, uppercase). Hidden ≤520px; mobile drawer got a green "WhatsApp Us" button under "Book Your Tour". Tightened nav spacing 1181–1320px so it fits.
- **Hero buttons**: `.hero2__actions` = gold **EXPLORE OUR TOURS** (car icon) + dark navy glass **CHAT ON WHATSAPP**; compact, radius 6px, uppercase; stack full-width ≤420px.
- Hero top scrim darkened slightly for header legibility.
- **Site-wide CSS fixes** (all pages): burger was pushed off-screen on phones (header Book button hidden ≤520px, `.header-tools` margin-left:auto ≤1180px); footer caused sideways scroll on phones (single column ≤520px); hero side padding restored (`.hero2__grid` uses padding-top/bottom only).

**Done (2026-11-11) — hero trust strip:** old `.hero2__bar` (3 features + Daily Departures/Book Now) replaced by `.hero2__trust`: solid navy-deep band, gold gradient hairline on top, 5 items (gold line icon + Poppins uppercase title + muted line) — Private Tours, English-Speaking Guides, Pick-up Service, Flexible Payment, Book with Confidence. 5 cols → 3 cols ≤1100px → stacked list ≤640px. Owner's layout reference was the agency site's dark 5-icon bar.
**Hero sized to the reference (measured at 1366×768):** desktop ≥1025px uses a wide container (max 1480px, 56px side padding) for the overlay header, hero and trust strip, so logo/headline/strip all start 56px from the edge like the reference. Hero fills the first screen (`min-height: calc(100svh - 144px)`), trust strip top at ~700px. Title ~53px (was 80), sub ~24px, body 15px/480px wide, smaller avatars card. Hero image fixed to `loading="eager" fetchpriority="high"`.
**Pixel-matched to the reference at 1366×768 (2026-11-11):** desktop container = 1280px max with side padding `clamp(20px, …, 56px)` so content edge is always ≥56px. Overlay header 116px tall (16px top padding → items centred at y=66), logo 68px tall at (56,32), menu uppercase .86rem starting x=329, WhatsApp 40px at 1107, CONTACT US 129×45 ending x=1295; scrolled bar shrinks to 76px / 54px logo. Hero fills the whole first screen (100svh) like the owner's own-browser view of the reference; text block anchored 80px above the photo bottom; trust strip appears just below the fold on the first scroll, icons at 56/310/564/819/1073 (5 cols, 32px gap, dividers drawn in the gap). Social icons flush-left in 44px slots from y=296 ("Follow us" label kept for screen readers only).

**Hero section signed off by the owner (2026-11-11).**

**Done (2026-11-11) — reviews section, placed right after the hero** (owner's choice; `section.hrev`, cream background, same desktop container as the hero): centred "Reviews From Our Travellers" + short gold rule, then **one compact row of 4 equal cards** (owner asked: no photo, everything in one line, cards not big): navy featured card (Lukas M. quote in Playfair italic + 4.9★ / 5,000+ / 98% stats from reviews.html) + 3 white cards (Sarah L., James T., Chloé D.); one gold **READ MORE REVIEWS** button → reviews.html. Tablet + phone (owner asked for the same one row): the 4 cards stay in a single row that swipes sideways (cards 290px, or 82% width on phones). Review texts copied verbatim from `reviews.html` (no invented platform icons). Owner rejected: camel photo on the featured card, 2×2 / 5-card layouts. The old reviews column inside `.faqrev` was removed (FAQ stands alone, centred, `.faqrev__grid--solo`) — FAQ itself not redesigned yet.

**Done (2026-11-11) — destinations, moved up right under the reviews** (`section.hdest`, white bg, same desktop container): centred heading + subtitle (existing copy), **one row of 8 small cards like the reference** (141×203 at 1366px: photo 145px, gold round pin badge overlapping the photo bottom with a white ring, uppercase name), outlined gold VIEW ALL DESTINATIONS → destinations/index.html. 4 cols ≤1100px. Phone (≤640px, owner request): 4 cards per view (2×2, CSS `order` keeps left-to-right reading order), the other 4 slide in with **one** round gold arrow on the right edge, vertically centred (`.hdest__arrow` inside `.hdest__track`, wired at the end of main.js); at the end it flips to point left and goes back; swiping also works. Cards: Marrakech, Fes, Merzouga, Chefchaouen, Essaouira, Ouarzazate (→ destinations/*.html) + Casablanca, Tangier (→ tours/morocco-tours-from-*.html, no destination page exists yet). **Owner rule: destination images show a monument or place, never a person.** Used: mosque-sunset.jpg, fes.jpg (carved door), dune-screensaver.jpg, ouarzazate-kasbah.jpg, casablanca.webp (4032px/786KB — worth a lighter copy) + 3 new free Unsplash photos (no attribution required): essaouira-skala-port.jpg, chefchaouen-blue-steps.jpg, tangier-cap-spartel-lighthouse.jpg. Old `.dest-grid/.dest-card` CSS kept (still used by destinations/index.html).

**Done (2026-11-11) — "Who We Are", right under destinations** (`section.habout`, white bg, same desktop container; layout from the reference's About block): rounded sand panel, left = h2 + gold rule + 2 short paragraphs (new copy, owner asked for it: who we are + what makes us different) + 4 stats styled like the reference's stat row (plain 28px gold line icon, bold uppercase title, one short muted line; not links), owner's facts: **+7 Years / of experience, 100% / Private Tours, 100% / Local Agency, 24/7 Support / in English**; no button (owner removed MORE ABOUT US); Owner asked for it "a bit smaller": panel max 1160px centred, padding 40/44, h2 ~2rem, body .92rem → panel ~1160×544 at 1366px. Right = simple rounded (10px) photo, 370px tall, `sahara-sunset-camp-friends.jpg` (owner's choice), navy "4.9 rating from 5,000+ travellers" badge bottom-left. Owner tried and **rejected a gold Moroccan arch frame** here — keep it simple. Stacks ≤1100px, offers 2×2 ≤640px. The old `.about-x` "About Our Agency" block further down still exists (long SEO copy) — decide later whether to remove/merge.

**Done (2026-11-11) — three tour sections right under "Who We Are"** (`section.htours`, same desktop container; owner's brief: no day trips here). Shared card `.htour` (photo 190px + navy duration badge, **gold diagonal corner ribbon** top-right — "Popular" on the 4 popular cards, "Best Seller" on the first 3 desert cards (owner's screenshot had a red ribbon, asked for brand colour); Playfair title clamped to 2 lines, 5 gold stars, 3-line description = the tour page's meta description, sand box with Start / End / Private tour (end = "End of tour:" on each tour page; Family + Honeymoon pages lack it → Marrakech from their last itinerary day), outlined gold VIEW DETAILS; no prices — tour pages only have them in JSON-LD). Cards ~497px tall. Data from `tours/index.html` + each tour page.
- **Popular Morocco Tours** (cream, 4 cards, PC 4-col grid): 3-Day Marrakech→Merzouga, 7-Day Marrakech→Fes, 10-Day from Casablanca, 8-Day Imperial Cities & Sahara.
- **Sahara Desert Tours** (white): all 19 desert tours in ONE sideways row on PC *and* phone (owner request), 4 per view on PC / 3 tablet; gold round prev/next arrows on the photos (wired at end of main.js, each hides at its end). First 3 = Best Seller: 3-Day Marrakech→Merzouga, 3-Day Marrakech→Fes via Merzouga, 4-Day Fes→Marrakech.
- **All Our Tours** (cream, 8 cards, PC 4×2 grid, owner said 6–8 max) + VIEW ALL TOURS → tours/index.html: button under the grid on laptop/tablet; **phone = plain arrow link at the end of the swipe row** (same pattern as day excursions, owner request; `repeat(8, 80%) 34%`).
- Phone ≤640px: every row swipes sideways (cards 80% wide). Tablet: popular/all = 2-col grid.
- Old "Our Most Popular Tours" block removed. The old `.daytrips` "Best Day Trips from Marrakech" block is still lower on the page (future Excursions section).

**Done (2026-11-11) — "What Sets Us Apart", right after All Our Tours** (`section.happart`, **white bg, simple like the reference**, same desktop container). Owner: build trust + **include transparency ("what we agree on is what you pay")**. 6 light sand cards (gold line icon, uppercase title, one short line — owner asked for short): Transparent Pricing, 100% Private Tours, Small Deposit, Tailor-Made Trips, English-Speaking Team (24/7), Comfortable Vehicles. PC 3×2, tablet 2 cols, **phone 3 rows × 2** (owner request). **Owner rejected**: navy background, the "traveller worry" quote above each card, the WhatsApp button under the section. Old `.whychoose` block + CSS removed; old `.fleet` block still lower on the page.

**Done (2026-11-11) — "Day Excursions from Marrakech", right after What Sets Us Apart** (`section.htours.htours--exc`, cream bg; reference = its "Our Excursions" carousel). Same `.htour` card as the tours, no ribbons. All 6 day trips (Aït Ben Haddou, Agafay, Essaouira, Atlas Mountains, Ouzoud, Ourika), Full day, Start/End Marrakech (pages lack "End of tour"; our own copy says "back in the city by evening"). Description = 2nd sentence of each page's "Your driver collects you…" itinerary paragraph (meta descriptions there are weak boilerplate). Slider on PC (4 per view, prev/next arrows) and one swipe row on phone; **"View All Day Trips"**: laptop/tablet = outlined button under the slider (`.htours__more--desk`); **phone only** = plain link at the END of the swipe row (`li.htours__end > a.htour-more`: gold round arrow + uppercase label, **no card box** — owner rejected the card version and rejected it on laptop); its slot is 34% wide (`grid-template-columns: repeat(6, 80%) 34%`). Known: old `.about-x` block causes a 2px sideways overflow on phones. Subtitle = old day-trips intro copy. main.js slider code now handles every `.htours__track` (desert + excursions). Old `.daytrips` block + unused `.tgrid4` CSS removed.

**Owner's style preferences learned:** likes the reference site's look; square-ish (6px) uppercase buttons in brand gold; white/dark contrast in header; keep things compact ("not too big"); wants to preview at laptop size (1366×768).

**Next up (owner decides order):** rest of the hero (trust strip / social sidebar / avatars card), then sections below following the reference order. Header/footer rollout to the other 161 pages only after the homepage is finished — confirm first.

## Secrets & git
- **Any API key goes in `.env`, which is listed in `.gitignore`. Never put a key in a page file, never commit it to GitHub.** `.env.example` holds placeholder names only.
- Don't commit or push unless the user asks.
- The original export is kept as `../morocco-tours-hub-website.zip` (backup).
