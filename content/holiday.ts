/**
 * The Holiday & Winter Events band — the visual peak of the site.
 *
 * TO TURN IT OFF: set `enabled: false`. The band disappears from Home and
 * /catering with no other code change.
 *
 * TO SWAP IT FOR A SPRING/SUMMER VARIANT: edit the copy fields below and move
 * `activeFrom` / `activeUntil`. The band renders only when `enabled` is true
 * AND today falls inside that range, so a seasonal variant can be staged ahead
 * of time and will switch itself on.
 */
type Holiday = {
  enabled: boolean;
  activeFrom: string;
  activeUntil: string;
  eyebrow: string;
  headline: string;
  body: string;
  weekendsRemaining: number;
  bookingDeadline: string | null;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

export const holiday: Holiday = {
  enabled: true,

  /** ISO dates. Inclusive start, exclusive end. */
  activeFrom: "2026-08-01",
  activeUntil: "2027-01-05",

  eyebrow: "Now booking · Fall + Winter 2026",

  /*
   * Headline options — pick one and delete the rest:
   *   1. "the season of folding things together"
   *   2. "warm crêpes, cold months"
   *   3. "book the warmest table at your party"
   *   4. "your holiday season, folded to order"
   */
  headline: "warm crêpes, cold months",

  body:
    "Holiday parties, corporate year-end dinners, school events, private gatherings, brunches and winter weddings — we bring the griddle and fold every crêpe in front of your guests. Winter menus come with french hot chocolate on the cart, which is the fastest way we know to make a cold night feel like a good idea.",

  /* [[ CONFIRM SEASONAL MENU ]] — beyond french hot chocolate, no seasonal
     specials have been confirmed. Add them to `body` above once decided. */

  /** Drives the scarcity line. Set to 0 to hide it entirely. */
  weekendsRemaining: 4,

  /** Optional. Set to null to omit the deadline sentence. */
  bookingDeadline: "2026-11-15",

  ctaPrimary: { label: "Reserve Your Date", href: "/book?event=holiday" },
  ctaSecondary: { label: "See catering options", href: "/catering" },
};

/** True when the band should render. Kept here so pages stay declarative. */
export function holidayIsActive(now: Date = new Date()): boolean {
  if (!holiday.enabled) return false;
  const today = now.toISOString().slice(0, 10);
  return today >= holiday.activeFrom && today < holiday.activeUntil;
}
