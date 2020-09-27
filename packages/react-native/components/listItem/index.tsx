import React, { FC, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import Item from './Item';
import Box from '../box';
import Text from '../text';
import { Theme } from '../config/theme';
import { px } from '../helper';

interface CustomItemProps {
  /** 主标题  */
  title: ReactNode | string;
  /** 右面的文字或组件  */
  extra?: ReactNode | string;
  /** 主标题下面的副标题  */
  brief?: string | ReactNode;
  /** 缩略图  */
  thumb?: ReactNode | null;
  /** 按下的回调函数  */
  onPress?: () => void;
  /** 自定义style  */
  style?: StyleProp<ViewStyle>;
  /** 提交表单时是否处于error状态，为true时title会标记为红色  */
  isError?: boolean;
  /** 是否必填，必填显示红色*号 */
  required?: boolean;
  /** 是否显示右边箭头  */
  arrow?: boolean;
  /** 是否折行  */
  wrap?: boolean;
  /** 显示多行，与wrap搭配使用  */
  multipleLine?: boolean;
}

interface BriefBasePropsType {
  children?: ReactNode;
  /** 是否折行  */
  wrap?: boolean;
}

interface ListItemTextProps {
  text?: string;
  /** 是否必填，必填显示红色*号 */
  required?: boolean;
  /* 标记为红色  */
  isError?: boolean;
}

const Brief: FC<BriefBasePropsType> = props => {
  const theme = useTheme<Theme>();
  const { children, wrap } = props;
  let numberOfLines = {};

  if (wrap === false) {
    numberOfLines = {
      numberOfLines: 1,
    };
  }
  return (
    <Box>
      <Text {...numberOfLines} style={{ color: theme.colors.primaryTipColor, fontSize: px(12) }}>
        {children}
      </Text>
    </Box>
  );
};

const ListItemText: FC<ListItemTextProps> = props => {
  const theme = useTheme<Theme>();
  const { isError, required, text } = props;
  return (
    <Text
      style={{
        fontSize: px(16),
        fontWeight: '400',
        color: isError ? theme.colors.dangerousColor : theme.colors.primaryTextColor,
      }}
    >
      {required ? <Text style={{ color: theme.colors.dangerousColor }}>*</Text> : null}
      {text}
    </Text>
  );
};

const CustomListItem = ({
  title,
  brief,
  thumb,
  onPress,
  style,
  extra,
  isError,
  arrow = true,
  wrap = false,
  required = false,
  multipleLine = false,
}: CustomItemProps) => {
  const childrenComp = brief ? (
    <>
      {typeof title === 'string' ? <ListItemText required={required} isError={isError} text={title} /> : title}
      <Brief>{brief}</Brief>
    </>
  ) : (
    <>{typeof title === 'string' ? <ListItemText required={required} isError={isError} text={title} /> : title}</>
  );

  return (
    <Item
      style={style}
      thumb={thumb}
      extra={extra}
      wrap={wrap}
      multipleLine={multipleLine}
      arrow={arrow ? onPress && 'horizontal' : ''}
      onPress={onPress}
    >
      {childrenComp}
    </Item>
  );
};

export default CustomListItem;
