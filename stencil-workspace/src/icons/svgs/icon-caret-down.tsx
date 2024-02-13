// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconCaretDown: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-caret-down ${props.pressed ? 'pressed' : ''}`}
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    width={props.size ?? 16}
    xmlns="http://www.w3.org/2000/svg">
    <path d="m12.6 14.74 4.22-4.58c.43-.46.06-1.16-.6-1.16H7.78c-.66 0-1.03.7-.6 1.16l4.22 4.58c.31.34.89.34 1.2 0Z" />
  </svg>
);
