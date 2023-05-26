import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { Row } from '@tanstack/table-core';
import { IconChevronDownThick } from '../../icons/icon-chevron-down-thick';
import { IconChevronUpThick } from '../../icons/icon-chevron-up-thick';

interface ModusDataTableExpandIconCellProps {
  row: Row<unknown>;
}

export const ModusDataTableExpandIconCell: FunctionalComponent<
  ModusDataTableExpandIconCellProps
> = ({ row }) => {
  return row.getCanExpand() ? (
    <td class="expand" onClick={row.getToggleExpandedHandler()}>
      <span>
        {row.getIsExpanded() ? (
          <IconChevronUpThick size={'24'} />
        ) : (
          <IconChevronDownThick size={'24'} />
        )}
      </span>
    </td>
  ) : (
    <td></td>
  );
};
