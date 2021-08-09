import React, { CSSProperties, useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import 'echarts-gl';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { TooltipComponent, TooltipComponentOption, GraphicComponent, GraphicComponentOption } from 'echarts/components';

import theme from '../../theme';
import basePieConfig from '../../basePieConfig';

type ECOption = echarts.ComposeOption<PieSeriesOption | TooltipComponentOption | GraphicComponentOption>;

echarts.use([TooltipComponent, PieChart, GraphicComponent]);

const colors = [
  theme.colors.primary50[0],
  theme.colors.primary100[0],
  theme.colors.primary200[0],
  theme.colors.primary300[0],
  theme.colors.primary400[0],
  theme.colors.primary500[0],
];

/** 环形立体饼图-对应Figma饼图4 */
export default ({
  seriesData,
  style,
  imgStyle,
}: {
  seriesData: { name: string; value: string; percent: number }[];
  style?: CSSProperties;
  imgStyle?: CSSProperties;
}) => {
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

    const option = getPie3D(newData, 0.7);
    return option as ECOption;
  }, [seriesData]);

  return (
    <div style={{ position: 'relative' }}>
      <img
        src={require('../../assets/img_circle_bg.webp')}
        style={{ position: 'absolute', top: -29, left: 109, width: 360, height: 300, ...imgStyle }}
      />
      <ReactEcharts style={style} echarts={echarts} option={option} />;
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
function getPie3D(pieData: string | any[], internalDiameterRatio: number) {
  const series = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  const legendData = [];
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
    endValue = startValue + series[i].pieData.value - 1;

    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;

    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      30
    );

    startValue = endValue + 1;

    legendData.push(series[i].name);
  }

  // 添加2D饼图
  series?.push({
    name: 'pie2d',
    type: 'pie',
    itemStyle: {
      opacity: 0.8,
      borderWidth: 0,
      color: 'transparent',
    },
    legendHoverLink: false,
    emphasis: { scale: false },
    label: {
      show: true,
      position: 'outside',
      padding: [10, -60, 40, -60],
      formatter: '{a|{b}}{a|{d}%}',
      align: 'left',
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
      length: 20,
      length2: 65,
      minTurnAngle: 100,
    },
    zlevel: 1,
    startAngle: 90,
    //起始角度，支持范围[0,360],
    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ['87%', '87%'],
    center: ['50%', '50%'],
    data: pieData,
  });

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  const option = {
    legend: { show: false },
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
      boxHeight: 6,
      viewControl: {
        //3d效果可以放大、旋转等，请自己去查看官方配置
        alpha: 100,
        beta: -90,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false,
        distance: 150,
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
  return option;
}
