import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';

import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useTheme } from '@shopify/restyle';
import { useLatest } from '@td-design/rn-hooks';

import Box from '../../box';
import Flex from '../../flex';
import helpers from '../../helpers';
import Text from '../../text';
import { Theme } from '../../theme';
import Modal from '../Modal';
import { Action, AlertProps } from '../type';

const { ONE_PIXEL, px } = helpers;
const AlertContainer: FC<AlertProps> = ({ icon, title, content, onPress }) => {
  const theme = useTheme<Theme>();
  const modal = useModal();
  const onPressRef = useLatest(onPress);

  /** 确定操作 */
  const handlePress = () => {
    const originPress = onPressRef.current || function () {};
    const res = originPress();
    if (res && res.then) {
      res.then(() => {
        modal.hide();
      });
    } else {
      modal.hide();
    }
  };

  const actions: Action[] = [{ text: '确定', onPress: handlePress }];

  const footer =
    actions.length > 0 ? (
      <Box borderTopWidth={ONE_PIXEL} borderTopColor="border">
        {actions.map((action, index) => {
          const originPress = action.onPress || function () {};
          const onPress = () => {
            const res = originPress();
            if (res && res.then) {
              res.then(() => {
                modal.hide();
              });
            } else {
              modal.hide();
            }
          };
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              key={action.text}
              onPress={onPress}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: px(54),
                borderBottomWidth: index !== actions.length - 1 ? ONE_PIXEL : 0,
                borderBottomColor: theme.colors.border,
              }}
            >
              <Text variant="p0" color="primary200" style={action.style}>
                {action.text}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Box>
    ) : null;

  return (
    <Modal
      position="center"
      visible={modal.visible}
      maskClosable={false}
      onClose={modal.hide}
      bodyContainerStyle={{ marginHorizontal: theme.spacing.x3, borderRadius: theme.borderRadii.x1 }}
    >
      <Box marginBottom="x3">
        {icon && <Flex justifyContent="center">{icon}</Flex>}
        {title && (
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
export default NiceModal.create(AlertContainer);
