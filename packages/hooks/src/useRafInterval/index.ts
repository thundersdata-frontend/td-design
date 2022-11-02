import { useEffect } from 'react';

import useLatest from '../useLatest';

interface Handle {
  id: number | NodeJS.Timer;
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

function cancelAnimationFrameIsNotDefined() {
  return typeof cancelAnimationFrame === typeof undefined;
}

const clearRafInterval = function (handle: Handle) {
  if (cancelAnimationFrameIsNotDefined()) {
    return clearInterval(handle.id as NodeJS.Timer);
  }
  cancelAnimationFrame(handle.id as number);
};

function useRafInterval(
  fn: () => void,
  delay?: number,
  options?: {
    immediate?: boolean;
  }
) {
  const immediate = options?.immediate;

  const fnRef = useLatest(fn);

  useEffect(() => {
    if (typeof delay !== 'number' || delay < 0) return;
    if (immediate) {
      fnRef.current();
    }
    const timer = setRafInterval(() => {
      fnRef.current();
    }, delay);
    return () => {
      clearRafInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);
}

export default useRafInterval;
