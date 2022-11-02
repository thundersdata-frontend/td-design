import React, { useEffect } from 'react';

export default function useNodeBoundingRect(target: React.RefObject<HTMLDivElement>): DOMRectReadOnly | null {
  const [rect, setRect] = React.useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    const el = target?.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(entries => {
      setRect(entries[0].contentRect);
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [target]);

  return rect;
}
