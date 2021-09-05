import { useRef, useEffect } from 'react';

type Props = Record<string, any>;

/**
 * 帮助开发者排查是那个属性改变导致了组件的 rerender。
 */
export default function useWhyDidYouUpdate(componentName: string, props: Props) {
  const prevProps = useRef<Props>({});

  useEffect(() => {
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: Props = {};

      allKeys.forEach(key => {
        if (prevProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        console.log('[why-did-you-update]', componentName, changedProps);
      }
    }

    prevProps.current = props;
  });
}
