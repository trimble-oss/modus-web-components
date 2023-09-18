import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableCellLink } from '../../models/modus-table.models';

interface ModusTableCellLinkProps {
  link: ModusTableCellLink;
  onLinkClick: (link: ModusTableCellLink) => void;
}

export const ModusTableCellLinkElement: FunctionalComponent<ModusTableCellLinkProps> = ({ link, onLinkClick }) => {
  return (
    <div class="cell-link wrap-text" onClick={() => onLinkClick(link)}>
      {link.display}
    </div>
  );
};
