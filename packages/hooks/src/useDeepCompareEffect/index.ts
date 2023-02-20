/* eslint-disable */
import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

import { isEqual } from 'lodash-es';

export default function useDeepCompareEffect(effect: EffectCallback, deps: DependencyList) {
  const depsRef = useRef<DependencyList>();
  const signalRef = useRef(0);

  if (!isEqual(deps, depsRef.current)) {
    depsRef.current = deps;
    signalRef.current += 1;
  }

  useEffect(effect, [signalRef.current]);
}
