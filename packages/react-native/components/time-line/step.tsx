import React, { FC, ReactElement, isValidElement, cloneElement } from 'react';
import { View, Text } from 'react-native';
import { Theme } from '..';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';

const Step: FC<StepProps> = ({
  title,
  description,
  size = px(16),
  tailWidth,
  active = false,
  isCurrent = false,
  last = false,
  icon,
  stepRender,
  activeColor,
}) => {
  const theme = useTheme<Theme>();

  /** 活动状态的颜色 */
  const iconActiveColor = activeColor ? activeColor : active ? theme.colors.primaryColor : theme.colors.borderColor;
  /**
   * icon的render
   * 1 判断有没有自定义组件，使用自定义组件
   * 2 判断是否使用自定义的icon
   *
   */
  const iconRender = () => {
    if (!!stepRender && isValidElement(stepRender)) {
      return cloneElement(stepRender as ReactElement, {});
    }

    if (!!icon && isValidElement(icon)) {
      return cloneElement(icon as ReactElement, {
        size: size,
        color: iconActiveColor,
      });
    }

    return null;
  };

  /**
   * 尾巴的样式
   */
  const tailRender = () => {
    if (last) {
      return null;
    }
    const lineStyle = {
      height: tailWidth,
      width: px(2),
      backgroundColor: theme.colors.borderColor,
    };
    if (isCurrent) {
      return <View style={lineStyle}></View>;
    }
    return <View style={[lineStyle, { backgroundColor: iconActiveColor }]}></View>;
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View
          style={{
            width: size + px(4),
            height: size + px(4),
            borderRadius: (size + px(4)) / 2,
            borderWidth: px(2),
            borderColor: iconActiveColor,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {iconRender()}
        </View>
        {tailRender()}
      </View>
      <View style={{ marginLeft: px(5), flex: 1, overflow: 'hidden' }}>
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
