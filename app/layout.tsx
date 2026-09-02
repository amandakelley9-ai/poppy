import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { StructuredData } from "@/components/structured-data";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Poppins, chosen over Jost as the match for the wordmark: the logo has
 * true-circle bowls, a very large x-height, flat vertical-cut terminals and a
 * straight-descender `y`. Poppins matches all four. Jost is a Futura
 * derivative — narrower, smaller x-height, angled `y` descender.
 *
 * Self-hosted and subset by next/font, so there is no network request to
 * Google and no layout shift.
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

/*
 * The share card is a static asset, not an `opengraph-image` route.
 *
 * Next's file convention emits the card at `/opengraph-image` with no file
 * extension. GitHub Pages types extensionless files as
 * application/octet-stream, and the Facebook/X/LinkedIn scrapers reject
 * anything that is not an image content type — so the card silently failed to
 * render even though the bytes were a valid PNG.
 *
 * public/og-image.png serves as image/png. To change the card, edit that file;
 * it is the cream mark centred on the burgundy field, 1200x630.
 */
const shareAlt = `${site.name} — ${site.descriptor}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.descriptor}`,
    template: `%s — ${site.name}`,
  },
  description: site.positioning,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: site.url,
    title: `${site.name} — ${site.descriptor}`,
    description: site.positioning,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: shareAlt }],
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: shareAlt }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
        // The inline script below strips `no-js` before React hydrates, so the
    // server and client markup differ on this one attribute by design.
    <html lang="en" className={`no-js ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/*
          Runs before first paint. If scripting is off this never executes, the
          `no-js` class stays, and every .reveal element renders visible instead
          of being stranded at opacity 0 waiting for an observer that will
          never run.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[10px] focus:bg-poppy focus:px-4 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}
