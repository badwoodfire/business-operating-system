import type { BadgeTone } from '../components/ui/Badge';
import type { PaymentStatus } from '../types';

export const PAYMENT_STATUS_META: Record<
  PaymentStatus,
  { label: string; tone: BadgeTone }
> = {
  received: { label: 'Received', tone: 'success' },
  pending: { label: 'Pending', tone: 'warning' },
  overdue: { label: 'Overdue', tone: 'danger' },
};
