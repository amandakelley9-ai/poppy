/**
 * Where the trailer will be. Powers /find-us and the Home teaser.
 *
 * Past dates fall off automatically — no need to prune the list by hand.
 * TODO: every entry below is a placeholder. Replace with real dates.
 */
export type ScheduleEntry = {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
  city: string;
  /** Optional link — event page, map, or ticket link. */
  href?: string;
  note?: string;
};

export const upcoming: ScheduleEntry[] = [
  {
    date: "2026-09-05",
    startTime: "9:00am",
    endTime: "1:00pm",
    venue: "[[ FARMERS MARKET ]]",
    address: "[[ STREET ADDRESS ]]",
    city: "Alpine, UT",
    note: "Weekly through October",
  },
  {
    date: "2026-09-12",
    startTime: "5:00pm",
    endTime: "9:00pm",
    venue: "[[ EVENING MARKET / FESTIVAL ]]",
    address: "[[ STREET ADDRESS ]]",
    city: "[[ CITY ]], UT",
  },
  {
    date: "2026-09-20",
    startTime: "10:00am",
    endTime: "2:00pm",
    venue: "[[ POP-UP LOCATION ]]",
    address: "[[ STREET ADDRESS ]]",
    city: "[[ CITY ]], UT",
  },
];

/** Places the trailer parks regularly, described rather than dated. */
export const regularSpots: { name: string; when: string; where: string }[] = [
  {
    name: "[[ SATURDAY MARKET ]]",
    when: "Saturdays, 9am–1pm",
    where: "[[ ADDRESS OR CROSS STREETS ]]",
  },
  {
    name: "[[ WEEKDAY LUNCH STOP ]]",
    when: "[[ DAYS AND HOURS ]]",
    where: "[[ ADDRESS OR CROSS STREETS ]]",
  },
];

/**
 * A fixed location, if one applies. Set to null while the business is
 * trailer-only — /find-us then skips the map block entirely.
 */
export const fixedLocation: {
  name: string;
  address: string;
  mapEmbedSrc: string;
  directionsHref: string;
} | null = null;

/** Entries still in the future, soonest first. */
export function futureEntries(now: Date = new Date()): ScheduleEntry[] {
  const today = now.toISOString().slice(0, 10);
  return upcoming
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}
