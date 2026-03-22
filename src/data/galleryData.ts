const withBase = (assetPath: string) =>
  `${import.meta.env.BASE_URL}${assetPath.replace(/^\/+/, "")}`;

export const galleryFilters = [
  "All",
  "Portraits",
  "Spiritual",
  "Script",
  "Floral",
  "Geometric",
  "Custom",
] as const;

export type GalleryFilter = (typeof galleryFilters)[number];
export type GalleryPrimaryFilter = Exclude<GalleryFilter, "All">;

export type TattooGalleryItem = {
  id: string;
  src: string;
  title: string;
  filter: GalleryPrimaryFilter;
  secondaryFilters: GalleryPrimaryFilter[];
  alt: string;
  description: string;
  order: number;
};

const legacyFilterMap: Record<string, GalleryPrimaryFilter> = {
  portraits: "Portraits",
  portrait: "Portraits",
  realism: "Portraits",
  spiritual: "Spiritual",
  script: "Script",
  lettering: "Script",
  "fine line": "Script",
  floral: "Floral",
  flower: "Floral",
  geometric: "Geometric",
  mandala: "Geometric",
  dotwork: "Geometric",
  blackwork: "Geometric",
  custom: "Custom",
  traditional: "Custom",
};

export function normalizeGalleryFilter(value: string): GalleryPrimaryFilter {
  return legacyFilterMap[value.trim().toLowerCase()] ?? "Custom";
}

export function normalizeGalleryImageKey(value: string) {
  const normalizedValue = value.trim().toLowerCase();

  try {
    const parsed = normalizedValue.startsWith("http")
      ? new URL(normalizedValue)
      : new URL(normalizedValue, "https://signaturetattooz.local");

    const pathname = parsed.pathname.replace(/\/+$/, "");
    return pathname.split("/").pop() ?? normalizedValue;
  } catch {
    return normalizedValue.split("?")[0].split("#")[0].replace(/\/+$/, "").split("/").pop() ?? normalizedValue;
  }
}

