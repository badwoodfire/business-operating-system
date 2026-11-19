import Icon from '../../components/ui/Icon';
import { QUICK_ACTIONS } from '../../data/demoData';
import { useDemoMode } from '../../hooks/useDemoMode';
import type { ModuleId } from '../../types';

interface QuickActionsProps {
  onNavigate: (id: ModuleId) => void;
}

export default function QuickActions({ onNavigate }: QuickActionsProps) {
  const { isReadOnly, blockAction } = useDemoMode();

  return (
    <section className="panel" aria-labelledby="quick-actions-title">
      <div className="panel__header">
        <h2 id="quick-actions-title" className="panel__title">
          Quick actions
        </h2>
      </div>
      <ul className="quick-actions">
        {QUICK_ACTIONS.map((action) => {
          // Actions that create data are locked while the app is a read-only demo.
          const isLocked = isReadOnly && action.requiresAccount === true;
          return (
            <li key={action.id}>
              <button
                type="button"
                className={`quick-action ${isLocked ? 'quick-action--locked' : ''}`}
                aria-disabled={isLocked ? true : undefined}
                onClick={() =>
                  isLocked ? blockAction(action.label) : onNavigate(action.target)
                }
              >
                <span className="quick-action__icon">
                  <Icon name={action.icon} />
                </span>
                <span className="quick-action__text">
                  <span className="quick-action__label">{action.label}</span>
                  <span className="quick-action__description">{action.description}</span>
                </span>
                <Icon name={isLocked ? 'lock' : 'arrowRight'} size={16} />
                {isLocked ? (
                  <span className="visually-hidden">(not available in demo)</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
