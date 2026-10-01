# DKGraphSuite — Combined Master Specification + AI Build Prompt

> This file combines the original Master Specification, the AI Coding Agent Master Prompt, and the new Std 12 Chapters 6–12 textbook-driven learning requirements. The three sections are preserved so no original requirement is lost.

---

# PART A — MASTER SPECIFICATION v2.0

# DKGraphSuite — Master Specification v2.0
### Product Vision · Requirements · Design System · Curriculum Plan · AI-Agent Operating Rules

**Tagline:** Explore. Construct. Calculate. Understand.
**Supersedes:** v1.0. Nothing from v1.0 is removed (see Appendix A: Feature Preservation Ledger).
**Audience:** AI coding agents (and human reviewers) building DKGraphSuite.

---

## 0. HOW TO USE THIS DOCUMENT (READ FIRST)

1. This document is the single source of truth. If your instinct conflicts with it, follow the document and record the conflict in `DECISIONS.md`.
2. **Work in the order of Part 3 (Phases & Milestones).** Do not start a later milestone until the earlier one passes its exit criteria.
3. Maintain a file `STATUS.md` in the repo root. Every feature has exactly one state:
   `NOT_STARTED` → `IN_PROGRESS` → `VERIFIED`
   A feature is `VERIFIED` only when it passes the Definition of Done (Part 14). Never write "done" for anything else.
4. Before writing any code, run the **Pre-Flight Checklist** (Part 15).
5. If something cannot be implemented correctly, **do not build a fake version and do not show a button for it.** List it in `STATUS.md` as `NOT_STARTED` with the reason.
6. When improving existing work: **OLD FEATURE + IMPROVEMENT = BETTER FEATURE.** Never delete a previously requested capability to make a task easier.

---

## 1. PRODUCT VISION

DKGraphSuite is a **real, working interactive mathematics environment and digital textbook** for GSEB Std 11 and Std 12 Science students, teachers and self-learners — with an architecture that can later grow into a general-purpose mathematics suite.

It must feel like:

- a **professional mathematical workspace**, plus
- a **modern science-education platform**, plus
- an **interactive digital textbook**, plus
- a **dynamic visualization laboratory**.

A student must be able to: open a chapter → understand the idea → try the visualization → change values → see results update → read an explanation that uses *their* values → practise → save the project.

### 1.1 Originality
Use modern dynamic-mathematics workflows as *functional* inspiration only. Do **not** copy any other product's branding, logos, assets, source code, exact layout, exact visuals or proprietary implementation. DKGraphSuite must have its own logo, icon set, colour language, component shapes, navigation and terminology. Do **not** embed third-party proprietary math applets.

### 1.2 The Non-Negotiable Rule — NO "FOR SHOW" FEATURES
Every visible control must work. Specifically, never:

- show a "Coming Soon" button or disabled placeholder masquerading as a feature;
- hard-code mathematical answers or fake calculations;
- render a graph as a static image;
- build a 3D scene that cannot be rotated/zoomed/panned;
- keep an object list that is disconnected from the real mathematical state;
- advertise anything as implemented that has not reached `VERIFIED`.

---

## 2. PRIORITY: COMPLETE STD 11 + STD 12 SCIENCE MATHEMATICS FIRST

**Order of value (strict):**

| Layer | What | Rule |
|---|---|---|
| **L1 — Curriculum** | Std 11 → complete → test → Std 12 → complete → test | This is what ships first. |
| **L2 — Math Engine** | Parser, functions, geometry, calculus, matrices, statistics, probability, vectors, 3D, dependencies | Built once in `/core`, shared by every page. |
| **L3 — Product Experience** | UI, themes, customization, i18n, projects, export, accessibility, PWA | Polished continuously, but never ahead of L1/L2 working. |

**Phase 1** = Std 11 Science Mathematics (complete + tested)
**Phase 2** = Std 12 Science Mathematics (complete + tested)
**Phase 3** = General DKGraphSuite studios (graphing, geometry, CAS, calculus, statistics, probability, spreadsheet, 3D, measurement)

**Anti-pattern to avoid:** spending weeks on a beautiful dashboard while Straight Lines, Conics, Derivatives, Integrals, Matrices or 3D do not actually work. *Optimize for the number of genuinely working capabilities, not pages generated or screenshot appeal.*

The engine in `/core` is designed from day one so Std 11 and Std 12 never need duplicated implementations.

---

## 3. PHASES & MILESTONES (with exit criteria)

| # | Milestone | Exit criteria (all must pass) |
|---|---|---|
| **M0** | Project architecture | Repo builds; `npm run dev/build/test/lint/check` exist and run; folder structure in Part 12; ADR (`DECISIONS.md`) for stack choices with licence/size notes. |
| **M1** | Design system + component library | Tailwind tokens defined once; all DK components (Part 9) exist with a living style-guide page; light/dark/high-contrast work; Gujarati/Hindi/English text renders correctly. |
| **M2** | Application shell | Header, hamburger menu, panels (left/centre/right/bottom), mobile drawers + bottom toolbar, hide/show persisted. Every menu item is real or absent. |
| **M3** | Math object model + parser + dependency engine | Objects, sliders, functions, points; editing a parent updates all children; unit tests pass (Part 13 golden values). |
| **M4** | Graph engine + geometry engine | `GraphViewport` pans/zooms/draws functions & conics; drag points; object-level redraw. |
| **M5** | Project / history / export | Undo/redo for all state changes; `.dkgs` save/open/autosave/recovery; PNG/SVG/PDF/JSON/CSV/print work from real state; survives refresh. |
| **M6** | Std 11 curriculum foundation | `std11.json` validated; generic `ChapterRenderer` generates chapter pages; language switch works. |
| **M7** | Std 11 interactive labs | Flagship labs (Part 4.3) plus all remaining chapters have real interactive sections. |
| **M8** | Std 11 test gate | Math tests, UI tests, Definition of Done met for every Std 11 page. **Only now begin Std 12.** |
| **M9** | Std 12 curriculum foundation | `std12.json` validated; pages generated. |
| **M10** | Std 12 interactive labs | Calculus chain, matrices/determinants, vectors, 3D, LP, probability (Part 5). |
| **M11** | Std 12 test gate | As M8 for Std 12. |
| **M12** | Multilingual explanation engine | What/Why/How/Formula/Steps/Example generated from live objects in EN/HI/GU. |
| **M13** | 3D system hardening | Lazy-loaded; used by Std 11 3D intro and Std 12 3D geometry. |
| **M14** | Advanced customization, scripting, command palette | All real (Parts 10.6–10.9). |
| **M15** | General studios (Phase 3) | Built by composing existing engines, not rewriting them. |
| **M16** | PWA/offline, performance, final QA | Budgets in Part 11 met; offline works; full quality gate passes. |

