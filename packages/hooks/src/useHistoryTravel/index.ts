import { useRef, useState } from 'react';

import useMemoizedFn from '../useMemoizedFn';

type HistoryData<T> = {
  present?: T;
  past: T[];
  future: T[];
};

export default function useHistoryTravel<T>(initialValue?: T) {
  const [history, setHistory] = useState<HistoryData<T | undefined>>({
    present: initialValue,
    past: [],
    future: [],
  });

  const { present, past, future } = history;

  const initialValueRef = useRef(initialValue);

  const reset = (...params: any[]) => {
    const _initialValue = params.length > 0 ? params[0] : initialValueRef.current;
    initialValueRef.current = _initialValue;

    setHistory({
      present: _initialValue,
      past: [],
      future: [],
    });
  };

  const update = (val: T) => {
    setHistory({
      present: val,
      future: [],
      past: [...past, present],
    });
  };

  // 内部方法，不对外暴露
  const _forward = (step = 1) => {
    if (future.length === 0) return;

    const { before, current, after } = split(step, future);
    setHistory({
      present: current,
      past: [...past, present, ...before],
      future: after,
    });
  };

  // 内部方法，不对外暴露
  const _backward = (step = -1) => {
    if (past.length === 0) return;

    const { before, current, after } = split(step, past);
    setHistory({
      present: current,
      past: before,
      future: [...after, present, ...future],
    });
  };

  const go = (step: number) => {
    const stepNum = typeof step === 'number' ? step : Number(step);
    if (stepNum > 0) {
      _forward(stepNum);
    }
    if (stepNum < 0) {
      _backward(stepNum);
    }
  };

  const actions = {
    set: useMemoizedFn(update),
    forward: useMemoizedFn(() => {
      go(1);
    }),
    backward: useMemoizedFn(() => {
      go(-1);
    }),
    go: useMemoizedFn(go),
    reset: useMemoizedFn(reset),
  };

  return {
    value: present,
    backwardLength: past.length,
    forwardLength: future.length,
    actions,
  };
}

function split<T>(step: number, targetArr: T[]) {
  const index = dumpIndex(step, targetArr);

  return {
    current: targetArr[index],
    before: targetArr.slice(0, index),
    after: targetArr.slice(index + 1),
  };
}

function dumpIndex<T>(step: number, arr: T[]) {
  let index = step > 0 ? step - 1 : arr.length + step;

  if (index >= arr.length - 1) {
    index = arr.length - 1;
  }
  if (index < 0) {
    index = 0;
  }
  return index;
}
