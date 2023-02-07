import { useTheme } from '@shopify/restyle';
import React, { FC, ReactNode } from 'react';
import { ModalProps, Modal as RNModal, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';

const { ONE_PIXEL, px, deviceWidth, deviceHeight } = helpers;
export interface ActionSheetItem {
  /** 操作项文字 */
  text: string;
  /** 操作项点击事件 */
  onPress: () => void;
  /** 操作项类型。danger表示警示性操作 */
  type?: 'default' | 'danger';
  render?: (text: string, type?: 'default' | 'danger') => ReactNode;
}
export interface ActionSheetProps extends ModalProps {
  /** 操作项列表 */
  items: ActionSheetItem[];
  /** 是否显示操作面板 */
  visible: boolean;
  /** 关闭操作面板 */
  onCancel: () => void;
  /** 关闭文字 */
  cancelText?: string;
}
const ActionSheet: FC<ActionSheetProps> = ({ items = [], cancelText = '取消', visible, onCancel }) => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    action: {
      height: px(54),
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: ONE_PIXEL,
      borderBottomColor: theme.colors.border,
    },
    cancel: {
      marginTop: theme.spacing.x1,
      marginBottom: insets.bottom,
      borderRadius: theme.borderRadii.x2,
    },
  });

  return (
    <RNModal
      animationType="slide"
      transparent
      statusBarTranslucent
      visible={visible}
      onDismiss={onCancel}
      // 解决弹窗打开时，安卓物理返回键不起作用的问题
      // http://reactnative.dev/docs/modal#onrequestclose
      onRequestClose={onCancel}
    >
      <SafeAreaView
        style={[
          {
            flex: 1,
            backgroundColor: theme.colors.mask,
            flexDirection: 'column-reverse',
          },
        ]}
        edges={['top']}
      >
        <Box padding="x2" zIndex="99">
          {items.map(({ text, type = 'default', onPress, render }, index) => {
            const style = {};
            if (index === 0) {
              Object.assign(style, {
                borderTopLeftRadius: theme.borderRadii.x2,
                borderTopRightRadius: theme.borderRadii.x2,
              });
            }
            if (index === items.length - 1) {
              Object.assign(style, {
                borderBottomLeftRadius: theme.borderRadii.x2,
                borderBottomRightRadius: theme.borderRadii.x2,
              });
            }
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
                style={[styles.action, style]}
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
          })}
          <TouchableOpacity activeOpacity={0.5} onPress={onCancel} style={[styles.action, styles.cancel]}>
            <Text variant="p0" color="gray500">
              {cancelText}
            </Text>
          </TouchableOpacity>
        </Box>
        <TouchableOpacity activeOpacity={0.5} onPress={onCancel}>
          <Box
            style={{
              ...StyleSheet.absoluteFillObject,
              width: deviceWidth,
              height: deviceHeight,
            }}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </RNModal>
  );
};
ActionSheet.displayName = 'ActionSheet';

export default ActionSheet;
