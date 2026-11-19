import Badge from '../../components/ui/Badge';
import PageHeader from '../../components/ui/PageHeader';
import type { ModuleId } from '../../types';
import QuickActions from './QuickActions';
import RecentOrders from './RecentOrders';
import StatsGrid from './StatsGrid';
import './dashboard.css';

interface DashboardPageProps {
  onNavigate: (id: ModuleId) => void;
}

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A quick look at how your store is doing this month."
      />
      <div className="section-label">
        <span>This month</span>
        <Badge tone="warning">Sample data</Badge>
      </div>
      <StatsGrid />
      <div className="dashboard-grid">
        <RecentOrders onNavigate={onNavigate} />
        <QuickActions onNavigate={onNavigate} />
      </div>
    </>
  );
}
