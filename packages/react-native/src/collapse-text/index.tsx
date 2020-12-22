import React, { FC, useRef, useState } from 'react';
import { LayoutChangeEvent, Platform, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTimingTransition } from 'react-native-redash';

import Text from '../text';
import { px } from '../helper';
import Animated, { Easing, interpolate } from 'react-native-reanimated';

export interface CollapseTextProps {
  /** 文本 */
  text: string;
  /** 展开/收起时长 */
  duration?: number;
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
  duration = 400,
  textStyle,
  textContainerStyle,
  expandText = '展开',
  unExpandText = '收起',
  expandStyle,
}) => {
  const measureFlagRef = useRef(false);
  const heightRef = useRef(0);

  /** 是否展开，默认不展开 */
  const [expanded, setExpanded] = useState(false);
  const animation = useTimingTransition(expanded, { duration, easing: Easing.inOut(Easing.ease) });

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout;
    if (!measureFlagRef.current) {
      heightRef.current = height + 5;
      measureFlagRef.current = true;
    }
  };

  return (
    <View style={[textContainerStyle, { position: 'relative' }]}>
      <Animated.View
        style={[
          {
            height: interpolate(animation, {
              inputRange: [0, 1],
              outputRange: [
                defaultNumberOfLines * lineHeight + (Platform.OS === 'android' ? 0 : px(4)),
                heightRef.current,
              ],
            }),
            overflow: 'hidden',
          },
        ]}
      >
        <Text
          style={[{ fontSize: px(14) }, textStyle, { lineHeight }]}
          allowFontScaling={false}
          onLayout={handleLayout}
        >
          {text}
        </Text>
      </Animated.View>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setExpanded(!expanded)} style={{ height: px(24) }}>
          <Text style={[{ fontSize: px(10) }, expandStyle]}>{!expanded ? expandText : unExpandText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CollapseText;
