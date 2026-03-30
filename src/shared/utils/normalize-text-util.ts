export const toLowerAndTrim = (text: string) => text.trim().toLowerCase();

export function toLowerNoAccentAndSpace(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();
}
