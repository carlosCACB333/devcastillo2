import { appLocale } from '../_config/app';

export function formatDate(date: string) {
  if (!date.includes('T')) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString(appLocale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return fullDate;
}
