import React, { FC, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Modal from '..';
import Flex from '../../flex';
import Box from '../../box';
import Text from '../../text';
import { Theme } from '../../config/theme';
import { AlertProps } from '../type';
import { ONE_PIXEL, px } from '../../helper';

const AlertContainer: FC<
  AlertProps & {
    afterClose: () => void;
  }
> = ({ icon, title, content, actions = [], afterClose }) => {
  const theme = useTheme<Theme>();
  const [visible, setVisible] = useState(true);

  const footer =
    actions.length > 0 ? (
      <Box borderTopWidth={ONE_PIXEL} borderTopColor="borderColor" marginTop="s">
        {actions.map((action, index) => {
          const originPress = action.onPress || function () {};
          const onPress = () => {
            const res = originPress();
            if (res && res.then) {
              res.then(() => {
                setVisible(false);
              });
            } else {
              setVisible(false);
            }
          };
          return (
            <TouchableOpacity
              key={action.text}
              onPress={onPress}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: index !== actions.length - 1 ? px(54) : px(54) - theme.spacing.m,
                borderBottomWidth: index !== actions.length - 1 ? ONE_PIXEL : 0,
                borderBottomColor: theme.colors.borderColor,
              }}
            >
              <Text variant="primaryTipReverse" style={action.style}>
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
      visible={visible}
      maskClosable={false}
      onClose={() => setVisible(false)}
      afterClose={afterClose}
    >
      <Box>
        {icon && (
          <Flex justifyContent="center" marginBottom="m">
            {icon}
          </Flex>
        )}
        {title && (
          <Flex justifyContent="center">
            <Text variant="primaryTitle">{title}</Text>
          </Flex>
        )}
        {content && (
          <Flex justifyContent="center">
            <Text variant={title ? 'secondaryBody' : 'primaryBody'}>{content}</Text>
          </Flex>
        )}
      </Box>
      {footer}
    </Modal>
  );
};
export default AlertContainer;
