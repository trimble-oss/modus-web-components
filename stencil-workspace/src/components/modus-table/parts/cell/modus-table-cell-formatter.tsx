import {
  FunctionalComponent,
  JSX,
  h, // eslint-disable-line @typescript-eslint/no-unused-vars
} from '@stencil/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Renderable<TProps> = any | FunctionalComponent<TProps>;

/**
 * Cell formatter enables formatting of a cell value.
 */
export function cellFormatter<TProps extends object>(Comp: Renderable<TProps>, props: TProps): unknown | JSX.Element {
  return !Comp ? null : isFunction<TProps>(Comp) ? <Comp {...props} /> : Comp;
}

/**
 * Checks if the input for cell formatter is a function object.
 */
function isFunction<TProps>(component: Renderable<TProps>): component is FunctionalComponent<TProps> {
  return typeof component === 'function';
}

// Note: Url for this code - https://github.com/TanStack/table/blob/main/packages/react-table/src/index.tsx
