import { ComponentType, lazy } from 'react';

export function lazyImport<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ComponentType<any>,
  I extends { [K2 in K]: T },
  K extends keyof I,
>(factory: () => Promise<I>, name: K): I {
  return Object.create({
    [name]: lazy(() => factory().then(module => ({ default: module[name] }))),
  });
}

// Usage:
// const { Home } = lazyImport(() => import("./Home"), "Home");
