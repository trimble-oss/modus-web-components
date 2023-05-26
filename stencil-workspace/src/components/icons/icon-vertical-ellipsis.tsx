// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconVerticalEllipsis: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    width={props.size ?? 16}
    height={props.size ?? 16}
    fill={props.color ?? '#6A6976'}
    onClick={props.onClick ? () => props.onClick() : null}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="17.5" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="6.5" r="1.5" />
  </svg>
);
