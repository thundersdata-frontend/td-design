import React, { FC, ReactNode } from 'react';
import { ResponsiveValue } from '@shopify/restyle';
import Box from '../box';
import Text from '../text';
import Flex from '../flex';
import ListItem, { ListItemProps } from '../list-item';
import { px } from '../helpers/normalize';
import { Theme } from '../theme';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type ListProps = {
  header?: ReactNode;
  extra?: ReactNode;
  items: ListItemProps[];
  itemBackgroundColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
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
        const { backgroundColor, ...rest } = props;
        return <ListItem key={index} {...rest} backgroundColor={backgroundColor ?? itemBackgroundColor} />;
      })}
    </Box>
  );
};

const ListHeader = ({
  text,
  extra,
  textStyle,
  headerStyle,
}: {
  text: string;
  extra?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
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

export default Object.assign(List, { ListHeader });
