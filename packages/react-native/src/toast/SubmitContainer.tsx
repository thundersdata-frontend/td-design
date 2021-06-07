import { useTheme } from '@shopify/restyle';
import React, { FC, ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';

import Flex from '../flex';
import Box from '../box';
import Text from '../text';
import { Theme } from '../theme';
import helpers from '../helpers';

const { px } = helpers;
const SubmitContainer: FC<{ content: ReactNode }> = ({ content }) => {
  const theme = useTheme<Theme>();

  return (
    <Flex flexDirection="column" flex={1} backgroundColor="mask" justifyContent="center">
      <Box
        width={px(80)}
        height={px(80)}
        padding="x2"
        borderRadius="x2"
        backgroundColor="primary50"
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size="small" color={theme.colors.primary200} />
        <Text variant="p1" color="primary200" paddingTop="x2">
          {content}
        </Text>
      </Box>
    </Flex>
  );
};

export default SubmitContainer;
