import * as echarts from 'echarts/core';
import { genGeoMapJsonUrl, INITIAL_ADCODE } from './constant';
import chinaJson from '../assets/china';

interface AMapDistrict {
  adcode: string;
  name: string;
  level: 'country' | 'province' | 'city' | 'district';
  districts: AMapDistrict[];
}

export type DistrictInfo = Pick<AMapDistrict, 'adcode' | 'level' | 'name'> & { parent: string };

/**
 * 对高德地图返回的省市区数据进行打平处理，方便后期根据地区名字查询地区编码
 * @param districts
 */
export function formatAdcode(districts: AMapDistrict[], adcode: string) {
  const pcd: DistrictInfo[] = [];

  function _format(districts: AMapDistrict[], adcode: string) {
    districts.forEach(d => {
      pcd.push({
        parent: adcode,
        adcode: d.adcode,
        level: d.level,
        name: d.name,
      });
      if (d.districts) {
        _format(d.districts, d.adcode);
      }
    });
  }

  _format(districts, adcode);

  return pcd;
}

// 缓存地图数据
const memoizedMaps = {};

export function register(mapName: string, adcode: string, callback: () => void) {
  if (adcode === INITIAL_ADCODE) {
    echarts.registerMap('china', chinaJson as any);
    new Array(4).fill('').forEach((_, i) => {
      echarts.registerMap(`china${i}`, chinaJson as any);
    });
    callback();
  } else {
    const mapJson = memoizedMaps[mapName];
    if (mapJson) {
      echarts.registerMap(mapName, mapJson);
      new Array(4).fill('').forEach((_, i) => {
        echarts.registerMap(`${mapName}${i}`, mapJson);
      });
      callback();
    } else {
      const url = genGeoMapJsonUrl(adcode);
      fetch(url, { method: 'GET' })
        .then(res => res.json())
        .then(res => {
          memoizedMaps[mapName] = res;
          echarts.registerMap(mapName, res);
          new Array(4).fill('').forEach((_, i) => {
            echarts.registerMap(`${mapName}${i}`, res);
          });
          callback();
        });
    }
  }
}
