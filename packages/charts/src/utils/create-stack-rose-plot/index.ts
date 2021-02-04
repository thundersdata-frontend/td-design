/*
 * @文件描述: 堆叠玫瑰图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2021-02-03 14:02:54
 */
import { Rose, RoseOptions } from '@antv/g2plot';
import { isEmpty } from 'lodash-es';
import { PlotCreateProps, DataItem } from '../../config';
import { createSingleChart, formatMergeConfig } from '../../baseUtils/chart';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type CustomStackedRoseConfig = Merge<
  Partial<RoseOptions>,
  {
    // 是否螺旋上升且空心
    isSpiral?: boolean;
    // 扇形颜色
    color?: string | string[] | ((datum: Record<string, any>) => string);
  }
>;

/**
 * @功能描述: 获得重复的颜色数组
 * @参数: @param modelArr 模板数组，@param targetLength 目标长度
 * @返回值:
 */
export const getColorArr: (modelArr: string[], targetLength: number) => string[] = (modelArr, targetLength) => {
  if (targetLength <= modelArr.length) {
    return modelArr.slice(0, targetLength);
  }
  return modelArr.concat(getColorArr(modelArr, targetLength - modelArr.length));
};

// 格式化 Data
const stackRoseFormatData = (data: DataItem[], config?: CustomStackedRoseConfig) => {
  let currentCategory = '';
  const { xField = 'category', yField = 'value', isSpiral = false } = config || {};
  const newData = data.sort((prev, next) => {
    return `${prev[xField]}`.localeCompare(`${next[xField]}`);
  });
  const categoryNameList: string[] = [];
  const modifiedData = [...newData];
  newData.forEach((item, idx) => {
    if (currentCategory !== item[xField]) {
      modifiedData.splice(idx, 0, {
        [xField]: ' '.repeat(idx),
        value: 0,
      });
      currentCategory = `${item[xField]}`;
      categoryNameList.push(`${item[xField]}`);
    }
  });

  // 螺旋相关配置
  if (isSpiral) {
    const average =
      (data.map(item => item[yField]) as number[]).reduce((total: number, value) => {
        return total + value;
      }, 0) / data.length;
    const categoryCount = categoryNameList.length;
    categoryNameList.forEach((item, idx) => {
      modifiedData.push({
        [xField]: `${item}`,
        type: '空',
        value: 2 * average + (1.5 * (average * (idx + 1))) / categoryCount,
      });
    });
  }
  return modifiedData;
};

// 格式化 config
const stackRoseFormatConfig = (data: DataItem[], config?: CustomStackedRoseConfig) => {
  const { color, seriesField = 'type', isSpiral = false } = config || {};
  const stackCount = [...new Set(data.map(item => item[seriesField]))].length;
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
  replaceConfig?: (config: CustomStackedRoseConfig) => CustomStackedRoseConfig
) => {
  const transformedConfig = replaceConfig ? replaceConfig(config || {}) : config;
  const { xField = 'category', yField = 'value', seriesField = 'type' } = transformedConfig || {};
  const formatedData = stackRoseFormatData(data, transformedConfig);

  const formatedConfig = stackRoseFormatConfig(data, transformedConfig);
  return {
    // ...basePieConfig,
    padding: [20, 50, 50, 50],
    radius: 1,
    data: formatedData,
    yField,
    xField,
    seriesField,
    isStack: true,
    // label: {
    //   visible: false,
    //   type: 'inner',
    //   content: ({ [yField]: value }) => value,
    // },
    // legend: {
    //   ...baseLegend,
    //   text: {
    //     formatter: (txt: string) => {
    //       if (txt !== '空') {
    //         return txt;
    //       }
    //       return '';
    //     },
    //     style: { fill: themeConfig.legendColor },
    //   },
    //   marker: baseMarker,
    // },
    // tooltip: {
    //   // 显示其他数据
    //   shared: true,
    //   // custom: {
    //   //   onChange: (_dom, cfg) => {
    //   //     const { items } = cfg;
    //   //     if (items) {
    //   //       items.forEach((item, idx) => {
    //   //         if (item.data?.type === '空' || /^[ ]*$/.test(item.data?.category)) {
    //   //           items.splice(idx, 1);
    //   //         }
    //   //       });
    //   //     }
    //   //   },
    //   // },
    // },
    // sectorStyle: {
    //   stroke: 'rgba(255, 255, 255, 0)',
    //   fillOpacity: 1,
    // },
    ...formatedConfig,
  } as RoseOptions;
};

const createStackRosePlot = ({ dom, data, config, replaceConfig }: PlotCreateProps<CustomStackedRoseConfig>) => {
  const { isSpiral, color, ...restConfig } = config || {};

  const rosePlot = new Rose(
    dom,
    formatMergeConfig<RoseOptions>(getOriginConfig(data, config, replaceConfig), restConfig, replaceConfig)
  );

  rosePlot.render();
  return rosePlot;
};

export default createSingleChart<CustomStackedRoseConfig, DataItem[], Rose>(createStackRosePlot, {
  getOriginConfig,
});
