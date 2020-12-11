import React, { FC, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import Text from '../text';
import { ONE_PIXEL, px } from '../helper';
import { Theme } from '../config/theme';

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
  bodyStyle?: StyleProp<ViewStyle>;
}

const Card: FC<CardProps> = ({ icon, title, extra, renderHeader, footer, hideHeader, bodyStyle, children }) => {
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
    <Box backgroundColor="white" borderWidth={ONE_PIXEL} borderColor="borderColor" style={bodyStyle}>
      {!hideHeader && (
        <Box
          borderBottomWidth={ONE_PIXEL}
          borderBottomColor="borderColor"
          paddingHorizontal="s"
          height={px(40)}
          justifyContent="center"
        >
          {renderHeader ? renderHeader() : Header}
        </Box>
      )}
      <Box
        padding="s"
        style={
          footer
            ? {
                borderBottomWidth: ONE_PIXEL,
                borderBottomColor: theme.colors.borderColor,
                paddingBottom: theme.spacing.s,
              }
            : {}
        }
      >
        {children}
      </Box>
      {footer && <Box paddingHorizontal="s">{footer}</Box>}
    </Box>
  );
};

export default Card;
