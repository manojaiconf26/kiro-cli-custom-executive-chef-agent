# Requirements: South Indian Executive Chef System

## User Story
As a home cook, I want a regional AI chef to suggest authentic South Indian recipes based on my pantry, so I can reduce waste while eating traditional meals.

## Acceptance Criteria (EARS Notation)

### AC 1: Regional Flavor Authenticity
- **WHEN** the Executive Chef suggests a recipe, 
- **THE SYSTEM SHALL** only use individual spices (mustard seeds, urad dal, curry leaves) and strictly forbid generic "curry powder."

### AC 2: Pantry-Driven Suggestions
- **WHEN** a user requests a recipe, 
- **THE SYSTEM SHALL** cross-reference `my-pantry.json` and prioritize dishes that use existing ingredients.

### AC 3: Mise en Place Automation
- **WHEN** the Executive Chef finishes a menu suggestion, 
- **THE SYSTEM SHALL** trigger the Sous Chef agent to generate a `prep-list.md` with exact measurements and step-by-step prep instructions.

### AC 4: Smart Substitutions
- **WHEN** a core ingredient (e.g., Tamarind) is missing from the pantry, 
- **THE SYSTEM SHALL** invoke the "Substitution Skill" to suggest an authentic alternative (e.g., Kokum or Amchur).