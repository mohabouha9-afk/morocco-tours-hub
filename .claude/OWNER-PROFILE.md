# Owner profile & site identity — read before any work

This file sums up what has been learned about the owner of Morocco Tours Hub (how they decide, what they like and reject, how they want to work) plus the brand and design system built so far. The full dated log of each section lives in `CLAUDE.md`; this file is the short version that matters for the next job.

---

## 1. Who the owner is

- Runs **Morocco Tours Hub**, a local Moroccan operator selling **100% private, tailor-made tours** (Sahara, imperial cities, Atlas, coast, day trips from Marrakech).
- Not a developer. Judges the work **visually, in the browser, at laptop size (1366×768)**, then checks the phone.
- Thinks in **reference sites**: shows a site or a screenshot and says "like this". Main reference: agenciamarrocostours.com/en/ (structure, layout, sizes, fonts). Second: moroccofabuloustravel.com (footer, contact page).
- Wants the site to be **genuinely amazing, not generic**, and gives latitude for sensible design decisions, but has a clear and fast-forming taste: will try an idea, look at it, and keep or reject it within minutes.
- Writes short, direct requests, often in non-native English. Read the intent, not the literal words; when a word is ambiguous, pick the most sensible reading and say what you picked.

## 2. How the owner wants to work

- **One section at a time, in the order the owner chooses.** Do not redesign sections that were not asked for.
- **Show, then adjust.** Build it, check it in the browser at 1366, 768 and 375, give a screenshot. Expect follow-ups like "a bit smaller", "one row", "same as the other section".
- **Iterates by small corrections**: size, spacing, colour, one-row vs grid, which photo. Apply exactly the change asked, don't reinterpret the whole section.
- **Will try and revert** (e.g. white backgrounds → back to cream). When something is reverted, record it so it isn't proposed again.
- **Consistency is king**: once a pattern is approved (title style, card, slider, "View all" link at the end of a swipe row), reuse it everywhere the same thing appears. The owner often asks "make it like the homepage".
- **Site-wide changes are fine once asked** (menu on all pages, closing banner on 147 pages, cream background everywhere) — do them by script, by URL pattern, never by hand one page at a time. Confirm before touching the header/footer of all pages.
- Wants the result **checked by me**, not left for them to check. Say plainly what was verified and what still needs the owner (e.g. facts only they know).
- Don't commit or push unless asked.

## 3. Design taste

### Likes
- The **reference site's look**: clean, cream/white, gold accents, uppercase labels.
- **Compact** everything: "not too big", "a bit smaller" is the most common request. Small cards, modest padding, normal-size titles (neither big nor small).
- **One row** of cards wherever possible; on phones **one sideways swipe row** per group rather than long stacks.
- **Square-ish (6px radius) uppercase buttons** in brand gold; outlined gold for secondary.
- **Strong contrast** in the header (white on dark/photo, black bar on scroll).
- **Short text**: answers max 3 lines, intros max 2 lines, card lines one short sentence.
- **Simple, honest trust signals**: real stats from reviews.html (4.9★, 5,000+, 98%), transparency ("what we agree on is what you pay").
- Equal heights and aligned edges (headings and buttons on the same line in side-by-side columns).

### Rejected (don't propose again)
- Cream badge behind the logo; cream-lettering logo.
- Photos on review cards; 2×2 or 5-card review layouts; navy "featured" card when cards should all match.
- Gold Moroccan arch frame around photos — keep photos simple, rounded.
- Navy section backgrounds for card grids; "traveller worry" quotes above cards; extra WhatsApp buttons under sections.
- A "View all" **card** at the end of a swipe row (use a plain gold arrow link), and that link on laptop (laptop gets an outlined button under the row).
- Big decorative kickers ("100% Private Tours", script lines above titles) — mostly removed.
- Red ribbons (use brand gold); invented platform icons/award badges we don't have.
- White page backgrounds site-wide (reverted to cream).
- Stacked cards on phone for card groups (went back to one swipe row).

## 4. Content rules

