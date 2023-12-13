// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconSmileySomewhatSatisfiedOutline: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-smiley-somewhat-satistied-outline"
    width={props.size ?? '16'}
    height={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8ZM8.5 8C7.67 8 7 8.67 7 9.5S7.67 11 8.5 11s1.5-.67 1.5-1.5S9.33 8 8.5 8Zm7 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5S16.33 8 15.5 8Zm.26 8.29c.18-.21.16-.52-.05-.71a.506.506 0 0 0-.71.05c-.76.87-1.86 1.36-3.01 1.36s-2.25-.5-3.01-1.36a.505.505 0 0 0-.71-.05c-.21.18-.23.5-.05.71.95 1.08 2.32 1.71 3.76 1.71s2.81-.62 3.76-1.71Z"
      fill={props.color ?? 'currentColor'}
    />
  </svg>
);
