import { useMemoizedFn } from '@td-design/rn-hooks';
import { useEffect, useRef, useState } from 'react';

import { INFINITY } from './constant';
import { ToastProps } from './type';

export default function useToast() {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ToastProps | undefined>(undefined);

  const hide = () => {
    if (!visible) return;

    setVisible(false);
    clearTimeout(timer.current);
  };

  const show = (params: ToastProps) => {
    if (visible) return;

    setOptions(params);
    setVisible(true);
  };

  useEffect(() => {
    if (!options || options.duration === INFINITY) return;

    if (visible) {
      timer.current = setTimeout(() => {
        setVisible(false);
      }, options.duration);
    } else {
      clearTimeout(timer.current);
    }

    return () => clearTimeout(timer.current);
  }, [visible, options]);

  return {
    visible,
    options,

    show: useMemoizedFn(show),
    hide: useMemoizedFn(hide),
  };
}
