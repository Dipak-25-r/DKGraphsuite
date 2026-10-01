# DKGraphSuite — Architectural Decision Records (ADR)

## ADR-001: Vite + Pure TypeScript ESM Architecture
- **Status**: Accepted
- **Context**: Need fast build times, instant HMR, minimal bundle size, and strict TypeScript safety.
- **Decision**: Use Vite with pure TypeScript ESM architecture and lightweight component views.

## ADR-002: Tailwind CSS Design Tokens & CSS Custom Properties
- **Status**: Accepted
- **Context**: Design system requires light/dark/high-contrast modes, dynamic theme switching, consistent font stacks (Inter + Noto Sans Gujarati + Noto Sans Devanagari), and responsive grid rules.
- **Decision**: Define design tokens in `tailwind.config.js` mapping to CSS variables in `styles/tokens.css`.

## ADR-003: Pure Math Engine Core (`/core`)
- **Status**: Accepted
- **Context**: Engines must be pure TS, zero-DOM, unit-testable in isolation, and runnable in Web Workers if required.
- **Decision**: All mathematical algorithms (geometry, linear algebra, calculus, statistics, probability, dependency graph) live in `/core` with zero DOM dependencies.
