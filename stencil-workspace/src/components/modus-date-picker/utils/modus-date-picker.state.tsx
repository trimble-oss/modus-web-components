import { ISO_DATE_FORMAT } from '../../modus-date-input/utils/modus-date-input.formatter';
import { pad } from '../../modus-date-input/utils/modus-date-input.tokens';

export default class ModusDatePickerState {
  private element: HTMLModusDateInputElement;
  private date: Date | null;
  private isOpen = false;
  /** Min and Max dates for the date picker */
  private max: Date;
  private min: Date;

  constructor(el: HTMLModusDateInputElement) {
    this.element = el;
    this.element.showCalendarIcon = this.element.showCalendarIcon?.toString().toUpperCase() !== 'FALSE';
    this.max = this.parseDate(this.element.max);
    this.min = this.parseDate(this.element.min);
    this.refresh();
  }

  getDate(): Date | null {
    return this.date;
  }

  getMaxDateAllowed(): Date {
    return this.max;
  }

  getMinDateAllowed(): Date {
    return this.min;
  }

  setDate(val: Date): void {
    // Converting to ISO8601 'yyyy-mm-dd' format
    if (Number(val)) {
      const year = val.getFullYear();
      const month = pad(val.getMonth() + 1); // Zero based number system for months
      const date = pad(val.getDate());

      this.element.value = `${year}-${month}-${date}`;
      this.element.focusInput();
      this.element.validate();
      this.date = val;
    }
  }

  setError(message: string = null): void {
    this.element.errorText = message;
  }

  resetError(): void {
    this.element.errorText = null;
    this.element.validate();
  }

  refresh(): void {
    this.date = this.parseDate(this.element.value);
  }

  parseDate(date: string): Date | null {
    if (!date) {
      return null;
    }

    // Note: Modus Date Input component's value is always in 'yyyy-mm-dd' format
    const dateISORegex = new RegExp(ISO_DATE_FORMAT);
    const parse = dateISORegex.exec(date);

    if (parse) {
      // first element returns the whole date string
      parse.shift();

      return new Date(
        parseFloat(parse[0]),
        parseFloat(parse[1]) - 1, // Zero based number system for months
        parseFloat(parse[2]),
        0,
        0,
        0,
        0
      );
    }

    return null;
  }

  toggleCalendar(val: boolean = null): void {
    this.isOpen = val !== null ? val : !this.isOpen;
  }

  isCalendarOpen(): boolean {
    return this.isOpen;
  }
}
