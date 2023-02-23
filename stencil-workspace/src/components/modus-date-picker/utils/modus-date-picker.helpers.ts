

export const EmptyStringPattern = /^\s*$/;
export const DateValidationPattern = /^\d{1,2}\/\d{1,2}(\/\d{4,4})?$/;

export function parseDate(val: string): Date {
  let output = null;
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

export function validateDate(val:string, errorIfEmpty = false):string{
  let error = 'Invalid date';
  if (!val || EmptyStringPattern.test(val)) {
    error = errorIfEmpty ? 'Required' : null;
  } else if (DateValidationPattern.test(val)) {
    const date = parseDate(val);
    if (Number(date)) {
      error = null;
    }
  }

  return error;
}

export function isDateEmpty(val:string):boolean{
  return !val || EmptyStringPattern.test(val);
}
