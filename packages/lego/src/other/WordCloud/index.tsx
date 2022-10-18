import React, { forwardRef, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { merge } from 'lodash-es';
import 'echarts-wordcloud';

export interface WordCloudProps {
  data: { name: string; value: number }[];
  width?: number;
  height?: number;
  config?: any;
  onEvents?: Record<string, (params?: any) => void>;
}

/**
 * 词云图，对应Figma其他图8
 */
export default forwardRef<ReactEcharts, WordCloudProps>(
  ({ data, width = 469, height = 227, config, onEvents }, ref) => {
    const option = useMemo(() => {
      return merge(
        {
          series: [
            {
              type: 'wordCloud',
              // 词云宽高
              width,
              height,
              // 词云形状
              shape: 'diamond',
              // 文字之间的间隔
              gridSize: 2,
              // 词云里文字大小区间
              sizeRange: [12, 38],
              // 词云里文字旋转区间
              rotationRange: [-90, 90],
              rotationStep: 45,
              // 是否允许文字超出canvas范围
              drawOutOfBound: false,
              layoutAnimation: true,
              // 文字样式
              textStyle: {
                color: function () {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(',') +
                    ')'
                  );
                },
              },
              data,
            },
          ],
        },
        config
      );
    }, [data, height, width, config]);

    return <ReactEcharts ref={ref} echarts={echarts} option={option} style={{ width, height }} onEvents={onEvents} />;
  }
);
