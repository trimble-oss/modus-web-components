import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableBadge } from '../../models';

interface Props {
  badge: ModusTableBadge;
}

export const ModusTableCellBadge: FunctionalComponent<Props> = ({ badge }) => {
  return (
    <div class="cell-badge">
      <modus-badge color={badge?.color} type={badge?.type}>
        {badge?.text}
      </modus-badge>
    </div>
  );
};
