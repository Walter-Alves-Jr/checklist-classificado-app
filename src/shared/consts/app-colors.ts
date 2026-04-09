export const palette = {
  orange: "#ff3e04",
  grayLight: "#e5e7eb",
  grayDark: "#242424",
  success: "#22c55e",
  error: "#ef4444",
  warning: "#eab308",
  info: "#3b82f6",
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
    secondary: palette.grayDark,
  },
} as const;
