/*
 * @文件描述: 堆叠玫瑰图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-07-04 19:49:11
 */
import { StackedRose, StackedRoseConfig } from '@antv/g2plot';
import { isEmpty } from 'lodash-es';
import {
  PlotCreateProps,
  basePieConfig,
  baseLegend,
  baseMarker,
  DataItem,
  themeConfig,
} from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type CustomStackedRoseConfig = Merge<
  Partial<StackedRoseConfig>,
  {
    // 是否螺旋上升且空心
    isSpiral?: boolean;
    // 扇形颜色
    color?: string | string[] | {};
  }
>;

/**
 * @功能描述: 获得重复的颜色数组
 * @参数: @param modelArr 模板数组，@param targetLength 目标长度
 * @返回值:
 */
export const getColorArr: (modelArr: string[], targetLength: number) => string[] = (
  modelArr,
  targetLength,
) => {
  if (targetLength <= modelArr.length) {
    return modelArr.slice(0, targetLength);
  }
  return modelArr.concat(getColorArr(modelArr, targetLength - modelArr.length));
};

// 格式化 Data
const stackRoseFormatData = (data: DataItem[], config?: CustomStackedRoseConfig) => {
  let currentCategory = '';
  const { categoryField = 'category', radiusField = 'value', isSpiral = false } = config || {};
  const newData = data.sort((prev, next) => {
    return `${prev[categoryField]}`.localeCompare(`${next[categoryField]}`);
  });
  const categoryNameList: string[] = [];
  const modifiedData = [...newData];
  newData.forEach((item, idx) => {
    if (currentCategory !== item[categoryField]) {
      modifiedData.splice(idx, 0, {
        [categoryField]: ' '.repeat(idx),
        value: 0,
      });
      currentCategory = `${item[categoryField]}`;
      categoryNameList.push(`${item[categoryField]}`);
    }
  });

  // 螺旋相关配置
  if (isSpiral) {
    const average =
      (data.map(item => item[radiusField]) as number[]).reduce((total: number, value) => {
        return total + value;
      }, 0) / data.length;
    const categoryCount = categoryNameList.length;
    categoryNameList.forEach((item, idx) => {
      modifiedData.push({
        [categoryField]: `${item}`,
        type: '空',
        value: 2 * average + (1.5 * (average * (idx + 1))) / categoryCount,
      });
    });
  }
  return modifiedData;
};

// 格式化 config
const stackRoseFormatConfig = (data: DataItem[], config?: CustomStackedRoseConfig) => {
  const { color, stackField = 'type', isSpiral = false } = config || {};
  const stackCount = [...new Set(data.map(item => item[stackField]))].length;
  let colorArr = ['#00BBFF', '#A13ED6', '#EC6725', '#FEB01E'];
  if (color && !isEmpty(color)) {
    // 转换颜色为数组
    colorArr = Array.isArray(color) ? color : ([color] as string[]);
  }
  // 螺旋相关配置
  if (isSpiral) {
    colorArr = getColorArr(colorArr, stackCount).concat(['rgba(255,255,255,0)']);
  }
  return {
    color: colorArr,
  };
};

/** 获得原始配置 */
const getOriginConfig = (
  data: DataItem[],
  config?: CustomStackedRoseConfig,
  formatConfig?: (config: CustomStackedRoseConfig) => CustomStackedRoseConfig,
) => {
  const transformedConfig = formatConfig ? formatConfig(config || {}) : config;
  const { categoryField = 'category', radiusField = 'value', stackField = 'type' } =
    transformedConfig || {};
  const formatedData = stackRoseFormatData(data, transformedConfig);

  const formatedConfig = stackRoseFormatConfig(data, transformedConfig);
  return {
    ...basePieConfig,
    padding: [20, 50, 50, 50],
    radius: 1,
    data: formatedData,
    radiusField,
    categoryField,
    stackField,
    label: {
      visible: false,
      type: 'inner',
      content: (text: { value: string }) => text.value,
    },
    legend: {
      ...baseLegend,
      text: {
        formatter: txt => {
          if (txt !== '空') {
            return txt;
          }
          return '';
        },
        style: { fill: themeConfig.legendColor },
      },
      marker: baseMarker,
    },
    tooltip: {
      // 显示其他数据
      shared: true,
      custom: {
        onChange: (_dom, cfg) => {
          const { items } = cfg;
          if (items) {
            items.forEach((item, idx) => {
              if (item.data?.type === '空' || /^[ ]*$/.test(item.data?.category)) {
                items.splice(idx, 1);
              }
            });
          }
        },
      },
    },
    sectorStyle: {
      stroke: 'rgba(255, 255, 255, 0)',
      fillOpacity: 1,
    },
    ...formatedConfig,
  } as StackedRoseConfig;
};

const createStackRosePlot = ({
  dom,
  data,
  config,
  formatConfig,
}: PlotCreateProps<CustomStackedRoseConfig>) => {
  const { isSpiral, color, ...restConfig } = config || {};

  const rosePlot = new StackedRose(
    dom,
    formatMergeConfig<StackedRoseConfig>(
      getOriginConfig(data, config, formatConfig),
      restConfig,
      formatConfig,
    ),
  );

  rosePlot.render();
  return rosePlot;
};

export default createSingleChart<CustomStackedRoseConfig, DataItem[], StackedRose>(
  createStackRosePlot,
  {
    getOriginConfig,
  },
);
