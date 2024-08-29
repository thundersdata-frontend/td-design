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
import ModalView from '../Modal/ModalView';
import { AlertProps } from '../type';

const { ONE_PIXEL } = helpers;
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
      <Button
        style={{ paddingVertical: theme.spacing.x3 }}
        loading={loading}
        onPress={handlePress}
        title={confirmText}
        type="secondary"
        bordered={false}
      />
    </Box>
  );

  const styles = StyleSheet.create({
    modal: { marginHorizontal: theme.spacing.x3, borderRadius: theme.borderRadii.x3 },
  });

  return (
    <ModalView
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
          <Flex justifyContent="center" marginVertical="x2">
            {typeof title === 'string' ? (
              <Text variant="h1" color="text">
                {title}
              </Text>
            ) : (
              title
            )}
          </Flex>
        )}
        {typeof content === 'string' ? (
          <Flex justifyContent="center">
            <Text variant="p1" color="text">
              {content}
            </Text>
          </Flex>
        ) : (
          content
        )}
      </Box>
      {footer}
    </ModalView>
  );
};
export default AlertContainer;
