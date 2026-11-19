import ActionButton from '../../components/demo/ActionButton';
import RowActions from '../../components/demo/RowActions';
import Badge from '../../components/ui/Badge';
import DataTable, { type DataTableColumn } from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SamplePanel from '../../components/ui/SamplePanel';
import { ORDER_STATUS_META, PAYMENT_METHOD_LABELS } from '../../config/orders';
import { DEMO_ORDERS } from '../../data/demoOrders';
import type { Order } from '../../types';
import { formatCurrency, formatShortDate } from '../../utils/format';

const COLUMNS: DataTableColumn<Order>[] = [
  { key: 'id', header: 'Order', strong: true, render: (order) => order.id },
  { key: 'customer', header: 'Customer', render: (order) => order.customerName },
  { key: 'date', header: 'Date', render: (order) => formatShortDate(order.date) },
  { key: 'items', header: 'Items', numeric: true, render: (order) => order.itemCount },
  {
    key: 'payment',
    header: 'Payment',
    render: (order) => PAYMENT_METHOD_LABELS[order.paymentMethod],
  },
  {
    key: 'total',
    header: 'Total',
    numeric: true,
    render: (order) => formatCurrency(order.total),
  },
  {
    key: 'status',
    header: 'Status',
    render: (order) => {
      const status = ORDER_STATUS_META[order.status];
      return <Badge tone={status.tone}>{status.label}</Badge>;
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    actions: true,
    render: (order) => <RowActions subject={`order ${order.id}`} />,
  },
];

export default function OrdersPage() {
  return (
    <>
      <PageHeader
        title="Orders"
        description="Browse customer orders and their payment and delivery status."
        actions={
          <ActionButton icon="plus" actionLabel="Add order">
            Add order
          </ActionButton>
        }
      />
      <SamplePanel
        title="All orders"
        description={`${DEMO_ORDERS.length} made-up orders for illustration.`}
      >
        <DataTable
          columns={COLUMNS}
          rows={DEMO_ORDERS}
          getRowKey={(order) => order.id}
          emptyMessage="No orders yet. New orders will appear here."
        />
      </SamplePanel>
    </>
  );
}
