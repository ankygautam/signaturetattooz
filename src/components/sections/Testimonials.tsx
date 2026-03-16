import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/site-content";

export function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="section-shell space-y-10">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Clients Remember After The Session."
          description="Still placeholders for now, but the section now reads more like a real tattoo shop testimonial block instead of a generic SaaS carousel."
          align="center"
        />

        <div className="panel overflow-hidden border-accentMuted/15 bg-black/40">
          <AnimatedTestimonials testimonials={testimonials} autoplay className="py-14" />
        </div>
      </div>
    </section>
  );
}
