import { motion } from "framer-motion";
import { CalendarCheck2, ImagePlus, School, Sparkles } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatCard } from "@/components/ui/StatCard";

const stats = [
  {
    title: "Pending bookings",
    value: "12",
    helper: "Consultation requests waiting for confirmation or follow-up this week.",
    icon: CalendarCheck2,
  },
  {
    title: "Gallery drafts",
    value: "08",
    helper: "Fresh healed work and in-progress sessions ready to be curated for the site.",
    icon: ImagePlus,
  },
  {
    title: "School modules",
    value: "06",
    helper: "Active Tattoo School topics currently planned across technique and studio practice.",
    icon: School,
  },
  {
    title: "Studio tasks",
    value: "04",
    helper: "Priority brand or guest follow-ups that need attention before the next drop.",
    icon: Sparkles,
  },
];

const recentInquiries = [
  {
    name: "Arjun S.",
    request: "Forearm realism consultation",
    note: "Wants a portrait piece with soft shading and a family reference photo.",
    status: "Needs reply",
  },
  {
    name: "Mehak K.",
    request: "Fine line custom script",
    note: "Asked for a private evening slot and mockup before finalizing size.",
    status: "Concept review",
  },
  {
    name: "Rajat P.",
    request: "Tattoo School inquiry",
    note: "Interested in fundamentals, hygiene training, and realism practice modules.",
    status: "Discovery call",
  },
];

export function OverviewPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: index * 0.05 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="panel rounded-[2rem] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="eyebrow">Recent activity</p>
              <h3 className="mt-3 font-display text-5xl uppercase leading-none text-bone">
                New Guest Momentum
              </h3>
            </div>
            <p className="text-sm text-muted">Latest leads, ideas, and studio touchpoints.</p>
          </div>

          <div className="mt-6 space-y-4">
            {recentInquiries.map((item) => (
              <div
                key={item.name + item.request}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-accentMuted">
                      {item.status}
                    </p>
                    <h4 className="mt-3 font-display text-4xl uppercase leading-none text-bone">
                      {item.name}
                    </h4>
                    <p className="mt-2 text-sm text-bone/85">{item.request}</p>
                  </div>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <EmptyState
          title="Automation slots ready"
          description="This shell is ready for the next step: connect bookings, inquiries, gallery uploads, or Tattoo School records to Firebase collections and storage when you want real admin data."
          actionLabel="Back to public site"
          actionHref={import.meta.env.BASE_URL}
          className="rounded-[2rem]"
        />
      </section>
    </div>
  );
}
