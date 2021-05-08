/*
 * @文件描述: 雷达图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 09:57:28
 */
import { Radar, RadarOptions } from '@antv/g2plot';
import { PlotCreateProps, basePieConfig, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

/** 获得原始配置 */
const getOriginConfig = (data: DataItem[]) =>
  ({
    ...basePieConfig,
    data,
    xField: 'item',
    yField: 'score',
    seriesField: 'user',
    yAxis: {
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
  } as RadarOptions);

const createRadarPlot = ({ dom, data, config = {}, replaceConfig }: PlotCreateProps<Partial<RadarOptions>>) => {
  const radarPlot = new Radar(dom, formatMergeConfig<RadarOptions>(getOriginConfig(data), config, replaceConfig));

  radarPlot.render();
  return radarPlot;
};

export default createSingleChart<Partial<RadarOptions>, DataItem[], Radar>(createRadarPlot, {
  getOriginConfig,
});
