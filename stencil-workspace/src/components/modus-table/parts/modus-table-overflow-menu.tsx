// eslint-disable-next-line
import { Fragment, FunctionalComponent, h } from '@stencil/core';
import { IconMap } from '../../icons/IconMap';
import { ModusTableRowAction } from '../models/modus-table.models';

interface Props {
  showOverflowMenu: boolean;
  overflowMenuClick?: (rowId: string) => void;
  onActionClick?: (actionId: string, rowId: string) => void;
  overflowActions: ModusTableRowAction[];
  rowId: string;
  isChecked: boolean;
}

export const ModusTableOverflowMenu: FunctionalComponent<Props> = (props: Props) => {
  // document.addEventListener("click", (e) => console.log(e))
  return (
    <Fragment>
      {props.showOverflowMenu && 
        <div
          class={`row-action overflow-menu ${props.isChecked ? 'row-selected' : ''}`}
          id={`row-${props.rowId}`}
          onClick={() => props.overflowMenuClick(props.rowId)}>
          <IconMap icon="vertical-ellipsis" size="24" />
        </div>
      }
    </Fragment>
  );
};
