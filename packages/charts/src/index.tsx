/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 16:46:59
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-13 11:33:26
 */

import linePlot from './utils/create-line-plot';
import columnPlot from './utils/create-column-plot';
import groupColumnPlot from './utils/create-group-column-plot';
import donutPlot from './utils/create-donut-plot';
import stackColumnPlot from './utils/create-stack-column-plot';
import rangeColumnPlot from './utils/create-range-column-plot';
import waterfallPlot from './utils/create-waterfall-plot';
import liquidPlot from './utils/create-liquid-plot';
import donutRosePlot from './utils/create-donut-rose-plot';
import customBarPlot from './utils/create-custom-bar-plot';
import stackRosePlot from './utils/create-stack-rose-plot';
import radarPlot from './utils/create-radar-plot';
import stackAreaPlot from './utils/create-stack-area-plot';
import scatterPlot from './utils/create-scatter-plot';
import customRangeBarPlot from './utils/create-custom-range-bar-plot';
import radialStackPlot from './utils/create-radial-stack-plot';
import customGroupedBarPlot from './utils/create-custom-grouped-bar-plot';

export { ChartDom } from './components';
export const createLinePlot = linePlot;
export const createColumnPlot = columnPlot;
export const createGroupColumnPlot = groupColumnPlot;
export const createDonutPlot = donutPlot;
export const createStackColumnPlot = stackColumnPlot;
export const createRangeColumnPlot = rangeColumnPlot;
export const createWaterfallPlot = waterfallPlot;
export const createLiquidPlot = liquidPlot;
export const createDonutRosePlot = donutRosePlot;
export const createCustomBarPlot = customBarPlot;
export const createStackRosePlot = stackRosePlot;
export const createRadarPlot = radarPlot;
export const createStackAreaPlot = stackAreaPlot;
export const createScatterPlot = scatterPlot;
export const createCustomRangeBarPlot = customRangeBarPlot;
export const createRadialStackPlot = radialStackPlot;
export const createCustomGroupedBarPlot = customGroupedBarPlot;

const chartUtils = {
  createLinePlot,
  createColumnPlot,
  createGroupColumnPlot,
  createDonutPlot,
  createStackColumnPlot,
  createRangeColumnPlot,
  createWaterfallPlot,
  createLiquidPlot,
  createDonutRosePlot,
  createCustomBarPlot,
  createStackRosePlot,
  createRadarPlot,
  createStackAreaPlot,
  createScatterPlot,
  createCustomRangeBarPlot,
  createRadialStackPlot,
  createCustomGroupedBarPlot,
};

export default chartUtils;
