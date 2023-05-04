import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Column } from '@tanstack/table-core';

interface ModusDataTableColumnResizingHandlerProps {
  column: Column<unknown, unknown>;
  getResizeHandler: () => ((event: unknown) => void);
}

export const ModusDataTableColumnResizingHandler: FunctionalComponent<
  ModusDataTableColumnResizingHandlerProps
> = ({column, getResizeHandler}) => {
  return (
    <div
      tabindex={`${column.getCanResize() ? 0 : -1}`}
      onMouseDown={getResizeHandler()}
      onTouchStart={getResizeHandler()}
      class={`${column.getCanResize() ? 'can-resize' : ''}`}></div>
  );
};
