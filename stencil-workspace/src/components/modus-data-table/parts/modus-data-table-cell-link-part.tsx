// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { ModusDataTableCellLink } from '../modus-data-table.models';

interface ModusDataTableCellLinkProps {
  link: ModusDataTableCellLink;
  onLinkClick: (link: ModusDataTableCellLink) => void;
}

export const ModusDataTableCellLinkPart: FunctionalComponent<ModusDataTableCellLinkProps> = (
  props: ModusDataTableCellLinkProps
) => {
  return (
    <div class="cell-link" onClick={() => props.onLinkClick(props.link)}>
      {props.link.display}
    </div>
  );
};
