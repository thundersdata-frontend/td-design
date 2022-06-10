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

export type IndicatorItem = { name: string; unit: string; max: string };

export interface RadarProps {
  seriesData: { name: string; data: number[] }[];
  indicatorData: { name: string; max: string; unit: string }[];
  style?: CSSProperties;
  config?: ECOption;
  inModal?: boolean;
  radarColors?: [string, string][];
  onEvents?: Record<string, (params?: any) => void>;
}

/** 其他1-雷达图 */
export default forwardRef<ReactEcharts, RadarProps>(
  (
    {
      seriesData,
      indicatorData = [
        {
          name: ' ',
          max: 100,
        },
      ],
      style,
      config,
      inModal = false,
      radarColors = [],
      onEvents,
    },
    ref
  ) => {
    const theme = useTheme();
    const baseChartConfig = useBaseChartConfig(inModal);

    // 雷达图的底色（带层次感）
    const colors = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6]
      .reverse()
      .map(num => Color(theme.colors.assist200).alpha(num).string());

    const baseColors = useMemo(() => {
      if (radarColors?.length > 0 && radarColors?.length >= seriesData?.length) {
        return radarColors;
      }
      return [theme.colors.primary50, theme.colors.primary300];
    }, [radarColors, seriesData?.length, theme.colors.primary50, theme.colors.primary300]);

    const gradientColors = useMemo(() => baseColors.map(item => createLinearGradient(item)), [baseColors]);

    const option = useMemo(
      () =>
        merge(
          {
            legend: {
              ...baseChartConfig.legend,
              icon: 'circle',
              data: seriesData.map(item => item.name),
            },
            tooltip: {
              show: true,
              trigger: 'item',
              appendToBody: false,
              padding: 0,
              borderWidth: 0,
              className: 'echarts-radar-tooltip',
              formatter: (params: any) => {
                const strs = params.data.map(
                  (value: number, index: number) => `
                    <div>
                      ${params.marker}
                      ${indicatorData[index].name}： ${value} ${indicatorData[index].unit ?? ''}
                    </div>
                  `
                );
                return `
                  <div style="
                    background: linear-gradient(180deg, rgba(18, 81, 204, 0.9) 0%, rgba(12, 49, 117, 0.9) 100%);
                    border: 1px solid #017AFF;
                    color: #fff;
                    font-size: ${inModal ? '18px' : '14px'};
                    line-height: ${inModal ? '25px' : '22px'};
                    padding: 5px;
                    border-radius: 4px;
                  ">
                    <div>${params.seriesName}</div>
                    ${strs.join('')}
                  </div>
                `;
              },
            },
            radar: {
              center: ['50%', '50%'],
              radius: '70%',
              nameGap: 5,
              name: {
                formatter: (_: string, indicator: IndicatorItem) => {
                  return `{a|${indicator.name ?? ''}}\n{a|${indicator.max}${indicator.unit ?? ''}}`;
                },
                rich: {
                  a: {
                    ...theme.typography[inModal ? 'p0' : 'p2'],
                    color: theme.colors.gray50,
                  },
                },
              },
              indicator: indicatorData,
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
            series: seriesData.map((item, index) => ({
              type: 'radar',
              name: item?.name,
              data: [item?.data],
              symbol: 'circle',
              symbolSize: 10,
              itemStyle: {
                color: gradientColors[index],
                opacity: 0.6,
              },
              areaStyle: {
                color: gradientColors[index],
                opacity: 0.3,
              },
              lineStyle: {
                type: 'dashed',
                width: 1,
                color: gradientColors[index],
              },
              emphasis: {
                lineStyle: {
                  type: 'solid',
                  width: 2,
                  color: gradientColors[index],
                },
              },
            })),
          },
          config as ECOption
        ),
      [
        gradientColors,
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
  }
);
