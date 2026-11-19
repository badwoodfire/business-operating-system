import ActionButton from './ActionButton';

interface RowActionsProps {
  /** What the row is, e.g. "order ORD-1048". Used in labels and explanations. */
  subject: string;
}

/** Edit and delete buttons for a table row (locked in demo mode). */
export default function RowActions({ subject }: RowActionsProps) {
  return (
    <div className="row-actions">
      <ActionButton
        iconOnly
        variant="ghost"
        icon="edit"
        actionLabel={`Edit ${subject}`}
      />
      <ActionButton
        iconOnly
        variant="ghost"
        icon="trash"
        actionLabel={`Delete ${subject}`}
      />
    </div>
  );
}
