import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import { Theme } from '../theme';
import Panel, { sectionHeaderHeight } from './Panel';
import { AccordionProps, Section } from './type';

const { ONE_PIXEL } = helpers;

const Accordion: FC<AccordionProps> = ({
  sections = [],
  multiple = true,
  customIcon,
  accordionStyle,
  contentStyle,
}) => {
  const theme = useTheme<Theme>();
  const { heights, contentHeights } = createSharedVariables(sections);
  const coverStyle = useAnimatedStyle(() => {
    const offset = contentHeights.reduce((accu, curr) => accu + curr.value, 0);
    return {
      top: sectionHeaderHeight * sections.length + (sections.length - 1) * ONE_PIXEL + offset,
    };
  });

  return (
    <Box
      borderWidth={ONE_PIXEL}
      borderBottomWidth={0}
      borderColor={'border'}
      flex={1}
      position={'relative'}
      style={accordionStyle}
    >
      <Box>
        {sections.map((item, index) => {
          return (
            <Panel
              {...{ ...item, multiple, customIcon, index }}
              key={index}
              height={heights[index]}
              contentHeights={contentHeights}
              contentStyle={contentStyle}
            />
          );
        })}
      </Box>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            zIndex: 99,
            backgroundColor: theme.colors.background,
          },
          coverStyle,
        ]}
      />
    </Box>
  );
};
Accordion.displayName = 'Accordion';

export default Accordion;

function createSharedVariables(sections: Section[]) {
  const contentHeights = sections.map(() => useSharedValue(0));

  const contentHeightsCopy = contentHeights;
  const result = [useSharedValue(0)];
  for (let i = 1; i < sections.length; i++) {
    const previousHeight = result[i - 1];
    const previousContentHeight = contentHeightsCopy[i - 1];
    result.push(
      useDerivedValue(() => {
        return previousHeight.value + previousContentHeight.value + sectionHeaderHeight + ONE_PIXEL;
      })
    );
  }
  const heights = result;

  return {
    contentHeights,
    heights,
  };
}
