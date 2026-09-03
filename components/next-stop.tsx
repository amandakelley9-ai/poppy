import { CalendarDays, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { nextEntry, directionsHref, type ScheduleEntry } from "@/content/schedule";

/**
 * "Next stop" panel — the soonest date the trailer is out.
 *
 * Dates are resolved at build time (the site is a static export), so the
 * deploy workflow rebuilds daily to keep this honest. If the schedule ever
 * empties, the panel renders nothing rather than an empty shell.
 */
function dayLabel(iso: string, today: string, tomorrow: string): string {
  if (iso === today) return "Today";
  if (iso === tomorrow) return "Tomorrow";
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "long" });
}

function dateLabel(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export function NextStop({ entry: given }: { entry?: ScheduleEntry | null }) {
  const now = new Date();
  const entry = given ?? nextEntry(now);
  if (!entry) return null;

  const pad = (n: number) => String(n).padStart(2, "0");
  const isoOf = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const today = isoOf(now);
  const t = new Date(now);
  t.setDate(t.getDate() + 1);

  return (
    <div className="rounded-[10px] border border-cream/25 bg-burgundy/40 p-5 backdrop-blur-sm sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">Next stop</p>

      <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-2xl font-medium sm:text-3xl">
          {dayLabel(entry.date, today, isoOf(t))}
        </span>
        <span className="inline-flex items-center gap-2 text-lg text-cream/80">
          <CalendarDays size={17} aria-hidden />
          {dateLabel(entry.date)}
        </span>
      </p>

      <p className="mt-3 inline-flex items-center gap-2 text-base font-medium sm:text-lg">
        <Clock size={17} className="shrink-0 text-gold" aria-hidden />
        {entry.startTime} – {entry.endTime}
      </p>

      <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-cream/80 sm:text-base">
        <MapPin size={17} className="mt-1 shrink-0 text-gold" aria-hidden />
        <span>
          <span className="font-medium text-cream">{entry.venue}</span>
          <br />
          {entry.address}, {entry.city}
        </span>
      </p>

      {entry.note && <p className="mt-3 text-sm text-cream/70">{entry.note}</p>}

      <a
        href={directionsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-cream underline decoration-gold decoration-2 underline-offset-[6px] transition-colors hover:text-gold"
      >
        Get directions
        <ArrowUpRight size={16} aria-hidden />
      </a>
    </div>
  );
}
