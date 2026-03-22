import { startTransition } from "react";
import { GalleryFilter, galleryFilters } from "@/data/galleryData";
import { cn } from "@/lib/utils";

type GalleryFiltersProps = {
  activeFilter: GalleryFilter;
  onFilterChange: (filter: GalleryFilter) => void;
};

export function GalleryFilters({ activeFilter, onFilterChange }: GalleryFiltersProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1">
      {galleryFilters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => startTransition(() => onFilterChange(filter))}
          className={cn(
            "min-w-[7rem] shrink-0 border px-5 py-2.5 text-[0.64rem] uppercase tracking-[0.24em] transition",
            activeFilter === filter ? "theme-filter-chip-active" : "theme-filter-chip",
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
