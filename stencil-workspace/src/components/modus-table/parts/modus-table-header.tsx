import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { HeaderGroup } from '@tanstack/table-core';
import { ModusTableColumnHeader } from './columnHeader/modus-table-column-header';
import { ModusTableHeaderCheckbox } from './row/selection/modus-table-header-checkbox';
import TableContext from '../models/table-context.model';

interface ModusTableHeaderProps {
  context: TableContext;
  onDragStart: (
    event: MouseEvent | KeyboardEvent,
    id: string,
    elementRef: HTMLTableCellElement,
    mouseInteracted: boolean
  ) => void;
  getColumnResizing: () => boolean;
  setColumnResizing: (val: boolean) => void;
}

export const ModusTableHeader: FunctionalComponent<ModusTableHeaderProps> = ({
  context,
  onDragStart,
  getColumnResizing,
  setColumnResizing,
}) => {
  const {
    tableInstance: { getHeaderGroups },
    columnReorder,
    rowSelection,
    componentId,
  } = context;

  const tableHeadClass = { 'show-resize-cursor': getColumnResizing(), 'show-column-reorder-cursor': columnReorder };
  const headerGroups: HeaderGroup<unknown>[] = getHeaderGroups();

  return (
    <thead class={tableHeadClass}>
      {headerGroups?.map((headerGroup, index) => (
        <tr key={headerGroup.id}>
          {rowSelection && <ModusTableHeaderCheckbox context={context}></ModusTableHeaderCheckbox>}
          {headerGroup.headers?.map((header) => {
            const id = `${componentId}-${header.id}`;
            return (
              <ModusTableColumnHeader
                id={id}
                context={context}
                header={header}
                isNestedParentHeader={index < headerGroups.length - 1}
                onDragStart={onDragStart}
                onMouseEnterResize={() => setColumnResizing(true)}
                onMouseLeaveResize={() => setColumnResizing(false)}
              />
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
