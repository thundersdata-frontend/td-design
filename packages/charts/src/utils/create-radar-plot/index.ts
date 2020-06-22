/*
 * @文件描述: 雷达图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-22 10:12:29
 */
import { Radar, RadarConfig } from '@antv/g2plot';
import { PlotCreateProps, basePieConfig } from '../../config';
import { createSingleChart } from '../../baseUtils/chart';

const createRadarPlot = ({ dom, data, config }: PlotCreateProps<Partial<RadarConfig>>) => {
  const radarPlot = new Radar(dom, {
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
    ...config,
  });
  radarPlot.render();
  return radarPlot;
};

export default createSingleChart(createRadarPlot);
