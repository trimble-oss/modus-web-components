import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { ModusTableLink } from '../../models';

interface ModusTableCellLinkProps {
  link: ModusTableLink;
  onLinkClick: (link: ModusTableLink) => void;
}

export const ModusTableCellLink: FunctionalComponent<ModusTableCellLinkProps> = ({ link, onLinkClick }) => {
  return (
    <div class="cell-link" onClick={() => onLinkClick(link)}>
      {link.display}
    </div>
  );
};
