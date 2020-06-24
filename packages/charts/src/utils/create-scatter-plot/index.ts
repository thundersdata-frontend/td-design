/*
 * @文件描述: 单象限散点图
 * @公司: thundersdata
 * @作者: 阮旭松
 * @Date: 2020-04-27 14:53:56
 * @LastEditors: 阮旭松
 * @LastEditTime: 2020-06-24 10:49:53
 */
import { Bubble, BubbleConfig } from '@antv/g2plot';
import {
  PlotCreateProps,
  basePieConfig,
  baseMarker,
  baseXAxis,
  DataItem,
  axisStyle,
} from '../../config';
import { createSingleChart } from '../../baseUtils/chart';

export interface CustomBubbleConfig extends Partial<BubbleConfig> {
  // 格式化y轴
  yNameFormatter?: (name: number) => string;
}

// 获得日期字符串
const getDateString = (dateString: string) => {
  if (dateString.length === 8) {
    return `${dateString.slice(0, 4)}/${dateString.slice(4, 6)}/${dateString.slice(6, 8)}`;
  }
  if (dateString.length === 6) {
    return `${dateString.slice(0, 4)}/${dateString.slice(4, 6)}`;
  }
  return dateString;
};

/**
 * @功能描述: 从数据中获取最大值，最小值
 * @参数: @param: arr:number[]
 * @返回值: [最小值,最大值]
 */
const getMinMaxFromArray = (arr: number[]) => {
  const minMaxArr = [];
  if (arr && JSON.stringify(arr) !== '[]') {
    minMaxArr.push(Math.min(...arr));
    minMaxArr.push(Math.max(...arr));
    return minMaxArr;
  }
  return [0, 0];
};

// 格式化数据
const scatterFormatData = (data: DataItem[], config?: CustomBubbleConfig) => {
  const { yField = 'type', yNameFormatter } = config || {};
  return data.map(item => {
    let formatedName = item[yField];
    if (yNameFormatter) {
      formatedName = yNameFormatter(item[yField] as number);
    }
    return {
      ...item,
      color: formatedName,
    };
  });
};

// 得到格式化的图表配置
const getScatterConfig = (data: DataItem[], config?: CustomBubbleConfig) => {
  const { xField = 'date', yField = 'type', yNameFormatter } = config || {};
  const xData = data.map(item => +(item[xField] as number));
  const yData = data.map(item => +(item[yField] as number));
  const [minYData, maxYData] = getMinMaxFromArray(yData);
  const [minXData, maxXData] = getMinMaxFromArray(xData);
  return {
    xAxis: {
      visible: true,
      min: minXData - 1,
      max: maxXData + 1,
      grid: {
        visible: false,
      },
      label: {
        ...baseXAxis.label,
        // 过滤小数点和多余标签
        formatter: (arg: any) => {
          const axisNumber = +arg;
          if (
            Math.floor(axisNumber) === axisNumber &&
            axisNumber <= maxXData &&
            axisNumber >= minXData
          ) {
            return getDateString(arg);
          }
          return '';
        },
        autoRotate: true,
      },
      line: axisStyle,
    },
    yAxis: {
      min: minYData - 1,
      max: maxYData + 1,
      grid: {
        visible: false,
      },
      line: {
        visible: false,
      },
      label: {
        formatter: (arg: any) => {
          const axisNumber = +arg;
          // 过滤小数点和多余标签
          if (
            Math.floor(axisNumber) === axisNumber &&
            axisNumber <= maxYData &&
            axisNumber >= minYData
          ) {
            let formateArg = arg;
            if (yNameFormatter) {
              formateArg = yNameFormatter(axisNumber);
            }
            return formateArg;
          }
          return '';
        },
      },
    },
  };
};

const createScatterPlot = ({ dom, data, config }: PlotCreateProps<CustomBubbleConfig>) => {
  const { xField = 'date', yField = 'type', sizeField = 'value' } = config || {};
  const modifiedData = scatterFormatData(data, config);
  const scatterConfig = getScatterConfig(data, config);
  const bubblePlot = new Bubble(dom, {
    ...basePieConfig,
    data: modifiedData,
    xField,
    yField,
    sizeField,
    padding: [-20, 20, 50, 50],
    pointSize: [6, 16],
    colorField: 'color',
    color: ['#4E48DF', '#006BFF', '#00BBFF'],
    tooltip: {
      formatter: (date, type) => {
        const selectedValue = data.filter(
          item => `${item[xField]}` === `${date}` && `${item[yField]}` === `${type}`,
        )[0];
        const value =
          selectedValue && selectedValue[sizeField] ? (selectedValue[sizeField] as number) : 0;
        return { name: sizeField, value };
      },
    },
    legend: {
      marker: baseMarker,
    },
    pointStyle: {
      stroke: 'rgba(0,0,0,0)',
    },
    ...scatterConfig,
    ...config,
  });
  bubblePlot.render();
  return bubblePlot;
};

export default createSingleChart(createScatterPlot, {
  dataFormat: scatterFormatData,
  configFormat: getScatterConfig,
});
