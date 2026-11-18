import type { IconName, Tone } from '../../types';
import { formatPercent } from '../../utils/format';
import Icon from './Icon';

interface StatCardProps {
  label: string;
  value: string;
  icon: IconName;
  tone: Tone;
  changePercent: number;
  comparisonLabel: string;
}

export default function StatCard({
  label,
  value,
  icon,
  tone,
  changePercent,
  comparisonLabel,
}: StatCardProps) {
  const isPositive = changePercent >= 0;

  return (
    <article className="stat-card">
      <div className="stat-card__top">
        <h3 className="stat-card__label">{label}</h3>
        <span className={`stat-card__icon stat-card__icon--${tone}`}>
          <Icon name={icon} size={20} />
        </span>
      </div>
      <p className="stat-card__value">{value}</p>
      <p
        className={`stat-card__change ${
          isPositive ? 'stat-card__change--up' : 'stat-card__change--down'
        }`}
      >
        <Icon name={isPositive ? 'trendUp' : 'trendDown'} size={14} />
        <span>
          <span className="visually-hidden">{isPositive ? 'Up ' : 'Down '}</span>
          {formatPercent(changePercent)}
        </span>
        <span className="stat-card__comparison">{comparisonLabel}</span>
      </p>
    </article>
  );
}
