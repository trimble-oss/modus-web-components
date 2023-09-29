// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconPencil: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="mi-solid mi-pencil"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path 
    fill={props.color ?? 'currentColor'}
    d="M3.1 17.15c-.1.1-.15.22-.15.36v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.76 9.99l-3.75-3.75L3.1 17.15ZM20.66 5.68l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 0 0 0-1.41Z" />
  </svg>
);
