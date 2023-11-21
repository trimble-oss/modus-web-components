import { Row } from '@tanstack/table-core';
import { ModusTableRowAction } from './modus-table.models';
import Position from './position.model';

export interface TableRowActionsMenuEvent {
  componentId: string;
  actions: ModusTableRowAction[];
  position: Position;
  row: Row<unknown>;
  onClose: () => void;
}

export type TableRowActionWithOverflow = ModusTableRowAction & {
  isOverflow?: boolean;
};
