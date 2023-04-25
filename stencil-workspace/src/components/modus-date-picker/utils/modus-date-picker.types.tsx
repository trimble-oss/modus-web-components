import { ModusDateInputCustomEvent } from '../../../components';

export type DateInputType = 'start' | 'end' | 'single';

export type DateInputEventData = {
  value: string;
  type: DateInputType;
  inputString: string;
};

export type DateInputEvent = ModusDateInputCustomEvent<DateInputEventData>;
