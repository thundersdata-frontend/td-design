import React, { FC, useState } from 'react';
import { FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import { AccordionProps, Section } from './type';
import useAccordion from './useAccordion';

const { ONE_PIXEL, px } = helpers;

const Accordion: FC<AccordionProps> = ({
  sections = [],
  multiple = true,
  activeOpacity = 0.6,
  customIcon,
  accordionStyle,
  headerStyle,
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
          multiple={multiple}
          customIcon={customIcon}
          currentIndex={currentIndex}
          index={index}
          activeOpacity={activeOpacity}
          onPress={setCurrentIndex}
          headerStyle={headerStyle}
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
    Pick<AccordionProps, 'customIcon' | 'contentStyle' | 'headerStyle'> &
    Required<Pick<AccordionProps, 'multiple' | 'activeOpacity'>> & {
      currentIndex?: number;
      index: number;
      onPress: (index: number) => void;
    }
> = ({
  title,
  content,
  customIcon,
  multiple,
  currentIndex,
  index,
  activeOpacity,
  onPress,
  contentStyle,
  headerStyle,
}) => {
  const theme = useTheme<Theme>();

  const { bodyStyle, iconStyle, progress, handleLayout, handlePress } = useAccordion({
    multiple,
    currentIndex,
    index,
    onPress,
  });

  const renderTitle = () => {
    if (typeof title === 'string') {
      return (
        <Text variant="p0" color="text">
          {title}
        </Text>
      );
    }
    return title;
  };

  const renderContent = () => {
    if (typeof content === 'string')
      return (
        <Text variant="p1" selectable color="text">
          {content}
        </Text>
      );
    return content;
  };

  return (
    <Box backgroundColor={'white'} flex={1}>
      <Pressable
        activeOpacity={activeOpacity}
        onPress={handlePress}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: theme.spacing.x2,
            paddingVertical: theme.spacing.x2,
            borderBottomWidth: ONE_PIXEL,
            borderBottomColor: theme.colors.border,
            backgroundColor: theme.colors.white,
          },
          headerStyle,
        ]}
      >
        {renderTitle()}
        {customIcon ? (
          customIcon({ progress })
        ) : (
          <Animated.View style={iconStyle}>
            <SvgIcon name="down" color={theme.colors.icon} size={px(20)} />
          </Animated.View>
        )}
      </Pressable>
      <Animated.View style={[{ position: 'relative', overflow: 'hidden' }, bodyStyle]}>
        <Box position={'absolute'} collapsable={false} onLayout={handleLayout} style={contentStyle}>
          {renderContent()}
        </Box>
      </Animated.View>
    </Box>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;
