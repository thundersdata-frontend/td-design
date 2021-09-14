import React, { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import 'echarts-gl';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { TooltipComponent, TooltipComponentOption, GraphicComponent, GraphicComponentOption } from 'echarts/components';
import { merge } from 'lodash-es';

import useTheme from '../../hooks/useTheme';
import useBasePieConfig from '../../hooks/useBasePieConfig';
import useBaseChartConfig from '../../hooks/useBaseChartConfig';
import { useRAF } from '../../hooks/useRAF';

import img3dBg from '../../assets/img_3d_bg.png';

type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GraphicComponentOption>;

echarts.use([TooltipComponent, PieChart, GraphicComponent]);

const BAR_WIDTH_COEFFICIENT = 0.6;

/** 3D立体饼图-对应Figma饼图2 */
export default ({
  seriesData,
  style,
  imgStyle,
  autoLoop,
  loopSpeed = 2000,
  barConfig,
  pieConfig,
  isFlat = true,
}: {
  seriesData: { name: string; value: string }[];
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  barConfig?: ECOption;
  pieConfig?: ECOption;
  autoLoop?: boolean;
  isFlat?: boolean;
  loopSpeed?: number;
}) => {
  const echartsRef = useRef<ReactEcharts>(null);
  const { raf } = useRAF();
  const theme = useTheme();
  const basePieConfig = useBasePieConfig();
  const baseChartConfig = useBaseChartConfig();
  const colors = useMemo(
    () => [
      theme.colors.primary50[0],
      theme.colors.primary100[0],
      theme.colors.primary200[0],
      theme.colors.primary300[0],
      theme.colors.primary400[0],
      theme.colors.primary500[0],
    ],
    [
      theme.colors.primary100,
      theme.colors.primary200,
      theme.colors.primary300,
      theme.colors.primary400,
      theme.colors.primary50,
      theme.colors.primary500,
    ]
  );

  const len = seriesData?.length || 0;

  const [index, setIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<string>('');

  // 生成数据
  const generateData = useCallback(
    (props: { option: any; hoveredIndex?: any; seriesIndex?: string; kCondition?: number; upCondition?: number }) => {
      const { option, hoveredIndex, kCondition = 1, upCondition = 1 } = props;
      if (!option?.series) {
        return;
      }
      const isHovered = hoveredIndex !== '' ? false : true;

      // 准备重新渲染扇形所需的参数
      const isSelected = option.series[hoveredIndex]?.pieStatus?.selected;
      const startRatio = option.series[hoveredIndex]?.pieData?.startRatio;
      const endRatio = option.series[hoveredIndex]?.pieData?.endRatio;
      const k = option.series[hoveredIndex]?.pieStatus?.k;

      // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
      option.series[hoveredIndex].parametricEquation = getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k * kCondition,
        generate3DHeight(isFlat, option.series[hoveredIndex].pieData?.value, upCondition)
      );

      if (option?.series[hoveredIndex]?.pieStatus) {
        option.series[hoveredIndex].pieStatus.hovered = isHovered;
      }
    },
    [isFlat]
  );

  const option = useMemo(() => {
    const total = seriesData
      .map((item: { value: string }) => +item.value)
      .reduce((value: number, total: number) => {
        return value + total;
      }, 0);

    const newData = seriesData.map((item: { value: string; name: string }, index: number) => {
      let value = +item.value / total;
      value = Math.ceil(value * 100);
      return { name: item.name, value, itemStyle: { color: colors[index] } };
    });

    const option = getPie3D(barConfig, pieConfig, theme, basePieConfig, baseChartConfig, newData, 0.7, isFlat);
    return option as ECOption;
  }, [seriesData, barConfig, pieConfig, theme, basePieConfig, baseChartConfig, isFlat, colors]);

  const updateData = useCallback(() => {
    const seriesIndex = index.toString();
    if (echartsRef && seriesData) {
      const myChart = echartsRef.current?.getEchartsInstance();
      if (hoveredIndex === seriesIndex) {
        return;
        // 否则进行高亮及必要的取消高亮操作
      } else {
        // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
        if (hoveredIndex !== '' && option?.series) {
          generateData({ option, hoveredIndex });
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          setHoveredIndex('');
        }
        // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
        if (option?.series) {
          generateData({
            option,
            hoveredIndex: seriesIndex,
            kCondition: BAR_WIDTH_COEFFICIENT,
            upCondition: 1.5,
          });
          setHoveredIndex(seriesIndex);
          // 记录上次高亮的扇形对应的系列号 seriesIndex
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(option);
      }
    }
  }, [generateData, hoveredIndex, index, option, seriesData]);

  useEffect(() => {
    if (!autoLoop) {
      return;
    }
    const newIndex = index + 1 === len ? 0 : index + 1;
    const interval = raf.setInterval(() => {
      setIndex(newIndex);
      updateData();
    }, loopSpeed);
    return () => raf.clearInterval(interval);
  }, [len, index, updateData, raf, autoLoop, loopSpeed]);

  // 监听鼠标事件
  useEffect(() => {
    let hoveredIndex = '';
    if (echartsRef && seriesData) {
      const myChart = echartsRef.current?.getEchartsInstance();
      myChart.on('mouseover', function (params: { seriesName: string }) {
        let seriesIndex = '0';
        const newSeries = option?.series as typeof seriesData;
        option?.series &&
          newSeries.forEach((element, index) => {
            if (params.seriesName === element.name) {
              seriesIndex = index.toString();
            }
          });
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === seriesIndex) {
          return;
        } else {
          if (hoveredIndex !== '') {
            generateData({ option, hoveredIndex });
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
            generateData({
              option,
              hoveredIndex: seriesIndex,
              kCondition: BAR_WIDTH_COEFFICIENT,
              upCondition: 1.5,
            });
          }
          hoveredIndex = hoveredIndex !== '' ? '' : seriesIndex;
          myChart.setOption(option);
        }
      });

      // 修正取消高亮失败的 bug
      myChart.on('globalout', function () {
        if (hoveredIndex !== '' && option?.series) {
          generateData({ option, hoveredIndex });
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = '';
        }
        myChart.setOption(option);
      });
    }
  }, [echartsRef, seriesData, option, isFlat, generateData]);

  return (
    <div style={{ position: 'relative', ...style }}>
      <img src={img3dBg} style={{ position: 'absolute', top: 65, left: 148, width: 260, height: 180, ...imgStyle }} />
      <ReactEcharts
        ref={echartsRef}
        style={{ width: style?.width, height: style?.height }}
        echarts={echarts}
        option={option}
      />
      ;
    </div>
  );
};

function getParametricEquation(
  startRatio: number,
  endRatio: number,
  isSelected: boolean,
  isHovered: boolean,
  k: number,
  h: number
) {
  // 计算
  const midRatio = (startRatio + endRatio) / 2;

  const startRadian = startRatio * Math.PI * 2;
  const endRadian = endRatio * Math.PI * 2;
  const midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false;
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  const hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },
    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },
    x: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u: number, v: number) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u: number, v: number) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}

