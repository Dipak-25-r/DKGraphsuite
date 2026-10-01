# DKGraphSuite — Master Build Prompt for an AI Coding Agent

Paste everything below into your coding agent (Claude Code recommended), with `DKGraphSuite_Master_Spec_v2.md` placed in the project root.

---

## ROLE

You are a senior engineering team (architect, frontend, math-engine, QA, accessibility, i18n) building **DKGraphSuite**: a real, working interactive mathematics platform for GSEB Std 11 and Std 12 Science Mathematics (English, Hindi, Gujarati), later expanding to general studios.

## SOURCE OF TRUTH

`DKGraphSuite_Master_Spec_v2.md` is the full requirements document. Read it completely before writing any code. If this prompt and the spec conflict, the spec's feature list wins and this prompt's process rules win. Never remove a feature the spec requests. Improve it.

## MISSION

Deliver a working, tested, installable product in milestones. Each milestone must be fully working before the next starts. Optimize for **genuinely working capabilities**, not page count or screenshots.

---

## THE 20 RULES

**1. Real or hidden. Never fake.**
Every visible control performs a real action. No "Coming Soon", no placeholder buttons, no hard-coded answers, no graph images. Keep a `featureRegistry` (`planned | in-progress | implemented`). The UI renders only `implemented` features.

**2. Plan before code.**
First inspect the repo, dependencies and existing code. Then write `ARCHITECTURE.md` (modules, data model, dependency graph, folder layout) and `PLAN.md` (milestones with exit criteria). Reuse before writing. Do not create duplicate engines or hundreds of unstructured files.

**3. One document model.**
Every object is `{id, type, definition, dependsOn[], style, visible, locked}`. All UI (canvas, object list, tables, explanations) subscribes to this single model. No UI holds its own copy of mathematical state.

**4. Command-based mutations.**
Every change (create, edit, drag, delete, style, settings, matrix cell, slider) is a Command run through `HistoryEngine`. This gives undo/redo for everything by construction, including drag as one undoable step.

**5. Dependency engine.**
Use a DAG with dirty-propagation and topological recompute. Detect cycles and show a clear error. Moving point A must update line AB, slope, distance, midpoint, equation and explanation. Hidden objects are not rendered but keep their dependencies. Only affected objects are recomputed or redrawn.

**6. Stack and smart reuse.**
Vite + TypeScript (strict), multi-page, Tailwind CSS with design tokens, Preact or Lit components, math.js, KaTeX, Canvas 2D plus SVG overlay, Three.js (lazy loaded, 3D pages only), IndexedDB via `idb`, `vite-plugin-pwa`, Vitest, Playwright. Before adding any dependency, check license, maintenance, size, offline support and security. Record the decision in `DEPENDENCIES.md`. Evaluate Compute Engine / Nerdamer / Algebrite for symbolic work and choose one by test results.

**7. Shared `/core` engines, no duplication.**
MathEngine, ExpressionParser, FunctionEngine, GeometryEngine, MatrixEngine, StatisticsEngine, ProbabilityEngine, CalculusEngine, ThreeDEngine, MeasurementEngine, DependencyEngine, HistoryEngine, ProjectEngine, ExportEngine, LanguageEngine, ThemeEngine, CommandEngine, ScriptEngine. Std 11 and Std 12 pages use these engines. They never reimplement them.

**8. Reusable components only.**
Build the DK* components once (DKButton, DKIconButton, DKCard, DKModal, DKDrawer, DKPanel, DKTabs, DKDropdown, DKTooltip, DKToolbar, DKSlider, DKMathInput, DKFormula, DKToast, DKCommandPalette, etc.) and the math components (FunctionEditor, PointEditor, MatrixEditor, VectorEditor, GraphViewport, ObjectManager, ExplanationPanel, PracticePanel, etc.). Pages compose these. No page defines its own button or modal.

**9. Math correctness is proven by tests, written first.**
For each engine, write known-answer tests before or alongside implementation. Examples: ∫₁⁴ x² dx = 21; d/dx(x³+2x) = 3x²+2; distance (2,3)–(5,7) = 5; det/inverse of known matrices; mean/variance/SD of known datasets; `y²=4ax` gives focus (a,0) and directrix x=−a; LPP corner points. When a symbolic result is unavailable, say so and show a clearly labelled numeric result. Never silently guess.

**10. Data-driven curriculum.**
`/config/curriculum/std11.json` and `std12.json` hold chapter id, number, names (en/hi/gu), topics, formulas, tools, activities, related chapters, objectives, practice categories, and an `active` flag. Validate against a JSON Schema (`npm run validate-curriculum`). A `ChapterRenderer` generates standard chapter pages (Learn, Concepts, Formula, Interactive, Examples, Practice, Visualization, Step-by-step, Related). Special labs are hand-built. Do not hard-code chapter numbering, and flag in `CURRICULUM_NOTES.md` that the syllabus must be verified against current GSEB/GCERT textbooks.

**11. Multilingual from day one.**
`/i18n/en.json`, `hi.json`, `gu.json`. No user-facing string in HTML or code. A missing key fails `npm run generate-i18n-check`. Formulas are language-neutral LaTeX and are never translated. Explanations are localized templates filled with live values. Mark Hindi and Gujarati terminology as "needs teacher review" in `TRANSLATION_REVIEW.md`. Do not claim it is reviewed.

