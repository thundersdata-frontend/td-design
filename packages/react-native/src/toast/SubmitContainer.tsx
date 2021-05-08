import { useTheme } from '@shopify/restyle';
import React, { FC, ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';

import Flex from '../flex';
import Box from '../box';
import Text from '../text';
import { Theme } from '../config/theme';
import { px } from '../helper';

const SubmitContainer: FC<{ content: ReactNode }> = ({ content }) => {
  const theme = useTheme<Theme>();

  return (
    <Flex flexDirection="column" flex={1} backgroundColor="toast_mask" justifyContent="center">
      <Box
        width={px(80)}
        height={px(80)}
        padding="s"
        borderRadius="corner"
        backgroundColor="toast_success_background"
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size="small" color={theme.colors.toast_success} />
        <Text variant="hint3" paddingTop="s">
          {content}
        </Text>
      </Box>
    </Flex>
  );
};

export default SubmitContainer;
