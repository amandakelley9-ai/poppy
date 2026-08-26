import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "./social-icons";
import { Container } from "./ui";
import { site } from "@/content/site";

const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/find-us", label: "Find Us" },
  { href: "/about", label: "About" },
  { href: "/book", label: "Book an Event" },
];

export function Footer() {
  const socials = [
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.tiktok, label: "TikTok", Icon: TikTokIcon },
  ].filter((s) => s.href);

  return (
    <footer className="on-burgundy bg-burgundy text-cream">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo/logo-horizontal-cream.png"
              alt="Poppy Crêpes"
              width={220}
              height={84}
              className="h-11 w-auto"
            />
            <p className="mt-5 text-lg text-cream/90">{site.tagline}</p>
            <p className="mt-2 text-sm text-cream/70">
              Serving {site.serviceArea}.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Explore
            </h2>
            <ul className="mt-3 space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-cream/85 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">
              Get in touch
            </h2>
            <ul className="mt-3 space-y-1 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-[44px] items-center gap-2 text-cream/85 transition-colors hover:text-cream"
                >
                  <Mail size={16} aria-hidden />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="inline-flex min-h-[44px] items-center gap-2 text-cream/85 transition-colors hover:text-cream"
                >
                  <Phone size={16} aria-hidden />
                  {site.phone}
                </a>
              </li>
            </ul>

            {socials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Poppy Crêpes on ${label}`}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-cream hover:bg-cream hover:text-burgundy"
                    >
                      <Icon size={18} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-14 border-t border-cream/20 pt-6 text-xs text-cream/60">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.descriptor}
          </p>
        </div>
      </Container>
    </footer>
  );
}
