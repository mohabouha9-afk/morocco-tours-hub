# Content & Product Expansion Roadmap (2026-11-18)

Desert first (Merzouga / Erg Chebbi), then the high-demand routes and day trips around it.

**Data sources.** Search volumes are OpenSEO US monthly figures already saved in `.claude/research/` (marked *on file*). OpenSEO had no credits on 2026-11-18, so new keywords carry no number. They are ranked by booking-site demand instead (GetYourGuide review counts checked on 2026-11-18). Measure each new page before you build it.

---

## Part 1 — Audit & gap analysis

### What the site has today
- **96 pages in `tours/`**: about 60 multi-day tours, 15 Marrakech day trips and experiences, 6 Merzouga activities, 6 tours-from-city pages, the tours index.
- **7 destination pages**: Marrakech, Fes, Merzouga (the things-to-do hub), Chefchaouen, Essaouira, Ouarzazate, plus the destinations index.
- **62 blog posts**, already strong on the desert: Merzouga or Zagora, 3 vs 4 days, route guide, camps, best time, camel trekking.

### Covered well
| Area | Pages | Verdict |
|---|---|---|
| Marrakech → Merzouga round trip | 2-day, 3-day | Strong: this is the head product |
| Marrakech → Fes via Merzouga | 3, 4, 5, 7-day | Strong |
| Fes → Marrakech via Merzouga | 4, 5-day | Good, but **no 3-day** (the best seller) |
| Fes round trip | 4-day loop | **Missing the 2- and 3-day round trips**, which are the ones that sell |
| Errachidia airport | 3, 4, 5-day | Unique, nobody else does it well |
| Agadir / Rabat → desert | 3, 4, 5-day | Covered (niche demand) |
| Erg Chigaga / Zagora | 4-day Chigaga, 6-day Zagora–Ouzina, 7-day both | Covered at the top end; **no short Zagora or Chigaga tour** |
| Merzouga on-site | Camp, sunset camel, quad, buggy, 4×4 day, medfouna + hub | Strong; a few high-value gaps (luxury camp, transfers) |
| Marrakech day trips | 6 day trips + 9 experiences | Strong |
| Grand tours (Casablanca / Tangier / Marrakech) | 7 to 21 days | Very strong, probably more than the demand needs |

### The biggest revenue and traffic gaps
1. **Short Fes desert tours.** GetYourGuide's Fes best sellers are the 3-day Fes → Marrakech via Merzouga (4.7 / 1,106 reviews), the 3-day Merzouga round trip from Fes (4.7 / 1,063) and the 2-day Fes → Merzouga. You have none of these three. This is the #1 gap.
2. **No desert hub pages by departure city.** "Desert tours from Marrakech" and "desert tours from Fes" demand lands on long city pages that mix every type of tour. A searcher has no single page that compares 2, 3 and 4 days and one-way vs round trip.
3. **No tours that start in Merzouga.** Travellers who arrive by CTM/Supratours bus or rental car, or who are already in Merzouga, can only book activities. There is no "Merzouga → Fes" or "Merzouga → Marrakech" tour and no private transfer page. On file: "merzouga to marrakech" 90.
4. **No short Zagora or Erg Chigaga trip.** The 2-day Zagora tour is the cheapest, most-booked desert format on the booking sites. Without it the site doesn't show up in the "Merzouga or Zagora?" decision, even though the blog already answers that question. On file: "erg chigaga" 480, "erg chigaga camp" 390, "erg chigaga luxury camp" 390, "zagora desert" 210.
5. **No day trips from Fes, Tangier, Casablanca or Agadir.** Every day trip on the site leaves from Marrakech. Day trips are the cheap first purchase that brings people back for a desert tour.
6. **Destination pages are thin.** 7 pages, and there is no Aït Ben Haddou page (on file 3,600), Todra Gorge (1,900), Dades Valley (880), Erg Chigaga (480), Tangier, Casablanca, Agadir or Imlil / High Atlas.

### Structural improvements
- **One master hub `sahara-desert-tours.html`**: a matrix of start city × end city × days, one row per tour with a filter (same pattern as the sticky `.tbar` on tours/index); a short "Merzouga vs Zagora vs Erg Chigaga" block linking to the blog; FAQ.
- **Two departure hubs**: `desert-tours-from-marrakech.html` and `desert-tours-from-fes.html`. Each groups its tours as *round trip* and *one way*, sorted by days. These are the pages that can rank for "marrakech desert tour" and "fes desert tour". The city pages (`morocco-tours-from-*.html`) stay as general "all tours from X" pages and link to the hub.
- **Categorise by START city, then by end.** Label every desert card "Round trip" or "Ends in Fes / Marrakech". That is the real decision for desert buyers, because it decides where they fly home from.
- **Merzouga hub (`destinations/merzouga.html`) stays the centre.** It lists activities, then "Tours that reach Merzouga", then "Getting to Merzouga" (transfers). Every desert tour links back to it.
- **Menu:** a top-level **Desert Tours** item. This is a header change on every page, so it waits until you confirm the header rollout.
- **Fix the "Our Desert Tours" row on the Merzouga hub:** it includes the 4-day Erg Chigaga tour, which never goes to Merzouga. Move it to the master hub only.

