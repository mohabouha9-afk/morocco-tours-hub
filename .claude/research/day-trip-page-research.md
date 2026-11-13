# Day-trip detail page — research notes (2026-11-13)

Research only, nothing built. Scope: the 13 single day-trip pages in `tours/` (not `day-trips.html`).

## 1. What others put on a day-trip page

| Component | Reference agency (agenciamarrocostours) | Local private operator (local-morocco-tours) | Big platforms (GetYourGuide / Viator, known layout) | Ours now |
|---|---|---|---|---|
| Hero + fact strip (duration, place, private, availability) | yes | partly (duration, languages, review count) | yes | yes |
| Jump links / tab bar | yes | no | yes | yes |
| Overview + highlights | yes | yes (highlights are placeholder text) | yes | yes |
| Timed programme | yes, times on every step | narrative only | stops with minutes per stop | yes |
| Included / not included | yes | yes | yes | yes |
| Good to know / what to bring | thin (a jacket) | altitude, hike length, market day | "what to bring", "not allowed", "not suitable for" | thin |
| Price | "On request" | "By request" | price per person/group, "from" | "On request" |
| Cancellation & payment summary | link to terms only | link only | in key facts: free cancellation 24 h, reserve now pay later | none |
| Pickup details | hotel/riad only | "around 8:00" | pickup area, window, meeting point if no pickup | hotel/riad only |
| Reviews | none | score only, no text | score + category scores + text + traveller photos | none |
| Map / route | none | heading but no map | map of stops | none |
| Guide / licence / trust | none | guide profile with licence no., "since 2012", reply in 24 h | operator badge | none |
| FAQ | 3 | 4 | Q&A from travellers | 3 |
| Accessibility, age, fitness | "families ok" | "steep in places" | wheelchair, infants, fitness level | thin |
| Related trips + CTA | yes | yes + blog links | yes | yes |

Mistakes seen on competitors (avoid): duration in the hero ≠ timeline (6 h vs 6.5 h), "30 min" in one place and "40 min" in another, a map heading with no map, placeholder highlights.

## 2. What they do best
- Platforms: key facts at the top answer the 5 booking questions in 5 seconds (duration, pickup, cancellation, pay later, language). Reviews with traveller photos.
- Local operator: trust proof near the top (licence number, real guide with name/photo, years, reply time, "no hidden fees").
- Reference agency: clean, timed programme; "transparent pricing" line; booking box always visible.

