import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableCellBadge } from '../../models/modus-table.models';
import { KEYBOARD_ENTER, KEYBOARD_SPACE } from '../../modus-table.constants';

interface ModusTableCellBadgeProps {
  badge: ModusTableCellBadge;
  onBadgeClick?: (badge: ModusTableCellBadge) => void;
}

export const ModusTableCellBadgeElement: FunctionalComponent<ModusTableCellBadgeProps> = ({ badge, onBadgeClick }) => {
  function handleBadgeKeyDown(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (key === KEYBOARD_ENTER || key === KEYBOARD_SPACE) {
      onBadgeClick(badge);
      e.stopImmediatePropagation();
    }
  }

  return (
    <div class="cell-badge" onClick={() => onBadgeClick(badge)} onKeyDown={() => handleBadgeKeyDown}>
      <modus-badge tabIndex={0} color={badge.color} size={badge.size} type={badge.type} ariaLabel={badge?.ariaLabel}>
        {badge.text}
      </modus-badge>
    </div>
  );
};
