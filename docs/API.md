# Habit & Goal Tracker — API Reference

Base URL: `http://localhost:3000/api`
Auth: Bearer JWT token in Authorization header

## Auth

### POST /auth/register
Create account with organization
```
Body: { email, password, displayName, orgName }
Response: { token, user: { id, email, displayName, organizationId } }
```

### POST /auth/login
Login with email/password
```
Body: { email, password }
Response: { token, user: { id, email, displayName, organizationId, isDarkMode } }
```

### GET /auth/profile
Get current user profile (auth required)

### PATCH /auth/profile
Update profile (auth required)
```
Body: { displayName?, isDarkMode? }
```

## Habits

### GET /habits
List user habits (auth required)
Query: ?includeArchived=true

### GET /habits/:id
Get single habit

### POST /habits
Create habit
```
Body: { name, description?, frequency?, color?, icon? }
```

### PATCH /habits/:id
Update habit

### DELETE /habits/:id
Archive/remove habit

## Entries

### POST /entries/:habitId/:date
Upsert daily entry
```
Body: { status: 'done'|'skipped', notes? }
```

### GET /entries/:habitId
Get entries for habit
Query: ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD

## Goals

### GET /goals
List user goals (auth required)
Query: ?status=active|completed|expired

### POST /goals
Create goal
```
Body: { title, description?, targetCount, habitId, startDate, endDate }
```

### PATCH /goals/:id
Update goal

### DELETE /goals/:id
Delete goal

## Dashboard

### GET /dashboard
Get aggregated dashboard data (auth required)
Response: { summary: { totalHabits, doneToday, onStreak, activeGoals }, habits: [...with streaks], goals: [...with progress] }

### GET /dashboard/heatmap
Get heatmap data for last N days
Query: ?days=90 (default)
Response: [{ date, count, total }]

## Seed

### POST /seed
Seed database with demo data (org, user, 6 habits, 30 days of entries, 3 goals)
