// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconChevronDownThick: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg class="icon-chevron-down-thick" height={props.size ?? 16} width={props.size ?? 16} onClick={props.onClick ? () => props.onClick() : null} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.4708 15.7835C11.7595 16.0722 12.2405 16.0722 12.5292 15.7835L18.7835 9.56128C19.0722 9.24055 19.0722 8.89864 18.7835 8.60998L18 8C17.7113 7.71134 17.3207 7.71134 17 8L12 13L7 8C6.67927 7.71134 6.24284 7.44444 5.95418 7.7331L5.21649 8.47079C4.92783 8.75945 4.92783 9.24055 5.21649 9.56128L11.4708 15.7835Z" fill={props.color ?? '#6A6976'} />
  </svg>
);
