import React, { FC, ReactElement } from 'react';
import { useTheme } from '@shopify/restyle';
import { ScrollView } from 'react-native';
import { Theme } from '../config/theme';
import { px } from '../helper';
import Text from '../text';
import Flex from '../flex';
import Box from '../box';
import Icon from '../icon';

const iconType = {
  wait: 'clockcircleo',
  error: 'closecircleo',
  finish: 'checkcircleo',
  process: 'checkcircleo',
};

interface TimelineProps {
  /** 时间轴节点 */
  steps: Array<StepProps>;
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

const Timeline: FC<TimelineProps> = ({ steps = [], direction = 'up' }) => {
  const theme = useTheme<Theme>();

  /** 时间轴的节点 */
  const circleRender = (isFirst: boolean, isLast: boolean, status?: string) => {
    if (status) {
      return <Icon name={iconType[status]} ratio={1} size={px(16)} color={theme.colors.primaryColor} />;
    }
    return (direction === 'up' && isFirst) || (direction === 'down' && isLast) ? (
      <Icon name="checkcircleo" ratio={1} size={px(16)} color={theme.colors.primaryColor} />
    ) : (
      <Box width={px(8)} height={px(8)} backgroundColor="disabledBgColor" borderRadius="base" />
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
        {iconRender ? iconRender : circleRender(isFirst, isLast, status)}
        {!isLast && <Box style={{ width: 1, flex: 1, backgroundColor: theme.colors.disabledBgColor }} />}
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
              <Text variant="primaryBody">{item.date}</Text>
              <Text variant="secondaryBody" style={{ color: theme.colors.borderColor }}>
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
            <Box paddingLeft="l" paddingBottom="l">
              <Text variant="primaryBody">{item.title}</Text>
              <Text variant="secondaryBody">{item.description}</Text>
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
