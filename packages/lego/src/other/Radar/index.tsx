import React, { CSSProperties, forwardRef, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { RadarSeriesOption } from 'echarts/charts';
import { TooltipComponent, TooltipComponentOption, RadarComponent } from 'echarts/components';
import Color from 'color';
import { merge } from 'lodash-es';

import createLinearGradient from '../../utils/createLinearGradient';
import useTheme from '../../hooks/useTheme';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';

type ECOption = echarts.ComposeOption<RadarSeriesOption | TooltipComponentOption>;

echarts.use([TooltipComponent, RadarComponent]);

type DataItem = { name: string; unit: string; value: string };
type IndicatorItem = { name: string; unit: string; max: string };

/** 其他1-雷达图 */
export default forwardRef<
  ReactEcharts,
  {
    seriesData: { name: string; data: DataItem[] }[];
    indicatorData: { name: string; max: string; unit: string }[];
    style: CSSProperties;
    config?: ECOption;
    inModal?: boolean;
    onEvents?: Record<string, (params?: any) => void>;
  }
>(({ seriesData, indicatorData, style, config, inModal = false, onEvents }, ref) => {
  const theme = useTheme();
  const baseChartConfig = useBaseChartConfig(inModal);
  const colors = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6].reverse().map(num => Color(theme.colors.assist200).alpha(num).string());

  const option = useMemo(
    () =>
      merge(
        {
          color: [createLinearGradient(theme.colors.primary50), createLinearGradient(theme.colors.primary300)],
          legend: {
            icon: 'roundRect',
            ...baseChartConfig.legend,
          },
          radar: {
            center: ['50%', '50%'], // 外圆的位置
            radius: '60%',
            name: {
              formatter: (_: string, indicator: IndicatorItem) => {
                return `{a|${indicator.name ?? ''}}\n{a|${indicator.max}${indicator.unit}}`;
              },
              rich: {
                a: { ...theme.typography[inModal ? 'p0' : 'p2'], color: theme.colors.gray50 },
              },
            },
            // 给一个默认值防止报错
            indicator:
              indicatorData.length > 0
                ? indicatorData
                : [
                    {
                      name: '11',
                      max: 100,
                    },
                  ],
            splitArea: {
              show: true,
              areaStyle: {
                color: colors,
              },
            },
            axisLine: {
              lineStyle: {
                color: theme.colors.assist50,
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: 'solid',
                color: theme.colors.assist200, // 分隔线颜色
                opacity: 0.2,
                width: 1, // 分隔线线宽
              },
            },
          },
          series: [
            {
              type: 'radar',
              symbolSize: 0,
              data: seriesData.map(item => ({
                value: item?.data?.map(item => item.value),
                name: item?.name,
                areaStyle: {
                  opacity: 0.3,
                },
                lineStyle: {
                  width: 2,
                },
              })),
            },
          ],
        },
        config as ECOption
      ),
    [
      theme.colors.primary50,
      theme.colors.primary300,
      theme.colors.gray50,
      theme.colors.assist50,
      theme.colors.assist200,
      theme.typography,
      baseChartConfig.legend,
      inModal,
      indicatorData,
      colors,
      seriesData,
      config,
    ]
  );

  return <ReactEcharts ref={ref} style={style} echarts={echarts} option={option} onEvents={onEvents} />;
});
