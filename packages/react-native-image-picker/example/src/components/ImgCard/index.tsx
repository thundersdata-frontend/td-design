import React, { FC } from 'react';
import { helpers, Image, Box, Text } from '@td-design/react-native';
import { Source } from 'react-native-fast-image';

const { px } = helpers;
export const ImgCard: FC<{ title: string; source?: number | Source }> = ({ title, source }) => {
  return (
    <Box
      borderWidth={1}
      borderColor="border"
      borderStyle="dashed" // only works when borderRadius is configured.
      borderRadius="x1"
      width={px(164)}
      height={px(102)}
      backgroundColor="gray50"
      justifyContent="center"
      alignItems="center"
    >
      <Image source={source ?? require('./assets/card-img-default.jpg')} style={{ width: px(124), height: px(64) }} />
      <Text variant="p2" color="gray500" marginTop="x1">
        {title}
      </Text>
    </Box>
  );
};
