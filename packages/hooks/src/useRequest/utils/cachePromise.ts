type CacheKey = string | number;

const cachePromise = new Map<CacheKey, Promise<any>>();

export const getCachePromise = (cacheKey: CacheKey) => cachePromise.get(cacheKey);

export const setCachePromise = (cacheKey: CacheKey, promise: Promise<any>) => {
  cachePromise.set(cacheKey, promise);
  promise.finally(() => {
    cachePromise.delete(cacheKey);
  });
};
