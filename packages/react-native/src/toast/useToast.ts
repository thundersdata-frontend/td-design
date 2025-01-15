import { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';

import { useMemoizedFn } from '@td-design/rn-hooks';

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

  /** 每次显示前，先隐藏之前的Toast */
  const show = (params: ToastProps) => {
    if (visible) {
      hide();
    }

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

  /** 当Toast显示的时候，不允许安卓物理返回键可用 */
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => visible);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => false);
    };
  }, [visible]);

  return {
    visible,
    options,

    show: useMemoizedFn(show),
    hide: useMemoizedFn(hide),
  };
}
