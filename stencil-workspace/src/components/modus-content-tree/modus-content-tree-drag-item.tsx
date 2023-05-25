// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { TreeViewItemDragState } from './modus-content-tree.types';

export const ModusContentTreeDragItem: FunctionalComponent<{ draggingState: TreeViewItemDragState }> = ({
  draggingState,
}) => {
  if (!draggingState) return null;

  const { width, height, translation, dragContent, validTarget, targetId } = draggingState;
  const dragContainerStyle = {
    width: width,
    height: height,
    transform: `translate(calc(${translation.x}px - 10%), calc(${translation.y}px - 50%))`,
    msTransform: `translateX(${translation.x}px) translateX(-10%) translateY(${translation.y}px) translateY(-50%)`,
  };
  const className = `drag-content${targetId && !validTarget ? ' drop-block' : ' drop-allow'}`;

  return <div style={{ ...dragContainerStyle }} ref={(el) => el && el.appendChild(dragContent)} class={className}></div>;
};
