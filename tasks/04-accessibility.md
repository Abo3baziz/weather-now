# Task 04 — Accessibility

## Overview

Make the app fully usable by keyboard and screen reader, and fix the invalid/unsemantic markup. The current state has real structural a11y bugs (invalid HTML, unreachable dropdown content, no focus management) that fail automated audits and real assistive tech. This is the highest-impact correctness work in the project.

## Current Issues

- **Invalid `<option>` outside `<select>`** — `components/UnitOption/UnitOption.tsx:27` renders `<option>` elements inside a `<div>`, which is invalid HTML and invisible to screen readers as interactive controls.
- **Search combobox is not a real combobox** — `components/Search/Search.tsx:82` sets `role="combobox"` with `aria-autocomplete="list"` but the results div has no `role="listbox"`, no `aria-activedescendant`, and no arrow-key navigation; results are only mouse-accessible.
- **Hidden panel still focusable** — `UnitsContainer` hides its content with `style={{ display: "none" }}` (`UnitsContainer.tsx:59`), but the toggle button never gets `aria-expanded`, and there's no focus management or Escape-to-close; focus can also land on the hidden options.
- **No label on search input** — `Search.tsx:79` is placeholder-only; screen readers get `role="combobox"` with no accessible name.
- **No skip link** — keyboard users must tab through Nav + Header before reaching content.
- **No `aria-live`** — loading/error/empty state changes in `ForecastContainer` aren't announced.
- **Generic/empty alt text** — icons use `alt="current weather condition"`, `alt="Logo Image"`, `alt="retry icon"` etc.; they don't describe the weather condition or the control's purpose.
- **Dead button** — `components/Not-Found/Not-Found.tsx:24` has a Retry `<button>` with no `onClick`.
- **Focus styles inconsistent** — `SearchResult` has hover styling only (`SearchResult.module.css:18`); focus states exist on some inputs/buttons but not the results or unit options.
- **Heading structure gaps** — `CurrentWidget`, daily/hourly forecast use `<p>`/`<section>` without headings, so the document outline is flat.
- **Units toggles lack semantics** — `UnitOption`/`SwitchButton` are plain divs/buttons without `aria-pressed` or radio-group semantics.

## Task Checklist

### Search combobox (ARIA 1.2 pattern)

- [ ] Add a visible `<label htmlFor="search-input">` (or `aria-label`) on the search input.
- [ ] Give the results container `role="listbox"` + an `aria-label`, and each result row `role="option"` + `id`.
- [ ] Implement arrow-key navigation (`aria-activedescendant` set to the focused option), Enter to select, Home/End, and Escape to close; sync with the mouse hover state.
- [ ] Set `aria-expanded` only while results are open; keep `aria-controls` pointing at the listbox id.
- [ ] Return focus to the input on close/Escape.

### Units panel (replace invalid markup)

- [ ] Replace `<option>` elements in `UnitOption.tsx` with real `<button>` elements carrying `aria-pressed={isActive}` (the active unit acts as a pressed toggle). Add `aria-label` describing the option ("Temperature: Celsius").
- [ ] Group each measurement (temperature/wind/precipitation) with `role="group"` + `aria-label` instead of bare `<p>` headers.
- [ ] Add `aria-expanded` + `aria-haspopup="true"` to the DropdownButton trigger.
- [ ] Focus management: on open, move focus into the panel; on close (trigger click or Escape), return focus to the trigger.
- [ ] Don't render panel content in the DOM when closed (remove `display: none` pattern) — conditionally render instead, so hidden focusables disappear.

### Global structure

- [ ] Add a "Skip to content" link at the top of `MainContainer` that targets the main content (with `id`).
- [ ] Use proper heading hierarchy: `h1` in Header, `h2` for each forecast section ("Current conditions", "Daily forecast", "Hourly forecast"), and heading elements inside `CurrentWidget`/containers where a label is needed.
- [ ] Make `Nav` a `<nav aria-label="Main">` and give it a skip-safe landmark.

### States & feedback

- [ ] Wrap the `ForecastContainer` loading/empty/error regions in `aria-live="polite"` (or add a visually-hidden status) so changes are announced.
- [ ] Wire up the `Not-Found` Retry button with a working `onClick` (call the query `refetch`), and add a visible focus style.

### Imagery & focus

- [ ] Replace generic alt text: weather icons get descriptive alt ("Sunny", "Rain", "Partly cloudy", etc.) derived from the weather code; logo alt → "Weather Now"; dropdown/retry icons get meaningful alt or `aria-hidden` where decorative.
- [ ] Add visible `:focus-visible` styles to `SearchResult`, `UnitOption`, `SwitchButton`, `DropdownButton`, and the Retry buttons (match the existing `2px solid white` offset pattern).
- [ ] Ensure every interactive element has a ≥3:1 visible focus indicator and meets 44px touch/click targets (coordinate with Task 02).

### Audit & verify

- [ ] Run Lighthouse/axe on desktop and mobile: zero critical/serious violations.
- [ ] Full keyboard walkthrough: Tab to every control, open/close the Units panel, navigate the search results with arrows only.
- [ ] Confirm focus never lands on hidden panel content, and Escape closes both dropdowns.

## Acceptance Criteria

- [ ] axe/DevTools accessibility audit reports 0 violations.
- [ ] Complete app usable with keyboard only (no mouse).
- [ ] No invalid HTML (no `<option>` outside `<select>`, no `<p>` inside `<button>` where semantics require otherwise).
- [ ] All interactive elements have accessible names; all images have meaningful or empty (`aria-hidden`) alt text.
- [ ] Loading/error/search states are announced to screen readers.
