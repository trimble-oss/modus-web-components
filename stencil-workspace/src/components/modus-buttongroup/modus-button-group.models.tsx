import {
  OUTLINE_STYLE,
  FILL_STYLE,
  PRIMARY_VARIANT,
  SECONDARY_VARIANT,
  SINGLE_SELECT_TYPE,
  DEFAULT_SELECT__TYPE,
  LEFT_BUTTON_POSITION,
  RIGHT_BUTTON_POSITION,
  CENTER_BUTTON_POSITION,
} from './modus-button-group.constants';

export type ButtonGroupStyle = typeof OUTLINE_STYLE | typeof FILL_STYLE;
export type ButtonGroupVariant = typeof PRIMARY_VARIANT | typeof SECONDARY_VARIANT;
export type ButtonGroupSelectionType = typeof SINGLE_SELECT_TYPE | typeof DEFAULT_SELECT__TYPE;
export type ButtonGroupButtonPosition =
  | typeof LEFT_BUTTON_POSITION
  | typeof RIGHT_BUTTON_POSITION
  | typeof CENTER_BUTTON_POSITION;
