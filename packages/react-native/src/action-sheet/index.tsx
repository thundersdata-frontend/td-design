import React, { FC, ReactNode, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { useSafeState } from '@td-design/rn-hooks';

import Box from '../box';
import helpers from '../helpers';
import ModalView from '../modal/Modal/ModalView';
import Portal from '../portal';
import Pressable from '../pressable';
import Text from '../text';
import { Theme } from '../theme';
import WhiteSpace from '../white-space';
import ActionSheetItem, { ActionSheetItemProps } from './ActionSheetItem';

const { ONE_PIXEL } = helpers;

export interface ActionSheetProps {
  /** 标题 */
  title?: ReactNode;
  /** 操作项列表 */
  items: ActionSheetItemProps[];
  /** 按下时的不透明度 */
  activeOpacity?: number;
  /** 关闭文字 */
  cancelText?: string;
}

const ActionSheet = () => null;

ActionSheet.displayName = 'ActionSheet';

ActionSheet.show = (props: ActionSheetProps) => {
  const key = Portal.add(
    <ActionSheetContent
      {...props}
      onAnimationEnd={visible => {
        if (!visible) {
          Portal.remove(key);
        }
      }}
    />
  );
};

const ActionSheetContent: FC<ActionSheetProps & { onAnimationEnd: (visible: boolean) => void }> = ({
  title,
  items = [],
  cancelText = '取消',
  activeOpacity = 0.6,
  onAnimationEnd,
}) => {
  const [visible, setVisible] = useSafeState(true);

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
      borderTopWidth: 0,
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
    <ModalView
      position="bottom"
      maskVisible
      maskClosable
      animationType="slide"
      onAnimationEnd={onAnimationEnd}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <Box>
        {Title}
        {items.map((item, index) => (
          <ActionSheetItem
            key={index}
            {...item}
            onCancel={() => setVisible(false)}
            itemStyle={styles.action}
            activeOpacity={activeOpacity}
          />
        ))}
        <WhiteSpace size="x2" backgroundColor={theme.colors.gray50} />
        <Pressable
          activeOpacity={activeOpacity}
          onPress={() => setVisible(false)}
          style={[styles.action, styles.cancel]}
        >
          <Text variant="p0" color="text">
            {cancelText}
          </Text>
        </Pressable>
      </Box>
    </ModalView>
  );
};

export default ActionSheet;
