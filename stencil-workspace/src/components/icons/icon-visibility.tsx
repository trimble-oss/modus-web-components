// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconVisibility: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="visibility"
    width={props.size ?? 16}
    height={props.size ?? 16}
    fill={props.color ?? '#252a2e'}
    onClick={props.onClick ? () => props.onClick() : null}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5.2A10.796 10.796 0 0 0 2 12a10.753 10.753 0 0 0 20 0 10.796 10.796 0 0 0-10-6.8Zm0 11.3a4.5 4.5 0 1 1 4.5-4.5 4.481 4.481 0 0 1-4.5 4.5Zm0-7.2a2.7 2.7 0 1 0 2.7 2.7A2.689 2.689 0 0 0 12 9.3Z" />
  </svg>
);
