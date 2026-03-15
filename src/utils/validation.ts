/**
 * Blocked ingredient validation for the Executive Chef Agent.
 * Requirements: 5.1, 5.2
 */

const BLOCKED_INGREDIENTS: ReadonlySet<string> = new Set([
  "curry powder",
  "garam masala",
  "mixed spice powder",
  "all-purpose seasoning",
]);

export interface ValidationResult {
  valid: boolean;
  blockedFound: string[];
}

/**
 * Checks an ingredient list against the blocked ingredient set.
 * Matching is case-insensitive.
 *
 * @param ingredients - Array of ingredient names to validate
 * @returns ValidationResult with validity flag and any blocked ingredients found
 */
export function validateIngredients(ingredients: string[]): ValidationResult {
  const blockedFound: string[] = [];

  for (const ingredient of ingredients) {
    const normalized = ingredient.trim().toLowerCase();
    if (BLOCKED_INGREDIENTS.has(normalized)) {
      blockedFound.push(ingredient);
    }
  }

  return {
    valid: blockedFound.length === 0,
    blockedFound,
  };
}

/**
 * Returns the set of blocked ingredient names (lowercase).
 */
export function getBlockedIngredients(): ReadonlySet<string> {
  return BLOCKED_INGREDIENTS;
}
