import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle, ClipPath, Image } from 'react-native-svg';

import { useTheme } from '@shopify/restyle';
import { useBoolean } from '@td-design/rn-hooks';

import Box from '../../box';
import Flex from '../../flex';
import Pressable from '../../pressable';
import SvgIcon from '../../svg-icon';
import Text from '../../text';
import { Theme } from '../../theme';
import Modal from '../Modal';
import { TipProps } from '../type';

const TipContainer: FC<
  TipProps & {
    onAnimationEnd?: (visible: boolean) => void;
  }
> = ({ title, content, img, height, onAnimationEnd, closeIconActiveOpacity = 0.6 }) => {
  const theme = useTheme<Theme>();
  const [visible, { setFalse }] = useBoolean(true);

  const styles = StyleSheet.create({
    modal: {
      marginHorizontal: theme.spacing.x3,
    },
  });

  return (
    <Modal
      position="center"
      visible={visible}
      maskClosable={false}
      onClose={setFalse}
      onAnimationEnd={onAnimationEnd}
      bodyContainerStyle={styles.modal}
    >
      <Box borderRadius="x3" overflow="hidden">
        {!!img && (
          <Flex justifyContent="center">
            <Svg width="100%" height={height}>
              <ClipPath id="clip">
                <Circle r={300 + height} cx="50%" cy={-300} />
              </ClipPath>
              <Image
                href={img}
                width="100%"
                height={height}
                clipPath="url(#clip)"
                preserveAspectRatio="xMidYMid slice"
              />
            </Svg>
          </Flex>
        )}
        <Box marginBottom="x2">
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
      </Box>
      <Flex justifyContent="center" position="absolute" width="100%" bottom={-theme.spacing.x10}>
        <Pressable hitOffset={20} activeOpacity={closeIconActiveOpacity} onPress={setFalse}>
          <SvgIcon name="closecircleo" color={theme.colors.gray400} size={theme.spacing.x8} />
        </Pressable>
      </Flex>
    </Modal>
  );
};
export default TipContainer;
