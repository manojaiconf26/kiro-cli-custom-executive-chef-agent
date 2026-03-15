# Requirements Document

## Introduction

The South Indian Executive Chef System is an AI-powered conversational agent built on the Kiro platform that suggests authentic South Indian recipes through natural chat interaction. The user describes what they want — a meal type (breakfast, lunch, dinner), dietary requirements, or available ingredients — and the Executive Chef Agent responds with a curated list of recipe options. The system is implemented as a set of Kiro custom agents orchestrated through steering files, skills, and an agent hook. The Executive Chef Agent generates recipes from its culinary knowledge, checks a local recipe cache for existing matches, enforces regional authenticity, and delegates preparation instructions to a Sous Chef Agent via a hook triggered on recipe file creation.

## Glossary

- **Executive Chef Agent**: The primary Kiro custom agent responsible for conversational recipe suggestions, generating recipes from its culinary knowledge, managing the recipe cache, and orchestrating prep-list generation.
- **Sous Chef Agent**: A secondary Kiro custom agent triggered automatically when a recipe file is written, responsible for producing a detailed preparation list (`prep-list.md`).
- **Kiro Steering File**: A Markdown file in `.kiro/steering/` that provides persistent instructions and context to Kiro agents across all interactions.
- **Kiro Skill**: A reusable, on-demand prompt template that an agent invokes for a specific situational task.
- **Kiro Agent Hook**: An event-driven trigger that automatically initiates an agent execution when a specified event occurs.
- **Recipe Cache**: The `recipes/` folder containing previously generated recipe Markdown files. The Executive Chef Agent checks this folder before generating new recipes.
- **Recipe Template**: A standard Markdown structure that all recipe files follow for consistency.
- **Substitution Skill**: A Kiro Skill invoked by the Executive Chef Agent to suggest authentic regional alternatives when a required ingredient is unavailable.
- **Blocked Ingredient**: An ingredient prohibited from appearing in any recipe (e.g., generic "curry powder").
- **Prep List**: A Markdown file (`prep-list.md`) with exact measurements and sequential preparation instructions.

## Design Decisions

### Conversational Recipe Discovery
The user interacts with the Executive Chef Agent through Kiro chat. There is no pantry file — the user describes their needs conversationally (meal type, dietary requirements, available ingredients). The agent responds with top 5 recipe suggestions mixing cached and new options.

### Recipe Caching with Freshness
Generated recipes are saved to `recipes/` for reuse. When a user's request matches a cached recipe, the agent presents it. If dietary requirements differ from a cached recipe, the agent generates a new version.

### Single Hook: Recipe Completion
One Kiro Agent Hook automates the pipeline: when a recipe file is written to `recipes/`, the Sous Chef Agent is triggered to generate `prep-list.md`. No pantry file hook is needed.

### Kiro Feature Mapping
- **Custom Agents**: Executive Chef (conversational recipe generation) and Sous Chef (prep-list generation).
- **Steering Files**: Persistent rules — Executive Chef steering defines conversational behavior, authenticity rules, caching logic. Sous Chef steering defines prep-list formatting.
- **Skills**: Substitution Skill — invoked on-demand when an ingredient is unavailable.
- **Agent Hook**: Recipe file write triggers Sous Chef automatically.

### Crisp Hints Over Prose
All Markdown files for steering, skills, and hook configs use concise bullet points, short directives, and structured formats (tables, lists) instead of paragraphs. This optimizes context window usage, reduces hallucination risk, and keeps agent responses fast and focused. Think cheat sheets, not essays.

### Skills vs Steering vs Tools
- **Steering** = always-on rules applied to every interaction. Agent personality, constraints, default behavior.
- **Skills** = situational prompt templates invoked only when needed. Focused, self-contained, reusable.
- **Tools** = executable functions (MCP/built-in Kiro tools). This project uses built-in file tools; no custom MCP tools needed.

## Requirements

### Requirement 1: Kiro Agent Configuration

**User Story:** As a developer, I want the Executive Chef and Sous Chef implemented as Kiro custom agents with steering files, so that each agent has clear, persistent behavioral instructions.

