import { Facebook, Instagram, MapPin, Youtube } from "lucide-react";

type FooterPage = "home" | "school";

const studioLocation =
  "The Mall Road, opposite LIC office, Ish Nagar, Fatehgarh, Hoshiarpur, Punjab";
const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=The+Mall+Road,+opposite+LIC+office,+Ish+Nagar,+Fatehgarh,+Hoshiarpur,+Punjab";

const getLinks = (page: FooterPage) => [
  { label: "Home", href: page === "home" ? "#home" : "./#home" },
  { label: "About", href: page === "home" ? "#about" : "./#about" },
  { label: "Services", href: page === "home" ? "#services" : "./#services" },
  { label: "Gallery", href: page === "home" ? "#gallery" : "./#gallery" },
  { label: "School", href: page === "home" ? "./school.html" : "#tattoo-school" },
  { label: "Contact", href: page === "home" ? "#contact" : "./#contact" },
];

export function Footer({ page = "home" }: { page?: FooterPage }) {
  const links = getLinks(page);

  return (
    <footer className="border-t border-white/8 bg-background py-14">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.8fr]">
        <div className="space-y-4">
          <p className="font-display text-5xl uppercase leading-none tracking-[0.06em] text-bone sm:text-6xl">
            Signature Tattooz
          </p>
          <p className="section-copy max-w-md text-sm">
            Custom tattoos with story, detail, and soul. Signature Tattooz is built around
            original artwork, comfort, privacy, and a safe studio standard in Hoshiarpur.
          </p>
        </div>

        <div className="space-y-4">
          <p className="eyebrow">Quick links</p>
          <div className="flex flex-col gap-3 text-sm text-muted">
            {links.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-bone">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="eyebrow">Connect</p>
          <div className="space-y-3 text-sm text-muted">
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 transition hover:text-bone"
            >
              <MapPin className="h-4 w-4 text-accentMuted" />
              <span>{studioLocation}</span>
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/signaturetattooz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-accentMuted hover:text-bone"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/nitinsignaturetattooz/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-accentMuted hover:text-bone"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@signaturetattooz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-accentMuted hover:text-bone"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell mt-10 flex flex-col gap-2 border-t border-white/8 pt-6 text-xs uppercase tracking-[0.22em] text-muted md:flex-row md:items-center md:justify-between">
        <p>signaturetattooz.com</p>
        <p>© 2026 Signature Tattooz. All rights reserved.</p>
      </div>
    </footer>
  );
}
