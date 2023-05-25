// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconChevronLeftThick: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-chevron-left-thick"
    height={props.size ?? 16}
    width={props.size ?? 16}
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 32 32">
    <path
      d="M21.753 28.06A2.483 2.483 0 0 0 22.864 26c0-.523-.165-1.024-.476-1.45l-.026-.035-.028-.032L14.941 16l7.393-8.483.028-.032.026-.035c.311-.426.476-.927.476-1.45 0-.823-.415-1.593-1.112-2.06-1.135-.76-2.704-.501-3.519.574l-8.572 9.974-.026.03-.024.032a2.445 2.445 0 0 0 0 2.9l.024.032.026.03 8.572 9.974c.816 1.075 2.384 1.335 3.52.574z"
      fill={props.color ?? '#6A6976'}
    />
  </svg>
);
