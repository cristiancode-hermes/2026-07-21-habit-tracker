# Habit & Goal Tracker — Frontend

## Tech Stack
- Angular 22 (standalone components, signals, zoneless-ready)
- Tailwind CSS v4 (@import + @theme)
- CSS custom properties for dark/light mode
- HttpClient with functional interceptors

## Pages

| Route | Component | Description |
|-------|-----------|-------------|
| /login | LoginComponent | Email/password login |
| /register | RegisterComponent | Registration with org |
| /dashboard | DashboardComponent | Summary cards, today's habits, active goals |
| /habits | HabitsComponent | Grid of all habits + create form |
| /habits/:id | HabitDetailComponent | Single habit view with stats, 7-day log, heatmap |
| /goals | GoalsComponent | Goal list with progress bars |

## Components

| Component | Usage |
|-----------|-------|
| HeaderComponent | Top nav with dark mode toggle, logout |
| LayoutComponent | App shell with header + router outlet |
| StreakBadgeComponent | Color-coded streak counter pill |
| HeatmapComponent | GitHub-style activity grid |

## State Management
- AuthService: signal-based user state + localStorage persistence
- ApiService: thin wrapper around HttpClient
- Page components: local signals for API response data

## Dark Mode
- Toggle via AuthService.toggleDarkMode()
- Persisted to backend (user.isDarkMode)
- CSS custom properties react to `:root.dark` class
- All components use var(--bg), var(--card-bg), var(--text) etc.

## Build
```bash
cd apps/web && ng build
```
Output: `dist/@habit-tracker/web/`
