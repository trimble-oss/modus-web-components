// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconCaretUp: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-caret-up ${props.pressed ? 'pressed' : ''}`}
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    width={props.size ?? 16}
    xmlns="http://www.w3.org/2000/svg">
    <path d="m11.4 9.26-4.22 4.58c-.43.46-.06 1.16.6 1.16h8.43c.66 0 1.03-.7.6-1.16l-4.22-4.58a.833.833 0 0 0-1.2 0Z" />
  </svg>
);
