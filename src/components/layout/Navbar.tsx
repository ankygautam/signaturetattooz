import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Artist", href: "#artist" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      variants={fadeIn(0.05)}
      initial="hidden"
      animate="show"
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8"
    >
      <div
        className={cn(
          "section-shell flex max-w-7xl items-center justify-between rounded-none border-b border-white/10 px-0 py-4 transition-all duration-300",
          scrolled ? "bg-black/80 shadow-card backdrop-blur-xl" : "bg-transparent",
        )}
      >
        <a href="#home" className="flex items-center gap-3">
          <div>
            <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-bone">
              Signature Tattooz
            </p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.34em] text-muted">
              Hoshiarpur · Punjab
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[0.68rem] uppercase tracking-[0.28em] text-muted transition hover:text-bone"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="#contact" variant="secondary" className="hidden md:inline-flex">
            Book Session
          </Button>
          <button
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-bone lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="section-shell mt-3 overflow-hidden rounded-[2rem] border border-white/8 bg-black/85 p-4 shadow-card backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.24em] text-muted transition hover:bg-white/[0.04] hover:text-bone"
                >
                  {link.label}
                </a>
              ))}
              <Button href="#contact" className="mt-2 w-full" onClick={() => setOpen(false)}>
                Book Session
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
