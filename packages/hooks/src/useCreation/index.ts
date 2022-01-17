import { useRef } from 'react';
import { depsAreSame } from '../utils';

/**
 * `useCreation` 是 `useMemo` 或 `useRef` 的替代品。
 * 因为 `useMemo` 不能保证被 memo 的值一定不会被重计算，而 `useCreation` 可以保证这一点。
 * 相比于 `useRef`，你可以使用 `useCreation` 创建一些常量，这些常量和 `useRef` 创建出来的 ref 有很多使用场景上的相似，但对于复杂常量的创建，`useRef` 却容易出现潜在的性能隐患。
 * const a = useRef(new Subject()) // 每次重渲染，都会执行实例化 Subject 的过程，即便这个实例立刻就被扔掉了
 * const b = useCreation(() => new Subject(), []) // 通过 factory 函数，可以避免性能隐患
 */
export default function useCreation<T>(factory: () => T, deps: any[]) {
  const { current } = useRef({
    deps,
    initialized: false,
    obj: undefined as T | undefined,
  });

  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj as T;
}
