import PageHeader from '../../components/ui/PageHeader';
import SamplePanel from '../../components/ui/SamplePanel';
import { PAYMENT_METHOD_LABELS } from '../../config/orders';
import {
  DEMO_BEST_SELLERS,
  DEMO_MONTHLY_SALES,
  DEMO_PAYMENT_SHARES,
} from '../../data/demoReports';
import { formatCurrency, formatNumber } from '../../utils/format';
import BarList from './BarList';
import './reports.css';

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Understand sales trends and what your customers buy."
      />
      <div className="reports-stack">
        <SamplePanel title="Monthly sales" description="Sales over the last six months.">
          <BarList
            items={DEMO_MONTHLY_SALES.map((month) => ({
              id: month.id,
              label: month.label,
              value: month.total,
              display: formatCurrency(month.total),
            }))}
          />
        </SamplePanel>
        <div className="reports-grid">
          <SamplePanel title="Best-selling products" description="Units sold this month.">
            <BarList
              items={DEMO_BEST_SELLERS.map((product) => ({
                id: product.id,
                label: product.name,
                value: product.unitsSold,
                display: `${formatNumber(product.unitsSold)} units`,
              }))}
            />
          </SamplePanel>
          <SamplePanel title="Sales by payment method" description="Share of this month's sales.">
            <BarList
              items={DEMO_PAYMENT_SHARES.map((share) => ({
                id: share.method,
                label: PAYMENT_METHOD_LABELS[share.method],
                value: share.percent,
                display: `${share.percent}%`,
              }))}
            />
          </SamplePanel>
        </div>
      </div>
    </>
  );
}
