import React, { FC } from 'react';
import { LayoutChangeEvent } from 'react-native';

import { useSafeState } from '@td-design/rn-hooks';

import Box from '../box';
import helpers from '../helpers';
import Step, { StepProps } from './step';

const { px } = helpers;

export interface FlowProps {
  /** 当前的状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 步骤的数据 */
  steps?: Array<StepProps>;
  /** 全局的size*/
  size?: number;
  /** 当前的进度 */
  current?: number;
}

const Flow: FC<FlowProps> = ({ steps = [], size = px(36), current = 0, status = 'process' }) => {
  /**当前容器的宽度，用于计算线的长度 */
  const [wrapWidth, setWrapWidth] = useSafeState(0);

  /** icon或者自定义组件的总长度，用于计算线的长度 */
  const iconWidth = steps.reduce((pre, cur) => {
    const iconWidth = (cur.size ?? size) + px(4);
    return pre + iconWidth;
  }, 0);

  /** 单条线的长度 */
  const tailWidth = (wrapWidth - iconWidth) / (steps.length - 1);

  const handleLayout = (e: LayoutChangeEvent) => {
    setWrapWidth(e.nativeEvent.layout.width);
  };

  return (
    <Box flexDirection={'row'} onLayout={handleLayout}>
      {steps.map((item, i) => {
        return (
          <Step
            key={i}
            size={size}
            active={current > i}
            isCurrent={current === i + 1}
            isLast={i === steps.length - 1}
            status={current === i + 1 ? status : undefined}
            {...Object.assign(item, {
              tailWidth: tailWidth,
            })}
          />
        );
      })}
    </Box>
  );
};
Flow.displayName = 'Flow';

export default Flow;
