const TIME_12_HOUR_CLOCK_REGEX = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm])$/;
const TIME_24_HOUR_CLOCK_REGEX = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;

// eslint-disable-next-line no-useless-escape
const TIME_12_HOUR_CLOCK_ALLOWED_CHARS_REGEX = /[0-9APM:\s]+/;
const TIME_24_HOUR_CLOCK_ALLOWED_CHARS_REGEX = /[0-9:]+/;

export function formatTime(val: string, hasAmPm: boolean): string {
  if (!val) return null;

  const parse = executeTimeRegex(val, TIME_24_HOUR_CLOCK_REGEX);
  if (parse) {
    if (hasAmPm) {
      const hours = parseInt(parse[0]);
      const minutes = parseInt(parse[1]);

      return to12HourTimeString(hours, minutes);
    } else return val;
  }

  return null;
}

export function keyIsValidTimeCharacter(
  key: string,
  hasAmPm: boolean
): boolean {
  const allowedKeysRegex = new RegExp(
    hasAmPm
      ? TIME_12_HOUR_CLOCK_ALLOWED_CHARS_REGEX
      : TIME_24_HOUR_CLOCK_ALLOWED_CHARS_REGEX
  );
  if (allowedKeysRegex.test(key)) {
    return true;
  }
  return false;
}

export function parseTime(val: string, hasAmPm: boolean): string {
  if (!val) return null;

  const parse = executeTimeRegex(
    val,
    hasAmPm ? TIME_12_HOUR_CLOCK_REGEX : TIME_24_HOUR_CLOCK_REGEX
  );

  if (parse) {
    if (hasAmPm) {
      const hours = parseInt(parse[0]);
      const minutes = parseInt(parse[1]);
      const ampm = parse[2]?.toUpperCase() as 'AM' | 'PM';

      return from12HourTimeString(hours, minutes, ampm);
    } else {
      return val;
    }
  }

  return null;
}

function executeTimeRegex(val: string, exp: RegExp): string[] | null {
  const timeFormatRegex = new RegExp(exp);
  const parse = timeFormatRegex.exec(val);

  if (parse?.length > 1) {
    parse.shift();
    return parse;
  }
  return null;
}

function from12HourTimeString(
  hours: number,
  minutes: number,
  ampm: string
): string | null {
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
    return `${editedHours}:${minutes}`;

  return null;
}

function to12HourTimeString(hours: number, minutes: number): string | null {
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
    return `${editedHours}:${minutes} ${ampm}`;

  return null;
}
