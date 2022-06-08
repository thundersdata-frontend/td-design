/** 初始化地图名称 */
export const INITIAL_MAP_NAME = 'china';

/** 初始化行政区号 */
export const INITIAL_ADCODE = '100000';

export const AMAP_DRILL_KEY = 'dfc9eee6a8e7bff31451ce22e3689e09';

export const AMAP_DRILL_SECRET = 'ac1294b1351220044a66c1023f7d5226';

export const genAmapAdcodeUrl = (adcode = INITIAL_ADCODE, amapKey: string) =>
  `https://restapi.amap.com/v3/config/district?keywords=${adcode}&subdistrict=3&extensions=base&key=${amapKey}`;
