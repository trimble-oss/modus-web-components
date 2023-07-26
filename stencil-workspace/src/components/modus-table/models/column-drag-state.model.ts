import Position from "./position.model";

export default interface ColumnDragState {
  draggedColumnId: string;
  dragContent: HTMLElement;
  targetId?: string;
  translation?: Position;
  width?: string;
  height?: string;
  throughMouse: boolean;
  arrowsPosition?: Position;
}
