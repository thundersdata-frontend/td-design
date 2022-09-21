import { useMemo } from 'react';
import useRequest from '../useRequest';
import useMemoizedFn from '../useMemoizedFn';

import type { Data, PaginationOptions, Params, Service, PaginationResult } from './types';

const usePagination = <TData extends Data, TParams extends Params>(
  service: Service<TData, TParams>,
  options: PaginationOptions<TData, TParams> = {}
) => {
  const { defaultPageSize = 10, defaultCurrent = 1, ...rest } = options;

  const result = useRequest(service, {
    defaultParams: [{ current: defaultCurrent, pageSize: defaultPageSize }] as any as TParams,
    refreshDepsAction: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      changeCurrent(1);
    },
    ...rest,
  });

  const { current = 1, pageSize = defaultPageSize } = result.params[0] ?? {};

  const total = result.data?.total ?? 0;
  const totalPage = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);

  const onChange = (current: number, pageSize: number) => {
    let toPage = current <= 0 ? 1 : current;
    const toPageSize = pageSize <= 0 ? 1 : pageSize;
    const tempTotalPage = Math.ceil(total / toPageSize);

    if (toPage > tempTotalPage) {
      toPage = Math.max(1, tempTotalPage);
    }

    const [oldParams = {}, ...restParams] = result.params ?? [];

    result.run(
      {
        ...oldParams,
        current: toPage,
        pageSize: toPageSize,
      },
      ...restParams
    );
  };

  const changeCurrent = (current: number) => {
    onChange(current, pageSize);
  };

  const changePageSize = (pageSize: number) => {
    onChange(current, pageSize);
  };

  return {
    ...result,
    pagination: {
      current,
      pageSize,
      total,
      totalPage,
      onChange: useMemoizedFn(onChange),
      changeCurrent: useMemoizedFn(changeCurrent),
      changePageSize: useMemoizedFn(changePageSize),
    },
  } as PaginationResult<TData, TParams>;
};

export default usePagination;
