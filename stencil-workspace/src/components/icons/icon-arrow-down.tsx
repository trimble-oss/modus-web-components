import {
  FunctionalComponent,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconArrowDown: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-arrow-down"
    xmlns="http://www.w3.org/2000/svg"
    fill={props.color ?? 'currentColor'}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    data-test-id="iconArrowDown"
    viewBox="0 0 24 24">
    <path d="M15 12h3.79c.45 0 .67.54.35.85l-6.44 6.44a.996.996 0 0 1-1.41 0l-6.44-6.44A.5.5 0 0 1 5.2 12h3.79V5c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v7Z" />
  </svg>
);