---

## Part 2 — Desert & Merzouga route matrix

Status: ✅ exists · 🆕 new page.

### From Marrakech
| Status | Page (slug) | SEO title | Primary keyword | Core selling point |
|---|---|---|---|---|
| ✅ | 2-day-marrakech-to-merzouga-desert-tour | 2-Day Marrakech to Merzouga Desert Tour \| Private | 2 day desert tour from marrakech | A dune night when time is short; honest about the 9–10 h drives |
| ✅ | 3-days-desert-tour-marrakech-to-merzouga | 3-Day Marrakech to Merzouga Desert Tour \| Private | 3 day desert tour from marrakech | The classic: Aït Ben Haddou, Dades, a camp in the dunes, same guide all 3 days |
| ✅ | 3-day-marrakech-to-fes-desert-tour | 3-Day Marrakech to Fes Desert Tour \| Private | marrakech to fes desert tour (260 on file) | The desert on the way to Fes, so no drive back |
| 🆕 | 4-day-marrakech-to-merzouga-desert-tour | 4-Day Marrakech to Merzouga Desert Tour \| Private Round Trip | 4 day desert tour from marrakech (30 on file) | A full day in the dunes and no long drive day; back to Marrakech for your flight |
| ✅ | 4-day-marrakech-to-fes-desert-tour-via-merzouga | — | marrakech to fes desert tour 4 days (50 on file) | Full Merzouga day, ends in Fes |
| ✅ | 5-day-marrakech-to-fes-sahara-desert-tour | — | 5 days in morocco itinerary (260 on file) | Guided Fes medina day included |
| 🆕 | 2-day-marrakech-to-zagora-desert-tour | 2-Day Zagora Desert Tour from Marrakech \| Private | zagora desert tour | The shortest real desert night from Marrakech, without the 560 km to Merzouga |
| 🆕 | 3-day-marrakech-erg-chigaga-tour | 3-Day Marrakech to Erg Chigaga Desert Tour \| Private 4×4 | erg chigaga tour (erg chigaga 480 on file) | Wild, empty dunes by 4×4 in 3 days |
| 🆕 | erg-chigaga-luxury-camp (experience page) | Erg Chigaga Luxury Desert Camp \| Private Night with 4×4 | erg chigaga luxury camp (390 on file) | High-intent camp search with no product page today |
| ✅ | 4-day / 7-day Erg Chigaga, 6-day Zagora–Ouzina | — | — | Keep |

### From Fes
| Status | Page | SEO title | Primary keyword | Core selling point |
|---|---|---|---|---|
| 🆕 **P1** | 2-day-fes-to-merzouga-desert-tour | 2-Day Fes to Merzouga Desert Tour \| Private Round Trip | fes to merzouga 2 days ("fes to merzouga" + "fez to merzouga" 90 + 90 on file) | One night in the dunes and back in Fes the next evening |
| 🆕 **P1** | 3-day-fes-to-merzouga-desert-tour | 3-Day Fes to Merzouga Desert Tour \| Private Round Trip | 3 day desert tour from fes | GetYourGuide's best seller (1,063 reviews): camp night plus a hotel or Todra night, back to Fes |
| 🆕 **P1** | 3-day-fes-to-marrakech-desert-tour | 3-Day Fes to Marrakech Desert Tour via Merzouga \| Private | fes to marrakech desert tour | GetYourGuide's best seller (1,106 reviews): the desert *is* the transfer to Marrakech |
| ✅ | 4-day-fes-desert-tour (loop) | — | fes desert tour (50 on file) | Full Merzouga day + Todra |
| ✅ | 4-day / 5-day Fes → Marrakech | — | — | Keep |
| 🆕 | 2-day-fes-to-marrakech-via-merzouga (optional) | 2-Day Fes to Marrakech via the Sahara | — | Only if the owner sells it. It is very long (~1,030 km), so check feasibility first |

### Starting in Merzouga (new category)
| Status | Page | SEO title | Primary keyword | Core selling point |
|---|---|---|---|---|
| 🆕 **P1** | merzouga-to-fes-tour | 2-Day Merzouga to Fes Tour: Camp Night + Private Drive | merzouga to fes | For bus and car arrivals: a night in the dunes, then a private drive north by the cedar forest |
| 🆕 **P1** | merzouga-to-marrakech-tour | 2-Day Merzouga to Marrakech Tour via Todra & Aït Ben Haddou | merzouga to marrakech (90 on file) | The way back, split over two days with the gorges |
| 🆕 | merzouga-private-transfers | Private Transfers to Merzouga from Marrakech, Fes & Errachidia | marrakech to merzouga transfer / how to get to merzouga | A direct driver instead of a 10 h bus; also sells add-on camp nights |

