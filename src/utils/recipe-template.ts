/**
 * Recipe template parser and validator.
 * Requirements: 7.1
 */

export interface RecipeTemplate {
  name: string;
  regionalClassification: string;
  dietaryTags: string;
  ingredients: string;
  substitutionsApplied: string;
  steps: string;
}

export interface ParseResult {
  valid: boolean;
  recipe: RecipeTemplate | null;
  missingSections: string[];
}

const REQUIRED_SECTIONS = [
  "Regional Classification",
  "Dietary Tags",
  "Ingredients",
  "Substitutions Applied",
  "Steps",
] as const;

/**
 * Parses a recipe Markdown string and extracts all required sections.
 * Validates that every required section is present and non-empty.
 *
 * @param markdown - Raw Markdown content of a recipe file
 * @returns ParseResult with validity, parsed recipe, and any missing sections
 */
export function parseRecipeTemplate(markdown: string): ParseResult {
  const missingSections: string[] = [];

  // Extract recipe name from the first H1 heading
  const nameMatch = markdown.match(/^#\s+(.+)$/m);
  const name = nameMatch ? nameMatch[1].trim() : "";

  if (!name) {
    missingSections.push("Recipe Name");
  }

  // Extract each required H2 section's content
  const sectionContents: Record<string, string> = {};

  for (const section of REQUIRED_SECTIONS) {
    const content = extractSection(markdown, section);
    if (content === null || content.trim() === "") {
      missingSections.push(section);
    } else {
      sectionContents[section] = content.trim();
    }
  }

  if (missingSections.length > 0) {
    return { valid: false, recipe: null, missingSections };
  }

  return {
    valid: true,
    recipe: {
      name,
      regionalClassification: sectionContents["Regional Classification"],
      dietaryTags: sectionContents["Dietary Tags"],
      ingredients: sectionContents["Ingredients"],
      substitutionsApplied: sectionContents["Substitutions Applied"],
      steps: sectionContents["Steps"],
    },
    missingSections: [],
  };
}

/**
 * Extracts the content under a given H2 section heading.
 * Returns null if the section heading is not found.
 */
function extractSection(markdown: string, sectionName: string): string | null {
  const escaped = escapeRegex(sectionName);

  // Match the H2 heading (case-insensitive) and capture content until the next H1/H2 or end of string
  const pattern = new RegExp(
    `^##\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=^#{1,2}\\s|\\s*$)`,
    "mi"
  );
  const match = markdown.match(pattern);
  if (!match) return null;

  // For the last section, the lazy match with end-of-string might grab too little.
  // Fall back to greedy capture if the lazy one is empty.
  if (match[1].trim() === "") {
    const greedyPattern = new RegExp(
      `^##\\s+${escaped}\\s*\\n([\\s\\S]*)$`,
      "mi"
    );
    const greedyMatch = markdown.match(greedyPattern);
    return greedyMatch ? greedyMatch[1] : null;
  }

  return match[1];
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Formats a RecipeTemplate back into Markdown string.
 * Useful for round-trip testing.
 */
export function formatRecipeTemplate(recipe: RecipeTemplate): string {
  return [
    `# ${recipe.name}`,
    "",
    "## Regional Classification",
    recipe.regionalClassification,
    "",
    "## Dietary Tags",
    recipe.dietaryTags,
    "",
    "## Ingredients",
    recipe.ingredients,
    "",
    "## Substitutions Applied",
    recipe.substitutionsApplied,
    "",
    "## Steps",
    recipe.steps,
  ].join("\n");
}
