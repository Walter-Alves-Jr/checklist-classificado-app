import { useTwTheme } from "./useTwTheme";

export function useBrand() {
  const { theme, logo, nome } = useTwTheme();
  const { background, text, color } = theme;

  return {
    background: {
      primary: {
        backgroundColor: background.primary,
      },
      secondary: {
        backgroundColor: background.secondary,
      },
    },
    text: {
      primary: { color: text.primary },
      secondary: { color: text.secondary },
      tertiary: { color: text.tertiary },
    },
    color: {
      primary: color.primary,
      secondary: color.secondary,
      tertiary: color.tertiary,
    },
    logo,
    nome,
  };
}
