import ActionButton from '../../components/demo/ActionButton';
import RowActions from '../../components/demo/RowActions';
import Badge from '../../components/ui/Badge';
import DataTable, { type DataTableColumn } from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SamplePanel from '../../components/ui/SamplePanel';
import SummaryTile from '../../components/ui/SummaryTile';
import { EXPENSE_CATEGORY_LABELS } from '../../config/expenses';
import { DEMO_EXPENSES } from '../../data/demoExpenses';
import type { Expense, ExpenseCategory } from '../../types';
import { formatCurrency, formatShortDate } from '../../utils/format';

const COLUMNS: DataTableColumn<Expense>[] = [
  { key: 'id', header: 'Expense', strong: true, render: (expense) => expense.id },
  { key: 'description', header: 'Description', render: (expense) => expense.description },
  {
    key: 'category',
    header: 'Category',
    render: (expense) => <Badge>{EXPENSE_CATEGORY_LABELS[expense.category]}</Badge>,
  },
  { key: 'date', header: 'Date', render: (expense) => formatShortDate(expense.date) },
  {
    key: 'amount',
    header: 'Amount',
    numeric: true,
    render: (expense) => formatCurrency(expense.amount),
  },
  {
    key: 'actions',
    header: 'Actions',
    actions: true,
    render: (expense) => <RowActions subject={`expense ${expense.id}`} />,
  },
];

/** The category with the highest combined spend in the sample data. */
function getLargestCategory(): { category: ExpenseCategory; amount: number } {
  const totals = new Map<ExpenseCategory, number>();
  for (const expense of DEMO_EXPENSES) {
    totals.set(expense.category, (totals.get(expense.category) ?? 0) + expense.amount);
  }
  let largest: { category: ExpenseCategory; amount: number } = {
    category: DEMO_EXPENSES[0].category,
    amount: 0,
  };
  for (const [category, amount] of totals) {
    if (amount > largest.amount) largest = { category, amount };
  }
  return largest;
}

export default function ExpensesPage() {
  const total = DEMO_EXPENSES.reduce((sum, expense) => sum + expense.amount, 0);
  const largest = getLargestCategory();

  return (
    <>
      <PageHeader
        title="Expenses"
        description="Track business spending and understand your costs."
        actions={
          <ActionButton icon="plus" actionLabel="Log expense">
            Log expense
          </ActionButton>
        }
      />
      <section className="summary-grid" aria-label="Expense summary for the sample expenses">
        <SummaryTile label="Total spent" value={formatCurrency(total)} hint={`${DEMO_EXPENSES.length} sample expenses`} tone="info" />
        <SummaryTile
          label="Biggest category"
          value={EXPENSE_CATEGORY_LABELS[largest.category]}
          hint={`${formatCurrency(largest.amount)} in the sample data`}
          tone="neutral"
        />
      </section>
      <SamplePanel
        title="All expenses"
        description={`${DEMO_EXPENSES.length} made-up expenses for illustration.`}
      >
        <DataTable
          columns={COLUMNS}
          rows={DEMO_EXPENSES}
          getRowKey={(expense) => expense.id}
          emptyMessage="No expenses yet. Logged expenses will appear here."
        />
      </SamplePanel>
    </>
  );
}
