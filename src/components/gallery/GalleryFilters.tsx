import { startTransition } from "react";
import { GalleryFilter, galleryFilters } from "@/data/galleryData";
import { cn } from "@/lib/utils";

type GalleryFiltersProps = {
  activeFilter: GalleryFilter;
  onFilterChange: (filter: GalleryFilter) => void;
};

export function GalleryFilters({ activeFilter, onFilterChange }: GalleryFiltersProps) {
  return (
    <div className="grid grid-cols-2 gap-3 pb-1 sm:grid-cols-3 md:flex md:flex-nowrap md:overflow-x-auto">
      {galleryFilters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => startTransition(() => onFilterChange(filter))}
          className={cn(
            "w-full min-w-0 border px-4 py-3 text-center text-[0.62rem] uppercase tracking-[0.16em] transition sm:text-[0.64rem] sm:tracking-[0.2em] md:min-w-[7rem] md:shrink-0 md:px-5 md:py-2.5 md:tracking-[0.24em]",
            activeFilter === filter ? "theme-filter-chip-active" : "theme-filter-chip",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
