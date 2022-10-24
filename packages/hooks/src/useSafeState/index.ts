import { Dispatch, SetStateAction, useState } from 'react';

import useMemoizedFn from '../useMemoizedFn';
import useUnmountedRef from '../useUnmountedRef';

function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
function useSafeState<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>];

/**
 * 用法与 useState 完全一样，但是在组件卸载后 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏。
 * @param initialState 初始值
 */
function useSafeState<S>(initialState?: S | (() => S)) {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);

  const setCurrentState = (currentState?: S | (() => S)) => {
    // 如果组件已经卸载了，则不要再做 setState 的操作
    if (unmountedRef.current) return;
    setState(currentState);
  };

  return [state, useMemoizedFn(setCurrentState)] as const;
}

export default useSafeState;
