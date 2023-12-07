// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusDataTableCellBadge } from '../modus-data-table.models';
interface Props {
  badge: ModusDataTableCellBadge;
}

export const ModusDataTableCellBadgePart: FunctionalComponent<Props> = (props: Props) => {
  return (
    <div class="cell-badge">
      <modus-badge color={props.badge.color} type={props.badge.type}>
        {props.badge.text}
      </modus-badge>
    </div>
  );
};
