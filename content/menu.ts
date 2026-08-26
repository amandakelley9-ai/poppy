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
      "lemon cheesecake filling, raspberry compote, fresh raspberries, dark chocolate drizzle, powdered sugar",
    price: "[[ $ ]]",
    image: null,
    imageAlt:
      "The poppy crêpe — folded crêpe with lemon cheesecake filling, raspberry compote and fresh raspberries, finished with dark chocolate and powdered sugar",
    tags: ["V"],
    hero: true,
  },
  {
    name: "nutella + fruit",
    slug: "nutella-fruit",
    description:
      "sweet crepe, strawberries, banana, chantilly cream, chocolate syrup, powdered sugar",
    price: "[[ $ ]]",
    image: null,
    imageAlt:
      "Nutella and fruit crêpe with strawberries, banana and chantilly cream",
    tags: ["V"],
  },
  {
    name: "frenchie",
    slug: "frenchie",
    description: "ham, gruyère cheese, dijon dressing, optional nested egg",
    price: "[[ $ ]]",
    image: null,
    imageAlt: "The frenchie — savory crêpe with ham, gruyère and dijon dressing",
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
      "Veggie crêpe with swiss cheese, spinach, cranberry and feta, finished with balsamic glaze",
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
