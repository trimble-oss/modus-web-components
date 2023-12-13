// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconHistory: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-history"
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 24 24"
    width={props.size ?? 16}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M13.26 3C8.17 2.86 4 6.95 4 12H2.21c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8a.5.5 0 0 0-.36-.85H6c0-3.89 3.16-7.03 7.07-7s6.87 3.15 6.93 6.86c.07 3.93-3.09 7.14-7 7.14-.3 0-.59-.02-.88-.06a.991.991 0 0 0-1.12.99c0 .51.38.93.88 1 .37.05.74.07 1.12.07 5.05 0 9.14-4.17 9-9.26-.13-4.7-4.04-8.61-8.74-8.74Zm-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74Z" />
  </svg>
);
