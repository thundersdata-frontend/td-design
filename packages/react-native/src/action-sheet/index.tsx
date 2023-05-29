import React, { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Modal from '../modal';
import Text from '../text';
import { Theme } from '../theme';
import WhiteSpace from '../white-space';
import ActionSheetItem, { ActionSheetItemProps } from './ActionSheetItem';

const { px, ONE_PIXEL } = helpers;

export interface ActionSheetProps {
  /** 标题 */
  title?: ReactNode;
  /** 操作项列表 */
  items: ActionSheetItemProps[];
  /** 是否显示操作面板 */
  visible: boolean;
  /** 按下时的不透明度 */
  activeOpacity?: number;
  /** 关闭操作面板 */
  onCancel: () => void;
  /** 关闭文字 */
  cancelText?: string;
}
const ActionSheet: FC<ActionSheetProps> = ({
  title,
  items = [],
  cancelText = '取消',
  activeOpacity = 0.5,
  visible,
  onCancel,
}) => {
  const theme = useTheme<Theme>();

  const styles = StyleSheet.create({
    action: {
      height: px(54),
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: ONE_PIXEL,
      borderTopColor: theme.colors.border,
    },
    cancel: {
      marginTop: theme.spacing.x1,
      borderBottomRadius: theme.borderRadii.x2,
    },
  });

  const renderTitle = () => {
    if (!title) return null;
    if (typeof title === 'string')
      return (
        <Box padding="x3">
          <Text variant="p1" color="gray500">
            {title}
          </Text>
        </Box>
      );
    return <Box padding="x3">{title}</Box>;
  };

  return (
    <Modal
      position="bottom"
      animationType="slide-up"
      visible={visible}
      onClose={onCancel}
      maskClosable={false}
      maskVisible={true}
    >
      {renderTitle()}
      {items.map((item, index) => (
        <ActionSheetItem
          key={index}
          {...item}
          onCancel={onCancel}
          itemStyle={styles.action}
          activeOpacity={activeOpacity}
        />
      ))}
      <WhiteSpace backgroundColor="mask" />
      <TouchableOpacity activeOpacity={activeOpacity} onPress={onCancel} style={[styles.action, styles.cancel]}>
        <Text variant="p0" color="gray500">
          {cancelText}
        </Text>
      </TouchableOpacity>
    </Modal>
  );
};
ActionSheet.displayName = 'ActionSheet';

export default ActionSheet;
