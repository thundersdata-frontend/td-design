import { Flex, helpers, Text } from '@td-design/react-native';
import React, { FC, ReactNode } from 'react';

export interface LabelProps {
  label?: ReactNode;
  labelPosition: 'left' | 'top';
  required?: boolean;
}

const { px } = helpers;
export const Label: FC<LabelProps> = ({ label, labelPosition, required }) => {
  if (label) {
    if (typeof label === 'string') {
      return (
        <Flex marginRight="x2" alignItems="center" style={labelPosition === 'left' ? { height: px(40) } : {}}>
          {required && (
            <Text color="func600" marginRight={'x1'}>
              *
            </Text>
          )}
          <Text variant="p1" color="gray500">
            {label}
          </Text>
        </Flex>
      );
    }
    return (
      <Flex marginRight="x2" style={labelPosition === 'left' ? { height: px(40) } : {}}>
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
