import { useMemo, useRef } from 'react';
import type { SetStateAction } from 'react';
import { isFunction } from '../utils';
import useMemoizedFn from '../useMemoizedFn';
import useUpdate from '../useUpdate';

interface Options<T> {
  /** 默认值，会被 props.defaultValue 和 props.value 覆盖 */
  defaultValue?: T;
  /** 默认值的属性名。默认为 defaultValue */
  defaultValuePropName?: string;
  /** 值的属性名。默认为 value */
  valuePropName?: string;
  /** 修改值时触发的函数。默认为 onChange */
  trigger?: string;
}

interface StandardProps<T> {
  value: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}
export type Props = Record<string, any>;

function useControllableValue<T = any>(props: StandardProps<T>): [T, (v: SetStateAction<T>) => void];
function useControllableValue<T = any>(
  props?: Props,
  options?: Options<T>
): [T, (v: SetStateAction<T>, ...args: any[]) => void];
function useControllableValue<T = any>(props: Props = {}, options: Options<T> = {}) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;

  const value = props[valuePropName] as T;
  const isControlled = props.hasOwnProperty(valuePropName);

  const initialValue = useMemo(() => {
    if (isControlled) {
      return value;
    }
    if (props.hasOwnProperty(defaultValuePropName)) {
      return props[defaultValuePropName];
    }
    return defaultValue;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stateRef = useRef(initialValue);
  if (isControlled) {
    stateRef.current = value;
  }

  const update = useUpdate();

  function setState<T>(v: SetStateAction<T>, ...args: any[]) {
    const r = isFunction(v) ? v(stateRef.current) : v;

    if (!isControlled) {
      stateRef.current = r;
      update();
    }
    if (props[trigger]) {
      props[trigger](r, ...args);
    }
  }

  return [stateRef.current, useMemoizedFn(setState)] as const;
}

export default useControllableValue;
