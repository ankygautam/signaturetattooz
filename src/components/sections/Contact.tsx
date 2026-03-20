import { FormEvent, useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { submitPublicInquiry } from "@/firebase/submissions";

const studioLocation =
  "The Mall Road, opposite LIC office, Ish Nagar, Fatehgarh, Hoshiarpur, Punjab";
const mapsLink =
  "https://www.google.com/maps/search/?api=1&query=The+Mall+Road,+opposite+LIC+office,+Ish+Nagar,+Fatehgarh,+Hoshiarpur,+Punjab";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    placement: "",
    tattooIdea: "",
    budget: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      await submitPublicInquiry({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        placement: form.placement.trim(),
        tattooIdea: form.tattooIdea.trim(),
        budget: form.budget.trim(),
        message: form.message.trim(),
      });

      setSuccess("Your inquiry has been sent to Signature Tattooz. We will reach out soon.");
      setForm({
        name: "",
        email: "",
        phone: "",
        placement: "",
        tattooIdea: "",
        budget: "",
        message: "",
      });
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong while sending your inquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-surface surface-porcelain relative py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <SectionHeader
            eyebrow="Contact"
            title="Book a session or start with a consultation."
            description="Use the form to share your idea, placement, budget, and references. Your inquiry now goes straight into the Signature Tattooz studio dashboard for booking and follow-up."
          />

          <div className="grid gap-4">
            {[
              { icon: MapPin, label: "Studio location", value: studioLocation, href: mapsLink },
              { icon: Mail, label: "Email", value: "signaturetattooz@gmail.com", href: "mailto:signaturetattooz@gmail.com" },
              { icon: Phone, label: "Phone", value: "+91 98782 28917", href: "tel:+919878228917" },
            ].map((item) => (
              <div key={item.label} className="panel flex items-start gap-4 p-5">
                <item.icon className="mt-1 h-5 w-5 text-accentMuted" />
                <div>
                  <p className="meta-label">{item.label}</p>
                  <a
                    href={item.href}
                    target={item.label === "Studio location" ? "_blank" : undefined}
                    rel={item.label === "Studio location" ? "noreferrer" : undefined}
                    className="theme-light-link mt-2 block text-sm leading-7 transition"
                  >
                    {item.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/signaturetattooz"
              target="_blank"
              rel="noreferrer"
              className="theme-icon-link inline-flex h-11 w-11 items-center justify-center rounded-full border transition"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/nitinsignaturetattooz/"
              target="_blank"
              rel="noreferrer"
              className="theme-icon-link inline-flex h-11 w-11 items-center justify-center rounded-full border transition"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@signaturetattooz"
              target="_blank"
              rel="noreferrer"
              className="theme-icon-link inline-flex h-11 w-11 items-center justify-center rounded-full border transition"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <form className="panel grid gap-4 p-6 md:grid-cols-2" onSubmit={(event) => void handleSubmit(event)}>
          <input
            className="input-shell"
            placeholder="Name"
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            required
          />
          <input
            className="input-shell"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            required
          />
          <input
            className="input-shell"
            placeholder="Phone"
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            required
          />
          <input
            className="input-shell"
            placeholder="Placement"
            value={form.placement}
            onChange={(event) => setForm((current) => ({ ...current, placement: event.target.value }))}
            required
          />
          <input
            className="input-shell"
            placeholder="Tattoo Idea"
            value={form.tattooIdea}
            onChange={(event) => setForm((current) => ({ ...current, tattooIdea: event.target.value }))}
            required
          />
          <input
            className="input-shell"
            placeholder="Budget"
            value={form.budget}
            onChange={(event) => setForm((current) => ({ ...current, budget: event.target.value }))}
          />
          <textarea
            className="input-shell min-h-[9rem] md:col-span-2"
            placeholder="Message"
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
          />
          {error ? (
            <div className="md:col-span-2 rounded-[1.25rem] border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-bone/90">
              {error}
            </div>
          ) : null}
          {success ? (
            <div className="md:col-span-2 rounded-[1.25rem] border border-accentMuted/30 bg-accentMuted/10 px-4 py-3 text-sm text-bone/90">
              {success}
            </div>
          ) : null}
          <div className="md:col-span-2">
            <Button type="submit" size="lg" className="min-w-[13rem]" disabled={submitting}>
              {submitting ? "Sending..." : "Send Inquiry"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
