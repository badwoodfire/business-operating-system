import PageHeader from '../../components/ui/PageHeader';
import RecordManager from '../../components/workspace/RecordManager';
import SummaryTile from '../../components/ui/SummaryTile';
import { makeId, useBusinessStore } from '../../store/BusinessStore';
import type { PaymentRecord, PaymentStatus, PaymentMethod } from '../../types';

const fields = [{ name: 'orderId', label: 'Order ID' }, { name: 'customerName', label: 'Customer name' }, { name: 'method', label: 'Payment method', type: 'select' as const, options: ['cod','bank_transfer','easypaisa','jazzcash','card'].map((value) => ({ value, label: value.replace('_',' ') })) }, { name: 'amount', label: 'Amount (PKR)', type: 'number' as const }, { name: 'status', label: 'Payment status', type: 'select' as const, options: ['received','pending','overdue'].map((value) => ({ value, label: value })) }, { name: 'date', label: 'Date', type: 'date' as const }];
const columns = [{ key: 'id', label: 'Payment ID' }, { key: 'orderId', label: 'Order' }, { key: 'customerName', label: 'Customer' }, { key: 'method', label: 'Method' }, { key: 'amount', label: 'Amount (PKR)' }, { key: 'status', label: 'Status' }, { key: 'date', label: 'Date' }];

export default function PaymentsPage() {
  const { payments, updatePayments } = useBusinessStore();
  const save = (values: Record<string, string | number>, id?: string) => {
    const item: PaymentRecord = { id: id ?? makeId('PAY'), orderId: String(values.orderId), customerName: String(values.customerName), method: values.method as PaymentMethod, amount: Number(values.amount), status: values.status as PaymentStatus, date: String(values.date) };
    updatePayments(id ? payments.map((row) => row.id === id ? item : row) : [item, ...payments]);
  };
  const total = (status: PaymentStatus) => payments.filter((p) => p.status === status).reduce((sum, p) => sum + p.amount, 0);
  return <><PageHeader title="Payments" description="Record incoming payments and follow outstanding balances." /><section className="summary-grid"><SummaryTile label="Received" value={total('received').toLocaleString('en-PK')} hint="PKR" tone="success" /><SummaryTile label="Pending" value={total('pending').toLocaleString('en-PK')} hint="PKR" tone="warning" /><SummaryTile label="Overdue" value={total('overdue').toLocaleString('en-PK')} hint="PKR" tone="danger" /></section><RecordManager title="Payment register" description="Track cash on delivery, bank transfers, Easypaisa, JazzCash and card payments." createLabel="Record payment" fields={fields} columns={columns} rows={payments} onSave={save} onDelete={(id) => updatePayments(payments.filter((row) => row.id !== id))} /></>;
}