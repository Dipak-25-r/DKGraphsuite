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
