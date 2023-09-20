export const SORTED_ASCENDING = 'Sorted Ascending';
export const SORTED_DESCENDING = 'Sorted Descending';
export const SORT_ASCENDING = 'Sort Ascending';
export const SORT_DESCENDING = 'Sort Descending';

export const COLUMN_DEF_DATATYPE_KEY = 'dataType';
export const COLUMN_DEF_CELL_EDITOR_TYPE_KEY = 'cellEditorType';
export const COLUMN_DEF_CELL_EDITOR_ARGS_KEY = 'cellEditorArgs';

export const COLUMN_DEF_SHOWTOTAL = 'showTotal';
export const COLUMN_DEF_ROW_SELECTION_ID = 'row-checkbox';
export const COLUMN_DEF_ROW_SELECTION_CSS = 'row-checkbox';

export const COLUMN_DEF_DATATYPE_TEXT = 'text';
export const COLUMN_DEF_DATATYPE_INTEGER = 'integer';
export const COLUMN_DEF_DATATYPE_LINK = 'link';
export const COLUMN_DEF_DATATYPE_DATE = 'date';

export const CELL_EDIT_TYPE_TEXT = COLUMN_DEF_DATATYPE_TEXT;
export const CELL_EDIT_TYPE_INT = COLUMN_DEF_DATATYPE_INTEGER;
export const CELL_EDIT_TYPE_DROPDOWN = 'dropdown';
export const CELL_EDIT_TYPE_AUTOCOMPLETE = 'autocomplete';
export const CELL_EDIT_TYPE_DATE = COLUMN_DEF_DATATYPE_DATE;

export const ALLOWED_CELL_EDIT_TYPES = [
  CELL_EDIT_TYPE_TEXT,
  CELL_EDIT_TYPE_INT,
  CELL_EDIT_TYPE_DROPDOWN,
  CELL_EDIT_TYPE_AUTOCOMPLETE,
  CELL_EDIT_TYPE_DATE,
];

export const PAGINATION_DEFAULT_SIZES = [10, 20, 30];
export const PAGINATION_PAGEVIEW_TEXT = 'Page View';
export const PAGINATION_SUMMARY_TEXT = 'Showing result';

// Keyboard key constants
export const KEYBOARD_ENTER = 'enter';
export const KEYBOARD_TAB = 'tab';
export const KEYBOARD_LEFT = 'arrowleft';
export const KEYBOARD_RIGHT = 'arrowright';
export const KEYBOARD_UP = 'arrowup';
export const KEYBOARD_DOWN = 'arrowdown';
export const KEYBOARD_SPACE = ' ';
export const KEYBOARD_ESCAPE = 'escape';

export const EXPANDED_STATE_KEY = 'expanded';
export const SORTING_STATE_KEY = 'sorting';
export const ROW_SELECTION_STATE_KEY = 'rowSelection';
export const COLUMN_SIZING_INFO_STATE_KEY = 'columnSizingInfo';
export const PAGINATION_STATE_KEY = 'pagination';
export const COLUMN_SIZING_STATE_KEY = 'columnSizing';
export const COLUMN_VISIBILITY_STATE_KEY = 'columnVisibility';
export const COLUMN_ORDER_STATE_KEY = 'columnOrder';
