// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: (event: MouseEvent) => void;
  size?: string;
  pressed?: boolean;
}

export const IconCalendar: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={props.pressed ? 'icon-calendar pressed' : 'icon-calendar'}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 11h-3v3h3v-3Zm4.5 0h-3v3h3v-3Zm2-8h-2c0-.55-.45-1-1-1s-1 .45-1 1H8c0-.55-.45-1-1-1s-1 .45-1 1H4c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 17H4V9.97h16V20Zm0-12.03H4V5h2v1c0 .55.45 1 1 1s1-.45 1-1V5h8v1c0 .55.45 1 1 1s1-.45 1-1V5h2v2.97ZM9 11H6v3h3v-3Z" />
  </svg>
);
