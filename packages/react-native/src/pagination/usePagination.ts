import { useEffect } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { PaginationProps } from '.';

export default function usePagination({
  page = 1,
  pageSize = 10,
  total,
  onChange,
}: Pick<PaginationProps, 'page' | 'pageSize' | 'total' | 'onChange'>) {
  const [current, setCurrent] = useSafeState(page);
  const [totalPage, setTotalPage] = useSafeState(Math.ceil(total / pageSize));

  useEffect(() => {
    setCurrent(page);
  }, [page]);

  useEffect(() => {
    setTotalPage(Math.ceil(total / pageSize));
  }, [pageSize, total]);

  const isFirstPage = current === 1;
  const isLastPage = current === totalPage;

  /** 前一页 */
  const prev = () => {
    const perPage = current - 1;
    setCurrent(perPage);
    onChange?.(perPage);
  };

  /** 后一页 */
  const next = () => {
    const nextPage = current + 1;
    setCurrent(nextPage);
    onChange?.(nextPage);
  };

  return {
    current,
    totalPage,
    isFirstPage,
    isLastPage,

    prev: useMemoizedFn(prev),
    next: useMemoizedFn(next),
  };
}
