# Poppy Crêpes

Marketing site for **Poppy Crêpes — Crêperie & Café**, a mobile crêpe trailer and
catering business. Built to convert visitors into event booking inquiries.

- **Live domain:** https://poppycrepes.com
- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Resend
- **Deploy target:** Vercel

---

## Local development

```bash
npm install
cp .env.example .env.local     # optional — the form works without it
npm run dev                    # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npx tsc --noEmit   # typecheck
npx eslint .       # lint
```

**The booking form works with no configuration.** Without `RESEND_API_KEY`, the
API route prints the formatted inquiry to your terminal instead of emailing it,
so you can test the whole flow before setting up an email account.

---

## Project structure

```
app/                    Routes. One folder per page.
  api/booking/route.ts  Booking endpoint — validation, spam checks, email
  icon.tsx              Favicon, generated from the poppy motif
  opengraph-image.tsx   Social share card
components/             UI. `poppy.tsx` holds the motif.
content/                *** Everything editable lives here ***
lib/                    Schema, email templates, rate limiting
public/images/          Photography, organised by subject
scripts/                Placeholder image generator
legacy/index.html       The previous static site, kept for reference
```

### Editing content

You should rarely need to touch JSX. All copy and data live in `content/`:

| File | What it controls |
|---|---|
| `site.ts` | Contact details, social links, service area, pricing, response time |
| `menu.ts` | Every menu item, description, price and dietary tag |
| `holiday.ts` | The Holiday & Winter Events band (see below) |
| `events.ts` | Event types, service cards, what's included, form dropdowns |
| `schedule.ts` | Upcoming trailer dates, regular spots, fixed location |
| `faq.ts` | The catering FAQ accordion |
| `testimonials.ts` | Home page social proof |
| `poppy-paths.ts` | Generated SVG path data — do not hand-edit |

---

## The Holiday & Winter Events band

The burgundy band on Home (and the slimmer banner on `/catering`) is driven
entirely by `content/holiday.ts`.

**To turn it off:** set `enabled: false`. It disappears from both pages.

**To swap in a spring/summer variant:** edit the copy fields and move the date
range. The band renders only when `enabled` is `true` **and** today falls inside
`activeFrom`–`activeUntil`, so you can stage the next season ahead of time and it
will switch itself on.

```ts
enabled: true,
activeFrom: "2026-08-01",     // inclusive
activeUntil: "2027-01-05",    // exclusive
weekendsRemaining: 4,         // set to 0 to hide the scarcity line
bookingDeadline: "2026-11-15" // set to null to omit the deadline sentence
```

`Reserve Your Date` links to `/book?event=holiday`, which pre-selects
**Holiday Party** in the form's event-type field.

---

## Setting up Resend

The form works without this. Do it when you're ready to receive real inquiries.

