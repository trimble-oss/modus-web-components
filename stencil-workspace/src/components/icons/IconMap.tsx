// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconAdd } from './icon-add';
import { IconApps } from './icon-apps';
import { IconCalendar } from './icon-calendar';
import { IconCancel } from './icon-cancel';
import { IconCaretDown } from './icon-caret-down';
import { IconCheck } from './icon-check';
import { IconCheckCircle } from './icon-check-circle';
import { IconCheckCircleOutline } from './icon-check-circle-outline';
import { IconChevronDownThick } from './icon-chevron-down-thick';
import { IconChevronRightThick } from './icon-chevron-right-thick';
import { IconClose } from './icon-close';
import { IconCollapseAll } from './icon-collapse-all';
import { IconCopy } from './icon-copy';
import { IconDrag } from './icon-drag';
import { IconEdit } from './icon-edit';
import { IconError } from './icon-error';
import { IconExpandAll } from './icon-expand-all';
import { IconFolder } from './icon-folder';
import { IconHelp } from './icon-help';
import { IconIndeterminate } from './icon-indeterminate';
import { IconInfo } from './icon-info';
import { IconInfoOutline } from './icon-info-outline';
import { IconMenu } from './icon-menu';
import { IconNotifications } from './icon-notifications';
import { IconRefresh } from './icon-refresh';
import { IconRemove } from './icon-remove';
import { IconSearch } from './icon-search';
import { IconSortAZ } from './icon-sort-a-z';
import { IconSortZA } from './icon-sort-z-a';
import { IconTriangleLeft } from './icon-triangle-left';
import { IconTriangleDown } from './icon-triangle-down';
import { IconUploadCloud } from './icon-upload-cloud';
import { IconWarning } from './icon-warning';
import { IconWarningOutline } from './icon-warning-outline';
import { IconChevronLeftThick } from './icon-chevron-left-thick';
import { IconChevronUpThick } from './icon-chevron-up-thick';
import { IconDelete } from './icon-delete';
import { IconVerticalEllipsis } from './icon-vertical-ellipsis';
import { IconVisibility } from './icon-visibility';
import { IconVisibilityOff } from './icon-visibility-off';
import { IconMoon } from './icon-moon';
import { IconSun } from './icon-sun';
import { IconDownloadLine } from './icon-download-line';
import { IconTune } from './icon-tune';
import { IconChevronDoubleUp } from './icon-chevron-double-up';
import { IconChevronDoubleDown } from './icon-chevron-double-down';
import { IconTimerCountdown } from './icon-timer-countdown';
import { IconCaretUp } from './icon-caret-up';
import { IconExport } from './icon-export';
import { IconHistory } from './icon-history';
import { IconPencil } from './icon-pencil';

export interface IconProps {
  color?: string;
  onClick?: (event?) => void;
  size?: string;
  pressed?: boolean;
}

interface IconMapProps extends IconProps {
  icon: string;
  imageOptions?: { [key: string]: string };
}

