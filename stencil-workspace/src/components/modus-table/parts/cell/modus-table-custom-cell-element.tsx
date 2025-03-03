import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';

import { Cell } from '@tanstack/table-core';

interface ModusTableCustomCellProps {
  customElement: Cell<unknown, unknown>;
}

export const ModusTableCustomCellElement: FunctionalComponent<ModusTableCustomCellProps> = ({ customElement }) => {
  return <div class="cell-custom"> {<flex-renderer content={customElement.getValue().toString()}></flex-renderer>}</div>;
};
