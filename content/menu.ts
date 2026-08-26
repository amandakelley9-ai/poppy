/**
 * The menu. Edit here, never in JSX.
 *
 * Every item carries a `price` field. The brand's menu board didn't list
 * prices, so they ship as the placeholder "[[ $ ]]" — fill them in and they
 * appear on /menu automatically.
 */
export type DietaryTag = "V" | "GF" | "DF";

export type MenuItem = {
  /** Lowercase, as the brand sets it. */
  name: string;
  /** Also the placeholder image filename: /images/crepes/<slug>.jpg */
  slug: string;
  description: string;
  price: string;
  /** Path under /public/images/crepes, or null for a labeled placeholder. */
  image: string | null;
  imageAlt: string;
  /**
   * CSS object-position for the photo, e.g. "center 70%".
   *
   * These are tall 3:4 photos shown in wide 4:3 and square containers, so
   * object-cover always crops the top and bottom. Raise the percentage to
   * slide the visible window further down the photo, lower it to move up.
   * Omit for centred, which suits most plates.
   */
  focal?: string;
  tags: DietaryTag[];
  /** Marks the hero item in the Home page menu preview. */
  hero?: boolean;
  savory?: boolean;
};

export type MenuSection = {
  id: string;
  /** Rendered as the gold eyebrow with flanking hairlines. */
  eyebrow: string;
  heading: string;
  blurb?: string;
  items: MenuItem[];
};

export const dietaryLegend: Record<DietaryTag, string> = {
  V: "Vegetarian",
  GF: "Gluten-free crêpe available",
  DF: "Dairy-free option available",
};

export const signatureCrepes: MenuItem[] = [
  {
    name: "poppy crêpe",
    slug: "poppy-crepe",
    description:
      "red velvet poppyseed crêpe, lemon cheesecake filling, raspberry compote, fresh raspberries, dark chocolate drizzle, powdered sugar",
    price: "[[ $ ]]",
    image: null,
    imageAlt:
      "The poppy crêpe on a pale plate — a folded red velvet poppyseed crêpe layered with lemon cheesecake cream and raspberry compote, topped with fresh raspberries, candied lemon slices, dark chocolate drizzle and raspberry powder",
    tags: ["V"],
    hero: true,
  },
  {
    name: "nutella + fruit",
    slug: "nutella-fruit",
    description:
      "sweet crepe, strawberries, optional banana, chantilly cream, chocolate syrup, powdered sugar",
    price: "[[ $ ]]",
    image: null,
    imageAlt:
      "The nutella + fruit crêpe on a pale plate — folded sweet crêpe with nutella and sliced strawberries, topped with a swirl of chantilly cream, chocolate syrup and powdered sugar",
    tags: ["V"],
  },
  {
    name: "frenchie",
    slug: "frenchie",
    description: "ham, gruyère cheese, dijon dressing, optional nested egg",
    price: "[[ $ ]]",
    image: null,
    imageAlt:
      "The frenchie on a pale plate — a folded savory crêpe with ham and gruyère, a nested fried egg with a runny yolk on top, dijon dressing, lemon slices and fresh cilantro",
    focal: "center 68%",
    tags: [],
    savory: true,
  },
  {
    name: "veggie",
    slug: "veggie",
    description: "swiss cheese, spinach, cranberry, feta, balsamic glaze drizzle",
    price: "[[ $ ]]",
    image: null,
    imageAlt:
      "The veggie crêpe on a pale plate — a folded crêpe over swiss cheese and fresh spinach, scattered with crumbled feta, walnuts and dried cranberries, finished with balsamic glaze and a lemon slice",
    focal: "center 60%",
    tags: ["V"],
    savory: true,
  },
];

export const kidsCrepes: MenuItem[] = [
  {
    name: "pb&j",
    slug: "pb-and-j",
    description: "peanut butter and jam, folded simple",
    price: "[[ $ ]]",
    image: null,
    imageAlt: "Kids peanut butter and jam crêpe",
    tags: ["V"],
  },
  {
    name: "just nutella",
    slug: "just-nutella",
    description: "nutella, nothing else, exactly as requested",
    price: "[[ $ ]]",
    image: null,
    imageAlt: "Kids crêpe with nutella only",
    tags: ["V"],
  },
];

/** Coffee & drinks read as a single list on the board, so they stay a list. */
export const drinks: { name: string; price: string }[] = [
  { name: "latte", price: "[[ $ ]]" },
  { name: "cappuccino", price: "[[ $ ]]" },
  { name: "americano", price: "[[ $ ]]" },
  { name: "french hot chocolate", price: "[[ $ ]]" },
  { name: "kids hot chocolate", price: "[[ $ ]]" },
  { name: "bottled drinks + water", price: "[[ $ ]]" },
];

export const menuSections: MenuSection[] = [
  {
    id: "signature",
    eyebrow: "Signature Crêpes",
    heading: "the ones we're known for",
    blurb: "Folded to order on the griddle, sweet or savory.",
    items: signatureCrepes,
  },
  {
    id: "kids",
    eyebrow: "Kids",
    heading: "for smaller appetites",
    items: kidsCrepes,
  },
];

export const heroItem = signatureCrepes.find((i) => i.hero)!;
