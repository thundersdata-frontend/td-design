import React, { FC, ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import ListItem, { ListItemProps } from '../list-item';
import Text from '../text';

const { ONE_PIXEL } = helpers;

type ListProps = {
  /** 标题 */
  header?: ReactNode;
  /** 标题右侧内容 */
  extra?: ReactNode;
  /** 列表项 */
  items: ListItemProps[];
  /** 列表项背景色 */
  itemBackgroundColor?: string;
};
const List: FC<ListProps> = ({ header, extra, itemBackgroundColor, items = [] }) => {
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
        return <ListItem key={index} {...props} backgroundColor={itemBackgroundColor} />;
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
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="x2"
      paddingVertical={'x2'}
      backgroundColor="white"
      borderBottomWidth={ONE_PIXEL}
      borderColor={'border'}
      style={headerStyle}
    >
      <Box>
        <Text variant="p1" color="text" style={textStyle}>
          {text}
        </Text>
      </Box>
      <Box>{extra}</Box>
    </Flex>
  );
};
ListHeader.displayName = 'ListHeader';

export default Object.assign(List, { ListHeader });
