/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 廖军
 * @Date: 2020-04-27 16:46:59
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-07 16:29:26
 */

import linePlot from './utils/linePlot';
import columnPlot from './utils/columnPlot';
import groupColumnPlot from './utils/groupColumnPlot';
import donutPlot from './utils/donutPlot';
import stackColumnPlot from './utils/stackColumnPlot';
import rangeColumnPlot from './utils/rangeColumnPlot';
import waterfallPlot from './utils/waterfallPlot';
import liquidPlot from './utils/liquidPlot';
import donutRosePlot from './utils/donutRosePlot';
import customBarPlot from './utils/customBarPlot';
import stackRosePlot from './utils/stackRosePlot';
import radarPlot from './utils/radarPlot';
import stackAreaPlot from './utils/stackAreaPlot';
import scatterPlot from './utils/scatterPlot';
import customRangeBarPlot from './utils/customRangeBarPlot';
import radialStackPlot from './utils/radialStackPlot';
import customGroupedBarPlot from './utils/customGroupedBarPlot';
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
