// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconShield: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-shield ${props.pressed ? 'pressed' : ''}`}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill={props.color ?? 'currentColor'}
    xmlns="http://www.w3.org/2000/svg">
    <path d="m19.87 5.36-7.1-3.19a2.001 2.001 0 0 0-1.57-.04L4.17 4.87c-.43.17-.69.6-.63 1.05l.26 1.91c.73 5.39 3.41 10.33 7.53 13.92.19.16.42.24.66.24s.47-.08.66-.24c4.13-3.58 6.83-8.52 7.59-13.91l.2-1.44a.98.98 0 0 0-.58-1.04Zm-1.61 2.2c-.65 4.62-2.87 8.88-6.27 12.09V4.02l6.36 2.86-.1.69Z" />
  </svg>
);
