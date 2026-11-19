# business-operating-system
A free, all-in-one business management platform.

> **Status: early foundation (v0.1.0).** The app runs as a public, **read-only demo**: visitors can explore every main module without registering or logging in. All data shown is **sample data** - there is no database, authentication or backend yet.

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
- Read-only demo pages for Orders, Inventory, Customers, Payments, Expenses and Reports (see [Demo mode](#demo-mode))
- A simple sign-in screen preview at `#/login` (see [Demo mode](#demo-mode))
- "Coming soon" pages that list the planned features of every module that is not built yet (currently Settings)

## Demo mode

Anyone can open the app and explore it without an account.

- **Strictly read-only.** Every create, edit and delete action (e.g. *Add order*, *Edit*, *Delete*) is shown switched off. Clicking one opens a dialog explaining that full access will be available with an account. No handler ever runs, so the sample data cannot change.
- **Clearly labelled.** A banner on every page, a *Demo data* badge in the top bar and a *Sample data* badge on every data panel mark all information as made up.
- **Sign-in preview.** The *Sign in* button in the top bar opens `#/login`, a professional placeholder for the future registered-user experience. There is **no fake authentication**: the form fields are disabled, nothing can be typed, and nothing is sent or stored. *Explore the demo* returns to the dashboard.
- **No new dependencies, paid services or APIs.** The dialog uses the native `<dialog>` element and the report charts are plain CSS.

How it is built:

| Piece | Where |
| --- | --- |
| Demo switch (`IS_DEMO_MODE`) and wording | `src/config/demo.ts` |
| Provider + "needs an account" dialog | `src/components/demo/DemoModeProvider.tsx` |
| Locked button used for every create/edit/delete action | `src/components/demo/ActionButton.tsx` |
| Locked edit/delete buttons for table rows | `src/components/demo/RowActions.tsx` |
| Sample data (all made up) | `src/data/demo*.ts` |
| Sign-in screen | `src/features/auth/` |

**Turning demo mode off later:** once real authentication exists, make `IS_DEMO_MODE` depend on the signed-in user's workspace. `ActionButton` then calls the `onClick` you pass it instead of showing the dialog. Add real forms and handlers at that point, and replace the disabled `<fieldset>` on the sign-in screen with a working form.

## Project structure

```
src/
  components/
    demo/        Demo mode: provider, dialog, locked ActionButton, RowActions, banner
    layout/      App shell: AppLayout, Sidebar, Topbar
    ui/          Reusable pieces: Badge, DataTable, Icon, PageHeader, SamplePanel, StatCard, SummaryTile
  config/        App settings, demo mode, navigation (modules) and status/label maps
  data/          Sample data (replace with real data access later)
  features/
    auth/        Sign-in screen preview
    dashboard/   Dashboard page and its sections
    orders/ inventory/ customers/ payments/ expenses/ reports/
                 Read-only module pages
  hooks/         Shared React hooks (hash navigation, sign-in route, demo mode)
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

Database, real authentication and registration, creating/editing/deleting data (orders, inventory, customers, payments, expenses), real report calculations, the Settings module, multi-currency, localisation (e.g. Urdu), and multi-business support.
