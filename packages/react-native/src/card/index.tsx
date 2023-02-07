import { useTheme } from '@shopify/restyle';
import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

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
  bodyStyle?: StyleProp<ViewStyle>;
}

const Card: FC<PropsWithChildren<CardProps>> = ({
  icon,
  title,
  extra,
  renderHeader,
  footer,
  hideHeader,
  bodyStyle,
  children,
}) => {
  const theme = useTheme<Theme>();

  const Header = (
    <Flex flex={1} justifyContent="space-between">
      {(icon || title) && (
        <Flex>
          {icon && <Box>{icon}</Box>}
          {title && (
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
      {extra && (
        <Box>
          {typeof extra === 'string' ? (
            <Text variant="p2" color="gray500">
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
    <Box backgroundColor="background" borderWidth={ONE_PIXEL} borderColor="border" style={bodyStyle}>
      {!hideHeader && (
        <Box
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="border"
          paddingHorizontal="x2"
          height={px(40)}
          justifyContent="center"
        >
          {renderHeader ? renderHeader() : Header}
        </Box>
      )}
      <Box
        padding="x2"
        style={
          footer
            ? {
                borderBottomWidth: ONE_PIXEL,
                borderBottomColor: theme.colors.border,
                paddingBottom: theme.spacing.x2,
              }
            : {}
        }
      >
        {children}
      </Box>
      {footer && <Box padding="x2">{footer}</Box>}
    </Box>
  );
};
Card.displayName = 'Card';

export default Card;
