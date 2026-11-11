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

**Owner's style preferences learned:** likes the reference site's look; square-ish (6px) uppercase buttons in brand gold; white/dark contrast in header; keep things compact ("not too big"); wants to preview at laptop size (1366×768).

**Next up (owner decides order):** rest of the hero (trust strip / social sidebar / avatars card), then sections below following the reference order. Header/footer rollout to the other 161 pages only after the homepage is finished — confirm first.

## Secrets & git
- **Any API key goes in `.env`, which is listed in `.gitignore`. Never put a key in a page file, never commit it to GitHub.** `.env.example` holds placeholder names only.
- Don't commit or push unless the user asks.
- The original export is kept as `../morocco-tours-hub-website.zip` (backup).
