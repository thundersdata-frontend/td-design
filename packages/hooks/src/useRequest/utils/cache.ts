type Timer = ReturnType<typeof setTimeout>;
type CacheData<TData, TParams extends any[]> = { data: TData; params?: TParams; timer?: Timer; time: number };
type Listener<TData> = (data: TData) => void;
type CacheKey = string | number;

const cache = new Map<CacheKey, CacheData<any, any[]>>();
const listeners: Record<string, Listener<any>[]> = {};

export function setCache<TData, TParams extends any[]>(
  key: CacheKey,
  cacheTime: number,
  data: TData,
  params?: TParams
) {
  const currentCache = cache.get(key);
  if (currentCache?.timer) {
    clearTimeout(currentCache.timer);
  }

  let timer: Timer | undefined = undefined;

  if (cacheTime > -1) {
    timer = setTimeout(() => {
      cache.delete(key);
    }, cacheTime);
  }

  if (listeners[key]) {
    listeners[key].forEach(listener => listener(data));
  }

  cache.set(key, {
    data,
    params,
    timer,
    time: new Date().getTime(),
  });
}

export function getCache<TData, TParams extends any[]>(key: CacheKey): CacheData<TData, TParams> {
  return cache.get(key) as CacheData<TData, TParams>;
}

export function subscribe<TData>(key: CacheKey, listener: Listener<TData>) {
  if (!listeners[key]) {
    listeners[key] = [];
  }
  listeners[key].push(listener);

  return () => {
    const index = listeners[key].indexOf(listener);
    listeners[key].splice(index, 1);
  };
}

export const clearCache = (key?: string | string[]) => {
  if (key) {
    const cacheKeys = Array.isArray(key) ? key : [key];
    cacheKeys.forEach(cacheKey => cache.delete(cacheKey));
  } else {
    cache.clear();
  }
};
