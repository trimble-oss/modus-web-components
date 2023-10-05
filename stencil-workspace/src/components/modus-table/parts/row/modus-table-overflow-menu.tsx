// eslint-disable-next-line
import { Component, Event, EventEmitter, Fragment, Prop, h } from '@stencil/core';
import { IconMap } from '../../../icons/IconMap';
import { ModusTableRowAction } from '../../models/modus-table.models';

@Component({
  tag: 'modus-table-overflow-menu',  
  styleUrl: 'modus-table-overflow-menu.scss',
  shadow: true,
})
export class ModusTableOverflowMenu{
  @Prop() showOverflowMenu: boolean;
  @Prop() overflowActions: ModusTableRowAction[];
  @Prop() rowId: string;
  @Prop() isChecked: boolean;

  @Event() overflowClick: EventEmitter<MouseEvent>;

  render(): void {
    return (
      <Fragment>
        {this.showOverflowMenu && 
          <div
            class={`overflow-menu ${this.isChecked ? 'row-selected' : ''}`}
            id={`row-${this.rowId}`}
            onClick={(e: MouseEvent) => this.overflowClick.emit(e)} >
            <IconMap icon="vertical-ellipsis" size="24"/>
          </div>
        }
      </Fragment>
    );
  }
}
