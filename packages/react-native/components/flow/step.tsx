import React, { FC, ReactElement, isValidElement, cloneElement } from 'react';
import { View, Text } from 'react-native';
import { Icon, Theme } from '..';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';
import LinearGradient from 'react-native-linear-gradient';

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
  tailWidth,
  active = false,
  isCurrent = false,
  last = false,
  status = isCurrent ? 'process' : active ? 'finish' : 'wait',
  icon,
  stepRender,
  activeColor,
  iconSize = px(16),
  label,
}) => {
  const theme = useTheme<Theme>();
  /** icon的颜色 */
  const iconColor = {
    wait: theme.colors.primaryColor,
    error: theme.colors.fail,
    finish: theme.colors.primaryColor,
    process: theme.colors.primaryColor,
  };
  /** 活动状态的颜色 */
  const iconActiveColor = activeColor ? activeColor : iconColor[status];
  const LinearColor =
    status === 'error'
      ? [theme.colors.fail, theme.colors.fail]
      : [theme.colors.secondaryColor, theme.colors.primaryColor];
  /**
   * icon的render
   * 1 判断有没有自定义组件，使用自定义组件
   * 2 判断是否使用自定义的icon
   * 3 更具当前的状态进行选择使用的icon
   * 4 可以使用label
   *
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
      return <Text style={theme.textVariants.primaryBodyReverse}>{label}</Text>;
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
        <View
          style={{
            borderColor: theme.colors.primaryColor,
            borderWidth: px(0.5),
            width: tailWidth - px(8),
            marginHorizontal: px(4),
            borderStyle: 'dashed',
            opacity: 0.3,
          }}
        />
      );
    }

    return (
      <View
        style={{
          height: px(1),
          width: tailWidth - px(8),
          marginHorizontal: px(4),
          backgroundColor: iconActiveColor,
        }}
      />
    );
  };

  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {stepRender ? (
            iconRender()
          ) : (
            <LinearGradient
              style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                opacity: active ? 1 : 0.3,
              }}
              colors={LinearColor}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {iconRender()}
            </LinearGradient>
          )}
        </View>
        {tailRender()}
      </View>
      <View style={{ flex: 1, overflow: 'hidden', marginTop: px(5) }}>
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
