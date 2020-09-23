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

const AlertContainer: FC<AlertProps> = ({ title, content, actions = [] }) => {
  const theme = useTheme<Theme>();
  const [visible, setVisible] = useState(true);

  return (
    <Modal position="center" visible={visible} maskClosable={false} onClose={() => setVisible(false)}>
      <Box>
        <Flex justifyContent="center">
          <Text variant="primaryTitle">{title}</Text>
        </Flex>
        {content && (
          <Flex justifyContent="center">
            <Text variant="secondaryBody">{content}</Text>
          </Flex>
        )}
      </Box>
      <Flex borderTopWidth={ONE_PIXEL} borderTopColor="borderColor" marginTop="s">
        {actions.map(action => {
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
            <Flex.Item key={action.text}>
              <TouchableOpacity
                onPress={onPress}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: px(54) - theme.spacing.m,
                  paddingTop: theme.spacing.m,
                }}
              >
                <Text variant="primaryTipReverse" style={action.style}>
                  {action.text}
                </Text>
              </TouchableOpacity>
            </Flex.Item>
          );
        })}
      </Flex>
    </Modal>
  );
};
export default AlertContainer;
