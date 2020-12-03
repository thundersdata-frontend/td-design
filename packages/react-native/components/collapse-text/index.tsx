import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleProp, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
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
  const textRef = useRef<View>(null);
  const measureFlagRef = useRef(true);
  const heightRef = useRef(0);

  /** 是否展开，默认不展开 */
  const [expanded, setExpanded] = useState(false);
  const animation = useTimingTransition(expanded, { duration, easing: Easing.inOut(Easing.ease) });

  useEffect(() => {
    requestAnimationFrame(() => {
      if (textRef.current) {
        textRef.current.measure((_, __, ___, height) => {
          if (measureFlagRef.current) {
            heightRef.current = Math.floor(height);
            measureFlagRef.current = false;
          }
        });
      }
    });
  }, []);

  return (
    <View style={[textContainerStyle]}>
      <Animated.View
        style={[
          {
            height: interpolate(animation, {
              inputRange: [0, 1],
              outputRange: [(defaultNumberOfLines + 1) * lineHeight, heightRef.current],
            }),
          },
        ]}
      >
        <View ref={textRef}>
          <Text style={[textStyle, { lineHeight }]} allowFontScaling={false}>
            {text}
          </Text>
        </View>
      </Animated.View>
      <TouchableWithoutFeedback onPress={() => setExpanded(!expanded)}>
        <View style={{ position: 'absolute', bottom: 4, right: 4 }}>
          <Text style={[{ fontSize: px(10) }, expandStyle]}>{!expanded ? expandText : unExpandText}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CollapseText;
