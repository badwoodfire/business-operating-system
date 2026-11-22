import PageHeader from '../../components/ui/PageHeader';
import RecordManager from '../../components/workspace/RecordManager';
import { makeId, useBusinessStore } from '../../store/BusinessStore';
import type { Customer } from '../../types';

const fields = [{ name: 'name', label: 'Customer name' }, { name: 'city', label: 'City' }, { name: 'orderCount', label: 'Number of orders', type: 'number' as const }, { name: 'totalSpent', label: 'Lifetime spend (PKR)', type: 'number' as const }, { name: 'lastOrderDate', label: 'Last order date', type: 'date' as const }];
const columns = [{ key: 'name', label: 'Customer' }, { key: 'city', label: 'City' }, { key: 'orderCount', label: 'Orders' }, { key: 'totalSpent', label: 'Total spent (PKR)' }, { key: 'lastOrderDate', label: 'Last order' }];

export default function CustomersPage() {
  const { customers, updateCustomers } = useBusinessStore();
  const save = (values: Record<string, string | number>, id?: string) => {
    const item: Customer = { id: id ?? makeId('CUS'), name: String(values.name), city: String(values.city), orderCount: Number(values.orderCount), totalSpent: Number(values.totalSpent), lastOrderDate: String(values.lastOrderDate) };
    updateCustomers(id ? customers.map((row) => row.id === id ? item : row) : [item, ...customers]);
  };
  return <><PageHeader title="Customers" description="Maintain customer profiles and lifetime order totals." /><RecordManager title="Customer directory" description={`${customers.length} customer records in this workspace.`} createLabel="Add customer" fields={fields} columns={columns} rows={customers} onSave={save} onDelete={(id) => updateCustomers(customers.filter((row) => row.id !== id))} /></>;
}