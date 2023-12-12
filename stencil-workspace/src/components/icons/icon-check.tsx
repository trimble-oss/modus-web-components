// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconCheck: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-check"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? () => props.onClick() : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.08471 15.4676L5.29164 11.736L4 12.9978L9.08471 18L20 7.26174L18.7175 6L9.08471 15.4676Z"
      fill={props.color ?? '#6A6976'}
    />
  </svg>
);
