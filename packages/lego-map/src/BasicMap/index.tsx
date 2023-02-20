import React, { CSSProperties, forwardRef, useEffect, useState } from 'react';

import * as echarts from 'echarts/core';
import type { EChartsOption, SeriesOption } from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { isArray, merge } from 'lodash-es';

import chinaMapJson from '../assets/china';
import { generate4MapLayers } from '../utils/baseSeries';
import { INITIAL_MAP_NAME } from '../utils/constant';

interface BasicMapProps {
  /** 地图名称 */
  mapName?: string;
  /** 图表geoJson数据 */
  mapJson?: any;
  /** 顶部偏移量 */
  top?: number;
  /** 显示地名 */
  showLabel?: boolean;
  /** 地名字体大小 */
  labelSize?: number;
  /** 是否禁用图表交互 */
  silent?: boolean;
  /** 图表配置 */
  config?: Partial<EChartsOption>;
  /** 图表样式 */
  style?: CSSProperties;
  /** 图表事件 */
  onEvents?: Record<string, (params?: any) => void>;
}

const BasicMap = forwardRef<ReactEcharts, BasicMapProps>(
  (
    {
      mapName = INITIAL_MAP_NAME,
      mapJson = chinaMapJson,
      top = 40,
      showLabel = true,
      labelSize,
      style,
      silent = false,
      onEvents,
      config = {},
    },
    ref
  ) => {
    const [loading, setLoading] = useState(true);
    const [option, setOption] = useState<any>(config);

    // 注册地图
    useEffect(() => {
      echarts.registerMap(mapName, mapJson);
      new Array(4).fill('').forEach((_, i) => {
        echarts.registerMap(`${mapName}${i}`, mapJson);
      });
      const { series, ...restConfig } = config;
      const configSeries = isArray(series) ? series : [series];
      setOption(
        merge(
          {
            backgroundColor: '',
            tooltip: {
              trigger: 'item',
            },
            geo: {
              map: mapName,
              aspectScale: 0.75,
              roam: false,
              silent: true,
              top,
              itemStyle: {
                borderColor: '#697899',
                borderWidth: 1,
                areaColor: '#103682',
                shadowColor: 'RGBA(75, 192, 255, 0.6)',
                shadowOffsetX: 6,
                shadowOffsetY: 5,
                shadowBlur: 20,
              },
              regions: [
                {
                  name: '南海诸岛',
                  itemStyle: {
                    areaColor: '#103682',
                    borderColor: 'RGBA(75, 192, 255, 0.6)',
                  },
                  label: {
                    show: true,
                    color: '#fff',
                  },
                },
              ],
            },
            series: [
              ...generate4MapLayers(mapName, top, showLabel, labelSize, silent),
              ...(configSeries as SeriesOption[]),
            ],
          },
          restConfig
        )
      );
      setLoading(false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [labelSize, mapJson, mapName, showLabel, silent, top, JSON.stringify(config)]);

    return (
      <ReactEcharts
        ref={ref}
        showLoading={loading}
        echarts={echarts}
        option={option}
        onEvents={onEvents}
        style={style}
      />
    );
  }
);

export default BasicMap;
