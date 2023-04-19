import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Header } from '@tanstack/table-core';

interface ModusDataTableColumnResizingHandlerProps {
  header: Header<unknown, unknown>;
}

export const ModusDataTableColumnResizingHandler: FunctionalComponent<
  ModusDataTableColumnResizingHandlerProps
> = (props: ModusDataTableColumnResizingHandlerProps) => {
  return (
    <div
      tabindex={`${props.header.column.getCanResize() ? 0 : -1}`}
      onMouseDown={props.header.getResizeHandler()}
      onTouchStart={props.header.getResizeHandler()}
      class={`${props.header.column.getCanResize() ? 'resizer' : ''}`}></div>
  );
};
