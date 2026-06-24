export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function centsToEuros(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

export function eurosToCents(euros: string): number {
  return Math.round(parseFloat(euros.replace(",", ".")) * 100);
}

const JOURS = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
] as const;

export function jourLabel(jour: number | null): string {
  if (jour === null || jour < 0 || jour > 6) return "—";
  return JOURS[jour];
}
