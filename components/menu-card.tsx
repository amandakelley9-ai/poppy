import Image from "next/image";
import type { MenuItem } from "@/content/menu";

/**
 * One menu item, photo-forward. `size="hero"` is the larger treatment used for
 * the poppy crêpe in the Home preview.
 */
export function MenuCard({ item, size = "default" }: { item: MenuItem; size?: "default" | "hero" }) {
  const src = item.image ?? `/images/crepes/${item.slug}.jpg`;
  const hero = size === "hero";

  return (
    <article
      className={`group overflow-hidden rounded-[10px] bg-cream-deep ${hero ? "sm:col-span-2 sm:grid sm:grid-cols-2 sm:items-center" : ""}`}
    >
      <div className={`relative ${hero ? "aspect-[4/3] sm:h-full sm:min-h-[340px]" : "aspect-[4/3]"}`}>
        <Image
          src={src}
          alt={item.imageAlt}
          fill
          sizes={hero ? "(max-width: 640px) 100vw, 600px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"}
          style={item.focal ? { objectPosition: item.focal } : undefined}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className={hero ? "p-7 sm:p-10" : "p-6"}>
        {hero && (
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-gold-ink">
            The one we&apos;re named for
          </p>
        )}
        <div className="flex items-baseline justify-between gap-4">
          <h3 className={hero ? "text-3xl sm:text-4xl" : "text-2xl"}>{item.name}</h3>
          <span className="shrink-0 text-sm font-semibold text-ink/70">{item.price}</span>
        </div>
        <p className={`mt-3 leading-relaxed text-ink/75 ${hero ? "text-base sm:text-lg" : "text-sm"}`}>
          {item.description}
        </p>
      </div>
    </article>
  );
}
