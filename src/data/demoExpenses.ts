/**
 * DEMO DATA - every expense below is made up. Nothing is saved anywhere.
 */
import type { Expense } from '../types';

export const DEMO_EXPENSES: Expense[] = [
  { id: 'EXP-3010', description: 'Courier charges, week 46', category: 'shipping', amount: 18400, date: '2026-11-16' },
  { id: 'EXP-3009', description: 'Packaging boxes and tape', category: 'packaging', amount: 9250, date: '2026-11-15' },
  { id: 'EXP-3008', description: 'Social media ads', category: 'marketing', amount: 22000, date: '2026-11-14' },
  { id: 'EXP-3007', description: 'Wholesale stock - kurtas', category: 'stock', amount: 145000, date: '2026-11-12' },
  { id: 'EXP-3006', description: 'Electricity bill', category: 'utilities', amount: 14800, date: '2026-11-10' },
  { id: 'EXP-3005', description: 'Internet and phone', category: 'utilities', amount: 6500, date: '2026-11-09' },
  { id: 'EXP-3004', description: 'Warehouse rent - November', category: 'rent', amount: 60000, date: '2026-11-05' },
  { id: 'EXP-3003', description: 'Part-time packer wages', category: 'salaries', amount: 35000, date: '2026-11-05' },
  { id: 'EXP-3002', description: 'Wholesale stock - accessories', category: 'stock', amount: 88500, date: '2026-11-03' },
  { id: 'EXP-3001', description: 'Product photography', category: 'marketing', amount: 12000, date: '2026-11-02' },
];
