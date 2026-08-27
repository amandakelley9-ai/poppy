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

/**
 * Dietary tags are switched off for now: every item ships with `tags: []`, so
 * no pills render and /menu hides the dietary key automatically. Nothing else
 * had to change — put a tag back on an item and both reappear.
 */
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
    tags: [],
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
    tags: [],
  },
  {
    name: "frenchie",
    slug: "frenchie",
    description: "ham, gruyère cheese, dijon dressing, optional nested egg",
    price: "[[ $ ]]",
    image: null,
    imageAlt:
      "The frenchie on a pale plate — a folded savory crêpe with ham and gruyère, a nested fried egg with a runny yolk on top, dijon dressing, lemon slices and fresh cilantro",
    // Centres the egg. Its midpoint sits at 41% of the image height; the 4:3
    // card wants 30% and the square thumbnail 16%, so 24% splits them.
    focal: "center 24%",
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
    tags: [],
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
    imageAlt:
      "The kids pb&j crêpe on a pale plate — a folded crêpe spread with peanut butter and strawberry jam, with two whole strawberries alongside",
    tags: [],
  },
  {
    name: "just nutella",
    slug: "just-nutella",
    description: "nutella, nothing else, exactly as requested",
    price: "[[ $ ]]",
    image: null,
    imageAlt:
      "The kids just nutella crêpe on a pale plate — a folded crêpe spread with nutella, finished with chocolate drizzle and powdered sugar",
    focal: "center 62%",
    tags: [],
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

/** True while any item still carries a dietary tag. Drives the /menu key. */
export const hasDietaryTags = menuSections.some((section) =>
  section.items.some((item) => item.tags.length > 0),
);
