import StatCard from '../../components/ui/StatCard';
import { DEMO_STATS } from '../../data/demoData';
import { formatCurrency, formatNumber } from '../../utils/format';

export default function StatsGrid() {
  return (
    <section className="stats-grid" aria-label="Key statistics">
      {DEMO_STATS.map((stat) => (
        <StatCard
          key={stat.id}
          label={stat.label}
          value={
            stat.format === 'currency'
              ? formatCurrency(stat.value)
              : formatNumber(stat.value)
          }
          icon={stat.icon}
          tone={stat.tone}
          changePercent={stat.changePercent}
          comparisonLabel={stat.comparisonLabel}
        />
      ))}
    </section>
  );
}
