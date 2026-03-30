import { useTwTheme } from "./useTwTheme";

export function useBrand() {
  const { theme, logo, name } = useTwTheme();
  const { background, text, color } = theme;

  return {
    background: {
      orange: {
        backgroundColor: background.orange,
      },
      grayDark: {
        backgroundColor: background.grayDark,
      },
    },
    text: {
      grayLight: { color: text.textGrayLight },
      grayDark: { color: text.textGrayDark },
      orange: { color: text.textOrange },
    },
    color: {
      orange: color.orange,
      grayLight: color.grayLight,
      grayDark: color.grayDark,
    },
    logo,
    name,
  };
}
