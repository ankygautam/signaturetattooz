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
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "section-shell flex max-w-7xl items-center justify-between border-b px-0 py-5 transition-all duration-300",
          scrolled
            ? "border-white/10 bg-black/88 backdrop-blur-xl"
            : "border-white/10 bg-black/35 backdrop-blur-md",
        )}
      >
        <a href="#home" className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <p className="font-display text-3xl uppercase leading-none tracking-[0.08em] text-bone sm:text-4xl">
              Signature Tattooz
            </p>
            <p className="mt-1 text-[0.58rem] uppercase tracking-[0.34em] text-muted sm:text-[0.62rem]">
              Tattoo Studio · Hoshiarpur (PB)
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[0.62rem] uppercase tracking-[0.28em] text-muted transition hover:text-bone"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href="#contact"
            variant="secondary"
            className="hidden md:inline-flex rounded-none border-x-0 border-b-0 border-t-0 px-0"
          >
            Book Session
          </Button>
          <button
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/10 bg-transparent text-bone xl:hidden"
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
            className="section-shell overflow-hidden border-b border-white/10 bg-black/95 px-0 py-4 shadow-card backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-0 py-3 text-sm uppercase tracking-[0.24em] text-muted transition hover:text-bone"
                >
                  {link.label}
                </a>
              ))}
              <Button
                href="#contact"
                variant="secondary"
                className="mt-2 w-full rounded-none border-x-0 border-b-0 border-t-0 px-0"
                onClick={() => setOpen(false)}
              >
                Book Session
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
