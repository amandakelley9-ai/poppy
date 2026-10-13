import { site } from "@/content/site";
import { signatureCrepes, kidsCrepes, drinks } from "@/content/menu";
import { homeBase, weeklySchedule } from "@/content/schedule";

/**
 * LocalBusiness + FoodEstablishment JSON-LD.
 *
 * Local search does most of the work for a food trailer, so this is populated
 * properly rather than left as boilerplate. The business has no fixed
 * storefront, so it is modeled as a service-area business: `areaServed` names
 * the counties, and `address` carries only region and country. Google treats
 * addressLocality as optional in exactly this case, and inventing one would be
 * worse than omitting it.
 *
 * No `telephone` is published: the business takes enquiries by email only, and
 * a placeholder number in structured data is worse for local search than an
 * absent field. Add it here if that ever changes.
 *
 * `openingHoursSpecification` is generated from the standing weekly schedule,
 * so it cannot drift from what /find-us shows. One-off dates are deliberately
 * not included — Google reads this as the recurring pattern.
 */

/** Schema.org wants full day names; the schedule stores JS getDay() numbers. */
const SCHEMA_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** "11:00am" / "6:00pm" -> "11:00" / "18:00", which is what schema.org wants. */
function to24h(time: string): string {
  const m = /^(\d{1,2}):(\d{2})(am|pm)$/.exec(time.trim().toLowerCase());
  if (!m) return time;
  const [, h, min, suffix] = m;
  let hour = Number(h) % 12;
  if (suffix === "pm") hour += 12;
  return `${String(hour).padStart(2, "0")}:${min}`;
}
export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["FoodEstablishment", "LocalBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.positioning,
    url: site.url,
    email: site.email,
    servesCuisine: ["Crêperie", "French", "Café"],
    priceRange: "$$",
    image: `${site.url}/og-image.png`,

    /*
     * Given as an ImageObject rather than a bare URL. Google parses either,
     * but the explicit dimensions remove any guesswork about which asset is
     * the logo — which matters when an old one is still cached.
     */
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/images/logo/logo-primary.png`,
      width: 412,
      height: 414,
      caption: `${site.name} — ${site.descriptor}`,
    },
    slogan: site.tagline,

    // Service-area business: no street address, no locality.
    address: {
      "@type": "PostalAddress",
      addressRegion: site.state,
      addressCountry: "US",
    },

    /*
     * The standing hours at the home base. Built from `weeklySchedule` so that
     * dropping or adding a day on /find-us updates this in the same edit.
     */
    openingHoursSpecification: weeklySchedule.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${SCHEMA_DAYS[slot.weekday]}`,
      opens: to24h(slot.startTime),
      closes: to24h(slot.endTime),
    })),

    /* Where those hours apply. Named separately from `address` because the
       business itself has no storefront — this is a place it parks. */
    location: {
      "@type": "Place",
      name: homeBase.venue,
      address: {
        "@type": "PostalAddress",
        streetAddress: homeBase.address,
        addressLocality: "Draper",
        addressRegion: site.state,
        postalCode: "84020",
        addressCountry: "US",
      },
    },

    areaServed: site.counties.map((county) => ({
      "@type": "AdministrativeArea",
      name: county,
      containedInPlace: {
        "@type": "State",
        name: "Utah",
      },
    })),

    sameAs: [site.social.instagram, site.social.facebook, site.social.tiktok].filter(Boolean),

    hasMenu: {
      "@type": "Menu",
      url: `${site.url}/menu`,
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Signature Crêpes",
          hasMenuItem: signatureCrepes.map((item) => ({
            "@type": "MenuItem",
            name: item.name,
            description: item.description,
          })),
        },
        {
          "@type": "MenuSection",
          name: "Kids",
          hasMenuItem: kidsCrepes.map((item) => ({
            "@type": "MenuItem",
            name: item.name,
            description: item.description,
          })),
        },
        {
          "@type": "MenuSection",
          name: "Coffee & Drinks",
          hasMenuItem: drinks.map((drink) => ({ "@type": "MenuItem", name: drink.name })),
        },
      ],
    },

    makesOffer: {
      "@type": "Offer",
      name: "Event catering",
      description: "Live crêpe station catering for weddings, corporate and private events.",
      url: `${site.url}/catering`,
    },

    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${site.url}/book`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "Reservation", name: "Event booking inquiry" },
    },
  };

  return (
    <script
      type="application/ld+json"
      // The object is built here from local data, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
