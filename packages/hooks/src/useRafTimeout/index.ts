import { useEffect } from 'react';

import useLatest from '../useLatest';

interface Handle {
  id: number | ReturnType<typeof setTimeout>;
}

const setRafTimeout = function (callback: () => void, delay = 16.7): Handle {
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

function cancelAnimationFrameIsNotDefined() {
  return typeof cancelAnimationFrame === typeof undefined;
}

const clearRafTimeout = function (handle: Handle) {
  if (cancelAnimationFrameIsNotDefined()) {
    return clearTimeout(handle.id);
  }
  cancelAnimationFrame(handle.id as number);
};

function useRafTimeout(fn: () => void, delay?: number) {
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (typeof delay !== 'number' || delay < 0) return;
    const timer = setRafTimeout(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearRafTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);
}

export default useRafTimeout;
