import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/Button";
import { fadeIn } from "@/lib/motion";
import { clsx } from "clsx";

const links = [
  { label: "Home", href: "#home" },
  { label: "Artists", href: "#artists" },
  { label: "Styles", href: "#styles" },
  { label: "Gallery", href: "#gallery" },
  { label: "Booking", href: "#booking" },
  { label: "Aftercare", href: "#aftercare" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "backdrop-blur-xl" : "",
      )}
      variants={fadeIn(0.05)}
      initial="hidden"
      animate="show"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-white/5 bg-black/40 px-4 py-3 shadow-card backdrop-blur-xl md:px-6">
        <a href="#home" className="flex items-center gap-3">
          <span className="h-9 w-9 rounded-full border border-accent/40 bg-gradient-to-br from-accent/60 to-accentMuted/70 shadow-glow" />
          <div className="leading-tight">
            <p className="font-display text-lg uppercase tracking-[0.22em] text-bone">
              SignatureTattooz
            </p>
            <p className="text-[10px] text-muted uppercase tracking-[0.28em]">
              Private Studio
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.18em] text-muted lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="pb-1 transition-all duration-200 hover:text-bone hover:underline underline-offset-8"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            className="hidden md:inline-flex"
            onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          >
            Book Consultation
          </Button>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-stroke/70 bg-white/5 text-bone lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={clsx(
                  "block h-0.5 w-6 bg-bone transition-transform duration-200",
                  open && "translate-y-1.5 rotate-45",
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-6 bg-bone transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={clsx(
                  "block h-0.5 w-6 bg-bone transition-transform duration-200",
                  open && "-translate-y-1.5 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/5 bg-black/80 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col divide-y divide-white/5">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-5 py-4 text-sm uppercase tracking-[0.2em] text-muted transition hover:bg-white/5 hover:text-bone"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-5 py-4">
                <Button
                  className="w-full justify-center"
                  onClick={() => {
                    setOpen(false);
                    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
