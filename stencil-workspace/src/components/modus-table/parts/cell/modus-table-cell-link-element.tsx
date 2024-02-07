import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableCellLink } from '../../models/modus-table.models';
import { KEYBOARD_ENTER, KEYBOARD_SPACE } from '../../modus-table.constants';

interface ModusTableCellLinkProps {
  link: ModusTableCellLink;
  onLinkClick: (link: ModusTableCellLink) => void;
}

export const ModusTableCellLinkElement: FunctionalComponent<ModusTableCellLinkProps> = ({ link, onLinkClick }) => {
  function handleLinkKeyDown(e: KeyboardEvent) {
    const key = e.key.toLowerCase();
    if (key === KEYBOARD_ENTER || key === KEYBOARD_SPACE) {
      onLinkClick(link);
      e.stopImmediatePropagation();
    }
  }

  return (
    <div class="cell-link" tabIndex={0} onClick={() => onLinkClick(link)} onKeyDown={handleLinkKeyDown}>
      {link.display}
    </div>
  );
};
