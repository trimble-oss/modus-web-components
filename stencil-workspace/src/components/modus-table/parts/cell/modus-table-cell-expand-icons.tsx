import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';
import { IconChevronDownThick } from '../../../icons/icon-chevron-down-thick';
import { IconChevronUpThick } from '../../../icons/icon-chevron-up-thick';
import { Row } from '@tanstack/table-core';
import { KEYBOARD_ENTER, KEYBOARD_SPACE } from '../../modus-table.constants';

interface ModusTableCellExpandIconsProps {
  row: Row<unknown>;
}

const ModusTableCellExpandIcons: FunctionalComponent<ModusTableCellExpandIconsProps> = ({ row }) => {
  let expandEl: HTMLElement;
  return (
    <span
      ref={(ref) => (expandEl = ref)}
      style={{ paddingLeft: `${row.depth * 2}rem` }}
      onClick={(e) => {
        row.getToggleExpandedHandler()();
        e.stopImmediatePropagation();
      }}>
      {row.getCanExpand() && (
        <span
          class="expand"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key.toLowerCase() === KEYBOARD_ENTER || event.key.toLowerCase() === KEYBOARD_SPACE) {
              expandEl.click();
              event.stopImmediatePropagation();
            }
          }}>
          {row.getIsExpanded() ? <IconChevronUpThick size={'24'} /> : <IconChevronDownThick size={'24'} />}
        </span>
      )}
    </span>
  );
};

export default ModusTableCellExpandIcons;
