import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import ModusTableCellLink from '../../models/modus-table-cell-link';

interface ModusTableCellLinkElementProps {
  link: ModusTableCellLink;
  onLinkClick: (link: ModusTableCellLink) => void;
}

export const ModusTableCellLinkElement: FunctionalComponent<ModusTableCellLinkElementProps> = ({ link, onLinkClick }) => {
  return (
    <div class="cell-link" onClick={() => onLinkClick(link)}>
      {link.display}
    </div>
  );
};
