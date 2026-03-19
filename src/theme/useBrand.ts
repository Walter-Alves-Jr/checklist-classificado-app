import { useTheme } from "./ThemeProvider";

export function useBrand() {
  const { client } = useTheme();

  return {
    colors: {
      primary: client?.theme.primary,
      secondary: client?.theme.secondary,
      background: client?.theme.background,
      text: client?.theme.text,
    },
    logo: client?.logo,
    name: client?.name,
  };
}
