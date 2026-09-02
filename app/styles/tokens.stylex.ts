import * as stylex from "@stylexjs/stylex"

export const colors = stylex.defineVars({
  page: "oklch(0.9911 0 0)",
  surface: "oklch(1 0 0)",
  surfaceMuted: "oklch(0.97 0 0)",
  surfaceEmphasis: "oklch(0.97 0 0)",
  border: "oklch(0.922 0 0)",
  borderStrong: "oklch(0.85 0 0)",
  text: "oklch(0.145 0 0)",
  textMuted: "color-mix(in oklch, oklch(0.145 0 0) 70%, transparent)",
  textSoft: "color-mix(in oklch, oklch(0.145 0 0) 55%, transparent)",
  link: "#1d4ed8",
  linkHover: "#1e40af",
  homeLink: "#0070f3",
  tocActive: "#0070f3",
  accent: "#2563eb",
  accentSoft: "#dbeafe",
  accentBorder: "#93c5fd",
  codeBg: "oklch(0.97 0 0)",
  codeBorder: "oklch(0.922 0 0)",
  preBg: "oklch(0.205 0 0)",
  preBorder: "oklch(0.269 0 0)",
  preText: "oklch(0.985 0 0)",
  highlight: "rgb(254 249 195)",
  selection: "rgb(255 235 59 / 0.8)",
  scrollbarTrack: "oklch(0.97 0 0)",
  scrollbarThumb: "oklch(0.85 0 0)",
  scrollbarThumbHover: "oklch(0.75 0 0)",
  scrollbarPair: "oklch(0.85 0 0) oklch(0.97 0 0)",
  scrollbarPairClear: "oklch(0.85 0 0) transparent",
  successSoft: "#dcfce7",
  successBorder: "#86efac",
  successText: "#166534",
  warningSoft: "#fef3c7",
  warningBorder: "#fcd34d",
  warningText: "#92400e",
  dangerSoft: "#fee2e2",
  dangerBorder: "#fca5a5",
  dangerText: "#b91c1c",
  infoSoft: "#dbeafe",
  infoBorder: "#93c5fd",
  infoText: "#1d4ed8",
  linkDecoration:
    "color-mix(in srgb, color-mix(in oklch, oklch(0.145 0 0) 55%, transparent) 55%, transparent)",
})

export const syntax = stylex.defineVars({
  "--sh-class": "#7aa2f7",
  "--sh-sign": "#89ddff",
  "--sh-string": "#9ece6a",
  "--sh-keyword": "#bb9af7",
  "--sh-comment": "#565f89",
  "--sh-jsxliterals": "#7aa2f7",
  "--sh-property": "#73daca",
  "--sh-entity": "#e0af68",
})

export const fonts = stylex.defineVars({
  sans: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  serif: "var(--font-instrument-serif), ui-serif, Georgia, serif",
})

export const breakpoints = stylex.defineConsts({
  sm: "@media (min-width: 640px)",
  lg: "@media (min-width: 1024px)",
  xl: "@media (min-width: 1280px)",
  xl2: "@media (min-width: 1536px)",
  maxMd: "@media (max-width: 767px)",
  hoverFine: "@media (hover: hover) and (pointer: fine)",
})
