// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconApps } from './icon-apps';
import { IconCancel } from './icon-cancel';
import { IconCheck } from './icon-check';
import { IconCheckCircle } from './icon-check-circle';
import { IconCheckCircleOutline } from './icon-check-circle-outline';
import { IconChevronDownThick } from './icon-chevron-down-thick';
import { IconChevronRightThick } from './icon-chevron-right-thick';
import { IconClose } from './icon-close';
import { IconError } from './icon-error';
import { IconFolder } from './icon-folder';
import { IconHelp } from './icon-help';
import { IconIndeterminate } from './icon-indeterminate';
import { IconInfo } from './icon-info';
import { IconInfoOutline } from './icon-info-outline';
import { IconMenu } from './icon-menu';
import { IconNotifications } from './icon-notifications';
import { IconRemove } from './icon-remove';
import { IconSearch } from './icon-search';
import { IconSortAZ } from './icon-sort-a-z';
import { IconSortZA } from './icon-sort-z-a';
import { IconTriangleDown } from './icon-triangle-down';
import { IconUploadCloud } from './icon-upload-cloud';
import { IconWarning } from './icon-warning';
import { IconWarningOutline } from './icon-warning-outline';
import { IconChevronLeftThick } from './icon-chevron-left-thick';
import { IconChevronUpThick } from './icon-chevron-up-thick';
import { IconDelete } from './icon-delete';
import { IconVerticalEllipsis } from './icon-vertical-ellipsis';

interface IconProps {
  color?: string;
  icon: string;
  onClick?: () => void;
  size?: string;
}

export const IconMap: FunctionalComponent<IconProps> = (props: IconProps) => {
  switch (props.icon) {
    case 'apps': return <IconApps color={props.color} onClick={props.onClick} size={props.size} />;
    case 'cancel': return <IconCancel color={props.color} onClick={props.onClick} size={props.size} />;
    case 'check': return <IconCheck color={props.color} onClick={props.onClick} size={props.size} />;
    case 'check-circle': return <IconCheckCircle color={props.color} onClick={props.onClick} size={props.size} />;
    case 'check-circle-outline': return <IconCheckCircleOutline color={props.color} onClick={props.onClick} size={props.size} />;
    case 'chevron-down-thick': return <IconChevronDownThick color={props.color} onClick={props.onClick} size={props.size} />;
    case 'chevron-left-thick': return <IconChevronLeftThick color={props.color} onClick={props.onClick} size={props.size} />;
    case 'chevron-right-thick': return <IconChevronRightThick color={props.color} onClick={props.onClick} size={props.size} />;
    case 'chevron-up-thick': return <IconChevronUpThick color={props.color} onClick={props.onClick} size={props.size} />;
    case 'close': return <IconClose color={props.color} onClick={props.onClick} size={props.size} />;
    case 'delete': return <IconDelete color={props.color} onClick={props.onClick} size={props.size} />;
    case 'error': return <IconError color={props.color} onClick={props.onClick} size={props.size} />;
    case 'folder': return <IconFolder color={props.color} onClick={props.onClick} size={props.size} />;
    case 'help': return <IconHelp color={props.color} onClick={props.onClick} size={props.size} />;
    case 'indeterminate': return <IconIndeterminate color={props.color} onClick={props.onClick} size={props.size} />;
    case 'info': return <IconInfo color={props.color} onClick={props.onClick} size={props.size} />;
    case 'info-outline': return <IconInfoOutline color={props.color} onClick={props.onClick} size={props.size} />;
    case 'menu': return <IconMenu color={props.color} onClick={props.onClick} size={props.size} />;
    case 'notifications': return <IconNotifications color={props.color} onClick={props.onClick} size={props.size} />;
    case 'remove': return <IconRemove color={props.color} onClick={props.onClick} size={props.size} />;
    case 'search': return <IconSearch color={props.color} onClick={props.onClick} size={props.size} />;
    case 'sort-a-z': return <IconSortAZ color={props.color} onClick={props.onClick} size={props.size} />;
    case 'sort-z-a': return <IconSortZA color={props.color} onClick={props.onClick} size={props.size} />;
    case 'triangle-down': return <IconTriangleDown color={props.color} onClick={props.onClick} size={props.size} />;
    case 'upload-cloud': return <IconUploadCloud color={props.color} onClick={props.onClick} size={props.size} />;
    case 'vertical-ellipsis': return <IconVerticalEllipsis color={props.color} onClick={props.onClick} size={props.size} />;
    case 'warning': return <IconWarning color={props.color} onClick={props.onClick} size={props.size} />;
    case 'warning-outline': return <IconWarningOutline color={props.color} onClick={props.onClick} size={props.size} />;
  }
};
