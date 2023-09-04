// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconCountdownTimer: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-countdown-timer ${props.pressed ? 'pressed' : ''}`}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 9v4.5l3.55 2.76A4.496 4.496 0 0 0 12 9Zm7.21.66.52-.52a.996.996 0 0 0 0-1.41l-1.27-1.27a.996.996 0 0 0-1.41 0l-.47.47c-.77-.55-1.64-.96-2.57-1.21V4h1c.55 0 1-.45 1-1s-.45-1-1-1h-6c-.55 0-1 .45-1 1s.45 1 1 1h1v1.69a7.99 7.99 0 0 0-6.05 7.75c0 4.42 3.58 8 8 8s8-3.58 8-8c0-1.33-.33-2.57-.9-3.68.05-.04.11-.06.16-.11Zm-7.26 10.01c-3.43 0-6.22-2.79-6.22-6.22s2.79-6.22 6.22-6.22 6.22 2.79 6.22 6.22-2.79 6.22-6.22 6.22Z"
      fill={props.color ?? '#6A6976'}
    />
  </svg>
);