1. **Create a free account** at [resend.com](https://resend.com). The free tier
   covers 3,000 emails/month, far more than a booking form needs.

2. **Verify your domain.** In the Resend dashboard go to **Domains → Add Domain**
   and enter `poppycrepes.com`. Resend gives you DNS records — typically a `TXT`
   for DKIM and an `MX` plus `TXT` for the return path. Add them wherever
   `poppycrepes.com` DNS is managed. Verification usually completes in minutes.

   > You must verify the domain. Resend will reject sends from a `from` address
   > on an unverified domain, and the auto-reply to customers will fail.

3. **Create an API key** under **API Keys → Create API Key**. Give it *Sending
   access*. Copy it — it's shown only once.

4. **Add the environment variables.** Locally, put them in `.env.local`. On
   Vercel, go to **Project → Settings → Environment Variables** and add all
   three to Production (and Preview if you want the form live there):

   | Variable | Example |
   |---|---|
   | `RESEND_API_KEY` | `re_xxxxxxxxxxxx` |
   | `BOOKING_TO_EMAIL` | `catering@poppycrepes.com` |
   | `BOOKING_FROM_EMAIL` | `bookings@poppycrepes.com` |

   `BOOKING_FROM_EMAIL` must be on the domain you verified in step 2.
   `BOOKING_TO_EMAIL` can be any address you can read.

5. **Redeploy** so the new variables are picked up, then send yourself a test
   inquiry through `/book`.

You'll receive the inquiry with `replyTo` set to the customer's address, so
hitting reply reaches them directly. The customer gets a branded confirmation.

---

## Deploying to Vercel

1. Push this repo to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repo. Vercel detects
   Next.js — the defaults are correct.
3. Add the three environment variables above before the first deploy.
4. Deploy.

### Moving the domain off GitHub Pages

`poppycrepes.com` currently points at GitHub Pages, which serves static files
only and **cannot run the booking API**. To cut over:

1. Deploy to Vercel and confirm the site works on its `*.vercel.app` URL.
2. In **Vercel → Project → Settings → Domains**, add `poppycrepes.com` and
   `www.poppycrepes.com`. Vercel shows the DNS records it needs.
3. At your DNS provider, replace the GitHub Pages records (the `A` records
   pointing at `185.199.10x.x`, and any `CNAME` to `*.github.io`) with Vercel's.
4. Wait for DNS to propagate, then confirm HTTPS is issued in Vercel.
5. Once live, delete the `CNAME` file from this repo and turn off GitHub Pages
   in the repo settings, so the two can't fight over the domain.

The old static site is preserved at `legacy/index.html` for reference.

---

## Images

Every slot below has a generated placeholder — a cream block labelled with its
filename and dimensions. **Drop a real photo at the same path and it's live; no
code change needed.** To regenerate any missing placeholders:

```bash
python3 scripts/generate-placeholders.py   # never overwrites a real photo
```

### House style

Overhead or three-quarter, bright, generous portions, on a light surface —
matching the plated crêpes on the menu board.

### Every image slot

| Path | Dimensions | What it is |
|---|---|---|
| `images/crepes/hero.jpg` | 2400 × 1600 | Home hero. Trailer or crêpe, wide. Type sits bottom-left, so keep that area uncluttered. |
| `images/crepes/poppy-crepe.jpg` | 1600 × 1200 | poppy crêpe — the hero item |
| `images/crepes/nutella-fruit.jpg` | 1600 × 1200 | nutella + fruit |
| `images/crepes/frenchie.jpg` | 1600 × 1200 | frenchie |
| `images/crepes/veggie.jpg` | 1600 × 1200 | veggie |
| `images/crepes/pb-and-j.jpg` | 1600 × 1200 | pb&j |
| `images/crepes/just-nutella.jpg` | 1600 × 1200 | just nutella |
| `images/crepes/drinks.jpg` | 1600 × 1200 | Coffee & drinks *(not yet placed on a page)* |
| `images/catering/hero.jpg` | 2400 × 1400 | Catering page hero |
| `images/trailer/trailer-exterior.jpg` | 2000 × 1333 | Trailer, exterior — used in "What's included" |
| `images/trailer/griddle.jpg` | 1600 × 1200 | Griddle in service *(not yet placed)* |
| `images/trailer/indoor-cart.jpg` | 1600 × 1200 | Indoor cart setup *(not yet placed)* |
| `images/about/owner.jpg` | 1200 × 1500 | Owner / team portrait, **4:5 portrait** |
| `images/events/holiday-parties.jpg` | 1200 × 900 | Event grid |
| `images/events/corporate.jpg` | 1200 × 900 | Event grid |
| `images/events/school.jpg` | 1200 × 900 | Event grid |
| `images/events/private.jpg` | 1200 × 900 | Event grid |
| `images/events/brunches.jpg` | 1200 × 900 | Event grid |
| `images/events/weddings.jpg` | 1200 × 900 | Event grid |
| `images/events/birthdays.jpg` | 1200 × 900 | Event grid |
| `images/events/showers.jpg` | 1200 × 900 | Event grid |
| `images/events/graduations.jpg` | 1200 × 900 | Event grid |
| `images/events/festivals.jpg` | 1200 × 900 | Event grid |

Logos in `images/logo/` are the real brand files and shouldn't be replaced.

---

## Brand

### Colors

Defined as Tailwind theme tokens in `app/globals.css`.

| Token | Hex | Role |
|---|---|---|
| `cream` | `#fdf8f3` | Default page background. The site reads cream, never white. |
| `cream-deep` | `#f9efe3` | Alternating bands, cards |
| `poppy` | `#e31218` | Primary accent — CTAs, hovers. ~5–10% of visual weight. |
| `burgundy` | `#700a06` | Dark surfaces — footer, holiday band, image scrims |
| `ink` | `#000000` | Headlines and body copy |
| `gold` | `#c9a06a` | Eyebrow labels, hairlines, the notched frame. Never body copy or buttons — it fails contrast at small sizes. |
| `hairline` | `#e3d6c6` | Borders and input outlines |

### Typography

**Poppins**, self-hosted via `next/font`. Chosen over Jost because the wordmark
has true-circle bowls, a very large x-height, flat vertical-cut terminals and a
straight-descender `y` — Poppins matches all four; Jost is a Futura derivative
with a smaller x-height and an angled `y`.

Headlines are set **lowercase** sitewide to echo the wordmark, with tight
line-height and slightly negative tracking. Section headings use the gold
all-caps eyebrow between hairlines, taken from the menu board's
`— SIGNATURE CRÊPES —`.

### The poppy motif

`components/poppy.tsx`. The bloom is a genuine **potrace of the logo artwork**,
not clip-art — three stacked layers (black silhouette, dark petals, light
petals) reproducing how the original is built, so the black reads as the heavy
outline. Path data is generated into `content/poppy-paths.ts`; don't hand-edit
it. The long sinuous stem and leaves on `PoppyStem` are drawn to match that line
language.

Used sparingly: section divider, menu list bullets, the cropped bleed on the
holiday band, the favicon and share card.

---

## Known discrepancies

Worth knowing before you tweak the brand tokens.

- **`poppy` is `#e31218`, but the logo's red is `#ed1b24`.** The brief specified
  `#e31218` and called it "the logo red"; sampling the actual PNGs gives
  `#ed1b24` for the upper petals and `#d61a21` for the lower. The spec value is
  used for UI (buttons, links); the motif uses the measured logo colors via
  `--color-petal-light` / `--color-petal-dark` so the artwork stays accurate. To
  snap the whole site to the true logo red, change `--color-poppy` in
  `app/globals.css` — it's one line.

- **`burgundy` and `gold` aren't in any supplied file.** They came from the
  brief, presumably sourced from the printed menu board and crepe-cone
  packaging, which weren't included in this repo.

- **The motif is the logo bloom, not the packaging illustration.** The brief
  describes art-nouveau poppies with striped petals on multiple sinuous stems —
  that artwork is on the packaging, which wasn't available. The logo's single
  bold bloom was traced instead.