export const IconMap: FunctionalComponent<IconMapProps> = (props: IconMapProps) => {
  switch (props.icon) {
    case 'add':
      return <IconAdd color={props.color} onClick={props.onClick} size={props.size} pressed={props.pressed} />;
    case 'apps':
      return <IconApps color={props.color} onClick={props.onClick} size={props.size} />;
    case 'calendar':
      return <IconCalendar color={props.color} onClick={props.onClick} size={props.size} />;
    case 'cancel':
      return <IconCancel color={props.color} onClick={props.onClick} size={props.size} />;
    case 'caret-down':
      return <IconCaretDown color={props.color} onClick={props.onClick} size={props.size} />;
    case 'caret-up':
      return <IconCaretUp color={props.color} onClick={props.onClick} size={props.size} />;
    case 'check':
      return <IconCheck color={props.color} onClick={props.onClick} size={props.size} />;
    case 'check-circle':
      return <IconCheckCircle color={props.color} onClick={props.onClick} size={props.size} />;
    case 'check-circle-outline':
      return <IconCheckCircleOutline color={props.color} onClick={props.onClick} size={props.size} />;
    case 'chevron-down-thick':
      return <IconChevronDownThick color={props.color} onClick={props.onClick} size={props.size} />;
    case 'chevron-left-thick':
      return <IconChevronLeftThick color={props.color} onClick={props.onClick} size={props.size} />;
    case 'chevron-right-thick':
      return <IconChevronRightThick color={props.color} onClick={props.onClick} size={props.size} />;
    case 'chevron-up-thick':
      return <IconChevronUpThick color={props.color} onClick={props.onClick} size={props.size} />;
    case 'chevron-double-up':
      return <IconChevronDoubleUp color={props.color} onClick={props.onClick} size={props.size} />;
    case 'chevron-double-down':
      return <IconChevronDoubleDown color={props.color} onClick={props.onClick} size={props.size} />;
    case 'close':
      return <IconClose color={props.color} onClick={props.onClick} size={props.size} />;
    case 'collapse-all':
      return <IconCollapseAll color={props.color} onClick={props.onClick} size={props.size} />;
    case 'copy':
      return <IconCopy color={props.color} onClick={props.onClick} size={props.size} />;
    case 'timer-countdown':
      return <IconTimerCountdown color={props.color} onClick={props.onClick} size={props.size} />;
    case 'delete':
      return <IconDelete color={props.color} onClick={props.onClick} size={props.size} />;
    case 'download-line':
      return <IconDownloadLine color={props.color} onClick={props.onClick} size={props.size} />;
    case 'drag':
      return <IconDrag color={props.color} onClick={props.onClick} size={props.size} />;
    case 'edit':
      return <IconEdit color={props.color} onClick={props.onClick} size={props.size} />;
    case 'error':
      return <IconError color={props.color} onClick={props.onClick} size={props.size} />;
    case 'expand-all':
      return <IconExpandAll color={props.color} onClick={props.onClick} size={props.size} />;
    case 'folder':
      return <IconFolder color={props.color} onClick={props.onClick} size={props.size} />;
    case 'help':
      return <IconHelp color={props.color} onClick={props.onClick} size={props.size} />;
    case 'indeterminate':
      return <IconIndeterminate color={props.color} onClick={props.onClick} size={props.size} />;
    case 'info':
      return <IconInfo color={props.color} onClick={props.onClick} size={props.size} />;
    case 'info-outline':
      return <IconInfoOutline color={props.color} onClick={props.onClick} size={props.size} />;
    case 'menu':
      return <IconMenu color={props.color} onClick={props.onClick} size={props.size} />;
    case 'moon':
      return <IconMoon color={props.color} onClick={props.onClick} size={props.size} />;
    case 'notifications':
      return <IconNotifications color={props.color} onClick={props.onClick} size={props.size} pressed={props.pressed} />;
    case 'refresh':
      return <IconRefresh color={props.color} onClick={props.onClick} size={props.size} />;
    case 'remove':
      return <IconRemove color={props.color} onClick={props.onClick} size={props.size} />;
    case 'search':
      return <IconSearch color={props.color} onClick={props.onClick} size={props.size} />;
    case 'sort-a-z':
      return <IconSortAZ color={props.color} onClick={props.onClick} size={props.size} />;
    case 'sort-z-a':
      return <IconSortZA color={props.color} onClick={props.onClick} size={props.size} />;
    case 'sun':
      return <IconSun color={props.color} onClick={props.onClick} size={props.size} />;
    case 'triangle-down':
      return <IconTriangleDown color={props.color} onClick={props.onClick} size={props.size} />;
    case 'triangle-left':
      return <IconTriangleLeft color={props.color} onClick={props.onClick} size={props.size} />;
    case 'tune':
      return <IconTune color={props.color} onClick={props.onClick} size={props.size} />;
    case 'upload-cloud':
      return <IconUploadCloud color={props.color} onClick={props.onClick} size={props.size} />;
    case 'vertical-ellipsis':
      return <IconVerticalEllipsis color={props.color} onClick={props.onClick} size={props.size} />;
    case 'warning':
      return <IconWarning color={props.color} onClick={props.onClick} size={props.size} />;
    case 'warning-outline':
      return <IconWarningOutline color={props.color} onClick={props.onClick} size={props.size} />;
    case 'visibility':
      return <IconVisibility color={props.color} onClick={props.onClick} size={props.size} />;
    case 'visibility-off':
      return <IconVisibilityOff color={props.color} onClick={props.onClick} size={props.size} />;
    case 'history':
      return <IconHistory color={props.color} onClick={props.onClick} size={props.size} />;
    case 'export':
      return <IconExport color={props.color} onClick={props.onClick} size={props.size} />;
    case 'pencil':
      return <IconPencil color={props.color} onClick={props.onClick} size={props.size} />;
    default:
      return <img src={props.icon} {...(props.imageOptions || {})} />;
  }
};
