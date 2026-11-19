import type { ReactNode } from 'react';
import { useDemoMode } from '../../hooks/useDemoMode';
import type { IconName } from '../../types';
import Icon from '../ui/Icon';

interface ActionButtonProps {
  /** Short name of the action, e.g. "Add order". Shown in the demo explanation. */
  actionLabel: string;
  /** Button text. Defaults to `actionLabel`. Ignored when `iconOnly` is set. */
  children?: ReactNode;
  icon?: IconName;
  variant?: 'primary' | 'secondary' | 'ghost';
  /** Show only the icon; `actionLabel` becomes the accessible name. */
  iconOnly?: boolean;
  /** Runs when the action is allowed. Never runs while the app is read-only. */
  onClick?: () => void;
}

/**
 * The one button used for every action that creates, edits or deletes data.
 *
 * In demo mode it looks disabled but stays focusable and clickable (a real
 * `disabled` button swallows clicks), and clicking it explains that full
 * access needs an account instead of doing anything. The `onClick` handler is
 * deliberately never called while read-only, so demo data cannot change.
 */
export default function ActionButton({
  actionLabel,
  children,
  icon,
  variant = 'primary',
  iconOnly = false,
  onClick,
}: ActionButtonProps) {
  const { isReadOnly, blockAction } = useDemoMode();

  const handleClick = () => {
    if (isReadOnly) {
      blockAction(actionLabel);
      return;
    }
    onClick?.();
  };

  const classes = [
    'btn',
    `btn--${variant}`,
    iconOnly ? 'btn--icon' : '',
    isReadOnly ? 'btn--locked' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const iconName: IconName | undefined = iconOnly
    ? icon
    : isReadOnly
      ? 'lock'
      : icon;

  return (
    <button
      type="button"
      className={classes}
      aria-disabled={isReadOnly ? true : undefined}
      aria-label={
        iconOnly
          ? `${actionLabel}${isReadOnly ? ' (not available in demo)' : ''}`
          : undefined
      }
      title={isReadOnly ? 'Not available in the demo' : undefined}
      onClick={handleClick}
    >
      {iconName ? <Icon name={iconName} size={iconOnly ? 18 : 16} /> : null}
      {iconOnly ? null : (children ?? actionLabel)}
      {!iconOnly && isReadOnly ? (
        <span className="visually-hidden"> (not available in demo)</span>
      ) : null}
    </button>
  );
}
