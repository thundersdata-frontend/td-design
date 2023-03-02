import { useState } from 'react';

import { act, renderHook } from '@testing-library/react-hooks';

import useWhyDidYouUpdate from './index';

describe('useWhyDidYouUpdate', () => {
  test('should be defined', () => {
    expect(useWhyDidYouUpdate).toBeDefined();
  });

  test('useWhyDidYouUpdate should work like a charm', () => {
    console.log = jest.fn();
    const setup = () =>
      renderHook(() => {
        const [count, setCount] = useState(100);
        useWhyDidYouUpdate('UseWhyDidYouUpdateComponent', { count });
        return {
          setCount,
        };
      });

    const hook = setup();

    act(() => {
      hook.result.current.setCount(1);
    });
    expect(console.log).toHaveBeenCalledWith('[why-did-you-update]', 'UseWhyDidYouUpdateComponent', {
      count: {
        from: 100,
        to: 1,
      },
    });
  });

  it('should support component props', () => {});
});
