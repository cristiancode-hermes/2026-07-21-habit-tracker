# Habit & Goal Tracker

A multi-tenant habit and goal tracking application built with Angular 22 + NestJS 11.

## Quick Start

```bash
# Install dependencies
cd /opt/data/repositorios/2026-07-21-habit-tracker
npm install

# Seed the database
cd apps/api && /opt/data/repositorios/2026-07-21-habit-tracker/node_modules/.bin/nest start &
curl -X POST http://localhost:3000/api/seed

# Start the frontend
cd ../web && /opt/data/repositorios/2026-07-21-habit-tracker/node_modules/.bin/ng serve
```

- **Frontend:** http://localhost:4200
- **API:** http://localhost:3000
- **Swagger:** http://localhost:3000/api/docs
- **Demo login:** demo@example.com / demo1234

## Build

```bash
# Backend
cd apps/api && /opt/data/repositorios/2026-07-21-habit-tracker/node_modules/.bin/nest build

# Frontend
cd apps/web && /opt/data/repositorios/2026-07-21-habit-tracker/node_modules/.bin/ng build
```

Both builds pass with zero errors.

## Features

- ✅ JWT authentication with org-scoped multi-tenancy
- ✅ Habit CRUD with color/icon customization
- ✅ Daily check-in (done/skipped)
- ✅ Streak tracking (current + longest)
- ✅ Goal management with progress bars
- ✅ Dashboard with summary cards
- ✅ Weekly consistency percentages
- ✅ GitHub-style activity heatmap (90 days)
- ✅ Dark mode with persistent preference
- ✅ Responsive design
- ✅ 6 habits with 30 days of seed data
