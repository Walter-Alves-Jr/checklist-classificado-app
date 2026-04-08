import { palette } from "../shared/consts/app-colors";
import { useTheme } from "./ThemeProvider";

export function useTwTheme() {
  const { theme } = useTheme();
  const { orange, grayDark, grayLight } = palette;

  return {
    theme: {
      background: {
        primary: theme?.backgroundPrimary ?? orange,
        secondary: grayDark,
      },
      text: {
        primary: theme?.textPrimary ?? grayLight,
        secondary: grayDark,
        tertiary: orange,
      },
      color: {
        primary: theme?.backgroundPrimary ?? orange,
        secondary: grayDark,
        tertiary: grayLight,
      },
    },
    logo: theme?.logo,
    nome: theme?.nome,
  };
}
