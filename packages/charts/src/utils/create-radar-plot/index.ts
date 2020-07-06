/*
 * @文件描述: 雷达图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 19:05:08
 */
import { Radar, RadarConfig } from '@antv/g2plot';
import { PlotCreateProps, basePieConfig, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) =>
  ({
    ...basePieConfig,
    data,
    angleField: 'item',
    radiusField: 'score',
    seriesField: 'user',
    radiusAxis: {
      grid: {
        line: {
          type: 'line',
          style: { stroke: 'rgba(0, 187, 255, 0.5)' },
        },
      },
      label: {
        visible: false,
      },
      line: {
        visible: true,
        style: {
          stroke: 'rgba(0, 234, 255, 0)',
        },
      },
    },
    angleAxis: {
      grid: {
        visible: true,
        line: {
          style: {
            stroke: 'rgba(0, 234, 255, 0.1)',
          },
        },
      },
    },
    color: ['#EC6725', '#FEB01E'],
    line: {
      visible: true,
      style: {
        opacity: 0.5,
      },
    },
    point: {
      visible: false,
      shape: 'circle',
    },
  } as RadarConfig);

const createRadarPlot = ({
  dom,
  data,
  config = {},
  replaceConfig,
}: PlotCreateProps<Partial<RadarConfig>>) => {
  const radarPlot = new Radar(
    dom,
    formatMergeConfig<RadarConfig>(getOriginConfig(data), config, replaceConfig),
  );

  radarPlot.render();
  return radarPlot;
};

export default createSingleChart<Partial<RadarConfig>, DataItem[], Radar>(createRadarPlot, {
  getOriginConfig,
});
