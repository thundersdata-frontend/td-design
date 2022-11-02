import type { Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';

import useMemoizedFn from '../useMemoizedFn';
import useSafeState from '../useSafeState';

type GetStateAction<S> = () => S;

function useGetState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];
function useGetState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>
];
function useGetState<S>(initialState?: S) {
  const [state, setState] = useSafeState(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const getState = useMemoizedFn(() => stateRef.current);

  return [state, setState, getState];
}

export default useGetState;
