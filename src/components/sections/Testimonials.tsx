import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/site-content";

export function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="section-shell space-y-10">
        <SectionHeader
          eyebrow="Google Reviews"
          title="What Clients Say After The Session."
          description="A curated set of Google reviews from Signature Tattooz clients, reflecting the studio's approach to comfort, hygiene, design guidance, and finished tattoo quality."
          align="center"
        />

        <div className="panel overflow-hidden border-accentMuted/15 bg-black/40">
          <AnimatedTestimonials testimonials={testimonials} autoplay className="py-14" />
        </div>
      </div>
    </section>
  );
}
