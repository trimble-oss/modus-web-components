import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import ModusTableCellLink from '../../models/modus-table-cell-link';

interface ModusTableCellLinkProps {
  link: ModusTableCellLink;
  onLinkClick: (link: ModusTableCellLink) => void;
}

export const ModusTableCellLinkElement: FunctionalComponent<ModusTableCellLinkProps> = ({ link, onLinkClick }) => {
  return (
    <div class="cell-link" onClick={() => onLinkClick(link)}>
      {link.display}
    </div>
  );
};
