import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

type NavbarPage = "home" | "school";

const getLinks = (page: NavbarPage) => [
  { label: "Home", href: page === "home" ? "#home" : "./#home" },
  { label: "About", href: page === "home" ? "#about" : "./#about" },
  { label: "Services", href: page === "home" ? "#services" : "./#services" },
  { label: "Gallery", href: page === "home" ? "#gallery" : "./#gallery" },
  { label: "Artist", href: page === "home" ? "#artist" : "./#artist" },
  { label: "School", href: page === "home" ? "./school.html" : "#tattoo-school" },
  { label: "Why Us", href: page === "home" ? "#why-us" : "./#why-us" },
  { label: "Contact", href: page === "home" ? "#contact" : "./#contact" },
];

export function Navbar({ page = "home" }: { page?: NavbarPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightSurface, setLightSurface] = useState(page === "school");
  const links = getLinks(page);
  const homeHref = page === "home" ? "#home" : "./#home";
  const bookingHref = page === "home" ? "#contact" : "./#contact";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      if (page === "school") {
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
    ? "border-[#d5cab9] bg-[#f8f3eb]/96 backdrop-blur-xl shadow-[0_16px_36px_rgba(33,24,17,0.12)]"
    : scrolled
      ? "border-white/10 bg-black/88 backdrop-blur-xl"
      : "border-white/10 bg-black/35 backdrop-blur-md";

  const brandClasses = lightSurface ? "text-[#120f0d]" : "text-bone";
  const metaClasses = lightSurface ? "text-[#5e544d]" : "text-muted";
  const navLinkClasses = lightSurface
    ? "font-medium text-[#3d342e] hover:text-[#120f0d]"
    : "text-muted hover:text-bone";
  const iconButtonClasses = lightSurface
    ? "border-[#cfc2af] bg-white/70 text-[#120f0d]"
    : "border-white/10 bg-transparent text-bone";
  const mobilePanelClasses = lightSurface
    ? "border-[#d8cfc1] bg-[#f8f2ea]/95 shadow-[0_20px_50px_rgba(33,24,17,0.12)]"
    : "border-white/10 bg-black/95 shadow-card";
  const bookingButtonClasses = lightSurface
    ? "!border-[#b9955b] !bg-[#e4c997] !text-[#120f0d] hover:!bg-[#dbbb82]"
    : undefined;

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
          frameClasses,
        )}
      >
        <a href={homeHref} className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <p className={cn("font-display text-3xl uppercase leading-none tracking-[0.08em] sm:text-4xl", brandClasses)}>
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
              className={cn("text-[0.62rem] uppercase tracking-[0.28em] transition", navLinkClasses)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href={bookingHref}
            variant="secondary"
            className={cn("hidden md:inline-flex rounded-none border-x-0 border-b-0 border-t-0 px-0", bookingButtonClasses)}
          >
            Book Session
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
                  className={cn("px-0 py-3 text-sm uppercase tracking-[0.24em] transition", navLinkClasses)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                href={bookingHref}
                variant="secondary"
                className={cn("mt-2 w-full rounded-none border-x-0 border-b-0 border-t-0 px-0", bookingButtonClasses)}
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
