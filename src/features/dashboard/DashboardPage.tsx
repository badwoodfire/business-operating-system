import PageHeader from '../../components/ui/PageHeader';
import { DEMO_DATA_NOTICE } from '../../data/demoData';
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
      <p className="demo-notice" role="note">
        {DEMO_DATA_NOTICE}
      </p>
      <StatsGrid />
      <div className="dashboard-grid">
        <RecentOrders onNavigate={onNavigate} />
        <QuickActions onNavigate={onNavigate} />
      </div>
    </>
  );
}
