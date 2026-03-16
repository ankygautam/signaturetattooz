import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/data/site-content";

export function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="section-shell space-y-10">
        <SectionHeader
          eyebrow="Testimonials"
          title="Client words with the same polish as the rest of the studio."
          description="Placeholder testimonials for now, structured so you can replace them later with real reviews from happy clients."
          align="center"
        />

        <div className="panel overflow-hidden border-accentMuted/15">
          <AnimatedTestimonials testimonials={testimonials} autoplay className="py-14" />
        </div>
      </div>
    </section>
  );
}
