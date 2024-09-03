// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconTriangleDown: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-triangle-down ${props.pressed ? 'pressed' : ''}`}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 10 6"
    fill={props.color ?? 'currentColor'}>
    <path d="M0 0.5L4.60606 5.5L9.21212 0.5H0Z" />
  </svg>
);
