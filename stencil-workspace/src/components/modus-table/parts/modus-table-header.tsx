import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { HeaderGroup, Table } from '@tanstack/table-core';
import { ModusTableColumnHeader } from './columnHeader/modus-table-column-header';
import { ModusTableHeaderCheckbox } from './rowSelection/modus-table-header-checkbox';

interface ModusTableHeaderProps {
  columnReorder: boolean;
  frozenColumns: string[];
  multipleRowSelection: boolean;
  rowSelection: boolean;
  showSortIconOnHover: boolean;
  table: Table<unknown>;
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
  columnReorder,
  frozenColumns,
  multipleRowSelection,
  rowSelection,
  showSortIconOnHover,
  table,
  onDragStart,
  getColumnResizing,
  setColumnResizing,
}) => {
  const { getHeaderGroups } = table;
  const tableHeadClass = { 'show-resize-cursor': getColumnResizing(), 'show-column-reorder-cursor': columnReorder };
  const headerGroups: HeaderGroup<unknown>[] = getHeaderGroups();

  return (
    <thead class={tableHeadClass}>
      {headerGroups?.map((headerGroup, index) => (
        <tr key={headerGroup.id}>
          <ModusTableHeaderCheckbox
            rowSelection={rowSelection}
            table={table}
            multipleRowSelection={multipleRowSelection}></ModusTableHeaderCheckbox>

          {headerGroup.headers?.map((header) => {
            return (
              <ModusTableColumnHeader
                table={table}
                header={header}
                isNestedParentHeader={index < headerGroups.length - 1}
                showSortIconOnHover={showSortIconOnHover}
                columnReorder={columnReorder}
                isColumnResizing={getColumnResizing()}
                frozenColumns={frozenColumns}
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
