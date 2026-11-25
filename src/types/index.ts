/** Identifiers for every top-level module of the app. */
export type ModuleId = 'dashboard' | 'orders' | 'inventory' | 'customers' | 'payments' | 'expenses' | 'reports' | 'settings';
/** Names of the built-in icons (see components/ui/Icon.tsx). */
export type IconName = 'dashboard' | 'orders' | 'inventory' | 'customers' | 'payments' | 'expenses' | 'reports' | 'settings' | 'sales' | 'plus' | 'userPlus' | 'menu' | 'close' | 'trendUp' | 'trendDown' | 'arrowRight' | 'lock' | 'logIn' | 'edit' | 'trash' | 'info';
export interface NavItem { id: ModuleId; label: string; icon: IconName; description: string; plannedFeatures: string[]; }
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'card';
export interface Order {
  id: string;
  customerName: string;
  /** Inventory product selected for this order. Optional for older demo/backup records. */
  productId?: string;
  /** Product name snapshot, retained even if the catalogue entry changes later. */
  productName?: string;
  /** Quantity of the selected product. Optional for older demo/backup records. */
  quantity?: number;
  itemCount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  date: string;
}
export type StatFormat = 'currency' | 'number';
export type Tone = 'blue' | 'green' | 'amber' | 'violet';
export interface DashboardStat { id: string; label: string; value: number; format: StatFormat; changePercent: number; comparisonLabel: string; icon: IconName; tone: Tone; }
export interface QuickAction { id: string; label: string; description: string; icon: IconName; target: ModuleId; requiresAccount?: boolean; }
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export interface Product { id: string; name: string; sku: string; category: string; price: number; stock: number; reorderLevel: number; }
export interface Customer { id: string; name: string; city: string; orderCount: number; totalSpent: number; lastOrderDate: string; }
export type PaymentStatus = 'received' | 'pending' | 'overdue';
export interface PaymentRecord { id: string; orderId: string; customerName: string; method: PaymentMethod; amount: number; status: PaymentStatus; date: string; }
export type ExpenseCategory = 'stock' | 'shipping' | 'packaging' | 'marketing' | 'rent' | 'utilities' | 'salaries';
export interface Expense { id: string; description: string; category: ExpenseCategory; amount: number; date: string; }
export interface MonthlySales { id: string; label: string; total: number; }
export interface ProductSales { id: string; name: string; unitsSold: number; }
export interface PaymentMethodShare { method: PaymentMethod; percent: number; }
