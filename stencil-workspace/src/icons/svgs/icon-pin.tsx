// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconPin: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-pin ${props.pressed ? 'pressed' : ''}`}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill={props.color ?? 'currentColor'}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M17.54 6.45c-1.75-1.75-3.54-2.8-4-2.34-.25.25-.05.88.45 1.68l-4.55 4.55c-1.22-.91-2.2-1.35-2.5-1.05-.44.44.68 2.3 2.55 4.27L4.2 19.31 4 20l.69-.2 5.75-5.29c1.97 1.86 3.81 2.98 4.26 2.54.3-.3-.13-1.27-1.03-2.47l4.56-4.56c.79.49 1.41.68 1.65.44.46-.46-.59-2.25-2.34-4Z" />
  </svg>
);
