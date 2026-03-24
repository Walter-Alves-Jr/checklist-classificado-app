import { useTwTheme } from "./useTwTheme";

export function useBrand() {
  const { colors, logo, name } = useTwTheme();

  const {
    backgroundPrimary,
    backgroundSecondary,
    textPrimary,
    textSecondary,
    textTertiary,
  } = colors;

  return {
    bgPrimary: {
      backgroundColor: backgroundPrimary,
    },
    bgSecondary: {
      backgroundColor: backgroundSecondary,
    },
    textPrimary: { color: textPrimary },
    textSecondary: { color: textSecondary },
    textTertiary: { color: textTertiary },
    logo,
    name,
  };
}
