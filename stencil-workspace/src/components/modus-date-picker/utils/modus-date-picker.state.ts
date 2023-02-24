import { parseDate } from './modus-date-picker.helpers';

export class DateInputInfo {
  private element: HTMLModusDateInputElement;
  private date: Date;
  private isOpen = false;

  constructor(el: HTMLModusDateInputElement) {
    this.element = el;
    this.refresh();
  }

  getDate(): Date {
    return this.date;
  }

  setDate(val: Date): void {
    this.element.setDate(val);
    this.date = val;
  }

  setError(message: string = null): void {
    this.element.errorText = message;
  }

  resetError(): void {
    this.element.errorText = null;
  }

  refresh(): void {
    this.date = parseDate(this.element.value);
  }

  toggleCalendar(val: boolean = null): void {
    this.isOpen = val !== null ? val : !this.isOpen;
  }

  isCalendarOpen(): boolean {
    return this.isOpen;
  }
}
