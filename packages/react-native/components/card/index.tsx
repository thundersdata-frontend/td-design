import { useTheme } from '@shopify/restyle';
import React, { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from '../config/theme';
import Box from '../box';
import Flex from '../flex';
import Text from '../text';

interface CardProps {
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
}

const Card: FC<CardProps> = ({ icon, title, extra, renderHeader, footer, hideHeader, children }) => {
  const theme = useTheme<Theme>();

  const Header = (
    <Flex flex={1} justifyContent="space-between">
      {(icon || title) && (
        <Flex>
          {icon && <Box>{icon}</Box>}
          {title && <Box>{typeof title === 'string' ? <Text variant="primaryBody">{title}</Text> : title}</Box>}
        </Flex>
      )}
      {extra && <Box>{typeof extra === 'string' ? <Text variant="secondaryBodyReverse">{extra}</Text> : extra}</Box>}
    </Flex>
  );

  return (
    <Box backgroundColor="white" padding="m">
      {!hideHeader && (
        <Box
          borderBottomWidth={StyleSheet.hairlineWidth}
          borderBottomColor="borderColor"
          paddingBottom="s"
          marginBottom="s"
        >
          {renderHeader ? renderHeader() : Header}
        </Box>
      )}
      <Box
        style={
          footer
            ? {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme.colors.borderColor,
                paddingBottom: theme.spacing.s,
              }
            : {}
        }
      >
        {children}
      </Box>
      {footer}
    </Box>
  );
};

export default Card;
