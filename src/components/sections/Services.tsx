import { motion } from "framer-motion";
import { services } from "@/data/site-content";
import { fadeUp, viewport } from "@/lib/motion";

export function Services() {
  return (
    <section id="services" className="relative py-24">
      <div className="section-shell space-y-10">
        <div className="max-w-3xl">
          <p className="eyebrow">Services</p>
          <h2 className="section-title mt-4">
            The Process
            <br />
            Behind The Work
          </h2>
        </div>

        <div className="border-y border-[#d8cfc1]">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp(index * 0.05)}
              className="group grid gap-6 border-b border-[#d8cfc1] px-0 py-8 transition hover:bg-black/[0.02] md:grid-cols-[0.18fr_0.42fr_0.4fr]"
            >
              <p className="meta-label">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="card-title">
                {service.title}
              </h3>
              <p className="section-copy max-w-md">{service.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
