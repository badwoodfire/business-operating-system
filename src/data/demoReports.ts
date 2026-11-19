/**
 * DEMO DATA - every figure below is made up. Nothing is saved anywhere.
 */
import type { MonthlySales, PaymentMethodShare, ProductSales } from '../types';

/** November matches the Sales figure on the dashboard. */
export const DEMO_MONTHLY_SALES: MonthlySales[] = [
  { id: '2026-06', label: 'Jun 2026', total: 820000 },
  { id: '2026-07', label: 'Jul 2026', total: 905500 },
  { id: '2026-08', label: 'Aug 2026', total: 968000 },
  { id: '2026-09', label: 'Sep 2026', total: 1061000 },
  { id: '2026-10', label: 'Oct 2026', total: 1142800 },
  { id: '2026-11', label: 'Nov 2026', total: 1284500 },
];

export const DEMO_BEST_SELLERS: ProductSales[] = [
  { id: 'p7', name: 'Phone Case - Clear', unitsSold: 188 },
  { id: 'p5', name: 'Steel Water Bottle 750 ml', unitsSold: 142 },
  { id: 'p1', name: 'Cotton Kurta - Navy', unitsSold: 97 },
  { id: 'p8', name: 'Canvas Tote Bag', unitsSold: 81 },
  { id: 'p9', name: 'Herbal Hair Oil 200 ml', unitsSold: 76 },
];

/** Shares add up to 100%. */
export const DEMO_PAYMENT_SHARES: PaymentMethodShare[] = [
  { method: 'cod', percent: 38 },
  { method: 'easypaisa', percent: 24 },
  { method: 'jazzcash', percent: 16 },
  { method: 'bank_transfer', percent: 14 },
  { method: 'card', percent: 8 },
];
