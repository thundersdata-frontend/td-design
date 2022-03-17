import React, { CSSProperties, forwardRef, useMemo, useCallback } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as Echarts from 'echarts/core';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';

import './index.less';
import { merge } from 'lodash-es';

let echarts = window.echarts as typeof Echarts;
if (!echarts) {
  echarts = Echarts;
}

export interface MapDivisions {
  value: string;
  label: string;
  children: MapDivisions[];
}

interface MapChartProps {
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

const MapChart = forwardRef<EChartsReact, MapChartProps>(({ style, onEvents, config }, ref) => {
  const option = useMemo(() => {
    return merge({}, config);
  }, [config]);

  /** 重置地图 */
  const handleResetMap = useCallback(() => {}, []);

  return (
    <div style={style}>
      <div className="td-lego-map-return-btn" onClick={handleResetMap}>
        {'< 返回上级'}
      </div>
      <ReactEcharts ref={ref} echarts={echarts} option={option} onEvents={onEvents} />
    </div>
  );
});

export default MapChart;
