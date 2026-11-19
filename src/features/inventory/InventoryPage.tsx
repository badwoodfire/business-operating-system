import ActionButton from '../../components/demo/ActionButton';
import RowActions from '../../components/demo/RowActions';
import Badge from '../../components/ui/Badge';
import DataTable, { type DataTableColumn } from '../../components/ui/DataTable';
import PageHeader from '../../components/ui/PageHeader';
import SamplePanel from '../../components/ui/SamplePanel';
import SummaryTile from '../../components/ui/SummaryTile';
import { STOCK_STATUS_META, getStockStatus } from '../../config/inventory';
import { DEMO_PRODUCTS } from '../../data/demoInventory';
import type { Product, StockStatus } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/format';

const COLUMNS: DataTableColumn<Product>[] = [
  { key: 'name', header: 'Product', strong: true, render: (product) => product.name },
  { key: 'sku', header: 'SKU', render: (product) => product.sku },
  { key: 'category', header: 'Category', render: (product) => product.category },
  {
    key: 'price',
    header: 'Price',
    numeric: true,
    render: (product) => formatCurrency(product.price),
  },
  {
    key: 'stock',
    header: 'In stock',
    numeric: true,
    render: (product) => formatNumber(product.stock),
  },
  {
    key: 'status',
    header: 'Status',
    render: (product) => {
      const status = STOCK_STATUS_META[getStockStatus(product)];
      return <Badge tone={status.tone}>{status.label}</Badge>;
    },
  },
  {
    key: 'actions',
    header: 'Actions',
    actions: true,
    render: (product) => <RowActions subject={`product ${product.name}`} />,
  },
];

function countByStatus(status: StockStatus): number {
  return DEMO_PRODUCTS.filter((product) => getStockStatus(product) === status).length;
}

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        title="Inventory"
        description="See your products, prices and stock levels."
        actions={
          <ActionButton icon="plus" actionLabel="Add product">
            Add product
          </ActionButton>
        }
      />
      <section className="summary-grid" aria-label="Stock summary for the sample products">
        <SummaryTile label="In stock" value={String(countByStatus('in_stock'))} hint="sample products" tone="success" />
        <SummaryTile label="Low stock" value={String(countByStatus('low_stock'))} hint="sample products" tone="warning" />
        <SummaryTile label="Out of stock" value={String(countByStatus('out_of_stock'))} hint="sample products" tone="danger" />
      </section>
      <SamplePanel
        title="Products"
        description={`${DEMO_PRODUCTS.length} made-up products for illustration.`}
      >
        <DataTable
          columns={COLUMNS}
          rows={DEMO_PRODUCTS}
          getRowKey={(product) => product.id}
          emptyMessage="No products yet. Added products will appear here."
        />
      </SamplePanel>
    </>
  );
}