- **Facts only from the site or verified sources.** Never invent prices, awards, stats or reviews. Review texts copied verbatim from `reviews.html`.
- **No tipping amounts** anywhere.
- Payment (owner confirmed): **20–30% deposit by bank transfer, balance on arrival in cash (EUR/USD/MAD) or by card.**
- Owner facts for stats: **+7 years experience, 100% private, 100% local agency, 24/7 support in English.**
- **Destination images show a monument or place, never a person.**
- New photos: free licences only (Unsplash, no attribution), ask before downloading.
- When I write new factual copy (programme times, inclusions), flag it for the owner to confirm.
- Keep SEO plumbing intact (title, meta, canonical, hreflang, JSON-LD, sitemap, URLs). Deleted pages need 301 redirects at deploy time.
- Use real search demand (DataForSEO, forums) to choose FAQ questions and blog posts.

## 5. Brand identity

- **Name:** Morocco Tours Hub — https://moroccotourshub.com/
- **Promise:** private & customisable tours, expert local driver-guides, comfortable vehicles (4×4, minivan, Sprinter), flexible payment, transparent pricing.
- **Audience:** international travellers wanting authentic, flexible, reliable, high-quality trips.
- **Tone:** warm, professional, authentic, inspiring.
- **Keywords:** "private Morocco tours", "Sahara desert trips", "custom Morocco itineraries".
- **WhatsApp:** +212 621 460 083 → `https://wa.me/212621460083`
- **Colours:** navy `#0e2a41` / deep `#0a2033` / `#14344f`; gold `#c0913b` / light `#d9b464` / deep `#a5762a`; cream `#faf6ee`, cream-2 `#f4ecdd`, sand `#f7f1e6`, near-white `#fffdf9`; ink `#16324a`, muted `#5c6b78`, line `#e7ddca`. WhatsApp green `#25d366`, Tripadvisor green `#00b67a`. No new brand colours.
- **Fonts:** homepage = **Oswald** (headings, menu, buttons, labels, mostly uppercase) + **Poppins** (body). Other pages still Playfair Display + Poppins until rollout. Dancing Script for small accents only.
- **Logo:** `logo-white.png` on dark/photo headers; `logo.png` on light.

## 6. Design system as built (reuse these)

- **Page background:** cream everywhere; white cards with line border + soft navy shadow on top. "Swapped" pages (`body.page-swap`): near-white page + cream trust strip.
- **Section rhythm:** 32px top + 32px bottom (28 on phones), 64px before the closing banner.
- **Section title:** centred, uppercase, Oswald 700 ~26px laptop / 21px phone, 44px gold rule under it. FAQ and blog titles left-aligned.
- **Desktop container:** max 1280px, side padding clamp(20px…56px).
- **Cards:** `.htour` (photo + navy duration badge, gold corner ribbon, title, 5 gold stars, 3-line text, sand info box, outlined VIEW DETAILS). Sliders `.htours__track` with round gold arrows on PC, swipe on phones (cards ~80% wide), "View all" = outlined button on laptop, gold arrow link at the end of the row on phones.
- **Trust strip:** lifted white/near-white bar overlapping the hero bottom, gold line icons, uppercase titles.
- **Closing banner** `.hcta`: caravan photo + navy gradient, short page-specific title (≤40 chars), WhatsApp + Request a Quote.
- **FAQ:** `<details>` accordion, h3 in summary, first open, gold +/× icon, FAQPage JSON-LD.
- **Breakpoints:** phone ≤640, tablet ≤1024/1100, laptop ≥1025. Test at 375, 768, 1366.

## 7. Technical rules (short)

- Static site, no build step; header/footer copy-pasted on every page → scripted changes, confirm first.
- One `styles.css` shared by all pages: add page-scoped classes, check other pages don't break.
- Serve with `node serve.mjs` → localhost:3000; never `file:///`.
- Animate only transform/opacity; every clickable has hover, focus-visible, active.
- Images: `alt`, `width`/`height`, `loading="lazy"` except heroes.
- API keys only in `.env` (gitignored), never in pages or commits.
- Remove dead markup/CSS when a section is rebuilt.
