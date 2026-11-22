import DemoModeProvider from './components/demo/DemoModeProvider';
import AppLayout from './components/layout/AppLayout';
import { DEFAULT_MODULE } from './config/navigation';
import LoginPage from './features/auth/LoginPage';
import CustomersPage from './features/customers/CustomersPage';
import DashboardPage from './features/dashboard/DashboardPage';
import ExpensesPage from './features/expenses/ExpensesPage';
import InventoryPage from './features/inventory/InventoryPage';
import OrdersPage from './features/orders/OrdersPage';
import PaymentsPage from './features/payments/PaymentsPage';
import ReportsPage from './features/reports/ReportsPage';
import { useActiveModule } from './hooks/useActiveModule';
import { useLoginRoute } from './hooks/useLoginRoute';
import ModulePlaceholder from './pages/ModulePlaceholder';
import { BusinessStoreProvider } from './store/BusinessStore';
import type { ModuleId } from './types';

interface ModuleViewProps {
  moduleId: ModuleId;
  onNavigate: (id: ModuleId) => void;
}

function ModuleView({ moduleId, onNavigate }: ModuleViewProps) {
  switch (moduleId) {
    case 'dashboard': return <DashboardPage onNavigate={onNavigate} />;
    case 'orders': return <OrdersPage />;
    case 'inventory': return <InventoryPage />;
    case 'customers': return <CustomersPage />;
    case 'payments': return <PaymentsPage />;
    case 'expenses': return <ExpensesPage />;
    case 'reports': return <ReportsPage />;
    default: return <ModulePlaceholder moduleId={moduleId} />;
  }
}

export default function App() {
  const [activeModule, navigate] = useActiveModule();
  const [isLoginRoute, openLogin] = useLoginRoute();

  return (
    <BusinessStoreProvider>
      <DemoModeProvider onSignIn={openLogin}>
        {isLoginRoute ? (
          <LoginPage onBackToDemo={() => navigate(DEFAULT_MODULE)} />
        ) : (
          <AppLayout activeModule={activeModule} onNavigate={navigate} onSignIn={openLogin}>
            <ModuleView moduleId={activeModule} onNavigate={navigate} />
          </AppLayout>
        )}
      </DemoModeProvider>
    </BusinessStoreProvider>
  );
}
