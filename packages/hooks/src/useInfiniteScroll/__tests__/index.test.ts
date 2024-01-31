import { useState } from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import { sleep } from '../../utils/testHelpers';
import useInfiniteScroll from '../index';

async function mockRequest({ page, pageSize }: { page: number; pageSize: number }) {
  await sleep(1000);
  return {
    page,
    pageSize,
    total: 30,
    list: Array(10)
      .fill('')
      .map((_, index) => ({ id: (page - 1) * pageSize + index, name: `Cell${(page - 1) * pageSize + index}` })),
  };
}

const setup = (service, options?: any) => renderHook(() => useInfiniteScroll(service, options));

describe('useInfiniteScroll', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should auto load', async () => {
    const { result } = setup(mockRequest);
    expect(result.current.loading).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loading).toBeFalsy();
  });

  it('loadMore should work', async () => {
    const { result } = setup(mockRequest);
    expect(result.current.loading).toBeTruthy();

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.loadingMore).toBeTruthy();
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.loadingMore).toBeFalsy();
  });

  it('refresh should work', async () => {
    const fn = jest.fn(() => Promise.resolve({ list: [] }));
    const { result } = setup(fn);
    const { refresh } = result.current;
    expect(fn).toBeCalledTimes(1);
    await act(async () => {
      refresh();
    });
    expect(fn).toBeCalledTimes(2);
  });

  it('refresh should be triggered when refreshDeps change', async () => {
    const fn = jest.fn(() => Promise.resolve({ list: [], page: 1, pageSize: 10, total: 30 }));
    const { result } = renderHook(() => {
      const [value, setValue] = useState('');
      const res = useInfiniteScroll(fn, {
        refreshDeps: [value],
      });
      return {
        ...res,
        setValue,
      };
    });
    expect(fn).toBeCalledTimes(1);
    act(() => {
      result.current.setValue('ahooks');
    });
    expect(fn).toBeCalledTimes(2);
  });

  it('cancel should be work', () => {
    const onSuccess = jest.fn();
    const { result } = setup(mockRequest, {
      onSuccess,
    });
    const { cancel } = result.current;
    expect(result.current.loading).toBe(true);
    act(() => cancel());
    expect(result.current.loading).toBe(false);
    expect(onSuccess).not.toBeCalled();
  });

  it('onBefore/onSuccess/onFinally should be called', async () => {
    const onBefore = jest.fn();
    const onSuccess = jest.fn();
    const onFinally = jest.fn();
    const { result } = setup(mockRequest, {
      onBefore,
      onSuccess,
      onFinally,
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(onBefore).toBeCalled();
    expect(onSuccess).toBeCalled();
    expect(onFinally).toBeCalled();
  });

  it('onError should be called when throw error', async () => {
    const onError = jest.fn();
    const mockRequestError = () => {
      return Promise.reject('error');
    };
    setup(mockRequestError, {
      onError,
    });
    await act(async () => {
      Promise.resolve();
    });
    expect(onError).toBeCalled();
  });

  it('loading should be true when refresh after loadMore', async () => {
    const { result } = setup(mockRequest);
    expect(result.current.loading).toBeTruthy();
    const { refresh, loadMore } = result.current;
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBeFalsy();

    act(() => {
      loadMore();
      refresh();
    });
    expect(result.current.loading).toBeTruthy();

    await act(async () => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.loading).toBeFalsy();
  });
});
