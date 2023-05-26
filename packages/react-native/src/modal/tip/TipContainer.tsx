import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, ClipPath, Image } from 'react-native-svg';

import { useTheme } from '@shopify/restyle';
import { useBoolean } from '@td-design/rn-hooks';

import Box from '../../box';
import Flex from '../../flex';
import helpers from '../../helpers';
import SvgIcon from '../../svg-icon';
import Text from '../../text';
import { Theme } from '../../theme';
import Modal from '../Modal';
import { TipProps } from '../type';

const { px } = helpers;
const TipContainer: FC<
  TipProps & {
    onAnimationEnd?: (visible: boolean) => void;
  }
> = ({ title, content, img, height, onAnimationEnd, closeIconActiveOpacity = 0.5 }) => {
  const theme = useTheme<Theme>();
  const [visible, { setFalse }] = useBoolean(true);

  const styles = StyleSheet.create({
    modal: {
      marginHorizontal: theme.spacing.x3,
      backgroundColor: theme.colors.transparent,
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
      <Box backgroundColor="background" borderRadius="x1" overflow="hidden">
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
        <Box marginBottom="x3">
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
      </Box>
      <Flex justifyContent="center" marginTop="x3">
        <TouchableOpacity activeOpacity={closeIconActiveOpacity} onPress={setFalse}>
          <SvgIcon name="closecircleo" color={theme.colors.gray400} size={px(32)} />
        </TouchableOpacity>
      </Flex>
    </Modal>
  );
};
export default TipContainer;
