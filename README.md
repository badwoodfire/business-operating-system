# business-operating-system
A free, all-in-one business management platform.

> **Status: early foundation (v0.1.0).** The dashboard and navigation shell are built. All data shown is **demo data** - there is no database, authentication or backend yet.

## Vision

Business OS is a SaaS platform that helps businesses run everything from one place. We are starting with **small online sellers** (including in Pakistan), and the architecture is designed to grow to retail shops, wholesalers, service businesses and larger companies, for local and international customers.

## Tech stack

- [React](https://react.dev/) 18 + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev server and builds
- Plain CSS with design tokens (no UI framework, no icon library)

No paid APIs, subscriptions or API keys are required.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal. Other scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |

### Run in StackBlitz

Open the repository directly in the browser:
<https://stackblitz.com/github/badwoodfire/business-operating-system>

## What is built so far

- Responsive app shell: sidebar on desktop, slide-in drawer on mobile
- Navigation for Dashboard, Orders, Inventory, Customers, Payments, Expenses, Reports and Settings (hash-based URLs such as `#/orders`)
- Dashboard with Sales, Orders, Products and Customers stat cards, a Recent Orders table and Quick Actions
- "Coming soon" pages that list the planned features of every module that is not built yet

## Project structure

```
src/
  components/
    layout/      App shell: AppLayout, Sidebar, Topbar
    ui/          Reusable pieces: Badge, Icon, PageHeader, StatCard
  config/        App settings, navigation (modules) and order/payment labels
  data/          Demo data (replace with real data access later)
  features/
    dashboard/   Dashboard page and its sections
  hooks/         Shared React hooks (hash-based navigation)
  pages/         Generic pages, e.g. the "coming soon" placeholder
  styles/        Design tokens, layout and shared component CSS
  types/         Shared TypeScript types
  utils/         Formatting helpers (currency, numbers, dates)
```

### Adding a new module

1. Add its id to `ModuleId` in `src/types/index.ts`.
2. Add an entry to `NAV_ITEMS` in `src/config/navigation.ts`.
3. Build the page under `src/features/<module>/` and render it in `src/App.tsx`.

Currency and locale are configured in `src/config/app.ts` (default: PKR / `en-PK`) so other markets can be supported later.

## Not built yet

Database, authentication, real orders/inventory/customers/payments/expenses/reports logic, multi-currency, localisation (e.g. Urdu), and multi-business support.
