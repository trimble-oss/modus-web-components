// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconChevronRightThick: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-chevron-right-thick"
    xmlns="http://www.w3.org/2000/svg"
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 32 32">
    <g>
      <path
        d="m13.767 27.486 8.572-9.974.026-.03.023-.032a2.444 2.444 0 0 0 0-2.9l-.023-.032-.026-.03-8.572-9.974c-.815-1.075-2.384-1.335-3.52-.574A2.482 2.482 0 0 0 9.136 6c0 .523.164 1.024.476 1.45l.025.035.028.032L17.058 16l-7.392 8.483-.028.032-.026.034A2.442 2.442 0 0 0 9.136 26c0 .823.415 1.594 1.111 2.06 1.136.762 2.704.502 3.52-.573z"
        fill={props.color ?? '#6A6976'}
      />
    </g>
  </svg>
);
