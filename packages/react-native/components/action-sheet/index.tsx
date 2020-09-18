import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { Modal, ModalProps, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Box from '../box';
import Text from '../text';
import { Theme } from '../config/theme';
import { px } from '../helper';

interface ActionSheetItem {
  /** 操作项文字 */
  text: string;
  /** 操作项点击事件 */
  onPress: () => void;
  /** 操作项类型。danger表示警示性操作 */
  type?: 'default' | 'danger';
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
      height: px(55),
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.colors.borderColor,
    },
  });

  return (
    <Modal animationType="slide" transparent statusBarTranslucent visible={visible}>
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column-reverse',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
        edges={['top']}
      >
        <Box backgroundColor="white" style={{ paddingBottom: insets.bottom }}>
          {data.map(({ text, type = 'default', onPress }) => (
            <TouchableOpacity
              key={text}
              onPress={() => {
                onPress();
                onCancel();
              }}
              style={styles.action}
            >
              <Text variant={type === 'default' ? 'primaryBody' : 'warn'}>{text}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onCancel} style={styles.action}>
            <Text>{cancelText}</Text>
          </TouchableOpacity>
        </Box>
      </SafeAreaView>
    </Modal>
  );
};

export default ActionSheet;
