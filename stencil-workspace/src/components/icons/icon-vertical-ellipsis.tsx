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
    fill={props.color ?? 'currentColor'}
    onClick={props.onClick ? () => props.onClick() : null}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M10.59 10.59c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Zm0-7c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Zm0 14c-.78.78-.78 2.05 0 2.83s2.05.78 2.83 0 .78-2.05 0-2.83-2.05-.78-2.83 0Z" />
  </svg>
);
