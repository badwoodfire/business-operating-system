import PageHeader from '../../components/ui/PageHeader';
import RecordManager from '../../components/workspace/RecordManager';
import SummaryTile from '../../components/ui/SummaryTile';
import { makeId, useBusinessStore } from '../../store/BusinessStore';
import type { Expense, ExpenseCategory } from '../../types';

const categories: ExpenseCategory[] = ['stock','shipping','packaging','marketing','rent','utilities','salaries'];
const fields = [{ name: 'description', label: 'Expense description' }, { name: 'category', label: 'Category', type: 'select' as const, options: categories.map((value) => ({ value, label: value })) }, { name: 'amount', label: 'Amount (PKR)', type: 'number' as const }, { name: 'date', label: 'Date', type: 'date' as const }];
const columns = [{ key: 'description', label: 'Description' }, { key: 'category', label: 'Category' }, { key: 'date', label: 'Date' }, { key: 'amount', label: 'Amount (PKR)' }];

export default function ExpensesPage() {
  const { expenses, updateExpenses } = useBusinessStore();
  const save = (values: Record<string, string | number>, id?: string) => {
    const item: Expense = { id: id ?? makeId('EXP'), description: String(values.description), category: values.category as ExpenseCategory, amount: Number(values.amount), date: String(values.date) };
    updateExpenses(id ? expenses.map((row) => row.id === id ? item : row) : [item, ...expenses]);
  };
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  return <><PageHeader title="Expenses" description="Record business spending and monitor operating costs." /><section className="summary-grid"><SummaryTile label="Total expenses" value={total.toLocaleString('en-PK')} hint="PKR across all records" tone="warning" /><SummaryTile label="Expense entries" value={String(expenses.length)} hint="saved records" /></section><RecordManager title="Expense register" description="Track stock, shipping, packaging, marketing and overhead costs." createLabel="Add expense" fields={fields} columns={columns} rows={expenses} onSave={save} onDelete={(id) => updateExpenses(expenses.filter((row) => row.id !== id))} /></>;
}