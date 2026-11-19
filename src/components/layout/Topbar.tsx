import { DEMO_BUSINESS_NAME } from '../../config/app';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';

interface TopbarProps {
  isSidebarOpen: boolean;
  onMenuClick: () => void;
  onSignIn: () => void;
}

export default function Topbar({ isSidebarOpen, onMenuClick, onSignIn }: TopbarProps) {
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
        <button
          type="button"
          className="btn btn--secondary topbar__signin"
          onClick={onSignIn}
          aria-label="Sign in"
        >
          <Icon name="logIn" size={18} />
          <span className="topbar__signin-text">Sign in</span>
        </button>
      </div>
    </div>
  );
}
