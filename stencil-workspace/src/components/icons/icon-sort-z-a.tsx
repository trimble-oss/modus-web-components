// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconSortZA: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill={props.color}
    onClick={props.onClick}
    viewBox="0 0 32 32">
    <path d="M17.658 14.94a.997.997 0 0 0 1.281-.598L20.155 11h3.69l1.216 3.342a1 1 0 1 0 1.878-.684l-4-11a.999.999 0 0 0-1.878 0l-4 11a1 1 0 0 0 .597 1.282zM22 5.926 23.118 9h-2.236L22 5.926zM26 28h-5.919l6.7-8.375A1.002 1.002 0 0 0 26 18h-8a1 1 0 1 0 0 2h5.919l-6.7 8.375A1.002 1.002 0 0 0 18 30h8a1 1 0 1 0 0-2zM8.678 2.547c-.33-.414-.995-.457-1.387.043L4.088 7.589a.862.862 0 0 0-.104.919.86.86 0 0 0 .782.492H7v20a1 1 0 1 0 2 0V9h2.234a.86.86 0 0 0 .782-.492c.146-.304.106-.655-.074-.876L8.678 2.547z" />
  </svg>
);
