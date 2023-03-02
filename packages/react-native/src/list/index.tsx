import React, { FC, ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import Box from '../box';
import Flex from '../flex';
import { px } from '../helpers/normalize';
import ListItem, { ListItemProps } from '../list-item';
import Text from '../text';
import { Theme } from '../theme';

type ListProps = {
  /** 标题 */
  header?: ReactNode;
  /** 标题右侧内容 */
  extra?: ReactNode;
  /** 列表项 */
  items: ListItemProps[];
  /** 列表项高度 */
  itemHeight?: number;
  /** 列表项背景色 */
  itemBackgroundColor?: keyof Theme['colors'];
};
const List: FC<ListProps> = ({ header, extra, itemBackgroundColor, items = [], itemHeight = px(32) }) => {
  const renderHeader = () => {
    if (!header) return null;
    if (typeof header === 'string') {
      return <ListHeader text={header} extra={extra} />;
    }
    return header;
  };

  return (
    <Box>
      {renderHeader()}
      {items.map((props, index) => {
        const { backgroundColor, ...rest } = props;
        return (
          <ListItem
            key={index}
            minHeight={itemHeight}
            {...rest}
            backgroundColor={backgroundColor ?? itemBackgroundColor}
          />
        );
      })}
    </Box>
  );
};
List.displayName = 'List';

const ListHeader = ({
  text,
  extra,
  textStyle,
  headerStyle,
}: {
  /** 标题文本 */
  text: string;
  /** 自定义右侧内容 */
  extra?: ReactNode;
  /** 文本样式 */
  textStyle?: StyleProp<TextStyle>;
  /** 标题样式 */
  headerStyle?: StyleProp<ViewStyle>;
}) => {
  if (text === '') return null;
  return (
    <Flex
      height={px(36)}
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="x3"
      backgroundColor="gray100"
      style={headerStyle}
    >
      <Box>
        <Text variant="p2" color="gray400" style={textStyle}>
          {text}
        </Text>
      </Box>
      <Box>{extra}</Box>
    </Flex>
  );
};
ListHeader.displayName = 'ListHeader';

export default Object.assign(List, { ListHeader });
