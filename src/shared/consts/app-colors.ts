export const palette = {
  orange: "#ff3e04",
  grayLight: "#e5e7eb",
  grayDark: "#242424",
} as const;

export const app_colors = {
  text: {
    primary: palette.grayLight,
    secondary: palette.grayDark,
    tertiary: palette.orange,
  },

  background: {
    primary: palette.orange,
    secondary: palette.grayDark,
  },

  color: {
    primary: palette.grayLight,
  },
} as const;