## 3. What is missing almost everywhere (our chance)
1. **Honest expectations**: "Agafay is stone, not dunes" (we have it), "Aït Ben Haddou = ~8 h in the car", "Setti Fatma waterfalls are small in summer", "camel ride lasts X minutes".
2. **A clear "no shopping stops" promise** (the #1 complaint: argan/carpet commission stops).
3. **What extra money you will spend on the day** (lunch ~ X MAD, local site guide, entrance, boat at Ouzoud, tips) — so no surprises.
4. **Price guidance**: "from €X per person for 2" or what changes the price, instead of only "on request".
5. **Cancellation / weather / payment in one box** (balloon: weather = new date or full refund).
6. **Pickup logistics in the medina** (cars cannot reach most riads; driver meets you at the nearest gate/landmark, riad staff walk you there).
7. **Who it suits / who should skip it** (long drive, motion sickness on Tizi n'Tichka, stairs/slopes, kids, pregnancy, mobility).
8. **Best time / season + time of day** (Agafay before 4 pm for golden light, Ourika on weekends busy, Essaouira windy, Ouzoud best in spring).
9. **Ways to tailor it** (start time, add a stop, add camel/quad/dinner, swap lunch, stay overnight instead).
10. **Real route/map with drive times between stops.**

## 4. What travellers worry about, hope for, ask
**Worries**
- Scams and hidden fees: camel "tip" demanded on site, surprise fees in Agafay, street-sold tours, no-show operators.
- Forced shopping stops / long sales pitches (guides on commission).
- Too long in the car, little time at the place (Essaouira often only ~4 h free time; Aït Ben Haddou is 3 h each way via the 2,260 m Tizi n'Tichka pass).
- Fake guides / pressure at the site (Setti Fatma waterfall "guides", Ouzoud monkey feeding sold for money, Aït Ben Haddou touts).
- Photos that lie (Agafay sold with Sahara dune photos).
- Safety: driving on mountain roads, quad safety gear, balloon licence, camel welfare.
- Food hygiene and dietary needs (vegetarian, gluten-free, halal is a given).
- Will the driver speak English? Will they find my riad?
- Paying a stranger in advance.

**Hopes**
- "Real" Morocco without crowds: Berber village, tea with a family, the view over the Atlas.
- Freedom: stop where we want, our own pace, no strangers.
- Great photos at the right light.
- A day that is easy: picked up at the door, nothing to organise.

**Typical questions (FAQ material)**
- What time do you pick us up and when are we back? From where exactly?
- Is it private, just us? Can we change the plan/stops?
- How long is the drive? Are there toilet/photo stops?
- Is lunch included? How much does it cost? Can you handle my diet?
- Is it okay with kids / elderly parents / a wheelchair / if I get car-sick?
- What should I wear and bring? Cash or card? How much cash?
- Do we need a local guide at the site? Is it included?
- What if it rains / is too windy / the balloon cannot fly?
- How do I pay? Deposit? What if I cancel?
- Is it worth it in one day, or should I stay overnight?

## 5. Gaps on our current pages (checked on the Agafay day trip)
- "Camel or quad ride" is in the highlights and programme but listed as **not included** → confusing.
- Lunch "own account" with no cost idea.
- No reviews, no map, no price guidance, no cancellation/payment summary, no pickup details, no guide/trust block, no "who it suits", no tailoring options, gallery small.

## 6. Sample page — the components it should contain (blueprint, not built)
1. Hero: photo, h1, line, fact strip (duration, pickup, private, languages, availability) + rating line.
2. Key facts box near the top: pickup window, back by, drive time, free cancellation rule, small deposit/pay on the day, no shopping stops.
3. Overview: 2 short paragraphs + "Is this trip for you?" (great for / think twice if).
4. Highlights (6).
5. Programme timeline with times + how long you spend at each stop + drive time between stops.
6. Route map (static, with stops and km).
7. Included / Not included / **Expected costs on the day** (lunch, local guide, entrance, boat, tips) with MAD/EUR ranges.
8. Make it yours: options & add-ons (earlier start, extra stop, camel, quad, dinner, overnight).
9. Practical info: what to wear/bring, cash vs card, season & best time, weather plan, accessibility & kids, motion sickness note.
10. Pickup in Marrakech: hotels, riads (meeting point at the nearest gate), airport, areas covered.
11. Your driver-guide / why book with us: licence, local, English, no commission stops, transparent price.
12. Gallery (6–8 real photos with captions).
13. Reviews of this trip (3 text reviews + overall score + link).
14. FAQ (6–8, from section 4).
15. Booking box (sticky): price guidance, date, travellers, pickup place, WhatsApp, reply-time promise, deposit/cancellation line.
16. Other day trips + combine with a tour.
17. Closing banner.

Facts to get from the owner before writing: real price ranges, lunch prices, cancellation rule for day trips, deposit for day trips (or pay on the day?), guide names/licence, camel ride length, pickup times per trip, real reviews per trip.

---

# Round 2 — all day trips, top-ranking pages (2026-11-13)

Pages read in full (component lists): marrakech-desert-trips.com (Aït Ben Haddou + Ouzoud), moroccanjourneys.com (Aït Ben Haddou + Telouet), marrakechecotours.com (Ouzoud), puremoroccotours.com (Essaouira), GetYourGuide (Essaouira product + Aït Ben Haddou listing), Viator (Aït Ben Haddou private, 474 reviews), Headout (Aït Ben Haddou private). Traveller side: Viator review themes, GetYourGuide "review highlights", TripAdvisor Ourika reviews, Reddit r/Morocco + r/travel threads, andotravel.com honest guide, Toubkal guide rules.

## A. What tourists worry about (ranked by how often it appears)
1. **Hours in the car vs time at the place.** No. 1 complaint everywhere: GYG Essaouira highlight "long drives and limited hours in town"; Viator ABH no. 1 complaint; Reddit "travel time is longer than they advertise, prepare for ~4 hours to Aït Ben Haddou".
2. **Shopping stops / kickbacks.** TripAdvisor Ourika: "We stopped 9 times (!) to shop", guide "gets kickbacks". GYG's top Essaouira trip has a 20-min argan factory stop built in.
3. **Unofficial guides and paying twice.** Ourika: a man "insisted I would need a guide" though one was paid; extra fees per waterfall. Same pattern at Aït Ben Haddou and Ouzoud.
4. **Hidden or wrong costs.** "Promised 4 Euro lunch… actually 120 DH"; Viator ABH camel "10 USD", lunch à la carte; Atlas Studios entry not included.
5. **Car sickness, heat, crowds** (Viator ABH complaints 2–4): Tizi n'Tichka bends, hot desert side in summer, busy ksar.
6. **Walking difficulty.** Ourika "serious scrambling… don't bring kids under 8"; Ouzoud ~20 min of steps down; ABH uneven, steep alleys.
7. **Is it worth it in one day?** ABH and Essaouira are the trips people doubt most (Reddit, andotravel: "7–8 hours of driving for a few hours at the site").
8. **Driver quality.** Top praise = punctual, safe, friendly driver; complaint = limited English.
9. **Weather/season.** Tizi n'Tichka snow (winter), Ourika flash floods (summer storms), Ouzoud weak in late summer, Essaouira windy June–August.
10. **Legitimacy / no-shows / paying a stranger** (round 1) and **cancellation**.
11. Smaller: what to eat and when (Headout: "eat before pickup or bring snacks"), cash vs card, what to wear, kids, monkeys/camel welfare.

## B. Components found on top pages that our Agafay sample does NOT have yet

| # | Component | Who does it | Worry it answers | Value for us |
|---|---|---|---|---|
| 1 | **Time split: "in the car / at the place"** (or per-stop durations "Van 1 h · Visit 4 h") | GetYourGuide itinerary, marrakech-desert-trips timeline | #1, #7 | **High** — a key fact like "Driving about 6 h · At the sites about 4 h". Essential for Aït Ben Haddou, Essaouira, Ouzoud. |
| 2 | **"Worth the drive?" honest box + alternatives with links** ("Worth the drive? Then stay the night → 2-day tour"; "Prefer waterfalls an hour away? → Ourika") | marrakech-desert-trips "Compare your options" | #7 | **High** — we have "Think twice if" but no link to the better option. Add 1–2 links (a closer day trip or a 2–3 day tour). Honest + sells our multi-day tours. |
| 3 | **Guide at the site stated clearly** ("local guide included, not an optional €3 add-on"; who meets you where) | marrakech-desert-trips Ouzoud (FREE tag), Viator/Headout "local guide and entrance fees" | #3, #4 | **High** for Aït Ben Haddou, Ourika, Ouzoud, Imlil: "your official local guide is included — you don't pay anyone else". Imlil: a licensed guide is mandatory on the Toubkal trail since 2019. |
| 4 | **Walking level** (easy / moderate, minutes on steps, gentlest route, stop-halfway option) | marrakech-desert-trips, Moroccan Journeys FAQ, Viator "most travelers can participate", GYG "not suitable for wheelchair users" | #6 | **High** — one key fact "Walking: easy / moderate (20 min on steps)" + accessibility line (wheelchair, strollers, elderly). |
| 5 | **Best time to go / weather plan** per trip | andotravel, Viator weather policy (missing on most pages) | #5, #9 | **High** — one line per trip (season + time of day), plus what happens if the pass is snowed in / storm. We only have "Season: all year". |
| 6 | **Vehicle named + child seats** ("Private 4×4 Toyota Land Cruiser", "child seats free on request") | Moroccan Journeys, marrakech-desert-trips, Desert Majesty | #8, kids | **Medium** — we only say "air-conditioned vehicle". Link to Our Fleet. |
| 7 | **How booking works in 3 steps** + "we send a secure payment link once your date is agreed", deposit size | marrakechecotours ("Small deposit only · Pay the rest on arrival · Deposit to confirm €16") | #10 | **Medium-high** — calms "paying a stranger". FAQ or under the form. |
| 8 | **Review details**: traveller type + country + platform tag ("Solo · UK · TripAdvisor"), category scores (guide / transport / value), traveller photos, host replies, review highlights incl. the negative theme | GYG, Viator, marrakech-desert-trips | #8, #10 | **Medium** — add the type/platform tag now; trip-specific reviews and photos when the owner has them. |
| 9 | **Trust proof**: licence number, press logos, TripAdvisor award badge | Moroccan Journeys (press + TA award), local-morocco-tours (licence no.) | #10 | **Medium** — needs the owner's licence number / real awards; nothing to invent. |
| 10 | **"Not allowed" / practical rules** (smoking in vehicle, pets), **breakfast note** ("eat before pick-up") | GYG, Headout | #11 | **Low** — one line in Good to know. |
| 11 | **Captioned gallery** | marrakech-desert-trips | — | **Low** effort, small gain. |
| 12 | **Quick Answer box** (2–3 sentence summary at the top) | marrakech-desert-trips | skimmers, AI search | **Low-medium** — overlaps overview + key facts; SEO phase. |
| 13 | Group-size price table, "from €X", kids discounts (0–5 free, 6–11 −65%) | marrakech-desert-trips, Pure Morocco, GYG | price | **Skip** — owner: no price on the page. |
| 14 | Platform guarantees ("100% booking protection", instant confirmation) | Headout, Viator | #10 | Our version exists (free cancellation 24 h, transparent pricing, 24-h reply). |

Already on our sample and confirmed as good by this round: timed programme that opens/closes (marrakech-desert-trips uses the same AM/MID/PM/EVE accordion), key facts box, included / not included, costs on the day (marrakech-desert-trips lists "lunch ~80–120 MAD, boat ~20 MAD"), no shopping stops (a real differentiator vs GYG), free cancellation 24 h (platform standard), map, FAQ, related trips, closing CTA. No competitor page has all of these together.

## C. Per-trip notes (what each page must answer)
- **Aït Ben Haddou & Ouarzazate:** honest 10–12 h day, ~3–3.5 h each way via Tizi n'Tichka (2,260 m); time-split fact; car-sickness tip (front seat, stops on request); winter snow on the pass; summer heat; official ksar guide included; extra costs: houses inside the ksar ask a few dirhams, Atlas Studios entry, lunch; alternative = 2-day Zagora or 3-day Merzouga tour ("Aït Ben Haddou is day 1 of it").
- **Essaouira:** 2.5–3 h each way on a flat road (good for car-sick travellers); how many hours in town; wind June–August; argan goats/cooperative only if you ask; fish lunch at the port; alternative = stay a night (our 3-day Marrakech & Essaouira tour).
- **Ouzoud:** ~2.5–3 h each way, ~150 km; 110 m falls; ~20 min of steps down and back up, gentlest route, can stay at the top terraces; local guide included; boat ~20 MAD; swimming; don't feed the monkeys; best March–June, weaker in late summer; alternative = Ourika (1 h away).
- **Ourika / Setti Fatma:** ~1 h; the waterfall walk is a scramble (slippery rocks, not for small kids/elderly — lower falls only); guides at the village will offer, ours is included; weekends busy; summer storms → flash floods (we change the plan); no Berber-house/argan shopping unless asked.
- **Atlas Mountains & Imlil:** ~1.5 h; walking level; licensed guide mandatory on the Toubkal trail (included); cooler, bring layers; snow in winter; lunch in a Berber house.
- **Agafay / balloon / quad / camel dinner:** camp choice, ride length, safety gear (quad), weather cancellation = new date or refund (balloon).
- **Medina / food / Majorelle tours:** walking distance, timed tickets (Majorelle), dietary needs, no shop stops in the souks.

## D. Recommended additions (to show the owner; nothing built)
**Must have (answer the top worries):**
1. Time split in the key facts ("In the car ~6 h · At the sites ~4 h").
2. Walking level key fact + who can't do it (wheelchair, strollers, small kids).
3. Guide-at-the-site line ("official guide included — you don't pay anyone else").
4. Best time / weather line per trip.
5. "Worth the drive?" → 1–2 links to the better option (closer trip or multi-day tour) inside "Think twice if".

**Nice to have:**
6. Vehicle named + "child seats free on request" (link to Our Fleet).
7. "How booking works" in 3 steps (request → reply in 24 h → small deposit by secure link, rest on the day).
8. Review tags (traveller type · country · platform) now; real per-trip reviews + photos later.
9. Licence number / awards when the owner provides them.
10. One-line rules (no smoking in the vehicle; eat breakfast before pick-up).
