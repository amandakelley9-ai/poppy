# Poppy Crêpes

Website for **Poppy Crêpes** — a crêperie & café in Alpine, Utah.

- **Live site:** https://poppycrepes.com
- **Hosting:** GitHub Pages (served from `main` branch, root)
- **Custom domain:** configured via the `CNAME` file

## Files

- `index.html` — the full single-page site (self-contained; images embedded inline)
- `logo_horizontal.png`, `logo_horizontal_cream.png`, `logo_stacked.png` — brand logos
- `CNAME` — custom domain for GitHub Pages

## Editing

Edit `index.html` and push to `main`; GitHub Pages redeploys automatically.

Before launch, replace the placeholders noted at the top of `index.html`:
hours, address, phone, email, social links, and the photo/map frames.

## Fonts

The brand face is **All Round Gothic** (licensed). **Quicksand** is loaded as a
free stand-in so the site looks right immediately. To use the real font, add an
Adobe Fonts kit or a self-hosted `@font-face` — the CSS already lists All Round
Gothic first, so it takes over automatically once available.