export const tattooGalleryData: TattooGalleryItem[] = [
  {
    id: "eye-of-time",
    src: withBase("/images/gallery/clock-eye.jpg"),
    title: "Eye of Time",
    filter: "Portraits",
    secondaryFilters: ["Custom"],
    alt: "Black and grey eye and Roman numeral clock tattoo on forearm",
    description:
      "A time-led realism composition where the eye becomes the focal point, framed by Roman numeral clockwork and soft black-and-grey depth.",
    order: 0,
  },
  {
    id: "crowned-lion",
    src: withBase("/images/gallery/lion-crown.jpg"),
    title: "Crowned Lion",
    filter: "Portraits",
    secondaryFilters: ["Floral"],
    alt: "Black and grey lion with crown and rose tattoo on upper arm",
    description:
      "A commanding lion portrait with crown and rose elements, built for strong expression, layered detail, and upper-arm presence.",
    order: 1,
  },
  {
    id: "spartan-eagle",
    src: withBase("/images/gallery/spartan-eagle.jpg"),
    title: "Spartan Eagle",
    filter: "Portraits",
    secondaryFilters: ["Custom"],
    alt: "Black and grey Spartan helmet and eagle tattoo on upper arm",
    description:
      "A warrior-led black-and-grey composition pairing a Spartan helmet with eagle forms for a bold, disciplined statement piece.",
    order: 2,
  },
  {
    id: "royal-tiger",
    src: withBase("/images/gallery/tiger-crown.jpg"),
    title: "Royal Tiger",
    filter: "Portraits",
    secondaryFilters: ["Custom"],
    alt: "Tiger face with crown tattoo in black and grey",
    description:
      "A tiger portrait anchored by a crown, focused on sharp eye contact, controlled contrast, and a strong forearm read.",
    order: 3,
  },
  {
    id: "geometric-flow",
    src: withBase("/images/gallery/pattern-arm.jpg"),
    title: "Geometric Flow",
    filter: "Geometric",
    secondaryFilters: ["Custom"],
    alt: "Geometric patterned arm tattoo with dotwork and negative space",
    description:
      "A structured geometric sleeve direction using repeat pattern rhythm, dotwork control, and negative space to wrap the arm cleanly.",
    order: 4,
  },
  {
    id: "shiv-shakti",
    src: withBase("/images/gallery/shiv-half-face.jpg"),
    title: "Shiv Shakti",
    filter: "Spiritual",
    secondaryFilters: ["Portraits"],
    alt: "Spiritual Shiva portrait tattoo with trident linework on forearm",
    description:
      "A spiritual forearm piece blending Shiva portrait energy with trident linework and a modern devotional composition.",
    order: 5,
  },
  {
    id: "family-watch",
    src: withBase("/images/gallery/family-watch.jpg"),
    title: "Family Watch",
    filter: "Custom",
    secondaryFilters: ["Portraits"],
    alt: "Black and grey family silhouette and clock tattoo on forearm",
    description:
      "A story-led family tattoo built around a watch centerpiece, memory, and emotional depth through layered black-and-grey detailing.",
    order: 6,
  },
  {
    id: "respect-the-past",
    src: withBase("/images/gallery/respect-time.jpg"),
    title: "Respect the Past",
    filter: "Script",
    secondaryFilters: ["Custom"],
    alt: "Black and grey clock tattoo with script banner on forearm",
    description:
      "A reflective watch composition with scripted wording, shaped to feel personal, readable, and strong on the forearm.",
    order: 7,
  },
  {
    id: "legacy-portrait",
    src: withBase("/images/gallery/portrait-elder.jpg"),
    title: "Legacy Portrait",
    filter: "Portraits",
    secondaryFilters: ["Custom"],
    alt: "Black and grey elder portrait tattoo with silhouette scene on forearm",
    description:
      "A tribute portrait focused on likeness, softness in the face, and emotional storytelling through the composition below.",
    order: 8,
  },
  {
    id: "dotted-skull",
    src: withBase("/images/gallery/dotted-skull-nitin-gautam.jpeg"),
    title: "Dotted Skull",
    filter: "Geometric",
    secondaryFilters: ["Custom"],
    alt: "Dotwork skull tattoo with geometric shading on arm",
    description:
      "A skull-forward dotwork piece where stippled shading and controlled structure give the tattoo a darker graphic edge.",
    order: 9,
  },
  {
    id: "eye-focus",
    src: withBase("/images/gallery/eye-tattoo.jpeg"),
    title: "Eye Focus",
    filter: "Portraits",
    secondaryFilters: ["Custom"],
    alt: "Detailed eye tattoo with soft black and grey shading",
    description:
      "A close-focus eye study built around precision detail, black-and-grey realism, and a strong visual anchor on the skin.",
    order: 10,
  },
  {
    id: "vintage-outlaw",
    src: withBase("/images/gallery/gangster-vintage-car.jpeg"),
    title: "Vintage Outlaw",
    filter: "Custom",
    secondaryFilters: ["Portraits"],
    alt: "Story-driven gangster and vintage car tattoo on forearm",
    description:
      "A mixed-story composition combining character attitude and vintage car imagery into one custom narrative piece.",
    order: 11,
  },
  {
    id: "rose-relic",
    src: withBase("/images/gallery/get-inked-1.jpeg"),
    title: "Rose Relic",
    filter: "Floral",
    secondaryFilters: ["Custom"],
    alt: "Black and grey rose and skull tattoo on forearm",
    description:
      "A floral-led black-and-grey piece where the rose stays dominant while darker elements add mood and contrast around it.",
    order: 12,
  },
  {
    id: "inked-composition-ii",
    src: withBase("/images/gallery/get-inked-2.jpeg"),
    title: "Inked Composition II",
    filter: "Custom",
    secondaryFilters: [],
    alt: "Custom black and grey tattoo composition on forearm",
    description:
      "A custom composition developed for skin flow, balanced contrast, and a bold editorial feel in the overall layout.",
    order: 13,
  },
  {
    id: "inked-composition-iii",
    src: withBase("/images/gallery/get-inked.jpeg"),
    title: "Inked Composition III",
    filter: "Custom",
    secondaryFilters: [],
    alt: "Custom black and grey tattoo composition on arm",
    description:
      "A studio portfolio piece built around clean readability, strong placement, and a custom black-and-grey execution.",
    order: 14,
  },
  {
    id: "full-arm-muse",
    src: withBase("/images/gallery/girl-full-arm.jpeg"),
    title: "Full Arm Muse",
    filter: "Portraits",
    secondaryFilters: ["Custom"],
    alt: "Full arm female portrait tattoo in black and grey",
    description:
      "A larger portrait composition intended to read across the full arm with presence, softness, and controlled shading depth.",
    order: 15,
  },
  {
    id: "lioness-power",
    src: withBase("/images/gallery/lioness-tattoo.jpeg"),
    title: "Lioness Power",
    filter: "Portraits",
    secondaryFilters: ["Custom"],
    alt: "Black and grey lioness portrait tattoo on arm",
    description:
      "A lioness portrait focused on calm strength, fur texture, and enough contrast to hold the face clearly over time.",
    order: 16,
  },
  {
    id: "mom-dad-tribute",
    src: withBase("/images/gallery/mom-dad-tattoo.jpeg"),
    title: "Mom Dad Tribute",
    filter: "Script",
    secondaryFilters: ["Custom"],
    alt: "Mom Dad tribute lettering tattoo in fine line style",
    description:
      "A sentimental lettering tattoo shaped to keep the message personal, soft, and readable in a lighter line approach.",
    order: 17,
  },
  {
    id: "mountain-compass",
    src: withBase("/images/gallery/mountain-compass-tattoo.jpeg"),
    title: "Mountain Compass",
    filter: "Custom",
    secondaryFilters: ["Geometric"],
    alt: "Mountain and compass tattoo in black and grey",
    description:
      "A direction-led custom design combining mountain imagery and compass symbolism into a balanced travel-inspired piece.",
    order: 18,
  },
  {
    id: "name-lettering",
    src: withBase("/images/gallery/name-tattoo-nitin-gautam.jpeg"),
    title: "Name Lettering",
    filter: "Script",
    secondaryFilters: [],
    alt: "Personal name lettering tattoo with clean linework",
    description:
      "A clean name-led tattoo built around spacing, clarity, and a polished lettering finish that stays readable on skin.",
    order: 19,
  },
  {
    id: "rose-detail",
    src: withBase("/images/gallery/rose-tattoo.jpeg"),
    title: "Rose Detail",
    filter: "Floral",
    secondaryFilters: [],
    alt: "Black and grey rose tattoo with soft shading",
    description:
      "A floral rose study focused on petal layering, soft gradients, and elegant black-and-grey depth.",
    order: 20,
  },
  {
    id: "tiger-spirit",
    src: withBase("/images/gallery/tiger-spirit-tattoo.jpeg"),
    title: "Tiger Spirit",
    filter: "Portraits",
    secondaryFilters: ["Custom"],
    alt: "Black and grey tiger portrait tattoo on arm",
    description:
      "A tiger portrait built for intensity, direct expression, and strong contrast that holds up clearly from a distance.",
    order: 21,
  },
  {
    id: "trishul-mark",
    src: withBase("/images/gallery/trishul-tattoo.jpeg"),
    title: "Trishul Mark",
    filter: "Spiritual",
    secondaryFilters: [],
    alt: "Spiritual trishul tattoo in black and grey",
    description:
      "A devotional trishul composition handled with clean placement, symbolic weight, and a restrained black-and-grey finish.",
    order: 22,
  },
  {
    id: "warrior-spirit",
    src: withBase("/images/gallery/warrior-tattoo-nitin-gautam.jpeg"),
    title: "Warrior Spirit",
    filter: "Spiritual",
    secondaryFilters: ["Portraits"],
    alt: "Warrior portrait tattoo with sacred composition in black and grey",
    description:
      "A warrior-led black-and-grey piece that feels ceremonial and intense, with the portrait and sacred mood carrying the design.",
    order: 23,
  },
  {
    id: "wing-detail",
    src: withBase("/images/gallery/wing-tattoo.jpeg"),
    title: "Wing Detail",
    filter: "Spiritual",
    secondaryFilters: [],
    alt: "Angel wing tattoo with fine black and grey detail",
    description:
      "A wing-based tattoo focused on feather texture, lightness in line, and a spiritual sense of lift in the final silhouette.",
    order: 24,
  },
  {
    id: "karma-script",
    src: withBase("/images/gallery/karma-tattoo.jpeg"),
    title: "Karma Script",
    filter: "Script",
    secondaryFilters: ["Spiritual"],
    alt: "Minimal karma lettering tattoo with clean linework",
    description:
      "A minimal karma tattoo where the word itself stays central, with neat linework and a calm, direct visual rhythm.",
    order: 25,
  },
  {
    id: "popeye-character",
    src: withBase("/images/gallery/popeye-tattoo.jpeg"),
    title: "Popeye Character",
    filter: "Custom",
    secondaryFilters: ["Portraits"],
    alt: "Custom Popeye character tattoo with bold black and grey shading",
    description:
      "A playful character-driven tattoo that brings illustration energy into the gallery while still reading cleanly on skin.",
    order: 26,
  },
  {
    id: "unalome-path",
    src: withBase("/images/gallery/unalome-tattoo.jpeg"),
    title: "Unalome Path",
    filter: "Spiritual",
    secondaryFilters: ["Script"],
    alt: "Minimal unalome spiritual tattoo in fine line style",
    description:
      "A minimal spiritual piece built around the unalome symbol, subtle flow, and calm linework that feels balanced on the body.",
    order: 27,
  },
];
