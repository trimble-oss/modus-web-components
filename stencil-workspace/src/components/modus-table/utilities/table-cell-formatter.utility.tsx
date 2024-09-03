// Code taken from - https://github.com/TanStack/table/blob/main/packages/react-table/src/index.tsx

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
export function CellFormatter<TProps extends object>(Comp: Renderable<TProps>, props: TProps): unknown | JSX.Element {
  return !Comp ? null : isFunction<TProps>(Comp) ? <Comp {...props} /> : Comp;
}

/**
 * Checks if the input for cell formatter is a function object.
 */
function isFunction<TProps>(component: Renderable<TProps>): component is FunctionalComponent<TProps> {
  return isClassComponent(component) || typeof component === 'function';
}

function isClassComponent<TProps>(component: Renderable<TProps>) {
  return (
    typeof component === 'function' &&
    (() => {
      const proto = Object.getPrototypeOf(component);
      return proto.prototype && proto.prototype.isFunctionalComponent;
    })()
  );
}
