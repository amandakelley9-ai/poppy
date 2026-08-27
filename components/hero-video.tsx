"use client";

import { useEffect, useRef } from "react";

/**
 * Background video for a page hero.
 *
 * The poster paints immediately and is what the browser measures as the LCP
 * element. The video is deliberately not attached until after the page has
 * finished loading — fetching it eagerly competes with the poster for
 * bandwidth and pushed mobile LCP past 10s.
 *
 * It is also skipped entirely for visitors who have asked for reduced motion
 * or turned on Data Saver. They keep the poster, which is the video's own
 * first frame, so nothing looks missing.
 *
 * The src is assigned straight to the element rather than held in state: this
 * is one-way synchronisation with a media element, and a re-render would buy
 * nothing.
 *
 * Muted + playsInline are what allow autoplay at all; browsers block anything
 * with sound. The file has no audio track regardless.
 *
 * NOTE ON FILENAMES: hero assets are named for what they show, never for the
 * page they sit on. GitHub Pages serves them with `cache-control: max-age=600`
 * and gives us no way to change that, so replacing a file in place leaves
 * visitors on a stale copy for up to ten minutes — which showed up as the old
 * poster flashing before the new video began. Content-based names mean a
 * reassignment changes which page points at which URL, and a URL's bytes never
 * change under it.
 */
export function HeroVideo({
  src,
  poster,
  className,
}: {
  /** Path under /public/videos. */
  src: string;
  /** Should be the video's own first frame, or the hero jumps on play. */
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (reduceMotion || connection?.saveData === true) return;


    let idleHandle: number | undefined;

    const start = () => {
      // Yield once more so the browser has settled before a large fetch.
      idleHandle = window.setTimeout(() => {
        video.src = src;
        // Autoplay can still be refused — low power mode, for one. The poster
        // stays up if it is, so a rejected promise needs nothing but silence.
        video.play().catch(() => {});
      }, 200);
    };

    if (document.readyState === "complete") {
      start();
      return () => window.clearTimeout(idleHandle);
    }

    window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(idleHandle);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
