export type ModusDateInputType = 'start' | 'end' | 'single';

export interface ModusDateInputEventDetails {
  value: string;
  type: ModusDateInputType;
  inputString: string;
}
