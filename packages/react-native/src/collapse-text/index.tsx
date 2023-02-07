import { useBoolean } from '@td-design/rn-hooks';
import React, { FC } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

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
  const [isOverflow, { set: setOverflow }] = useBoolean(false);
  const [hidden, { toggle: toggleHidden }] = useBoolean(true);

  return (
    <>
      <Box style={[textContainerStyle, { position: 'relative' }]}>
        <Text
          numberOfLines={hidden ? defaultNumberOfLines : undefined}
          ellipsizeMode="tail"
          fontSize={px(14)}
          lineHeight={lineHeight}
          color="gray500"
          style={textStyle}
        >
          {text}
        </Text>
        {isOverflow && (
          <Flex justifyContent="flex-end" paddingRight="x1">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                toggleHidden();
              }}
            >
              <Text fontSize={px(12)} color="gray500" style={expandStyle}>
                {hidden ? expandText : unExpandText}
              </Text>
            </TouchableOpacity>
          </Flex>
        )}
        {/* 隐藏节点，用于判断文字真实高度 */}
        <Text
          fontSize={px(14)}
          lineHeight={lineHeight}
          onLayout={e => {
            const { height } = e.nativeEvent.layout;
            if (height - 1 < lineHeight * defaultNumberOfLines) {
              setOverflow(false);
            } else {
              setOverflow(true);
            }
          }}
          style={[
            {
              position: 'absolute',
              zIndex: -99999,
              opacity: 0,
            },
            textStyle,
          ]}
        >
          {text}
        </Text>
      </Box>
    </>
  );
};
CollapseText.displayName = 'CollapseText';

export default CollapseText;