#### Acceptance Criteria

1. WHEN the workspace is set up, THE system SHALL contain a Kiro Steering File for the Executive Chef Agent at `.kiro/steering/executive-chef.md` that defines the agent's conversational role, regional authenticity rules, recipe caching behavior, and orchestration responsibilities.
2. WHEN the workspace is set up, THE system SHALL contain a Kiro Steering File for the Sous Chef Agent at `.kiro/steering/sous-chef.md` that defines the agent's role in generating prep lists with exact measurements and step-by-step instructions.
3. WHEN the Executive Chef Agent Steering File is loaded, THE Kiro platform SHALL apply the steering instructions to all Executive Chef Agent interactions within the workspace.
4. WHEN the Sous Chef Agent Steering File is loaded, THE Kiro platform SHALL apply the steering instructions to all Sous Chef Agent interactions within the workspace.

### Requirement 2: Kiro Skills

**User Story:** As a developer, I want a reusable skill for substitution logic, so that agent capabilities are modular and maintainable.

#### Acceptance Criteria

1. WHEN the workspace is set up, THE system SHALL contain a Substitution Skill file that defines how to find authentic regional alternatives for missing ingredients, including the input format (missing ingredient name and regional classification) and the expected output format (list of alternatives with conversion ratios).
2. WHEN the Executive Chef Agent requires a substitution, THE Executive Chef Agent SHALL invoke the Substitution Skill by referencing the skill file in its steering context.

### Requirement 3: Kiro Agent Hook

**User Story:** As a developer, I want an agent hook to automate prep-list generation when a recipe is saved, so that the Sous Chef runs automatically.

#### Acceptance Criteria

1. WHEN a recipe file is written or updated in the `recipes/` folder, THE system SHALL have a Kiro Agent Hook configured to trigger the Sous Chef Agent automatically.
2. WHEN the Kiro Agent Hook triggers the Sous Chef Agent, THE hook SHALL pass the recipe file path as context to the Sous Chef Agent.

### Requirement 4: Conversational Recipe Requests

**User Story:** As a home cook, I want to ask for recipes conversationally by describing my meal type, dietary needs, or available ingredients, so that I get personalized suggestions without managing files.

#### Acceptance Criteria

1. WHEN a user requests a recipe by specifying a meal type (breakfast, lunch, or dinner), THE Executive Chef Agent SHALL generate recipe suggestions appropriate for that meal type.
2. WHEN a user provides dietary requirements (e.g., vegetarian, vegan, gluten-free), THE Executive Chef Agent SHALL generate recipe suggestions that comply with the stated dietary constraints.
3. WHEN a user lists available ingredients in the chat message, THE Executive Chef Agent SHALL prioritize recipes that use those ingredients and minimize additional ingredients not listed by the user.
4. WHEN the Executive Chef Agent has recipe suggestions ready, THE Executive Chef Agent SHALL present the top 5 recipes as a numbered list with the recipe name, a one-line description, and an indication of whether the recipe is from the cache or newly generated.
5. WHEN the user selects a recipe from the suggested list, THE Executive Chef Agent SHALL write the full recipe to the `recipes/` folder using the standard Recipe Template.

### Requirement 5: Regional Flavor Authenticity

**User Story:** As a home cook, I want the system to enforce authentic South Indian spice usage, so that every suggested recipe reflects genuine regional cooking practices.

#### Acceptance Criteria

1. WHEN the Executive Chef Agent generates a recipe, THE Executive Chef Agent SHALL include only individual spices (such as mustard seeds, urad dal, and curry leaves) in the recipe's ingredient list.
2. WHEN the Executive Chef Agent generates a recipe, THE Executive Chef Agent SHALL verify that the ingredient list does not contain any Blocked Ingredient before presenting the recipe to the user.

### Requirement 6: Recipe Caching and Reuse

**User Story:** As a home cook, I want previously generated recipes saved and reused when appropriate, so that the system builds a growing collection of my South Indian dishes.

#### Acceptance Criteria

