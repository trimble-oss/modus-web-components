import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { IconChevronDownThick } from '../../../icons/icon-chevron-down-thick';
import { IconChevronUpThick } from '../../../icons/icon-chevron-up-thick';
import { Row } from '@tanstack/table-core';

interface ModusTableCellExpandIconsProps {
  cellIndex: number;
  row: Row<unknown>;
}

export const ModusTableCellExpandIcons: FunctionalComponent<ModusTableCellExpandIconsProps> = ({ cellIndex, row }) => {
  return (
    <span
      class="expand"
      style={{ paddingLeft: `${cellIndex === 0 ? row.depth * 2 : 0}rem` }}
      onClick={row.getToggleExpandedHandler()}>
      {cellIndex === 0 && row.getCanExpand() ? (
        row.getIsExpanded() ? (
          <IconChevronUpThick size={'24'} />
        ) : (
          <IconChevronDownThick size={'24'} />
        )
      ) : (
        ''
      )}
    </span>
  );
};
