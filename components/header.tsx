"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "./ui";
import { Logo } from "./logo";

const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/find-us", label: "Find Us" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock scroll behind the open panel.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-cream/90 backdrop-blur-md">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex min-h-[44px] shrink-0 items-center"
            aria-label="Poppy Crêpes — Crêperie & Café, home"
          >
            <Logo className="h-7 text-[0.95rem] sm:h-8 sm:text-base" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex min-h-[44px] items-center text-sm font-medium transition-colors hover:text-poppy ${
                        active ? "text-poppy" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/book"
              className="inline-flex min-h-[44px] items-center rounded-[10px] bg-poppy px-4 text-sm font-semibold text-cream transition-colors hover:bg-poppy-hover sm:px-5"
            >
              <span className="hidden sm:inline">Book an Event</span>
              <span className="sm:hidden">Book</span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-[10px] border border-hairline text-ink lg:hidden"
            >
              {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-hairline bg-cream lg:hidden"
        >
          <Container>
            <ul className="flex flex-col py-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex min-h-[52px] items-center border-b border-hairline/60 text-lg font-medium last:border-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      )}
    </header>
  );
}
