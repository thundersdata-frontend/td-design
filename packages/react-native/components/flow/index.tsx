import React, { FC, ReactElement, useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import Step from './step';
import { px } from '../helper';

interface StepProps {
  // 步骤的标题
  title?: string;
  // 步骤的简介
  description?: string;
  // 图标的大小
  size?: number;
  // 当前的状态
  status?: 'wait' | 'finish' | 'error';
  // 自定义的icon其中size会被覆盖建议使用size
  icon?: ReactElement;
  // 自定义组件
  stepRender?: ReactElement;
  //活动时的颜色
  processrColor?: string;
}

interface FlowProps {
  // 排列方式
  direction?: 'vertical' | 'horizontal';
  // 当前的状态
  status?: 'wait' | 'finish' | 'error';
  // 步骤的数据
  steps?: Array<StepProps>;
  // 全局的size
  size?: number;
  // 当前的进度
  current?: number;
  // 组件的高度当direction为vertical时必填,也可以给外层容器指定高度用flex填充
  height?: number;
}

const Flow: FC<FlowProps> = props => {
  const { direction = 'horizontal', steps = [], size = px(16), current = 0, status = 'finish', height } = props;

  /**当前容器的宽度，用于计算线的长度 */
  const [wrapWidth, setWrapWidth] = useState<number>(0);

  const flexDirection = direction === 'horizontal' ? 'row' : 'column';

  /** icon或者自定义组件的总长度，用于计算线的长度 */
  const iconWidth = steps.reduce((pre, cur) => {
    const iconWidth = (cur.size ?? size) + px(4);

    return pre + iconWidth;
  }, 0);

  const onLayout = (e: LayoutChangeEvent) => {
    setWrapWidth(direction === 'horizontal' ? e.nativeEvent.layout.width : e.nativeEvent.layout.height);
  };
  /** 单条线的长度 */
  const tailWidth = (wrapWidth - iconWidth) / (steps.length - 1);

  return (
    <View style={{ flexDirection: flexDirection, height: height }} onLayout={onLayout}>
      {steps.map((item, i) => {
        return (
          <Step
            key={i}
            tailWidth={tailWidth}
            last={i === steps.length - 1}
            size={size}
            active={current > i}
            status={current === i + 1 ? status : undefined}
            isCurrent={current === i + 1}
            direction={direction}
            {...item}
          ></Step>
        );
      })}
    </View>
  );
};

export default Flow;
