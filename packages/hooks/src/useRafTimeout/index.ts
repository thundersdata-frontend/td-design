import { useEffect, useRef } from 'react';

import { isNumber } from 'lodash-es';

import useMemoizedFn from '../useMemoizedFn';

interface Handle {
  id: number | ReturnType<typeof setTimeout>;
}

const setRafTimeout = function (callback: () => void, delay = 0): Handle {
  if (typeof requestAnimationFrame === typeof undefined) {
    return {
      id: setTimeout(callback, delay),
    };
  }
  const handle: Handle = {
    id: 0,
  };

  const startTime = new Date().getTime();
  const loop = () => {
    const current = new Date().getTime();
    if (current - startTime >= delay) {
      callback();
    } else {
      handle.id = requestAnimationFrame(loop);
    }
  };
  handle.id = requestAnimationFrame(loop);
  return handle;
};

function cancelAnimationFrameIsNotDefined(t: any): t is NodeJS.Timer {
  return typeof cancelAnimationFrame === typeof undefined;
}

const clearRafTimeout = function (handle: Handle) {
  if (cancelAnimationFrameIsNotDefined(handle.id)) {
    return clearTimeout(handle.id);
  }
  cancelAnimationFrame(handle.id as number);
};

function useRafTimeout(fn: () => void, delay?: number) {
  const timerCallback = useMemoizedFn(fn);
  const timerRef = useRef<Handle>();

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) return;

    timerRef.current = setRafTimeout(() => {
      timerCallback();
    }, delay);

    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const clear = useMemoizedFn(() => {
    if (timerRef.current) {
      clearRafTimeout(timerRef.current);
    }
  });

  return clear;
}

export default useRafTimeout;
