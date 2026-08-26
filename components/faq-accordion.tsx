"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/content/faq";

/**
 * Native <details>/<summary> would be simpler, but the animated icon and the
 * single-open behavior read better here — and the semantics are preserved with
 * a button + region pair.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-hairline border-y border-hairline">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <li key={faq.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-button-${i}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg font-medium transition-colors hover:text-poppy"
              >
                {faq.q}
                {isOpen ? (
                  <Minus size={20} className="shrink-0 text-poppy" aria-hidden />
                ) : (
                  <Plus size={20} className="shrink-0 text-poppy" aria-hidden />
                )}
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-button-${i}`}
              hidden={!isOpen}
              className="pb-6 pr-10 leading-relaxed text-ink/75"
            >
              {faq.a}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
