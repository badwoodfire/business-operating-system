import { useEffect, useState, type ReactNode } from 'react';
import { APP_NAME } from '../../config/app';
import { getNavItem, NAV_ITEMS } from '../../config/navigation';
import type { ModuleId } from '../../types';
import DemoBanner from '../demo/DemoBanner';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface AppLayoutProps { activeModule: ModuleId; onNavigate: (id: ModuleId) => void; onSignIn: () => void; children: ReactNode; }

export default function AppLayout({ activeModule, onNavigate, onSignIn, children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => { document.title = `${getNavItem(activeModule).label} · ${APP_NAME}`; }, [activeModule]);
  useEffect(() => {
    if (!isSidebarOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsSidebarOpen(false); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSidebarOpen]);
  const handleNavigate = (id: ModuleId) => { onNavigate(id); setIsSidebarOpen(false); window.scrollTo({ top: 0 }); };
  return <div className="app-shell">
    <Sidebar items={NAV_ITEMS} activeId={activeModule} isOpen={isSidebarOpen} onNavigate={handleNavigate} onClose={() => setIsSidebarOpen(false)} />
    <div className="app-shell__main"><Topbar isSidebarOpen={isSidebarOpen} onMenuClick={() => setIsSidebarOpen(true)} onSignIn={onSignIn} /><main className="app-shell__content"><DemoBanner />{children}</main></div>
  </div>;
}
