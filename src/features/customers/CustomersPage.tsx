import ActionButton from '../../components/demo/ActionButton';
import RowActions from '../../components/demo/RowActions';
import DataTable, { type DataTableColumn } from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SamplePanel from '../../components/ui/SamplePanel';
import { DEMO_CUSTOMERS } from '../../data/demoCustomers';
import type { Customer } from '../../types';
import { formatCurrency, formatNumber, formatShortDate } from '../../utils/format';

const COLUMNS: DataTableColumn<Customer>[] = [
  { key: 'name', header: 'Customer', strong: true, render: (customer) => customer.name },
  { key: 'city', header: 'City', render: (customer) => customer.city },
  {
    key: 'orders',
    header: 'Orders',
    numeric: true,
    render: (customer) => formatNumber(customer.orderCount),
  },
  {
    key: 'spent',
    header: 'Total spent',
    numeric: true,
    render: (customer) => formatCurrency(customer.totalSpent),
  },
  {
    key: 'last-order',
    header: 'Last order',
    render: (customer) => formatShortDate(customer.lastOrderDate),
  },
  {
    key: 'actions',
    header: 'Actions',
    actions: true,
    render: (customer) => <RowActions subject={`customer ${customer.name}`} />,
  },
];

export default function CustomersPage() {
  return (
    <>
      <PageHeader
        title="Customers"
        description="Keep customer details and order history in one place."
        actions={
          <ActionButton icon="userPlus" actionLabel="Add customer">
            Add customer
          </ActionButton>
        }
      />
      <SamplePanel
        title="All customers"
        description={`${DEMO_CUSTOMERS.length} made-up customers for illustration.`}
      >
        <DataTable
          columns={COLUMNS}
          rows={DEMO_CUSTOMERS}
          getRowKey={(customer) => customer.id}
          emptyMessage="No customers yet. Saved customers will appear here."
        />
      </SamplePanel>
    </>
  );
}
