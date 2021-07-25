import React, { FC, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { TouchableOpacity } from 'react-native';
import Svg, { Image, ClipPath, Circle } from 'react-native-svg';
import Modal from '../Modal';
import Flex from '../../flex';
import Box from '../../box';
import Text from '../../text';
import SvgIcon from '../../svg-icon';
import { Theme } from '../../theme';
import { TipProps } from '../type';
import helpers from '../../helpers';

const { px } = helpers;
const TipContainer: FC<TipProps> = ({ title, content, img, height }) => {
  const theme = useTheme<Theme>();
  const [visible, setVisible] = useState(true);

  return (
    <Modal
      position="center"
      visible={visible}
      maskClosable={false}
      onClose={() => setVisible(false)}
      bodyContainerStyle={{ paddingHorizontal: theme.spacing.x2, backgroundColor: theme.colors.transparent }}
    >
      <Box backgroundColor="background" borderRadius="x2">
        {img && (
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
          {title && (
            <Flex justifyContent="center" marginVertical="x3">
              <Text variant="h1" color="gray500">
                {title}
              </Text>
            </Flex>
          )}
          {content && (
            <Flex justifyContent="center">
              <Text variant="p1" color="gray500">
                {content}
              </Text>
            </Flex>
          )}
        </Box>
      </Box>
      <Flex justifyContent="center" marginTop="x3">
        <TouchableOpacity activeOpacity={0.5} onPress={() => setVisible(false)}>
          <SvgIcon name="closecircleo" color={theme.colors.gray500} size={px(32)} />
        </TouchableOpacity>
      </Flex>
    </Modal>
  );
};
export default TipContainer;
