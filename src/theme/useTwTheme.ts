import { useBrand } from "./useBrand";

export function useTwTheme() {
  const { colors, logo, name } = useBrand();

  return {
    bgPrimary: { backgroundColor: colors?.primary ?? "" },
    bgSecondary: { backgroundColor: colors?.secondary ?? "" },
    textPrimary: { color: colors?.text ?? "" },
    borderPrimary: { borderColor: colors?.primary ?? "" },
    logo,
    name,
  };
}
