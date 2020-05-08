/*
 * @文件描述: 南丁格尔玫瑰图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-05-07 16:03:58
 */
import { StackedRose, StackedRoseConfig } from '@antv/g2plot';
import { PlotCreateProps, basePieConfig, baseLegend, baseMarker } from '../../config';

export interface CustomStackedRoseConfig extends StackedRoseConfig {
  // 是否螺旋上升且空心
  isSpiral?: boolean;
}

/**
 * @功能描述: 获得重复的颜色数组
 * @参数: @param modelArr 模板数组，@param targetLength 目标长度
 * @返回值:
 */
const getColorArr: (modelArr: string[], targetLength: number) => string[] = (modelArr, targetLength) => {
  if (targetLength <= modelArr.length) {
    return modelArr.slice(0, targetLength);
  }
  return modelArr.concat(getColorArr(modelArr, targetLength - modelArr.length));
};

const createRosePlot = ({ dom, data, config }: PlotCreateProps<CustomStackedRoseConfig>) => {
  const { categoryField = 'category', radiusField = 'value', isSpiral = false } = config || {};
  const newData = data.sort((a, b) => {
    return (a[categoryField] + '').localeCompare(b[categoryField] + '');
  });
  let currentCategory = '';
  let colorArr = ['#00BBFF', '#A13ED6', '#EC6725', '#FEB01E'];
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
    color: colorArr,
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
      customContent: {
        callback: (_dom, cfg) => {
          const { items } = cfg;
          if (items && items.length > 0 && items[0].data?.type === '空') {
            items!.splice(0, 1);
          }
        },
      },
    },
    sectorStyle: {
      stroke: 'rgba(255, 255, 255, 0)',
      fillOpacity: 1,
    },
    ...config,
  });

  rosePlot.render();
};
export default createRosePlot;
