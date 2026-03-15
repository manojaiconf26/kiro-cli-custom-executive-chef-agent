/**
 * Substitution lookup and application logic.
 * Requirements: 9.2, 9.4
 */

export interface SubstitutionAlternative {
  name: string;
  conversionRatio: number;
  notes: string;
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

/**
 * Substitution mappings table — authentic South Indian alternatives.
 * Sourced from the Substitution Skill specification.
 */
const SUBSTITUTION_MAP: ReadonlyMap<string, SubstitutionAlternative[]> = new Map([
  ["tamarind", [
    { name: "Kokum", conversionRatio: 0.5, notes: "Half quantity; common in Kerala/Karnataka" },
    { name: "Amchur (dry mango powder)", conversionRatio: 0.3, notes: "One-third quantity; dry sourness" },
  ]],
  ["coconut milk", [
    { name: "Cashew paste", conversionRatio: 0.75, notes: "Blend cashews with water to paste" },
    { name: "Poppy seed paste", conversionRatio: 0.5, notes: "Milder, works in korma-style gravies" },
  ]],
  ["curry leaves", [
    { name: "Bay leaves", conversionRatio: 0.2, notes: "Less aromatic; use sparingly" },
  ]],
  ["mustard seeds", [
    { name: "Cumin seeds", conversionRatio: 1, notes: "Different flavor profile, still authentic" },
  ]],
  ["urad dal", [
    { name: "Chana dal", conversionRatio: 1, notes: "Slightly different texture in tempering" },
  ]],
  ["jaggery", [
    { name: "Palm sugar", conversionRatio: 1, notes: "Direct substitute, regional match" },
  ]],
  ["coconut oil", [
    { name: "Sesame oil (gingelly)", conversionRatio: 1, notes: "Traditional South Indian alternative" },
  ]],
  ["toor dal", [
    { name: "Moong dal", conversionRatio: 1, notes: "Lighter texture, cooks faster" },
  ]],
  ["asafoetida (hing)", [
    { name: "Onion powder", conversionRatio: 4, notes: "Use when hing unavailable; different aroma" },
  ]],
  ["fresh coconut", [
    { name: "Desiccated coconut", conversionRatio: 0.5, notes: "Rehydrate with warm water before use" },
  ]],
]);

/**
 * Looks up substitution alternatives for a missing ingredient.
 * Matching is case-insensitive.
 *
 * @param ingredientName - The name of the missing ingredient
 * @returns Array of alternatives (empty if no mapping exists)
 */
export function lookupSubstitution(ingredientName: string): SubstitutionAlternative[] {
  const normalized = ingredientName.trim().toLowerCase();
  return SUBSTITUTION_MAP.get(normalized) ?? [];
}

/**
 * Applies a substitution to an ingredient, replacing its name and
 * adjusting the quantity by the conversion ratio.
 *
 * @param original - The original ingredient with quantity
 * @param alternative - The chosen substitution alternative
 * @returns A new Ingredient with the substitute name and adjusted quantity
 */
export function applySubstitution(
  original: Ingredient,
  alternative: SubstitutionAlternative
): Ingredient {
  return {
    name: alternative.name,
    quantity: original.quantity * alternative.conversionRatio,
    unit: original.unit,
  };
}

/**
 * Returns all known ingredient names that have substitution mappings.
 */
export function getMappedIngredients(): string[] {
  return Array.from(SUBSTITUTION_MAP.keys());
}
