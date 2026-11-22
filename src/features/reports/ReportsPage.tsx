import PageHeader from '../../components/ui/PageHeader';
import SummaryTile from '../../components/ui/SummaryTile';
import { PAYMENT_METHOD_LABELS } from '../../config/orders';
import { useBusinessStore } from '../../store/BusinessStore';
import { formatCurrency } from '../../utils/format';
import BarList from './BarList';
import './reports.css';

export default function ReportsPage() {
  const { orders, expenses, payments } = useBusinessStore();
  const validOrders = orders.filter((order) => order.status !== 'cancelled');
  const revenue = validOrders.reduce((sum, order) => sum + order.total, 0);
  const costs = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const profit = revenue - costs;
  const monthly = new Map<string, number>();
  validOrders.forEach((order) => { const month = order.date.slice(0, 7); monthly.set(month, (monthly.get(month) ?? 0) + order.total); });
  const monthlyItems = [...monthly.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([id, value]) => ({ id, label: new Date(`${id}-01T00:00:00`).toLocaleDateString('en-PK', { month: 'short', year: 'numeric' }), value, display: formatCurrency(value) }));
  const methodTotals = new Map<string, number>();
  payments.filter((payment) => payment.status === 'received').forEach((payment) => methodTotals.set(payment.method, (methodTotals.get(payment.method) ?? 0) + payment.amount));
  const paidTotal = [...methodTotals.values()].reduce((sum, amount) => sum + amount, 0);
  const paymentItems = [...methodTotals.entries()].map(([method, amount]) => ({ id: method, label: PAYMENT_METHOD_LABELS[method as keyof typeof PAYMENT_METHOD_LABELS], value: amount, display: `${formatCurrency(amount)} · ${paidTotal ? Math.round(amount / paidTotal * 100) : 0}%` }));
  const expenseTotals = new Map<string, number>();
  expenses.forEach((expense) => expenseTotals.set(expense.category, (expenseTotals.get(expense.category) ?? 0) + expense.amount));
  const expenseItems = [...expenseTotals.entries()].map(([category, amount]) => ({ id: category, label: category.replace('_', ' '), value: amount, display: formatCurrency(amount) }));
  return <>
    <PageHeader title="Reports" description="Live calculations from the orders, payments and expenses in this workspace." />
    <section className="summary-grid">
      <SummaryTile label="Sales" value={formatCurrency(revenue)} hint={`${validOrders.length} non-cancelled orders`} tone="success" />
      <SummaryTile label="Expenses" value={formatCurrency(costs)} hint={`${expenses.length} expense records`} tone="warning" />
      <SummaryTile label="Estimated operating result" value={formatCurrency(profit)} hint="Sales minus recorded expenses only" tone={profit >= 0 ? 'success' : 'danger'} />
      <SummaryTile label="Payments received" value={formatCurrency(paidTotal)} hint="Records marked received" tone="info" />
    </section>
    <div className="reports-stack">
      <section className="panel"><div className="panel__header"><div><h2 className="panel__title">Sales by month</h2><p className="panel__description">Based on order dates. Cancelled orders are excluded.</p></div></div>{monthlyItems.length ? <BarList items={monthlyItems} /> : <p className="empty-state">Add orders to see monthly sales.</p>}</section>
      <div className="reports-grid">
        <section className="panel"><div className="panel__header"><div><h2 className="panel__title">Received by payment method</h2><p className="panel__description">Only payments marked received are included.</p></div></div>{paymentItems.length ? <BarList items={paymentItems} /> : <p className="empty-state">Record received payments to see this report.</p>}</section>
        <section className="panel"><div className="panel__header"><div><h2 className="panel__title">Expenses by category</h2><p className="panel__description">Grouped from saved expense records.</p></div></div>{expenseItems.length ? <BarList items={expenseItems} /> : <p className="empty-state">Add expenses to see this report.</p>}</section>
      </div>
      <p className="panel__description">Profit is a basic estimate: sales minus recorded expenses. It does not yet include product cost of goods sold, taxes, refunds, shipping adjustments or payment fees.</p>
    </div>
  </>;
}
