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
  | 'arrowRight';

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
}
