import React, { FC, ReactElement, isValidElement, cloneElement } from 'react';
import { View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { px, ONE_PIXEL } from '../helper';
import Icon from '../icon';
import Flex from '../flex';
import Text from '../text';
import Box from '../box';

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
  /** 线的长度 */
  tailWidth?: number;
  /** 当前的是否进行完全 */
  active?: boolean;
  /** 是否为当前的进度 */
  isCurrent?: boolean;
  /** 是否是最后一个 */
  last?: boolean;
}

const iconType = {
  wait: 'ellipsis1',
  error: 'close',
  finish: 'check',
  process: 'reload1',
};

const Step: FC<StepProps> = ({
  title,
  description,
  size = px(36),
  tailWidth = px(10),
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
    wait: theme.colors.flow_wait,
    error: theme.colors.flow_error,
    finish: theme.colors.flow_finish,
    process: theme.colors.flow_process,
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
      return <Text variant="content1">{label}</Text>;
    }
    return <Icon name={iconType[status]} size={iconSize} color={theme.colors.white} />;
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
        <Box
          borderColor="flow_border"
          borderWidth={1}
          width={tailWidth - px(8)}
          marginHorizontal="xs"
          borderStyle="dotted"
          opacity={0.6}
        />
      );
    }

    return (
      <Box
        height={ONE_PIXEL}
        width={tailWidth - px(8)}
        marginHorizontal="xs"
        style={{
          backgroundColor: iconActiveColor,
        }}
      />
    );
  };

  return (
    <Box>
      <Flex>
        <Box width={size} height={size} borderRadius="icon" alignItems="center" overflow="hidden">
          {stepRender ? (
            iconRender()
          ) : (
            <View
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                opacity: active ? 1 : 0.3,
                backgroundColor: status === 'error' ? theme.colors.flow_error : theme.colors.flow_default,
              }}
            >
              {iconRender()}
            </View>
          )}
        </Box>
        {tailRender()}
      </Flex>
      <Box flex={1} overflow="hidden" marginTop="xs">
        {title && (
          <Text variant="content1" numberOfLines={1}>
            {title}
          </Text>
        )}
        {description && <Text variant="content3">{description}</Text>}
      </Box>
    </Box>
  );
};

export default Step;
