import {
  ColumnSizingState,
  ColumnSizingInfoState,
  ExpandedState,
  PaginationState,
  VisibilityState,
  RowSelectionState,
  Row,
} from '@tanstack/table-core';
import { ModusTableSortingState } from './modus-table.models';
import Position from './position.model';

type TableState = {
  columnSizing?: ColumnSizingState; // ColumnSizing has info about width of the column
  columnSizingInfo?: ColumnSizingInfoState; // ColumnSizingInfo has the detailed info about resizing of the column
  expanded?: ExpandedState;
  sorting?: ModusTableSortingState;
  pagination?: PaginationState;
  columnVisibility?: VisibilityState;
  columnOrder?: string[];
  rowSelection?: RowSelectionState;
  rowActionsOverflow?: {
    position: Position;
    row: Row<unknown>;
    onClose: () => void;
  };
};

export default TableState;
