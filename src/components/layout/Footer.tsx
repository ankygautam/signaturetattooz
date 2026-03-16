import { Facebook, Instagram, MapPin } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-black/60 py-12">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <p className="font-display text-4xl leading-none text-bone">Signature Tattooz</p>
          <p className="max-w-md text-sm leading-7 text-muted">
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
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-accentMuted" />
              Hoshiarpur (PB)
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/signaturetattooz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-accentMuted hover:text-bone"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/signaturetattooz"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-accentMuted hover:text-bone"
              >
                <Facebook className="h-4 w-4" />
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
