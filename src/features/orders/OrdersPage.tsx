import PageHeader from '../../components/ui/PageHeader';
import RecordManager from '../../components/workspace/RecordManager';
import { makeId, useBusinessStore } from '../../store/BusinessStore';
import type { Order, OrderStatus, PaymentMethod } from '../../types';

const fields = [
  { name: 'customerName', label: 'Customer name' },
  { name: 'itemCount', label: 'Number of items', type: 'number' as const },
  { name: 'total', label: 'Order total (PKR)', type: 'number' as const },
  { name: 'status', label: 'Order status', type: 'select' as const, options: ['pending','processing','shipped','delivered','cancelled'].map((value) => ({ value, label: value })) },
  { name: 'paymentMethod', label: 'Payment method', type: 'select' as const, options: ['cod','bank_transfer','easypaisa','jazzcash','card'].map((value) => ({ value, label: value.replace('_',' ') })) },
  { name: 'date', label: 'Order date', type: 'date' as const },
];
const columns = [{ key: 'id', label: 'Order ID' }, { key: 'customerName', label: 'Customer' }, { key: 'date', label: 'Date' }, { key: 'itemCount', label: 'Items' }, { key: 'total', label: 'Total (PKR)' }, { key: 'status', label: 'Status' }, { key: 'paymentMethod', label: 'Payment' }];

export default function OrdersPage() {
  const { orders, updateOrders } = useBusinessStore();
  const save = (values: Record<string, string | number>, id?: string) => {
    const item: Order = { id: id ?? makeId('ORD'), customerName: String(values.customerName), itemCount: Number(values.itemCount), total: Number(values.total), status: values.status as OrderStatus, paymentMethod: values.paymentMethod as PaymentMethod, date: String(values.date) };
    updateOrders(id ? orders.map((row) => row.id === id ? item : row) : [item, ...orders]);
  };
  return <><PageHeader title="Orders" description="Create, update and track customer orders. Amounts are in PKR." /><RecordManager title="Order register" description={`${orders.length} orders saved in this browser workspace.`} createLabel="Add order" fields={fields} columns={columns} rows={orders} onSave={save} onDelete={(id) => updateOrders(orders.filter((row) => row.id !== id))} /></>;
}