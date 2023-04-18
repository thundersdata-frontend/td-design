import { ForwardedRef, MutableRefObject, useCallback, useRef } from 'react';

import { ECharts } from 'echarts';
import type ReactEcharts from 'echarts-for-react';
import EChartsReact from 'echarts-for-react';

export default function useEchartsRef(ref: ForwardedRef<ReactEcharts> | ((ref: ReactEcharts | null) => ECharts)) {
  const _echartsRef = useRef<ReactEcharts>(null);

  const echartsRef = ref
    ? (ref as MutableRefObject<ReactEcharts> | ((ref: ReactEcharts | null) => ECharts))
    : _echartsRef;
  const currentRef = useRef<EChartsReact | null>(typeof echartsRef !== 'function' ? echartsRef.current : null);

  // 如果 ref 是函数则执行
  const handleEchartsRef = useCallback((ref: ReactEcharts) => {
    // 执行传入的 ref 函数
    typeof echartsRef === 'function' && echartsRef(ref);
    if (!ref) {
      return;
    }
    // 设置当前图表实例
    currentRef.current = ref;
  }, []);

  const _ref = (typeof echartsRef === 'function' ? handleEchartsRef : echartsRef) as MutableRefObject<ReactEcharts>;

  // 获得图表实例的方法
  const getInstance = useCallback(() => _ref.current?.getEchartsInstance(), []);

  return {
    ref: _ref,
    getInstance,
  };
}
