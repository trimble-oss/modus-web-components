import { ModusDateInputCustomEvent } from '../../../components';

export type DateInputType = 'start' | 'end' | 'single';

export type DateInputEventData = {
  date: Date;
  type: DateInputType;
};

export type DateInputEvent = ModusDateInputCustomEvent<DateInputEventData>;
