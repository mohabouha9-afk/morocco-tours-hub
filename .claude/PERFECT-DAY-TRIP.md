# The Perfect Day Trip page — blueprint

**Model page:** `tours/marrakech-agafay-desert-day-trip.html` (owner-approved sample, 2026-11-13).
**Research behind it:** `.claude/research/day-trip-page-research.md` (round 1 = what tourists worry about, round 2 = top-ranking pages for Aït Ben Haddou, Essaouira, Ouzoud, Ourika, Atlas, compared to those worries).
**Use this file** to rebuild the other 12 day-trip pages in `tours/` so they all match the model.

---

## 1. Why the page is ordered this way
A visitor answers five questions, in this order. The page follows them:
1. **Do I want this?** → photos and highlights early (desire comes first).
2. **What exactly happens, and what will it cost me?** → programme, included, costs on the day.
3. **Is it right for me?** → Make It Your Own, then "Is this trip for you?".
4. **Did people like it?** → reviews, right before the decision.
5. **What could go wrong?** → FAQ, then act (booking box always reachable).

## 2. Page order (top to bottom)
| # | Block | What it does | Markup |
|---|---|---|---|
| 1 | Hero | Photo, gold MARRAKECH chip, h1 + script line, 4 facts: Duration, Pick-up, Format: Private, Availability | `section.page-hero.dt-hero`, `ul.dt-facts` |
| 2 | Tab bar (sticky) | Overview · Gallery · Programme · What's Included · Make It Your Own · Reviews · FAQ · Other Day Trips | `nav.dtnav` |
| 3 | **Overview** | 2 short paragraphs → **6 key facts** → Highlights card (5–6 ticks) | `#overview`, `dl.dt-glance` (3×2, 2×3 phones), `.dt-high` |
| 4 | **Gallery** | 4 real photos of THIS place (never another region) | `#gallery`, `.dt-gal--4` |
| 5 | **Programme** | 5–6 timed steps, each title + ~2 lines of practical info, open/close, first open; drive times inside the steps | `#programme`, `ol.dt-prog.dt-prog--acc` (`<details>` per step) |
| 6 | **What's Included** | 3 boxes: Included / Not included / Good to know → **Costs on the day** → **Day Trip Map** (title + map + 1-line note) | `#included`, `.dt-inc`, `.dt-costs`, `h3.dt-h3` + `.dt-map` + `.dt-map__note` |
| 7 | **Make It Your Own** | 1 line + 6 options (2-col ticks) → **Is this trip for you?** (Great for / Think twice if, with links to the better-fit tour) | `#custom`, `.dt-ticks--2`, `h3.dt-h3` + `.dt-inc.dt-fit` |
| 8 | **Reviews** | 4.9 from 5,000+ travellers + Read more reviews link + 3 review cards (swipe row on phones) | `#reviews`, `.dt-revs__sum`, `.dt-revs .hrev-card` |
| 9 | **FAQ** | 5 questions, first open, only things not answered above | `#faq`, `.hfaq-item`; booking answer = `ol.dt-steps` |
| side | **Booking box** (sticky on laptop) | "Private day trip" / **Book Your Date** / price note / 2 trust lines / form → WhatsApp / Ask on WhatsApp / phone | `aside.dt-aside#book`, `.dt-book` |
| 10 | Other Day Trips | Title → **"View all day trips" text link above the cards** (right-aligned, styled like "Read more reviews"; left on phones) → 3 cards. No button under the row, no arrow card at the end of the phone row | `section.dt-others`, `p.dt-others__all` |
| 11 | Help strip | "Confused or want to add a day trip to a tour?" + WhatsApp + Request a Quote | `section.dtl-combine` |
| 12 | Closing banner | "Book This Day Trip on Your Date" | `section.hcta` |
| fixed | Phone/tablet booking bar | Trip name + "Free cancellation up to 24 h" + BOOK YOUR DATE → #book; hides while the booking box is on screen | `div.dt-mbar` (≤1100px) |

## 3. Fixed content (same on every day trip — owner decisions)
- **No price anywhere on the page** (not "On request", not "from €X", not in the hidden data).
- Booking note: *"The price depends on your date, your accommodation and the number of travellers."* (no "we reply within 24 hours").
- Trust lines: **Transparent pricing** – What we agree on is what you pay. / **Free cancellation** – Up to 24 hours before the trip.
- **A professional licensed local guide is ALWAYS included** → key fact "Guide: Licensed local guide included", Included list, FAQ "Do we need a guide…? → always included, you never pay anyone else".
- **Free cancellation up to 24 hours before** → key fact "Cancellation" + first sentence of the change-date FAQ.
- **Payment:** small deposit to confirm, the rest on the day in cash or by card (FAQ "How do I book and pay?" as 2 numbered steps).
- **No shopping stops** → key fact + FAQ "Will we stop at shops on the way?".
- **Lunch:** not included, give an honest approximate cost ("around €10 depending on what you eat" for Agafay) in Costs on the day and the lunch step.
- **Tips:** "up to you" — never an amount.
- Promises the owner approved: WhatsApp confirmation of time and place the day before; medina riads = driver meets you at the nearest gate; drop-off at a restaurant if you go out for dinner; driver stays with you all day.
- Vehicle: "Private air-conditioned 4×4 or minivan with driver (see our fleet → `../index.html#fleet`)"; child seats on request.
- Reviews: the 3 site reviews (Lukas M., Sarah L., James T.) until the owner gives per-trip reviews. **Do not invent traveller types or platforms** (reviews.html only has name, country, tour).

