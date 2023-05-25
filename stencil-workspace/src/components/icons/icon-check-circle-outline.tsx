// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconCheckCircleOutline: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-check-circle-outline"
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={() => props.onClick()}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4C16.4 4 20 7.6 20 12C20 16.4 16.4 20 12 20C7.6 20 4 16.4 4 12C4 7.6 7.6 4 12 4ZM12 18.36C15.531 18.36 18.4 15.4343 18.4 11.9234C18.4 8.41257 15.531 5.56 12 5.56C8.46897 5.56 5.6 8.48571 5.6 11.9966C5.6 15.5074 8.46897 18.36 12 18.36ZM15.44 10.4L11.28 14.56C11.12 14.72 10.96 14.72 10.8 14.72C10.64 14.72 10.48 14.64 10.32 14.56L8.48 12.72C8.24 12.48 8.24 12.08 8.48 11.84C8.72 11.6 9.12 11.6 9.36 11.84L10.72 13.2L14.48 9.44C14.72 9.2 15.12 9.2 15.36 9.44C15.68 9.68 15.68 10.08 15.44 10.4Z"
      fill={props.color ?? '#6A6976'}
    />
  </svg>
);
