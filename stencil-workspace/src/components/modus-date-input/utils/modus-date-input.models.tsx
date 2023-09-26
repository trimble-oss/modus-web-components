export type ModusDateInputType = 'start' | 'end' | 'single';

export interface ModusDateInputEventDetails {
  value: string;
  type: ModusDateInputType;
  inputString: string;
}

export interface ModusDateInputCalendarIconClickedEvent extends ModusDateInputEventDetails{
  min?: Date;
  max?: Date;
  minMessage?: string;
  maxMessage?: string;
}
