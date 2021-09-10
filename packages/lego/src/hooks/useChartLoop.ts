import { useEffect, useRef, useState } from 'react';
import type ReactEcharts from 'echarts-for-react';
import { ECharts } from 'echarts';
import { useRAF } from './useRAF';

export default function useChartLoop(data: any[] = [], autoLoop = false, duration = 2000, seriesIndex = 0) {
  // 用来控制当前轮播到哪个
  const [currentIndex, setCurrentIndex] = useState(-1);
  // 图表实例，轮播的本质是用 currentIndex 来驱动图表实例去 dispatchAction
  const echartsRef = useRef<ReactEcharts>(null);
  const instance = echartsRef.current?.getEchartsInstance() as ECharts;

  const { raf } = useRAF();
  const timer = useRef<symbol>();

  const length = data?.length ?? 0;

  useEffect(() => {
    // 开启自动轮播，同时echarts有示例，同时有数据的情况下，才开始
    if (autoLoop && echartsRef.current && length > 1) {
      timer.current = raf.setInterval(() => {
        setCurrentIndex(index => (index === length - 1 ? 0 : index + 1));
      }, duration);
    } else {
      setCurrentIndex(-1);
      timer.current && raf.clearInterval(timer.current);
    }
  }, [autoLoop, duration, raf, length]);

  // 用 currentIndex 来驱动图表变化
  useEffect(() => {
    // 取消高亮效果
    instance?.dispatchAction({
      type: 'downplay',
    });
    // 先把提示框都隐藏
    instance?.dispatchAction({
      type: 'hideTip',
    });

    if (currentIndex > -1) {
      // 再根据 currentIndex 显示对应的提示框
      instance?.dispatchAction({
        type: 'showTip',
        seriesIndex,
        dataIndex: currentIndex,
      });

      const currentName = data[currentIndex]?.name;
      currentName &&
        instance?.dispatchAction({
          type: 'highlight',
          name: currentName,
        });
    }
  }, [currentIndex, data, instance, raf, seriesIndex]);

  return echartsRef;
}
