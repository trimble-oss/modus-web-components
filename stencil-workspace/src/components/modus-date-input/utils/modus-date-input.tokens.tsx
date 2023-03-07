export type token = 'm' | 'mm' | 'd' | 'dd' | 'yy' | 'yyyy';
export type tokenType = 'month' | 'date' | 'year';

type tokens = { [k in token]: { regex: string; type: tokenType } };
type formats = { [k in token]: (val: number, addValue?: number) => string };

function pad(val: number): string {
  if (val < 10) return `0${val}`;
  return val.toString();
}

export const Tokens: tokens = {
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
