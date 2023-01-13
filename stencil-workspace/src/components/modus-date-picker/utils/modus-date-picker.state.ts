import { parseDate } from './modus-date-picker.helpers';

export class DateInputInfo {
  private element: HTMLModusDateInputElement;
  private date: Date;
  private isOpen = false;

  constructor(el: HTMLModusDateInputElement) {
    this.element = el;
    this.refresh();
  }

  getDate() {
    return this.date;
  }

  setDate(val: Date) {
    this.element.setDate(val);
    this.date = val;
  }

  setError(message: string = null) {
    this.element.errorText = message;
    this.element.invalid = true;
  }

  resetError() {
    this.element.invalid = null;
    this.element.errorText = null;
  }

  refresh() {
    this.date = parseDate(this.element.value);
  }

  toggleCalendar(val: boolean = null) {
    this.isOpen = val !== null ? val : !this.isOpen;
  }

  isCalendarOpen() {
    return this.isOpen;
  }
}
