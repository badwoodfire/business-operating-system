# Business OS

A lightweight business workspace for small online sellers, with a focus on practical PKR workflows.

## Current release: local MVP

Business OS now supports creating, editing and deleting day-to-day business records. It is designed to work without paid services or API keys.

### Available modules

- **Dashboard:** sales, active order count, product/customer totals and recent orders, calculated from workspace records.
- **Orders:** create, edit and delete orders; track customer, date, items, amount, status and payment method.
- **Inventory:** manage products, SKUs, selling prices, stock quantities and reorder thresholds.
- **Customers:** maintain customer profiles and simple lifetime order totals.
- **Payments:** record manual COD, bank transfer, Easypaisa, JazzCash and card payments; track received, pending and overdue amounts.
- **Expenses:** record spending by category.
- **Reports:** sales by month, received payments by method, expenses by category and a basic operating result.
- **Settings:** clear starter data, restore starter examples, export a JSON backup and restore a backup.

## Important data and security notes

- The first launch is preloaded with **fictional example records**. Open Settings and choose **Clear all records** before entering real business data.
- Records are stored in the browser's local storage on the current device. They do not sync to another browser, computer or phone.
- Download a JSON backup regularly. Clearing browser data or changing devices can otherwise lose the workspace.
- This version does not include online accounts, secure sign-in, a cloud database, multi-business workspaces, employee invitations or enforceable role permissions.
- Payment records are manual. The app does not connect to banks, Easypaisa, JazzCash or payment gateways and cannot verify transfers.
- Profit is currently a basic estimate: non-cancelled order totals minus recorded expenses. Product-level cost of goods sold, taxes, refunds, payment fees and shipping adjustments are not yet included.
- Product-level best sellers are not calculated because order line items are not yet stored.
- AI agent actions are not enabled. A secure server-side AI integration is planned after the backend and permissions layer; no private API key should be placed in browser code.

Do not use this local MVP as the sole record system for confidential, regulated or business-critical financial data.

## Technology

- React 18 + TypeScript
- Vite
- Browser local storage for the current local-first MVP
- Plain CSS; no paid APIs or additional UI framework

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify the production build:

```bash
npm run build
```

## Open in StackBlitz

https://stackblitz.com/github/badwoodfire/business-operating-system

## Roadmap to hosted production

1. Connect a hosted database and authentication (planned: Supabase free tier).
2. Add workspace isolation and server-enforced employee roles/permissions.
3. Add secure backups, import validation and cloud sync.
4. Add order line items, product costs, stock movements, returns and accurate profit reporting.
5. Add a server-side AI copilot with a fixed tool allowlist, approval before write actions, audit logs and a non-AI fallback.
6. Add automated tests, accessibility checks and deployment monitoring.

The current repository is a functional local MVP, not yet a hosted multi-user SaaS product.
