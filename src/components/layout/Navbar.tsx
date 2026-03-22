import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

type NavbarPage = "home" | "school" | "gallery";

const getPagePrefix = (page: NavbarPage) => {
  if (page === "home") {
    return "";
  }

  if (page === "school") {
    return "./";
  }

  return "../";
};

const getLinks = (page: NavbarPage) => {
  const prefix = getPagePrefix(page);

  return [
    { label: "Home", href: page === "home" ? "#home" : `${prefix}#home` },
    { label: "About", href: page === "home" ? "#about" : `${prefix}#about` },
    { label: "Services", href: page === "home" ? "#services" : `${prefix}#services` },
    { label: "Gallery", href: page === "gallery" ? "#gallery" : page === "home" ? "#gallery" : `${prefix}#gallery` },
    { label: "Artist", href: page === "home" ? "#artist" : `${prefix}#artist` },
    { label: "Why Us", href: page === "home" ? "#why-us" : `${prefix}#why-us` },
    { label: "Contact", href: page === "home" ? "#contact" : `${prefix}#contact` },
  ];
};

export function Navbar({ page = "home" }: { page?: NavbarPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightSurface, setLightSurface] = useState(page !== "home");
  const links = getLinks(page);
  const homeHref = page === "home" ? "#home" : page === "school" ? "./#home" : "../#home";
  const bookingHref =
    page === "home" ? "./school.html" : page === "school" ? "#tattoo-school" : "../school.html";
  const bookingLabel = "School";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      if (page !== "home") {
        setLightSurface(true);
        return;
      }

      setLightSurface(window.scrollY > window.innerHeight * 0.68);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  const frameClasses = lightSurface
    ? "border-[rgb(var(--theme-light-border-rgb)/0.62)] bg-[linear-gradient(135deg,rgba(255,255,255,0.54),rgba(255,255,255,0.28))] backdrop-blur-2xl shadow-[0_18px_42px_rgba(33,24,17,0.12)]"
    : scrolled
      ? "border-white/10 bg-black/88 backdrop-blur-xl"
      : "border-white/10 bg-black/35 backdrop-blur-md";

  const brandClasses = lightSurface ? "text-[rgb(var(--theme-light-ink-rgb)/1)]" : "text-bone";
  const metaClasses = lightSurface ? "text-[rgb(var(--theme-light-muted-rgb)/1)]" : "text-muted";
  const navLinkClasses = lightSurface
    ? "font-medium text-[rgb(var(--theme-light-muted-rgb)/1)] hover:text-[rgb(var(--theme-light-ink-rgb)/1)]"
    : "text-muted hover:text-bone";
  const iconButtonClasses = lightSurface
    ? "border-[rgb(var(--theme-light-border-rgb)/0.62)] bg-white/38 text-[rgb(var(--theme-light-ink-rgb)/1)] backdrop-blur-md"
    : "border-white/10 bg-transparent text-bone";
  const mobilePanelClasses = lightSurface
    ? "border-[rgb(var(--theme-light-border-rgb)/0.62)] bg-[linear-gradient(135deg,rgba(255,255,255,0.62),rgba(255,255,255,0.34))] shadow-[0_20px_50px_rgba(33,24,17,0.12)]"
    : "border-white/10 bg-black/95 shadow-card";
  const bookingButtonClasses = undefined;

  return (
    <motion.header
      variants={fadeIn(0.05)}
      initial="hidden"
      animate="show"
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "section-shell flex max-w-7xl items-center justify-between border-b px-0 py-4 sm:py-5 transition-all duration-300",
          frameClasses,
        )}
      >
        <a href={homeHref} className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <p className={cn("font-display text-[2.35rem] uppercase leading-none tracking-[0.08em] sm:text-4xl", brandClasses)}>
              Signature Tattooz
            </p>
            <p className={cn("mt-1 text-[0.58rem] uppercase tracking-[0.34em] sm:text-[0.62rem]", metaClasses)}>
              Tattoo Studio · Hoshiarpur (PB)
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn("text-[0.76rem] uppercase tracking-[0.28em] transition", navLinkClasses)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            href={bookingHref}
            variant="secondary"
            className={cn("hidden md:inline-flex rounded-none border-x-0 border-b-0 border-t-0 px-0 text-[0.72rem]", bookingButtonClasses)}
          >
            {bookingLabel}
          </Button>
          <button
            onClick={() => setOpen((value) => !value)}
            className={cn("inline-flex h-11 w-11 items-center justify-center border xl:hidden", iconButtonClasses)}
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
            className={cn("section-shell overflow-hidden border-b px-0 py-4 backdrop-blur-xl xl:hidden", mobilePanelClasses)}
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn("px-0 py-3 text-[0.92rem] uppercase tracking-[0.22em] transition", navLinkClasses)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                href={bookingHref}
                variant="secondary"
                className={cn("mt-2 w-full rounded-none border-x-0 border-b-0 border-t-0 px-0 text-[0.8rem]", bookingButtonClasses)}
                onClick={() => setOpen(false)}
              >
                {bookingLabel}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
