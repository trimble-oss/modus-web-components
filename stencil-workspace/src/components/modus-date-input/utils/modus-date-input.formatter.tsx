import { TokenFormatting, token, Tokens, tokenType, TokenParser } from './modus-date-input.tokens';

export const ISO_DATE_FORMAT = /^(\d{4})-(1[0-2]|0?[1-9])-(3[01]|0?[1-9]|[12][0-9])$/;

type dateTokens = Map<tokenType, { index: number; tokenString: token }>;
type tokenSeparators = Map<number, string>;

export default class DateInputFormatter {
  private _dateTokens: dateTokens; //ex: {'month':{index: 0, tokenString: 'mm'}}
  private _dateRegExp: string;
  private _displayFormat: string;
  private _fillerDate: Date;
  private _tokenSeparators: tokenSeparators; // ex: {2: '-', 5; '-'}

  constructor(fillerDateString: string, format: string) {
    const [regex, tokens, separators] = this.buildRegexAndTokens(format);
    if (regex && tokens) {
      this._dateRegExp = regex;
      this._dateTokens = tokens;
      this._displayFormat = format;
      this._tokenSeparators = separators;
    }
    this._fillerDate = this.getFillerDate(fillerDateString);
  }

  /**
   * Note: Auto formatting is not used yet due to the challenges in handling formats like 'm' and 'd' where the user can input single or double-digit
   */
  autoFormatInput(val: string, autoFormat: boolean) {
    if (!val || !autoFormat) return val;

    const separator = this._tokenSeparators.get(val.length);
    if (separator) {
      return val + separator;
    }
    return val;
  }

  /**
   * Build a regular expression from the date format
   * Returns an array of regular expression, date tokens, token separators
   */
  buildRegexAndTokens(format: string): [string, dateTokens, tokenSeparators] {
    const dtTokens: dateTokens = new Map();
    const regexParts = [];
    const separators: tokenSeparators = new Map();

    for (let i = 0; i < format.length; i++) {
      let token = format[i];
      const tokens = [token];

      while (format[i + 1] === token) {
        tokens.push(token);
        ++i;
      }

      const validToken = tokens.join('') as token;
      const tokenInfo = Tokens[validToken];
      if (tokenInfo && tokenInfo.regex) {
        dtTokens.set(tokenInfo.type, {
          index: dtTokens.size,
          tokenString: validToken,
        });
        token = tokenInfo.regex;
      } else {
        separators.set(i, token);
      }

      regexParts.push(token);
    }

    return [`^${regexParts.join('')}$`, dtTokens, separators];
  }

  /** Format value in ISO 8601 date format to the display format */
  formatDisplayString(val: string): string | null {
    const regex = new RegExp(ISO_DATE_FORMAT);
    const parse = regex.exec(val);
    if (parse) {
      parse.shift();

      const parts: { [key in tokenType]: number } = {
        year: parseFloat(parse[0]),
        month: parseFloat(parse[1]),
        date: parseFloat(parse[2]),
      };

      let output = this._displayFormat;
      this._dateTokens.forEach(({ tokenString }, key) => {
        const formatting = TokenFormatting[tokenString];
        output = output.replace(tokenString, formatting(parts[key], key === 'year' ? this._fillerDate.getFullYear() : null));
      });

      return output;
    }

    return null;
  }

  /** Parse display string to ISO 8601 date format YYYY-MM-DD */
  parseDisplayString(val: string): string | null {
    if (this._dateRegExp && val) {
      const regexObj = new RegExp(this._dateRegExp, 'i');
      const output = regexObj.exec(val);
      if (output) {
        // parsed[0] always contains the whole string
        output.shift();
        const monthToken = this._dateTokens.get('month');
        const dateToken = this._dateTokens.get('date');
        const yearToken = this._dateTokens.get('year');

        const month = monthToken
          ? TokenParser[monthToken.tokenString](output[monthToken.index])
          : this._fillerDate.getMonth() + 1;

        const date = dateToken ? TokenParser[dateToken.tokenString](output[dateToken.index]) : this._fillerDate.getDate();

        const year = yearToken
          ? TokenParser[yearToken.tokenString](output[yearToken.index])
          : this._fillerDate.getFullYear();

        const isoDateString = `${TokenFormatting.yyyy(year, this._fillerDate.getFullYear())}-${TokenFormatting.mm(
          month
        )}-${TokenFormatting.dd(date)}`;

        return Date.parse(isoDateString) ? isoDateString : null;
      }
    }
    return null;
  }

  /**
   * Filler date is used as fillers for parts not in the display format when constructing a full date string,
   * ex: 'yyyy-mm' format doesn't have a date part, hence the date is picked from filler  */
  getFillerDate(val: string): Date {
    const regex = new RegExp(ISO_DATE_FORMAT);
    const parse = regex.exec(val);
    if (parse) {
      parse.shift();
      return new Date(parseFloat(parse[0]), parseFloat(parse[1]), parseFloat(parse[2]), 0, 0, 0, 0);
    } else {
      return new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0);
    }
  }
}
