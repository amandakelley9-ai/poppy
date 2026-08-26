"use client";

import { useEffect, useRef } from "react";

/**
 * Background video for the home hero.
 *
 * The poster paints immediately and is what the browser measures as the LCP
 * element. The 7 MB video is deliberately not attached until after the page
 * has finished loading — fetching it eagerly competes with the poster for
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
 */
export function HeroVideo({ className }: { className?: string }) {
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
        video.src = "/videos/hero.mp4";
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
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster="/images/crepes/hero.jpg"
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