### Other hubs & grand tours
| Status | Page | SEO title | Primary keyword | Core selling point |
|---|---|---|---|---|
| ✅ | Errachidia 3/4/5-day | — | errachidia airport (110 on file) | Fly in, 2 h to the dunes |
| ✅ | Rabat 3-day ×2, Agadir 3/4/5-day | — | — | Keep |
| 🆕 | 4-day-casablanca-to-merzouga-desert-tour | 4-Day Casablanca to Merzouga Desert Tour, Ends in Marrakech | casablanca desert tour | Casablanca is the main long-haul airport; today the shortest desert tour from there is 6 days |
| 🆕 | 2-day-ouarzazate-to-merzouga-tour (low priority) | 2-Day Ouarzazate to Merzouga Desert Tour \| Private | ouarzazate to merzouga | Serves guests already in Ouarzazate. Low demand, build late |
| ✅ | Tangier 5/7/8/10-day via Merzouga | — | — | Keep. No short "Tangier → Merzouga" needed: the drive is too long |
| 🆕 hub | sahara-desert-tours.html | Morocco Sahara Desert Tours: Merzouga, Zagora & Erg Chigaga | sahara desert tour morocco | Master matrix |
| 🆕 hub | desert-tours-from-marrakech.html | Desert Tours from Marrakech: 2, 3 & 4 Days to the Sahara | marrakech desert tour | Departure hub |
| 🆕 hub | desert-tours-from-fes.html | Desert Tours from Fes: 2, 3 & 4 Days to Merzouga | desert tour from fes | Departure hub |

---

## Part 3 — Non-desert tours & day trips to add

All of these cross-sell a desert tour on the same trip.

**From Fes (biggest gap: zero day trips today)**
1. Chefchaouen day trip from Fes: the most-asked day trip in the north.
2. Volubilis, Moulay Idriss & Meknes day trip from Fes.
3. Fes medina guided tour (copy the Marrakech medina model: no shop stops, tanneries from a rooftop).
4. Middle Atlas day: Ifrane, Azrou cedar forest and the Barbary macaques.
5. Fes airport transfer.

**From Marrakech (already strong, still missing)**
6. Toubkal 2-day trek from Imlil (a big search, and the Atlas page already points to it).
7. Agafay desert camp overnight (the luxury-camp search, close to Marrakech).
8. Casablanca day trip from Marrakech (Hassan II Mosque).
9. Three Valleys day trip (Ourika + Asni + Agafay). Optional: it overlaps the Atlas page.

**From Tangier / Spain arrivals**
10. Chefchaouen day trip from Tangier.
11. Tangier day tour for ferry passengers (from Tarifa): a big Spain-side audience.
12. Tetouan + Chefchaouen day trip. Optional.

**From Casablanca / Rabat**
13. Casablanca city tour + Hassan II Mosque (on file: "hassan ii mosque" 14,800).
14. Rabat day trip from Casablanca.
15. Casablanca airport transfer (on file: "casablanca airport" 14,800), plus a Casablanca → Marrakech private transfer (1,600 on file).

**From Agadir**
16. Paradise Valley day trip.
17. Timlalin dunes + sandboarding (the "desert by the sea").
18. Agadir → Marrakech or Essaouira day trips.

**Destination pages (traffic magnets that pass visitors to tours)**
Aït Ben Haddou (3,600 on file), Todra Gorge (1,900), Dades Valley (880), Erg Chigaga (480), Zagora, Tangier, Casablanca, Agadir, Imlil / High Atlas. The blog already has "things to do" posts for several of these, so build each destination page on top of its post and don't duplicate it.

---

## Part 4 — Competitors, search intent and the page checklist

### What GetYourGuide, Viator and the top local operators do to win bookings
| Practice | Our status |
|---|---|
| Review count + score at the very top ("4.7 · 1,106 reviews") | ❌ The site-wide 4.9 / 5,000+ only. **Biggest trust gap:** tour-specific reviews or a Tripadvisor / Google widget |
| "From €X" price, price per person by group size | ❌ The owner's rule is no prices. Competitors all show one; a "from" price is the owner's call |
| Date picker + "Reserve now, pay later" | Partial: date field + small deposit. "Reserve now, pay the rest on arrival" could be worded more strongly near the button |
| Free cancellation stated next to the button | ✅ |
| Hour-by-hour itinerary with drive times and km | ✅ (stronger than competitors) |
| Map | ✅ (stronger than competitors) |
| Inclusions / exclusions, "costs on the way" | ✅ (stronger: honest fee list) |
| Camp tiers with real photos | Partial: real camp photos are still missing |
| Private / shared toggle | Competitors use it. **Not recommended here:** 100% private is the brand and the comparison table was already rejected |
| Upsells inside the booking (quad, luxury camp, 4×4) | ✅ via Make It Your Own; could become checkbox options in the booking form |
| Pick-up details (riad / medina gate) | ✅ |
| Real traveller photos in the gallery | ❌ Many galleries use generic or stock photos |