## 4. Per-trip data to fill (one set per page)
| Field | Where it shows |
|---|---|
| Script line, 2 overview paragraphs | hero, overview |
| Duration, pick-up time, back time | hero facts, key facts, programme |
| Drive line ("Only 40 minutes from Marrakech" / "About 3 h each way over the Tizi n'Tichka pass") | key fact "Drive" (only place it is said as a fact) |
| Best time (season) | key fact "Best time" |
| 5–6 highlights | Highlights |
| 4 photos of the real place + alt text | Gallery |
| 6 programme steps (time, title, ~2 lines incl. drive time / time at the site) | Programme |
| Included / Not included / Good to know (weather, clothing, accessibility) | What's Included |
| Costs on the day (lunch ~, drinks ~, optional extras, tips up to you, cash) | Costs on the day |
| Map marker + note ("… km, … each way") | Day Trip Map (OSM iframe, no API key, no `referrerpolicy`) |
| 6 Make It Your Own options | Make It Your Own |
| Great for (3) / Think twice if (2, each linking to the better-fit tour) | Is this trip for you? |
| 2–3 trip-specific FAQ questions (+ the fixed guide / shops / booking / change-date ones) | FAQ |
| Meta description + og/twitter + TouristTrip JSON-LD (6 itinerary steps, no price) | `<head>` |

Trip-specific must-answers (from research): **Aït Ben Haddou** long day (~3–3.5 h each way, Tizi n'Tichka 2,260 m, car-sickness tip, winter snow, summer heat, entry costs inside the ksar / Atlas Studios; better-fit link = 2-day Zagora or 3-day Merzouga tour). **Essaouira** 2.5–3 h on a flat road, hours in town, wind June–August, argan stop only if asked; better fit = 3-day Marrakech & Essaouira. **Ouzoud** ~150 km / ~3 h, ~20 min of steps down and up, boat ~20 MAD, don't feed the monkeys, best March–June; better fit = Ourika (1 h). **Ourika** ~1 h, waterfall walk is a slippery scramble, village "guides" (ours is included), busy weekends, summer storms. **Atlas & Imlil** ~1.5 h, walking level, licensed guide mandatory on the Toubkal trail, layers/snow.

## 5. Writing rules learned with the owner
- **Say each thing once.** Before adding a line, check it isn't already on the page (key facts, highlights, programme, included, FAQ, booking box). When the owner points out a repeat, change only that one.
- Programme step texts ≈ 2 lines at laptop width. FAQ answers short.
- FAQ only holds questions the page doesn't already answer.
- Honest > salesy: say what the trip is not ("stone desert, not dunes") and link to the better option.
- Keep the page compact; no design or colour changes without asking.

## 6. Technical checklist
- Body class `site2 page-swap`; CSS lives in the "Day-trip" blocks of `styles.css` (`.dt-*`, `.dt-glance`, `.dt-fit`, `.dt-costs`, `.dt-map`, `.dt-steps`, `.dt-revs`, `.dt-mbar`).
- **Sticky booking box must fit whole at 1366×768:** `.dt-aside` max-height = 628px → keep `scrollHeight ≤ 628`. Short-laptop rule (≤860px tall) shows the price note small, hides the "Private day trip" label, and puts the 2 trust lines side by side, titles only — scoped with `.dt-book:has(.dt-book__note--price)`, so a page needs `class="dt-book__note dt-book__note--price"` on its note.
- Phone bar: `div.dt-mbar` before `a.wa-float`; `main.js` hides it while `.dt-book` is visible; aside needs `id="book"`.
- Replace old **Product JSON-LD with price 45** (Atlas, Ourika, Aït Ben Haddou, Essaouira, Ouzoud still have it) with TouristTrip, no price.
- Test at 375 / 768 / 1366: no sideways scroll, box fits, bar shows ≤1100 and jumps to the form.

## 7. Tried and rejected (don't bring back)
- Showing a price / "On request".
- "We reply within 24 hours" in the booking box or FAQ.
- "No shopping stops" in the booking box (it is in key facts + FAQ).
- Key facts "At the camp" (time split) and "Walking" on Agafay — a time-split / walking fact may still suit long trips (Aït Ben Haddou, Ouzoud, Ourika); ask the owner first.
- FAQ "Is it a sand desert?" and "Is it suitable for families?" (answered elsewhere).
- Invented review tags (traveller type / platform).
