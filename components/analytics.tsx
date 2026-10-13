import Script from "next/script";
import { site } from "@/content/site";

/**
 * Google Analytics 4, loaded through `next/script`.
 *
 * Google's copy-paste snippet goes in `<head>`; this uses the default
 * `afterInteractive` strategy instead, which injects the same two scripts
 * after hydration. Analytics has nothing to do before first paint, and the
 * site is a static export on GitHub Pages — holding up paint for a tag
 * manager request would cost real LCP for no measurement benefit.
 *
 * Client-side nav: `next/link` moves between pages with pushState rather than
 * a document load, so gtag's own page_view fires only once. GA4's enhanced
 * measurement covers the rest via its browser-history trigger, which is on by
 * default — if that is ever switched off in the property, route changes need a
 * manual `page_view` here.
 *
 * Inline scripts need an `id` for Next to track them.
 */
export function Analytics() {
  const id = site.analytics.gaMeasurementId;
  if (!id) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <Script id="gtag-init">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
