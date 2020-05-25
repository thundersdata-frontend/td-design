/*
 * @文件描述: 堆叠玫瑰图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-23 17:45:42
 */
import { StackedRose, StackedRoseConfig } from '@antv/g2plot';
import { PlotCreateProps, basePieConfig, baseLegend, baseMarker } from '../../config';

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export type CustomStackedRoseConfig = Merge<
  StackedRoseConfig,
  {
    // 是否螺旋上升且空心
    isSpiral?: boolean;
    // 扇形颜色
    color?: string | string[];
  }
>;

/**
 * @功能描述: 获得重复的颜色数组
 * @参数: @param modelArr 模板数组，@param targetLength 目标长度
 * @返回值:
 */
const getColorArr: (modelArr: string[], targetLength: number) => string[] = (
  modelArr,
  targetLength,
) => {
  if (targetLength <= modelArr.length) {
    return modelArr.slice(0, targetLength);
  }
  return modelArr.concat(getColorArr(modelArr, targetLength - modelArr.length));
};

const createRosePlot = ({ dom, data, config }: PlotCreateProps<CustomStackedRoseConfig>) => {
  const { categoryField = 'category', radiusField = 'value', isSpiral = false, color } =
    config || {};
  const newData = data.sort((prev, next) => {
    return (prev[categoryField] + '').localeCompare(next[categoryField] + '');
  });
  let currentCategory = '';
  let colorArr = ['#00BBFF', '#A13ED6', '#EC6725', '#FEB01E'];
  if (color) {
    // 转换颜色为数组
    colorArr = Array.isArray(color) ? color : [color];
  }
  const categoryNameList: string[] = [];
  const modifiedData = [...newData];
  newData.forEach((item, idx) => {
    if (currentCategory !== item[categoryField]) {
      modifiedData.splice(idx, 0, {
        [categoryField]: ' '.repeat(idx),
        value: 0,
      });
      currentCategory = item[categoryField] + '';
      categoryNameList.push(item[categoryField] + '');
    }
  });

  // 螺旋相关配置
  if (isSpiral) {
    const average =
      (data.map(item => item[radiusField]) as number[]).reduce((total: number, value) => {
        return total + value;
      }, 0) / data.length;
    const categoryCount = categoryNameList.length;
    colorArr = getColorArr(colorArr, categoryCount).concat(['rgba(255,255,255,0)']);
    categoryNameList.forEach((item, idx) => {
      modifiedData.push({
        [categoryField]: item + '',
        type: '空',
        value: 2 * average + (1.5 * (average * (idx + 1))) / categoryCount,
      });
    });
  }
  const rosePlot = new StackedRose(dom, {
    ...basePieConfig,
    padding: [20, 50, 50, 50],
    radius: 1,
    data: modifiedData,
    radiusField,
    categoryField,
    stackField: 'type',
    label: {
      visible: false,
      type: 'inner',
      content: text => text.value,
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
        style: { fill: 'rgba(255, 255, 255, 0.7)' },
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
    ...config,
    color: colorArr,
  });

  rosePlot.render();
  return rosePlot;
};
export default createRosePlot;
