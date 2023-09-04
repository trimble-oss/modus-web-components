import Position from './position.model';

export default interface ColumnDragState {
  draggedColumnId: string;
  dragContent: HTMLElement;
  dropColumnId?: string;
  translation?: Position;
  width?: string;
  height?: string;
  mouseInteracted: boolean;
  dropIndicator?: Position;
}
