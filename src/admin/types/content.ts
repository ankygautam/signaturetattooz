export type ContentBase = {
  id: string;
  order?: number;
  createdAt?: string | number | Date | { seconds?: number; nanoseconds?: number } | null;
  updatedAt?: string | number | Date | { seconds?: number; nanoseconds?: number } | null;
};

export type GalleryItemContent = ContentBase & {
  title: string;
  category: string;
  alt: string;
  imageUrl: string;
  description?: string;
  featured?: boolean;
};

export type GoogleReviewContent = ContentBase & {
  name: string;
  quote: string;
  designation: string;
  src: string;
  rating?: number;
  reviewUrl?: string;
  featured?: boolean;
};

export type ServiceContent = ContentBase & {
  title: string;
  description: string;
};

export type ArtistContent = ContentBase & {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  specialties: string[];
  instagram?: string;
  facebook?: string;
  youtube?: string;
  featured?: boolean;
};

export type SchoolShot = {
  title: string;
  image: string;
};

export type SchoolModule = {
  title: string;
  description: string;
};

export type TattooSchoolContent = {
  eyebrow: string;
  title: string;
  description: string;
  paragraphOne: string;
  paragraphTwo: string;
  focusTitle: string;
  focusDescription: string;
  leadImage: string;
  moduleHeading: string;
  moduleTitle: string;
  shots: SchoolShot[];
  modules: SchoolModule[];
};

export type StudioSettings = {
  studioName: string;
  website: string;
  ownerName: string;
  ownerRole: string;
  location: string;
  email: string;
  phone: string;
  brandStatement: string;
  instagram: string;
  facebook: string;
  youtube: string;
};

export type SiteVisuals = {
  heroPrimaryImage: string;
  heroSecondaryImage: string;
  aboutImage: string;
  artistImage: string;
  bookingBannerImage: string;
};

export type NormalizedContentItem<T extends ContentBase> = T & {
  createdAtValue: number;
  updatedAtValue: number;
  createdAtLabel: string;
};
