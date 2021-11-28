import React, { FC, ReactNode } from 'react';
import { ResponsiveValue } from '@shopify/restyle';
import Box from '../box';
import Text from '../text';
import ListItem, { ListItemProps } from '../list-item';
import { px } from '../helpers/normalize';
import { Theme } from '../theme';

type ListProps = {
  header: ReactNode;
  items: ListItemProps[];
  itemBackgroundColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
};
const List: FC<ListProps> = ({ header, itemBackgroundColor, items = [] }) => {
  const renderHeader = () => {
    if (typeof header === 'string') {
      return <Title text={header} />;
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

export default List;

const Title = ({ text }: { text: string }) => (
  <Box height={px(36)} justifyContent="center" paddingLeft="x4" backgroundColor="gray100">
    <Text variant="p2" color="gray400">
      {text}
    </Text>
  </Box>
);
