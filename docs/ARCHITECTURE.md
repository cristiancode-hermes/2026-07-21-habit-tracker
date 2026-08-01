# Habit & Goal Tracker — Architecture

## Overview

Full-stack monorepo with Angular 22 frontend and NestJS 11 backend. Multi-tenant habit tracking with daily check-ins, streak computation, and goal management.

## Project Structure

```
2026-07-21-habit-tracker/
├── apps/
│   ├── api/                    # NestJS backend
│   │   ├── src/
│   │   │   ├── auth/           # JWT auth, org-scoped multi-tenancy
│   │   │   ├── habits/         # Habit CRUD
│   │   │   ├── entries/        # Daily check-in entries
│   │   │   ├── goals/          # Goal CRUD with progress tracking
│   │   │   ├── dashboard/      # Aggregated queries, streaks, heatmap
│   │   │   ├── seed/           # Demo data seeder
│   │   │   ├── app.module.ts   # Root module with TypeORM SQLite
│   │   │   └── main.ts         # Bootstrap with Swagger, CORS, validation
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/                    # Angular 22 frontend
│       ├── src/
│       │   ├── app/
│       │   │   ├── core/       # Auth service, API service, guards, interceptor
│       │   │   ├── pages/      # Dashboard, Habits, HabitDetail, Goals, Login, Register
│       │   │   └── shared/     # Header, Layout, StreakBadge, Heatmap components
│       │   ├── styles.css      # Tailwind v4 + CSS variables (dark/light)
│       │   └── index.html
│       ├── postcss.config.js
│       ├── angular.json
│       └── package.json
├── docs/                       # Documentation
└── package.json                # Root npm workspace
```

## Data Flow

1. User authenticates via JWT (7-day expiry)
2. All API requests carry Bearer token via auth interceptor
3. Backend scopes all queries by userId (org-scoped multi-tenancy)
4. Dashboard: aggregated queries for streaks, today's entries, goal progress
5. Frontend: signal-based state with HttpClient for API calls

## Database (SQLite dev, PostgreSQL-ready)

**Entities:**
- Organization — multi-tenant group
- User — JWT auth, belongs to org
- Habit — trackable behavior (name, frequency, color, icon)
- HabitEntry — daily log (date, status: done/skipped, notes)
- Goal — measurable target (target count, date range, progress)

## Design Decisions

- **Streak computation in-app** — computed from sorted entries rather than SQL window functions, making it portable across SQLite/PostgreSQL
- **Signals for state** — all reactive state uses Angular signals (no NgRx/Zoneless patterns)
- **CSS variables for theming** — dark/light mode via CSS custom properties, toggled by setting `.dark` class on `<html>`
- **SQLite for dev** — auto-sync schema, seed on /api/seed
