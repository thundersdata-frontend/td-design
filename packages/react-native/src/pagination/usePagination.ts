import { useEffect } from 'react';

import { useSafeState } from '@td-design/rn-hooks';

import type { PaginationProps } from '.';

export default function usePagination({
  page = 1,
  pageSize = 10,
  total,
}: Pick<PaginationProps, 'page' | 'pageSize' | 'total'>) {
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

  return {
    current,
    setCurrent,
    totalPage,
    isFirstPage,
    isLastPage,
  };
}
