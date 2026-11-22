import Badge from '../../components/ui/Badge';
import { ORDER_STATUS_META, PAYMENT_METHOD_LABELS } from '../../config/orders';
import { useBusinessStore } from '../../store/BusinessStore';
import type { ModuleId } from '../../types';
import { formatCurrency, formatShortDate } from '../../utils/format';

interface RecentOrdersProps { onNavigate: (id: ModuleId) => void; }

export default function RecentOrders({ onNavigate }: RecentOrdersProps) {
  const { orders } = useBusinessStore();
  const recent = [...orders].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);
  return <section className="panel" aria-labelledby="recent-orders-title">
    <div className="panel__header"><div className="panel__heading"><h2 id="recent-orders-title" className="panel__title">Recent orders</h2><Badge tone="info">Workspace</Badge></div><button type="button" className="link-button" onClick={() => onNavigate('orders')}>View all</button></div>
    {recent.length === 0 ? <p className="empty-state">No orders yet. Add your first order from the Orders page.</p> : <table className="data-table"><thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Payment</th><th className="data-table__numeric">Total</th><th>Status</th></tr></thead><tbody>{recent.map((order) => { const status = ORDER_STATUS_META[order.status]; return <tr key={order.id}><td data-label="Order" className="data-table__strong">{order.id}</td><td data-label="Customer">{order.customerName}</td><td data-label="Date">{formatShortDate(order.date)}</td><td data-label="Payment">{PAYMENT_METHOD_LABELS[order.paymentMethod]}</td><td data-label="Total" className="data-table__numeric">{formatCurrency(order.total)}</td><td data-label="Status"><Badge tone={status.tone}>{status.label}</Badge></td></tr>; })}</tbody></table>}
  </section>;
}