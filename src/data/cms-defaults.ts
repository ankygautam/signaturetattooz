import { tattooGalleryData } from "@/data/galleryData";
import { testimonials } from "@/data/site-content";
import { GalleryItemContent, GoogleReviewContent, SiteVisuals } from "@/admin/types/content";

const withBase = (assetPath: string) =>
  `${import.meta.env.BASE_URL}${assetPath.replace(/^\/+/, "")}`;

export const defaultSiteVisuals: SiteVisuals = {
  heroPrimaryImage:
    "https://images.unsplash.com/photo-1542727365-19732a80dcfd?auto=format&fit=crop&w=1600&q=80",
  heroSecondaryImage: withBase("/images/gallery/clock-eye.jpg"),
  aboutImage: withBase("/images/site/about-nitin.jpg"),
  artistImage: withBase("/images/site/IMG_0530.jpg"),
  bookingBannerImage:
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1800&q=80",
};

export const defaultGallerySeedItems: Omit<GalleryItemContent, "id">[] = tattooGalleryData.map(
  (item, index) => ({
    title: item.title,
    category: item.filter,
    alt: item.alt,
    imageUrl: item.src,
    description: item.description,
    featured: index < 2,
    order: item.order,
  }),
);

export const defaultGalleryPublicItems = defaultGallerySeedItems.map((item, index) => ({
  id: `default-gallery-${index + 1}`,
  ...item,
}));

export const defaultGoogleReviewSeedItems: Omit<GoogleReviewContent, "id">[] = testimonials.map(
  (item, index) => ({
    name: item.name,
    quote: item.quote,
    designation: item.designation,
    src: item.src,
    rating: 5,
    reviewUrl: "",
    featured: index < 4,
    order: index,
  }),
);

export const defaultGoogleReviewPublicItems = defaultGoogleReviewSeedItems.map((item, index) => ({
  id: `default-review-${index + 1}`,
  ...item,
}));
