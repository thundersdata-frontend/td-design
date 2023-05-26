import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';
import { useSafeState } from '@td-design/rn-hooks';

import Box from '../../box';
import Button from '../../button';
import Flex from '../../flex';
import helpers from '../../helpers';
import Text from '../../text';
import { Theme } from '../../theme';
import Modal from '../Modal';
import { AlertProps } from '../type';

const { px, ONE_PIXEL } = helpers;
const AlertContainer: FC<
  AlertProps & {
    onAnimationEnd?: (visible: boolean) => void;
  }
> = ({ icon, title, content, confirmText = '确定', onPress, onAnimationEnd }) => {
  const theme = useTheme<Theme>();
  const [visible, setVisible] = useSafeState(true);
  const [loading, setLoading] = useSafeState(false);

  /** 确定操作 */
  const handlePress = async () => {
    if (!onPress) {
      setVisible(false);
      return;
    }
    try {
      setLoading(true);
      await onPress();
      setLoading(false);
      setVisible(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const footer = (
    <Box borderTopWidth={ONE_PIXEL} borderTopColor={'border'}>
      <Button loading={loading} onPress={handlePress} height={px(54)} title={confirmText} type="secondary" borderless />
    </Box>
  );

  const styles = StyleSheet.create({
    modal: { marginHorizontal: theme.spacing.x3, borderRadius: theme.borderRadii.x3 },
  });

  return (
    <Modal
      position="center"
      visible={visible}
      maskClosable={false}
      onAnimationEnd={onAnimationEnd}
      onClose={() => setVisible(false)}
      bodyContainerStyle={styles.modal}
    >
      <Box marginBottom="x3">
        {!!icon && <Flex justifyContent="center">{icon}</Flex>}
        {!!title && (
          <Flex justifyContent="center" marginVertical="x3">
            <Text variant="h1" color="gray500">
              {title}
            </Text>
          </Flex>
        )}
        {typeof content === 'string' ? (
          <Flex justifyContent="center">
            <Text variant="p1" color="gray500">
              {content}
            </Text>
          </Flex>
        ) : (
          content
        )}
      </Box>
      {footer}
    </Modal>
  );
};
export default AlertContainer;
