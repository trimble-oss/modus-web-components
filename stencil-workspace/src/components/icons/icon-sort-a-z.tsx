// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconSortAZ: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill={props.color}
    onClick={props.onClick}
    viewBox="0 0 32 32">
    <path d="M17.658 14.94a.997.997 0 0 0 1.281-.598L20.155 11h3.69l1.216 3.342a1 1 0 1 0 1.878-.684l-4-11a.999.999 0 0 0-1.878 0l-4 11a1 1 0 0 0 .597 1.282zM22 5.926 23.118 9h-2.236L22 5.926zM26 28h-5.919l6.7-8.375A1.002 1.002 0 0 0 26 18h-8a1 1 0 1 0 0 2h5.919l-6.7 8.375A1.002 1.002 0 0 0 18 30h8a1 1 0 1 0 0-2zm-14.766-5H9V3a1 1 0 1 0-2 0v20H4.766a.86.86 0 0 0-.782.492c-.146.304-.107.655.074.876l3.264 5.085c.165.207.413.326.678.326s.513-.119.709-.369l3.203-4.999a.862.862 0 0 0 .104-.919.86.86 0 0 0-.782-.492z" />
  </svg>
);
