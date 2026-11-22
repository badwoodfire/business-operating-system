import PageHeader from '../../components/ui/PageHeader';
import type { ModuleId } from '../../types';
import QuickActions from './QuickActions';
import RecentOrders from './RecentOrders';
import StatsGrid from './StatsGrid';
import './dashboard.css';

interface DashboardPageProps { onNavigate: (id: ModuleId) => void; }

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  return <><PageHeader title="Dashboard" description="A live overview of the records in your business workspace." /><div className="section-label"><span>Current workspace</span></div><StatsGrid /><div className="dashboard-grid"><RecentOrders onNavigate={onNavigate} /><QuickActions onNavigate={onNavigate} /></div></>;
}