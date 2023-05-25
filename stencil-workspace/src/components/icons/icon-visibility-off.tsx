// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconVisibilityOff: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="visibility-off"
    width={props.size ?? 16}
    height={props.size ?? 16}
    fill={props.color ?? '#252a2e'}
    onClick={props.onClick ? () => props.onClick() : null}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M12 7a4.481 4.481 0 0 1 4.5 4.5 5.08 5.08 0 0 1-.3 1.7l2.7 2.7a9.556 9.556 0 0 0 3.1-4.3 10.796 10.796 0 0 0-10-6.8 10.46 10.46 0 0 0-3.6.6l2 2A2.934 2.934 0 0 1 12 7ZM2.9 4.5 5 6.6l.4.4A10.79 10.79 0 0 0 2 11.5a10.796 10.796 0 0 0 10 6.8 10.571 10.571 0 0 0 4-.8l.4.4 2.7 2.7 1.2-1.2-16.2-16Zm5 5L9.3 11c0 .2-.1.4-.1.6a2.689 2.689 0 0 0 2.7 2.7 1.268 1.268 0 0 0 .6-.1l1.4 1.4a4.552 4.552 0 0 1-2 .5 4.481 4.481 0 0 1-4.5-4.5 7.173 7.173 0 0 1 .5-2.1Zm4-.7 2.9 2.9v-.1a2.689 2.689 0 0 0-2.7-2.7Z" />
  </svg>
);
