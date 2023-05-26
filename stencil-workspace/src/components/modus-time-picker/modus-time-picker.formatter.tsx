const TIME_12_HOUR_CLOCK_REGEX = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm])$/;
const TIME_24_HOUR_CLOCK_REGEX = /^(2[0-3]|[01]?[0-9]):([0-5][0-9])$/;

// eslint-disable-next-line no-useless-escape
const TIME_12_HOUR_CLOCK_ALLOWED_CHARS_REGEX = /[\d:apm\s]/gi;
const TIME_24_HOUR_CLOCK_ALLOWED_CHARS_REGEX = /[\d:]/gi;

export default class TimeInputFormatter {
  private readonly hasAmPm: boolean = false;

  constructor(hasAmPm: boolean) {
    this.hasAmPm = hasAmPm;
  }

  /** Format time input while typing */
  autoFormatTimeInput(val: string, autoFormat: boolean) {
    if (!val || !autoFormat) return val;

    const format = this.getAutoFormatString();
    let edited = val;
    if (format.length > val.length && format[val.length] !== 'x') {
      edited = val + format[val.length];

      const uppercase = edited.toUpperCase();
      if (uppercase && edited !== uppercase) {
        edited = uppercase;
      }
    }
    return edited;
  }

  /** Convert to display format, 12 hour clock if hasAmPm flag is set */
  formatTimeDisplay(val: string): string | null {
    if (!val) return null;

    const parse = this.processTimeRegex(val, TIME_24_HOUR_CLOCK_REGEX);
    if (parse) {
      if (this.hasAmPm) {
        const hours = parseInt(parse[0]);
        const minutes = parseInt(parse[1]);

        return this.create12HourTimeString(hours, minutes);
      } else {
        return val;
      }
    }

    return null;
  }

  /** Update date object with time part*/
  setTimeOnDate(date: Date = new Date(), val: string): Date | null {
    const edited = new Date(date);
    const parse = this.processTimeRegex(val, TIME_24_HOUR_CLOCK_REGEX);
    if (parse) {
      const hours = parseInt(parse[0]);
      const minutes = parseInt(parse[1]);
      if (hours >= 0 && hours <= 23 && (minutes === 0 || minutes > 0)) {
        edited.setHours(hours, minutes);
      }
    }

    return edited;
  }

  /** Validate key pressed */
  keyIsValidTimeCharacter(key: string, allowedKeysRegexInput: RegExp | string = null): boolean {
    const allowedKeysRegex =
      allowedKeysRegexInput != null
        ? new RegExp(allowedKeysRegexInput)
        : new RegExp(this.hasAmPm ? TIME_12_HOUR_CLOCK_ALLOWED_CHARS_REGEX : TIME_24_HOUR_CLOCK_ALLOWED_CHARS_REGEX);
    if (allowedKeysRegex.test(key)) {
      return true;
    }
    return false;
  }

  /** Parse the display time to standard 24 hour clock */
  parseTimeDisplay(val: string): string | null {
    if (!val) return null;

    const parse = this.processTimeRegex(val, this.hasAmPm ? TIME_12_HOUR_CLOCK_REGEX : TIME_24_HOUR_CLOCK_REGEX);

    if (parse) {
      if (this.hasAmPm) {
        const hours = parseInt(parse[0]);
        const minutes = parseInt(parse[1]);
        const ampm = parse[2]?.toUpperCase() as 'AM' | 'PM';

        return this.create24HourTimeString(hours, minutes, ampm);
      } else {
        return val;
      }
    }

    return null;
  }

  // Local functions
  private create24HourTimeString(hours: number, minutes: number, ampm: string): string | null {
    let editedHours = hours;

    // Subtract 12 hours for 12:00 AM or midnight to 12:59 AM
    if (ampm === 'AM') {
      editedHours = hours - hours === 12 ? 12 : 0;
    }
    // Add 12 hours for 1:00 PM to 11:59 PM
    else if (ampm === 'PM') {
      editedHours = hours + hours !== 12 ? 12 : 0;
    }
    if (editedHours >= 0 && editedHours <= 23 && (minutes === 0 || minutes > 0))
      return `${this.pad(editedHours)}:${this.pad(minutes)}`;

    return null;
  }

  private create12HourTimeString(hours: number, minutes: number): string | null {
    let ampm = 'AM';
    let editedHours = hours;

    if (hours === 0) {
      editedHours = hours + 12;
    } else if (hours === 12) {
      ampm = 'PM';
    } else if (hours > 12) {
      editedHours = hours - 12;
      ampm = 'PM';
    }

    if (editedHours && editedHours <= 12 && (minutes === 0 || minutes > 0))
      return `${this.pad(editedHours)}:${this.pad(minutes)} ${ampm}`;

    return null;
  }

  private getAutoFormatString(): string {
    if (this.hasAmPm) return 'xx:xx xM';
    else return 'xx:xx';
  }

  private processTimeRegex(val: string, exp: RegExp): string[] | null {
    const timeFormatRegex = new RegExp(exp);
    const parse = timeFormatRegex.exec(val);

    if (parse?.length > 1) {
      parse.shift();
      return parse;
    }
    return null;
  }

  private pad(val: number): string {
    if (val < 10) return `0${val}`;
    return val.toString();
  }
}
