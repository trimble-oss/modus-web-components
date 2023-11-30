// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusDataTableCellBadge } from '../modus-data-table.models';
interface Props {
  badge: ModusDataTableCellBadge;
  customClass?: string;
  onBadgeClick?: (badge: ModusDataTableCellBadge) => void;
}

export const ModusDataTableCellBadgePart: FunctionalComponent<Props> = (props: Props) => {
  return (
    <div class="cell-badge">
      <modus-badge
        tabIndex={0}
        color={props.badge.color}
        size={props.badge.size}
        type={props.badge.type}
        ariaLabel={props.badge?.ariaLabel}
        >
        {props.badge.text}
      </modus-badge>
    </div>
  );
};
