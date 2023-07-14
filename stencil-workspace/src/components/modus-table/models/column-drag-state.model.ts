import { DragPosition } from './drag-position.model';

export interface ColumnDragState {
  draggedColumnId: string;
  dragContent: HTMLElement;
  targetId?: string;
  translation?: DragPosition;
  width?: string;
  height?: string;
  throughMouse: boolean
}
