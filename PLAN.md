# DKGraphSuite — Master Implementation Plan & Milestones

## Milestones Roadmap

### M0: Project Architecture & Tooling Setup
- Repo structure, TypeScript, Vite, Tailwind CSS tokens, Vitest, lint/check scripts.
- Architecture docs, decisions, dependency verification.

### M1: Design System, UI Component Library & i18n System
- `DK*` component suite (DKButton, DKCard, DKModal, DKDrawer, DKPanel, DKTabs, DKDropdown, DKSlider, DKMathInput, DKFormula, DKCommandPalette).
- Theme engine (Light, Dark, High-Contrast).
- i18n loader (`en.json`, `hi.json`, `gu.json`, `glossary.json`).

### M2: Core Math Engine, Math Object Model, Parser & Dependency Engine
- MathObject registry, `ExpressionParser` (math.js integration), `DependencyEngine` (DAG), `HistoryEngine` (Undo/Redo command pattern), `GraphViewport` 2D Canvas engine.

### M3: Project Storage, History & Export System
- `.dkgs` JSON format, IndexedDB (Dexie) autosave/recovery, PNG/SVG export.

### M4: Std 11 Science Interactive Labs & Flagships
- Straight Lines Lab (`/std11-straight-lines.html`), Conic Sections Lab (`/std11-conics.html`), 3D Intro (`/std11-3d-introduction.html`), Limits & Derivatives (`/std11-limits-derivatives.html`), Statistics (`/std11-statistics.html`), Probability (`/std11-probability.html`).

### M5: Std 11 Curriculum Engine & Chapter Pages
- `std11.json` validation, `ChapterRenderer` auto-generating 16 Std 11 chapter pages.

### M6: Priority Std 12 Textbook Chapters (6–12) & Dedicated Learning Labs
- Ch 6: Applications of Derivatives
- Ch 7: Integrals
- Ch 8: Applications of Integrals
- Ch 9: Differential Equations
- Ch 10: Vector Algebra
- Ch 11: Three-Dimensional Geometry
- Ch 12: Linear Programming
- Individual exercise learning pages with step-by-step solutions, exact math typography, live interactive parameters, and graph/3D visualizations.

### M7: Full Std 12 Curriculum & Remaining Chapters
- `std12.json` validation, `ChapterRenderer` generating all 13 Std 12 chapter pages.

### M8: Multilingual Explanation Engine, Advanced Customization & Scripting
- Live What/Why/How explanation generation with active values in EN/HI/GU.

### M9: Quality Gate & Test Verification
- Golden-value math unit tests, Playwright UI accessibility & golden value suite.
