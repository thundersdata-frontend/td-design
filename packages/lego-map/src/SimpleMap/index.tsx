import React, { CSSProperties, forwardRef, useMemo, useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import type { EChartsOption, SeriesOption } from 'echarts';
import { isArray, merge } from 'lodash-es';
import { Spin } from 'antd';

import chinaMapJson from '../assets/china';
import { generateMapLayer } from '../utils/baseSeries';
import { INITIAL_MAP_NAME } from '../utils/constant';

interface SimpleMapProps {
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

const SimpleMap = forwardRef<ReactEcharts, SimpleMapProps>(
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

    // 注册地图
    useEffect(() => {
      echarts.registerMap(mapName, mapJson);
      setTimeout(() => {
        setLoading(false);
      }, 0);
    }, [mapJson, mapName]);

    const option = useMemo(() => {
      const { series, ...restConfig } = config;
      const configSeries = isArray(series) ? series : [series];

      return merge(
        {
          backgroundColor: '',
          tooltip: {
            trigger: 'item',
          },
          geo: {
            map: mapName,
            roam: false,
            silent: true,
            top,
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
            ...generateMapLayer(mapName, top, showLabel, labelSize, silent),
            ...(configSeries as SeriesOption[]),
          ],
        },
        restConfig
      );
    }, [mapName, top, showLabel, labelSize, silent, config]);

    if (loading) return <Spin />;
    return <ReactEcharts ref={ref} echarts={echarts} option={option} onEvents={onEvents} style={style} />;
  }
);

export default SimpleMap;
