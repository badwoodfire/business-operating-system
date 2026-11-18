import AppLayout from './components/layout/AppLayout';
import DashboardPage from './features/dashboard/DashboardPage';
import { useActiveModule } from './hooks/useActiveModule';
import ModulePlaceholder from './pages/ModulePlaceholder';

export default function App() {
  const [activeModule, navigate] = useActiveModule();

  return (
    <AppLayout activeModule={activeModule} onNavigate={navigate}>
      {activeModule === 'dashboard' ? (
        <DashboardPage onNavigate={navigate} />
      ) : (
        // Modules are added here as they are built. Until then, show the roadmap.
        <ModulePlaceholder moduleId={activeModule} />
      )}
    </AppLayout>
  );
}
