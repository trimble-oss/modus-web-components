// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusTableCellBadge } from '../modus-table.models';

interface Props {
  badge: ModusTableCellBadge;
}

export const ModusTableCellBadgePart: FunctionalComponent<Props> = (props: Props) => {
  return (
    <div class="cell-badge">
      <modus-badge color={props.badge.color} type={props.badge.type}>
        {props.badge.text}
      </modus-badge>
    </div>
  );
};
