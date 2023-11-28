// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconIndeterminate: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-check"
    width={props.size ?? 16}
    height={props.size ?? 16}
    viewBox="0 0 24 24"
    onClick={props.onClick ? () => props.onClick() : null}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 14H6c-1.1 0-2-.9-2-2s.9-2 2-2h12c1.1 0 2 .9 2 2s-.9 2-2 2Z"
      fill={props.color ?? '#6A6976'}
      stroke={props.color ?? '#6A6976'}
    />
  </svg>
);
