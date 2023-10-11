import {
  ColumnSizingState,
  ColumnSizingInfoState,
  ExpandedState,
  PaginationState,
  VisibilityState,
  RowSelectionState,
} from '@tanstack/table-core';
import { ModusTableSortingState } from './modus-table.models';

type ModusTableState = {
  columnSizing?: ColumnSizingState; // ColumnSizing has info about width of the column
  columnSizingInfo?: ColumnSizingInfoState; // ColumnSizingInfo has the detailed info about resizing of the column
  expanded?: ExpandedState;
  sorting?: ModusTableSortingState;
  pagination?: PaginationState;
  columnVisibility?: VisibilityState;
  columnOrder?: string[];
  rowSelection?: RowSelectionState;
};

export default ModusTableState;
