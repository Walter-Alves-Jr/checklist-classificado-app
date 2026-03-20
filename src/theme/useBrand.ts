import { useTheme } from "./ThemeProvider";

export function useBrand() {
  const { theme, client } = useTheme();

  return {
    colors: {
      primary: theme?.primary,
      secondary: theme?.secondary,
      background: theme?.background,
      text: theme?.text,
    },
    logo: client?.logo,
    name: client?.name,
  };
}
