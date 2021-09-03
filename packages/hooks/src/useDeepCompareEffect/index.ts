import { EffectCallback, DependencyList, useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

export default function useDeepCompareEffect(effect: EffectCallback, deps: DependencyList) {
  const depsRef = useRef<DependencyList>();
  const signalRef = useRef(0);

  if (!isEqual(deps, depsRef.current)) {
    depsRef.current = deps;
    signalRef.current += 1;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [signalRef.current]);
}
