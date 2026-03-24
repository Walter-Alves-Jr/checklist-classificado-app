import { app_colors } from "../shared/consts";
import { useTheme } from "./ThemeProvider";

export function useTwTheme() {
  const { theme, client } = useTheme();

  return {
    colors: {
      backgroundPrimary:
        theme?.backgroundPrimary ?? app_colors.background.primary,
      backgroundSecondary:
        theme?.backgroundSecondary ?? app_colors.background.secondary,
      textPrimary: theme?.textPrimary ?? app_colors.text.primary,
      textSecondary: theme?.textSecondary ?? app_colors.text.secondary,
      textTertiary: theme?.textTertiary ?? app_colors.text.tertiary,
    },
    logo: client?.logo,
    name: client?.name,
  };
}
