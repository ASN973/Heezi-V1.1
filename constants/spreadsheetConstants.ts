import { isMobile } from "@/utils/isMobile";

const darkBgStyle = { backgroundColor: "#989898" };
export const RIBBON_TABS_MOBILE = [
  { label: "Accueil" },
  { label: "Insertion" },
];
export const RIBBON_TABS_DESKTOP = [
  ...RIBBON_TABS_MOBILE,
  { label: "Dessin", style: darkBgStyle },
  { label: "Conception", style: darkBgStyle },
  { label: "Mise en page" },
  { label: "Références" },
  { label: "Publipostage", style: darkBgStyle },
  { label: "Révision" },
  { label: "Affichage", style: darkBgStyle },
];

const COLUMNS_MOBILE = ["A", "B", "C"];

const COLUMNS_DESKTOP = [
  ...COLUMNS_MOBILE,
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];

export const COLUMNS = isMobile ? COLUMNS_MOBILE : COLUMNS_DESKTOP;

export const ROWS = Array.from({ length: 10 }, (_, i) => i + 1);