> Keep M0–M5 lean. They exist to make M6–M11 fast and reliable.

---

## 4. PHASE 1 — STD 11 SCIENCE MATHEMATICS

### 4.1 Curriculum data (configuration, not hard-coded)
Create `/config/curriculum/std11.json`. **Do not assume a permanent chapter order or numbering** — GSEB organization can change between academic years.

Required top-level fields:
```json
{
  "standard": 11,
  "stream": "science",
  "curriculumVersion": "2026-27",
  "sourceNote": "Verify against current official GSEB textbook/syllabus before release",
  "chapters": [ { ...chapter } ]
}
```
Each chapter:
```json
{
  "id": "straight-lines",
  "number": 10,
  "name": { "en": "", "hi": "", "gu": "" },
  "description": { "en": "", "hi": "", "gu": "" },
  "topics": [ { "id": "", "name": {"en":"","hi":"","gu":""} } ],
  "formulas": [ { "id": "", "latex": "", "label": {"en":"","hi":"","gu":""} } ],
  "tools": [ "geometry", "graph" ],
  "interactiveActivities": [ { "id": "", "page": "std11-straight-lines.html", "title": {} } ],
  "relatedChapters": [ "conic-sections" ],
  "learningObjectives": { "en": [], "hi": [], "gu": [] },
  "practiceCategories": [ "numerical", "mcq", "proof", "construction" ],
  "hasCustomLab": true
}
```
The file must be user-editable, and `npm run validate-curriculum` must fail on schema errors, missing translations, unknown related-chapter IDs, or missing pages.

**Chapters to include** (subject to version-check against the official syllabus): Sets · Relations & Functions · Trigonometric Functions · Mathematical Induction (where applicable) · Complex Numbers & Quadratic Equations · Linear Inequalities · Permutations & Combinations · Binomial Theorem · Sequences & Series · Straight Lines · Conic Sections · Introduction to 3-D Geometry · Limits & Derivatives · Mathematical Reasoning (where applicable) · Statistics · Probability.

> Formulas are LaTeX strings rendered by KaTeX and are **never translated**. Only their labels/explanations are translated.

### 4.2 Standard chapter structure (generated by `ChapterRenderer`)
Every chapter page has these ten sections, generated from JSON so they are not hand-duplicated:

1. **Learn** – short intro + objectives
2. **Concepts** – topic cards (expandable)
3. **Formula** – formula cards (KaTeX)
4. **Interactive** – real engine-backed activity
5. **Examples** – worked, stepwise; values checked by engine
6. **Practice** – problems with engine-verified answers
7. **Visualization** – diagrams/graphs tied to live state
8. **Step-by-step** – solution walkthrough
9. **Related concepts** – links from `relatedChapters`
10. **Language selection** – EN / हिन्दी / ગુજરાતી

