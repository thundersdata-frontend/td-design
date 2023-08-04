import React from 'react';
import { LayoutChangeEvent, NativeSyntheticEvent, ScrollView, TextLayoutEventData } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { useMap, useSafeState } from '@td-design/rn-hooks';

import Box from '../box';
import Flex from '../flex';
import Text from '../text';
import { Theme } from '../theme';
import { TimelineProps, TimelineStepProps } from './type';

const HorizontalTimeline = ({ data, customIcon, lineStyle }: Omit<TimelineProps, 'direction'>) => {
  const [_, { set, get }] = useMap();
  const handleDateLayout = (e: NativeSyntheticEvent<TextLayoutEventData>, index: number) => {
    const textWidth = e.nativeEvent.lines[0].width;
    set(index, Math.floor(textWidth));
  };

  const renderDateAndTime = ({ date, time }: TimelineStepProps, index: number) => {
    return (
      <Box paddingLeft={'x1'}>
        <Text variant="p0" color="gray500" numberOfLines={1} onTextLayout={e => handleDateLayout(e, index)}>
          {date}
        </Text>
        <Text variant={'p2'} color="gray500">
          {time}
        </Text>
      </Box>
    );
  };

  const renderTitleAndDescription = ({ title, description }: TimelineStepProps) => {
    return (
      <Box paddingLeft={'x1'}>
        <Text variant={'p0'} color={'gray500'}>
          {title}
        </Text>
        <Text variant={'p2'} color={'gray500'}>
          {description}
        </Text>
      </Box>
    );
  };

  const renderItem = (item: TimelineStepProps, index: number) => {
    return (
      <Box key={String(index)} maxWidth={120} marginRight={'x2'}>
        {renderDateAndTime(item, index)}
        <CircleAndLine
          width={get(index) || 0}
          isLast={index === data.length - 1}
          customIcon={customIcon}
          lineStyle={lineStyle}
        />
        {renderTitleAndDescription(item)}
      </Box>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }} horizontal showsHorizontalScrollIndicator={false}>
      {data.map((item, index) => renderItem(item, index))}
    </ScrollView>
  );
};
HorizontalTimeline.displayName = 'HorizontalTimeline';

export default HorizontalTimeline;

const CircleAndLine = ({
  isLast,
  width,
  customIcon,
  lineStyle,
}: Pick<TimelineProps, 'customIcon' | 'lineStyle'> & { isLast: boolean; width: number }) => {
  const theme = useTheme<Theme>();
  const [iconWidth, setIconWidth] = useSafeState(theme.borderRadii.x2);

  const handleLayout = (e: LayoutChangeEvent) => {
    setIconWidth(Math.floor(e.nativeEvent.layout.width));
  };

  return (
    <Flex left={width / 2 - iconWidth / 2} paddingVertical={'x1'} alignItems={'center'}>
      {customIcon ? (
        <Box backgroundColor={'white'} onLayout={handleLayout}>
          {customIcon}
        </Box>
      ) : (
        <Box
          width={theme.borderRadii.x2}
          height={theme.borderRadii.x2}
          backgroundColor="primary200"
          borderRadius="x2"
        />
      )}
      {!isLast && <Box width={120 + theme.spacing.x2} height={1} backgroundColor={'border'} style={lineStyle} />}
    </Flex>
  );
};
