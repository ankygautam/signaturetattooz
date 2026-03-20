import { CSSProperties } from "react";

type RGB = [number, number, number];

export type SitePalette = {
  id: string;
  background: RGB;
  surface: RGB;
  bone: RGB;
  muted: RGB;
  accent: RGB;
  accentSoft: RGB;
  stroke: RGB;
  lightInk: RGB;
  lightMuted: RGB;
  lightBorder: RGB;
  paper: RGB;
  sectionBases: RGB[];
};

type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

const sitePalettes: SitePalette[] = [
  {
    id: "oxblood-studio",
    background: [6, 6, 6],
    surface: [16, 16, 19],
    bone: [244, 238, 228],
    muted: [170, 163, 156],
    accent: [122, 34, 46],
    accentSoft: [184, 145, 96],
    stroke: [36, 36, 41],
    lightInk: [22, 18, 16],
    lightMuted: [92, 82, 74],
    lightBorder: [208, 195, 178],
    paper: [248, 241, 233],
    sectionBases: [
      [248, 243, 236],
      [242, 234, 223],
      [238, 229, 218],
      [244, 237, 229],
      [237, 229, 220],
      [242, 235, 230],
      [234, 226, 217],
      [245, 239, 233],
    ],
  },
  {
    id: "sepia-parlor",
    background: [7, 7, 7],
    surface: [18, 17, 15],
    bone: [245, 239, 229],
    muted: [173, 166, 156],
    accent: [108, 66, 43],
    accentSoft: [181, 147, 104],
    stroke: [39, 37, 33],
    lightInk: [27, 22, 17],
    lightMuted: [96, 86, 77],
    lightBorder: [211, 199, 183],
    paper: [247, 241, 233],
    sectionBases: [
      [248, 244, 238],
      [244, 237, 228],
      [239, 231, 221],
      [245, 239, 232],
      [240, 232, 223],
      [244, 238, 233],
      [236, 228, 218],
      [246, 241, 235],
    ],
  },
  {
    id: "olive-atelier",
    background: [7, 7, 8],
    surface: [18, 19, 18],
    bone: [241, 238, 229],
    muted: [167, 164, 154],
    accent: [75, 87, 64],
    accentSoft: [166, 150, 112],
    stroke: [35, 38, 35],
    lightInk: [22, 22, 18],
    lightMuted: [88, 86, 75],
    lightBorder: [202, 199, 184],
    paper: [242, 241, 232],
    sectionBases: [
      [244, 243, 236],
      [237, 236, 227],
      [232, 231, 223],
      [240, 238, 231],
      [235, 233, 225],
      [241, 239, 233],
      [231, 230, 221],
      [243, 242, 235],
    ],
  },
  {
    id: "slate-studio",
    background: [7, 7, 9],
    surface: [17, 18, 21],
    bone: [239, 238, 234],
    muted: [165, 165, 163],
    accent: [62, 75, 101],
    accentSoft: [160, 149, 123],
    stroke: [36, 38, 43],
    lightInk: [23, 23, 26],
    lightMuted: [87, 87, 92],
    lightBorder: [202, 202, 207],
    paper: [242, 241, 239],
    sectionBases: [
      [245, 244, 241],
      [238, 238, 235],
      [233, 233, 232],
      [240, 239, 236],
      [235, 235, 233],
      [241, 240, 238],
      [231, 232, 232],
      [244, 243, 240],
    ],
  },
  {
    id: "copper-ink",
    background: [7, 6, 6],
    surface: [20, 18, 17],
    bone: [245, 238, 229],
    muted: [171, 163, 155],
    accent: [126, 74, 54],
    accentSoft: [190, 149, 102],
    stroke: [39, 35, 33],
    lightInk: [30, 23, 19],
    lightMuted: [101, 86, 78],
    lightBorder: [213, 197, 180],
    paper: [247, 240, 232],
    sectionBases: [
      [248, 243, 236],
      [243, 235, 225],
      [239, 230, 221],
      [245, 238, 231],
      [240, 231, 223],
      [244, 237, 231],
      [236, 226, 217],
      [246, 240, 234],
    ],
  },
];

