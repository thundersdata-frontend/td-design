import classNames from 'classnames';
import React, { CSSProperties, forwardRef, useImperativeHandle, useRef } from 'react';
import { useCountUp } from 'react-countup';

import './index.less';

export interface FlipNumberProps {
  auto?: boolean;
  decimals?: number; // 要显示的小数位数
  delay?: number; // 开始转换前的延迟（以秒为单位）
  duration?: number; // 持续时间（以秒为单位）
  preserveValue?: number; // 保存先前结束的数字以从中开始每个新动画
  separator?: string; // 指定千位分隔符的字符
  start: number; // 开始值
  end: number; // 目标值
  useEasing?: boolean; // 启用缓动。设置false为线性过渡
  formattingFn?: (value: number) => string; // 自定义数字格式的功能
  onEnd?: () => void; // 过渡结束时的回调函数
  onStart?: () => void; // 转换开始时的回调函数
  onPause?: () => void; // 暂停或恢复时的回调函数
  onReset?: () => void; // 复位时的回调函数
  onUpdate?: () => void; // 更新回调函数
  style?: CSSProperties; // 容器样式
  className?: string;
}

interface FlipNumberRef {
  pause: () => void; // 暂停或恢复过渡
  reset: () => void; //重置为初始值
  start: () => void; // 开始或重新开始过渡
  update: (newEnd: number) => void; //更新过渡到新的结束值（如果给定）
}

const FlipNumber = forwardRef<FlipNumberRef, FlipNumberProps>((props, ref) => {
  const { style = {}, className = '', duration = 3, ...res } = props;

  const countUpRef = useRef(null);
  const {
    start,
    update,
    pauseResume: pause,
    reset,
  } = useCountUp({
    ref: countUpRef,
    duration,
    ...res,
  });

  useImperativeHandle(ref, () => ({
    start,
    update,
    pause,
    reset,
  }));

  return <div ref={countUpRef} className={classNames('wrap', `${className}`)} style={style}></div>;
});

export default FlipNumber;
