import React, { FC, ReactElement, isValidElement, cloneElement } from 'react';
import { View, Text } from 'react-native';
import { Icon, Theme } from '..';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';

interface StepProps {
  // 标题
  title?: string;
  // 介绍
  description?: string;
  // 图标大小
  size?: number;
  // 图标的状态
  status?: 'wait' | 'finish' | 'error';
  // 自定义的icon size会被覆盖建议使用size指定大小
  icon?: ReactElement;
  // 自定义组件，其中style.width会被覆盖建议使用size
  stepRender?: ReactElement;
  // 线的长度
  tailWidth: number;
  // 当前的是否进行完全
  active?: boolean;
  // 是否为当前的进度
  isCurrent?: boolean;
  // 是否是最后一个
  last?: boolean;
  // 排列方式
  direction: 'vertical' | 'horizontal';
  //活动时的颜色
  processrColor?: string;
}

const iconType = {
  wait: 'ellipsis1',
  error: 'close',
  finish: 'check',
};

const Step: FC<StepProps> = props => {
  const {
    title,
    description,
    size = px(16),
    tailWidth,
    active = false,
    isCurrent = false,
    last = false,
    status = active ? 'finish' : 'wait',
    icon,
    direction,
    stepRender,
    processrColor,
  } = props;
  const theme = useTheme<Theme>();
  /** 状态的颜色  */
  const statusColor = status === 'error' ? theme.colors.dangerousColor : theme.colors.primaryColor;
  /** 活动状态的颜色 */
  const activeColor = processrColor ? processrColor : active ? statusColor : theme.colors.borderColor;
  /** 尾巴的颜色 */
  const tailColor = processrColor ? processrColor : status === 'error' ? theme.colors.borderColor : activeColor;

  const wrapFlex = direction === 'horizontal' ? 'column' : 'row';
  const flexDirection = direction === 'horizontal' ? 'row' : 'column';
  /** 文字容器样式 */
  const textWarpStyle = direction === 'horizontal' ? { marginTop: px(5) } : { marginLeft: px(5) };
  /**
   * icon的render
   * 1 判断有没有自定义组件，使用自定义组件
   * 2 判断是否使用自定义的icon
   * 3 更具当前的状态进行选择使用的icon
   *
   */
  const iconRender = () => {
    if (!!stepRender && isValidElement(stepRender)) {
      return cloneElement(stepRender as ReactElement, {});
    }

    if (!!icon && isValidElement(icon)) {
      return cloneElement(icon as ReactElement, {
        size: size,
        color: statusColor,
      });
    }

    return <Icon name={iconType[status]} size={size} color={activeColor} />;
  };

  /**
   * 尾巴的样式
   * 分为横竖两种情况
   * 当前选中中尾巴渲染一半
   */
  const tailRender = () => {
    if (last) {
      return null;
    }
    const lineStyle = {
      height: direction === 'horizontal' ? px(2) : tailWidth,
      width: direction === 'horizontal' ? tailWidth : px(2),
      backgroundColor: theme.colors.borderColor,
    };
    if (isCurrent) {
      const currentStyle = {
        height: direction === 'horizontal' ? px(2) : '50%',
        width: direction === 'horizontal' ? '50%' : px(2),
        backgroundColor: tailColor,
      };
      return (
        <View style={lineStyle}>
          <View style={currentStyle}></View>
        </View>
      );
    }
    return <View style={[lineStyle, { backgroundColor: activeColor }]}></View>;
  };

  return (
    <View style={{ flexDirection: wrapFlex }}>
      <View style={{ flexDirection: flexDirection, alignItems: 'center' }}>
        <View
          style={{
            width: size + px(4),
            height: size + px(4),
            borderRadius: (size + px(4)) / 2,
            borderWidth: px(2),
            borderColor: activeColor,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {iconRender()}
        </View>
        {tailRender()}
      </View>
      <View style={[textWarpStyle, { flex: 1, overflow: 'hidden' }]}>
        {title && (
          <Text style={theme.textVariants.primaryBody} numberOfLines={1}>
            {title}
          </Text>
        )}
        {description && <Text style={theme.textVariants.secondaryBodyReverse}>{description}</Text>}
      </View>
    </View>
  );
};

export default Step;
