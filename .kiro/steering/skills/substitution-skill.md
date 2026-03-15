---
name: substitution-skill
description: Find authentic South Indian alternatives for missing ingredients. Use when a user says an ingredient is unavailable.
---

# Substitution Skill

## Purpose
- Find authentic South Indian alternatives for missing ingredients
- Invoked by Executive Chef Agent when user says an ingredient is unavailable

## Input
- Missing ingredient name
- Regional classification of the recipe (Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, Telangana)

## Output
- List of alternatives with name + conversion ratio
- Empty list if no valid substitute exists

## Substitution Mappings

| Missing Ingredient | Alternative | Ratio (original:substitute) | Notes |
|---|---|---|---|
| Tamarind | Kokum | 1:0.5 | Half quantity; common in Kerala/Karnataka |
| Tamarind | Amchur (dry mango powder) | 1:0.3 | One-third quantity; dry sourness |
| Coconut milk | Cashew paste | 1:0.75 | Blend cashews with water to paste |
| Coconut milk | Poppy seed paste | 1:0.5 | Milder, works in korma-style gravies |
| Curry leaves | Bay leaves | 10:2 | Less aromatic; use sparingly |
| Mustard seeds | Cumin seeds | 1:1 | Different flavor profile, still authentic |
| Urad dal | Chana dal | 1:1 | Slightly different texture in tempering |
| Jaggery | Palm sugar | 1:1 | Direct substitute, regional match |
| Coconut oil | Sesame oil (gingelly) | 1:1 | Traditional South Indian alternative |
| Toor dal | Moong dal | 1:1 | Lighter texture, cooks faster |
| Asafoetida (hing) | Onion powder | 0.25 tsp:1 tsp | Use when hing unavailable; different aroma |
| Fresh coconut | Desiccated coconut | 1 cup:0.5 cup | Rehydrate with warm water before use |

## Behavior Rules
- Match missing ingredient against the table above (case-insensitive)
- Return ALL matching alternatives for the ingredient, not just the first
- Each alternative MUST include: name, conversion ratio, notes
- Unmapped ingredient → return empty list
- Empty list → Executive Chef tells user: "No authentic substitute available for {ingredient}"
- Substitutes MUST be regionally appropriate for South Indian cuisine
- Never suggest North Indian or generic blends as substitutes
- Blocked ingredients (curry powder, garam masala, mixed spice powder, all-purpose seasoning) are never valid substitutes

## Applying Substitutions
- Replace missing ingredient with chosen alternative in recipe
- Adjust quantity: `new_quantity = original_quantity × conversion_ratio`
- Record substitution in recipe's "Substitutions Applied" section
- Format: `{original} → {substitute} (ratio: {ratio})`
