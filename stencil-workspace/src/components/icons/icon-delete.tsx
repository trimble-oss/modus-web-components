// eslint-disable-next-line
import { FunctionalComponent, h } from '@stencil/core';

interface IconProps {
  color?: string;
  onClick?: () => void;
  size?: string;
}

export const IconDelete: FunctionalComponent<IconProps> = (props: IconProps) => (
  <svg
    class="icon-delete"
    xmlns="http://www.w3.org/2000/svg"
    fill={props.color}
    height={props.size ?? 16}
    width={props.size ?? 16}
    onClick={props.onClick}
    viewBox="0 0 32 32">
    <path d="M27.8 19.4c.07-.22.12-.45.14-.69-.04.23-.1.45-.16.68.01 0 .01.01.02.01zM28 6h-6.38l-1.73-3.45A.988.988 0 0 0 19 2h-6c-.38 0-.72.21-.89.55L10.38 6H4c-.55 0-1 .45-1 1s.45 1 1 1h3v17.17A4.84 4.84 0 0 0 11.83 30h8.34A4.84 4.84 0 0 0 25 25.17V8h3c.55 0 1-.45 1-1s-.45-1-1-1zM12 25V11c0-.55.45-1 1-1s1 .45 1 1v14c0 .55-.45 1-1 1s-1-.45-1-1zm8 0c0 .55-.45 1-1 1s-1-.45-1-1V11c0-.55.45-1 1-1s1 .45 1 1v14zM13.62 4h4.76l1 2h-6.76l1-2z" />
  </svg>
);
