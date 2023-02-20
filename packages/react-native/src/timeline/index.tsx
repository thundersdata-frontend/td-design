import React, { FC, ReactElement } from 'react';
import { ScrollView } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import SvgIcon, { IconNames } from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';

const { px } = helpers;
const iconType: Record<string, IconNames> = {
  wait: 'clockcircleo',
  error: 'closecircleo',
  finish: 'checkcircleo',
  process: 'checkcircleo',
};

export interface TimelineStepProps {
  /** 标题 */
  title?: string;
  /** 介绍 */
  description?: string;
  /** 图标的状态 可选类型 wait error finish process */
  status?: keyof typeof iconType;
  /** 日期 */
  date?: string;
  /** 时间 */
  time?: string;
  /** 自定义icon */
  iconRender?: ReactElement;
  /** 自定义内容 */
  contentRender?: ReactElement;
  /** 自定义时间 */
  leftRender?: ReactElement;
}
export interface TimelineProps {
  /** 时间轴节点 */
  steps: Array<TimelineStepProps>;
  /** 最小高度 */
  minHeight?: number;
  /** 时间轴方向 */
  direction?: 'down' | 'up';
}

const Timeline: FC<TimelineProps> = ({ steps = [], minHeight = 20, direction = 'up' }) => {
  const theme = useTheme<Theme>();

  /** 时间轴的节点 */
  const circleRender = (isFirst: boolean, isLast: boolean, status?: string) => {
    if (status) {
      return <SvgIcon name={iconType[status]} color={theme.colors.primary200} />;
    }
    return (direction === 'up' && isFirst) || (direction === 'down' && isLast) ? (
      <SvgIcon name="checkcircle" color={theme.colors.primary200} />
    ) : (
      <Box width={px(8)} height={px(8)} backgroundColor="border" borderRadius="x1" />
    );
  };

  const circleAndLineVerticalRender = (
    isFirst: boolean,
    isLast: boolean,
    iconRender?: ReactElement,
    status?: string
  ) => {
    return (
      <Box style={{ alignItems: 'center', flex: 1, width: px(16) }}>
        <Box style={{ marginTop: 1 }}>{iconRender ? iconRender : circleRender(isFirst, isLast, status)}</Box>
        {!isLast && <Box style={{ width: 1, minHeight, flex: 1, backgroundColor: theme.colors.border }} />}
      </Box>
    );
  };

  const itemRender = ({ item, index }: { item: TimelineStepProps; index: number }) => {
    return (
      <Box key={index}>
        <Flex alignItems="flex-start">
          {item.leftRender ? (
            <Box paddingRight="x4" width={px(60)}>
              {item.leftRender}
            </Box>
          ) : (
            <Box paddingRight="x4" width={px(60)} alignItems="center">
              <Text variant="p1" color="gray500">
                {item.date}
              </Text>
              <Text variant="p1" color="gray300">
                {item.time}
              </Text>
            </Box>
          )}
          <Box>
            {circleAndLineVerticalRender(index === 0, index === steps.length - 1, item.iconRender, item.status)}
          </Box>
          {item.contentRender ? (
            item.contentRender
          ) : (
            <Box paddingLeft="x4" paddingBottom="x4">
              <Box marginBottom="x2">
                <Text variant="p0" color="gray500">
                  {item.title}
                </Text>
              </Box>
              <Text variant="p1" color="gray500">
                {item.description}
              </Text>
            </Box>
          )}
        </Flex>
      </Box>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {steps.map((item, index) => {
        return itemRender({ item, index });
      })}
    </ScrollView>
  );
};
Timeline.displayName = 'Timeline';

export default Timeline;
