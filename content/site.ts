/**
 * Single source of truth for business details, contact info and social links.
 *
 * Values marked TODO are placeholders the prompt left blank. Where the retired
 * static site (see legacy/index.html) already carried a real value, that value
 * is used and noted.
 */
export const site = {
  name: "Poppy Crêpes",
  descriptor: "Crêperie & Café",
  tagline: "Made fresh. Made beautiful.",

  // TODO: confirm — the prompt left the positioning statement blank.
  positioning:
    "A mobile crêperie folding sweet and savory crêpes to order, wherever your event is.",

  url: "https://poppycrepes.com",

  // From legacy/index.html.
  email: "hello@poppycrepes.com",
  cateringEmail: "catering@poppycrepes.com",

  // TODO: real phone number. The legacy site carried this placeholder too.
  phone: "(801) 000-0000",
  phoneHref: "+18010000000",

  // TODO: confirm service area. Legacy site placed the business in Alpine, Utah
  // and said "service area limited — ask when you enquire".
  city: "Alpine",
  state: "UT",
  serviceArea: "Alpine, Utah and the surrounding Wasatch Front",
  serviceRadiusMiles: 40, // TODO: confirm

  // TODO: response window — prompt left this blank; 24–48 hours assumed.
  responseTime: "24–48 hours",

  social: {
    instagram: "https://www.instagram.com/poppycrepes/", // from legacy site
    facebook: "", // TODO
    tiktok: "", // TODO — legacy site linked the label but had no URL
  },

  /**
   * Shown on /catering as the pricing signal. The legacy site published real
   * per-guest package pricing ($14 / $17 / $28, 25-guest minimum, $500 event
   * minimum) — those numbers are carried here but should be re-confirmed
   * against current trailer pricing before launch.
   */
  pricing: {
    startingAt: "$14 per guest", // TODO: confirm for trailer service
    guestMinimum: 25,
    eventMinimum: "$500",
  },
} as const;
