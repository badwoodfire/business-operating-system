import { DEMO_BUSINESS_NAME } from '../../config/app';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

interface TopbarProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

export default function Topbar({ isSidebarOpen, onMenuClick }: TopbarProps) {
  return (
    <div className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="icon-button topbar__menu"
          onClick={onMenuClick}
          aria-label="Open navigation"
          aria-controls="primary-sidebar"
          aria-expanded={isSidebarOpen}
        >
          <Icon name="menu" />
        </button>
        <span className="topbar__workspace">{DEMO_BUSINESS_NAME}</span>
      </div>
      <div className="topbar__right">
        <Badge tone="warning">Demo data</Badge>
        <span className="topbar__avatar" aria-hidden="true">
          DS
        </span>
      </div>
    </div>
  );
}
