import { site } from "@/content/site";
import { signatureCrepes, kidsCrepes, drinks } from "@/content/menu";

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
 * No `telephone` is published: there is no real number yet, and a placeholder
 * in structured data is worse for local search than omitting the field. Add it
 * here once a number exists.
 *
 * TODO before launch: `openingHoursSpecification` if the trailer keeps regular
 * public hours.
 */
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
