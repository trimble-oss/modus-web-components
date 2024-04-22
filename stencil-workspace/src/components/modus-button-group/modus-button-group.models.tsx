import { SINGLE_SELECTION_TYPE, MULTIPLE_SELECTION_TYPE, DEFAULT_SELECTION_TYPE } from './modus-button-group.constants';

export type ButtonGroupSelectionType =
  | typeof SINGLE_SELECTION_TYPE
  | typeof MULTIPLE_SELECTION_TYPE
  | typeof DEFAULT_SELECTION_TYPE;

export interface ModusButtonGroupButtonClickEvent {
  button: HTMLModusButtonElement;
  isSelected: boolean;
}
