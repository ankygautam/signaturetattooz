import { useMemo } from "react";
import { GoogleReviewContent } from "@/admin/types/content";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { defaultGoogleReviewPublicItems } from "@/data/cms-defaults";
import { usePublicContentCollection } from "@/firebase/public-content";

export function Testimonials() {
  const fallbackReviews = useMemo(() => defaultGoogleReviewPublicItems, []);
  const managedReviews = usePublicContentCollection<GoogleReviewContent>(
    "googleReviews",
    fallbackReviews,
  );
  const reviews = useMemo(
    () =>
      [...managedReviews]
        .sort(
          (left, right) =>
            (left.order ?? Number.MAX_SAFE_INTEGER) - (right.order ?? Number.MAX_SAFE_INTEGER),
        )
        .map((item) => ({
          quote: item.quote,
          name: item.name,
          designation: item.designation,
          src: item.src,
        })),
    [managedReviews],
  );

  return (
    <section className="relative py-24">
      <div className="section-shell space-y-10">
        <SectionHeader
          eyebrow="Google Reviews"
          title="What Clients Say After The Session."
          description="Real feedback from people who came in with an idea and left with work that felt personal, clean, and confidently done."
          align="center"
        />

        <div className="panel overflow-hidden border-accentMuted/15 bg-black/40">
          <AnimatedTestimonials testimonials={reviews} autoplay className="py-14" />
        </div>
      </div>
    </section>
  );
}