**12. Explanation engine uses live state.**
Explanations (What / Why / How / Formula / Steps / Example) are generated from current objects, for example the real coordinates of A and B, or the current `a` in `y²=4ax`. No static text that ignores the state.

**13. Project system.**
A versioned `.dkgs` format (objects, dependencies, sliders, settings, language, theme, layout, history, scripts, curriculum context) with migrations. Support New, Open, Save, Save As, Autosave (IndexedDB), Crash Recovery, Duplicate, Rename, Import, and Export (PNG, SVG, PDF, JSON, CSV, Print). Export reflects the actual current state. Round-trip tests: save → load → deep-equal.

**14. Workspace and UX.**
Header (menu, logo, title, undo, redo, save, export, fullscreen, settings); left tools; center canvas; right objects/properties/analysis; bottom input/table/explanation. Every panel is hideable, and visibility is saved in the project. Mobile-first: bottom tool bar, drawers, 44px+ touch targets. Tablet uses two panels, desktop uses multi-panel. Progressive disclosure (Basic / Advanced / More Tools). The canvas is always the visual priority.

**15. Design system.**
Calm, restrained palette (deep navy, indigo, blue, violet, neutrals), colors used with meaning only. Tokens for color, spacing, radius, shadow, font, motion, breakpoints. Readable fonts with Gujarati and Devanagari fallbacks. Generous whitespace, F-pattern for content pages, Z-pattern for landing pages. No decorative stock images, no particle or glow animation. Light, dark and system themes. Original branding: create a DKGraphSuite logo and icon language.

**16. Accessibility.**
Full keyboard navigation, visible focus, AA contrast, high-contrast mode, reduced motion, scalable text, ARIA labels, and text alternatives describing visualizations. Run axe checks in Playwright.

**17. Performance.**
Code-split per page, lazy-load Three.js and heavy modules, `requestAnimationFrame` rendering, memoization, debounced input, object-level redraw, Web Workers for heavy math, and a recorded bundle budget (initial JS per page stated in `PERF.md`). The service worker caches for offline use.

**18. Safe scripting and commands.**
ScriptEngine events: OnClick, OnChange, OnUpdate, OnDrag, OnDragEnd, OnCreate, OnDelete, OnProjectLoad. Run scripts in a restricted interpreter or sandboxed Worker. **No `eval`, no `Function`, no DOM/network/storage access.** Enforce timeouts. CommandPalette (Ctrl/Cmd+K) runs real commands (open chapters, add function, hide grid, export PNG, switch language). Focus Mode only hides distractions, and the UI must never claim exam-grade lockdown.

**19. Quality gate per feature (automated, not claimed).**
A feature is "implemented" only if tests prove: it works; math is correct; editing, dragging, hide/show, delete, undo and redo work; save, load and export work; it works on mobile and by keyboard; language switch works; errors are handled; no console errors; no broken links; dependencies stay synchronized; it survives refresh. Convert this checklist into a reusable Playwright template run for every lab. If any item fails, the feature stays out of the UI.

**20. Milestone discipline, honest reporting, resumable work.**
Work in this order and do not skip ahead:
M0 repo/CI/tokens → M1 design system + shell + i18n → M2 object model/parser/dependency/history/viewport → M3 project system → **M4 Straight Lines Lab (proof slice)** → M5 Conics, Function Manager, minimal 3D intro → M6 Limits & Derivatives, Statistics, Probability → M7 curriculum renderer + remaining Std 11 chapters → M8 Std 11 hardening → M9 Std 12 calculus suite (continuity, differentiability, applications, integration, area, differential equations) → M10 Std 12 matrices, determinants, vectors, 3D, LPP, probability → M11 scripting, advanced customization, presentation mode → M12 general studios → M13 PWA, performance, final QA.
After every milestone: run `npm run check` (lint, typecheck, unit, e2e, validate-curriculum, i18n-check, link check), fix every failure, then update `PROGRESS.md` (done, verified, known issues, next step). Report honestly. Never say "no bugs" unless the test suite and your own manual verification show it. List known limitations instead. If context runs out, `PROGRESS.md` plus `PLAN.md` must let a fresh session continue without loss.

---

## REQUIRED npm SCRIPTS

`dev`, `build`, `test`, `test:math`, `test:ui`, `lint`, `format`, `check`, `validate-curriculum`, `generate-pages`, `generate-i18n-check`, `audit-dependencies`, plus scripts that detect broken internal links, unregistered pages, missing routes and duplicate components.

## FIRST ACTIONS (do these now)

1. Read the spec fully.
2. Inspect the current project (if it is empty, say so).
3. Write `ARCHITECTURE.md`, `PLAN.md`, `DEPENDENCIES.md`, `CURRICULUM_NOTES.md`.
4. Complete M0 and M1, run `npm run check`, update `PROGRESS.md`.
5. Continue milestone by milestone. Stop and ask me only for real blockers (syllabus ambiguity, licensing, missing assets). Otherwise make the best-justified decision, record it, and keep going.

## DEFINITION OF DONE (per milestone and for the whole project)

- All checks green, no console errors, no fake controls.
- Every visible feature works and is covered by a test.
- `PROGRESS.md` lists what was verified and any known limitations.
- Earlier features are preserved and improved, never removed.
