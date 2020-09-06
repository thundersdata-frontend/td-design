import React, { FC, ReactNode, memo, useState, useEffect } from 'react';
import { View, TouchableHighlight, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { useTransition, mix } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Text from '../text';
import Chevron from './Chevron';

export interface Section {
  title: ReactNode;
  content: ReactNode;
}

const Panel: FC<{
  item: Section;
  onChange: () => void;
  expanded: boolean;
  expandedHeight: number;
  duration?: number;
  easing: string;
  renderTitle?: (item: Section) => ReactNode;
  renderContent?: (item: Section) => ReactNode;
  activeOpacity?: number;
  underlayColor?: string;
  sectionContainerStyle?: StyleProp<ViewStyle>;
}> = ({
  item,
  onChange,
  expanded,
  expandedHeight,
  duration,
  easing,
  renderTitle,
  renderContent,
  activeOpacity,
  sectionContainerStyle,
}) => {
  const theme = useTheme<Theme>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(expanded);
  }, [expanded]);

  const transition = useTransition(open, { duration, easing: Easing[easing](Easing.ease) });
  const borderBottomWidth = mix(transition, 0, StyleSheet.hairlineWidth);
  const height = mix(transition, 0, expandedHeight);

  const renderSectionTitle = (title: ReactNode) => {
    if (renderTitle) {
      return renderTitle(item);
    }
    if (typeof title === 'string') {
      return (
        <Animated.View
          style={{
            backgroundColor: theme.colors.mainBackground,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing.m,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.borderColor,
          }}
        >
          <Text>{title}</Text>
          <Chevron {...{ transition }} />
        </Animated.View>
      );
    }
    return title;
  };

  const renderSectionContent = (content: ReactNode) => {
    if (renderContent) {
      return renderContent(item);
    }
    if (typeof content === 'string') {
      return <Text>{content}</Text>;
    }
    return content;
  };

  return (
    <View style={sectionContainerStyle}>
      <TouchableHighlight
        onPress={() => {
          setOpen((open) => !open);
          onChange();
        }}
        underlayColor="transparent"
        {...{ activeOpacity }}
      >
        {renderSectionTitle(item.title)}
      </TouchableHighlight>
      <Animated.View
        style={{
          height,
          borderBottomWidth,
          borderBottomColor: theme.colors.borderColor,
        }}
      >
        <View>{renderSectionContent(item.content)}</View>
      </Animated.View>
    </View>
  );
};

export default memo(Panel);
