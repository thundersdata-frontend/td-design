import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

type Options = { min?: number; max?: number };
type ValueParam = number | string | ((c: number) => number);

/**
 * 步进器效果
 * @param initialValue
 * @param options
 * @returns
 */
export default function useCounter(initialValue: number | string = '', options: Options = {}) {
  const [current, setCurrent] = useState(() => getTargetValue(initialValue, options));

  const setValue = (val: ValueParam) => {
    setCurrent(c => {
      if (typeof val === 'function') {
        return val(+c);
      }
      return getTargetValue(val, options);
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

function getTargetValue(val: number | string, options: Options = {}) {
  if (val === '') return '';
  if (Number.isNaN(+val)) return '';

  const { min, max } = options;
  if (typeof max === 'number') {
    return Math.min(max, +val);
  }
  if (typeof min === 'number') {
    return Math.max(min, +val);
  }
  return val;
}
