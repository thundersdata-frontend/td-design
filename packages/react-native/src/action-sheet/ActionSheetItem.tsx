import React, { memo, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Pressable from '../pressable';
import Text from '../text';

export interface ActionSheetItemProps {
  /** 操作项文字 */
  text: string;
  /** 操作项点击事件 */
  onPress: () => void;
  /** 操作项类型。danger表示警示性操作 */
  type?: 'default' | 'danger';
  render?: (text: string, type?: 'default' | 'danger') => ReactNode;
}

function ActionSheetItem({
  text,
  type = 'default',
  onPress,
  activeOpacity,
  render,
  onCancel,
  itemStyle,
}: ActionSheetItemProps & {
  onCancel: () => void;
  activeOpacity: number;
  itemStyle: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      key={text}
      activeOpacity={activeOpacity}
      onPress={() => {
        onCancel();
        // 因为Modal关闭的动画效果是300ms，所以这里延迟350ms执行onPress
        setTimeout(onPress, 350);
      }}
      style={itemStyle}
    >
      {render ? (
        render(text, type)
      ) : (
        <Text variant="p0" color={type === 'default' ? 'gray500' : 'func600'}>
          {text}
        </Text>
      )}
    </Pressable>
  );
}

export default memo(ActionSheetItem);
