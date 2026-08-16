# Task 01 — Project Structure

## Overview

Harden the project's architecture so it's maintainable, idiomatic for Next.js App Router, and portfolio-presentable. The current split (Zustand for client UI state, TanStack Query for server state, co-located CSS Modules) is a strong foundation; this task removes the rough edges that would trip up a reviewer.

## Current Issues

- **Entire page is `"use client"`** — `app/page.tsx:1` renders everything client-side, so no content is server-rendered on first paint. The layout shell (Nav, Header, MainContainer) has no reason to be client-rendered.
- **`QueryClient` created at module level** — `app/page.tsx:13` creates it inline in the page; standard practice is a single shared instance in a dedicated provider.
- **Store imported at module scope in a service** — `services/geolocationApi.ts:1-3` calls `useLocationStore.getState()` at import time, coupling a service to a store as a side effect.
- **Types re-declared inline** — `CurrentWeather`/`HourlyWeather`/`DailyWeather` live in `services/fetchWeatherData.ts` but components re-declare ad-hoc shapes (e.g. `ForecastContainer.tsx:45-51`), so a field change can silently drift.
- **Folder naming inconsistent** — `components/OneHourForecast.tsx/` (extension in folder name) and `components/Not-Found/` (kebab-case) break the PascalCase convention used elsewhere.
- **No `.env.example`** — `.env` holds `REVERSE_GEOCODING_WITH_TIMEZONE_API` but new contributors have no template to copy.
- **Lint fails** — `npm run lint` reports errors: async reassignment in `Search.tsx`, `no-explicit-any`, and dead code (unused imports, leftover `console.log`).

## Task Checklist

### App architecture

- [x] Convert `app/page.tsx` into a Server Component that renders the static shell (MainContainer → Nav, Header, Search).
- [x] Move `QueryClientProvider` into a dedicated `app/query-provider.tsx` (or `components/QueryProvider/`) that owns a module-level `QueryClient`.
- [x] Keep `"use client"` only on components that genuinely need it: `Search`, `DropdownButton`/`UnitsContainer`/`UnitOption`/`SwitchButton`, `ForecastContainer` and its forecast children, `CurrentWeatherContainer`, `DailyForecastContainer`, `SelectDay`.
- [x] Verify `Header` and `MainContainer` become pure Server Components (no hooks, no client deps).

### Services layer

- [x] Extract the store subscription out of `services/geolocationApi.ts` so it's a pure function taking callbacks; have the caller (a hook or component) wire it to the store.
- [x] Add `.env.example` documenting `REVERSE_GEOCODING_WITH_TIMEZONE_API` and copy `.env` → `.env.example` (with a placeholder value).

### Types

- [x] Keep `CurrentWeather`, `HourlyWeather`, `DailyWeather`, `WeatherData` as the single source of truth in `services/fetchWeatherData.ts`; import them in every consuming component and delete inline re-declarations.
- [x] Replace index-based `variables(0)` access in `fetchWeatherData.ts` with named field lookups where the `openmeteo` SDK type allows, or at minimum document the field order with a typed mapping. *(Attempted named lookups via the SDK's `Variable` enum — verified against the live API that daily `temperature_2m_max`/`min` both encode as `Variable.temperature`, so daily can't be resolved by name. Reverted to the documented positional mapping; a comment in `fetchWeatherData.ts` documents the exact field order.)*

### Naming & organization

- [x] Rename `components/OneHourForecast.tsx/` → `components/OneHourForecast/` and `components/Not-Found/` → `components/NotFound/` (update all imports).
- [x] Add `index.ts` barrel files for `components/`, `services/`, `store/`, and `utils/` so imports read `@/components` / `@/services` consistently.

### Code quality (lint blockers)

- [x] Fix async reassignment in `components/Search/Search.tsx:23` (avoid mutating the `result` local across awaits). *(already clean in current code — lint confirms)*
- [x] Type the `results` response in `services/citySearchService.ts` instead of leaving `any`-adjacent shapes. *(already typed in current code)*
- [x] Remove dead code: unused imports, `console.log`, and any `{true ? ... : ""}` remnants. *(console.warn removed during geolocation service rewrite; lint passes)*

## Acceptance Criteria

- [x] `npm run lint` passes with zero errors and zero warnings.
- [x] `npm run build` completes successfully.
- [x] The first paint includes server-rendered HTML for the shell (no client-only loading shell for Nav/Header/Search).
- [x] No `services/` file imports a Zustand store or React hook.
- [x] All component folders follow PascalCase; no folder name contains a file extension.
- [x] No duplicated weather-data types outside `services/fetchWeatherData.ts`.
- [x] `.env.example` exists and is committed.
