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
      d="M9 19c-.51 0-1.02-.2-1.41-.59l-3.5-3.5c-.78-.78-.78-2.05 0-2.83.78-.78 2.05-.78 2.83 0l2.09 2.09 8.09-8.09c.78-.78 2.05-.78 2.83 0 .78.78.78 2.05 0 2.83l-9.5 9.5c-.39.39-.9.59-1.41.59Z"
      fill={props.color ?? '#6A6976'}
    />
  </svg>
);
