import React, { FC, useState } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle, Text } from 'react-native';

import Box from '../box';
import { px } from '../helper';

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
    <View>
      <View style={[textContainerStyle, { position: 'relative' }]}>
        <Text
          numberOfLines={hidden ? defaultNumberOfLines : undefined}
          style={[{ fontSize: px(14) }, textStyle, { lineHeight }]}
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
        <Box alignItems="flex-end" padding="xs">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setHidden(hidden => !hidden);
            }}
          >
            <Text style={[{ fontSize: px(12) }, expandStyle]}>{hidden ? expandText : unExpandText}</Text>
          </TouchableOpacity>
        </Box>
      )}
    </View>
  );
};

export default CollapseText;
