import dayjs, { Dayjs } from 'dayjs';
const localeData = require('dayjs/plugin/localeData');
import utc from 'dayjs/plugin/utc';
import { CurDateType } from './type';
dayjs.extend(localeData);
dayjs.extend(utc);

/** 是否是同一个月 */
export function sameMonth(a: Dayjs, b: Dayjs) {
  return a instanceof dayjs && b instanceof dayjs && a.year() === b.year() && a.month() === b.month();
}

/** 是否是同一天 */
export function sameDate(a: Dayjs, b: Dayjs) {
  return (
    a instanceof dayjs &&
    b instanceof dayjs &&
    a.year() === b.year() &&
    a.month() === b.month() &&
    a.date() === b.date()
  );
}

/** 晚于 */
export function isGTE(a: CurDateType, b: CurDateType) {
  return dayjs(a).diff(b, 'day') > -1;
}

/** 早于 */
export function isLTE(a: CurDateType, b: CurDateType) {
  return dayjs(b).diff(a, 'day') > -1;
}

/** 从a日期到b日期之间的天数 */
export function fromTo(a: Dayjs, b: Dayjs) {
  const days = [];
  let from = a;

  while (b.diff(from, 'day') > -1) {
    days.push(from);
    from = from.add(1, 'day');
  }
  return days;
}

/** 计算该月份的天数 */
export function month(date: Dayjs) {
  const year = date.year(),
    month = date.month();
  const days = new Date(year, month + 1, 0).getDate(); // 这个月一共几天

  const firstDay = dayjs(new Date(year, month, 1, 0, 0, 0));
  const lastDay = dayjs(new Date(year, month, days, 0, 0, 0));

  return fromTo(firstDay, lastDay);
}

export function page(date: Dayjs, firstDayOfWeek = 0, showSixWeeks = false) {
  const days = month(date);
  let before: Dayjs[] = [],
    after: Dayjs[] = [];

  const fdow = (7 + firstDayOfWeek) % 7 || 7; // 一周以周日开头：7
  const ldow = (fdow + 6) % 7; // 一周以周六结尾：6

  let from = days[0];
  const daysBefore = from.day(); // 这个月的第一天应该是周几
  if (daysBefore !== fdow) {
    from = from.add(-(daysBefore + 7 - fdow) % 7, 'day'); // 那这个月的周日开始应该是几号
  }

  let to = days[days.length - 1];
  const day = to.day(); // 最后一天是周几
  if (day !== ldow) {
    to = to.add((ldow + 7 - day) % 7, 'day'); // 这个月的周六结束应该是几号
  }

  const daysForSixWeeks = (daysBefore + days.length) / 6 >= 6;
  if (showSixWeeks && !daysForSixWeeks) {
    to = to.add(7, 'day');
  }

  if (isLTE(from, days[0])) {
    before = fromTo(from, days[0]);
  }

  if (isGTE(to, days[days.length - 1])) {
    after = fromTo(days[days.length - 1], to);
  }

  return before.concat(days.slice(1, days.length - 1), after);
}

export function dateFormat(date?: Dayjs, format = 'YYYY-MM-DD') {
  if (!date) return '';
  return date.format(format);
}

export function dayjsToData(date: Dayjs) {
  const dateString = dateFormat(date);
  return {
    year: date.year(),
    month: date.month() + 1,
    day: date.date(),
    timestamp: date.valueOf(),
    dateString: dateString,
  };
}
