import { useCreation, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import type { PaginationProps } from '.';

export default function usePagination({
  page = 1,
  pageSize = 10,
  total,
}: Pick<PaginationProps, 'page' | 'pageSize' | 'total'>) {
  const [current, setCurrent] = useSafeState(page);
  const [totalPage, setTotalPage] = useSafeState(Math.ceil(total / pageSize));

  useUpdateEffect(() => {
    setCurrent(page);
  }, [page]);

  useUpdateEffect(() => {
    setTotalPage(Math.ceil(total / pageSize));
  }, [pageSize, total]);

  const isFirstPage = useCreation(() => current === 1, [current]);
  const isLastPage = useCreation(() => current === totalPage, [current, totalPage]);

  return {
    current,
    setCurrent,
    totalPage,
    isFirstPage,
    isLastPage,
  };
}
