import { ISO_DATE_FORMAT } from '../../modus-date-input/utils/modus-date-input.formatter';

export default class ModusDatePickerState {
  private element: HTMLModusDateInputElement;
  private date: Date | null;
  private isOpen = false;

  constructor(el: HTMLModusDateInputElement) {
    this.element = el;
    this.element.showCalendarIcon = this.element.showCalendarIcon?.toString().toUpperCase() !== 'FALSE' ? true : false;
    this.refresh();
  }

  getDate(): Date | null {
    return this.date;
  }

  setDate(val: Date): void {
    // Converting to ISO8601 'yyyy-mm-dd' format
    if (Number(val)) {
      const year = val.getFullYear();
      const month = val.getMonth() + 1; // Zero based number system for months
      const date = val.getDate();

      this.element.value = `${year}-${month}-${date}`;
      this.element.focusInput();
      this.date = val;
    }
  }

  setError(message: string = null): void {
    this.element.errorText = message;
  }

  resetError(): void {
    this.element.errorText = null;
  }

  refresh(): void {
    // Note: Modus Date Input component's value is always in 'yyyy-mm-dd' format
    const dateISORegex = new RegExp(ISO_DATE_FORMAT);
    const parse = dateISORegex.exec(this.element.value);

    if (parse) {
      // first element returns the whole date string
      parse.shift();

      this.date = new Date(
        parseFloat(parse[0]),
        parseFloat(parse[1]) - 1, // Zero based number system for months
        parseFloat(parse[2]),
        0,
        0,
        0,
        0
      );
    } else this.date = null;
  }

  toggleCalendar(val: boolean = null): void {
    this.isOpen = val !== null ? val : !this.isOpen;
  }

  isCalendarOpen(): boolean {
    return this.isOpen;
  }
}
