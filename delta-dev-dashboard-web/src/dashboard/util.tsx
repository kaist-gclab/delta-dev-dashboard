import moment from 'moment';

export function formatDate(text: Date): string {
  return moment(text).format('YYYY-MM-DD');
}

export function formatDateTime(text: Date): string {
  return moment(text).format('YYYY-MM-DD HH:mm:ss');
}

export function getTotalDays(begin: Date, end: Date): number {
  return moment(end).diff(moment(begin)) / 1000 / 86400;
}

export function sum(numbers: number[]): number {
  return numbers.reduce((prev, current) => prev + current);
}
