// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconChevronUpThick: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg class="icon-chevron-up-thick" xmlns="http://www.w3.org/2000/svg" height={props.size ?? 16}
       width={props.size ?? 16} onClick={props.onClick ? () => props.onClick() : null} fill="currentColor"
       viewBox="0 0 32 32">
    <path
      d="M3.94 21.753A2.483 2.483 0 0 0 6 22.864c.523 0 1.024-.165 1.45-.476l.035-.026.032-.028L16 14.941l8.483 7.393.032.028.034.026c.427.311.928.476 1.45.476.824 0 1.594-.415 2.06-1.112.761-1.135.502-2.704-.573-3.519l-9.974-8.572-.03-.026-.032-.024a2.445 2.445 0 0 0-2.9 0l-.032.024-.03.026-9.974 8.572c-1.075.816-1.335 2.384-.574 3.52z"
      fill={props.color ?? '#6A6976'}/>
  </svg>
);
