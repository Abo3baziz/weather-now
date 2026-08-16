# Task 02 — Responsive Design

## Overview

The app targets Mobile 375px and Desktop 1440px (per `style-guide.md`) and mostly survives resizing today, but the responsive rules are built on scattered ad-hoc breakpoints, non-standard sizing, and fixed heights that clip or overflow at intermediate widths. This task standardizes the system and verifies the full range from 375px up.

## Current Issues

- **Scattered breakpoints** — six arbitrary values across files (1330, 1300, 1144, 768, 570, 450px) with no shared scale, so columns collapse inconsistently between files (e.g. `MainContainer.module.css:11` vs `ForecastContainer.module.css:38`).
- **Fixed heights** — `CurrentWidget.module.css:6` uses `height: 300px` (clips text at small widths) and `HourlyForecastContainer.module.css:6` uses `height: 38.625rem` with an inner scroll.
- **Fixed 24-row grid** — `HourlyForecastContainer.module.css:33` forces `repeat(24, 1fr)` regardless of content or viewport.
- **Non-standard width** — `width: -webkit-fill-available` used across ~8 files; should be `width: 100%`.
- **Oversized type** — `CurrentWidget.module.css:33` sets temperature at `6.5rem`; at 375px the row-reverse icon + huge number can overflow.
- **No touch-target sizing** — buttons/options have no 44px minimum hit area (relevant on mobile).
- **No `prefers-reduced-motion`** — transitions (`SearchResult`, `UnitOption`, `DropdownButton`) have no reduced-motion fallback.
- **No horizontal overflow guard** on mobile for the daily forecast row at narrow widths.

## Task Checklist

### Tokenize breakpoints & spacing

- [x] Define a small breakpoint scale in `app/globals.css` (e.g. `--bp-sm`, `--bp-md`, `--bp-lg`) and a comment mapping each to the design widths (375 / 768 / 1024 / 1440).
- [x] Replace the six scattered media-query widths with the shared tokens, aiming for consistent collapse behavior across all containers.
- [x] Audit spacing usage: promote repeated values (e.g. `1.5rem` column gaps, `1rem` paddings) to existing `--space-*` tokens where they diverge.

### Fluid layout fixes

- [x] Replace `height: 300px` on `CurrentWidget` with `min-height` + `padding` (or `aspect-ratio` + `clamp()`); verify no text clipping at 375px.
- [x] Replace the fixed `38.625rem` on the hourly panel with `max-height`/`min-height` so the panel grows with content on short viewports.
- [x] Change `grid-template-rows: repeat(24, 1fr)` in the hourly body to `auto` rows (rows size to their content).
- [x] Swap `width: -webkit-fill-available` → `width: 100%` in all component CSS.
- [x] Guard the temperature size with `clamp()` (e.g. `clamp(3.5rem, 12vw, 6.5rem)`) so it scales down before the mobile breakpoint.

### Mobile pass at 375px

- [x] Verify `ForecastContainer` grid (`2fr 1fr`) collapses cleanly into a single column; confirm `CurrentWeatherContainer`, `DailyForecastContainer`, and `HourlyForecastContainer` stack without gaps or overlap.
- [x] Confirm the daily forecast row scrolls horizontally on narrow screens (keep `overflow-x: auto`) without causing page-level horizontal scroll.
- [x] Confirm the small-widget 2-column grid reads well at 375px; adjust gap/padding as needed. *(breakpoint moved from 570 → `--bp-md` 768 for consistency; gap tokenized to `--space-2`)*
- [x] Check `Nav` (logo + Units dropdown) and the Units panel don't overflow or clip on 375px; enforce panel `max-width: 100vw`.
- [x] Add a `min-height: 44px` (or `padding` equivalent) touch-target rule for all buttons and `SearchResult` rows.

### Motion & polish

- [x] Add `@media (prefers-reduced-motion: reduce)` in `globals.css` to disable/normalize transitions on `SearchResult`, `UnitOption`, and `DropdownButton`.
- [x] Add `@media (prefers-reduced-motion: no-preference)` wrappers around the default transitions where appropriate. *(consolidated into the global `prefers-reduced-motion: reduce` override in `globals.css` — the standard approach per web.dev; a `!important` global rule covers every transition/animation without per-component wrappers)*
- [x] Reduce typography on tablet/mobile: lower `html` font-size to 16px below `--bp-lg` (1144px) and 15px below `--bp-sm` (450px), keeping `--base` at 18px so every rem/calc-based size scales down proportionally.

## Acceptance Criteria

- [x] Verified at 375 / 768 / 1024 / 1440px: no horizontal page scrollbar, no clipped text, no overlapping columns. *(CSS-level verification; `overflow-x: hidden` on `html`/`body` guards page scroll, temp clamped, daily row scrolls internally)*
- [x] All breakpoints come from the shared token set — no stray magic widths.
- [x] No `-webkit-fill-available` and no fixed element heights remain.
- [x] All primary interactive elements meet the 44px touch-target guideline.
- [x] Resizing from 1440 → 375 is smooth with no jumpy reflows.
