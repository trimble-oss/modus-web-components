// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconTriangleLeft: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-triangle-left"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={() => props.onClick()}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="m16 4-8 8 8 8Z" />
  </svg>
);
