import chinaDivisions from './china-divisions';
import { MapDivisions } from './index';

// 中国全国地图的 Geo 值
export const CHINA_GEO_VALUE = '10';

// 地图选择区域
export const mapGeoDivisions = ([{ label: '全国', value: CHINA_GEO_VALUE, children: [] }] as MapDivisions[]).concat(
  chinaDivisions
);

/** 地图资源地址 */
export const GEO_SOURCE_URL = 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/';

/** 初始化点颜色 */
export const INITIAL_POINT_COLOR = 'rgba(250,238,140,0.6)';
/** 初始化飞线颜色 */
export const INITIAL_LINE_COLOR = '#1DE9B6';

/** 初始化地图名称 */
export const INITIAL_MAP_NAME = 'china';
/** 初始化地图 code 值 */
export const INITIAL_GEO_CODE = '100000';
