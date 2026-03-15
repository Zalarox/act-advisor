# ACT Advisor - Project Guidelines

## Project Overview

ACT Advisor is a React application for tracking Acceptance and Commitment Therapy (ACT) skills over time. The app allows users to self-report psychological flexibility and visualize progress through charts.

## Technology Stack

- **Frontend**: React 19 with TypeScript, Vite (with Rolldown build tool)
- **Routing**: TanStack Router with file-based routing
- **State Management**: React Context (global UI state) + TanStack React Query (server state)
- **Styling**: Tailwind CSS v4 + DaisyUI components
- **Charts**: Nivo (Line and Radar charts)
- **Backend**: Supabase (PostgreSQL + Auth)

## Architecture Patterns

### File Structure

```
src/
├── components/     # Presentational components (Dashboard, LeftPanel, RightPanel, etc.)
├── contexts/       # React Context providers (Auth, Theme)
├── models/         # TypeScript types and constants (Ratings, ChartTheme)
├── routes/         # TanStack Router file-based routes
├── utils/          # Utility functions (Supabase client, React Query hooks)
└── assets/         # Static assets
```

### Key Patterns

1. **Data Fetching**: Use React Query hooks from `src/utils/queries.ts`
2. **Authentication**: Combined login/signup flow via Supabase Auth in `AuthProvider`
3. **Theme Switching**: Dark/light theme via `data-theme` attribute in `ThemeProvider`
4. **Rating System**: ACT dimensions defined in `src/models/Ratings.ts`

### Component Boundaries

- **Dashboard**: Main layout container
- **LeftPanel**: Radar chart showing average scores
- **RightPanel**: Line chart showing historical data
- **Modal**: Rating input interface
- **RatingSlider**: Individual rating input component

## Code Style

### Styling Approach

- Use Tailwind CSS utility classes
- DaisyUI component classes for common UI patterns (`btn`, `modal`, `dropdown`)
- Custom font: Inter with variable weights
- Theme-aware Nivo chart theming via `ChartTheme.ts`

## Data Layer

### Supabase Integration

- Environment variables required: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- Client initialized in `src/utils/supabase.ts`
- Database tables: `rating` table with user_id, ratings, created_at

### Data Aggregation

- Ratings aggregated by day (averaging multiple entries per day)
- Historical data shown as line charts
- Average scores shown as radar charts
