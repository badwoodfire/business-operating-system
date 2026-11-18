import type { ModuleId, NavItem } from '../types';

/**
 * Single source of truth for the sidebar and for the "coming soon" pages.
 * To add a new module: add its id to `ModuleId`, add an entry here, and
 * (when it is built) register its page in `src/App.tsx`.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    description: 'A quick overview of how your business is doing.',
    plannedFeatures: [],
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: 'orders',
    description: 'Create, track and fulfil customer orders.',
    plannedFeatures: [
      'Create and edit orders',
      'Order status tracking',
      'Order search and filters',
      'Printable invoices and packing slips',
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: 'inventory',
    description: 'Manage products, variants and stock levels.',
    plannedFeatures: [
      'Product catalogue with variants',
      'Stock levels and low-stock alerts',
      'Purchase prices and margins',
      'Bulk import from spreadsheets',
    ],
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: 'customers',
    description: 'Keep customer details and order history in one place.',
    plannedFeatures: [
      'Customer profiles and addresses',
      'Order history per customer',
      'Notes and tags',
      'Outstanding balances',
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    icon: 'payments',
    description: 'Record payments and see what is still owed.',
    plannedFeatures: [
      'Record cash, bank and mobile-wallet payments',
      'Cash on delivery reconciliation',
      'Pending and overdue payments',
      'Payment receipts',
    ],
  },
  {
    id: 'expenses',
    label: 'Expenses',
    icon: 'expenses',
    description: 'Track business spending and understand your costs.',
    plannedFeatures: [
      'Log expenses by category',
      'Recurring expenses',
      'Receipt attachments',
      'Profit and loss overview',
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'reports',
    description: 'Understand sales, profit and growth over time.',
    plannedFeatures: [
      'Sales and profit reports',
      'Best-selling products',
      'Customer insights',
      'Export to CSV and PDF',
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    description: 'Configure your business, team and preferences.',
    plannedFeatures: [
      'Business profile and branding',
      'Currency, language and tax settings',
      'Team members and roles',
      'Data import and export',
    ],
  },
];

export const DEFAULT_MODULE: ModuleId = 'dashboard';

export function isModuleId(value: string): value is ModuleId {
  return NAV_ITEMS.some((item) => item.id === value);
}

export function getNavItem(id: ModuleId): NavItem {
  const item = NAV_ITEMS.find((navItem) => navItem.id === id);
  if (!item) {
    throw new Error(`Unknown module: ${id}`);
  }
  return item;
}
