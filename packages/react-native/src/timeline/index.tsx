import React, { FC, ReactElement } from 'react';
import { useTheme } from '@shopify/restyle';
import { ScrollView } from 'react-native';
import { Theme } from '../theme';
import helpers from '../helpers';
import Text from '../text';
import Flex from '../flex';
import Box from '../box';
import Icon from '../icon';

const { px } = helpers;
const iconType = {
  wait: 'clockcircleo',
  error: 'closecircleo',
  finish: 'checkcircleo',
  process: 'checkcircleo',
};

interface TimelineProps {
  /** 时间轴节点 */
  steps: Array<StepProps>;
  /** 最小高度 */
  minHeight?: number;
  /** 时间轴方向 */
  direction?: 'down' | 'up';
}

export interface StepProps {
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

const Timeline: FC<TimelineProps> = ({ steps = [], minHeight = 20, direction = 'up' }) => {
  const theme = useTheme<Theme>();

  /** 时间轴的节点 */
  const circleRender = (isFirst: boolean, isLast: boolean, status?: string) => {
    if (status) {
      return <Icon name={iconType[status]} ratio={1} size={px(16)} color={theme.colors.timeline_icon} />;
    }
    return (direction === 'up' && isFirst) || (direction === 'down' && isLast) ? (
      <Icon name="checkcircleo" ratio={1} size={px(16)} color={theme.colors.timeline_icon} />
    ) : (
      <Box width={px(8)} height={px(8)} backgroundColor="timeline_line_background" borderRadius="base" />
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
        {!isLast && (
          <Box style={{ width: 1, minHeight, flex: 1, backgroundColor: theme.colors.timeline_line_background }} />
        )}
      </Box>
    );
  };

  const itemRender = ({ item, index }: { item: StepProps; index: number }) => {
    return (
      <Box key={index}>
        <Flex alignItems="flex-start">
          {item.leftRender ? (
            <Box paddingRight="l" width={px(60)}>
              {item.leftRender}
            </Box>
          ) : (
            <Box paddingRight="l" width={px(60)} alignItems="flex-end">
              <Text variant="date2">{item.date}</Text>
              <Text variant="number4">{item.time}</Text>
            </Box>
          )}
          <Box>
            {circleAndLineVerticalRender(index === 0, index === steps.length - 1, item.iconRender, item.status)}
          </Box>
          {item.contentRender ? (
            item.contentRender
          ) : (
            <Box paddingLeft="l" paddingBottom="l">
              <Box marginBottom="s">
                <Text variant="content1">{item.title}</Text>
              </Box>
              <Text variant="content3">{item.description}</Text>
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

export default Timeline;
