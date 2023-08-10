import React, { FC, useCallback } from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

import { useBoolean } from '@td-design/rn-hooks';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Text from '../text';

const { px } = helpers;
export interface CollapseTextProps {
  /** 文本 */
  text: string;
  /** 默认展示行数 */
  defaultNumberOfLines?: number;
  /** 每行文本高度 */
  lineHeight?: number;
  /** 文本样式 */
  textStyle?: StyleProp<TextStyle>;
  /** 文本容器样式 */
  textContainerStyle?: StyleProp<ViewStyle>;
  /** 展开时候的文本。默认为“展开” */
  expandText?: string;
  /** 收起时候的文本。默认为“收起” */
  unExpandText?: string;
  /** 展开/收起文本样式 */
  expandStyle?: StyleProp<TextStyle>;
  /** 按下时的不透明度 */
  activeOpacity?: number;
}

const CollapseText: FC<CollapseTextProps> = ({
  text,
  defaultNumberOfLines = 2,
  lineHeight = px(18),
  textStyle,
  textContainerStyle,
  expandText = '展开',
  unExpandText = '收起',
  expandStyle,
  activeOpacity = 0.5,
}) => {
  const [isOverflow, { set: setOverflow }] = useBoolean(false);
  const [hidden, { toggle: toggleHidden }] = useBoolean(true);

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { height } = e.nativeEvent.layout;
      if (height - 1 < lineHeight * defaultNumberOfLines) {
        setOverflow(false);
      } else {
        setOverflow(true);
      }
    },
    [lineHeight, defaultNumberOfLines]
  );

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    text: {
      position: 'absolute',
      zIndex: -99999,
      opacity: 0,
    },
  });

  return (
    <>
      <Box style={[textContainerStyle, styles.container]}>
        <Text
          numberOfLines={hidden ? defaultNumberOfLines : undefined}
          ellipsizeMode="tail"
          fontSize={px(14)}
          lineHeight={lineHeight}
          color="gray500"
          style={textStyle}
          selectable
          // @ts-ignore
          userSelect="all"
        >
          {text}
        </Text>
        {isOverflow && (
          <Flex justifyContent="flex-end" paddingRight="x1">
            <TouchableOpacity activeOpacity={activeOpacity} onPress={toggleHidden}>
              <Text fontSize={px(12)} color="gray500" style={expandStyle}>
                {hidden ? expandText : unExpandText}
              </Text>
            </TouchableOpacity>
          </Flex>
        )}
        {/* 隐藏节点，用于判断文字真实高度 */}
        <Text fontSize={px(14)} lineHeight={lineHeight} onLayout={handleLayout} style={[styles.text, textStyle]}>
          {text}
        </Text>
      </Box>
    </>
  );
};
CollapseText.displayName = 'CollapseText';

export default CollapseText;
