declare module 'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter';

type Func = (...args: any[]) => any;

/** ==== debounce start ================================================= */
interface DebounceOptions {
  /** 超时时间，单位为毫秒 */
  wait?: number;
  /** 是否在延迟开始前调用函数 */
  leading?: boolean;
  /** 是否在延迟开始后调用函数 */
  trailing?: boolean;
}
/** ==== debounce end ================================================= */

/** ==== throttle start ================================================= */
interface ThrottleOptions {
  /** 超时时间，单位为毫秒 */
  wait?: number;
  /** 是否在延迟开始前调用函数 */
  leading?: boolean;
  /** 是否在延迟开始后调用函数 */
  trailing?: boolean;
}
/** ==== throttle end ================================================= */

/** ==== useRquest start ========================================= */
type Subscribe = () => void;
type Service<TData, TParams extends any[]> = (...args: TParams) => Promise<TData>;
type Options<TData, TParams extends any[]> = Record<string, any> & {
  manual?: boolean;

  onBefore?: (params: TParams) => void;
  onSuccess?: (data: TData, params: TParams) => void;
  onError?: (e: Error, params: TParams) => void;
  onFinally?: (params: TParams, data?: TData, e?: Error) => void;

  defaultParams?: TParams;

  refreshDeps?: DependencyList;

  loadingDelay?: number;

  pollingInterval?: number;

  pollingWhenHidden?: boolean;

  refreshOnWindowFocus?: boolean;

  focusTimespan?: number;

  debounceWait?: number;

  debounceLeading?: boolean;

  debounceTrailing?: boolean;

  debounceMaxWait?: number;

  throttleWait?: number;

  throttleLeading?: boolean;

  throttleTrailing?: boolean;

  cacheKey?: string;

  cacheTime?: number;

  staleTime?: number;
};

type DebounceRequestOptions = Pick<
  Options,
  'debounceLeading' | 'debounceTrailing' | 'debounceMaxWait' | 'debounceWait'
>;
type ThrottleRequestOptions = Pick<Options, 'throttleWait' | 'throttleLeading' | 'throttleTrailing'>;
type CacheRequestOptions = Pick<Options, 'cacheKey' | 'cacheTime' | 'staleTime'>;
type CacheKey = string | number;

type Plugins<TData, TParams extends any[]> = (
  instance: Fetch<TData, TParams>,
  options: Options<TData, TParams>
) => PluginReturn<TData, TParams>;

type PluginReturn<TData, TParams extends any[]> = {
  onBefore?: (params: TParams) =>
    | ({
        stopNow?: boolean;
        returnNow?: boolean;
      } & Partial<FetchState<TData, TParams>>)
    | void;

  onRequest?: (
    service: Service<TData, TParams>,
    params: TParams
  ) => {
    servicePromise?: Promise<TData>;
  };

  onSuccess?: (data: TData, params: TParams) => void;

  onError?: (e: Error, params: TParams) => void;

  onFinally?: (params: TParams, data?: TData, e?: Error) => void;

  onCancel?: () => void;

  onMutate?: (data: TData) => void;
};

type FetchState<TData, TParams extends any[]> = {
  loading: boolean;
  params?: TParams;
  data?: TData;
  error?: Error;
};

type Result<TData, TParams extends any[]> = {
  loading: boolean;

  data?: TData;

  error?: Error;

  params: TParams | [];

  cancel: Fetch<TData, TParams>['cancel'];

  refresh: Fetch<TData, TParams>['refresh'];

  refreshAsync: Fetch<TData, TParams>['refreshAsync'];

  run: Fetch<TData, TParams>['run'];

  runAsync: Fetch<TData, TParams>['runAsync'];

  mutate: Fetch<TData, TParams>['mutate'];
};
/** ==== useRquest end ========================================= */

type PaginationData<T> = { total: number; list: T[] };
type PaginationParams = [{ current: number; pageSize: number; [key: string]: any }, ...any[]];
type PaginationOptions<TData, TParams extends any[]> = Options<TData, TParams> & { defaultPageSize?: number };
