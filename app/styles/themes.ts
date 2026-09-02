import * as stylex from "@stylexjs/stylex"

import { colors, syntax } from "./tokens.stylex"

export const darkTheme = stylex.createTheme(colors, {
  page: "oklch(0.1448 0 0)",
  surface: "oklch(0.1822 0 0)",
  surfaceMuted: "oklch(0.229 0 0)",
  surfaceEmphasis: "oklch(0.269 0 0)",
  border: "oklch(1 0 0 / 10%)",
  borderStrong: "oklch(1 0 0 / 18%)",
  text: "oklch(0.985 0 0)",
  textMuted: "color-mix(in oklch, oklch(0.985 0 0) 60%, transparent)",
  textSoft: "color-mix(in oklch, oklch(0.985 0 0) 45%, transparent)",
  link: "#93c5fd",
  linkHover: "#bfdbfe",
  homeLink: "#47a8ff",
  tocActive: "#3291ff",
  accent: "#60a5fa",
  accentSoft: "oklch(0.269 0.06 264)",
  accentBorder: "#1d4ed8",
  codeBg: "oklch(0.229 0 0)",
  codeBorder: "oklch(1 0 0 / 12%)",
  preBg: "oklch(0.1448 0 0)",
  preBorder: "oklch(1 0 0 / 12%)",
  preText: "oklch(0.985 0 0)",
  highlight: "rgb(250 204 21 / 0.18)",
  selection: "rgb(250 204 21 / 0.35)",
  scrollbarTrack: "oklch(0.229 0 0)",
  scrollbarThumb: "oklch(0.45 0 0)",
  scrollbarThumbHover: "oklch(0.55 0 0)",
  scrollbarPair: "oklch(0.45 0 0) oklch(0.229 0 0)",
  scrollbarPairClear: "oklch(0.45 0 0) transparent",
  successSoft: "#052e16",
  successBorder: "#166534",
  successText: "#86efac",
  warningSoft: "#451a03",
  warningBorder: "#92400e",
  warningText: "#fcd34d",
  dangerSoft: "#450a0a",
  dangerBorder: "#991b1b",
  dangerText: "#fca5a5",
  infoSoft: "#172554",
  infoBorder: "#1d4ed8",
  infoText: "#93c5fd",
  linkDecoration:
    "color-mix(in srgb, color-mix(in oklch, oklch(0.985 0 0) 45%, transparent) 55%, transparent)",
})

export const darkSyntax = stylex.createTheme(syntax, {
  "--sh-comment": "#b4b4b4",
})

export function darkThemeClassName(): string {
  return stylex.props(darkTheme, darkSyntax).className ?? ""
}
