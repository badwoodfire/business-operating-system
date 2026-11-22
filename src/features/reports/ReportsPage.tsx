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
        description="Understand sales trends and payment activity in the sample data."
      />
      <div className="reports-stack">
        <SamplePanel
          title="Monthly sales"
          description="November is calculated from the listed sample orders; earlier months are illustrative."
        >
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
          <SamplePanel
            title="Best-selling products"
            description="Product-level sales are not included in the current sample order records."
          >
            {DEMO_BEST_SELLERS.length > 0 ? (
              <BarList
                items={DEMO_BEST_SELLERS.map((product) => ({
                  id: product.id,
                  label: product.name,
                  value: product.unitsSold,
                  display: `${formatNumber(product.unitsSold)} units`,
                }))}
              />
            ) : (
              <p>Not enough product-level order data to calculate best sellers yet.</p>
            )}
          </SamplePanel>
          <SamplePanel title="Sales by payment method" description="Share calculated from the listed payment records.">
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
