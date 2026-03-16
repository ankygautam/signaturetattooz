export type Artist = {
  name: string;
  title: string;
  years: number;
  specialties: string[];
  image: string;
  bio: string;
  instagram: string;
  portfolioUrl?: string;
};

export const artists: Artist[] = [
  {
    name: "Nova Reyes",
    title: "Founder · Fine Line & Neo-ornamental",
    years: 12,
    specialties: ["Single needle", "Filigree", "Negative space"],
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    bio: "Curates bespoke compositions with a balance of precision line work and luxe textures inspired by jewelry design.",
    instagram: "https://instagram.com/novareyes.ink",
    portfolioUrl: "#gallery",
  },
  {
    name: "Kai Laurent",
    title: "Lead Artist · Botanical Realism",
    years: 9,
    specialties: ["Floral realism", "Soft shading", "Color harmony"],
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80",
    bio: "Known for painterly gradients and organic flows that mirror the body’s movement.",
    instagram: "https://instagram.com/kailaure.tattoo",
    portfolioUrl: "#gallery",
  },
  {
    name: "Mila Voss",
    title: "Blackwork & Geometric",
    years: 7,
    specialties: ["Geometric blackwork", "Soft gradients", "Spatial composition"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    bio: "Creates bold, architectural pieces that blend symmetry with atmospheric shading.",
    instagram: "https://instagram.com/milavoss.studio",
    portfolioUrl: "#gallery",
  },
];
