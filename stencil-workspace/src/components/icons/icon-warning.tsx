// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconWarning: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-warning"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={() => props.onClick()}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.75468 19.779C4.11391 19.779 3.54312 19.4504 3.22823 18.9002C2.92019 18.3617 2.92431 17.7209 3.23852 17.1865L10.4838 4.86167C10.8008 4.32244 11.3675 4 12 4C12.6325 4 13.1999 4.32244 13.5162 4.86167L20.7615 17.1865C21.0757 17.7209 21.0798 18.3617 20.7718 18.9002C20.4569 19.4504 19.8861 19.779 19.2453 19.779H4.75468ZM12.0001 17.0989C11.3264 17.0989 10.7823 16.5432 10.7823 15.8811C10.7823 15.2191 11.3264 14.6634 12.0001 14.6634C12.6738 14.6634 13.2178 15.2191 13.2178 15.8811C13.2178 16.5432 12.6738 17.0989 12.0001 17.0989ZM11.078 13.6706H12.9221L13.2295 8.96292H10.7707L11.078 13.6706Z"
      fill={props.color ?? '#6A6976'}
    />
  </svg>
);
