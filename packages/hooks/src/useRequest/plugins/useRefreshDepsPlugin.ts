import { DependencyList } from 'react';
import useUpdateEffect from '../../useUpdateEffect';
import Fetch from '../Fetch';

export function useRefreshDepsPlugin<TData, TParams extends any[]>(
  fetchInstance: Fetch<TData, TParams>,
  { manual, refreshDeps = [] }: { manual?: boolean; refreshDeps: DependencyList }
) {
  useUpdateEffect(() => {
    if (!manual) {
      fetchInstance.refresh();
    }
  }, [...refreshDeps]);

  return {};
}