const sectionGlowPositions = [
  "16% 14%",
  "84% 18%",
  "22% 24%",
  "78% 22%",
  "14% 78%",
  "78% 18%",
  "82% 24%",
  "18% 20%",
] as const;

const sectionFlarePositions = [
  "84% 16%",
  "18% 72%",
  "74% 26%",
  "16% 24%",
  "80% 72%",
  "26% 18%",
  "18% 78%",
  "82% 28%",
] as const;

function rgb(color: RGB) {
  return color.join(" ");
}

function rgba(color: RGB, alpha: number) {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

function shift(color: RGB, amount: number): RGB {
  return color.map((channel) => Math.max(0, Math.min(255, channel + amount))) as RGB;
}

function createSurfaceBackground(
  base: RGB,
  accent: RGB,
  accentSoft: RGB,
  index: number,
) {
  const glowTone = index % 2 === 0 ? accentSoft : accent;
  const flareTone = index % 3 === 0 ? accent : accentSoft;

  return [
    `radial-gradient(circle at ${sectionGlowPositions[index]}, ${rgba([255, 255, 255], 0.56)}, transparent 22%)`,
    `radial-gradient(circle at ${sectionFlarePositions[index]}, ${rgba(glowTone, 0.08)}, transparent 20%)`,
    `linear-gradient(180deg, ${rgba(shift(base, 7), 0.96)}, ${rgba(base, 0.98)})`,
    `linear-gradient(135deg, ${rgba(flareTone, 0.04)}, transparent 42%)`,
    `rgb(${base.join(", ")})`,
  ].join(", ");
}

export function pickRandomSitePalette() {
  return sitePalettes[Math.floor(Math.random() * sitePalettes.length)];
}

export function createSiteThemeStyle(palette: SitePalette) {
  const style: ThemeStyle = {
    "--theme-background-rgb": rgb(palette.background),
    "--theme-surface-rgb": rgb(palette.surface),
    "--theme-bone-rgb": rgb(palette.bone),
    "--theme-muted-rgb": rgb(palette.muted),
    "--theme-accent-rgb": rgb(palette.accent),
    "--theme-accent-soft-rgb": rgb(palette.accentSoft),
    "--theme-stroke-rgb": rgb(palette.stroke),
    "--theme-light-ink-rgb": rgb(palette.lightInk),
    "--theme-light-muted-rgb": rgb(palette.lightMuted),
    "--theme-light-border-rgb": rgb(palette.lightBorder),
    "--theme-paper-rgb": rgb(palette.paper),
    "--theme-hero-glow":
      `radial-gradient(circle at top left, ${rgba(palette.accent, 0.24)}, transparent 28%), ` +
      `radial-gradient(circle at bottom right, ${rgba(palette.accentSoft, 0.16)}, transparent 24%)`,
    "--theme-image-overlay":
      `linear-gradient(180deg, ${rgba([0, 0, 0], 0.76)}, ${rgba([0, 0, 0], 0.18)} 55%, transparent), ` +
      `linear-gradient(135deg, ${rgba(palette.accent, 0.2)}, transparent 42%)`,
    "--theme-image-overlay-soft":
      `linear-gradient(180deg, ${rgba([0, 0, 0], 0.68)}, ${rgba([0, 0, 0], 0.08)} 52%, transparent), ` +
      `linear-gradient(135deg, ${rgba(palette.accentSoft, 0.16)}, transparent 46%)`,
    "--theme-banner-overlay":
      `linear-gradient(90deg, ${rgba([0, 0, 0], 0.9)}, ${rgba([0, 0, 0], 0.56)} 45%, ${rgba([0, 0, 0], 0.72)}), ` +
      `radial-gradient(circle at 78% 22%, ${rgba(palette.accentSoft, 0.14)}, transparent 22%), ` +
      `linear-gradient(135deg, ${rgba(palette.accent, 0.18)}, transparent 40%)`,
  };

  palette.sectionBases.forEach((base, index) => {
    style[`--theme-section-surface-${index + 1}`] = createSurfaceBackground(
      base,
      palette.accent,
      palette.accentSoft,
      index,
    );
  });

  return style;
}
