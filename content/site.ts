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

  /** Primary contact address, shown in the footer and used in the JSON-LD. */
  email: "amanda@poppycrepes.com",
  /** Where booking enquiries go. Shown on /book and in the form's fallbacks. */
  cateringEmail: "catering@poppycrepes.com",

  // TODO: real phone number. The legacy site carried this placeholder too.
  phone: "(801) 000-0000",
  phoneHref: "+18010000000",

  /**
   * There is no storefront — the trailer travels — so the business is modelled
   * as a service area rather than an address. `serviceArea` is written to read
   * correctly after "Serving …", "across …" and "throughout …", which is how
   * every page uses it.
   */
  serviceArea: "all of Salt Lake and Utah Counties",
  /** Used for the JSON-LD areaServed. */
  counties: ["Salt Lake County", "Utah County"],
  state: "UT",

  // TODO: response window — prompt left this blank; 24–48 hours assumed.
  responseTime: "24–48 hours",

  social: {
    instagram: "https://www.instagram.com/poppycrepes/", // from legacy site
    facebook: "", // TODO
    tiktok: "", // TODO — legacy site linked the label but had no URL
  },

  /**
   * The booking form posts here.
   *
   * The site is statically hosted on GitHub Pages, so there is no server to
   * receive the form — a form service takes the submission and emails it to
   * you. Default is Web3Forms (free, 250 submissions/month).
   *
   * SETUP: go to https://web3forms.com, enter the address you want inquiries
   * delivered to, and paste the access key it emails you below. That is the
   * whole setup — no account, and the key is safe to commit (it only ever
   * routes mail to the address you verified).
   *
   * To use a different service, change `endpoint` and check what field name it
   * expects for the key. Formspree, Basin and Getform all take a plain POST
   * the same way.
   */
  form: {
    endpoint: "https://api.web3forms.com/submit",
    // TODO: paste your Web3Forms access key here. Until this is set, the form
    // tells visitors to email instead of failing silently.
    accessKey: "",
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
