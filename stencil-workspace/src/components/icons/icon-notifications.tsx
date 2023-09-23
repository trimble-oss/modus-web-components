// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: (event: MouseEvent) => void;
  size?: string;
  pressed?: boolean;
}

export const IconNotifications: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class={`icon-notifications ${props.pressed ? 'pressed' : ''}`}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 20h4c0 1.1-.9 2-2 2s-2-.9-2-2Zm9.67-2.69C18.36 15.96 17 13.66 17 10a5 5 0 0 0-4-4.9V4c0-.55-.45-1-1-1s-1 .45-1 1v1.1A5 5 0 0 0 7 10c0 3.66-1.37 5.96-2.67 7.31-.61.64-.16 1.69.72 1.69h13.91c.88 0 1.33-1.05.72-1.69Z"
      fill={props.color ?? '#6A6976'}
    />
  </svg>
);
