import { act, renderHook } from '@testing-library/react-hooks';

import useLayout from './index';

describe('useLayout', () => {
  it('should return default state', () => {
    const { result } = renderHook(() => useLayout());

    expect(result.current.x).toBe(0);
    expect(result.current.y).toBe(0);
    expect(result.current.width).toBe(0);
    expect(result.current.height).toBe(0);
  });

  it('should update state when layout change', () => {
    const { result } = renderHook(() => useLayout());

    act(() => {
      const layout = { x: 1, y: 2, width: 3, height: 4 };

      result.current.onLayout({ nativeEvent: { layout } });
    });

    expect(result.current.x).toBe(1);
    expect(result.current.y).toBe(2);
    expect(result.current.width).toBe(3);
    expect(result.current.height).toBe(4);
  });
});
