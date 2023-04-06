// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusTableCellLink } from '../modus-table.models';

interface ModusTableCellLinkProps {
  link: ModusTableCellLink;
  onLinkClick: (link: ModusTableCellLink) => void;
}

export const ModusTableCellLinkPart: FunctionalComponent<ModusTableCellLinkProps> = (props: ModusTableCellLinkProps) => {
  return (
    <div class="cell-link" onClick={() => props.onLinkClick(props.link)}>
      {props.link.display}
    </div>
  );
};
