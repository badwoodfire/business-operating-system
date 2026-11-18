import Badge from '../../components/ui/Badge';
import { ORDER_STATUS_META, PAYMENT_METHOD_LABELS } from '../../config/orders';
import { DEMO_RECENT_ORDERS } from '../../data/demoData';
import type { ModuleId } from '../../types';
import { formatCurrency, formatShortDate } from '../../utils/format';

interface RecentOrdersProps {
  onNavigate: (id: ModuleId) => void;
}

export default function RecentOrders({ onNavigate }: RecentOrdersProps) {
  const orders = DEMO_RECENT_ORDERS;

  return (
    <section className="panel" aria-labelledby="recent-orders-title">
      <div className="panel__header">
        <h2 id="recent-orders-title" className="panel__title">
          Recent orders
        </h2>
        <button
          type="button"
          className="link-button"
          onClick={() => onNavigate('orders')}
        >
          View all
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="empty-state">No orders yet. New orders will appear here.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Customer</th>
              <th scope="col">Date</th>
              <th scope="col">Payment</th>
              <th scope="col" className="data-table__numeric">
                Total
              </th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const status = ORDER_STATUS_META[order.status];
              return (
                <tr key={order.id}>
                  <td data-label="Order" className="data-table__strong">
                    {order.id}
                  </td>
                  <td data-label="Customer">{order.customerName}</td>
                  <td data-label="Date">{formatShortDate(order.date)}</td>
                  <td data-label="Payment">
                    {PAYMENT_METHOD_LABELS[order.paymentMethod]}
                  </td>
                  <td data-label="Total" className="data-table__numeric">
                    {formatCurrency(order.total)}
                  </td>
                  <td data-label="Status">
                    <Badge tone={status.tone}>{status.label}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </section>
  );
}
