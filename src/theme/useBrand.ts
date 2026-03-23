import { useTheme } from "./ThemeProvider";

export function useBrand() {
  const { theme, client } = useTheme();

  return {
    colors: {
      backgroundPrimary: theme?.backgroundPrimary,
      backgroundSecondary: theme?.backgroundSecondary,
      textPrimary: theme?.textPrimary,
      textSecondary: theme?.textSecondary,
    },
    logo: client?.logo,
    name: client?.name,
  };
}
