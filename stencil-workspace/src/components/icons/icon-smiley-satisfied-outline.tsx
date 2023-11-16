// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: (event: MouseEvent) => void;
  size?: string;
}

export const IconSmileySatisfiedOutline: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-smiley-satistied-outline"
    width={props.size ?? '14'}
    height={props.size ?? 14}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm1.38 6.11a.503.503 0 0 0-.98-.22C15.48 15.72 13.88 17 12 17s-3.49-1.28-3.9-3.11a.503.503 0 0 0-.98.22C7.64 16.4 9.65 18 12 18s4.36-1.6 4.88-3.89Z"
      fill={props.color ?? '#252A2E'}
    />
  </svg>
);
