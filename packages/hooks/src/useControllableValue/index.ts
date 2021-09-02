import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';
import useUpdateEffect from '../useUpdateEffect';

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

function useControllableValue<T>(props: StandardProps<T>): [T, (val: T) => void];
function useControllableValue<T>(
  props?: Record<string, any>,
  options?: Options<T>
): [T, (val: T, ...args: any[]) => void];

function useControllableValue<T>(props: Record<string, any> = {}, options: Options<T> = {}) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;

  const value = props[valuePropName] as T;

  const [state, setState] = useState<T>(() => {
    if (valuePropName in props) {
      return value;
    }
    if (defaultValuePropName in props) {
      return props[defaultValuePropName];
    }
    return defaultValue;
  });

  useUpdateEffect(() => {
    if (valuePropName in props) {
      setState(value);
    }
  }, []);

  const handleChange = useMemoizedFn((v: T, ...args: any[]) => {
    if (!(valuePropName in props)) {
      setState(v);
    }
    if (props[trigger]) {
      props[trigger](v, ...args);
    }
  });

  return [valuePropName in props ? value : state, handleChange] as const;
}

export default useControllableValue;
