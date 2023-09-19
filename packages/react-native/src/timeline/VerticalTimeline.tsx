import React, { useRef } from 'react';
import { LayoutChangeEvent, ScrollView } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { useMap, useSafeState } from '@td-design/rn-hooks';

import Box from '../box';
import Flex from '../flex';
import Text from '../text';
import { Theme } from '../theme';
import { TimelineProps, TimelineStepProps } from './type';

const VerticalTimeline = ({ data, customIcon, lineStyle }: Omit<TimelineProps, 'direction'>) => {
  const titleMeasured = useRef(false);
  const [titleHeight, setTitleHeight] = useSafeState(0);

  const handleTitleLayout = (e: LayoutChangeEvent) => {
    if (!titleMeasured.current) {
      titleMeasured.current = true;
      setTitleHeight(Math.floor(e.nativeEvent.layout.height));
    }
  };

  const [_, { set, get }] = useMap();
  const handleEventLayout = (e: LayoutChangeEvent, index: number) => {
    set(index, Math.floor(e.nativeEvent.layout.height));
  };

  const renderDateAndTime = ({ date, time }: TimelineStepProps) => {
    return (
      <Box paddingLeft={'x1'} alignItems={'flex-end'}>
        <Text variant="p0" color="text" numberOfLines={1}>
          {date}
        </Text>
        <Text variant={'p2'} color="text">
          {time}
        </Text>
      </Box>
    );
  };

  const renderEvent = ({ title, description }: TimelineStepProps, index: number) => {
    return (
      <Box onLayout={e => handleEventLayout(e, index)} flex={1}>
        <Text variant="p0" color="text" onLayout={handleTitleLayout} numberOfLines={1}>
          {title}
        </Text>
        <Text variant="p2" color="text">
          {description}
        </Text>
      </Box>
    );
  };

  const renderItem = (item: TimelineStepProps, index: number) => {
    return (
      <Flex key={String(index)} alignItems="flex-start">
        {renderDateAndTime(item)}
        <CircleAndLine
          height={get(index) || 0}
          isLast={index === data.length - 1}
          titleHeight={titleHeight}
          customIcon={customIcon}
          lineStyle={lineStyle}
        />
        {renderEvent(item, index)}
      </Flex>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }} horizontal={false} showsVerticalScrollIndicator={false}>
      {data.map((item, index) => renderItem(item, index))}
    </ScrollView>
  );
};
VerticalTimeline.displayName = 'VerticalTimeline';

export default VerticalTimeline;

const CircleAndLine = ({
  height,
  isLast,
  titleHeight,
  customIcon,
  lineStyle,
}: { height: number; isLast: boolean; titleHeight: number } & Pick<TimelineProps, 'customIcon' | 'lineStyle'>) => {
  const theme = useTheme<Theme>();
  const [iconHeight, setIconHeight] = useSafeState(theme.borderRadii.x2);

  const handleLayout = (e: LayoutChangeEvent) => {
    setIconHeight(Math.floor(e.nativeEvent.layout.height));
  };

  return (
    <Box
      alignItems={'center'}
      style={{
        paddingHorizontal: theme.spacing.x2,
        top: titleHeight / 2 - iconHeight / 2,
      }}
    >
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
      {!isLast && <Box width={1} height={height} backgroundColor={'border'} style={lineStyle} />}
    </Box>
  );
};
