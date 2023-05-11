import React, { FC, useEffect, useState } from 'react';
import { FlatList, LayoutChangeEvent, TouchableOpacity } from 'react-native';
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { AccordionProps, Section } from './type';

const { ONE_PIXEL, px } = helpers;

const Accordion: FC<AccordionProps> = ({
  sections = [],
  multiple = true,
  customIcon,
  headerHeight = px(54),
  accordionStyle,
  contentStyle,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>();

  return (
    <FlatList
      data={sections}
      keyExtractor={(_, index) => `${index}`}
      renderItem={({ item, index }) => (
        <AccordionItem
          {...item}
          headerHeight={headerHeight}
          multiple={multiple}
          customIcon={customIcon}
          currentIndex={currentIndex}
          index={index}
          onPress={setCurrentIndex}
          contentStyle={contentStyle}
        />
      )}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
      decelerationRate={'fast'}
      contentContainerStyle={accordionStyle}
      style={{ flexGrow: 0 }}
    />
  );
};

const AccordionItem: FC<
  Section &
    Pick<AccordionProps, 'customIcon' | 'contentStyle'> &
    Required<Pick<AccordionProps, 'headerHeight' | 'multiple'>> & {
      currentIndex?: number;
      index: number;
      onPress: (index: number) => void;
    }
> = ({ title, content, customIcon, multiple, headerHeight, currentIndex, index, onPress, contentStyle }) => {
  const theme = useTheme<Theme>();

  const progress = useSharedValue(0);
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const bodyHeight = useAnimatedStyle(() => {
    return {
      height: interpolate(progress.value, [0, 1], [0, bodySectionHeight]),
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ: `${mix(progress.value, 0, Math.PI)}rad`,
        },
      ],
    };
  });

  useEffect(() => {
    if (currentIndex === undefined) return;

    if (!multiple) {
      if (currentIndex !== index) {
        progress.value = withTiming(0, {
          duration: 300,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        });
      } else {
        progress.value = withTiming(1, {
          duration: 300,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        });
      }
    }
  }, [multiple, currentIndex, index, onPress]);

  const toggleButton = () => {
    onPress(index);

    if (progress.value === 0) {
      progress.value = withTiming(1, {
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    } else {
      progress.value = withTiming(0, {
        duration: 300,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    }
  };

  const renderTitle = () => {
    if (typeof title === 'string') {
      return (
        <Text variant="h2" color="gray500">
          {title}
        </Text>
      );
    }
    return title;
  };

  const renderContent = () => {
    if (typeof content === 'string')
      return (
        <Text variant="p1" color="gray500">
          {content}
        </Text>
      );
    return content;
  };

  return (
    <Box backgroundColor={'white'} flex={1} borderRadius={'x2'}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleButton}
        style={{
          height: headerHeight,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: px(12),
          borderBottomWidth: ONE_PIXEL,
          borderBottomColor: theme.colors.border,
          backgroundColor: theme.colors.background,
        }}
      >
        {renderTitle()}
        {customIcon ? (
          customIcon({ progress })
        ) : (
          <Animated.View style={iconStyle}>
            <SvgIcon name="down" color={theme.colors.icon} size={px(20)} />
          </Animated.View>
        )}
      </TouchableOpacity>
      <Animated.View style={[{ overflow: 'hidden' }, bodyHeight]}>
        <Box
          position={'absolute'}
          bottom={0}
          left={0}
          collapsable={false}
          onLayout={(e: LayoutChangeEvent) => setBodySectionHeight(e.nativeEvent.layout.height)}
          style={contentStyle}
        >
          {renderContent()}
        </Box>
      </Animated.View>
    </Box>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;
