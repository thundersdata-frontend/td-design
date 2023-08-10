import React, { CSSProperties, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import * as echarts from 'echarts/core';
import type { EChartsOption, SeriesOption } from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { isArray, merge } from 'lodash-es';

import { DistrictInfo, formatAdcode, register } from '../utils';
import { generate4MapLayers, generateMapLayer } from '../utils/baseSeries';
import { genAmapAdcodeUrl, INITIAL_ADCODE } from '../utils/constant';
import './index.less';

interface DrillMapProps {
  /** 初始化地图行政区号，默认为100000表示中国 */
  adcode?: string;
  /** 顶部偏移量 */
  top?: number;
  /** 地图缩放 */
  zoom?: number;
  /** 显示地名 */
  showLabel?: boolean;
  /** 地名字体大小 */
  labelSize?: number;
  /** 是否禁用图表交互 */
  silent?: boolean;
  /** 是否简单地图 */
  simple?: boolean;
  /** 允许下钻 */
  enableDrill?: boolean;
  /** 图表配置 */
  config?: Partial<EChartsOption>;
  /** 图表样式 */
  style?: CSSProperties;
  /** 图表事件 */
  onEvents?: Record<string, (params?: any) => void>;
}

const DrillMap = forwardRef<ReactEcharts, DrillMapProps>(
  (
    {
      onEvents = {},
      config = {},
      adcode = INITIAL_ADCODE,
      top = 40,
      zoom = 1,
      enableDrill = true,
      showLabel = true,
      labelSize,
      style,
      silent = false,
      simple = false,
    },
    ref
  ) => {
    const regions = useRef<DistrictInfo[]>([]);
    const [option, setOption] = useState<EChartsOption>({});
    const [selectedArea, setSelectedArea] = useState<DistrictInfo>();

    /** 调用高德地图API请求地区编码数据 */
    useEffect(() => {
      (async () => {
        const url = genAmapAdcodeUrl(adcode);
        const result = await fetch(url, {
          method: 'GET',
        });
        const res = await result.json();
        if (res && res.status === '1' && res.info === 'OK') {
          const _regions = formatAdcode(res.districts, adcode);
          regions.current = _regions;

          const currentArea = _regions.find(item => item.adcode === adcode);
          if (!currentArea) return;

          await register(currentArea.name, currentArea.adcode);
          setOption(createOption(currentArea));
        }
      })();
    }, [adcode]);

    const createOption = (selectedArea: DistrictInfo) => {
      const { series, ...restConfig } = config;
      const configSeries = isArray(series) ? series : [series].filter(Boolean);

      const mapName = selectedArea.adcode === INITIAL_ADCODE ? 'china' : selectedArea.name;
      const mapConfig: any = {
        backgroundColor: '',
        tooltip: {
          trigger: 'item',
        },
        geo: {
          show: mapName === 'china' ? true : false,
          map: 'china',
          aspectScale: 0.75,
          roam: false,
          silent: true,
          top,
          zoom,
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
          ...(simple
            ? generateMapLayer(mapName, top, zoom, showLabel, labelSize, silent)
            : generate4MapLayers(mapName, top, zoom, showLabel, labelSize, silent)),
          ...(configSeries as SeriesOption[]),
        ],
      };
      return merge(mapConfig, restConfig);
    };

    /** 返回上级地图 */
    const goBack = useCallback(async () => {
      if (!selectedArea) return;

      const currentArea = regions.current.find(item => item.adcode === selectedArea.adcode);
      const parentArea = regions.current.find(item => item.adcode === currentArea!.parent);

      if (parentArea) {
        await register(parentArea.name, parentArea.adcode);
        setOption(createOption(parentArea));
        setSelectedArea(parentArea);
      }
    }, [selectedArea]);

    /** 地图下钻 */
    const handleDrill = useCallback(
      async (params: any) => {
        if (!enableDrill) return;

        // 根据 name，找到对应的地图
        const { name } = params;
        // 首先需要根据 name 转换成对应的 adCode
        const area = regions.current?.find(item => item.name === name);

        // 判断 area 的 level
        if (area?.level === 'district' || area?.level === 'country') return;

        if (area) {
          await register(area.name, area.adcode);
          setOption(createOption(area));
          setSelectedArea(area);
        }
      },
      [enableDrill]
    );

    const events = useMemo(() => {
      if (!enableDrill) return onEvents;

      return {
        ...onEvents,
        click: handleDrill,
      };
    }, [enableDrill, onEvents, handleDrill]);

    return (
      <div className="td-lego-map-container">
        {selectedArea?.adcode && selectedArea.adcode !== adcode && selectedArea.level !== 'country' && (
          <div className="td-lego-map-return-btn" onClick={goBack}>
            {'< 返回上级'}
          </div>
        )}
        <ReactEcharts ref={ref} echarts={echarts} option={option} onEvents={events} style={style} />
      </div>
    );
  }
);

export default DrillMap;
