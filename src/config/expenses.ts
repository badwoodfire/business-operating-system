import type { ExpenseCategory } from '../types';

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  stock: 'Stock purchase',
  shipping: 'Shipping',
  packaging: 'Packaging',
  marketing: 'Marketing',
  rent: 'Rent',
  utilities: 'Utilities',
  salaries: 'Salaries',
};
