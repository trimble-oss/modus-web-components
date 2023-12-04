// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconIndeterminate: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-indeterminate"
    width={props.size ?? 16}
    height={props.size ?? 16}
    viewBox={props.size == '12' ? '-1 -1 24 24' : '0 0 24 24'}
    onClick={props.onClick ? () => props.onClick() : null}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.5 13.5h-13c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5h13c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5Z"
      fill={props.color ?? '#6A6976'}
      stroke={props.color ?? '#6A6976'}
    />
  </svg>
);
