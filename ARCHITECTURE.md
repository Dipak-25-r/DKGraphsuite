# DKGraphSuite — System Architecture Specification

## 1. Overview
DKGraphSuite is a high-performance interactive mathematics workspace and digital textbook for GSEB Std 11 & Std 12 Science Mathematics (English, Hindi, Gujarati).

## 2. Core Architecture & Layers

```
+-----------------------------------------------------------------------+
|                              UI LAYER                                 |
|  [Header & Nav] [Tool Palette] [Canvas / Viewport] [Object/Prop Panel] |
|  [ChapterRenderer] [PracticePanel] [ExplanationPanel] [CommandPalette] |
+-----------------------------------------------------------------------+
|                         DK UI COMPONENTS                              |
|  DKButton, DKCard, DKModal, DKDrawer, DKSlider, DKMathInput, DKFormula |
+-----------------------------------------------------------------------+
|                      REACTIVE MATH ENGINE LAYER                       |
|   MathObject Model -> DependencyEngine (DAG) -> Topological Recompute |
|   HistoryEngine (Undo/Redo) -> ProjectEngine (.dkgs IndexedDB)         |
+-----------------------------------------------------------------------+
|                         SPECIALIZED ENGINES                           |
|   MathEngine | ExpressionParser | FunctionEngine | GeometryEngine     |
|   MatrixEngine | StatisticsEngine | ProbabilityEngine | CalculusEngine  |
|   ThreeDEngine | MeasurementEngine | ExportEngine | LanguageEngine     |
|   ThemeEngine | CommandEngine | ScriptEngine | ExplanationEngine     |
+-----------------------------------------------------------------------+
|                           CURRICULUM DATA                             |
|   /config/curriculum/std11.json | /config/curriculum/std12.json       |
|   /i18n/en.json | /i18n/hi.json | /i18n/gu.json | glossary.json      |
+-----------------------------------------------------------------------+
```

## 3. Data Model (Single Source of Truth)
Every mathematical object in DKGraphSuite follows the `MathObject` model:
```ts
export interface MathObject {
  id: string;
  name: string;
  type: 'point' | 'line' | 'circle' | 'conic' | 'function' | 'slider' | 'matrix' | 'vector' | 'plane' | '3d-point';
  definition: Record<string, any>;
  dependsOn: string[]; // Parent MathObject IDs
  computed: Record<string, any>; // Engine-calculated outputs
  style: {
    color: string;
    strokeWidth?: number;
    dashStyle?: 'solid' | 'dashed' | 'dotted';
    visible: boolean;
    labelVisible: boolean;
  };
  locked: boolean;
}
```

## 4. Design System Tokens (20 Design Principles Enforced)
- **Palette**: Deep Navy (`#0B1020`), Indigo Primary (`#3B4BDB`), Accent Blue (`#2563EB`), Violet (`#7C3AED`), Slate Surfaces (`#FFFFFF` / `#121A33`).
- **Typography**: Inter (Body), Noto Sans Gujarati (Gujarati), Noto Sans Devanagari (Hindi), KaTeX (Math).
- **Layout Grids**: 12-column Desktop, 4-column Mobile. Base spacing unit 4px / 8px scale.
- **Principles Applied**: F-Pattern for reading material, Z-Pattern for dashboards/heroes, Hick's Law progressive tool disclosure, Fitts's Law 44px+ touch targets, Invariance, Negative space emphasis.
