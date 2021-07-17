import React, { FC, useState } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

import Box from '../box';
import Text from '../text';
import helpers from '../helpers';

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
}) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const [hidden, setHidden] = useState(true);

  return (
    <>
      <View style={[textContainerStyle, { position: 'relative' }]}>
        <Text
          numberOfLines={hidden ? defaultNumberOfLines : undefined}
          fontSize={px(14)}
          color="gray500"
          lineHeight={lineHeight}
          style={textStyle}
        >
          {text}
        </Text>
        {/* 隐藏节点，用于判断文字真实高度 */}
        <Text
          onLayout={e => {
            const { height } = e.nativeEvent.layout;
            if (height - 1 < lineHeight * defaultNumberOfLines) {
              setIsOverflow(false);
            } else {
              setIsOverflow(true);
            }
          }}
          style={{
            position: 'absolute',
            zIndex: -100,
            lineHeight,
            opacity: 0,
          }}
        >
          {text}
        </Text>
      </View>
      {isOverflow && (
        <Box alignItems="flex-end" padding="x1">
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setHidden(hidden => !hidden);
            }}
          >
            <Text fontSize={px(12)} color="gray500" style={expandStyle}>
              {hidden ? expandText : unExpandText}
            </Text>
          </TouchableOpacity>
        </Box>
      )}
    </>
  );
};

export default CollapseText;
