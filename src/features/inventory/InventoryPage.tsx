import PageHeader from '../../components/ui/PageHeader';
import RecordManager from '../../components/workspace/RecordManager';
import SummaryTile from '../../components/ui/SummaryTile';
import { makeId, useBusinessStore } from '../../store/BusinessStore';
import type { Product } from '../../types';

const fields = [{ name: 'name', label: 'Product name' }, { name: 'sku', label: 'SKU' }, { name: 'category', label: 'Category' }, { name: 'price', label: 'Selling price (PKR)', type: 'number' as const }, { name: 'stock', label: 'Units in stock', type: 'number' as const }, { name: 'reorderLevel', label: 'Low-stock alert at', type: 'number' as const }];
const columns = [{ key: 'name', label: 'Product' }, { key: 'sku', label: 'SKU' }, { key: 'category', label: 'Category' }, { key: 'price', label: 'Price (PKR)' }, { key: 'stock', label: 'Stock' }, { key: 'reorderLevel', label: 'Reorder level' }];

export default function InventoryPage() {
  const { products, updateProducts } = useBusinessStore();
  const save = (values: Record<string, string | number>, id?: string) => {
    const item: Product = { id: id ?? makeId('SKU'), name: String(values.name), sku: String(values.sku), category: String(values.category), price: Number(values.price), stock: Number(values.stock), reorderLevel: Number(values.reorderLevel) };
    updateProducts(id ? products.map((row) => row.id === id ? item : row) : [item, ...products]);
  };
  const low = products.filter((p) => p.stock <= p.reorderLevel && p.stock > 0).length;
  const empty = products.filter((p) => p.stock === 0).length;
  return <><PageHeader title="Inventory" description="Manage products, selling prices and stock levels." /><section className="summary-grid"><SummaryTile label="Products" value={String(products.length)} hint="in catalogue" /><SummaryTile label="Low stock" value={String(low)} hint="reorder recommended" tone="warning" /><SummaryTile label="Out of stock" value={String(empty)} hint="needs restocking" tone="danger" /></section><RecordManager title="Product catalogue" description="Changes are saved automatically in this browser." createLabel="Add product" fields={fields} columns={columns} rows={products} onSave={save} onDelete={(id) => updateProducts(products.filter((row) => row.id !== id))} /></>;
}