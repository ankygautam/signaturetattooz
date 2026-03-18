import { galleryItems } from "@/data/site-content";
import { GalleryItemContent, SiteVisuals } from "@/admin/types/content";

export const defaultSiteVisuals: SiteVisuals = {
  heroPrimaryImage:
    "https://images.unsplash.com/photo-1542727365-19732a80dcfd?auto=format&fit=crop&w=1600&q=80",
  heroSecondaryImage:
    "https://images.unsplash.com/photo-1517230878791-4d28214057c2?auto=format&fit=crop&w=1200&q=80",
  aboutImage:
    "https://images.unsplash.com/photo-1517230878791-4d28214057c2?auto=format&fit=crop&w=1400&q=80",
  artistImage:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=80",
  bookingBannerImage:
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1800&q=80",
};

export const defaultGallerySeedItems: Omit<GalleryItemContent, "id">[] = galleryItems.map(
  (item, index) => ({
    title: item.title,
    category: item.category,
    alt: `${item.title} tattoo artwork`,
    imageUrl: item.image,
    featured: index < 2,
    order: index,
  }),
);

export const defaultGalleryPublicItems = defaultGallerySeedItems.map((item, index) => ({
  id: `default-gallery-${index + 1}`,
  ...item,
}));
