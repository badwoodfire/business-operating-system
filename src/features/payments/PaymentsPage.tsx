import PageHeader from '../../components/ui/PageHeader';
import RecordManager from '../../components/workspace/RecordManager';
import SummaryTile from '../../components/ui/SummaryTile';
import { makeId, useBusinessStore } from '../../store/BusinessStore';
import type { PaymentRecord, PaymentStatus, PaymentMethod } from '../../types';

const columns = [
  { key: 'id', label: 'Payment ID' },
  { key: 'orderId', label: 'Order' },
  { key: 'customerName', label: 'Customer' },
  { key: 'method', label: 'Method' },
  { key: 'amount', label: 'Amount (PKR)' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
];

export default function PaymentsPage() {
  const { payments, orders, updatePayments } = useBusinessStore();

  const fields = [
    {
      name: 'orderId',
      label: 'Linked order',
      type: 'select' as const,
      options: orders.map((order) => ({
        value: order.id,
        label: `${order.id} — ${order.customerName} — PKR ${order.total.toLocaleString('en-PK')}`,
      })),
    },
    {
      name: 'method',
      label: 'Payment method',
      type: 'select' as const,
      options: ['cod', 'bank_transfer', 'easypaisa', 'jazzcash', 'card'].map((value) => ({
        value,
        label: value.replace('_', ' '),
      })),
    },
    { name: 'amount', label: 'Amount (PKR)', type: 'number' as const },
    {
      name: 'status',
      label: 'Payment status',
      type: 'select' as const,
      options: ['received', 'pending', 'overdue'].map((value) => ({ value, label: value })),
    },
    { name: 'date', label: 'Date', type: 'date' as const },
  ];

  const save = (values: Record<string, string | number>, id?: string) => {
    const orderId = String(values.orderId ?? '');
    const order = orders.find((row) => row.id === orderId);
    const amount = Number(values.amount);
    const status = values.status as PaymentStatus;

    if (!order) {
      window.alert('Please select an existing order for this payment.');
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      window.alert('Enter a payment amount greater than zero.');
      return;
    }
    if (amount > order.total) {
      window.alert(`This payment cannot be greater than the order total of PKR ${order.total.toLocaleString('en-PK')}.`);
      return;
    }

    const alreadyReceived = payments
      .filter((payment) => payment.orderId === orderId && payment.status === 'received' && payment.id !== id)
      .reduce((sum, payment) => sum + payment.amount, 0);

    if (status === 'received' && alreadyReceived + amount > order.total) {
      const remaining = Math.max(0, order.total - alreadyReceived);
      window.alert(`This would exceed the order total. Only PKR ${remaining.toLocaleString('en-PK')} remains to be received.`);
      return;
    }

    const item: PaymentRecord = {
      id: id ?? makeId('PAY'),
      orderId,
      customerName: order.customerName,
      method: values.method as PaymentMethod,
      amount,
      status,
      date: String(values.date),
      source: payments.find((payment) => payment.id === id)?.source ?? 'manual',
    };

    updatePayments(id ? payments.map((row) => row.id === id ? item : row) : [item, ...payments]);
  };

  const total = (status: PaymentStatus) =>
    payments.filter((payment) => payment.status === status).reduce((sum, payment) => sum + payment.amount, 0);

  return <>
    <PageHeader title="Payments" description="Record payments against orders and follow outstanding balances." />
    <section className="summary-grid">
      <SummaryTile label="Received" value={total('received').toLocaleString('en-PK')} hint="PKR" tone="success" />
      <SummaryTile label="Pending" value={total('pending').toLocaleString('en-PK')} hint="PKR" tone="warning" />
      <SummaryTile label="Overdue" value={total('overdue').toLocaleString('en-PK')} hint="PKR" tone="danger" />
    </section>
    <RecordManager
      title="Payment register"
      description="Choose an existing order. The customer name is filled from that order automatically."
      createLabel="Record payment"
      fields={fields}
      columns={columns}
      rows={payments}
      onSave={save}
      onDelete={(paymentId) => updatePayments(payments.filter((row) => row.id !== paymentId))}
    />
  </>;
}
