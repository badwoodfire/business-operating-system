import ActionButton from '../../components/demo/ActionButton';
import RowActions from '../../components/demo/RowActions';
import Badge from '../../components/ui/Badge';
import DataTable, { type DataTableColumn } from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SamplePanel from '../../components/ui/SamplePanel';
import SummaryTile from '../../components/ui/SummaryTile';
import { PAYMENT_METHOD_LABELS } from '../../config/orders';
import { PAYMENT_STATUS_META } from '../../config/payments';
import { DEMO_PAYMENTS } from '../../data/demoPayments';
import type { PaymentRecord, PaymentStatus } from '../../types';
import { formatCurrency, formatShortDate } from '../../utils/format';

const COLUMNS: DataTableColumn<PaymentRecord>[] = [
  { key: 'id', header: 'Payment', strong: true, render: (payment) => payment.id },
  { key: 'order', header: 'Order', render: (payment) => payment.orderId },
  { key: 'customer', header: 'Customer', render: (payment) => payment.customerName },
  { key: 'date', header: 'Date', render: (payment) => formatShortDate(payment.date) },
  {
    key: 'method',
    header: 'Method',
    render: (payment) => PAYMENT_METHOD_LABELS[payment.method],
  },
  {
    key: 'amount',
    header: 'Amount',
    numeric: true,
    render: (payment) => formatCurrency(payment.amount),
  },
  {
    key: 'status',
    header: 'Status',
    render: (payment) => {
      const status = PAYMENT_STATUS_META[payment.status];
      return <Badge tone={status.tone}>{status.label}</Badge>;
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    actions: true,
    render: (payment) => <RowActions subject={`payment ${payment.id}`} />,
  },
];

function totalFor(status: PaymentStatus): { amount: number; count: number } {
  const matching = DEMO_PAYMENTS.filter((payment) => payment.status === status);
  return {
    amount: matching.reduce((sum, payment) => sum + payment.amount, 0),
    count: matching.length,
  };
}

export default function PaymentsPage() {
  const received = totalFor('received');
  const pending = totalFor('pending');
  const overdue = totalFor('overdue');

  return (
    <>
      <PageHeader
        title="Payments"
        description="See what has been paid and what is still owed."
        actions={
          <ActionButton icon="plus" actionLabel="Record payment">
            Record payment
          </ActionButton>
        }
      />
      <section className="summary-grid" aria-label="Payment summary for the sample payments">
        <SummaryTile label="Received" value={formatCurrency(received.amount)} hint={`${received.count} sample payments`} tone="success" />
        <SummaryTile label="Pending" value={formatCurrency(pending.amount)} hint={`${pending.count} sample payments`} tone="warning" />
        <SummaryTile label="Overdue" value={formatCurrency(overdue.amount)} hint={`${overdue.count} sample payment`} tone="danger" />
      </section>
      <SamplePanel
        title="All payments"
        description={`${DEMO_PAYMENTS.length} made-up payments for illustration.`}
      >
        <DataTable
          columns={COLUMNS}
          rows={DEMO_PAYMENTS}
          getRowKey={(payment) => payment.id}
          emptyMessage="No payments yet. Recorded payments will appear here."
        />
      </SamplePanel>
    </>
  );
}
