# CLAUDE.md — Morocco Tours Hub website

## Read the right file for the job (only that one)
- **Multi-day tour page:** read ONLY `.claude/PERFECT-TOUR.md`, then build.
- **Day trip / experience / activity page:** `.claude/PERFECT-DAY-TRIP.md` (model page `tours/marrakech-agafay-desert-day-trip.html`).
- **Any other page or design work:** `.claude/OWNER-PROFILE.md` (owner's taste, rejected ideas, brand, design system).
- **History / a past fact** (which hotels a tour uses, saved routes, what was rejected, "owner to confirm" items): search `.claude/PROGRESS.md` with grep. Never read it whole.
- **Logging:** after each finished change, add ONE short "Done/Update" paragraph at the end of `.claude/PROGRESS.md` (never in this file).
- Research notes per page: `.claude/research/`. Build scripts and map tools: `.claude/tools/` (read `tools/tour-build/README` first; never re-run a script on a finished page).

## The business
- **Morocco Tours Hub**, local Moroccan operator, https://moroccotourshub.com/ — 100% private, tailor-made tours: Sahara desert (our strongest identity), imperial cities, Atlas, coast, day trips and activities.
- Promise: private & customisable, local driver-guides, comfortable vehicles, small deposit + balance on arrival, transparent pricing ("what we agree on is what you pay").
- WhatsApp **+212 621 460 083** → `https://wa.me/212621460083`.

## Current phase (2026-11-19)
- [x] Homepage + global design · [x] day-trip and tour blueprints · [x] all existing tours and day trips rebuilt
- [→] **Adding missing pages** (new tours, activities, hubs) on the existing layouts.
- [ ] Layout/design polish on chosen pages · [ ] Content & SEO phase · [ ] Deploy (301 redirects for the 5 deleted experience pages).

## How to work (owner rules)
- Act as an expert in tourism, travel marketing and SEO. Copy follows the traveller's real worries and situation; every downside comes with its solution or a better-fit tour.
- **Don't change for the sake of changing.** If something already works, say so and argue why. "Optimize" can mean "nothing to change".
- **No guessing.** Facts come from the site or research; when the owner says "you choose", decide from research and flag it "owner to confirm". Ask only what only the owner knows.
- Similar pages (e.g. 3-day vs 4-day desert tour) use the same layout but must read differently: show the real difference so the visitor can pick.
- Always suggest related pages that fit the reader's situation (better-fit tour, add-on activity, hub).
- Apply exactly the change asked; one section/page at a time; reuse approved patterns.
- If a research tool (OpenSEO, Firecrawl) is out of credits, don't retry it: use web search, and check `.claude/research/` first.
- **Tell the owner when to start a new session.** When this session gets long (a finished page plus another task, a context summary has happened, or many big files/screenshots were read), say so plainly at the end of the reply: "This session is getting long; start a new one for the next task." Give a one-line handoff (what is done, what is next, which file to read) so the new session starts fast. Never cut a task short for it.

## Technical rules
- Plain static site, **no build step, no templating**: ~190 HTML pages, one `assets/css/styles.css` (tokens in `:root`), one `assets/js/main.js`.
- **Header and footer are copy-pasted into every page** → change them by script only, and confirm with the owner first.
- `styles.css` is shared: add page-scoped classes, check other pages don't break. Remove dead markup/CSS when rebuilding.
- Keep SEO plumbing intact: `<title>`, meta, canonical, hreflang, JSON-LD, `sitemap.xml`, `robots.txt`, URLs. No price anywhere (page or JSON-LD).
- Semantic HTML, one `h1`; hover + focus-visible + active on every clickable; animate only `transform`/`opacity`, never `transition: all`.
- Images: real files from `assets/images/` with `alt`, `width`/`height`, `loading="lazy"` (not the hero). New photos only with free licences and the owner's OK.
- Preview: `node serve.mjs` → http://localhost:3000 (paths are root-absolute, never `file:///`). Check at 1366×768, 768 and 375 yourself; prefer text checks, one screenshot when it helps.
- Invoke the `frontend-design` skill before writing new UI.

## Secrets & git
- API keys only in `.env` (gitignored), never in pages or commits. `.env.example` = placeholder names only.
- Commit or push only when the owner asks ("save changes" = commit). On Windows use a message file with `git commit -F`.
- Original export backup: `../morocco-tours-hub-website.zip`.
