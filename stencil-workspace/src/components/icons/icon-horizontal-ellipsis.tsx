// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconHorizontalEllipsis: FunctionalComponent<IconProps> = (
  props: IconProps
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size ?? 16}
    height={props.size ?? 16}
    onClick={props.onClick ? () => props.onClick() : null}
    fill={props.color ?? '#6A6976'}
    viewBox="0 0 24 24">
    <path d="M10.59 10.59c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Zm7 0c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Zm-14 0c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Z" />
  </svg>
);
