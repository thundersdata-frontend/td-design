import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
// import useMemoizedFn from '../useMemoizedFn';

type Options = { min?: number; max?: number };
export type ValueParam = number | ((c: number) => number);

/**
 * 步进器效果
 * @param initialValue
 * @param options
 * @returns
 */
export default function useCounter(initialValue = 0, options: Options = {}) {
  const [current, setCurrent] = useState(() => getTargetValue(initialValue, options));

  const setValue = (value: ValueParam) => {
    setCurrent(c => {
      const target = typeof value === 'number' ? value : value(c);
      return getTargetValue(target, options);
    });
  };

  const inc = (delta = 1) => {
    setValue(c => c + delta);
  };

  const dec = (delta = 1) => {
    setValue(c => c - delta);
  };

  const set = (value: ValueParam) => {
    setValue(value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  const actions = {
    inc: useMemoizedFn(inc),
    dec: useMemoizedFn(dec),
    set: useMemoizedFn(set),
    reset: useMemoizedFn(reset),
  };

  return [current, actions] as const;
}

function getTargetValue(val: number, options: Options = {}) {
  const { min, max } = options;
  let target = val;
  if (typeof max === 'number') {
    target = Math.min(max, target);
  }
  if (typeof min === 'number') {
    target = Math.max(min, target);
  }
  return target;
}
