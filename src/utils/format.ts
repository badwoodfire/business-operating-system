import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../config/app';

export function formatCurrency(
  amount: number,
  currency: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number, locale: string = DEFAULT_LOCALE): string {
  return new Intl.NumberFormat(locale).format(value);
}

/** Formats a signed percentage, e.g. 12.4 -> "+12.4%", -3 -> "-3.0%". */
export function formatPercent(value: number): string {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toFixed(1)}%`;
}

/** Formats a YYYY-MM-DD string as e.g. "14 Nov". */
export function formatShortDate(isoDate: string, locale: string = 'en-GB'): string {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
}
