import React, { FC } from 'react';
import { View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Panel from './Panel';
import helpers from '../helpers';
import { Theme } from '../theme';
import { useSharedValue } from 'react-native-reanimated';
import { AccordionProps } from './type';

const { ONE_PIXEL } = helpers;

const Accordion: FC<AccordionProps> = ({
  sections = [],
  multiple = true,
  customIcon,
  accordionStyle,
  contentStyle,
}) => {
  const theme = useTheme<Theme>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contentHeights = sections.map(() => useSharedValue(0.01));

  return (
    <View
      style={[
        {
          borderWidth: ONE_PIXEL,
          borderBottomWidth: 0,
          borderColor: theme.colors.border,
        },
        accordionStyle,
      ]}
    >
      {sections.map((item, index) => {
        return (
          <Panel
            {...{ ...item, multiple, customIcon, index }}
            key={index}
            contentHeights={contentHeights}
            contentStyle={contentStyle}
          />
        );
      })}
    </View>
  );
};

export default Accordion;
