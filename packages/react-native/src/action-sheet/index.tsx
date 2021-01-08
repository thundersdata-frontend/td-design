import { useTheme } from '@shopify/restyle';
import React, { FC, ReactNode } from 'react';
import { ModalProps, StyleSheet, TouchableOpacity, Modal as RNModal } from 'react-native';
import Box from '../box';
import Text from '../text';
import { Theme } from '../config/theme';
import { ONE_PIXEL, px, deviceWidth, deviceHeight } from '../helper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
interface ActionSheetItem {
  /** 操作项文字 */
  text: string;
  /** 操作项点击事件 */
  onPress: () => void;
  /** 操作项类型。danger表示警示性操作 */
  type?: 'default' | 'danger';
  render?: (text: string, type?: 'default' | 'danger') => ReactNode;
}
interface ActionSheetProps extends ModalProps {
  /** 操作项列表 */
  data: ActionSheetItem[];
  /** 是否显示操作面板 */
  visible: boolean;
  /** 关闭操作面板 */
  onCancel: () => void;
  /** 关闭文字 */
  cancelText?: string;
}
const ActionSheet: FC<ActionSheetProps> = ({ data = [], cancelText = '取消', visible, onCancel }) => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    action: {
      height: px(54),
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: ONE_PIXEL,
    },
    cancel: {
      marginTop: theme.spacing.xs,
      marginBottom: insets.bottom / 2,
      borderRadius: theme.borderRadii.corner,
    },
  });

  return (
    <RNModal animationType="slide" transparent statusBarTranslucent visible={visible} onDismiss={onCancel}>
      <SafeAreaView
        style={[
          {
            flex: 1,
            backgroundColor: theme.colors.overlayColor,
            flexDirection: 'column-reverse',
          },
        ]}
        edges={['top']}
      >
        <Box padding="s" style={{ zIndex: 99 }}>
          {data.map(({ text, type = 'default', onPress, render }, index) => {
            const style = {};
            if (index === 0) {
              Object.assign(style, {
                borderTopLeftRadius: theme.borderRadii.corner,
                borderTopRightRadius: theme.borderRadii.corner,
              });
            }
            if (index === data.length - 1) {
              Object.assign(style, {
                borderBottomLeftRadius: theme.borderRadii.corner,
                borderBottomRightRadius: theme.borderRadii.corner,
              });
            }
            return (
              <TouchableOpacity
                key={text}
                activeOpacity={0.8}
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
                  <Text variant={type === 'default' ? 'primaryBody' : 'warn'}>{text}</Text>
                )}
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity activeOpacity={0.8} onPress={onCancel} style={[styles.action, styles.cancel]}>
            <Text variant="primaryBody">{cancelText}</Text>
          </TouchableOpacity>
        </Box>
        <TouchableOpacity activeOpacity={0.8} onPress={onCancel}>
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

export default ActionSheet;
