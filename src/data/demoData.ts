/**
 * DEMO DATA - for development and design only.
 *
 * Every name, number and order below is made up. Nothing here comes from a real
 * business, and nothing is saved anywhere. This file will be replaced by real
 * data access once a backend exists.
 */
import type { DashboardStat, Order, QuickAction } from '../types';

export const DEMO_DATA_NOTICE =
  'You are viewing sample data. All names and figures are made up, nothing is saved, and this demo is read-only.';

export const DEMO_STATS: DashboardStat[] = [
  {
    id: 'sales',
    label: 'Sales',
    value: 97449,
    format: 'currency',
    changePercent: 12.4,
    comparisonLabel: 'illustrative trend',
    icon: 'sales',
    tone: 'green',
  },
  {
    id: 'orders',
    label: 'Orders',
    value: 11,
    format: 'number',
    changePercent: 8.1,
    comparisonLabel: 'illustrative trend',
    icon: 'orders',
    tone: 'blue',
  },
  {
    id: 'products',
    label: 'Products',
    value: 10,
    format: 'number',
    changePercent: 4.1,
    comparisonLabel: 'illustrative trend',
    icon: 'inventory',
    tone: 'amber',
  },
  {
    id: 'customers',
    label: 'Customers',
    value: 11,
    format: 'number',
    changePercent: -1.8,
    comparisonLabel: 'illustrative trend',
    icon: 'customers',
    tone: 'violet',
  },
];

export const DEMO_RECENT_ORDERS: Order[] = [
  {
    id: 'ORD-1048',
    customerName: 'Ayesha Khan',
    itemCount: 3,
    total: 7850,
    status: 'processing',
    paymentMethod: 'easypaisa',
    date: '2026-11-17',
  },
  {
    id: 'ORD-1047',
    customerName: 'Bilal Ahmed',
    itemCount: 1,
    total: 2499,
    status: 'pending',
    paymentMethod: 'cod',
    date: '2026-11-17',
  },
  {
    id: 'ORD-1046',
    customerName: 'Sana Malik',
    itemCount: 5,
    total: 15200,
    status: 'shipped',
    paymentMethod: 'bank_transfer',
    date: '2026-11-16',
  },
  {
    id: 'ORD-1045',
    customerName: 'Daniel Brooks',
    itemCount: 2,
    total: 9600,
    status: 'delivered',
    paymentMethod: 'card',
    date: '2026-11-15',
  },
  {
    id: 'ORD-1044',
    customerName: 'Hamza Raza',
    itemCount: 4,
    total: 11300,
    status: 'delivered',
    paymentMethod: 'jazzcash',
    date: '2026-11-14',
  },
  {
    id: 'ORD-1043',
    customerName: 'Fatima Noor',
    itemCount: 1,
    total: 1850,
    status: 'cancelled',
    paymentMethod: 'cod',
    date: '2026-11-13',
  },
];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'add-order',
    label: 'Add order',
    description: 'Record a new customer order',
    icon: 'orders',
    target: 'orders',
    requiresAccount: true,
  },
  {
    id: 'add-product',
    label: 'Add product',
    description: 'Add an item to your inventory',
    icon: 'inventory',
    target: 'inventory',
    requiresAccount: true,
  },
  {
    id: 'add-customer',
    label: 'Add customer',
    description: 'Save a new customer profile',
    icon: 'userPlus',
    target: 'customers',
    requiresAccount: true,
  },
  {
    id: 'record-payment',
    label: 'Record payment',
    description: 'Log a payment you received',
    icon: 'payments',
    target: 'payments',
    requiresAccount: true,
  },
  {
    id: 'log-expense',
    label: 'Log expense',
    description: 'Track money you spent',
    icon: 'expenses',
    target: 'expenses',
    requiresAccount: true,
  },
  {
    id: 'view-reports',
    label: 'View reports',
    description: 'See sales trends from the sample data.',
    icon: 'reports',
    target: 'reports',
  },
];
