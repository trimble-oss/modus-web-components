// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconIndeterminate: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-check"
    width={props.size ?? 16}
    height={props.size ?? 16}
    viewBox="-3 0 24 4"
    onClick={props.onClick ? () => props.onClick() : null}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3V1H17V3H1Z" fill={props.color ?? '#6A6976'} stroke={props.color ?? '#6A6976'} />
  </svg>
);
