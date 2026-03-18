import { LogOut, Menu, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/admin/providers/AuthProvider";

const titles: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Studio Overview",
    subtitle: "A quick pulse on bookings, content, and what needs attention next.",
  },
  "/analytics": {
    title: "Analytics",
    subtitle: "Track Signature Tattooz momentum across bookings, messages, and managed content.",
  },
  "/bookings": {
    title: "Bookings",
    subtitle: "Track consultation requests and upcoming tattoo sessions.",
  },
  "/contacts": {
    title: "Contact Submissions",
    subtitle: "Follow up on unread messages, contact forms, and next client conversations.",
  },
  "/gallery": {
    title: "Gallery Manager",
    subtitle: "Organize portfolio drops and keep the site visuals current.",
  },
  "/services": {
    title: "Services Manager",
    subtitle: "Control service copy, ordering, and updates for the public site.",
  },
  "/artists": {
    title: "Artists Manager",
    subtitle: "Manage artist bios, specialties, visuals, and social profile links.",
  },
  "/school": {
    title: "Tattoo School CMS",
    subtitle: "Edit training content with live preview before it goes into the studio experience.",
  },
  "/settings": {
    title: "Studio Settings",
    subtitle: "Manage studio contact details, brand statement, and Signature Tattooz social links.",
  },
};

export function AdminTopbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const location = useLocation();
  const { user, signOutUser } = useAuth();

  const copy = useMemo(() => titles[location.pathname] ?? titles["/"], [location.pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6 xl:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="inline-flex h-11 w-11 items-center justify-center border border-white/10 text-bone xl:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="font-display text-4xl uppercase leading-none text-bone">{copy.title}</p>
            <p className="mt-1 text-sm text-muted">{copy.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={import.meta.env.BASE_URL}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-muted transition hover:border-accentMuted hover:text-bone"
          >
            <Sparkles className="h-4 w-4" />
            View Site
          </a>
          <div className="hidden rounded-full border border-white/10 px-4 py-2 text-sm text-muted md:block">
            {user?.email ?? "Studio Admin"}
          </div>
          <Button variant="ghost" onClick={() => void signOutUser()}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
