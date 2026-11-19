import type { BadgeTone } from '../components/ui/Badge';
import type { Product, StockStatus } from '../types';

export const STOCK_STATUS_META: Record<
  StockStatus,
  { label: string; tone: BadgeTone }
> = {
  in_stock: { label: 'In stock', tone: 'success' },
  low_stock: { label: 'Low stock', tone: 'warning' },
  out_of_stock: { label: 'Out of stock', tone: 'danger' },
};

export function getStockStatus(
  product: Pick<Product, 'stock' | 'reorderLevel'>,
): StockStatus {
  if (product.stock === 0) return 'out_of_stock';
  if (product.stock <= product.reorderLevel) return 'low_stock';
  return 'in_stock';
}
