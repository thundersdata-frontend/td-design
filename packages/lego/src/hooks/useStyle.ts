import { CSSProperties, useMemo } from 'react';

export default function useStyle(style: CSSProperties = {}) {
  const modifiedStyle: CSSProperties = useMemo(
    () => ({
      position: 'relative',
      width: '100%',
      height: '100%',
      ...style,
    }),
    [style]
  );
  return { style: modifiedStyle };
}
