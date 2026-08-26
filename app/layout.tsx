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
  },
  twitter: { card: "summary_large_image" },
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
