import { useEffect, useRef } from 'react';

/**
 * 获取当前组件卸载状态的 Hook。
 * @returns
 */
export default function useUnmountedRef() {
  const unmountedRef = useRef(false);

  useEffect(() => {
    unmountedRef.current = false;

    return () => {
      unmountedRef.current = true;
    };
  }, []);

  return unmountedRef;
}
