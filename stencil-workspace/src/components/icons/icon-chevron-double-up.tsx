// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconChevronDoubleUp: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="mi-outline mi-chevron-double-up"
    xmlns="http://www.w3.org/2000/svg"
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24">
    <path d="M8.11 11.7 12 7.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 5.71a.996.996 0 0 0-1.41 0L6.7 10.29a.996.996 0 1 0 1.41 1.41Zm4.59.6a.996.996 0 0 0-1.41 0L6.7 16.88a.996.996 0 1 0 1.41 1.41L12 14.42l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 12.3Z" />
  </svg>
);
