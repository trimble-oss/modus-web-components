// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconCheckCircle: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-check-circle"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={() => props.onClick()}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4C7.584 4 4 7.584 4 12C4 16.416 7.584 20 12 20C16.416 20 20 16.416 20 12C20 7.584 16.416 4 12 4ZM10.4 16L6.4 12L7.528 10.872L10.4 13.736L16.472 7.664L17.6 8.8L10.4 16Z"
      fill={props.color ?? '#6A6976'}
    />
  </svg>
);
