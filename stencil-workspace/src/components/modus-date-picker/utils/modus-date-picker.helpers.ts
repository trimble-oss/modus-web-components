export const DateValidationPattern = /^\d{1,2}\/\d{1,2}(\/\d{4,4})?$/;

export function parseDate(val: string): Date | null {
  let output: Date = null;
  if (DateValidationPattern.test(val)) {
    const date = new Date(val);
    if (Number(date)) {
      output = date;
    }
  }

  return output;
}

export function parseString(val: Date): string {
  return val.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function isDateEmpty(val:string): boolean{
  return !val?.trim().length ;
}
