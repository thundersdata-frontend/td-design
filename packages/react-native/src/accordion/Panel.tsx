import React, { FC, ReactNode, memo, useState, useEffect } from 'react';
import { View, TouchableHighlight, StyleProp, ViewStyle } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { useTransition, mix } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Text from '../text';
import Chevron from './Chevron';
import { ONE_PIXEL } from '../helper';
import Box from '../box';

export interface Section {
  title: ReactNode;
  content: ReactNode;
}

const Panel: FC<{
  /** 选项卡 */
  item: Section;
  /** 修改事件 */
  onChange: () => void;
  /** 是否展开 */
  expanded: boolean;
  /** 选项卡高度 */
  expandedHeight: number;
  /** 动画时长 */
  duration?: number;
  /** 动画效果 */
  easing: string;
  /** 自定义渲染标题 */
  renderTitle?: (item: Section) => ReactNode;
  /** 自定义渲染内容 */
  renderContent?: (item: Section) => ReactNode;
  /** 点击透明度 */
  activeOpacity?: number;
  /** 点击背景色 */
  underlayColor?: string;
  /** 选项卡样式 */
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
  const borderBottomWidth = mix(transition, 0, ONE_PIXEL);
  const height = mix(transition, 0, expandedHeight);

  const renderSectionTitle = (title: ReactNode) => {
    if (typeof title === 'string') {
      return (
        <Animated.View
          style={{
            backgroundColor: theme.colors.accordion_background,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: theme.spacing.m,
            borderBottomWidth: ONE_PIXEL,
            borderBottomColor: theme.colors.border,
          }}
        >
          {renderTitle ? renderTitle(item) : <Text variant="title1">{title}</Text>}
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
      return <Text variant="content1">{content}</Text>;
    }
    return content;
  };

  return (
    <View style={sectionContainerStyle}>
      <TouchableHighlight
        onPress={() => {
          setOpen(open => !open);
          onChange();
        }}
        underlayColor={theme.colors.accordion_underlay}
        {...{ activeOpacity }}
      >
        {renderSectionTitle(item.title)}
      </TouchableHighlight>
      <Animated.View
        style={{
          height,
          borderBottomWidth,
          borderBottomColor: theme.colors.border,
          overflow: 'hidden',
          backgroundColor: theme.colors.accordion_background,
        }}
      >
        <Box padding="s">{renderSectionContent(item.content)}</Box>
      </Animated.View>
    </View>
  );
};

export default memo(Panel);
