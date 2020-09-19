import { useTheme } from '@shopify/restyle';
import React, { FC, ReactNode } from 'react';
import { ModalProps, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../text';
import Modal from '../modal';
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
  render?: (text: string, type?: 'default' | 'danger') => ReactNode;
}
const ActionSheet: FC<ActionSheetProps> = ({ data = [], cancelText = '取消', render, visible, onCancel }) => {
  const theme = useTheme<Theme>();
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
    <Modal visible={visible} onClose={onCancel}>
      {data.map(({ text, type = 'default', onPress }) => {
        if (render) {
          return render(text, type);
        }
        return (
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
        );
      })}
      <TouchableOpacity onPress={onCancel} style={styles.action}>
        <Text variant="primaryBody">{cancelText}</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default ActionSheet;
