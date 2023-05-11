import React, { cloneElement, FC, isValidElement, memo, ReactElement } from 'react';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import SvgIcon, { IconNames } from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';

const { px } = helpers;
export interface StepProps {
  /** 标题 */
  title?: string;
  /** 介绍 */
  description?: string;
  /** 标签 */
  label?: string;
  /** 节点大小 */
  size?: number;
  /** 图标大小 */
  iconSize?: number;
  /** 图标的状态 */
  status?: 'wait' | 'process' | 'finish' | 'error';
  /** 自定义的icon size会被覆盖建议使用size指定大小 */
  icon?: ReactElement;
  /** 自定义组件，其中style.width会被覆盖建议使用size */
  stepRender?: ReactElement;
  /** 当前的是否进行完全 */
  active?: boolean;
  /** 是否为当前的进度 */
  isCurrent?: boolean;
  /** 是否是最后一个 */
  last?: boolean;
}

const iconType: Record<string, IconNames> = {
  wait: 'ellipsis',
  error: 'close',
  finish: 'check',
  process: 'reload',
};

const Step: FC<StepProps> = ({
  title,
  description,
  size = px(36),
  active = false,
  isCurrent = false,
  last = false,
  status = active ? 'finish' : 'wait',
  icon,
  stepRender,
  iconSize = px(16),
  label,
}) => {
  const theme = useTheme<Theme>();
  /** icon的颜色 */
  const iconColor = {
    wait: theme.colors.primary200,
    error: theme.colors.func600,
    finish: theme.colors.primary200,
    process: theme.colors.primary200,
  };
  /** 活动状态的颜色 */
  const iconActiveColor = iconColor[status];
  /**
   * icon的render
   * 1 判断有没有自定义组件，使用自定义组件
   * 2 判断是否使用自定义的icon
   * 3 更具当前的状态进行选择使用的icon
   * 4 可以使用label
   */
  const iconRender = () => {
    if (!!stepRender && isValidElement(stepRender)) {
      return cloneElement(stepRender as ReactElement, {});
    }

    if (!!icon && isValidElement(icon)) {
      return cloneElement(icon as ReactElement, {
        size: iconSize,
        color: theme.colors.white,
      });
    }
    if (label) {
      return (
        <Text variant="p0" color="gray500">
          {label}
        </Text>
      );
    }
    return <SvgIcon name={iconType[status]} size={iconSize} color={theme.colors.white} />;
  };

  /**
   * 尾巴的样式
   */
  const tailRender = () => {
    if (last) {
      return null;
    }
    if (!active || isCurrent) {
      return (
        <Box borderColor="gray200" borderWidth={1} flex={1} borderStyle="dashed" style={{ marginTop: size / 2 }} />
      );
    }

    return (
      <Box
        height={1}
        flex={1}
        style={{
          backgroundColor: iconActiveColor,
          marginTop: size / 2,
        }}
      />
    );
  };

  return (
    <Flex justifyContent="flex-start" alignItems="flex-start" flex={1}>
      <Box alignItems="center">
        <Box width={size} height={size} borderRadius="x2" alignItems="center" overflow="hidden">
          {stepRender ? (
            iconRender()
          ) : (
            <Box
              width={size}
              height={size}
              justifyContent={'center'}
              alignItems={'center'}
              overflow={'hidden'}
              opacity={active ? 1 : 0.4}
              backgroundColor={status === 'error' ? 'func600' : 'primary200'}
              style={{
                borderRadius: size / 2,
              }}
            >
              {iconRender()}
            </Box>
          )}
        </Box>
        <Box overflow="hidden" marginTop="x1" alignItems="center">
          {!!title && (
            <Text variant="p0" color="gray500" numberOfLines={1}>
              {title}
            </Text>
          )}
          {!!description && (
            <Text variant="p0" color="gray500">
              {description}
            </Text>
          )}
        </Box>
      </Box>
      {tailRender()}
    </Flex>
  );
};

export default memo(Step);
