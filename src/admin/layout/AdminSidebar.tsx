import {
  Activity,
  BriefcaseBusiness,
  Images,
  LayoutDashboard,
  MessageSquare,
  MessageSquareQuote,
  Palette,
  School,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { label: "Overview", to: "/", icon: LayoutDashboard },
  { label: "Analytics", to: "/analytics", icon: Activity },
  { label: "Bookings", to: "/bookings", icon: Palette },
  { label: "Contact", to: "/contacts", icon: MessageSquare },
  { label: "Gallery", to: "/gallery", icon: Images },
  { label: "Reviews", to: "/reviews", icon: MessageSquareQuote },
  { label: "Services", to: "/services", icon: BriefcaseBusiness },
  { label: "Artists", to: "/artists", icon: UserRound },
  { label: "School", to: "/school", icon: School },
  { label: "Settings", to: "/settings", icon: Settings },
];

export function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition xl:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[18rem] flex-col border-r border-white/10 bg-[#080808]/95 px-5 py-6 backdrop-blur-xl transition-transform duration-300 xl:static xl:z-auto xl:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="font-display text-4xl uppercase leading-none text-bone">Signature</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.32em] text-accentMuted">
              Admin Studio
            </p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-muted xl:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-2">
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-[1.1rem] border border-transparent px-4 py-3 text-sm uppercase tracking-[0.22em] text-muted transition hover:border-white/10 hover:bg-white/[0.03] hover:text-bone",
                  isActive && "border-accentMuted/40 bg-accentMuted/10 text-bone",
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-accentMuted/15 to-transparent p-4">
          <p className="eyebrow">Studio note</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Keep bookings, gallery drops, and school updates in one calm workspace built for the studio team.
          </p>
        </div>
      </aside>
    </>
  );
}
