// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconTriangleDown: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-triangle-down"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0.5L4.60606 5.5L9.21212 0.5H0Z" fill={props.color ?? '#6A6976'} />
  </svg>
);
