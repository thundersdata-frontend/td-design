import { useEffect, useRef } from 'react';

import { isNumber } from 'lodash-es';

import useMemoizedFn from '../useMemoizedFn';

interface Handle {
  id: ReturnType<typeof setInterval> | number;
}

const setRafInterval = function (callback: () => void, delay = 0): Handle {
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setInterval(callback, delay),
    };
  }
  const handle: Handle = {
    id: 0,
  };

  let start = new Date().getTime();
  const loop = () => {
    const current = new Date().getTime();
    if (current - start >= delay) {
      callback();
      start = new Date().getTime();
    }
    handle.id = requestAnimationFrame(loop);
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

function cancelAnimationFrameIsNotDefined(t: any): t is NodeJS.Timer {
  return typeof cancelAnimationFrame === typeof undefined;
}

const clearRafInterval = function (handle: Handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id)) {
    return clearInterval(handle.id);
  }
  cancelAnimationFrame(handle.id);
};

function useRafInterval(
  fn: () => void,
  delay?: number,
  options?: {
    immediate?: boolean;
  }
) {
  const immediate = options?.immediate ?? false;

  const timerCallback = useMemoizedFn(fn);
  const timerRef = useRef<Handle>();

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) return;
    if (immediate) {
      timerCallback();
    }
    timerRef.current = setRafInterval(() => {
      timerCallback();
    }, delay);

    return clear;
  }, [delay, immediate]);

  const clear = useMemoizedFn(() => {
    if (timerRef.current) {
      clearRafInterval(timerRef.current);
    }
  });

  return clear;
}

export default useRafInterval;
