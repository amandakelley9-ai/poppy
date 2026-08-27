# Poppy Crêpes

Marketing site for **Poppy Crêpes — Crêperie & Café**, a mobile crêpe trailer and
catering business. Built to convert visitors into event booking inquiries.

- **Live domain:** https://poppycrepes.com
- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4
- **Hosting:** GitHub Pages, as a static export, deployed by GitHub Actions

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

`npm run build` writes a fully static site to `out/`. There is no server —
see **Hosting** below for what that means.

---

## Project structure

```
.github/workflows/      Build + deploy to GitHub Pages
app/                    Routes. One folder per page.
  icon.tsx              Favicon, generated from the poppy motif
  opengraph-image.tsx   Social share card
components/             UI. `poppy.tsx` holds the motif.
content/                *** Everything editable lives here ***
lib/booking-schema.ts   Form validation rules, shared by every field
public/CNAME            Custom domain — must stay in public/
public/.nojekyll        Stops Jekyll eating _next/ — must stay in public/
public/images/          Photography, organised by subject
scripts/                Placeholder image generator
legacy/index.html       The previous static site, kept for reference
```

### Editing content

You should rarely need to touch JSX. All copy and data live in `content/`:

| File | What it controls |
|---|---|
| `site.ts` | Contact details, social links, service area, pricing, response time, **form access key** |
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

## Hosting

The site is a **static export** served by **GitHub Pages**. `next.config.ts`
sets `output: "export"`, so `npm run build` prerenders every page to `out/`.

Two consequences:

- **No API routes.** There is no server to run them. The booking form posts
  straight to a form service instead (below).
- **No `next/image` optimisation.** It needs a server, so it's disabled.
  Resize and compress photos yourself before adding them — see the dimensions
  table below.

### Deploying

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.

> **One-time setup:** in **Settings → Pages**, set **Source** to
> **GitHub Actions**. If it's left on "Deploy from a branch", the workflow's
> output is ignored and Pages serves the repo root instead — which renders this
> README as the homepage.

`public/CNAME` holds the custom domain and `public/.nojekyll` stops Jekyll from
eating the `_next/` folder. Both must stay in `public/` so they end up inside
`out/`. Deleting either breaks the live site.

Check progress under the repo's **Actions** tab. A deploy takes about two
minutes.

---

## Connecting the booking form

