/** Identifiers for every top-level module of the app. */
export type ModuleId =
  | 'dashboard'
  | 'orders'
  | 'inventory'
  | 'customers'
  | 'payments'
  | 'expenses'
  | 'reports'
  | 'settings';

/** Names of the built-in icons (see components/ui/Icon.tsx). */
export type IconName =
  | 'dashboard'
  | 'orders'
  | 'inventory'
  | 'customers'
  | 'payments'
  | 'expenses'
  | 'reports'
  | 'settings'
  | 'sales'
  | 'plus'
  | 'userPlus'
  | 'menu'
  | 'close'
  | 'trendUp'
  | 'trendDown'
  | 'arrowRight'
  | 'lock'
  | 'logIn'
  | 'edit'
  | 'trash';

export interface NavItem {
  id: ModuleId;
  label: string;
  icon: IconName;
  /** Short explanation shown on modules that are not built yet. */
  description: string;
  /** Roadmap bullets shown on modules that are not built yet. */
  plannedFeatures: string[];
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod =
  | 'cod'
  | 'bank_transfer'
  | 'easypaisa'
  | 'jazzcash'
  | 'card';

export interface Order {
  id: string;
  customerName: string;
  itemCount: number;
  /** Order total in the smallest sensible unit shown to users (whole currency units). */
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  /** Calendar date in YYYY-MM-DD format. */
  date: string;
}

export type StatFormat = 'currency' | 'number';
export type Tone = 'blue' | 'green' | 'amber' | 'violet';

export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  format: StatFormat;
  /** Change compared to the previous period, in percent. */
  changePercent: number;
  comparisonLabel: string;
  icon: IconName;
  tone: Tone;
}

export interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: IconName;
  /** Module opened when the action is chosen. */
  target: ModuleId;
  /** True for actions that create or change data. They are locked in demo mode. */
  requiresAccount?: boolean;
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  /** Selling price in whole currency units. */
  price: number;
  /** Units currently on hand. */
  stock: number;
  /** Stock at or below this level is shown as "low stock". */
  reorderLevel: number;
}

export interface Customer {
  id: string;
  name: string;
  city: string;
  orderCount: number;
  /** Lifetime spend in whole currency units. */
  totalSpent: number;
  /** Calendar date in YYYY-MM-DD format. */
  lastOrderDate: string;
}

export type PaymentStatus = 'received' | 'pending' | 'overdue';

export interface PaymentRecord {
  id: string;
  orderId: string;
  customerName: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  /** Calendar date in YYYY-MM-DD format. */
  date: string;
}

export type ExpenseCategory =
  | 'stock'
  | 'shipping'
  | 'packaging'
  | 'marketing'
  | 'rent'
  | 'utilities'
  | 'salaries';

export interface Expense {
  id: string;
  description: string;
  category: ExpenseCategory;
  amount: number;
  /** Calendar date in YYYY-MM-DD format. */
  date: string;
}

export interface MonthlySales {
  id: string;
  label: string;
  total: number;
}

export interface ProductSales {
  id: string;
  name: string;
  unitsSold: number;
}

export interface PaymentMethodShare {
  method: PaymentMethod;
  /** Share of sales, in percent. */
  percent: number;
}
