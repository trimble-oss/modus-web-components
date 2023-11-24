// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: (event: MouseEvent) => void;
  size?: string;
}

export const IconThumbsDown: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-thumbs-down"
    width={props.size ?? '16'}
    height={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 15.02H3c-.55 0-1-.45-1-1v-9c0-.55.45-1 1-1h1c.55 0 1 .45 1 1v9c0 .55-.45 1-1 1Zm17.95-2.06c0 1.11-.9 2.01-2.01 2.01h-5.03c-.25 0-.48 0-.69.03h-.05c-.48.06-.82.19-.87.46.3 2.27 1.08 5.3-1.67 6.42-1.56.62-1.95-1.05-1.73-2.24.34-2.17-1.58-3.55-2.77-5.07-.13-.2-.12-.73-.12-.73V6.02c0-1.11.91-2.01 2.02-2.01h8.46c1.11 0 1.58.28 2.33 2.25 0 0 1.91 4.57 2.05 4.89s.09 1.82.09 1.82Z"
      fill={props.color ?? '#019aeb'}
    />
  </svg>
);
