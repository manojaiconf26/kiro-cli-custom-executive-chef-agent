# Implementation Plan

- [x] 1. Create Executive Chef Agent steering file






  - [x] 1.1 Create `.kiro/steering/executive-chef.md` — use crisp bullet points and short directives (no prose). Include: role definition, conversational behavior rules, regional authenticity rules (blocked ingredient list as a table), recipe caching logic (check `recipes/` folder first), top-5 suggestion format, recipe template output instructions, and substitution skill reference


    - _Requirements: 1.1, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 6.2, 6.3, 6.4_

  - [x] 1.2 Review `.kiro/steering/executive-chef.md` — ensure content is crisp, hint-based, and not prose. Every section must use bullets, tables, or short directives. No paragraph-style text. Verify blocked ingredients table, top-5 format example, recipe template skeleton, and substitution skill reference are all present and concise.





    - _Requirements: 1.1, 1.3_

- [x] 2. Create Sous Chef Agent steering file





  - [x] 2.1 Create `.kiro/steering/sous-chef.md` — use crisp bullet points and short directives (no prose). Include: role definition, input format (standard Recipe Template), output format (prep-list.md with ingredient table and numbered steps), and measurement standards


    - _Requirements: 1.2, 7.2, 8.2, 8.3_
  - [x] 2.2 Review `.kiro/steering/sous-chef.md` — ensure content is crisp, hint-based, and not prose. Use bullets, tables, short directives only. Remove any paragraph-style text. Validate all six recipe template sections are referenced.


    - _Requirements: 1.2_

- [x] 3. Create Substitution Skill





  - [x] 3.1 Create `.kiro/steering/skills/substitution-skill.md` — use tables for substitution mappings and short directives for behavior rules. Include: mappings (tamarind→kokum/amchur, coconut milk→cashew paste, etc.), conversion ratios, regional authenticity constraints, and empty-list behavior for unmapped ingredients


    - _Requirements: 2.1, 9.1, 9.2, 9.3_
  - [x] 3.2 Review `.kiro/steering/skills/substitution-skill.md` — ensure content is crisp, hint-based, and not prose. Substitution mappings must be in table format. Behavior rules as short bullet directives. No paragraph explanations.


    - _Requirements: 2.1_

- [x] 4. Create utility functions and validation logic





  - [x] 4.1 Create `src/utils/validation.ts` with blocked ingredient validation function that checks an ingredient list against the blocked set (curry powder, garam masala, mixed spice powder, all-purpose seasoning)


    - _Requirements: 5.1, 5.2_
  - [ ]* 4.2 Write property test for blocked ingredient validation
    - **Property 1: Blocked Ingredient Rejection**
    - **Validates: Requirements 5.1, 5.2**

  - [x] 4.3 Create `src/utils/recipe-template.ts` with recipe template parser that extracts required sections (name, regional classification, dietary tags, ingredients, substitutions, steps) and validates completeness

    - _Requirements: 7.1_
  - [ ]* 4.4 Write property test for recipe template validation
    - **Property 2: Recipe Template Validation**
    - **Validates: Requirements 7.1**
  - [x] 4.5 Create `src/utils/substitution.ts` with substitution lookup function (returns alternatives with conversion ratios) and substitution application function (replaces ingredient and adjusts quantity)


    - _Requirements: 9.2, 9.4_
  - [ ]* 4.6 Write property test for substitution lookup
    - **Property 3: Substitution Lookup Returns Valid Alternatives**
    - **Validates: Requirements 9.2**
  - [ ]* 4.7 Write property test for substitution application
    - **Property 4: Substitution Application Preserves Quantity Ratio**
    - **Validates: Requirements 9.4**
  - [ ]* 4.8 Write unit tests for validation, recipe-template, and substitution utilities
    - Unit tests for blocked ingredient edge cases (casing, partial matches)
    - Unit tests for recipe template parsing (valid file, missing sections)
    - Unit tests for substitution examples (tamarind→kokum) and unmapped ingredient returning empty list
    - _Requirements: 5.1, 5.2, 7.1, 9.2, 9.3, 9.4_

- [x] 5. Checkpoint - Make sure all tests are passing





  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Create sample recipe and workspace data





  - [x] 6.1 Create `recipes/` folder with a sample recipe file (`recipes/sambar.md`) following the standard Recipe Template to seed the recipe cache


    - _Requirements: 6.1, 7.1_
-

- [x] 7. Configure Kiro Agent Hook









  - [x] 7.1 Create the Recipe Complete hook that triggers the Sous Chef Agent when a file is written or updated in the `recipes/` folder, passing the recipe file path as context

    - _Requirements: 3.1, 3.2, 8.1_
  - [x] 7.2 Review the Recipe Complete hook configuration — ensure the hook definition is crisp and hint-based. Trigger condition, action message, and file pattern must be short directives, not prose.


    - _Requirements: 3.1, 3.2_

- [x] 8. Wire steering files together





  - [x] 8.1 Update Executive Chef steering to reference the Substitution Skill file path and the `recipes/` folder for caching


    - _Requirements: 2.2, 6.2_
  - [x] 8.2 Update Executive Chef steering to reference the standard Recipe Template format and blocked ingredient validation rules


    - _Requirements: 5.1, 5.2, 7.1_

  - [x] 8.3 Add transaction logging directives to Executive Chef steering — after each interaction, append structured entry to `logs/transaction-log.md` with timestamp, request summary, files read/written, recipes suggested/selected, substitutions, errors

    - _Requirements: 10.1, 10.3_

  - [x] 8.4 Add transaction logging directives to Sous Chef steering — after each prep-list generation, append structured entry to `logs/transaction-log.md` with timestamp, recipe file read, files written, errors

    - _Requirements: 10.2, 10.3_
  - [x] 8.5 Final crispness review of all steering, skill, and hook files — scan `.kiro/steering/executive-chef.md`, `.kiro/steering/sous-chef.md`, `.kiro/steering/skills/substitution-skill.md`, and hook config for any prose that crept in during wiring. Convert to bullets/tables/directives. Ensure no section exceeds hint-style brevity.


    - _Requirements: 1.1, 1.2, 2.1, 3.1_

- [x] 9. Create logs folder





  - [x] 9.1 Create `logs/transaction-log.md` with a header and empty initial state

    - _Requirements: 10.1, 10.2_

- [x] 10. Final Checkpoint - Make sure all tests are passing





  - Ensure all tests pass, ask the user if questions arise.
