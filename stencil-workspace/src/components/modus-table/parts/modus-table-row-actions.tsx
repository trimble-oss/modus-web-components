// eslint-disable-next-line
import { Fragment, FunctionalComponent, h } from '@stencil/core';
import { IconMap } from '../../icons/IconMap';
import { ModusTableRowAction } from '../models/modus-table.models';

interface Props {
  actions?: ModusTableRowAction[];
  showOverflowMenu: boolean;
  overFlowMenuClick?: (x: number, y: number) => void;
  onRowActionClick?: (actionId: string, rowId: string) => void;
  rowId: string;
  isChecked: boolean;
}

export const ModusTableRowActions: FunctionalComponent<Props> = (props: Props) => {
  return (
    <Fragment>
      {typeof props.onRowActionClick == 'function' && props.actions?.length > 0 &&
        props.actions.map((action) => (
          <div
            class={`row-action ${props.isChecked ? 'row-selected' : ''}`}
            onClick={() => props.onRowActionClick(action._id, props.rowId)}>
            <IconMap icon={action.display.icon} size="16" /> 
          </div>
        ))}
      {props.showOverflowMenu && typeof props.onRowActionClick == 'function' && 
        <div
          class={`row-action overflow-menu ${props.isChecked ? 'row-selected' : ''}`}
          onClick={(e) => props.overFlowMenuClick(e.x, e.y)}>
          <IconMap icon="vertical-ellipsis" size="24" />
        </div>
      }
    </Fragment>
  );
};
