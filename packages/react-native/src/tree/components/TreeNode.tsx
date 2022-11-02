import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import helpers from '../../helpers';
import Flex from '../../flex';
import SvgIcon from '../../svg-icon';
import Text from '../../text';
import Box from '../../box';
import { TreeNodeProps } from '../type';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../../theme';
import Animated from 'react-native-reanimated';
import Chevron from './Chevron';
import { useTreeNode } from './useTreeNode';

const { ONE_PIXEL, px } = helpers;

const TreeNode: FC<TreeNodeProps> = props => {
  const theme = useTheme<Theme>();
  const {
    icon: customIcon,
    level,
    disabled,
    checkable,
    expanded = false,
    title,
    checked = false,
    data,
    showIcon,
  } = props;
  const { progress, style, handlerCheck, onClick } = useTreeNode(props);

  const iconRender = (checked: boolean) => {
    if (customIcon) {
      return customIcon(checked);
    }
    return (
      <SvgIcon
        name={checked ? 'checkcircle' : 'radio-unchecked'}
        color={checked ? theme.colors.primary200 : theme.colors.icon}
      />
    );
  };

  return (
    <Animated.View style={[{ overflow: 'hidden' }, style]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          onClick?.({ expanded, key: data.key, title, checked, disabled });
        }}
      >
        <Box
          height={px(55)}
          backgroundColor="background"
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="border"
          paddingHorizontal="x3"
        >
          <Flex alignItems="center" flex={1} style={{ marginLeft: level * px(16) }}>
            <TouchableOpacity disabled={disabled} onPress={handlerCheck}>
              {checkable && iconRender(checked)}
            </TouchableOpacity>

            <Box flex={1} marginLeft="x1">
              <Text variant="p1" color={disabled ? 'disabled' : 'gray500'}>
                {title}
              </Text>
            </Box>
            {data.children && showIcon && (
              <Chevron {...{ progress }}>
                <SvgIcon name="down" color={theme.colors.icon} />
              </Chevron>
            )}
          </Flex>
        </Box>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TreeNode;
