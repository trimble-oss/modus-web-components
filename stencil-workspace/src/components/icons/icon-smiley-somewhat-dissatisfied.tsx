// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';
import { IconProps } from './IconMap';

export const IconSmileySomewhatDissatisfied: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-smiley-somewhat-dissatistied"
    width={props.size ?? '16'}
    height={props.size ?? 16}
    onClick={props.onClick ? (event) => props.onClick(event) : null}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM7 9.5C7 8.67 7.67 8 8.5 8s1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5Zm8.71 7.38c-.09.08-.21.12-.33.12-.14 0-.28-.06-.38-.17-.76-.87-1.86-1.36-3.01-1.36s-2.25.5-3.01 1.36c-.18.21-.5.23-.71.05a.505.505 0 0 1-.05-.71c.95-1.08 2.32-1.71 3.76-1.71s2.81.62 3.76 1.71c.18.21.16.52-.05.71ZM15.5 11c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5Z"
      fill={props.color ?? '#019aeb'}
    />
  </svg>
);
