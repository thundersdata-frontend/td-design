import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';

const { px, ONE_PIXEL } = helpers;
export interface CardProps {
  /** 图标 */
  icon?: ReactNode;
  /** 标题 */
  title?: ReactNode;
  /** 标题右边内容 */
  extra?: ReactNode;
  /** 自定义渲染标题 */
  renderHeader?: () => ReactNode;
  /** 是否隐藏标题 */
  hideHeader?: boolean;
  /** 底部内容 */
  footer?: ReactNode;
  /** 容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
  /** 容器内content样式 */
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * Card 组件由Header（可选）/Content/Footer（可选）三部分组成
 * @param param0
 * @returns
 */
const Card: FC<PropsWithChildren<CardProps>> = ({
  icon,
  title,
  extra,
  renderHeader,
  footer,
  hideHeader,
  containerStyle,
  contentStyle,
  children,
}) => {
  const theme = useTheme<Theme>();

  const _renderHeader = () => {
    if (hideHeader) return null;

    const Header = (
      <Flex flex={1} justifyContent="space-between">
        {!!(icon || title) && (
          <Flex>
            {!!icon && <Box>{icon}</Box>}
            {!!title && (
              <Box>
                {typeof title === 'string' ? (
                  <Text variant="p0" color="gray500">
                    {title}
                  </Text>
                ) : (
                  title
                )}
              </Box>
            )}
          </Flex>
        )}
        {!!extra && (
          <Box>
            {typeof extra === 'string' ? (
              <Text variant="p2" selectable color="gray500">
                {extra}
              </Text>
            ) : (
              extra
            )}
          </Box>
        )}
      </Flex>
    );

    return (
      <Box
        borderBottomWidth={ONE_PIXEL}
        borderBottomColor="border"
        paddingHorizontal="x2"
        height={px(40)}
        justifyContent="center"
      >
        {renderHeader ? renderHeader() : Header}
      </Box>
    );
  };

  const _renderBody = () => {
    return (
      <Box
        padding="x2"
        style={
          footer
            ? StyleSheet.compose(
                {
                  borderBottomWidth: ONE_PIXEL,
                  borderBottomColor: theme.colors.border,
                  paddingBottom: theme.spacing.x2,
                },
                contentStyle
              )
            : contentStyle
        }
      >
        {children}
      </Box>
    );
  };

  const _renderFooter = () => {
    if (!!footer) return <Box padding="x2">{footer}</Box>;
    return null;
  };

  return (
    <Box
      backgroundColor="background"
      borderWidth={ONE_PIXEL}
      borderColor="border"
      borderRadius={'x2'}
      style={containerStyle}
    >
      {_renderHeader()}
      {_renderBody()}
      {_renderFooter()}
    </Box>
  );
};
Card.displayName = 'Card';

export default Card;
