// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FunctionalComponent, h } from '@stencil/core';
import { TreeViewItemDragState } from './modus-content-tree.types';
import { TREE_ITEM_SIZE_CLASS } from './modus-content-tree.constants';

export const ModusContentTreeDragItem: FunctionalComponent<{ draggingState: TreeViewItemDragState; size?: string }> = ({
  draggingState,
  size,
}) => {
  if (!draggingState) return null;

  const { width, translation, dragContent, validTarget, targetId } = draggingState;
  const dragContainerStyle = {
    width: width,
    transform: `translate(calc(${translation.x}px - 10%), calc(${translation.y}px - 50%))`,
    msTransform: `translateX(${translation.x}px) translateX(-10%) translateY(${translation.y}px) translateY(-50%)`,
  };
  const sizeClass = `${TREE_ITEM_SIZE_CLASS.get(size || 'standard')}`;
  const className = `drag-content${targetId && !validTarget ? ' drop-block' : ' drop-allow'} ${sizeClass}`;

  return <div style={{ ...dragContainerStyle }} ref={(el) => el && el.appendChild(dragContent)} class={className}></div>;
};
