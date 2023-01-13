const monthNames = [
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

export default class Calendar {
  private dateBacking: Date;
  private datesBacking: Array<Date>;

  constructor(calendar?: Calendar) {
    if (calendar) {
      this.gotoDate(
        calendar.dateBacking.getFullYear(),
        calendar.dateBacking.getMonth()
      );
    } else {
      const today = new Date();
      this.gotoDate(today.getFullYear(), today.getMonth());
    }
  }

  get year(): string {
    return this.dateBacking.getFullYear().toString();
  }

  get month(): string {
    return monthNames[this.dateBacking.getMonth()];
  }

  get dates(): Array<Date> {
    return this.datesBacking;
  }

  addMonthOffset(offset: number): Calendar {
    this.gotoDate(
      this.dateBacking.getFullYear(),
      this.dateBacking.getMonth() + offset
    );
    return this;
  }

  addYearOffset(offset: number): Calendar {
    this.gotoDate(
      this.dateBacking.getFullYear() + offset,
      this.dateBacking.getMonth()
    );
    return this;
  }

  gotoDate(year: number, month: number): void {
    this.dateBacking = new Date(year, month, 1);
    this.calculateDates();
  }

  getDaysOfWeek (locale: string, firstDayOfWeek = 0)  {
    /**
     * Nov 1st, 2020 starts on a Sunday,
     * assumes weeks start on Sunday,
     * but is configurable via `firstDayOfWeek`.
     */
    const intl = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    const startDate = new Date('11/01/2020');
    const daysOfWeek = [];

    /**
     * For each day of the week,
     * get the day name.
     */
    for (let i = firstDayOfWeek; i < firstDayOfWeek + 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      const d = intl.format(currentDate);
      daysOfWeek.push(d.toUpperCase().startsWith('SA')? d: d.slice(0,2) );
    }

    return daysOfWeek;
  }

  private calculateDates(): void {
    const dates = [];
    const year = this.dateBacking.getFullYear();
    const month = this.dateBacking.getMonth();

    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    this.datesBacking = dates;
  }



}
