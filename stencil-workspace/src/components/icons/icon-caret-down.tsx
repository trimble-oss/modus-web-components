/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconCaretDown: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    id={props.id}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    class="mi-solid mi-caret-down-bold"
    viewBox="0 0 24 24">
    <path d="M17.4 9.25a1.3 1.3 0 0 0-1.19-.75H7.78c-.52 0-.99.29-1.19.75-.19.43-.1.91.22 1.25l4.22 4.58c.24.26.6.42.97.42s.73-.15.97-.42l4.22-4.58c.32-.35.4-.83.22-1.25Z" />
  </svg>
);
