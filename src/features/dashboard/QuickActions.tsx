import Icon from '../../components/ui/Icon';
import { QUICK_ACTIONS } from '../../data/demoData';
import type { ModuleId } from '../../types';

interface QuickActionsProps {
  onNavigate: (id: ModuleId) => void;
}

export default function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <section className="panel" aria-labelledby="quick-actions-title">
      <div className="panel__header">
        <h2 id="quick-actions-title" className="panel__title">
          Quick actions
        </h2>
      </div>
      <ul className="quick-actions">
        {QUICK_ACTIONS.map((action) => (
          <li key={action.id}>
            <button
              type="button"
              className="quick-action"
              onClick={() => onNavigate(action.target)}
            >
              <span className="quick-action__icon">
                <Icon name={action.icon} />
              </span>
              <span className="quick-action__text">
                <span className="quick-action__label">{action.label}</span>
                <span className="quick-action__description">{action.description}</span>
              </span>
              <Icon name="arrowRight" size={16} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
