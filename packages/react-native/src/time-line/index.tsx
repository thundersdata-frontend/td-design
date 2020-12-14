import React, { FC, ReactElement } from 'react';
import Box from '../box';
import { FlatList } from 'react-native';
import Text from '../text';
import Flex from '../flex';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Icon from '../icon';
import { px } from '../helper';

interface TimeLineProps {
  /** 时间轴节点 */
  steps: Array<StepProps>;
}
export interface StepProps {
  /** 标题 */
  title?: string;
  /** 介绍 */
  description?: string;
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

const TimeLine: FC<TimeLineProps> = ({ steps = [] }) => {
  const theme = useTheme<Theme>();

  /** 时间轴的节点 */
  const circleRender = (isFirst: boolean) => {
    return isFirst ? (
      <Box
        width={px(16)}
        height={px(16)}
        justifyContent="center"
        alignItems="center"
        borderRadius="roundedButton"
        backgroundColor="primaryColor"
      >
        <Icon name="check" size={px(12)} color={theme.colors.white} />
      </Box>
    ) : (
      <Box width={px(8)} height={px(8)} backgroundColor="disabledBgColor" borderRadius="roundedButton"></Box>
    );
  };
  const circleAndLineVerticalRender = (isFirst: boolean, isLast: boolean, iconRender?: ReactElement) => {
    return (
      <Box style={{ alignItems: 'center', flex: 1, width: px(10) }}>
        {iconRender ? iconRender : circleRender(isFirst)}
        {!isLast && <Box style={{ width: 1, flex: 1, backgroundColor: theme.colors.disabledBgColor }} />}
      </Box>
    );
  };
  const itemRender = ({ item, index }: { item: StepProps; index: number }) => {
    return (
      <Box>
        <Flex alignItems="flex-start">
          {item.leftRender ? (
            <Box paddingRight="l" width={px(60)}>
              {item.leftRender}
            </Box>
          ) : (
            <Box paddingRight="l" width={px(60)} alignItems="flex-end">
              <Text style={theme.textVariants.primaryBody}>{item.date}</Text>
              <Text style={[theme.textVariants.secondaryBody, { color: theme.colors.borderColor }]}>{item.time}</Text>
            </Box>
          )}
          <Box>{circleAndLineVerticalRender(index === 0, index === steps.length - 1, item.iconRender)}</Box>
          {item.contentRender ? (
            item.contentRender
          ) : (
            <Box paddingLeft="l" paddingBottom="l">
              <Text style={theme.textVariants.primaryBody}>{item.title}</Text>
              <Text style={theme.textVariants.secondaryBody}>{item.description}</Text>
            </Box>
          )}
        </Flex>
      </Box>
    );
  };

  return (
    <Box style={{ flex: 1 }}>
      <FlatList data={steps} renderItem={itemRender} automaticallyAdjustContentInsets={false} />
    </Box>
  );
};

export default TimeLine;
