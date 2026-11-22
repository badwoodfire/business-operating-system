import StatCard from '../../components/ui/StatCard';
import { useBusinessStore } from '../../store/BusinessStore';
import { formatCurrency, formatNumber } from '../../utils/format';

export default function StatsGrid() {
  const { orders, products, customers } = useBusinessStore();
  const sales = orders.filter((order) => order.status !== 'cancelled').reduce((sum, order) => sum + order.total, 0);
  const stats = [
    { id: 'sales', label: 'Sales', value: sales, format: 'currency' as const, icon: 'sales' as const, tone: 'green' as const },
    { id: 'orders', label: 'Orders', value: orders.filter((order) => order.status !== 'cancelled').length, format: 'number' as const, icon: 'orders' as const, tone: 'blue' as const },
    { id: 'products', label: 'Products', value: products.length, format: 'number' as const, icon: 'inventory' as const, tone: 'amber' as const },
    { id: 'customers', label: 'Customers', value: customers.length, format: 'number' as const, icon: 'customers' as const, tone: 'violet' as const },
  ];
  return <section className="stats-grid" aria-label="Key statistics">{stats.map((stat) => <StatCard key={stat.id} label={stat.label} value={stat.format === 'currency' ? formatCurrency(stat.value) : formatNumber(stat.value)} icon={stat.icon} tone={stat.tone} changePercent={0} comparisonLabel="current workspace" />)}</section>;
}