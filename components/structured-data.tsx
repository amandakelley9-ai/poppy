import { site } from "@/content/site";
import { signatureCrepes, kidsCrepes, drinks } from "@/content/menu";

/**
 * LocalBusiness + FoodEstablishment JSON-LD.
 *
 * Local search does most of the work for a food trailer, so this is populated
 * properly rather than left as boilerplate. The business has no fixed
 * storefront, so it is modeled as an establishment with an `areaServed` and no
 * street address — `address` carries only the locality, which is what Google
 * expects for a service-area business.
 *
 * TODO before launch: real phone number, confirmed service radius, and
 * `openingHoursSpecification` if the trailer keeps regular public hours.
 */
export function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["FoodEstablishment", "LocalBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.positioning,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    servesCuisine: ["Crêperie", "French", "Café"],
    priceRange: "$$",
    image: `${site.url}/opengraph-image.png`,
    logo: `${site.url}/images/logo/logo-horizontal.png`,
    slogan: site.tagline,

    // Service-area business: locality only, no street address.
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "US",
    },

    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        // TODO: replace with the real home-base coordinates.
        latitude: 40.4527,
        longitude: -111.7777,
      },
      geoRadius: site.serviceRadiusMiles * 1609,
      description: site.serviceArea,
    },

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
