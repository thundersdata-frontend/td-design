import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleProp, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useTimingTransition } from 'react-native-redash/lib/module/v1';

import Text from '../text';
import { px } from '../helper';
import Animated, { Easing, interpolate } from 'react-native-reanimated';

export interface CollapseTextProps {
  text: string;
  duration?: number;
  defaultNumberOfLines?: number;
  lineHeight?: number;
  textStyle?: StyleProp<TextStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  expandText?: string;
  unExpandText?: string;
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
