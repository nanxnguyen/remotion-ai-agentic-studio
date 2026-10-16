---
version: alpha
name: "AI Video Production Monitor"
description: "A Vietnamese production control room for tracking video stages, reviews, evidence, and delivery readiness."
colors:
  canvas: "#04060B"
  surface: "#090D15"
  surface-raised: "#0D121C"
  surface-high: "#121A27"
  outline: "#1D2939"
  text: "#E6EDF7"
  text-muted: "#718096"
  primary: "#2DD4BF"
  primary-strong: "#14B8A6"
  cyan: "#38BDF8"
  success: "#4ADE80"
  running: "#FBBF24"
  warning: "#FBBF24"
  danger: "#F87171"
  gate: "#A78BFA"
typography:
  display:
    fontFamily: "'Sora', system-ui, sans-serif"
  body:
    fontFamily: "'Sora', system-ui, sans-serif"
  mono:
    fontFamily: "'JetBrains Mono', monospace"
rounded:
  DEFAULT: "0.75rem"
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
spacing:
  compact: "0.5rem"
  control: "0.75rem"
  card: "1.25rem"
  section: "1.5rem"
components:
  app-shell:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text}"
  section-panel:
    backgroundColor: "{colors.surface}"
  section-divider:
    backgroundColor: "{colors.outline}"
  project-card:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  project-card-hover:
    backgroundColor: "{colors.surface-high}"
  project-card-selected:
    backgroundColor: "{colors.primary-strong}"
  focus-indicator:
    backgroundColor: "{colors.primary}"
  pipeline-progress:
    backgroundColor: "{colors.cyan}"
  pipeline-stage-complete:
    backgroundColor: "{colors.success}"
  pipeline-stage-running:
    backgroundColor: "{colors.running}"
  review-gate:
    backgroundColor: "{colors.gate}"
  review-gate-warning:
    backgroundColor: "{colors.warning}"
  connection-error:
    backgroundColor: "{colors.danger}"
---

# AI Video Production Monitor Design System

## Overview

### Creative North Star

The interface is an autonomous-agent command deck: a near-black spatial canvas, a glowing central orchestrator, four specialist agents, and a compact production pipeline. Its signature is the orchestration map above the live project data.

### Product context and register

- **Audience and primary job:** A Vietnamese video producer watches multiple concurrent agent workflows, finds the current stage, and resolves review gates.
- **Target market and evidence:** Internal Vietnamese production use, based on the repository's Vietnamese workflow copy and status records.
- **Locale and language policy:** Vietnamese UI; technical identifiers and file paths remain unchanged.
- **Usage scene:** Primarily laptop/desktop during production, with a compact mobile view for checking progress.
- **Register:** Product dashboard. Task clarity and state accuracy lead.
- **Memorable signature:** Four color-coded agent modules connected to a teal orchestration hub.
- **Restraint:** Glow, grids, and motion are concentrated in the orchestration map; operational tables remain quiet.
- **Anti-references:** Avoid dense enterprise chrome, generic analytics charts, and decorative metrics not backed by pipeline data.
- **Token ownership/runtime mapping:** This file mirrors the canonical CSS variables in `scripts/monitor.html`; both change together. No generated token adapter is used.

## Colors

Dark mode is canonical. `canvas`, `surface`, `surface-raised`, and `surface-high` create depth through tone. Teal identifies selection, focus, and orchestration; green, amber, red, and purple remain reserved for semantic states.

## Typography

Display and body text use Sora. Paths, composition IDs, stage labels, scores, and timestamps use JetBrains Mono. Both are loaded from Google Fonts with system fallbacks; uppercase is restricted to short command-deck labels.

## Layout

The desktop shell is capped at 1400px with a 288px floating project rail, a 22px gap, and a 1090px detail pane. The header is 42px tall; the 450px orchestration card begins at y=90, followed by a 196px overview and output card. Below 780px, navigation becomes a horizontally scrollable project strip; the pipeline and tables retain their own horizontal scroll owners.

## Elevation & Depth

Hierarchy comes from translucent dark surfaces, one-pixel borders, restrained glow, and a perspective grid behind the command deck. Blur and glow never carry state without a text label.

## Shapes

Primary cards use 18px radii, project cards 12px, controls 8–12px, and status badges use pills. Pipeline stages are circular robot orbs connected by one-pixel signal lines.

## Components

### Foundational visual states

Every interactive target has default, hover, focus-visible, active, selected, disabled, and busy treatment. State is communicated by icon, label, and color. Initial loading reserves the content region; refresh retains existing data. Reduced-motion mode removes traveling highlights and transforms.

### Buttons and actions

Gate approval uses solid success emphasis; revision uses a restrained danger outline. Project and stage selectors remain native buttons with visible focus rings and at least 40px practical height. Busy state preserves button geometry.

### Navigation and data display

Project navigation is a named `<nav>` with one current item. Progress bars expose values to assistive technology. Tables retain semantic headings and use horizontally scrollable wrappers on narrow screens. Activity uses a semantic list; connector lines are decorative.

### Forms and overlays

Gate comments use visible labels, non-resizable textareas, descriptive help, and server-confirmed actions. Critical errors remain visible until recovery. This screen has no modal or toast owner.

### Iconography

Use small inline geometric SVG icons with a 1.8px rounded stroke. Text labels remain mandatory for all actions and production states.

### Motion

Only the active pipeline signal and live connection indicator animate continuously. Hover and selection transitions run for 160–220ms. Reduced-motion mode removes all travel, spin, and transform animation.

### Content and data visualization

Vietnamese copy is direct and operational. Percentages, stage counts, gate scores, timestamps, and file evidence are always available as text. Color never replaces a status label.

## Do's and Don'ts

- **Do:** Make the current stage and next action understandable within one scan.
- **Do:** Keep status color meanings identical across cards, pipeline, reviews, and tables.
- **Don't:** Add decorative metrics or charts that are not backed by pipeline data.
- **Don't:** Hide evidence, columns, or state meaning solely to make mobile screenshots cleaner.
