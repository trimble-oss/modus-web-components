// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from '../ModusIconMap';

export const IconThumbsUpOutlined: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-thumbs-up-outlined ${props.pressed ? 'pressed' : ''}`}
    width={props.size ?? '14'}
    height={props.size ?? 14}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.99 12.23c0-1.85-1.5-3.35-3.35-3.35h-3.69c.21-1.88.16-4.52-2.64-5.65-.38-.15-.76-.23-1.13-.23-.76 0-1.44.32-1.93.9-.92 1.1-.73 2.61-.65 3 .09.56-.31 1.06-1.16 2.01-.16.18-.32.35-.47.53a2.48 2.48 0 0 0-1.63-.6h-.83a2.5 2.5 0 0 0-2.5 2.5v7.51a2.5 2.5 0 0 0 2.5 2.5h.83c.76 0 1.45-.34 1.91-.88.6.56 1.4.9 2.28.9h7.06c1.99 0 2.8-1.08 3.49-2.91.6-1.44 1.59-3.81 1.69-4.03.1-.22.28-.62.22-2.21ZM6.17 18.86c0 .46-.38.83-.83.83h-.83c-.46 0-.83-.37-.83-.83v-7.51c0-.46.37-.83.83-.83h.83c.46 0 .83.38.83.83v7.51Zm14.07-5.11c-.12.26-1.71 4.08-1.71 4.08-.63 1.65-1.02 1.88-1.95 1.88H9.52c-.93 0-1.68-.75-1.68-1.68V11.5s-.01-.45.1-.61c.99-1.27 2.59-2.42 2.31-4.23-.18-.99.14-2.38 1.45-1.87 2.29.93 1.64 3.46 1.39 5.35.03.22.32.33.72.38h.04c.18.02.37.03.58.03h4.2c.93 0 1.68.75 1.68 1.68 0 0 .05 1.26-.07 1.52Z"
      fill={props.color ?? 'currentColor'}
    />
  </svg>
);
