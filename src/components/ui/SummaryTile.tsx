import type { BadgeTone } from './Badge';

interface SummaryTileProps {
  label: string;
  value: string;
  hint?: string;
  tone?: BadgeTone;
}

export default function SummaryTile({
  label,
  value,
  hint,
  tone = 'neutral',
}: SummaryTileProps) {
  return (
    <article className={`summary-tile summary-tile--${tone}`}>
      <h3 className="summary-tile__label">{label}</h3>
      <p className="summary-tile__value">{value}</p>
      {hint ? <p className="summary-tile__hint">{hint}</p> : null}
    </article>
  );
}
