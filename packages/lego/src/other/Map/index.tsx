import React, { CSSProperties, forwardRef, useLayoutEffect, useMemo, useState, useCallback, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as Echarts from 'echarts/core';
import { EChartsOption } from 'echarts';
import { LinesSeriesOption, EffectScatterSeriesOption, MapSeriesOption } from 'echarts/charts';
import { merge } from 'lodash';
import { getMapSeries } from './baseSeries';
import {
  CHINA_GEO_VALUE,
  GEO_SOURCE_URL,
  INITIAL_GEO_CODE,
  INITIAL_LINE_COLOR,
  INITIAL_MAP_NAME,
  INITIAL_POINT_COLOR,
  mapGeoDivisions,
} from './constant';
import EChartsReact from 'echarts-for-react';
import geoJson from './assets/geoSource.json';
import useStyle from '../../hooks/useStyle';
import useEchartsRef from '../../hooks/useEchartsRef';
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

interface MapInfoItem {
  name: string;
  code?: string;
  mapJson?: any;
}
interface MapChartProps {
  /** 地图行政区划 code */
  geoCode?: string;
  /** 显示地名 */
  showLabel?: boolean;
  /** 地名字体大小 */
  labelSize?: number;
  /** 是否禁用图表交互 */
  mapSilent?: boolean;
  /** 允许下钻 */
  enableDrill?: boolean;
  /** 控制缩放比例 */
  zoom?: number;
  /** 下钻后的缩放比例 */
  drilledZoom?: number;
  /** 本地地图 Json(如果传了就用本地的) */
  mapJson?: any;
  /** 点数据 */
  pointData?: { name: string; value: number[] }[];
  /** 飞线数据 */
  lineData?: {
    coords: number[][];
  }[];
  /** 点相关配置 */
  pointConfig?: Partial<EffectScatterSeriesOption>;
  /** 飞线相关配置 */
  linesConfig?: Partial<LinesSeriesOption>;
  /** 图表配置 */
  config?: Partial<EChartsOption>;
  /** map series 配置,传入对象只修改最后一层 MapSeries，传入数组可分别按顺序改变共 4 层 MapSeries */
  mapSeriesConfig?: Partial<MapSeriesOption> | Partial<MapSeriesOption>[];
  style?: CSSProperties;
  /** 返回按钮样式 */
  returnBtnStyle?: CSSProperties;
  /** 返回按钮文本 */
  returnBtnText?: string;
  onEvents?: Record<string, (params?: any) => void>;
  /** 点击下钻后的事件 */
  onDrill?: (currentTarget: MapInfoItem, mapInfoList: MapInfoItem[]) => void;
}

const MapChart = forwardRef<EChartsReact, MapChartProps>(
  (
    {
      geoCode = INITIAL_GEO_CODE,
      showLabel = false,
      mapSilent = false,
      enableDrill = false,
      labelSize = 16,
      zoom = 1.2,
      drilledZoom = 0.8,
      mapJson,
      pointData = [],
      lineData = [],
      style,
      returnBtnStyle,
      returnBtnText,
      onEvents,
      config,
      mapSeriesConfig = {},
      pointConfig,
      linesConfig,
      onDrill,
    },
    ref
  ) => {
    const { ref: echartsRef, getInstance } = useEchartsRef(ref);
    // 是否已经第一次注册地图
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [mapInfoList, setMapInfoList] = useState<MapInfoItem[]>([]);
    const { style: modifiedStyle } = useStyle(style);
    const mapName = useMemo(() => getMapName(geoCode), [geoCode]);
    const isDrilled = useMemo(() => mapInfoList.length > 1, [mapInfoList]);

    const option = useMemo(() => {
      const { name: selectedName } = mapInfoList[mapInfoList.length - 1] || {};
      const newName = selectedName || mapName;
      const modifiedZoom = !isDrilled ? zoom : drilledZoom;
      const mapSeries = getMapSeries(newName, modifiedZoom);
      const isArrayConfig = Array.isArray(mapSeriesConfig);
      const modifiedSeries = merge(
        mapSeries.map((item, idx) => {
          const name = `${newName}${idx || ''}`;
          let seriesItem = {};
          if (idx < 3) {
            seriesItem = {
              ...item,
              map: name,
            };
          } else {
            seriesItem = merge(
              {
                ...item,
                map: name,
                label: {
                  show: showLabel,
                  fontSize: labelSize,
                  color: '#fff',
                },
                silent: mapSilent,
                zoom: modifiedZoom,
              },
              !isArrayConfig ? mapSeriesConfig : {}
            );
          }
          return seriesItem;
        }) as MapSeriesOption[],
        isArrayConfig ? mapSeriesConfig : []
      );

      return merge(
        {
          series: modifiedSeries.concat([
            merge(
              {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                symbolSize: 14,
                rippleEffect: {
                  brushType: 'fill',
                },
                itemStyle: {
                  color: INITIAL_POINT_COLOR,
                },
                symbol: 'circle',
                data: pointData,
                z: 3,
                tooltip: {
                  show: true,
                },
              },
              pointConfig
            ),
            merge(
              {
                type: 'lines',
                zlevel: 2,
                effect: {
                  show: true,
                  period: 2, // 箭头指向速度，值越小速度越快
                  trailLength: 0.5, // 特效尾迹长度[0,1]值越大，尾迹越长重
                  symbol: 'arrow', // 箭头图标
                  symbolSize: 7, // 图标大小
                },
                lineStyle: {
                  color: INITIAL_LINE_COLOR,
                  width: 1, // 线条宽度
                  opacity: 0.1, // 尾迹线条透明度
                  curveness: 0.3, // 尾迹线条曲直度
                },
                data: lineData,
              },
              linesConfig
            ) as LinesSeriesOption,
          ] as MapSeriesOption[]),
          geo: {
            aspectScale: 0.75,
            roam: false,
            silent: true,
            top: 100,
            itemStyle: {
              borderColor: '#697899',
              borderWidth: 1,
              areaColor: '#103682',
              shadowColor: 'RGBA(75, 192, 255, 0.6)',
              shadowOffsetX: 6,
              shadowOffsetY: 5,
              shadowBlur: 20,
            },
            map: newName,
            zoom: modifiedZoom,
          },
        },
        config
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config, mapSeriesConfig, labelSize, lineData, mapName, mapInfoList, mapSilent, pointData, showLabel, zoom]);

    useLayoutEffect(() => {
      (async () => {
        // 使用本地 mapJson
        if (mapJson) {
          await registerCustomMap(mapName, geoCode, mapJson);
          setIsRegistered(true);
          setMapInfoList([{ name: mapName, code: geoCode, mapJson }]);
          return;
        }
        const newMapJson = await registerCustomMap(mapName, geoCode);
        if (!newMapJson) {
          return;
        }
        setMapInfoList([{ name: mapName, code: geoCode, mapJson: newMapJson }]);
        setIsRegistered(true);
      })();
    }, [geoCode, mapJson, mapName]);

    /** 重置地图 */
    const handleResetMap = useCallback(() => {
      if (!isRegistered) {
        return;
      }
      const instance = getInstance();
      if (!instance) return;
      const { code: parentCode, mapJson: parentJson } = mapInfoList[mapInfoList.length - 2];
      registerCustomMap(mapName, parentCode, parentJson);
      setMapInfoList(mapInfoList.slice(0, -1));
    }, [isRegistered, getInstance, mapInfoList, mapName]);

    /** 绑定地图下钻事件 */
    const bindDrillEvent = useCallback(() => {
      const mapInstance = getInstance();
      if (!isRegistered || !enableDrill) {
        return;
      }
      if (!mapInstance) return;
      mapInstance.on('click', function (e: any) {
        (async () => {
          const { code, mapJson: currentMapJson } = mapInfoList[mapInfoList.length - 1] || {};
          const newName = e.data?.location ?? e.name;
          if (!currentMapJson) {
            return;
          }
          const currentFeature = currentMapJson.features.find((item: any) => item.properties.name === newName);
          const { adcode = '' } = currentFeature?.properties || {};
          let currentTarget = { name: newName, code: `${adcode}`, mapJson: currentMapJson };
          // 如果跟上次选择的地区相同则返回
          if (`${adcode}` === code) {
            onDrill?.(currentTarget, mapInfoList);
            return;
          }
          // 注册子地区地图
          const result = await registerCustomMap(newName, `${adcode}`);
          if (!result) {
            onDrill?.(currentTarget, mapInfoList);
            console.error('请求下级地图信息失败');
            return;
          }
          currentTarget = { name: newName, code: `${adcode}`, mapJson: result };
          const newMapInfoList = mapInfoList.concat(currentTarget);
          onDrill?.(currentTarget, newMapInfoList);
          setMapInfoList(newMapInfoList);
        })();
      });
    }, [isRegistered, enableDrill, getInstance, mapInfoList, onDrill]);

    useEffect(() => {
      // 强制触发重新加载
      setRefreshing(true);
      requestAnimationFrame(() => {
        setRefreshing(false);
        /** 点击地图下钻 */
        bindDrillEvent();
      });
    }, [bindDrillEvent, mapInfoList]);

    return (
      <div style={modifiedStyle}>
        {isDrilled && (
          <div className="td-lego-map-return-btn" style={returnBtnStyle} onClick={handleResetMap}>
            {returnBtnText ?? '< 返回上级'}
          </div>
        )}
        {isRegistered && !refreshing && (
          <ReactEcharts
            ref={echartsRef}
            echarts={echarts}
            option={option}
            style={{ width: modifiedStyle.width, height: modifiedStyle.height }}
            onEvents={onEvents}
          />
        )}
      </div>
    );
  }
);

export default MapChart;

/** 获得地图名称 */
export const getMapName = (geoCode?: string) => {
  if (!geoCode) {
    return 'china';
  }
  const getGeoList = () => {
    const codeList: string[] = [];
    let preStr = '';
    for (let i = 0; i < geoCode.length; i += 2) {
      const codeStr = geoCode?.slice(i, i + 2);
      if (codeStr === '00') {
        break;
      }
      codeList.push(`${preStr}${codeStr}`);
      preStr += codeStr;
    }
    return codeList;
  };
  const geoNames = getGeoList();
  let currentGeoArr = mapGeoDivisions;
  let currenName = INITIAL_MAP_NAME;
  if (!geoNames || geoNames[0] === CHINA_GEO_VALUE) {
    return currenName;
  }
  for (let i = 0; i < geoNames.length; i++) {
    const newGeoObj = currentGeoArr.find(item => item.value === geoNames[i]);
    if (!newGeoObj) {
      return currenName;
    }
    currentGeoArr = newGeoObj.children || [];

    // 如果是市辖区，名称还是上一级的名称
    currenName = newGeoObj.label === '市辖区' ? currenName : newGeoObj.label;
  }
  return currenName;
};

/** 注册指定名字地图 */
const registerCustomMap = async (name: string, geoCode?: string, currentMapJson?: any) => {
  if (!name || !geoCode) {
    return;
  }
  /** 注册多层 layer 以得到层叠样式 */
  const registerMapJson = async (name: string, mapJson: any) => {
    for (let i = 0; i < 4; i++) {
      echarts.registerMap(`${name}${i || ''}`, mapJson);
    }
  };
  if (currentMapJson) {
    registerMapJson(name, currentMapJson);
    return;
  }
  try {
    const response = await fetch(`${GEO_SOURCE_URL}${geoJson[geoCode]}`);
    if (response.status !== 200) {
      throw new Error(`请求失败：${response.statusText}`);
    }
    const mapJson = await response.json();
    registerMapJson(name, mapJson);
    return mapJson;
  } catch (err) {
    console.error(err);
    return null;
  }
};
