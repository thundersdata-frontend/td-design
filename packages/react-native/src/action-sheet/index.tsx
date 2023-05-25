import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@shopify/restyle';

import helpers from '../helpers';
import Modal from '../modal';
import Text from '../text';
import { Theme } from '../theme';
import ActionSheetItem, { ActionSheetItemProps } from './ActionSheetItem';

const { px, ONE_PIXEL } = helpers;

export interface ActionSheetProps {
  /** 操作项列表 */
  items: ActionSheetItemProps[];
  /** 是否显示操作面板 */
  visible: boolean;
  /** 关闭操作面板 */
  onCancel: () => void;
  /** 关闭文字 */
  cancelText?: string;
}
const ActionSheet: FC<ActionSheetProps> = ({ items = [], cancelText = '取消', visible, onCancel }) => {
  const theme = useTheme<Theme>();

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
      borderRadius: theme.borderRadii.x2,
      borderBottomWidth: 0,
    },
  });

  return (
    <Modal
      position="bottom"
      animationType="slide-up"
      visible={visible}
      onClose={onCancel}
      maskClosable={false}
      maskVisible={true}
    >
      {items.map((item, index, array) => (
        <ActionSheetItem
          key={index}
          {...item}
          isFirst={index === 0}
          isLast={index === array.length - 1}
          onCancel={onCancel}
          itemStyle={styles.action}
        />
      ))}
      <TouchableOpacity activeOpacity={0.5} onPress={onCancel} style={[styles.action, styles.cancel]}>
        <Text variant="p0" color="gray500">
          {cancelText}
        </Text>
      </TouchableOpacity>
    </Modal>
  );
};
ActionSheet.displayName = 'ActionSheet';

export default ActionSheet;
