import useMemoizedFn from '../useMemoizedFn';
import useSafeState from '../useSafeState';

export default function useLayout() {
  const [layout, setLayout] = useSafeState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const onLayout = useMemoizedFn(e => setLayout(e.nativeEvent.layout));

  return {
    onLayout,
    ...layout,
  };
}
