// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconMenu: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-menu ${props.pressed ? 'pressed' : ''}`}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill={props.color ?? 'currentColor'}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" />
  </svg>
);
