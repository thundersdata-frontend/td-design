import React, { memo, ReactNode } from 'react';

import { useTheme } from '@shopify/restyle';

import Flex from '../flex';
import Text from '../text';
import { Theme } from '../theme';

const Label = memo(
  ({
    colon,
    label,
    required,
    labelHeight,
  }: {
    colon?: boolean;
    required?: boolean;
    label?: ReactNode;
    labelHeight?: number;
  }) => {
    const theme = useTheme<Theme>();
    const style = {};
    if (labelHeight) {
      Object.assign(style, {
        height: labelHeight,
      });
    } else {
      Object.assign(style, {
        paddingVertical: theme.spacing.x2,
      });
    }

    if (!label) return null;

    if (typeof label === 'string')
      return (
        <Flex marginRight="x2" alignItems="center" style={style}>
          {required && (
            <Text variant="p1" color="func600">
              *
            </Text>
          )}
          <Text variant="p1" color="text">
            {label}
          </Text>
          <Text variant="p1" color="text">
            {colon ? ':' : ''}
          </Text>
        </Flex>
      );

    return (
      <Flex marginRight="x2" style={style}>
        {required && (
          <Text variant="p1" color="func600">
            *
          </Text>
        )}
        {label}
        <Text variant="p1" color="text">
          {colon ? ':' : ''}
        </Text>
      </Flex>
    );
  }
);

export default Label;
