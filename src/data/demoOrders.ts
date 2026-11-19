/**
 * DEMO DATA - every order below is made up. Nothing is saved anywhere.
 */
import type { Order } from '../types';
import { DEMO_RECENT_ORDERS } from './demoData';

/** The six most recent orders (shared with the dashboard) plus older ones. */
export const DEMO_ORDERS: Order[] = [
  ...DEMO_RECENT_ORDERS,
  {
    id: 'ORD-1042',
    customerName: 'Usman Tariq',
    itemCount: 2,
    total: 5400,
    status: 'delivered',
    paymentMethod: 'cod',
    date: '2026-11-12',
  },
  {
    id: 'ORD-1041',
    customerName: 'Maryam Siddiqui',
    itemCount: 6,
    total: 18950,
    status: 'delivered',
    paymentMethod: 'bank_transfer',
    date: '2026-11-11',
  },
  {
    id: 'ORD-1040',
    customerName: 'Ali Hassan',
    itemCount: 1,
    total: 3200,
    status: 'delivered',
    paymentMethod: 'easypaisa',
    date: '2026-11-10',
  },
  {
    id: 'ORD-1039',
    customerName: 'Zainab Qureshi',
    itemCount: 3,
    total: 6750,
    status: 'shipped',
    paymentMethod: 'jazzcash',
    date: '2026-11-09',
  },
  {
    id: 'ORD-1038',
    customerName: 'Ayesha Khan',
    itemCount: 2,
    total: 4300,
    status: 'delivered',
    paymentMethod: 'card',
    date: '2026-11-08',
  },
  {
    id: 'ORD-1037',
    customerName: 'Imran Sheikh',
    itemCount: 4,
    total: 12400,
    status: 'delivered',
    paymentMethod: 'bank_transfer',
    date: '2026-11-06',
  },
];
