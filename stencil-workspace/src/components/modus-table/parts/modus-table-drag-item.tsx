import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ColumnDragState } from '../models/column-drag-state.model';

export const ModusTableDragItem: FunctionalComponent<{
  draggingState: ColumnDragState;
}> = ({ draggingState }) => {
  if (!draggingState) return null;

  const { width, height, translation, dragContent } = draggingState;
  const dragContainerStyle = {
    width,
    height,
    transform: `translate(calc(${translation.x - 50}px - 10%), calc(${translation.y}px - 50%))`,
    msTransform: `translateX(${translation.x - 50}px) translateX(-10%) translateY(${translation.y}px) translateY(-50%)`,
  };

  return <div style={{ ...dragContainerStyle }} ref={(el) => el && el.appendChild(dragContent)} class="drag-content"></div>;
};
