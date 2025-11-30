# Project Structure & Created Files

## 📁 Project Overview

Expo + React Native + TypeScript app with recommended 2025 structure, following official Expo and React Navigation best practices.

---

## 🗂️ Directory Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components (React Navigation)
├── hooks/          # Custom React hooks
├── store/          # Zustand state management
├── services/       # API & business logic
├── lib/            # Utility functions
├── types/          # TypeScript type definitions
├── navigation/     # Navigation setup
└── constants/      # App constants
```

---

## 📄 Created Files

### **Project Structure (Part A)**

#### `src/components/index.ts`
**Rationale:** Barrel export for components - clean imports, single source of truth  
**Reference:** React Native component organization best practices

#### `src/screens/index.ts`
**Rationale:** Barrel export for screens - used by React Navigation  
**Reference:** React Navigation screen organization

#### `src/hooks/index.ts`
**Rationale:** Barrel export for custom hooks - follows React hooks patterns  
**Reference:** React hooks best practices

#### `src/store/index.ts`
**Rationale:** Central store exports - Zustand store aggregation  
**Reference:** Zustand documentation

#### `src/services/index.ts`
**Rationale:** Barrel export for services - API layer organization  
**Reference:** Service layer pattern

#### `src/lib/index.ts`
**Rationale:** Barrel export for utilities - helper function organization  
**Reference:** Utility organization best practices

#### `src/types/index.ts`
**Rationale:** Central type definitions - TypeScript type management  
**Reference:** TypeScript declaration files

#### `src/constants/index.ts`
**Rationale:** Barrel export for constants - app-wide constants organization  
**Reference:** Expo constants organization

#### `src/navigation/index.tsx`
**Rationale:** Root navigation setup - React Navigation Native Stack  
**Reference:** https://reactnavigation.org/docs/getting-started  
**Reference:** https://docs.expo.dev/guides/using-react-navigation/

#### `src/navigation/types.ts`
**Rationale:** Navigation TypeScript types - type-safe navigation  
**Reference:** https://reactnavigation.org/docs/typescript/

---

### **Services & Lib Helpers (Part B)**

#### `src/lib/date.ts`
**Rationale:** Pure date utility functions - reusable, testable date operations  
**Functions:**
- `todayISO()` - Get today's date in ISO format
- `isSameDay(a, b)` - Compare two dates (same day check)
- `weekRange(date)` - Get week start/end (ISO 8601, Monday-Sunday)

**Reference:** Pure function patterns, ISO 8601 standard

#### `src/services/storage.ts`
**Rationale:** Typed AsyncStorage wrapper - type-safe storage with JSON handling  
**Features:**
- Generic `get<T>()` / `set<T>()` / `remove()`
- Automatic JSON serialization/deserialization
- Error handling with fallbacks
- Multi-key operations support

**Reference:** AsyncStorage best practices, TypeScript generics

#### `src/lib/score.ts`
**Rationale:** Score calculation utilities - points mapping and currency formatting  
**Functions:**
- `pointsFor(priority)` - Priority to points mapping (low:1, med:5, high:10, critical:20)
- `coinsToDisplay(coins)` - Format numbers with thousand separators
- `calculateTotalPoints()` - Sum points from priorities
- `priorityFromPoints()` - Reverse lookup (points → priority)

**Reference:** Pure function patterns, Intl.NumberFormat

---

### **Domain & State (Part A - Continuation)**

#### `src/store/tasks.ts`
**Rationale:** Tasks, Tags, and Wallet store - Zustand with AsyncStorage persistence  
**Why Zustand + AsyncStorage:**
- Zustand: קל, מהיר, API מבוסס hooks, נפוץ ב-RN
- AsyncStorage: Native persistence, works offline

**Features:**
- CRUD operations for tasks & tags
- Derived selectors: `tasksForToday()`, `tasksByDate()`, `incompleteCount()`, `weeklyStats()`
- Wallet integration: auto-update coins on task completion
- Versioning & migration support
- Pure logic (no UI imports)

**Reference:** https://docs.pmnd.rs/zustand/getting-started/introduction  
**Reference:** https://docs.pmnd.rs/zustand/integrations/persisting-store-data

#### `src/store/useStore.ts`
**Rationale:** Main app store template - extensible store setup  
**Reference:** Zustand best practices for Expo React Native

---

### **Navigation & UI Shell (Part C)**

#### `src/components/TaskItem.tsx`
**Rationale:** Task display component - minimal UI for task rendering  
**Features:**
- Shows title, priority, points
- Toggle completion
- Basic spacing/styling only

**Reference:** React Native component patterns

#### `src/components/TagPill.tsx`
**Rationale:** Tag badge component - minimal tag display  
**Features:**
- Pill/badge styling
- Optional color support
- Clickable (optional)

**Reference:** React Native component patterns

#### `src/components/KPIBox.tsx`
**Rationale:** KPI display component - stats visualization  
**Features:**
- Label + value display
- Minimal styling

**Reference:** React Native component patterns

#### `src/screens/TodayScreen.tsx`
**Rationale:** Today's tasks screen - daily checklist view  
**Features:**
- Sticky header with date and coins
- Today's task list
- Toggle completion
- Wired to `tasksForToday()` selector
- SafeAreaView for safe areas

**Reference:** React Navigation screen patterns, SafeAreaView

#### `src/screens/AllScreen.tsx`
**Rationale:** All tasks screen - comprehensive task view  
**Features:**
- Tasks grouped by date (SectionList)
- Tag filter bar
- Quick add input
- Wired to `tasksByDate()` selector
- SafeAreaView for safe areas

**Reference:** React Navigation screen patterns, SectionList

#### `src/screens/StatsScreen.tsx`
**Rationale:** Statistics screen - KPIs and metrics  
**Features:**
- Tasks done today/week
- Coins earned (current/total)
- Weekly stats
- Wired to `weeklyStats()` selector
- SafeAreaView + ScrollView

**Reference:** React Navigation screen patterns

---

## ⚙️ Configuration Files

### `tsconfig.json` (Modified)
**Rationale:** TypeScript config with path aliases - clean imports  
**Features:**
- Path aliases: `@/*` → `src/*`
- Strict mode enabled
- Expo base config extended

**Reference:** TypeScript path mapping, Expo TypeScript guide

### `.eslintrc.js` (Created)
**Rationale:** ESLint configuration - code quality enforcement  
**Features:**
- TypeScript support
- React/React Native rules
- Import ordering
- Prettier integration

**Reference:** https://docs.expo.dev/guides/using-eslint/

### `.prettierrc` (Created)
**Rationale:** Prettier configuration - code formatting  
**Features:**
- Consistent formatting rules
- Standard style

**Reference:** Prettier configuration

### `.prettierignore` (Created)
**Rationale:** Prettier ignore patterns - exclude build/generated files

### `.eslintignore` (Created)
**Rationale:** ESLint ignore patterns - exclude build/generated files

### `metro.config.js` (Created)
**Rationale:** Metro bundler configuration - Expo Metro setup  
**Reference:** https://docs.expo.dev/guides/customizing-metro/

### `package.json` (Modified)
**Rationale:** Dependencies and scripts - project configuration  
**Added Scripts:**
- `lint` / `lint:fix` - ESLint
- `format` / `format:check` - Prettier
- `type-check` - TypeScript validation

### `App.tsx` (Modified)
**Rationale:** Root app component - uses RootNavigator  
**Reference:** React Navigation setup

### `TODOS.md` (Created)
**Rationale:** Future development tasks - roadmap  
**Categories:**
- Theming
- Animations
- Tests
- Additional Features

---

## 📦 Dependencies Installed

### Navigation
- `@react-navigation/native` ^7.1.19
- `@react-navigation/native-stack` ^7.6.2
- `react-native-safe-area-context` ~5.6.0
- `react-native-screens` ~4.16.0

### State Management
- `zustand` ^5.0.8
- `@react-native-async-storage/async-storage` 2.2.0

### Dev Tools
- ESLint plugins (TypeScript, React, React Native, React Hooks, Import)
- Prettier
- TypeScript ESLint parser

---

## 🎯 Design Decisions

### Why Zustand?
- קל, מהיר, API מבוסס hooks, נפוץ ב-RN
- Lightweight, no providers needed
- Fast performance, minimal re-renders
- Hook-based API fits React Native

### Why AsyncStorage?
- Native storage solution
- Automatic JSON serialization
- Works offline

### Why React Navigation?
- React Navigation מומלץ רשמית - Official recommendation
- Safe-area + screens לשיפור ביצועים - Performance optimization

### Why src/ folder structure?
- Separation of concerns
- Scalability
- Industry standard for 2025
- Type safety with path aliases

---

## 📊 File Count Summary

- **Components:** 4 files (3 components + index)
- **Screens:** 4 files (3 screens + index)
- **Store:** 3 files (2 stores + index)
- **Services:** 2 files (1 service + index)
- **Lib:** 3 files (2 utilities + index)
- **Navigation:** 2 files
- **Types:** 1 file
- **Constants:** 1 file
- **Hooks:** 1 file
- **Config:** 6 files (ESLint, Prettier, TypeScript, Metro, package.json, App.tsx)

**Total: 27 files** (excluding node_modules, generated files)

---

## 🚀 Next Steps

See `TODOS.md` for:
- Theming system
- Animations
- Tests
- Additional features
- Performance optimizations