**Search intent in short:**
- **"X day desert tour from Y"**: buyers ready to book. They compare duration, start and end, the camp and price.
- **"Merzouga" / "Erg Chebbi" / "camp"**: still planning. They want the hub, camps and how to get there.
- **"X to Y" (marrakech to fes, merzouga to marrakech)**: they need transport. Answer with a tour + transfer + train / bus facts on one page.
- **Place names (Aït Ben Haddou, Todra)**: researchers. Answer with destination pages that link to the tours.

### Prioritised checklist

**Priority 1: Immediate desert pages**
- [ ] `tours/3-day-fes-to-marrakech-desert-tour.html`
- [ ] `tours/3-day-fes-to-merzouga-desert-tour.html` (round trip)
- [ ] `tours/2-day-fes-to-merzouga-desert-tour.html` (round trip)
- [ ] `tours/4-day-marrakech-to-merzouga-desert-tour.html` (round trip)
- [ ] `tours/merzouga-to-fes-tour.html`
- [ ] `tours/merzouga-to-marrakech-tour.html`
- [ ] `sahara-desert-tours.html` (master matrix hub)
- [ ] `desert-tours-from-marrakech.html`
- [ ] `desert-tours-from-fes.html`
- [ ] `tours/2-day-marrakech-to-zagora-desert-tour.html`
- [ ] `tours/3-day-marrakech-erg-chigaga-tour.html`
- [x] `tours/4-day-casablanca-to-merzouga-desert-tour.html` (built 2026-11-19)

**Priority 2: Local Merzouga experiences**
- [ ] `tours/merzouga-private-transfers.html` (Marrakech / Fes / Errachidia ↔ Merzouga)
- [ ] `tours/merzouga-luxury-desert-camp.html` (luxury tier only: real photos, private bathroom, stargazing)
- [ ] `tours/merzouga-camel-trek-2-nights.html` (deep-dune trek, nomad camp; camel-trekking blog already ranks)
- [ ] `tours/merzouga-sunrise-camel-ride.html` (or a sunrise option on the sunset page, to avoid two near-identical pages)
- [ ] `tours/merzouga-stargazing-night.html` (astronomy night at the camp; can be a camp add-on)
- [ ] `tours/erg-chigaga-luxury-camp.html`
- [ ] Merzouga hub: add "Getting to Merzouga" + "Tours that reach Merzouga" (drop the Erg Chigaga card)

**Priority 3: High-demand day trips**
- [ ] `tours/fes-to-chefchaouen-day-trip.html`
- [ ] `tours/fes-volubilis-meknes-day-trip.html`
- [ ] `tours/fes-medina-guided-tour.html`
- [ ] `tours/fes-middle-atlas-ifrane-azrou-day-trip.html`
- [ ] `tours/toubkal-2-day-trek-from-marrakech.html`
- [ ] `tours/agafay-desert-camp-overnight.html`
- [ ] `tours/casablanca-hassan-ii-mosque-city-tour.html` + `tours/casablanca-airport-transfer.html`
- [ ] `tours/tangier-to-chefchaouen-day-trip.html` + `tours/tangier-day-tour-from-tarifa.html`
- [ ] `tours/agadir-paradise-valley-day-trip.html` + `tours/agadir-timlalin-dunes-sandboarding.html`
- [ ] `day-trips.html`: becomes "Day Trips in Morocco" with a section per city
- [ ] Destination pages: Aït Ben Haddou, Todra & Dades, Erg Chigaga / Zagora, Tangier, Casablanca, Agadir, Imlil

**Supporting work (no new URLs)**
- Tour-specific reviews (or a Tripadvisor / Google embed) on the desert pages first.
- Real camp photos and real photos on the Fes, Tangier and Agadir pages.
- A "Desert Tours" menu item and these hubs in the header and footer (needs the header rollout OK).
- Measure keyword volumes when OpenSEO credits are back: "3 day desert tour from fes", "fes to marrakech desert tour", "zagora desert tour", "merzouga luxury camp", "marrakech to merzouga transfer", "chefchaouen day trip from fes".

**Note on the owner rule "keep original routes, don't invent new tours":** every 🆕 tour above is a *new product* and needs the owner's OK and a real operational check (camps, drivers, timings) before anyone builds it.
