import React, { FC, ReactNode, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Modal from '../modal';
import Pressable from '../pressable';
import Text from '../text';
import { Theme } from '../theme';
import ActionSheetItem, { ActionSheetItemProps } from './ActionSheetItem';

const { ONE_PIXEL } = helpers;

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
  activeOpacity = 0.6,
  visible,
  onCancel,
}) => {
  const theme = useTheme<Theme>();

  const styles = StyleSheet.create({
    action: {
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: theme.spacing.x3,
      borderTopWidth: ONE_PIXEL,
      borderTopColor: theme.colors.border,
    },
    cancel: {
      borderBottomLeftRadius: theme.borderRadii.x2,
      borderBottomRightRadius: theme.borderRadii.x2,
    },
  });

  const Title = useMemo(() => {
    if (!title) return null;

    if (typeof title === 'string')
      return (
        <Box padding="x3">
          <Text variant="p1" color="text">
            {title}
          </Text>
        </Box>
      );

    return <Box padding="x3">{title}</Box>;
  }, [title]);

  return (
    <Modal
      position="bottom"
      animationType="slide-up"
      visible={visible}
      onClose={onCancel}
      maskClosable={false}
      maskVisible={true}
    >
      {Title}
      {items.map((item, index) => (
        <ActionSheetItem
          key={index}
          {...item}
          onCancel={onCancel}
          itemStyle={styles.action}
          activeOpacity={activeOpacity}
        />
      ))}
      <Pressable activeOpacity={activeOpacity} onPress={onCancel} style={[styles.action, styles.cancel]}>
        <Text variant="p0" color="text">
          {cancelText}
        </Text>
      </Pressable>
    </Modal>
  );
};
ActionSheet.displayName = 'ActionSheet';

export default ActionSheet;
