import Link from "next/link";
import type { ReactNode } from "react";

/** Content column. ~1200px, with the page's standard gutters. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

/**
 * The standard section-heading treatment, lifted from the menu board's
 * `— SIGNATURE CRÊPES —`: small all-caps gold label between two gold hairlines.
 *
 * Gold fails contrast on cream at body sizes, so this is deliberately never
 * used for anything but this short label.
 */
export function Eyebrow({
  children,
  align = "center",
  surface = "cream",
}: {
  children: ReactNode;
  align?: "center" | "left";
  /**
   * Which background this sits on. It picks the gold that actually passes
   * contrast there — #c9a06a is 5.03:1 on burgundy but only 2.28:1 on cream,
   * so cream needs the darker `gold-ink`. Keyed on the surface rather than a
   * colour name so it can't be set to the failing combination by accident.
   */
  surface?: "cream" | "burgundy";
}) {
  const onCream = surface === "cream";
  const color = onCream ? "text-gold-ink" : "text-gold";
  const rule = onCream ? "bg-gold/60" : "bg-cream/40";
  return (
    <div
      className={`flex items-center gap-4 ${align === "center" ? "justify-center" : "justify-start"}`}
    >
      {align === "center" && <span aria-hidden className={`h-px w-8 sm:w-14 ${rule}`} />}
      <span
        className={`text-[0.7rem] font-semibold uppercase tracking-[0.15em] sm:text-xs ${color}`}
      >
        {children}
      </span>
      <span aria-hidden className={`h-px w-8 sm:w-14 ${rule}`} />
    </div>
  );
}

/** Section shell: vertical rhythm, optional cream-deep band. */
export function Section({
  children,
  band = false,
  className = "",
  id,
}: {
  children: ReactNode;
  band?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-20 sm:py-24 lg:py-32 ${band ? "bg-cream-deep" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "poppy" | "burgundy-outline" | "cream" | "cream-outline";
  className?: string;
};

const buttonVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  poppy: "bg-poppy text-cream hover:bg-burgundy",
  "burgundy-outline":
    "border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-cream",
  cream: "bg-cream text-burgundy hover:bg-cream-deep",
  "cream-outline": "border-2 border-cream/70 text-cream hover:bg-cream hover:text-burgundy",
};

/** Min height keeps every tap target at or above 44px. */
export function Button({ href, children, variant = "poppy", className = "" }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-[10px] px-6 py-3 text-sm font-semibold transition-colors duration-200 sm:text-base ${buttonVariants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Standard heading block: eyebrow, h2, optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  surface = "cream",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  align?: "center" | "left";
  surface?: "cream" | "burgundy";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <Eyebrow align={align} surface={surface}>
        {eyebrow}
      </Eyebrow>
      <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {lede && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            surface === "burgundy" ? "text-cream/85" : "text-ink/75"
          } ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
