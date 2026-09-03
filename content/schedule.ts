/**
 * Where the trailer will be. Powers /find-us and the Home hero.
 *
 * The trailer now has a home base — La Petite Maison in Draper — with a
 * standing Thursday/Friday/Saturday schedule. Rather than hand-listing dozens
 * of dates, the weekly pattern below is expanded on demand and past dates fall
 * off automatically.
 *
 * TO CHANGE THE HOURS: edit `weeklySchedule`.
 * TO ADD A ONE-OFF (different hours, or a different venue): add to
 * `specialDates` — a special date replaces the weekly entry for that day.
 * TO END THE WEEKLY SCHEDULE: set `recurringUntil` to the last date.
 *
 * NOTE ON STALENESS: the site is a static export, so `new Date()` here is the
 * *build* time, not the visitor's. The deploy workflow rebuilds daily so the
 * "next stop" never drifts more than a day behind.
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

/** The home base. */
export const homeBase = {
  venue: "La Petite Maison",
  address: "915 E 12600 S",
  city: "Draper, UT 84020",
} as const;

/** Google Maps links built from the address — no API key needed. */
const mapQuery = encodeURIComponent(
  `${homeBase.venue}, ${homeBase.address}, ${homeBase.city}`,
);
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

/**
 * One-off dates. These override the weekly pattern for the same day, so a
 * special date with different hours wins.
 */
export const specialDates: ScheduleEntry[] = [
  {
    date: "2026-09-26",
    startTime: "11:00am",
    endTime: "7:00pm",
    ...homeBase,
    note: "Opening day — we're staying open late",
  },
];

/** Standing weekly schedule. `weekday` is JS getDay(): 0 = Sunday. */
export const weeklySchedule: {
  weekday: number;
  label: string;
  startTime: string;
  endTime: string;
}[] = [
  { weekday: 4, label: "Thursday", startTime: "1:00pm", endTime: "6:00pm" },
  { weekday: 5, label: "Friday", startTime: "1:00pm", endTime: "6:00pm" },
  { weekday: 6, label: "Saturday", startTime: "11:00am", endTime: "6:00pm" },
];

/** The weekly pattern starts the day after opening day. */
export const recurringFrom = "2026-09-27";

/**
 * Last date the weekly pattern runs, or null for open-ended. Set this once a
 * season end is decided.
 */
export const recurringUntil: string | null = null;

/** How far ahead the weekly pattern is expanded, in weeks. */
const HORIZON_WEEKS = 12;

/** YYYY-MM-DD for a Date, in local terms — no UTC shift. */
function iso(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

/** Midday avoids a DST edge shifting the date across a boundary. */
function fromIso(s: string): Date {
  return new Date(`${s}T12:00:00`);
}

/** Expand the weekly pattern into concrete entries across the horizon. */
function expandWeekly(now: Date): ScheduleEntry[] {
  const byWeekday = new Map(weeklySchedule.map((w) => [w.weekday, w]));
  const today = iso(now);
  const start = fromIso(today > recurringFrom ? today : recurringFrom);
  const end = new Date(start);
  end.setDate(end.getDate() + HORIZON_WEEKS * 7);

  const out: ScheduleEntry[] = [];
  for (const cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
    const day = iso(cursor);
    if (recurringUntil && day > recurringUntil) break;
    const slot = byWeekday.get(cursor.getDay());
    if (!slot) continue;
    out.push({
      date: day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      ...homeBase,
    });
  }
  return out;
}

/** Entries still in the future, soonest first. Specials override the pattern. */
export function futureEntries(now: Date = new Date()): ScheduleEntry[] {
  const today = iso(now);
  const byDate = new Map<string, ScheduleEntry>();

  for (const e of expandWeekly(now)) byDate.set(e.date, e);
  // Specials go in last so they replace a generated entry on the same day.
  for (const e of specialDates) byDate.set(e.date, e);

  return [...byDate.values()]
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** The very next date the trailer is out, or null if nothing is scheduled. */
export function nextEntry(now: Date = new Date()): ScheduleEntry | null {
  return futureEntries(now)[0] ?? null;
}

/** Places the trailer parks regularly, described rather than dated. */
export const regularSpots: { name: string; when: string; where: string }[] = [
  {
    name: homeBase.venue,
    when: "Thursdays & Fridays, 1–6pm · Saturdays, 11am–6pm",
    where: `${homeBase.address}, ${homeBase.city}`,
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
} | null = {
  name: homeBase.venue,
  address: `${homeBase.address}, ${homeBase.city}`,
  // Keyless embed form — works without a Google Maps API key.
  mapEmbedSrc: `https://www.google.com/maps?q=${mapQuery}&output=embed`,
  directionsHref,
};
