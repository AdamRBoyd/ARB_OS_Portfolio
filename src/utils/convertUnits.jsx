import { UNIT_CATEGORIES } from "@constants/unitConversions";

export function convert(categoryKey, value, fromUnitKey, toUnitKey) {
  const cat = UNIT_CATEGORIES[categoryKey];
  if (!cat) throw new Error(`Unknown category: ${categoryKey}`);

  const from = cat.units[fromUnitKey];
  const to = cat.units[toUnitKey];
  if (!from || !to) throw new Error(`Unknown unit key(s) for ${categoryKey}`);

  const n = Number(value);
  if (!Number.isFinite(n)) return NaN;

  if (cat.type === "affine") {
    const base = from.toBase(n);
    return to.fromBase(base);
  }

  // factor-based
  const base = n * from.factor;   // to base
  return base / to.factor;        // from base
}