// eslint-disable-next-line
import { Fragment, FunctionalComponent, h } from '@stencil/core';
import { IconMap } from '../../icons/IconMap';
import { ModusTableRowAction } from '../models/modus-table.models';

interface Props {
  actions?: ModusTableRowAction[];
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
            onClick={() => props.onRowActionClick(action.id, props.rowId)}>
            <IconMap icon={action.icon} size="16" /> 
          </div>
        ))}
    </Fragment>
  );
};
