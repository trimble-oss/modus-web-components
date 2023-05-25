// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconChevronUpThick: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-chevron-up-thick"
    xmlns="http://www.w3.org/2000/svg"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? () => props.onClick() : null}
    fill="currentColor"
    viewBox="0 0 32 32">
    {' '}
    <path d="M11.29 8.71 6.7 13.3a.996.996 0 1 0 1.41 1.41L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0z" />
  </svg>
);
