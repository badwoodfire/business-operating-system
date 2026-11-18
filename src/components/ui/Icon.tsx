import type { IconName } from '../../types';

/** Simple 24x24 stroke icons, kept inline so the app needs no icon library. */
const ICON_PATHS: Record<IconName, string> = {
  dashboard: 'M3 3h7v9H3z M14 3h7v5h-7z M14 12h7v9h-7z M3 16h7v5H3z',
  orders:
    'M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0',
  inventory: 'M21 16V8l-9-5-9 5v8l9 5z M3.3 7 12 12l8.7-5 M12 22V12',
  customers:
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  payments:
    'M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M1 10h22',
  expenses: 'M5 2h14v20l-3.5-2-3.5 2-3.5-2L5 22z M9 7h6 M9 11h6 M9 15h4',
  reports: 'M18 20V10 M12 20V4 M6 20v-6',
  settings:
    'M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6',
  sales: 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  plus: 'M12 5v14 M5 12h14',
  userPlus:
    'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M20 8v6 M23 11h-6',
  menu: 'M3 12h18 M3 6h18 M3 18h18',
  close: 'M18 6 6 18 M6 6l12 12',
  trendUp: 'M23 6l-9.5 9.5-5-5L1 18 M17 6h6v6',
  trendDown: 'M23 18l-9.5-9.5-5 5L1 6 M17 18h6v-6',
  arrowRight: 'M5 12h14 M12 5l7 7-7 7',
};

interface IconProps {
  name: IconName;
  size?: number;
}

export default function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
