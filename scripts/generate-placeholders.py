#!/usr/bin/env python3
"""
Generate labeled placeholder images for every photo slot the site expects.

Each placeholder is a cream-deep block with the filename and intended
dimensions centered, so it's obvious at a glance what still needs shooting.
Delete a placeholder and drop in the real photo at the same path — nothing
else needs to change.

Run:  python3 scripts/generate-placeholders.py
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

CREAM_DEEP = (249, 239, 227)
HAIRLINE = (227, 214, 198)
INK = (0, 0, 0)
GOLD = (201, 160, 106)

# (path, width, height, human label)
SLOTS = [
    ("images/crepes/poppy-crepe.jpg", 1600, 1200, "poppy crêpe (hero item)"),
    ("images/crepes/nutella-fruit.jpg", 1600, 1200, "nutella + fruit"),
    ("images/crepes/frenchie.jpg", 1600, 1200, "frenchie"),
    ("images/crepes/veggie.jpg", 1600, 1200, "veggie"),
    ("images/crepes/pb-and-j.jpg", 1600, 1200, "pb&j"),
    ("images/crepes/just-nutella.jpg", 1600, 1200, "just nutella"),
    ("images/crepes/drinks.jpg", 1600, 1200, "coffee & drinks"),
    ("images/trailer/trailer-exterior.jpg", 2000, 1333, "Trailer, exterior"),
    ("images/trailer/griddle.jpg", 1600, 1200, "Griddle in service"),
    ("images/trailer/indoor-cart.jpg", 1600, 1200, "Indoor cart setup"),
    ("images/about/owner.jpg", 1200, 1500, "Owner / team portrait (4:5)"),
    ("images/events/holiday-parties.jpg", 1200, 900, "Holiday parties"),
    ("images/events/corporate.jpg", 1200, 900, "Corporate events"),
    ("images/events/school.jpg", 1200, 900, "School events"),
    ("images/events/private.jpg", 1200, 900, "Private gatherings"),
    ("images/events/brunches.jpg", 1200, 900, "Brunches"),
    ("images/events/weddings.jpg", 1200, 900, "Weddings"),
    ("images/events/birthdays.jpg", 1200, 900, "Birthdays"),
    ("images/events/showers.jpg", 1200, 900, "Showers"),
    ("images/events/graduations.jpg", 1200, 900, "Graduations"),
    ("images/events/festivals.jpg", 1200, 900, "Community festivals"),
]

FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Futura.ttc",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
]


def load_font(size):
    for path in FONT_CANDIDATES:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


def centered(draw, text, font, cx, cy, fill):
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    draw.text((cx - (right - left) / 2, cy - (bottom - top) / 2 - top), text, font=font, fill=fill)


def build(path, w, h, label):
    out = Path("public") / path
    if out.exists():
        return False  # never clobber a real photo
    out.parent.mkdir(parents=True, exist_ok=True)

    img = Image.new("RGB", (w, h), CREAM_DEEP)
    d = ImageDraw.Draw(img)

    inset = max(12, min(w, h) // 28)
    d.rectangle([inset, inset, w - inset, h - inset], outline=HAIRLINE, width=max(2, w // 500))

    base = max(16, min(w, h) // 16)
    centered(d, label, load_font(base), w / 2, h / 2 - base * 0.8, INK)
    centered(d, Path(path).name, load_font(int(base * 0.62)), w / 2, h / 2 + base * 0.35, INK)
    centered(d, f"{w} x {h}", load_font(int(base * 0.5)), w / 2, h / 2 + base * 1.4, GOLD)

    img.save(out, quality=82, optimize=True)
    return True


if __name__ == "__main__":
    made = sum(build(*s) for s in SLOTS)
    print(f"{made} placeholder(s) generated, {len(SLOTS) - made} already present.")
