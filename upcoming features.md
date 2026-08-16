# Upcoming Features & Enhancements

Ratings and a prioritized backlog for **Weather Now**.

## Overall Rating

| Dimension | Score /10 | Notes |
|---|---|---|
| Architecture | 8 | Clean split: Zustand (client UI state) vs TanStack Query (server state), co-located CSS Modules, `@/*` alias. Solid foundation. |
| TypeScript usage | 6 | Good types in stores, but `any` in `citySearchService.ts`, index-based API access (`variables(0)`), and duplicated inline shape types. |
| Code quality | 6 | `npm run lint` fails (2 errors, 9 warnings): async reassignment in `Search.tsx`, dead code (`{true ? ...}`, unused imports), leftover `console.log`. |
| Data correctness | 5 | "Feels Like" reuses current temp (no `apparent_temperature` fetched); weather codes fetched but never mapped to icons. |
| UX / states | 5 | No loading skeleton, no global error state, geolocation failure silent, search dropdown never closes. |
| Accessibility | 4 | `<option>` rendered outside a `<select>` (`UnitOption`), no focus management on sidebar/dropdown, results list not keyboard-navigable, no `aria-*`. |
| Testing | 1 | No test setup or tests at all. |
| Documentation | 8 | `project-weather-now.md` and README are excellent; slightly out of date with actual code. |

**Overall: 6/10** — a well-structured hackathon snapshot with real momentum, held back by unfinished wires (icons, error/loading states, day selector), accessibility gaps, and no tests. The state-management split and component organization are genuinely good.

---

## P0 — Correctness & polish (finish what's half-built)

1. **Map Open-Meteo WMO weather codes to the `public/images/icon-*.webp` set**
   - `fetchWeatherData.ts` already requests `weather_code` for daily but never returns it; current/hourly don't request it at all.
   - Add a `utils/weatherCodes.ts` mapping WMO codes → icon, and thread codes through `current`, `hourly`, `daily`.
   - Trade-off: map once in the service layer (icon name travels with the data) vs. in each component (keeps service pure). Service layer avoids repeating the mapping in 3 containers.

2. **Fix the "Feels Like" widget** — it currently displays the current temperature because `apparent_temperature` is never fetched. Add it to the `current` params.

3. **Loading + error states** — the `isPending` from the query is unused (`ForecastContainer.tsx:29`), and both services swallow failures (`citySearchService` returns `[]`, geolocation logs a warning, TODO comments everywhere).
   - Add a skeleton/loading UI for the forecast containers and a global error state (the `Not-Found` component is already reusable).
   - Add `ErrorBoundary` + TanStack Query `retry`/`refetchOnWindowFocus` policy.

4. **Fix lint blockers** — async reassignment in `Search.tsx:23` (drop the `result` local, use `setResults` directly) and `no-explicit-any` in `citySearchService.ts` (type the `results` response shape). Remove dead code: `console.log`, unused imports, `{true ? ... : ""}` in `CurrentWidget`.

5. **Search race conditions** — debounce exists but stale responses can override newer ones. Use `AbortController` (fetch accepts a signal) and ignore responses from superseded requests.

## P1 — Features that complete the product

6. **Close the search dropdown** — on result click (TODO comment already marks this), on outside click, and on Escape. Add `aria-expanded`/`aria-haspopup` to the input.

7. **Wire `SelectDay` to real state** — it's a static `<select>`. Store an `activeDay` (UI store), filter the 24 hours accordingly, and build a custom accessible listbox (the TODO asks for this). Also render an icon per hour, which requires `weather_code` per hourly entry (see #1).

8. **Persist preferences + last location** — `preferences.store.ts` and location are lost on refresh. Zustand's `persist` middleware with `localStorage` is the standard, low-boilerplate option. Note: geolocation already writes to `localStorage` manually — consolidate that into the store to avoid two sources of truth.

9. **Geolocation UX** — currently fires silently on mount. Handle permission-denied gracefully (show a hint + keep manual search as fallback), add an "use my location" button, and cover the loading window.

10. **Server-side type safety** — replace index-based `variables(0)` access with a named lookup, and centralize the response types (current/hourly/daily shapes) in one place instead of re-declaring them in each container. The `openmeteo` SDK's `Response` type can drive this.

## P2 — Stretch goals

11. **Tests** — start with unit tests for `utils/unitConverting.ts` and the three Zustand stores (pure logic, cheap wins), then component tests for `Search` (debounce + dropdown) and `UnitOption`. Vitest + React Testing Library is the current standard for Next/Vite projects.

12. **Favorites** — already on the README roadmap. Persisted list of saved locations with quick re-selection; reuses the location store pattern.

13. **i18n / multi-language** — also on the roadmap. Next.js `app/` has built-in internationalized routing; for a lightweight option, `next-intl` is the popular choice.

14. **Accessibility pass** — fix the invalid `<option>`-outside-`<select>` in `UnitOption` (use buttons/radio group with `aria-pressed` or `role="radiogroup"`), focus management + Escape-to-close on the Units sidebar, and a visible focus ring.

15. **Housekeeping** — delete the stray `nul` file at the repo root (a Windows output-redirect artifact), and refresh `project-weather-now.md` to reflect what's actually shipped.

16. **Server Components for first paint** — the whole page is `"use client"`. For a portfolio, moving the initial weather fetch to a Server Component (or `next/server` fetch) would cut client JS and improve LCP. Trade-off: complexity against a frontend-only learning goal.
