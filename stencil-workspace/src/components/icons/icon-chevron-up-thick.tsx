// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconChevronUpThick: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg class="icon-chevron-up-thick" height={props.size ?? 16} width={props.size ?? 16} onClick={props.onClick ? () => props.onClick() : null} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5292 8.21649C12.2405 7.92783 11.7595 7.92783 11.4708 8.21649L5.21649 14.4387C4.92783 14.7594 4.92783 15.1014 5.21649 15.39L6 16C6.28866 16.2887 6.67927 16.2887 7 16L12 11L17 16C17.3207 16.2887 17.7572 16.5556 18.0458 16.2669L18.7835 15.5292C19.0722 15.2405 19.0722 14.7594 18.7835 14.4387L12.5292 8.21649Z" fill={props.color ?? '#6A6976'} />
  </svg>
);
