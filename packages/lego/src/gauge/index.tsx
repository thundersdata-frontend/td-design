import React, { CSSProperties, useCallback, useEffect, useRef } from 'react';

import color from 'color';

import useNodeBoundingRect from '../hooks/useNodeBoundingRect';
import useStyle from '../hooks/useStyle';
import useTheme from '../hooks/useTheme';

export interface GaugeProps {
  max: number;
  value: number | string;
  style?: CSSProperties;
}

/**
 * 仪表盘图
 */
export default ({ max = 100, style = {}, ...props }: GaugeProps) => {
  let value = +props.value;
  value = value > max ? max : value;
  const theme = useTheme();
  // 当前的值,保存有动画
  const valueRef = useRef(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { style: modifiedStyle } = useStyle(style);

  const containerRef = useRef<HTMLDivElement>(null);
  const rect = useNodeBoundingRect(containerRef);

  // 间隔最小单位
  const interval = max / 5;

  const lineNums = 120;
  const innerLineNums = 180;

  const canvasWidth = (rect?.width ?? 0) * 2;
  const canvasHeight = (rect?.height ?? 0) * 2;

  // 根据长宽最短的进行计算半径
  const radius = Math.min(canvasWidth, canvasHeight) / 2;

  const colorArr = [
    theme.colors.primary400[0],
    theme.colors.primary300[0],
    theme.colors.primary200[0],
    theme.colors.primary100[0],
  ];

  const lineColor = [theme.colors.primary400[0], theme.colors.primary50[1], theme.colors.primary100[0]];

  const numberColors = [
    theme.colors.primary400,
    theme.colors.primary400,
    theme.colors.primary300,
    theme.colors.primary200,
    theme.colors.primary50,
    theme.colors.primary100,
  ];

  const gradientColor = useCallback((startColor, endColor, step) => {
    const startRGB = color.rgb(startColor).array(); //转换为rgb数组模式
    const startR = startRGB[0];
    const startG = startRGB[1];
    const startB = startRGB[2];

    const endRGB = color.rgb(endColor).array();
    const endR = endRGB[0];
    const endG = endRGB[1];
    const endB = endRGB[2];

    const sR = (+endR - +startR) / step; //总差值
    const sG = (+endG - +startG) / step;
    const sB = (+endB - +startB) / step;

    const colorArr: any[] = [];

    for (let i = 0; i < step; i++) {
      //计算每一步的hex值
      const hex = color.hsl(
        'rgb(' +
          parseInt(+sR * i + +startR + '') +
          ',' +
          parseInt(+sG * i + +startG + '') +
          ',' +
          parseInt(+sB * i + +startB + '') +
          ')'
      );
      colorArr.push(hex);
    }
    return colorArr;
  }, []);

  let colorList: any[] = [];
  for (let i = 0; i < colorArr.length - 1; i++) {
    const next = colorArr[i + 1];
    const cur = colorArr[i];
    const colorStep = 40;
    colorList = colorList.concat(gradientColor(cur, next, colorStep));
  }

  const splitLine = useCallback(
    (radius: number) => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      ctx.save();

      for (let i = 0; i <= 5; i++) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        const index = Math.ceil((i / 5) * 119);
        ctx.strokeStyle = colorList[index];
        ctx.moveTo(radius * 0.9, 0);
        ctx.lineTo(radius * 0.9 + 26, 0);

        ctx.stroke();
        ctx.rotate(((Math.PI * 12) / (9 * 50)) * 10);
        ctx.closePath();
      }
      ctx.restore();
    },
    [colorList]
  );

  const drawTick = useCallback(
    (radius: number) => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      ctx.save();
      for (let i = 0; i <= lineNums; i++) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = colorList[i];

        ctx.moveTo(radius * 0.9, 0);
        ctx.lineTo(radius * 0.9 + 16, 0);
        ctx.stroke();
        //每个点的弧度,360°弧度为2π,即旋转弧度为 2π / 75
        ctx.rotate((2 * Math.PI) / innerLineNums);
        ctx.closePath();
      }
      ctx.restore();
    },
    [colorList]
  );

  const drawNumber = useCallback(
    (radius: number) => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      ctx.save();

      ctx.rotate(Math.PI / 2);
      for (let i = 0; i <= 5; i++) {
        const gradient = ctx.createLinearGradient(0, 0, 400, 0);
        gradient.addColorStop(0, numberColors[i][0]);
        gradient.addColorStop(1, numberColors[i][1]);
        ctx.fillStyle = gradient;
        ctx.font = '36px Alibaba PuHuiTi';
        ctx.textAlign = 'center';
        ctx.fillText(interval * i + '', 0, -radius * 0.8);
        ctx.rotate(((Math.PI * 12) / (9 * 50)) * 10);
      }
      ctx.restore();
    },
    [interval, numberColors]
  );

  const drawLine = useCallback(
    (radius: number) => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      let list: any[] = [];
      for (let i = 0; i < lineColor.length - 1; i++) {
        const next = lineColor[i + 1];
        const cur = lineColor[i];
        const colorStep = 150;
        list = list.concat(gradientColor(cur, next, colorStep));
      }

      //外环渐变线
      for (let i = 0; i < 300; i++) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 20;
        ctx.strokeStyle = list[i];

        ctx.arc(0, 0, (radius * 3) / 4, (60 / 45 / 300) * i * Math.PI, (60 / 45 / 300) * (i + 1.3) * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    },
    [gradientColor, lineColor]
  );

  const drawPointer = useCallback(
    (value, radius) => {
      if (!radius) {
        return;
      }
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      ctx.save();

      ctx.beginPath();
      ctx.rotate((((Math.PI * 4) / 3) * value) / max);
      ctx.moveTo(0, 4);
      ctx.lineTo(0, -4);
      ctx.lineTo(radius * 0.9 + 24, 0);

      ctx.fillStyle = '#3DE6FF';
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    },
    [max]
  );

  const drawCenter = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.beginPath();
    ctx.rotate(((Math.PI * 12) / (9 * 50)) * 0);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#3DE6FF';
    ctx.arc(0, 0, 12, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = '#3DE6FF';
    ctx.arc(0, 0, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }, []);

  const drawValue = useCallback(
    value => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      ctx.save();
      ctx.rotate((210 / 180) * Math.PI);
      ctx.fillStyle = theme.colors.gray50;
      ctx.font = '72px Roboto';
      ctx.textAlign = 'center';
      ctx.fillText(value + '', 0, 120);
      ctx.restore();
    },
    [theme.colors.gray50]
  );

  const resizeInit = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.translate(canvasWidth / 2, canvasHeight / 2);

    ctx.rotate((150 * Math.PI) / 180);
    drawTick(radius);
    splitLine(radius);
    drawNumber(radius);
    drawLine(radius);
    drawCenter();
    drawValue(valueRef.current);
    drawPointer(valueRef.current, radius);
    ctx.translate(-canvasWidth / 2, -canvasHeight / 2);
    ctx.restore();
  }, [
    canvasHeight,
    canvasWidth,
    drawCenter,
    drawLine,
    drawNumber,
    drawPointer,
    drawTick,
    drawValue,
    radius,
    splitLine,
  ]);

  const init = useCallback(() => {
    if (!radius) {
      return;
    }
    if (valueRef.current !== value) {
      if (value > valueRef.current) {
        valueRef.current += 1;
      }
      if (value < valueRef.current) {
        valueRef.current -= 1;
      }

      resizeInit();
      requestAnimationFrame(init);
    } else {
      resizeInit();
    }
  }, [radius, value, resizeInit]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div style={modifiedStyle} ref={containerRef}>
      <canvas
        ref={canvasRef}
        height={canvasHeight}
        width={canvasWidth}
        style={{ width: modifiedStyle.width, height: modifiedStyle.height }}
      ></canvas>
    </div>
  );
};
