import { useRef } from 'react';

export type ShouldUpdateFunc<T> = (prev?: T, next?: T) => boolean;
function defaultShouldUpdate<T>(a?: T, b?: T) {
  if (!a) return true;
  return a !== b;
}

/**
 * 保存上一次状态的 Hook。
 * @param state 初始state
 * @param shouldUpdate 判断是否更新的函数
 */
export default function usePrevious<T>(
  state: T,
  shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate
): T | undefined {
  const prevRef = useRef<T>();
  const currentRef = useRef<T>();

  if (shouldUpdate(currentRef.current, state)) {
    prevRef.current = currentRef.current;
    currentRef.current = state;
  }

  return prevRef.current;
}
