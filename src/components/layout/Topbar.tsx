import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

interface TopbarProps { isSidebarOpen: boolean; onMenuClick: () => void; onSignIn: () => void; }
export default function Topbar({ isSidebarOpen, onMenuClick }: TopbarProps) {
  return <div className="topbar"><div className="topbar__left"><button type="button" className="icon-button topbar__menu" onClick={onMenuClick} aria-label="Open navigation" aria-controls="primary-sidebar" aria-expanded={isSidebarOpen}><Icon name="menu" /></button><span className="topbar__workspace">Business workspace</span></div><div className="topbar__right"><Badge tone="info">Local only</Badge></div></div>;
}
