import React, { FC, ReactNode } from 'react';

import { Flex, Text } from '@td-design/react-native';

export interface LabelProps {
  label?: ReactNode;
  required?: boolean;
}

export const Label: FC<LabelProps> = ({ label, required }) => {
  if (label) {
    if (typeof label === 'string') {
      return (
        <Flex marginRight="x2" alignItems="center" paddingBottom="x1">
          {required && (
            <Text color="func600" marginRight={'x1'}>
              *
            </Text>
          )}
          <Text variant="p1" color="text">
            {label}
          </Text>
        </Flex>
      );
    }
    return (
      <Flex marginRight="x2" paddingBottom="x1">
        {required && (
          <Text color="func600" marginRight={'x1'}>
            *
          </Text>
        )}
        {label}
      </Flex>
    );
  }
  return null;
};
