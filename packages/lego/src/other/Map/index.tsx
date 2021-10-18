import React, {
  CSSProperties,
  forwardRef,
  useLayoutEffect,
  useMemo,
  useState,
  useCallback,
  MutableRefObject,
  useEffect,
  useRef,
} from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { EChartsOption, ComposeOption, ECharts } from 'echarts';
import {
  LinesSeriesOption,
  MapSeriesOption,
  // 系列类型的定义后缀都为 SeriesOption
  CustomSeriesOption,
} from 'echarts/charts';
import {
  TooltipComponentOption,
  // 组件类型的定义后缀都为 ComponentOption
  GridComponentOption,
} from 'echarts/components';
import { merge } from 'lodash';
import axios from 'axios';
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
import './index.less';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<MapSeriesOption | CustomSeriesOption | TooltipComponentOption | GridComponentOption>;

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
  mapSilent?: boolean;
  /** 允许下钻 */
  enableDrill?: boolean;
  /** 控制缩放比例 */
  zoom?: number;
  /** 本地地图 Json(如果传了就用本地的) */
  mapJson?: any;
  /** 图表配置 */
  config?: ECOption;
  /** 下钻后的图表配置 */
  drilledConfig?: ECOption;
  /** 点数据 */
  pointData?: { name: string; value: number[] }[];
  /** 飞线数据 */
  lineData?: {
    coords: number[][];
  }[];
  style?: CSSProperties;
  /** 返回按钮样式 */
  returnBtnStyle?: CSSProperties;
  /** 返回按钮文本 */
  returnBtnText?: CSSProperties;
  onEvents?: Record<string, (params?: any) => void>;
}

const registeredMap: string[] = [];

const MapChart = forwardRef<EChartsReact, MapChartProps>(
  (
    {
      geoCode = INITIAL_GEO_CODE,
      showLabel = false,
      mapSilent = false,
      enableDrill = false,
      labelSize = 16,
      zoom = 1.2,
      mapJson,
      pointData = [],
      lineData = [],
      style,
      returnBtnStyle,
      returnBtnText,
      onEvents,
      config,
      drilledConfig,
    },
    ref
  ) => {
    const _echartsRef = useRef<ReactEcharts>(null);
    const echartsRef = (ref as MutableRefObject<ReactEcharts>) ?? _echartsRef;
    // 是否已经第一次注册地图
    const [isRegistered, setIsRegistered] = useState<boolean>(false);
    const { style: modifiedStyle } = useStyle(style);
    const [selectedName, setSelectedName] = useState<string>('');
    const [currentMapJson, setCurrentMapJson] = useState<any>();
    const currentNameRef = useRef<string>('');
    const mapName = useMemo(() => getMapName(geoCode), [geoCode]);

    const option = useMemo(() => {
      const mapSeries = getMapSeries(mapName, zoom);
      const modifiedSeries = mapSeries.map((item, idx) => {
        const name = `${mapName}${idx || ''}`;
        if (idx < 3) {
          return { ...item, map: name };
        }
        return {
          ...item,
          z: selectedName ? 1 : 2,
          map: name,
          label: {
            show: showLabel,
            fontSize: labelSize,
          },
          silent: mapSilent,
          zoom,
        };
      }) as MapSeriesOption[];

      return merge(
        {
          series: modifiedSeries.concat([
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
                normal: {
                  color: INITIAL_LINE_COLOR,
                  width: 1, // 线条宽度
                  opacity: 0.1, // 尾迹线条透明度
                  curveness: 0.3, // 尾迹线条曲直度
                },
              },
              data: lineData,
            } as LinesSeriesOption,
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
            map: mapName,
            zoom,
          },
        } as EChartsOption,
        !selectedName ? config : drilledConfig
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [config, labelSize, lineData, mapName, mapSilent, pointData, selectedName, showLabel, zoom]);

    useLayoutEffect(() => {
      (async () => {
        // 使用本地 mapJson
        if (mapJson) {
          await registerCustomMap(mapName, geoCode, mapJson);
          setCurrentMapJson(mapJson);
          setIsRegistered(true);
          return;
        }
        // 给未注册的地图进行注册
        if (!registeredMap.includes(mapName)) {
          const mapJson = await registerCustomMap(mapName, geoCode);
          setCurrentMapJson(mapJson);
          registeredMap.push(mapName);
        }
        setIsRegistered(true);
      })();
    }, [geoCode, mapJson, mapName]);

    /** 重置地图 */
    const handleResetMap = useCallback(() => {
      if (!isRegistered) {
        return;
      }
      const mapInstance = (echartsRef as MutableRefObject<ReactEcharts>).current?.getEchartsInstance() as ECharts;
      if (!mapInstance) return;
      registerCustomMap(mapName, geoCode, currentMapJson);
      setSelectedName('');
      currentNameRef.current = '';
    }, [isRegistered, echartsRef, mapName, geoCode, currentMapJson]);

    /** 点击地图下钻 */
    useEffect(() => {
      const mapInstance = (echartsRef as MutableRefObject<ReactEcharts>).current?.getEchartsInstance() as ECharts;
      if (!isRegistered || !enableDrill) {
        return;
      }
      if (!mapInstance) return;
      mapInstance.on('click', function (e: any) {
        (async () => {
          // 如果已选择市不再下钻
          if (currentNameRef.current || !currentMapJson) {
            return;
          }
          currentNameRef.current = e.data?.location ?? e.name;
          const currentFeature = currentMapJson.features.find(
            (item: any) => item.properties.name === currentNameRef.current
          );
          const newJson = { ...currentMapJson, features: [currentFeature] };
          // 注册子地区地图
          await registerCustomMap(mapName, geoCode, newJson);
          setSelectedName(currentNameRef.current);
        })();
      });

      return () => {
        currentNameRef.current = '';
        registerCustomMap(mapName, geoCode);
      };
    }, [currentMapJson, echartsRef, enableDrill, geoCode, isRegistered, mapName]);

    return (
      <div style={modifiedStyle}>
        {selectedName && (
          <div className="td-lego-map-return-btn" style={returnBtnStyle} onClick={handleResetMap}>
            {returnBtnText ?? '< 返回地图'}
          </div>
        )}
        {isRegistered && (
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
  const geoCodeStr = name === 'china' ? INITIAL_GEO_CODE : geoCode;
  const response = await axios(`${GEO_SOURCE_URL}${geoJson[geoCodeStr]}`);
  const { data: mapJson } = response || {};
  registerMapJson(name, mapJson);
  return mapJson;
};
