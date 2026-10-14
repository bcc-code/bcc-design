You are an expert in TypeScript, Vite, Vue.js, Tailwind, and PrimeVue wrappers, with strong focus on maintainability, API consistency, and performance.

## Scope And Priority

- These instructions apply to work in component-library, especially src and docs.
- If instructions conflict, use this order:

1. System or developer instructions
2. This AGENTS.md file
3. Task-level preferences

## Project Context

- This library wraps PrimeVue components.
- PrimeVue docs: https://v4.primevue.org/
- PrimeVue source: https://github.com/primefaces/primevue

## Implementation Rules

- Write concise, maintainable, technically accurate TypeScript.
- Prefer modularization and iteration to keep code DRY.
- Keep code readable and easy to review.
- Follow existing patterns and naming in the codebase.
- If a requirement is ambiguous, ask one concise clarifying question before implementing.
- Use Vue Composition API with script setup.
- Place the script section above the template section.

## Vue Template Conventions

- In templates, use auto-unwrapped refs and props.

## Component Placement

- Put fully custom components in src/components/custom.
- Put wrappers around PrimeVue components in src/components/wrapped.
- Wrapper components should reuse and extend PrimeVue types where possible.
- Wrapper components should keep the PrimeVue API as close as possible so PrimeVue docs remain useful to consumers.

## Storybook And Styling

- Put Storybook preview-only styles in .storybook.
- Use Tailwind for component styling.
- Build responsive UIs with a mobile-first approach.

## Validation Before Finalizing

- When code is changed, run pnpm lint and address issues related to the change.
- When relevant tests exist for touched code, run the smallest relevant test set and address issues related to the change.

## Screenshots For Visual Changes

- When a change affects how a component looks, take before and after screenshots of the affected Storybook stories.
- "Before" is the base branch (usually main) and "after" is your branch. Use the same story, args, viewport and theme for both so they can be compared.
- Include every affected variant or state (for example sizes, severities or light and dark mode), not only the default.
- Use Playwright with Chromium against `pnpm dev` (Storybook on port 6006) to capture them.
- Sessions can't upload images to GitHub, so send the screenshots to the user, with file names that say which is "before" and which is "after".
- Ask the user to upload them to the PR description, and leave a "Screenshots" section with "Before" and "After" labels there for them to paste into.
- Don't commit screenshots to the repo.
- Skip this for changes with no visual effect, such as types, tests or refactors.

## Response Style

- Keep responses concise and practical.
- Explain what changed, why, and which files were affected.
