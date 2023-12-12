// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconCheck: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-check"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? () => props.onClick() : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9 18c-.26 0-.51-.1-.71-.29l-4-4A.996.996 0 1 1 5.7 12.3l3.29 3.29 9.29-9.29a.996.996 0 1 1 1.41 1.41l-10 10c-.2.2-.45.29-.71.29Z"
      fill={props.color ?? '#6A6976'}
    />
  </svg>
);
