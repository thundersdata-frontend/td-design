import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks';

import useRequest from './index';
import { request } from './utils/testingHelper';

describe('useRequest', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  const setUp = (service: any, options: any) => renderHook(o => useRequest(service, o || options));
  let hook: RenderHookResult<any, any>;

  test('useRequest should be defined', () => {
    expect(useRequest).toBeDefined();
  });

  test('useRequest should run automatically', async () => {
    let value, success;

    const successCb = (text: string) => (success = text);
    const errorCb = jest.fn();
    const beforeCb = () => (value = 'before');
    const finallyCb = () => (value = 'finally');

    // 测试成功的场景
    hook = setUp(request, {
      onBefore: beforeCb,
      onSuccess: successCb,
      onError: errorCb,
      onFinally: finallyCb,
    });

    expect(hook.result.current.loading).toBeTruthy();
    expect(value).toEqual('before');
    expect(success).toEqual(undefined);

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(success).toEqual('success');
    expect(hook.result.current.data).toEqual('success');
    expect(value).toEqual('finally');
    expect(errorCb).toHaveBeenCalledTimes(0);
    hook.unmount();

    // 测试失败的场景
    hook = setUp(() => request(0), {
      onSuccess: successCb,
      onError: errorCb,
    });
    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.error).toEqual(new Error('fail'));
    expect(errorCb).toHaveBeenCalledTimes(1);
    hook.unmount();
  });

  test('useRequest should be triggered manually', async () => {
    hook = setUp(request, {
      manual: true,
    });

    expect(hook.result.current.loading).toBeFalsy();

    act(() => {
      hook.result.current.run(1);
    });

    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.data).toEqual('success');

    // 测试失败的场景
    act(() => {
      hook.result.current.run(0);
    });
    expect(hook.result.current.loading).toBeTruthy();
    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.error).toEqual(new Error('fail'));
    hook.unmount();
  });

  test('useRequest runAsync should work', async () => {
    let success = '',
      error;

    hook = setUp(request, {
      manual: true,
    });

    act(() => {
      hook.result.current
        .runAsync(0)
        .then((res: string) => {
          success = res;
        })
        .catch((e: Error) => {
          error = e;
        });
    });

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(success).toEqual('');
    expect(error).toEqual(new Error('fail'));

    success = '';
    error = undefined;
    act(() => {
      hook.result.current
        .runAsync(1)
        .then((res: string) => {
          success = res;
        })
        .catch((e: Error) => {
          error = e;
        });
    });

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(success).toEqual('success');
    expect(error).toBeUndefined();
    hook.unmount();
  });

  test('useRequest mutate should work', async () => {
    hook = setUp(request, {});

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.data).toEqual('success');

    act(() => {
      hook.result.current.mutate('hello');
    });
    expect(hook.result.current.data).toEqual('hello');
    hook.unmount();
  });

  test('useRequest defaultParams should work', async () => {
    hook = setUp(request, {
      defaultParams: [1, 2, 3],
    });
    expect(hook.result.current.loading).toBeTruthy();

    act(() => {
      jest.runAllTimers();
    });
    await hook.waitForNextUpdate();

    expect(hook.result.current.loading).toBeFalsy();
    expect(hook.result.current.params).toEqual([1, 2, 3]);
    expect(hook.result.current.data).toEqual('success');
    hook.unmount();
  });
});