The form validates in the browser with zod, then POSTs to a form service that
emails you the inquiry. Default is [Web3Forms](https://web3forms.com) — free for
250 submissions a month.

1. Go to [web3forms.com](https://web3forms.com) and enter the address where you
   want inquiries delivered.
2. They email you an **access key**. Paste it into `site.form.accessKey` in
   `content/site.ts`.
3. Commit and push. That's the whole setup — no account, and the key is safe to
   commit publicly because it only ever routes mail to the address you verified.

Until the key is set, the form tells visitors to email you directly rather than
failing silently.

To use a different service (Formspree, Basin, Getform all work the same way),
change `site.form.endpoint` and check which field name it expects for the key.

### What the static setup costs you

Worth knowing, since the form is the site's main job:

| | Status |
|---|---|
| Client-side validation | Works — zod, inline field errors |
| Honeypot + timing trap | Works, but client-side only, so weaker |
| **Server-side validation** | **Gone.** No server. The form service is the only gatekeeper. |
| **Branded customer auto-reply** | **Gone.** Visitors get the on-page confirmation instead of an email. Some services offer an autoresponder on paid plans — check yours. |
| Reply-to the customer | Works — the `email` field sets it automatically |

If you ever move to a host that runs server code (Cloudflare Pages, Netlify and
Vercel all have free tiers), the full Resend integration — server-side
validation, rate limiting, and the branded auto-reply — is recoverable from git:

```bash
git checkout d640c10 -- app/api lib/emails.tsx lib/rate-limit.ts
```

Then drop `output: "export"` from `next.config.ts` and set `RESEND_API_KEY`,
`BOOKING_TO_EMAIL` and `BOOKING_FROM_EMAIL`.

---

## Images

Every slot below has a generated placeholder — a cream block labelled with its
filename and dimensions. **Drop a real photo at the same path and it's live; no
code change needed.** To regenerate any missing placeholders:

```bash
python3 scripts/generate-placeholders.py   # never overwrites a real photo
```

> **Size photos before adding them.** `next/image` optimisation is off (it
> needs a server), so whatever you commit is what visitors download. A phone
> photo is typically 3000 × 4000 and 6 MB; aim for the dimensions in the table
> below at roughly 250–450 KB:
>
> ```bash
> python3 -c "
> from PIL import Image, ImageOps
> im = ImageOps.exif_transpose(Image.open('source.jpg')).convert('RGB')
> im.resize((1000, 1333), Image.Resampling.LANCZOS).save(
>     'public/images/crepes/NAME.jpg', quality=78, optimize=True, progressive=True)"
> ```

### House style

Overhead or three-quarter, bright, generous portions, on a light surface —
matching the plated crêpes on the menu board.

### Every image slot

| Path | Dimensions | What it is |
|---|---|---|
| `videos/chocolate-pour.mp4` | 1080 × 1920 | **Home hero background video.** See "The hero videos" below. |
| `images/crepes/chocolate-pour-poster.jpg` | 1080 × 1920 | Its poster — the video's own first frame. Regenerate the two together or the hero jumps when playback starts. |
| `images/crepes/poppy-crepe.jpg` | 1000 × 1333 | **Real photo.** poppy crêpe — the hero item. Portrait 3:4; the containers crop it to 4:3 and square via `object-cover`, so keep the plate centred in any replacement. |
| `images/crepes/nutella-fruit.jpg` | 1600 × 1200 | nutella + fruit |
| `images/crepes/frenchie.jpg` | 1600 × 1200 | frenchie |
| `images/crepes/veggie.jpg` | 1600 × 1200 | veggie |
| `images/crepes/pb-and-j.jpg` | 1600 × 1200 | pb&j |
| `images/crepes/just-nutella.jpg` | 1600 × 1200 | just nutella |
| `images/crepes/drinks.jpg` | 1600 × 1200 | Coffee & drinks *(not yet placed on a page)* |
| `videos/sweet-savory.mp4` | 720 × 1280 | **Catering hero background video.** |
| `images/catering/sweet-savory-poster.jpg` | 1440 × 2560 | Its poster — that video's own first frame. |
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

## The hero videos

Two clips play muted and looping behind the page heroes, under the burgundy
scrim:

| Page | Video | Poster |
|---|---|---|
| Home | `videos/chocolate-pour.mp4` | `images/crepes/chocolate-pour-poster.jpg` |
| `/catering` | `videos/sweet-savory.mp4` | `images/catering/sweet-savory-poster.jpg` |

Both are portrait phone footage. That works in their favour on mobile, where
they fill the tall hero; on desktop `object-cover` crops to a horizontal band,
which reads as an intentional food close-up. The catering hero is deliberately
taller than a typical banner for this reason — a short wide band cropped the
portrait frame to an unreadable sliver.

`components/hero-video.tsx` deliberately does **not** load the video until
after the page's `load` event, and skips it entirely for visitors who have
`prefers-reduced-motion` set or Data Saver turned on. Those visitors keep the
poster frame, which is the video's own first frame, so nothing looks missing.

### Name assets for their content, not their page

`chocolate-pour.mp4`, not `hero.mp4`. GitHub Pages serves assets with
`cache-control: max-age=600` and gives us no way to change that, so **replacing
a file in place leaves visitors on a stale copy for up to ten minutes.** When
the two hero videos were first swapped under their old `hero.mp4` /
`catering-hero.mp4` names, the result was the previous poster flashing before
the new video started.

With content-based names, swapping which video a page uses changes the URL it
points at, and the bytes behind any given URL never change. Follow the same
rule for replacements: new content means a new filename.

### Replacing one

Strip the audio and compress — never drop a phone file in directly, they're
typically 10× too big:

```bash
NAME=my-new-clip

ffmpeg -i "source.mov" -an -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 33 -preset slow -movflags +faststart public/videos/$NAME.mp4

# poster must be the video's first frame, or the hero jumps on play
ffmpeg -ss 0 -i "source.mov" -frames:v 1 -vf "scale=1080:-2" -q:v 11 \
  public/images/crepes/$NAME-poster.jpg
```

Then point the hero at the new names and delete the old files.

`-an` strips audio. `-movflags +faststart` puts the index at the front so it
streams rather than waiting for a full download. CRF 33 is deliberate — the
scrim hides the difference from CRF 30 and saves a third of the file.

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