Chapters with `hasCustomLab: true` embed a specialized lab in the Interactive section (or link to a dedicated page). Simple chapters (Sets, Induction, Reasoning, Binomial, etc.) still need a *real* interactive element (e.g., Venn diagram with editable sets, Pascal's triangle/expansion calculator, nCr/nPr calculator, sequence term/sum explorer) — not a static page.

### 4.3 Flagship labs (extra priority)

**Straight Lines Lab — `/std11-straight-lines.html`**
Coordinate plane; create points; drag points; distance; midpoint; section formula (internal/external, editable ratio); slope; angle between lines; line through two points; point-slope, two-point, slope-intercept, intercept and normal forms; parallel and perpendicular lines; distance from a point to a line.
*Dependency demo:* A=(2,3), B=(6,7). Dragging A must live-update line AB, slope, distance, midpoint, equation(s), and any angle/parallel/perpendicular/distance object built on them.

**Conic Sections Lab — `/std11-conics.html`**
Circle, parabola, ellipse, hyperbola. Editable parameters: centre, radius, a, b, focus, directrix, eccentricity, vertex, axes, focal length. The user can type an equation (e.g., `y^2 = 4ax`) **or** use sliders. Changing `a` must update graph, focus, directrix, vertex, focal length and the textual explanation using the *current* numbers.

**3-D Introduction — `/std11-3d-introduction.html`**
x/y/z axes, coordinate planes, octants, 3D points with coordinates, distance between points, orbit rotation, zoom, pan, reset camera. P=(2,3,4) must appear at the correct location; editing to (5,1,7) must move it. Load the 3D library lazily (only on this page).

**Limits & Derivatives — `/std11-limits-derivatives.html`**
Approaching a point; left/right-hand limits with a numeric table; secant → tangent animation (drag the second point toward the first); derivative as slope; show graph, numerical values, formula and explanation in EN/HI/GU. Must work for user-entered f(x).

**Statistics — `/std11-statistics.html`**
Editable data entry and frequency tables (raw, discrete, continuous/grouped). Mean, median, mode, range, mean deviation, variance, standard deviation, plus histogram/bar/frequency polygon. Editing any data cell updates every result and chart. Show step-by-step calculation.

**Probability — `/std11-probability.html`**
Sample space builders (coins, dice, cards, custom), events, complement, union, intersection, mutually exclusive, exhaustive; probability computation; Monte-Carlo simulation compared with theoretical value; Venn/tree/table visualizations.

---

## 5. PHASE 2 — STD 12 SCIENCE MATHEMATICS

Create `/config/curriculum/std12.json` using the same schema (including `curriculumVersion`). Chapters: Relations & Functions · Inverse Trigonometric Functions · Matrices · Determinants · Continuity & Differentiability · Applications of Derivatives · Integrals · Applications of Integrals · Differential Equations · Vector Algebra · 3-D Geometry · Linear Programming · Probability.

**Dedicated pages (do not build one giant page):**
`std12-relations-functions`, `std12-inverse-trigonometry`, `std12-matrices`, `std12-determinants`, `std12-continuity-differentiability`, `std12-application-of-derivatives`, `std12-integrals`, `std12-application-integrals`, `std12-differential-equations`, `std12-vector-algebra`, `std12-3d-geometry`, `std12-linear-programming`, `std12-probability` (each `.html`).

> Routing note: v1.0 lists both `application-of-derivatives` and `application-derivatives` spellings. Use **one canonical slug** (`application-of-derivatives`), register it in the route table, and keep the other as a redirect so no link breaks.

### 5.1 Calculus chain (major attention)
Visually connect, with linked navigation and shared state:

`Function → Limit → Continuity → Differentiability → Derivative → Tangent → Applications → Integral → Area → Differential Equation`

Show this as a clickable concept-path component on every calculus page, highlighting the current stage.

### 5.2 Integration lab
User enters `f(x)=x^2`, `a=1`, `b=4`. App shows graph, limit markers, shaded area, **exact** result (21 for this example), **numeric** result (Riemann/Simpson with shown error), formula, and explanation. Dragging a and b updates region and answer. Show antiderivative and Fundamental Theorem steps. When exact symbolic integration is unavailable for an input, state that clearly and show the numeric value only — never guess.

### 5.3 Applications of integrals
Area under a curve; area between curves; bounded regions with x-axis/y-axis; editable f(x), g(x), a, b; automatic intersection finding; region updates live.

### 5.4 Matrices & determinants
Editable matrix grids (size selectable). Addition, subtraction, multiplication, scalar multiplication, transpose, determinant, inverse (only where defined — show clear message otherwise), minors, cofactors, expansion steps, adjoint, properties, solving linear systems (Cramer / inverse method). Changing a cell updates everything dependent.

### 5.5 Vector algebra
Vector creation; magnitude; direction cosines; add/subtract/scalar multiply; dot product; cross product; projection; angle; geometric drawing (2D and 3D) with real vector graphics.

### 5.6 3-D geometry (Std 12)
Points, lines, planes; direction ratios/cosines; angle between lines/planes/line-plane; intersections; shortest distance (skew lines, point–plane, point–line) in a real interactive 3D scene.

### 5.7 Linear programming
Enter inequalities/constraints and objective `Z = ax + by`; the **feasible region is computed and drawn from the constraints** (half-plane intersection); corner points computed; max/min identified; bounded/unbounded/infeasible cases handled with clear messages; optional iso-profit line animation.

### 5.8 Probability (Std 12)
Event calculations; conditional probability; total probability & Bayes (tree/table visualizations); independence; simulations; random variables, distributions, mean and variance; binomial distribution.

---

## 6. THE SHARED ENGINE (`/core`) — build once, reuse everywhere

| Module | Responsibility | Preferred prebuilt basis (verify first) |
|---|---|---|
| `ExpressionParser` | Parse/evaluate expressions, functions, parameters, implicit equations | math.js (Apache-2.0) |
| `MathEngine` | Numeric utilities, rounding, angle units | math.js |
| `FunctionEngine` | f(x), domains, parameters, tables, analysis | own + math.js |
| `CalculusEngine` | Derivative, limits, numeric/exact integral, tangents, extrema | math.js derivative + Nerdamer or Algebrite for symbolic (check licence/size; lazy-load) |
| `GeometryEngine` | Points, lines, circles, conics, intersections, measurements | own (pure TS, fully unit-tested) |
| `MatrixEngine` | Matrix ops, det, inverse, minors, cofactors | math.js |
| `StatisticsEngine` | Descriptive stats, frequency tables | own (small) — cross-check with math.js in tests |
| `ProbabilityEngine` | Sample spaces, events, simulation, distributions | own + seeded RNG |
| `ThreeDEngine` | Scene, camera, 3D objects | Three.js (MIT), lazy-loaded |
| `MeasurementEngine` | Distance, angle, area, slope objects | own |
| `DependencyEngine` | Directed acyclic graph of objects; topological recompute; cycle detection | own |
| `HistoryEngine` | Undo/redo via command pattern | own |
| `ProjectEngine` | `.dkgs` load/save/autosave/recovery | own + IndexedDB (Dexie) |
| `ExportEngine` | PNG, SVG, PDF, JSON, CSV, print | canvas/SVG + jsPDF (MIT) |
| `LanguageEngine` | i18n EN/HI/GU | small key-based loader (or i18next if justified) |
| `ThemeEngine` | Tokens, light/dark/system/high-contrast | CSS variables + Tailwind |
| `CommandEngine` | Command registry for palette/menu/shortcuts | own |
| `ScriptEngine` | Sandboxed event scripts | see Part 10.8 |
| `ExplanationEngine` | Live What/Why/How/Formula/Steps/Example | own templates + engines |

Rules: no engine is re-implemented inside a page; engines are pure (no DOM) so they can run in tests and Web Workers; heavy work (numeric integration with fine grids, simulations with large N, LP vertex enumeration on large inputs) runs in a worker.

### 6.1 Reactive mathematical state (the heart of the product)
- Every object has a stable ID, type, definition, dependencies, style, visibility, lock state and computed value.
- Editing any definition triggers `DependencyEngine` to recompute **only affected descendants**, then redraw **only affected visuals** (object-level updates).
- Hidden objects disappear from rendering but keep participating in dependencies.
- Examples that must work: `f(x)=x^2 → x^3+2x` updates graph, derivative, table, analysis, explanation. `A=(2,3) → (5,8)` updates every dependent construct. `f(x)=a·sin(bx+c)+d` updates instantly when any slider changes.

---

## 7. WORKSPACE, MENUS & MANAGERS

### 7.1 Layout
Header: hamburger · DKGraphSuite logo · workspace title · undo · redo · save · export · fullscreen · settings.
Left: tool palette (grouped **Basic / Advanced / More Tools**). Centre: mathematical canvas. Right: Objects / Properties / Analysis (tabbed). Bottom: input bar / command console / table / explanation (tabbed). **Every panel is hideable**; visibility is saved per project.

### 7.2 Hamburger menu — every item must work
New · Open · Recent · Save · Save As · Autosave · Import · Export · Share · Print · Print Preview · Focus Mode · Presentation Mode · Reset View · Clear Workspace · Settings · Language · Keyboard Shortcuts · Help · About.
(`Share` = export a `.dkgs` file or a copyable encoded link that restores state; do not show cloud features that don't exist.)

### 7.3 Object Manager (`ObjectManager`)
Lists every object (points, lines, circles, conics, functions, sliders, matrices, vectors…). Per object: visibility, selection, edit, rename, duplicate, delete (with undo), lock, style, label, properties. Destructive actions are visually separated from safe ones.

### 7.4 Function Manager
Add, edit, delete, duplicate, rename, hide/show, domain, parameters (auto-create sliders), style, table, analysis (roots, extrema, asymptotes where computable).

### 7.5 Customization Center
Appearance: light/dark/system, accent, density, text size, animation intensity. Graph: grid, axes, labels, ticks, background, coordinate range, aspect ratio. Toolbar: reorder, hide, pin, restore defaults. Mathematics: angle unit (deg/rad), decimal precision, rounding, notation. Accessibility: larger text, high contrast, reduced motion, keyboard navigation.

### 7.6 Command palette (Ctrl/Cmd + K)
Searches tools, commands, pages, chapters, settings, objects, help. Examples that must execute real actions: "Open Conics", "Add Function", "Hide Grid", "Show Derivative", "Export PNG", "Switch Gujarati".

### 7.7 Scripting (controlled)
Events: OnClick, OnChange, OnUpdate, OnDrag, OnDragEnd, OnCreate, OnDelete, OnProjectLoad. Scripts run in a sandbox: **no `eval`/`Function` on the main thread, no DOM, network, storage or `window` access.** Recommended approach: a tiny restricted expression/statement DSL interpreted by `ScriptEngine`, or a Web Worker with a whitelisted message API and execution timeout. Script errors are shown in a console panel and never crash the app.

### 7.8 Focus & Presentation modes
*Focus Mode:* hides distractions (panels, menus) to keep attention on canvas + task. *Presentation Mode:* large graph, large fonts/controls, explanation, formulas, construction steps. Do not describe Focus Mode as secure exam lockdown — it is a browser UI mode only.

### 7.9 Project format `.dkgs` and undo/redo
`.dkgs` (versioned JSON, with `schemaVersion`) stores: objects, functions, dependencies, sliders, graph settings, language, theme, workspace layout, construction history, scripts, curriculum context. Support New / Open / Save / Save As / Autosave / Recovery / Duplicate / Rename / Import / Export. Loading an older schema must migrate, never crash.
Undo/redo covers: creation, deletion, edits, dragging (one undo step per drag), transformations, function changes, matrix edits, style changes, settings changes.

### 7.10 Export
PNG, SVG, PDF, JSON, CSV, Print — always from the **actual current state** (respecting hidden objects, language and theme options). Print uses a clean print stylesheet.

---

## 8. DESIGN SYSTEM — "Attractive enough to create interest, calm enough to maintain concentration."

### 8.1 Design philosophy (from the supplied reference screenshots)
The interface must follow the **7 principles** — Balance, Contrast, Emphasis, Consistency, Alignment, Proximity, White Space — and the **5 guidelines** — Simplicity, Clear Navigation, Mobile-First, Fast Loading, Strong Visual Hierarchy — plus the **20 web-design principles** below.

| Principle | Concrete DKGraphSuite rule |
|---|---|
| Balance | Workspace panels share a symmetrical grid; side panels never outweigh the canvas. |
| Contrast | Text ≥ WCAG AA (4.5:1 body, 3:1 large/UI). Primary action is the highest-contrast element. |
| Emphasis | One focal point per screen: the canvas or the current task. One primary button per view. |
| Consistency | Only tokens and `DK*` components; no page-local one-off styles. |
| Alignment | 4 px base unit, 8-pt spacing scale, 12-col grid (desktop), 4-col (mobile). |
| Proximity | A control sits next to what it controls; related fields grouped in one card. |
| White Space | Minimum 16 px between cards, 24 px between sections; canvas gets ≥ 60 % of desktop workspace width. |
| Simplicity | ≤ 2 typefaces (+ math font), ≤ 1 accent colour active per view. |
| Clear navigation | Breadcrumb always visible: `Std 11 › Conic Sections › Parabola`; one-tap Std 11/12 switcher and chapter switcher. |
| Mobile-first | Author base styles for 360 px wide; scale up with `sm/md/lg/xl/2xl`. |
| Fast loading | Budgets in Part 11. |
| Visual hierarchy | Order of attention: current task → canvas → primary controls → supporting info → advanced settings. |

### 8.2 The 20 principles, turned into enforceable rules

1. **Readable, web-friendly fonts.** Body font: **Inter** (or system UI stack). For Gujarati use **Noto Sans Gujarati**, Hindi **Noto Sans Devanagari**; maths via **KaTeX** fonts. Self-host, subset, `font-display: swap`. Fallback stack: `Inter, "Noto Sans Gujarati", "Noto Sans Devanagari", system-ui, -apple-system, "Segoe UI", Roboto, Arial, Helvetica, sans-serif`. *Note:* Arial/Helvetica/Times are acceptable fallbacks but lack good Gujarati/Devanagari coverage on some devices, so the Noto families are required for those scripts. No decorative body fonts. Body ≥ 16 px; line-height ≥ 1.5 (≥ 1.7 for Gujarati/Hindi).
2. **F-pattern** on content-heavy chapter pages: title top-left, key concept and formula in the left/top scan path, key results bolded at line starts.
3. **Z-pattern** on landing, dashboard, chapter intro: logo (top-left) → nav/CTA (top-right) → hero visual (diagonal) → primary CTA (bottom-right).
4. **Negative space** as a functional separator between concepts, controls, cards, canvas and explanations.
5. **Consistency** across buttons, icons (one set — Lucide), colours, typography, spacing, panels, nav, cards, interactions.
6. **Simple, logical navigation.** The user can always answer: Where am I? What can I do? How do I go back? How do I switch chapter? How do I switch Std 11/12?
7. **Complementary, restrained palette** (Part 8.3). No rainbow UI; colour carries meaning.
8. **Audience-first.** Assume a first-time Std 11/12 student: plain labels, first-run hints, sensible default examples loaded in every lab.
9. **Strong, limited CTAs.** Examples: *Start Exploring, Open Chapter, Try Interactive, Add Function, Practice, Save Project.* Max one primary CTA per view.
10. **Visual hierarchy.** Graph never competes with ten panels — default to ≤ 2 open panels on tablet, ≤ 1 on phone.
11. **Attention to detail.** Designed hover, focus, active, disabled, loading (skeleton), empty and error states; consistent icon alignment; smooth but brief transitions.
12. **Fitts's Law.** Touch targets ≥ 44×44 px (48 preferred); primary actions large and near thumb reach on mobile; destructive actions separated and confirmed/undoable.
13. **Images wisely.** No decorative stock photos. Only mathematical illustrations, diagrams, live visualizations. Every visual has a purpose and alt text.
14. **User experience.** Open chapter → understand → try → change values → observe → read explanation → practise, with minimal clicks.
15. **Grid system.** One shared layout grid; headings, cards, controls and panels snap to it.
16. **Avoid big text blocks.** Paragraphs ≤ 3 short sentences; use cards, bullets, formulas, diagrams, accordions, step-by-step.
17. **Invariance.** Repeated elements look identical everywhere; only special actions (e.g., *Start Interactive*) get intentional emphasis.
18. **Hick's Law.** Group tools as **Basic / Advanced / More Tools**; ≤ 7 visible choices per group; progressive disclosure for the rest.
19. **Symmetry.** Balanced layouts; avoid heavy one-sided panels unless the maths requires it.
20. **Web + mobile.** Purpose-built layouts for mobile, tablet, laptop, desktop, large monitors — not merely shrunken desktop.

### 8.3 Theme & tokens (define once in Tailwind theme / CSS variables)
Suggested palette (adjust only via tokens; verify contrast):

| Token | Light | Dark | Use |
|---|---|---|---|
| `--dk-bg` | #F7F8FC | #0B1020 | App background |
| `--dk-surface` | #FFFFFF | #121A33 | Cards/panels |
| `--dk-text` | #101828 | #E6EAF5 | Body text |
| `--dk-muted` | #5B6475 | #9AA4BD | Secondary text |
| `--dk-primary` | #3B4BDB (indigo) | #7C8CFF | Primary action, focus |
| `--dk-accent-blue` | #2563EB | #60A5FA | Functions/graphs |
| `--dk-accent-violet` | #7C3AED | #A78BFA | Geometry constructions |
| `--dk-success / warn / danger` | green/amber/red (AA-checked) | — | Feedback only |
| `--dk-canvas` | #FFFFFF | #0E1530 | Graph background |

Meaningful accent mapping: **blue = functions/calculus, violet = geometry, teal = statistics/probability, amber = highlights/warnings.** Deep navy as the brand foundation. Also define tokens for spacing, radius (8/12/16), shadows (2 levels only), font sizes, motion (durations 120/200 ms; one easing curve), breakpoints, panel widths, toolbar height, canvas defaults.

### 8.4 Comfort & concentration rules
- The canvas is always the visual priority; chrome is low-contrast until hovered/focused.
- Motion only when it aids understanding (panel slide, selection, graph transitions, secant→tangent animation, camera easing). Forbidden: floating particles, glow effects, animated backgrounds, auto-playing decorative 3D, long loaders.
- Respect `prefers-reduced-motion`; provide animation-intensity setting (Off/Low/Normal).
- Soft shadows, generous radius, no gradients behind maths content; subtle gradient allowed only in the landing hero.
- Dark theme uses desaturated colours to reduce glare; never pure-white text on pure-black.

### 8.5 Mobile-first layout behaviour
- **Phone:** bottom tool bar; panels as bottom sheets/drawers; single-column chapter pages; swipe between Learn/Interactive/Practice tabs; formulas horizontally scrollable, never clipped; canvas supports pinch-zoom/drag.
- **Tablet:** two-panel layout (canvas + one switchable panel).
- **Laptop/Desktop:** full multi-panel workspace.
- **Large monitor:** expanded canvas (don't stretch text columns beyond ~75 characters).

---

## 9. REUSABLE COMPONENTS (build once, reuse everywhere)

**UI:** DKButton, DKIconButton, DKCard, DKModal, DKDialog, DKDrawer, DKPanel, DKTabs, DKDropdown, DKTooltip, DKToast, DKToolbar, DKSidebar, DKToolGroup, DKGraphToolbar, DKObjectList, DKPropertyPanel, DKSlider, DKMathInput, DKFormula (KaTeX), DKChapterCard, DKLanguageSelector, DKCommandPalette.
**Math:** FunctionEditor, EquationEditor, PointEditor, MatrixEditor, VectorEditor, CoordinateEditor, SliderEditor, DomainEditor, ColorStyleEditor, GraphViewport, AxisController, GridController, ObjectManager, DependencyViewer, ConstructionHistory, CalculationPanel, ExplanationPanel, FormulaPanel, PracticePanel, ChapterRenderer, ConceptPath (calculus chain).

Rules: one implementation per component; accessible by default (roles, labels, focus trap in modals, Esc to close); a living style-guide page shows every component/state; `npm run check` detects duplicate component implementations.

---

## 10. PREBUILT TECHNOLOGY — "LESS CODE, MORE RELIABILITY"

**Principle:** do not reinvent mature technology. Before adding any dependency, record in `DECISIONS.md`: licence, maintenance activity, gzipped size, browser support, offline behaviour, API quality, security history, performance. Add only what is genuinely useful. Check the *current* version and docs at install time (don't rely on remembered APIs).

| Need | Recommended default | Notes |
|---|---|---|
| Build tool | **Vite** (multi-page app, TypeScript) | Enables code splitting, dynamic imports, fast dev. |
| UI styling | **Tailwind CSS** (current major version) | Mobile-first utilities, theme variables as tokens, CSS generated from used classes only. Wrap repeated class sets into `DK*` components — avoid giant unreadable HTML. |
| Components | Lightweight (e.g., Preact or Web Components/Lit) or plain TS modules | Decide via ADR; keep initial JS small. |
| Icons | **Lucide** (ISC) | Import individual icons only. |
| Math parsing/numerics/matrices | **math.js** | Import only needed functions/modules where possible. |
| Symbolic (derivative/integral exact) | **Nerdamer** or **Algebrite** (evaluate) | Lazy-load; always cross-check with numeric result; label clearly when exact form isn't available. |
| Formula rendering | **KaTeX** | Faster/smaller than MathJax; self-host fonts. |
| 2D graphing/geometry | Own `GraphViewport` on Canvas/SVG **or** evaluate JSXGraph (dual-licensed) | Decide via ADR after a small spike; don't use both. |
| 3D | **Three.js** (MIT) | Lazy import; only on 3D pages. Use OrbitControls for rotate/zoom/pan. |
| Charts (statistics) | Chart.js or uPlot (evaluate) | Keep small; histogram, bar, polygon, pie. |
| Editable grids (matrices/data) | Simple custom accessible grid, or a small open-source grid if needed | Avoid heavy spreadsheet libs until Phase 3. |
| Storage | **IndexedDB** via Dexie (or idb) + localStorage for tiny settings | |
| PDF export | **jsPDF** (+ canvas/SVG capture) | |
| PWA/offline | Service worker via Workbox / vite-plugin-pwa | Cache app shell + curriculum JSON + fonts. |
| Testing | **Vitest** (unit/math), **Playwright** (UI, responsive, keyboard, a11y with axe) | |
| Lint/format | ESLint + Prettier + TypeScript strict | |

---

## 11. PERFORMANCE & LOADING BUDGETS

- Chapter (non-3D) page: initial JS ≤ **150 KB gzipped**, CSS ≤ **30 KB gzipped**; LCP ≤ 2.5 s on mid-range mobile over 4G; no layout shift from fonts/images.
- Lazy-load: Three.js, symbolic CAS, jsPDF, chart library, each lab's engine, heavy fonts per language (load Gujarati/Devanagari subsets only when that language is active).
- Use `requestAnimationFrame` for drag/animation; debounce expensive recomputes; memoize pure functions; redraw only changed objects; run heavy math in Web Workers.
- Images: SVG/inline diagrams preferred; WebP/AVIF where raster is unavoidable; explicit dimensions.
- `npm run build` reports bundle sizes and **fails** if a budget is exceeded.

---

## 12. PROJECT STRUCTURE & PAGES

```
/config/curriculum/std11.json, std12.json      (editable, versioned)
/core/                                          (engines, pure TS)
/components/ui/   /components/math/             (DK* components)
/i18n/en.json  hi.json  gu.json                 (no strings in HTML)
/pages/ or root *.html                          (thin pages using ChapterRenderer + labs)
/labs/                                          (specialized interactive labs)
/tests/math  /tests/ui  /tests/fixtures
/scripts/                                       (validators, generators)
STATUS.md  DECISIONS.md  README.md
```

**Pages** (generate generic chapter pages from JSON; hand-build only labs):
- Foundation: `index, dashboard, curriculum, projects, settings, help, about`
- Std 11: `std11, std11-sets, std11-relations-functions, std11-trigonometry, std11-complex-numbers, std11-linear-inequalities, std11-permutations-combinations, std11-binomial, std11-sequences-series, std11-straight-lines, std11-conics, std11-3d-introduction, std11-limits-derivatives, std11-mathematical-reasoning, std11-statistics, std11-probability` (+ Mathematical Induction page if in the active curriculum version)
- Std 12: `std12` + the 13 pages in Part 5
- General (Phase 3): `graphing-studio, geometry-studio, cas-studio, calculus-studio, statistics-studio, probability-studio, spreadsheet-studio, 3d-studio, measurement-lab`

Every page appears in a route registry; `npm run check` fails on unregistered pages or broken internal links.

---

## 13. TESTING — MATHEMATICAL GOLDEN VALUES (minimum set)

Tests must compute results through the engines (never compare against hard-coded UI strings). Include at least:

| Area | Input | Expected |
|---|---|---|
| Distance | A(2,3), B(6,7) | 4√2 ≈ 5.6569 |
| Midpoint / slope | same | (4,5) / 1 |
| Section formula | A(2,3), B(6,7), ratio 1:3 internal | (3,4) |
| Line | through (2,3),(6,7) | y = x + 1 |
| Point–line distance | (0,0) to x + y − 2 = 0 | √2 |
| Circle | centre (1,2), r=3 | (x−1)²+(y−2)²=9 |
| Parabola | y²=4ax, a=3 | focus (3,0), directrix x=−3, latus rectum 12 |
| Ellipse | x²/25+y²/9=1 | c=4, e=0.8, foci (±4,0) |
| Hyperbola | x²/9−y²/16=1 | c=5, e=5/3, foci (±5,0) |
| 3D distance | P(2,3,4) from origin | √29 |
| Derivative | d/dx(x³+2x) | 3x²+2 |
| Limit | lim x→2 (x²−4)/(x−2) | 4 |
| Integral | ∫₁⁴ x² dx | 21 |
| Area between | y=x and y=x² on [0,1] | 1/6 |
| Matrix det | [[1,2],[3,4]] | −2; inverse [[−2,1],[1.5,−0.5]] |
| Vector | i × j | k; (1,2,3)·(4,5,6)=32 |
| Statistics | 2,4,4,4,5,5,7,9 | mean 5, median 4.5, mode 4, range 7, variance (population) 4, SD 2 |
| Probability | two dice sum = 7 | 1/6 |
| Conditional | P(A∩B)=0.2, P(B)=0.5 | P(A\|B)=0.4 |
| Linear programming | max Z=3x+2y; x+y≤4, x≤3, x,y≥0 | corners (0,0),(3,0),(3,1),(0,4); max 11 at (3,1) |

Also test: parser edge cases and error messages; dependency propagation, deletion, hide/show and cycle prevention; undo/redo round trips; `.dkgs` save→load equality and old-schema migration; i18n key parity across EN/HI/GU; curriculum schema validity.
UI tests (Playwright): navigation, menus, panels, responsive breakpoints (360, 768, 1280, 1920), keyboard-only operation, touch drag, save/load, exports, language switching, no console errors, axe accessibility scan.

---

## 14. DEFINITION OF DONE (QUALITY GATE)

A feature may be marked `VERIFIED` only if **all applicable** items pass:

- [ ] It actually works end to end (no fake/hard-coded results)
- [ ] Mathematical results are correct (golden-value tests pass)
- [ ] Editing works · [ ] Dragging works · [ ] Hide/show works · [ ] Delete works
- [ ] Undo and redo work · [ ] Save and load work · [ ] Export works
- [ ] Dependencies stay synchronized
- [ ] Feature survives page refresh
- [ ] Works on mobile (touch) and desktop · [ ] Keyboard navigation works, focus visible
- [ ] Language switching works (EN/HI/GU), formulas untouched
- [ ] Errors handled gracefully with helpful messages (e.g., "Inverse does not exist: determinant is 0")
- [ ] No console errors · [ ] No broken links · [ ] No fake/decorative controls
- [ ] Accessibility: labels, contrast, reduced motion, text alternative for visualizations where practical
- [ ] Performance budget respected

If any critical item fails → **do not mark complete.**

---

## 15. AI-AGENT OPERATING PROTOCOL

**Pre-flight (before each milestone):**
1. Inspect the existing project and `STATUS.md`.
2. Inspect existing dependencies and reusable code.
3. Identify duplicated code, missing functionality and known bugs.
4. Choose the smallest reliable architecture.
5. Check whether a mature library solves the problem; verify licence/size/maintenance.
6. Write a short plan (files, tests, risks) — then code.

**During work:**
- Do not rewrite working systems without cause; do not create duplicate engines/components; do not generate hundreds of files without architecture.
- Prefer configuration + generators over copy-pasted pages (`chapter JSON → ChapterRenderer → page`).
- Write tests with the feature, not after.
- Commit in small, reviewable steps with clear messages.

**After work:**
- Run `npm run check` (lint + types + tests + curriculum/i18n/link validation).
- Update `STATUS.md` honestly; record decisions and known limitations in `DECISIONS.md`.
- Report: what works, what is partial, what is not started, what was verified and how.

**Automation scripts to provide:** `dev, build, test, test:math, test:ui, lint, format, check, validate-curriculum, generate-pages, generate-i18n-check, audit-dependencies` — capable of: validating chapter configs, detecting missing translations, broken internal links, unregistered pages, duplicate components, verifying every route, validating worked-example values with the engine, running all tests.

---

## 16. MULTILINGUAL & EXPLANATION SYSTEM

- Languages: English, हिन्दी, ગુજરાતી. All UI, menus, buttons, tooltips, errors, help, chapter descriptions and explanations come from `/i18n/{en,hi,gu}.json` and curriculum JSON — **no language strings in HTML**.
- Math notation, variables and LaTeX stay untranslated; number formatting follows the user's setting (Latin digits default; native digits optional).
- Keep a terminology glossary (`/i18n/glossary.json`) for consistent mathematical terms (e.g., parabola, tangent, determinant) in Hindi and Gujarati. Mark any machine-drafted translation `"reviewStatus":"needs-review"` so teachers can correct it; never present unreviewed text as authoritative.
- **ExplanationEngine:** generates *What? Why? How? Formula · Steps · Example* from the **live objects**: e.g., for A=(2,3), B=(5,7) it writes the distance explanation with those actual numbers (d = √((5−2)²+(7−3)²) = 5), in the active language, rendered with KaTeX.

---

## 17. ACCESSIBILITY

Keyboard operability for all controls (including an alternative to dragging: select a point and use arrow keys or type coordinates); visible focus; AA contrast; reduced motion; scalable text (up to 200 % without loss); ARIA labels/roles; accessible tooltips (focusable, dismissible); ≥ 44 px touch targets; text alternatives describing each visualization's current state (e.g., "Parabola y²=12x, focus (3,0)").

---

## 18. SCOPE HONESTY RULES

- Browser-only Focus Mode ≠ secure exam lockdown; do not claim otherwise.
- Do not present syllabus data as official unless verified against the current GSEB textbooks/syllabus; keep `curriculumVersion` and `sourceNote` accurate.
- Do not claim CAS power beyond what the chosen library verifiably does; show numeric fallback with stated method/error.
- Do not claim offline support until the PWA passes an offline test.

---

## 19. FINAL INSTRUCTION TO THE AGENT

Build DKGraphSuite as a real product. **Finish Std 11 Science Mathematics, then Std 12 Science Mathematics, then expand.** At every stage preserve previous features, improve them, reuse existing code, use mature libraries where they reduce code and risk, test everything, fix real bugs, and never fake functionality.

Optimize for: *working capabilities · usefulness in real study sessions · clarity · focus · learning · navigation · confidence.*
Do **not** optimize for: *page count · screenshot appeal · visual complexity.*

The goal is a genuinely usable, calm, attractive and impressive mathematical software ecosystem — one where a student learns a concept and immediately experiments with it.

---

## APPENDIX A — FEATURE PRESERVATION LEDGER (v1.0 → v2.0)

Every v1.0 item is retained. Where it lives in v2.0:

| v1.0 topic | v2.0 location |
|---|---|
| Executive vision, originality, no-fake rule | Part 1 |
| Development priority (Std 11 → 12 → general) | Parts 2–3 |
| Std 11 curriculum config & chapter list | Part 4.1 |
| Ten-section chapter system, EN/HI/GU | Part 4.2 |
| Straight Lines, Conics, 3D, Limits, Statistics, Probability labs | Part 4.3 |
| Std 12 config, pages, calculus chain, integration, area, matrices/determinants, vectors, 3D, LP, probability | Part 5 |
| Shared engine list (18 engines) | Part 6 (+ `ExplanationEngine` added) |
| Editable mathematical state / dependencies | Part 6.1 |
| Workspace, hamburger menu, object manager, function manager, hideable UI | Part 7.1–7.4 |
| Customization center | Part 7.5 |
| Command palette, scripting, focus/presentation, project format, undo/redo, export | Parts 7.6–7.10 |
| Design philosophy, 7 principles, 5 guidelines, 20 principles | Part 8 |
| Mobile-first | Part 8.5 |
| Fast loading / performance architecture | Part 11 |
| Prebuilt technology / Tailwind / component systems | Parts 9–10 |
| Page structure (foundation, Std 11, Std 12, general) | Part 12 |
| Development scripts / curriculum page generation | Parts 12, 15 |
| Design tokens, animation philosophy, attractive-but-comfortable, brand identity | Parts 8.3–8.4, 1.1 |
| Quality gate, testing | Parts 13–14 |
| Development order (22 steps) | Part 3 (milestones M0–M16 cover all 22 steps) |
| Do-not-remove rule, smart-agent behavior, reusability rule | Parts 0, 9, 15 |
| Accessibility, multilingual, explanation engine | Parts 16–17 |

**New in v2.0:** milestone exit criteria, `STATUS.md`/`DECISIONS.md` workflow, concrete token palette and font stack (Gujarati/Hindi-safe), enforceable versions of all 20 principles, dependency decision table, performance budgets, golden-value math tests, curriculum `curriculumVersion` field, slug-conflict fix (`application-of-derivatives`), sandboxed-scripting guidance, honesty rules.


---

# PART B — AI CODING AGENT MASTER PROMPT

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


---

# PART C — CURRENT PRIORITY: STD 12 CHAPTERS 6–12 + TEXTBOOK WORKFLOW


# DKGraphSuite — Std 12 Chapters 6–12 Textbook-Driven Learning Focus

## Current Development Priority

The long-term goal remains the complete GSEB Std 12 Science Mathematics syllabus.

For the current phase, prioritize:

1. Chapter 6 — Applications/Uses of Derivatives
2. Chapter 7 — Integrals
3. Chapter 8 — Applications of Integrals
4. Chapter 9 — Differential Equations
5. Chapter 10 — Vector Algebra
6. Chapter 11 — Three-Dimensional Geometry
7. Chapter 12 — Linear Programming

Do not remove the long-term full-syllabus goal. These seven chapters are simply the current implementation priority.

## Textbook PDF Is the Primary Source

When the textbook PDF is supplied, use it as the primary source for Chapters 6–12.

First analyse the PDF before building the chapter pages.

Create:

- `TEXTBOOK_ANALYSIS.md`
- `IMPORTANT_QUESTIONS.md`

The analysis must identify:

- chapter and topic structure
- theory and definitions
- important formulas
- important examples
- exercise questions
- question types
- important concepts
- questions that represent different methods
- questions suitable for graph/diagram/3D visualization

Do not invent textbook questions when the PDF contains the required material.

Do not silently correct, rewrite, or change the mathematical meaning of the source.

If something in the PDF is unclear or unreadable, flag it for review instead of guessing.

## Important Questions Only

Do not put every textbook question into the learning interface.

Select questions that provide useful coverage of:

- core concepts
- important methods
- different question patterns
- applications
- graphical understanding
- varied difficulty
- exam-relevant practice

Avoid unnecessary duplicate questions.

Do not create an unsupported numerical ranking such as "most important question 1". Use neutral categories such as:

- Core Concept
- Method Practice
- Application
- Higher Practice
- Visualization

Every selected question must retain its textbook reference, such as:

`Chapter 6 → Exercise 6.2 → Question 7`

## Exact Mathematical Typography

Preserve the textbook's mathematical notation accurately.

This includes:

- fractions
- powers
- roots
- limits
- derivatives
- integrals
- vectors
- matrices
- determinants
- coordinates
- inequalities
- Greek letters
- subscripts
- superscripts
- equations

Use proper mathematical rendering such as KaTeX.

The student must see formatted mathematics, not raw LaTeX source.

For example, display:

`∫₁⁴ x² dx`

rather than displaying raw LaTeX code.

The source/code may contain LaTeX internally, but the student-facing interface must render it properly.

## One Question / Exercise Learning Page

Each selected important question should have a dedicated learning view/page.

Each page should contain:

### 1. Question
Show the source question accurately.

### 2. What This Teaches
A short, simple explanation of the concept.

### 3. Given
List the information provided.

### 4. Required
State what must be found.

### 5. Formula / Concept
Show the relevant formula or concept.

### 6. Step-by-Step Solution
Show the complete mathematical solution without skipping important steps.

### 7. Visual Explanation
Use a real graph, diagram, animation, or 3D visualization whenever it improves understanding.

### 8. Final Answer
Clearly show the final result.

### 9. Understand It
Explain why the method works in simple student-friendly language.

### 10. Try Changing It
Where mathematically appropriate, let students change values and see real calculations and visualizations update.

## Visual Learning Requirements

Graphics must teach mathematics, not merely decorate the page.

### Chapter 6 — Applications of Derivatives
Visualize:

- function curves
- increasing/decreasing regions
- stationary points
- maxima/minima
- tangent and normal
- changing parameters

### Chapter 7 — Integrals
Visualize:

- function curves
- limits
- shaded areas
- changing integration limits
- derivative/integral relationships

### Chapter 8 — Applications of Integrals
Visualize:

- area under curves
- area between curves
- boundaries
- intersections
- changing regions

### Chapter 9 — Differential Equations
Where useful, visualize:

- solution curves
- direction/behaviour
- changing constants

### Chapter 10 — Vector Algebra
Visualize:

- vectors
- magnitude
- direction
- addition/subtraction
- dot product
- cross product
- projection
- angles

### Chapter 11 — Three-Dimensional Geometry
Use a real interactive 3D scene with:

- rotate
- zoom
- pan
- reset

Show:

- points
- lines
- planes
- direction vectors
- intersections
- angles
- distances

### Chapter 12 — Linear Programming
Visualize:

- inequalities
- boundary lines
- feasible region
- corner points
- objective function
- maximum/minimum

## Real Interactive Mathematics

Never hard-code results merely to make a demonstration look correct.

If the student changes a value, the mathematical engine must recalculate the result.

Examples:

- changing a function updates its graph and dependent calculations
- changing integration limits updates the shaded region and result
- moving a point updates dependent geometry
- changing an LP constraint recalculates the feasible region
- changing vector values updates magnitude/products/angles

Follow the DKGraphSuite rule:

**Real or hidden. Never fake.**

## Live Explanations

All generated explanations must use the current mathematical state.

If a student changes a value, the explanation must use the new value.

Support:

- What?
- Why?
- How?
- Formula
- Steps
- Example

## Theory Before Questions

Each chapter should first explain the theory needed for its selected questions.

Recommended structure:

1. Learn
2. Concepts
3. Formula
4. Visual Explanation
5. Worked Examples
6. Important Questions
7. Practice

Use simple language appropriate for a Std 12 student.

## Source Traceability

Every question must preserve its textbook reference.

Do not silently rewrite the source question.

If the textbook appears to contain an error or unclear notation:

- preserve the source version
- flag the issue
- do not silently correct it

## Student Interface vs Code

The student should see:

- clean questions
- proper mathematical typography
- graphs
- diagrams
- explanations
- steps
- answers
- interactive controls

The student should not see:

- JavaScript/TypeScript source
- JSON
- raw LaTeX
- internal engine code
- implementation details

## Question Data Model

Maintain structured data for selected questions, for example:

```json
{
  "chapter": 6,
  "exercise": "6.1",
  "questionNumber": "Q1",
  "source": "textbook",
  "importanceType": "Core Concept",
  "question": "...",
  "topic": "...",
  "solution": {
    "given": [],
    "formula": [],
    "steps": [],
    "answer": "..."
  },
  "visualization": {
    "type": "graph",
    "required": true
  }
}
```

The implementation may improve this schema, but source traceability must remain.

## Development Order

1. Read and analyse the supplied textbook PDF.
2. Extract Chapters 6–12.
3. Create the topic list.
4. Create the important-question list.
5. Verify mathematical notation against the PDF.
6. Create solution data.
7. Design the chapter learning structure.
8. Build the reusable exercise-page system.
9. Build graph/visualization systems.
10. Add questions and solutions.
11. Test every mathematical result.
12. Test every visualization.
13. Test mobile and desktop.
14. Test English/Hindi/Gujarati.
15. Run the complete quality gate.
16. Verify the chapter before moving to the next one.

## Quality Check for Every Question

Every selected question must pass:

- source question checked
- mathematical notation checked
- solution checked
- formula checked
- final answer checked
- visualization checked
- interactive values checked
- explanation checked
- mobile layout checked
- keyboard accessibility checked
- no console errors
- no fake controls

If a critical part fails, do not mark the question complete.

## Priority

The final product should feel like:

**Textbook + Teacher + Graphing Tool + Calculator + Interactive Maths Lab**

The learning flow should be:

**Read → Understand → See → Change → Calculate → Practise**

First make Chapters 6–12 complete and verified.

Then expand to the remaining Std 12 Science Mathematics syllabus.

Never sacrifice mathematical correctness for visual appearance.
Never sacrifice useful explanation for unnecessary design.

# Integration Instruction

All requirements in this section are ADDITIVE to the main DKGraphSuite specification and AI-agent prompt.

The original 20 rules remain mandatory.

Earlier features must never be removed to implement this focused textbook workflow.

The supplied textbook PDF becomes the primary source for textbook-derived content, while the Master Specification remains the source of truth for product architecture, quality, UX, engines, accessibility, performance, testing, multilingual support, and development discipline.
