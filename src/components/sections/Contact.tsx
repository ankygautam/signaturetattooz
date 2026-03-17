import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <SectionHeader
            eyebrow="Contact"
            title="Book a session or start with a consultation."
            description="Use the form to share your idea, placement, budget, and references. This layout is ready for your real booking workflow whenever you want to connect it."
          />

          <div className="grid gap-4">
            {[
              { icon: MapPin, label: "Studio location", value: "Hoshiarpur (PB)" },
              { icon: Mail, label: "Email", value: "hello@signaturetattooz.com" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
            ].map((item) => (
              <div key={item.label} className="panel flex items-start gap-4 p-5">
                <item.icon className="mt-1 h-5 w-5 text-accentMuted" />
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted">{item.label}</p>
                  <p className="mt-2 text-sm text-bone">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/signaturetattooz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-accentMuted hover:text-bone"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/nitinsignaturetattooz/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-accentMuted hover:text-bone"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@signaturetattooz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-accentMuted hover:text-bone"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <form className="panel grid gap-4 p-6 md:grid-cols-2">
          <input className="input-shell" placeholder="Name" />
          <input className="input-shell" placeholder="Email" type="email" />
          <input className="input-shell" placeholder="Phone" />
          <input className="input-shell" placeholder="Placement" />
          <input className="input-shell" placeholder="Tattoo Idea" />
          <input className="input-shell" placeholder="Budget" />
          <textarea
            className="input-shell min-h-[9rem] md:col-span-2"
            placeholder="Message"
          />
          <div className="md:col-span-2">
            <Button type="submit" size="lg">
              Send Inquiry
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
