// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconMap } from '../../icons/IconMap';
import { ModusDataTableRowAction } from '../modus-data-table.models';

interface Props {
  actions: ModusDataTableRowAction[];
  animateDropdown: boolean;
  onRowActionClick: (actionId: string, rowId: string) => void;
  rowId: string;
}

export const ModusDataTableRowActionDropdown: FunctionalComponent<Props> = (props: Props) => {
  return (
    <modus-dropdown
      toggle-element-id={`dropdownToggle-${props.rowId}`}
      animate-list={props.animateDropdown}
      customPlacement={{ left: -194 }}>
      <div class="row-action" id={`dropdownToggle-${props.rowId}`} slot="dropdownToggle">
        <IconMap icon="vertical-ellipsis" size="24" />
      </div>
      <div slot="dropdownList">
        <div class="list-container">
          <div class="items-container">
            {props.actions.map((action) => (
              <div class="action-item" onClick={() => props.onRowActionClick(action._id, props.rowId)}>
                <div class="action-item-content">
                  {action.display.icon && <IconMap icon={action.display.icon} size={'16'} />}
                  <div class="display-text">{action.display.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </modus-dropdown>
  );
};
