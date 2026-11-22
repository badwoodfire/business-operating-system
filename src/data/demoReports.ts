/**
 * DEMO REPORTS - figures are calculated from the detailed sample records where
 * those records contain enough information. Historical months remain illustrative.
 */
import type { MonthlySales, PaymentMethodShare, ProductSales, PaymentMethod } from '../types';
import { DEMO_ORDERS } from './demoOrders';
import { DEMO_PAYMENTS } from './demoPayments';

/** Historical months are illustrative; November is calculated from sample orders. */
const novemberSales = DEMO_ORDERS
  .filter((order) => order.date.startsWith('2026-11') && order.status !== 'cancelled')
  .reduce((sum, order) => sum + order.total, 0);

export const DEMO_MONTHLY_SALES: MonthlySales[] = [
  { id: '2026-06', label: 'Jun 2026 (illustrative)', total: 820000 },
  { id: '2026-07', label: 'Jul 2026 (illustrative)', total: 905500 },
  { id: '2026-08', label: 'Aug 2026 (illustrative)', total: 968000 },
  { id: '2026-09', label: 'Sep 2026 (illustrative)', total: 1061000 },
  { id: '2026-10', label: 'Oct 2026 (illustrative)', total: 1142800 },
  { id: '2026-11', label: 'Nov 2026 (to 17 Nov)', total: novemberSales },
];

/**
 * Order records only contain total item counts, not product-level line items.
 * Keep this empty rather than presenting unsupported best-seller quantities.
 */
export const DEMO_BEST_SELLERS: ProductSales[] = [];

const PAYMENT_METHODS: PaymentMethod[] = [
  'cod',
  'easypaisa',
  'jazzcash',
  'bank_transfer',
  'card',
];

const paymentTotal = DEMO_PAYMENTS.reduce((sum, payment) => sum + payment.amount, 0);

export const DEMO_PAYMENT_SHARES: PaymentMethodShare[] = PAYMENT_METHODS.map((method) => {
  const methodTotal = DEMO_PAYMENTS
    .filter((payment) => payment.method === method)
    .reduce((sum, payment) => sum + payment.amount, 0);

  return {
    method,
    percent: paymentTotal === 0 ? 0 : Math.round((methodTotal / paymentTotal) * 1000) / 10,
  };
});
