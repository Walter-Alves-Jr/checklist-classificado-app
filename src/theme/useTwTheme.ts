import { palette } from "../shared/consts/app-colors";
import { useTheme } from "./ThemeProvider";

export function useTwTheme() {
  const { theme, client } = useTheme();
  const { orange, grayDark, grayLight } = palette;

  return {
    theme: {
      background: {
        orange: theme?.backgroundPrimary ?? orange,
        grayDark: theme?.backgroundSecondary ?? grayDark,
      },
      text: {
        textGrayLight: theme?.textPrimary ?? grayLight,
        textGrayDark: theme?.textSecondary ?? grayDark,
        textOrange: theme?.textTertiary ?? orange,
      },
      color: {
        orange: theme?.backgroundPrimary ?? orange,
        grayDark: theme?.backgroundSecondary ?? grayDark,
        grayLight: theme?.backgroundSecondary ?? grayLight,
      },
    },
    logo: client?.logo,
    name: client?.name,
  };
}
