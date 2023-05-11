import React, { memo, ReactNode } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Text from '../text';
import { Theme } from '../theme';

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
  render,
  isFirst,
  isLast,
  onCancel,
  itemStyle,
}: ActionSheetItemProps & {
  isFirst: boolean;
  isLast: boolean;
  onCancel: () => void;
  itemStyle: StyleProp<ViewStyle>;
}) {
  const theme = useTheme<Theme>();

  const styles = StyleSheet.create({
    first: {
      borderTopLeftRadius: theme.borderRadii.x2,
      borderTopRightRadius: theme.borderRadii.x2,
    },
    last: {
      borderBottomLeftRadius: theme.borderRadii.x2,
      borderBottomRightRadius: theme.borderRadii.x2,
    },
  });

  return (
    <TouchableOpacity
      key={text}
      activeOpacity={0.5}
      onPress={() => {
        onCancel();
        /** 修复ImagePicker的bug，详见：https://github.com/react-native-image-picker/react-native-image-picker/issues/1456 */
        requestAnimationFrame(() => {
          onPress();
        });
      }}
      style={[itemStyle, isFirst && styles.first, isLast && styles.last]}
    >
      {render ? (
        render(text, type)
      ) : (
        <Text variant="p0" color={type === 'default' ? 'gray500' : 'func600'}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export default memo(ActionSheetItem);
