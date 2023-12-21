// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconChevronDoubleDown: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-chevron-double-down"
    xmlns="http://www.w3.org/2000/svg"
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24">
    <path d="M11.29 11.7c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.38.39-1.01 0-1.4s-1.02-.39-1.41 0L12 9.58 8.11 5.7A.996.996 0 1 0 6.7 7.11l4.59 4.59Zm6 .6a.996.996 0 0 0-1.41 0L12 16.17l-3.88-3.88a.996.996 0 1 0-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.993.993 0 0 0-.01-1.4Z" />
  </svg>
);
