import { renderHook, act } from '@testing-library/react-hooks';
import useBoolean from './index';

describe('useBoolean', () => {
  it('should be defined', () => {
    expect(useBoolean).toBeDefined();
  });

  it('test on methods', async () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current[0]).toBeFalsy();
    const [, { setTrue, toggle, set }] = result.current;

    act(() => {
      setTrue();
    });
    expect(result.current[0]).toBeTruthy();

    act(() => {
      toggle();
    });
    expect(result.current[0]).toBeFalsy();

    act(() => {
      toggle();
    });
    expect(result.current[0]).toBeTruthy();

    act(() => {
      set(false);
    });
    expect(result.current[0]).toBeFalsy();

    // act(() => {
    //   result.current[1].set(true);
    // });
    // expect(result.current[0]).toBe(true);

    // act(() => {
    //   // @ts-ignore
    //   result.current[1].set(0);
    // });
    // expect(result.current[0]).toBe(false);

    // act(() => {
    //   // @ts-ignore
    //   result.current[1].set('a');
    // });
    // expect(result.current[0]).toBe(true);
  });
});
