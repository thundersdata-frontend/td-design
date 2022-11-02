import { renderHook, act, RenderHookResult } from '@testing-library/react-hooks';
import usePagination from './index';
import { request } from './testingHelper';

type PaginationParams = { current: number; pageSize: number };

describe('usePagination', () => {
  test('usePagination should be defined', () => {
    expect(usePagination).toBeDefined();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  const setUp = (service: any, options: any) => renderHook(o => usePagination(service, o || options));
  let hook: RenderHookResult<any, any>;

  test('usePagination should run automatically', async () => {
    hook = setUp(request, {});
    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.data.list).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(hook.result.current.pagination.total).toEqual(12);
    expect(hook.result.current.pagination.current).toEqual(1);
    expect(hook.result.current.pagination.pageSize).toEqual(10);
    expect(hook.result.current.pagination.totalPage).toEqual(2);
    expect(hook.result.current.params).toEqual([{ current: 1, pageSize: 10 }]);
    hook.unmount();

    // 测试自动执行失败的场景
    hook = setUp(({ current, pageSize }: PaginationParams, fail = true) => request({ current, pageSize, fail }), {});
    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(hook.result.current.data).toBeUndefined();
  });

  test('usePagination should be triggered manually', async () => {
    hook = setUp(request, { manual: true });
    expect(hook.result.current.loading).toBeFalsy();

    act(() => {
      hook.result.current.run({ current: 1, pageSize: 10 });
    });
    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });

    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.data.list).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(hook.result.current.pagination.total).toEqual(12);
    expect(hook.result.current.pagination.current).toEqual(1);
    expect(hook.result.current.pagination.pageSize).toEqual(10);
    expect(hook.result.current.pagination.totalPage).toEqual(2);
    hook.unmount();

    // 测试失败的场景
    hook = setUp(request, { manual: true });
    expect(hook.result.current.loading).toBeFalsy();

    act(() => {
      hook.result.current.run({ fail: true, current: 1, pageSize: 10 });
    });
    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });

    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(hook.result.current.data).toBeUndefined();
  });

  test('usePagination changeCurrent should work', async () => {
    hook = setUp(request, {});
    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.data.list).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    act(() => {
      hook.result.current.pagination.changeCurrent(2);
    });

    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.data.list).toEqual([11, 12]);
    expect(hook.result.current.pagination.total).toEqual(12);
    expect(hook.result.current.pagination.totalPage).toEqual(2);
  });

  test('usePagination changePageSize should work', async () => {
    hook = setUp(request, {});
    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.data.list).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    act(() => {
      hook.result.current.pagination.changePageSize(2);
    });

    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.data.list).toEqual([1, 2]);
    expect(hook.result.current.pagination.total).toEqual(12);
    expect(hook.result.current.pagination.totalPage).toEqual(6);

    act(() => {
      hook.result.current.pagination.changeCurrent(2);
    });

    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.data.list).toEqual([3, 4]);
    expect(hook.result.current.pagination.total).toEqual(12);
    expect(hook.result.current.pagination.totalPage).toEqual(6);
  });
});