// 生成模拟 3D 饼图的配置项
function getPie3D(
  barConfig: ECOption = {},
  pieConfig: ECOption = {},
  theme: any,
  basePieConfig: PieSeriesOption,
  baseChartConfig: any,
  pieData: string | any[],
  internalDiameterRatio: number,
  isFlat = true
) {
  const series: any[] = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData: any[] = [];
  const k =
    typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    const seriesItem = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false,
      },
      shading: 'realistic',
      itemStyle: {},
      pieData: pieData[i],
      parametricEquation: {},
      pieStatus: {
        selected: false,
        hovered: false,
        k: k,
      },
      zlevel: 10,
    };

    if (typeof pieData[i].itemStyle != 'undefined') {
      const itemStyle = { color: '', opacity: 1 };

      typeof pieData[i].itemStyle.color != 'undefined' ? (itemStyle.color = pieData[i].itemStyle.color) : null;
      typeof pieData[i].itemStyle.opacity != 'undefined' ? (itemStyle.opacity = pieData[i].itemStyle.opacity) : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;

    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;

    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      generate3DHeight(isFlat, series[i].pieData?.value)
    );

    startValue = endValue;
    legendData.push(series[i].name);
  }

  // 添加2D饼图
  const pieSeries = {
    name: 'pie2d',
    type: 'pie',
    itemStyle: {
      opacity: 0,
      borderWidth: 0,
      color: 'transparent',
    },
    legendHoverLink: false,
    emphasis: { scale: false },
    label: {
      show: true,
      position: 'outside',
      padding: [10, -70, 40, -80],
      formatter: '{a|{b}}{a|{d}%}',
      align: 'left',
      opacity: 1,
      rich: {
        a: {
          ...theme.typography.p2,
          color: theme.colors.gray50,
        },
      },
    },
    labelLine: {
      ...basePieConfig.labelLine,
      show: true,
      length: 50,
      length2: 90,
      minTurnAngle: 45,
      lineStyle: {
        color: theme.colors.gray50,
      },
    },
    zlevel: 1,
    startAngle: 0,
    //起始角度，支持范围[0,360],
    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ['46%', '46%'],
    center: ['50%', '58%'],
    data: pieData,
  };
  series?.push(merge(pieSeries, pieConfig));

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    legend: {
      ...baseChartConfig.legend,
      orient: 'vertical',
    },
    xAxis3D: {
      min: -1,
      max: 1,
    },
    yAxis3D: {
      min: -1,
      max: 1,
    },
    zAxis3D: {
      min: -1,
      max: 1,
    },
    grid3D: {
      show: false,
      boxHeight: 8,
      viewControl: {
        //3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 25,
        beta: 5,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false,
        distance: 140,
      },
      light: {
        ambient: {
          color: '#fff',
          intensity: 0.7,
        },
        main: {
          intensity: 0.5,
          shadow: true,
          alpha: 80,
        },
        ambientCubemap: {
          exposure: 1,
          diffuseIntensity: 0.5,
          specularIntensity: 2,
        },
      },
    },
    series: series,
  };

  const mergeOptions = merge(option, barConfig);
  return mergeOptions;
}

// 计算3d扇区高度
function generate3DHeight(isFlat: boolean, value = 30, coefficient = 1): number {
  return (isFlat ? 30 : value) * coefficient;
}
