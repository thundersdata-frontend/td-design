import { useRef } from 'react';

/**
 * 返回当前最新值的 Hook，可以避免闭包问题。
 * @param value 要持久化的值
 * @returns
 */
export default function useLatest<T>(value: T) {
  const ref = useRef<T>(value);
  ref.current = value;

  return ref;
}
