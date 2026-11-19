/**
 * DEMO DATA - every payment below is made up. Nothing is saved anywhere.
 * Order ids match the sample orders in demoOrders.ts.
 */
import type { PaymentRecord } from '../types';

export const DEMO_PAYMENTS: PaymentRecord[] = [
  { id: 'PAY-2031', orderId: 'ORD-1048', customerName: 'Ayesha Khan', method: 'easypaisa', amount: 7850, status: 'received', date: '2026-11-17' },
  { id: 'PAY-2030', orderId: 'ORD-1047', customerName: 'Bilal Ahmed', method: 'cod', amount: 2499, status: 'pending', date: '2026-11-17' },
  { id: 'PAY-2029', orderId: 'ORD-1046', customerName: 'Sana Malik', method: 'bank_transfer', amount: 15200, status: 'pending', date: '2026-11-16' },
  { id: 'PAY-2028', orderId: 'ORD-1045', customerName: 'Daniel Brooks', method: 'card', amount: 9600, status: 'received', date: '2026-11-15' },
  { id: 'PAY-2027', orderId: 'ORD-1044', customerName: 'Hamza Raza', method: 'jazzcash', amount: 11300, status: 'received', date: '2026-11-14' },
  { id: 'PAY-2026', orderId: 'ORD-1042', customerName: 'Usman Tariq', method: 'cod', amount: 5400, status: 'received', date: '2026-11-13' },
  { id: 'PAY-2025', orderId: 'ORD-1041', customerName: 'Maryam Siddiqui', method: 'bank_transfer', amount: 18950, status: 'received', date: '2026-11-12' },
  { id: 'PAY-2024', orderId: 'ORD-1040', customerName: 'Ali Hassan', method: 'easypaisa', amount: 3200, status: 'received', date: '2026-11-10' },
  { id: 'PAY-2023', orderId: 'ORD-1039', customerName: 'Zainab Qureshi', method: 'jazzcash', amount: 6750, status: 'pending', date: '2026-11-09' },
  { id: 'PAY-2022', orderId: 'ORD-1038', customerName: 'Ayesha Khan', method: 'card', amount: 4300, status: 'received', date: '2026-11-08' },
  { id: 'PAY-2021', orderId: 'ORD-1037', customerName: 'Imran Sheikh', method: 'bank_transfer', amount: 12400, status: 'overdue', date: '2026-11-06' },
];
