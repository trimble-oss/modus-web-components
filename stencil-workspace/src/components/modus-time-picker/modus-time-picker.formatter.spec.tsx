import TimeInputFormatter from './modus-time-picker.formatter';

describe('TimeInputFormatter', () => {
  let formatter: TimeInputFormatter;
  beforeEach(() => {
    formatter = new TimeInputFormatter(false);
  });
  describe('parseTimeDisplay', () => {
    describe('hasAmPm is false', () => {
      it('should return null when input is empty', () => {
        const result = formatter.parseTimeDisplay('');
        expect(result).toBeNull();
      });
      it('should return time string when input is valid', () => {
        const result = formatter.parseTimeDisplay('12:30');
        expect(result).toBe('12:30');
      });
      it('should return time string when input is 0:00', () => {
        const result = formatter.parseTimeDisplay('0:00');
        expect(result).toBe('0:00');
      });
      it('should return time string when input is 00:59', () => {
        const result = formatter.parseTimeDisplay('00:59');
        expect(result).toBe('00:59');
      });
      it('should return time string when input is before noon', () => {
        const result = formatter.parseTimeDisplay('11:30');
        expect(result).toBe('11:30');
      });
      it('should return time string when input is 11:59', () => {
        const result = formatter.parseTimeDisplay('11:59');
        expect(result).toBe('11:59');
      });
      it('should return time string when input is noon', () => {
        const result = formatter.parseTimeDisplay('12:00');
        expect(result).toBe('12:00');
      });
      it('should return time string when input is after noon', () => {
        const result = formatter.parseTimeDisplay('13:30');
        expect(result).toBe('13:30');
      });
      it('should return time string when input is 12:59', () => {
        const result = formatter.parseTimeDisplay('12:59');
        expect(result).toBe('12:59');
      });
      it('should return time string when input is 13:00', () => {
        const result = formatter.parseTimeDisplay('13:00');
        expect(result).toBe('13:00');
      });
      it('should return time string when input is 23:59', () => {
        const result = formatter.parseTimeDisplay('23:59');
        expect(result).toBe('23:59');
      });
    });

    describe('hasAmPm is true', () => {
      beforeEach(() => {
        formatter = new TimeInputFormatter(true);
      });
      it('should return null when input is empty', () => {
        const result = formatter.parseTimeDisplay('');
        expect(result).toBeNull();
      });
      it('should return time string when input is valid', () => {
        const result = formatter.parseTimeDisplay('12:30 PM');
        expect(result).toBe('12:30');
      });
      it('should return time string when input is 12:00 AM', () => {
        const result = formatter.parseTimeDisplay('12:00 AM');
        expect(result).toBe('00:00');
      });
      it('should return time string when input is 12:59 AM', () => {
        const result = formatter.parseTimeDisplay('12:59 AM');
        expect(result).toBe('00:59');
      });
      it('should return time string when input is before noon', () => {
        const result = formatter.parseTimeDisplay('11:30 AM');
        expect(result).toBe('11:30');
      });
      it('should return time string when input is 11:59 AM', () => {
        const result = formatter.parseTimeDisplay('11:59 AM');
        expect(result).toBe('11:59');
      });
      it('should return time string when input is noon', () => {
        const result = formatter.parseTimeDisplay('12:00 PM');
        expect(result).toBe('12:00');
      });
      it('should return time string when input is after noon', () => {
        const result = formatter.parseTimeDisplay('1:30 PM');
        expect(result).toBe('13:30');
      });
      it('should return time string when input is 12:59 PM', () => {
        const result = formatter.parseTimeDisplay('12:59 PM');
        expect(result).toBe('12:59');
      });
      it('should return time string when input is 1:00 PM', () => {
        const result = formatter.parseTimeDisplay('1:00 PM');
        expect(result).toBe('13:00');
      });
      it('should return time string when input is 11:59 PM', () => {
        const result = formatter.parseTimeDisplay('11:59 PM');
        expect(result).toBe('23:59');
      });
    });
  });
});
