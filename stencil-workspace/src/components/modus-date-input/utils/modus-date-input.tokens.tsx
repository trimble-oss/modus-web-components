const monthsFull = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const monthsShort = monthsFull.map((m) => m.substring(0, 3));

export type token = 'm' | 'mm' | 'mmm' | 'mmmm' | 'd' | 'dd' | 'yy' | 'yyyy';
export type tokenType = 'month' | 'date' | 'year';

type tokens = { [k in token]: { regex: string; type: tokenType } };
type formats = { [k in token]: (val: number, defaultValue?: number) => string };
type parsers = { [k in token]: (val: string, defaultValue?: number) => number };

function pad(val: number): string {
  if (val < 10) return `0${val}`;
  return val.toString();
}

//date.toLocaleString('en-US', { month: 'short' })

export const Tokens: tokens = {
  mmmm: { regex: `(${monthsFull.join('|')})`, type: 'month' },
  mmm: { regex: `(${monthsShort.join('|')})`, type: 'month' },
  mm: { regex: '(1[0-2]|0?[1-9])', type: 'month' },
  m: { regex: '(1[0-2]|0?[1-9])', type: 'month' },
  dd: { regex: '(3[01]|0?[1-9]|[12][0-9])', type: 'date' },
  d: { regex: '(3[01]|0?[1-9]|[12][0-9])', type: 'date' },
  yy: { regex: '(\\d{2})', type: 'year' },
  yyyy: { regex: '(\\d{4})', type: 'year' },
};

export const TokenFormatting: formats = {
  m: function (val: number): string {
    return `${val}`;
  },
  mm: function (val: number): string {
    return pad(val);
  },
  mmm: function (val: number): string {
    return monthsShort[val - 1];
  },
  mmmm: function (val: number): string {
    return monthsFull[val - 1];
  },
  d: function (val: number): string {
    return `${val}`;
  },
  dd: function (val: number): string {
    return pad(val);
  },
  yy: function (val: number): string {
    return pad(val).substring(2);
  },
  yyyy: function (val: number, fillerYear: number): string {
    if (val < 100) {
      const fill = fillerYear || new Date().getFullYear();
      return `${String(fill).substring(0, 2)}${pad(val)}`;
    } else return `${val}`;
  },
};

const defaultParser = function (val: string): number {
  return parseFloat(val);
};
export const TokenParser: parsers = {
  m: defaultParser,
  mm: defaultParser,
  mmm: function (val: string): number {
    return monthsShort.findIndex((m) => m.toUpperCase() === val?.toUpperCase()) + 1;
  },
  mmmm: function (val: string): number {
    return monthsFull.findIndex((m) => m.toUpperCase() === val?.toUpperCase()) + 1;
  },
  d: defaultParser,
  dd: defaultParser,
  yy: defaultParser,
  yyyy: defaultParser,
};
