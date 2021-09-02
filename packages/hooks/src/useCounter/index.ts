import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

type Options = { min?: number; max?: number };
type ValueParam = number | ((c: number) => number);

/**
 * 步进器效果
 * @param initialValue
 * @param options
 * @returns
 */
export default function useCounter(initialValue = 0, options: Options = {}) {
  const [current, setCurrent] = useState(() => getTargetValue(initialValue, options));

  const setValue = (val: ValueParam) => {
    setCurrent(c => {
      const target = typeof val === 'number' ? val : val(c);
      return getTargetValue(target, options);
    });
  };

  const inc = (delta = 1) => {
    setValue(c => c + delta);
  };

  const dec = (delta = 1) => {
    setValue(c => c - delta);
  };

  const reset = () => {
    setValue(getTargetValue(initialValue, options));
  };

  return [
    current,
    {
      inc: useMemoizedFn(inc),
      dec: useMemoizedFn(dec),
      set: useMemoizedFn(setValue),
      reset: useMemoizedFn(reset),
    },
  ] as const;
}

function getTargetValue(val: number, options: Options = {}) {
  const { min, max } = options;
  if (typeof max === 'number') {
    return Math.min(max, val);
  }
  if (typeof min === 'number') {
    return Math.max(min, val);
  }
  return val;
}
