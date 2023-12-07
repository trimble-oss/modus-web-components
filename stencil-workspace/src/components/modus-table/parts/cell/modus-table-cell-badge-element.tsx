import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableCellBadge } from '../../models/modus-table.models';

interface ModusTableCellBadgeProps {
  badge: ModusTableCellBadge;
  onBadgeClick?: (badge: ModusTableCellBadge) => void;
}

export const ModusTableCellBadgeElement: FunctionalComponent<ModusTableCellBadgeProps> = ({ badge }) => {
  return (
    <div class="cell-badge">
      <modus-badge
        tabIndex={0}
        color={badge.color}
        size={badge.size}
        type={badge.type}
        ariaLabel={badge?.ariaLabel}
        >
        {badge.text}
      </modus-badge>
  </div>
  );
};