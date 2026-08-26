/** Event types shown as the grid on /catering, and as the "what we do" cards. */
export type EventType = {
  slug: string;
  name: string;
  blurb: string;
  /** Path under /public/images/events, or null for a labeled placeholder. */
  image: string | null;
};

export const eventTypes: EventType[] = [
  { slug: "holiday-parties", name: "Holiday Parties", blurb: "Company parties, family gatherings, and everything December throws at you.", image: null },
  { slug: "corporate", name: "Corporate Events", blurb: "Client days, team lunches, and year-end celebrations.", image: null },
  { slug: "school", name: "School Events", blurb: "Fundraisers, teacher appreciation, and end-of-year parties.", image: null },
  { slug: "private", name: "Private Gatherings", blurb: "Backyard parties and anniversaries, at whatever size.", image: null },
  { slug: "brunches", name: "Brunches", blurb: "Late mornings that run long, with coffee to match.", image: null },
  { slug: "weddings", name: "Weddings", blurb: "Receptions, rehearsal dinners, and late-night dessert service.", image: null },
  { slug: "birthdays", name: "Birthdays", blurb: "A live griddle beats a sheet cake. We don't make the rules.", image: null },
  { slug: "showers", name: "Showers", blurb: "Baby and bridal showers, sweet and savory side by side.", image: null },
  { slug: "graduations", name: "Graduations", blurb: "Open houses and grad parties, served as guests arrive.", image: null },
  { slug: "festivals", name: "Community Festivals", blurb: "Markets, fairs, and public events — the full trailer setup.", image: null },
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
