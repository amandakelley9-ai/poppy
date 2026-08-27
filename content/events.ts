/** Event types shown as the grid on /catering, and as the "what we do" cards. */
export type EventType = {
  slug: string;
  name: string;
  blurb: string;
  /** Path under /public/images/events, or null for a labeled placeholder. */
  image: string | null;
  /**
   * Describe the photo once it's a real one. Left unset while the slot is
   * still a labelled placeholder, which renders alt="" — correct, because a
   * placeholder block carries no information the heading doesn't already give.
   */
  imageAlt?: string;
  /** CSS object-position, e.g. "center 35%". Omit for centred. */
  focal?: string;
  /**
   * Which option the /book form should preselect when this card is clicked.
   * Must be one of `bookingEventTypes` below — the type enforces it.
   */
  bookingType: BookingEventType;
};

export const eventTypes: EventType[] = [
  {
    slug: "holiday-parties",
    bookingType: "Holiday Party",
    name: "Holiday Parties",
    blurb: "Company parties, family gatherings, and everything December throws at you.",
    image: null,
    imageAlt:
      "Three friends in coats and scarves at a lit-up winter market, holding open boxes of crêpes topped with ice cream",
  },
  {
    slug: "corporate",
    bookingType: "Corporate",
    name: "Corporate Events",
    blurb: "Client days, team lunches, and year-end celebrations.",
    image: null,
    imageAlt:
      "Colleagues standing and talking in small groups at a bright office event space with floor-to-ceiling windows",
  },
  {
    slug: "school",
    bookingType: "School Event",
    name: "School Events",
    blurb: "Fundraisers, teacher appreciation, and end-of-year parties.",
    image: null,
    imageAlt:
      "Parents and families seated outdoors watching children perform on a stage at a school event",
  },
  {
    slug: "private",
    bookingType: "Private Gathering",
    name: "Private Gatherings",
    blurb: "Backyard parties and anniversaries, at whatever size.",
    image: null,
    imageAlt:
      "Friends around an outdoor table at dusk under string lights, passing a glass of wine",
  },
  {
    slug: "brunches",
    bookingType: "Brunch",
    name: "Brunches",
    blurb: "Late mornings that run long, with coffee to match.",
    image: null,
    imageAlt:
      "A man at a sunlit outdoor table passing a large platter of food across to other guests",
  },
  {
    slug: "weddings",
    bookingType: "Wedding",
    name: "Weddings",
    blurb: "Receptions, rehearsal dinners, and late-night dessert service.",
    image: null,
    imageAlt:
      "A long white reception table set with sage runners, patterned green glassware and a small floral centrepiece",
  },
  {
    slug: "birthdays",
    bookingType: "Birthday",
    name: "Birthdays",
    blurb: "A live griddle beats a sheet cake. We don't make the rules.",
    image: null,
    imageAlt:
      "Friends laughing and raising glasses around a table with a sparkler in a champagne bucket",
  },
  {
    slug: "showers",
    bookingType: "Shower",
    name: "Showers",
    blurb: "Baby and bridal showers, sweet and savory side by side.",
    image: null,
    imageAlt:
      "A family of all ages toasting around a laden table in a leafy back garden strung with lights",
  },
  {
    slug: "graduations",
    bookingType: "Graduation",
    name: "Graduations",
    blurb: "Open houses and grad parties, served as guests arrive.",
    image: null,
    imageAlt:
      "A graduate in cap and gown leaning in for a selfie with two family members outdoors after the ceremony",
  },
  {
    slug: "festivals",
    bookingType: "Festival/Public Event",
    name: "Community Festivals",
    blurb: "Markets, fairs, and public events — the full trailer setup.",
    image: null,
    imageAlt:
      "Bowls of sliced strawberries, raspberries and blackberries lined up on the wooden serving counter of the crêpe stand",
  },
];

/** The three "what we do" cards on Home. */
export const services = [
  {
    name: "Food Trailer",
    blurb: "The full trailer rolls up, plugs in, and serves your line all night.",
    href: "/find-us",
  },
  {
    name: "Private Catering",
    blurb: "Weddings, showers and gatherings, with a menu we build with you.",
    href: "/catering",
  },
  {
    name: "Corporate & Pop-ups",
    blurb: "Client events, team days and brand activations, indoors or out.",
    href: "/catering",
  },
];

/** What every booking includes. Shown on /catering. */
export const included = [
  "Trailer or indoor cart setup",
  "Staffing for the full service window",
  "Serviceware — plates, forks and napkins",
  "Made-to-order crêpes, folded in front of guests",
  "Setup and teardown",
];

/** The four steps on /catering. */
export const howItWorks = [
  { step: "Inquire", blurb: "Send us your date, headcount and location." },
  { step: "Build your menu", blurb: "We put together sweet, savory and drinks to fit the event." },
  { step: "Confirm & deposit", blurb: "We hold your date once the deposit clears." },
  { step: "We roll up and serve", blurb: "We arrive early, set up, serve, and clean up after." },
];

/** Event types offered in the booking form's select. */
export const bookingEventTypes = [
  "Wedding",
  "Corporate",
  "Holiday Party",
  "School Event",
  "Birthday",
  "Brunch",
  "Graduation",
  "Shower",
  "Festival/Public Event",
  "Private Gathering",
  "Other",
] as const;

export type BookingEventType = (typeof bookingEventTypes)[number];

/**
 * Maps a `?event=` query value to a booking option.
 *
 * Accepts an event-card slug (every catering card links with its own), plus a
 * few short aliases that predate the cards — the holiday band has linked to
 * `?event=holiday` since launch and those URLs may be in the wild.
 */
const EVENT_ALIASES: Record<string, BookingEventType> = {
  holiday: "Holiday Party",
  wedding: "Wedding",
  corporate: "Corporate",
};

export function resolveBookingType(param: string | null): BookingEventType | "" {
  if (!param) return "";
  const card = eventTypes.find((type) => type.slug === param);
  if (card) return card.bookingType;
  return EVENT_ALIASES[param] ?? "";
}

/** Service-style checkboxes on the booking form. */
export const serviceStyles = [
  "Sweet crepes",
  "Savory crepes",
  "Kids crepes",
  "Coffee & espresso",
  "Hot chocolate & winter drinks",
  "Full trailer setup",
  "Indoor cart setup",
] as const;
