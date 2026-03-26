import { startTransition } from "react";
import { GalleryFilter, galleryFilters } from "@/data/galleryData";
import { cn } from "@/lib/utils";

type GalleryFiltersProps = {
  activeFilter: GalleryFilter;
  onFilterChange: (filter: GalleryFilter) => void;
};

export function GalleryFilters({ activeFilter, onFilterChange }: GalleryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 pb-1 md:flex-nowrap md:overflow-x-auto">
      {galleryFilters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => startTransition(() => onFilterChange(filter))}
          className={cn(
            "min-w-0 flex-1 border px-4 py-2.5 text-[0.58rem] uppercase tracking-[0.18em] transition sm:min-w-[7rem] sm:px-5 sm:text-[0.64rem] sm:tracking-[0.24em] md:shrink-0 md:flex-none",
            activeFilter === filter ? "theme-filter-chip-active" : "theme-filter-chip",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
