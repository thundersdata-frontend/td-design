import React, { CSSProperties, forwardRef, useMemo } from 'react';
import * as Echarts from 'echarts/core';
import ReactEcharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import { merge } from 'lodash-es';

import './index.less';

let echarts = window.echarts as typeof Echarts;
if (!echarts) {
  echarts = Echarts;
}

export interface MapDivisions {
  value: string;
  label: string;
  children: MapDivisions[];
}

interface BasicMapProps {
  /** 地图行政区划 code */
  geoCode?: string;
  /** 显示地名 */
  showLabel?: boolean;
  /** 地名字体大小 */
  labelSize?: number;
  /** 是否禁用图表交互 */
  silent?: boolean;
  /** 允许下钻 */
  enableDrill?: boolean;
  /** 图表配置 */
  config?: Partial<EChartsOption>;
  style?: CSSProperties;
  onEvents?: Record<string, (params?: any) => void>;
}

const BasicMap = forwardRef<ReactEcharts, BasicMapProps>(({ style, onEvents, config }, ref) => {
  const option = useMemo(() => {
    return merge({}, config);
  }, [config]);

  return <ReactEcharts ref={ref} echarts={echarts} option={option} onEvents={onEvents} style={style} />;
});

export default BasicMap;