1. WHEN the Executive Chef Agent generates a new recipe, THE Executive Chef Agent SHALL save the recipe as a Markdown file in the `recipes/` folder using the recipe name as the filename (e.g., `recipes/sambar.md`).
2. WHEN a user requests a recipe, THE Executive Chef Agent SHALL check the `recipes/` folder for existing recipe files that match the user's request before generating new recipes.
3. WHEN an existing cached recipe matches the user's request and dietary requirements, THE Executive Chef Agent SHALL include the cached recipe in the top 5 suggestions and indicate it is from the cache.
4. WHEN a cached recipe exists but the user's dietary requirements differ from the cached version, THE Executive Chef Agent SHALL generate a new recipe variant and save it as a separate file.

### Requirement 7: Standard Recipe Template

**User Story:** As a home cook, I want all recipes to follow a consistent format, so that I can easily read and compare different dishes.

#### Acceptance Criteria

1. WHEN the Executive Chef Agent writes a recipe to the `recipes/` folder, THE Executive Chef Agent SHALL follow the standard Recipe Template containing these sections in order: recipe name heading, regional classification, dietary tags, ingredients list, substitutions applied, and numbered preparation steps.
2. WHEN the Sous Chef Agent reads a recipe file, THE Sous Chef Agent SHALL parse the recipe using the standard Recipe Template structure to extract ingredients and steps.

### Requirement 8: Mise en Place Automation

**User Story:** As a home cook, I want automatic preparation instructions after a recipe is saved, so that I can follow a clear, measured plan without extra effort.

#### Acceptance Criteria

1. WHEN a recipe file is written to the `recipes/` folder, THE Sous Chef Agent SHALL be triggered automatically via the Kiro Agent Hook to generate a Prep List.
2. WHEN the Sous Chef Agent receives a recipe, THE Sous Chef Agent SHALL generate a Prep List containing one entry per ingredient with the ingredient name, exact measurement, and preparation action.
3. WHEN the Sous Chef Agent generates the Prep List, THE Sous Chef Agent SHALL write the output to `prep-list.md` in Markdown format with a heading, an ingredient section, and a numbered steps section.
4. IF the Sous Chef Agent fails to generate the Prep List, THEN THE Executive Chef Agent SHALL return an error message identifying the recipe name and the nature of the failure.

### Requirement 9: Smart Substitutions

**User Story:** As a home cook, I want the system to suggest authentic alternatives when an ingredient is unavailable, so that I can still prepare a traditional dish.

#### Acceptance Criteria

1. WHEN the Executive Chef Agent identifies that a user does not have a required ingredient, THE Executive Chef Agent SHALL invoke the Substitution Skill with the missing ingredient name and the recipe's regional classification.
2. WHEN the Substitution Skill receives a missing ingredient request, THE Substitution Skill SHALL return a list of one or more authentic regional alternatives, each with a name and a conversion ratio relative to the original ingredient.
3. WHEN the Substitution Skill finds no valid alternative for a missing ingredient, THE Substitution Skill SHALL return an empty list and THE Executive Chef Agent SHALL display a message identifying the ingredient for which no substitution exists.
4. WHEN the Executive Chef Agent applies a substitution, THE Executive Chef Agent SHALL replace the missing ingredient in the recipe's ingredient list with the chosen alternative and adjust the quantity using the conversion ratio.

### Requirement 10: Transaction Logging

**User Story:** As a developer, I want each agent interaction logged to a transaction log file, so that I can review what happened, which files were accessed, and what decisions were made.

#### Acceptance Criteria

1. WHEN the Executive Chef Agent completes a recipe interaction, THE Executive Chef Agent SHALL append a transaction entry to `logs/transaction-log.md` containing: timestamp, user request summary, files read, files written, recipes suggested, recipe selected, substitutions applied, and any errors encountered.
2. WHEN the Sous Chef Agent completes a prep-list generation, THE Sous Chef Agent SHALL append a transaction entry to `logs/transaction-log.md` containing: timestamp, recipe file read, prep-list file written, and any errors encountered.
3. WHEN a transaction entry is appended, THE agent SHALL follow a consistent structured format using a Markdown table row or bullet list for each entry.
