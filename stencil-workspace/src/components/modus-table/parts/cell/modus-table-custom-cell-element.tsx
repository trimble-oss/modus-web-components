import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableCustomCell } from '../../models/modus-table.models';

interface ModusTableCustomCellProps {
  customElement: ModusTableCustomCell;
}

export const ModusTableCustomCellElement: FunctionalComponent<ModusTableCustomCellProps> = ({ customElement }) => {
  return <div class="cell-custom" innerHTML={customElement.toString()}></div>;
};
