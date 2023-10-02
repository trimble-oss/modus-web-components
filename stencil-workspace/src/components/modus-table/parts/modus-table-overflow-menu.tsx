// eslint-disable-next-line
import { Fragment, FunctionalComponent, h } from '@stencil/core';
import { IconMap } from '../../icons/IconMap';

interface Props {
  showOverflowMenu: boolean;
  overFlowMenuClick?: (x: number, y: number) => void;
  rowId: string;
  isChecked: boolean;
}

export const ModusTableOverflowMenu: FunctionalComponent<Props> = (props: Props) => {
  return (
    <Fragment>
      {props.showOverflowMenu && typeof props.overFlowMenuClick == 'function' && 
        <div
          class={`row-action overflow-menu ${props.isChecked ? 'row-selected' : ''}`}
          onClick={(e) => props.overFlowMenuClick(e.x, e.y)}>
          <IconMap icon="vertical-ellipsis" size="24" />
        </div>
      }
    </Fragment>
  );
};
