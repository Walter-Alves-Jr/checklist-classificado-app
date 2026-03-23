import { useBrand } from "./useBrand";

export function useTwTheme() {
  const { colors, logo, name } = useBrand();

  const { backgroundPrimary, backgroundSecondary, textPrimary, textSecondary } =
    colors;

  return {
    bgPrimary: { backgroundColor: backgroundPrimary ?? "#ff3e04" },
    bgSecondary: { backgroundColor: backgroundSecondary ?? "#242424" },
    textPrimary: { color: textPrimary ?? "#e5e7eb" },
    textSecondary: { color: textSecondary ?? "#242424" },
    logo,
    name,
  };
}
