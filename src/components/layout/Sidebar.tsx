import { APP_NAME, APP_VERSION } from '../../config/app';
import type { ModuleId, NavItem } from '../../types';
import Icon from '../ui/Icon';

interface SidebarProps { items: NavItem[]; activeId: ModuleId; isOpen: boolean; onNavigate: (id: ModuleId) => void; onClose: () => void; }

export default function Sidebar({ items, activeId, isOpen, onNavigate, onClose }: SidebarProps) {
  return <>
    <div className={`sidebar-overlay ${isOpen ? 'sidebar-overlay--visible' : ''}`} onClick={onClose} aria-hidden="true" />
    <aside id="primary-sidebar" className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden="true">B</span>
        <span className="sidebar__brand-text"><strong>{APP_NAME}</strong><small>Business workspace</small></span>
        <button type="button" className="icon-button sidebar__close" onClick={onClose} aria-label="Close navigation"><Icon name="close" /></button>
      </div>
      <nav className="sidebar__nav" aria-label="Main navigation"><ul className="sidebar__list">
        {items.map((item) => { const active = item.id === activeId; return <li key={item.id}><button type="button" className={`nav-item ${active ? 'nav-item--active' : ''}`} aria-current={active ? 'page' : undefined} onClick={() => onNavigate(item.id)}><Icon name={item.icon} /><span>{item.label}</span></button></li>; })}
      </ul></nav>
      <p className="sidebar__footer">Version {APP_VERSION} · Local storage</p>
    </aside>
  </>;
}