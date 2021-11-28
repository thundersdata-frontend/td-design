import React, { FC, ReactNode } from 'react';
import { ResponsiveValue } from '@shopify/restyle';
import Box from '../box';
import Text from '../text';
import ListItem, { ListItemProps } from '../list-item';
import { px } from '../helpers/normalize';
import { Theme } from '../theme';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type ListProps = {
  header: ReactNode;
  items: ListItemProps[];
  itemBackgroundColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
};
const List: FC<ListProps> = ({ header, itemBackgroundColor, items = [] }) => {
  const renderHeader = () => {
    if (typeof header === 'string') {
      return <ListHeader text={header} />;
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
  textStyle,
  headerStyle,
}: {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  headerStyle?: StyleProp<ViewStyle>;
}) => {
  const Container: FC = ({ children }) =>
    headerStyle ? (
      <Box style={headerStyle}>{children}</Box>
    ) : (
      <Box height={px(36)} justifyContent="center" paddingLeft="x4" backgroundColor="gray100">
        {children}
      </Box>
    );
  const Content: FC = () =>
    textStyle ? (
      <Text style={textStyle}>{text}</Text>
    ) : (
      <Text variant="p2" color="gray400">
        {text}
      </Text>
    );
  return (
    <Container>
      <Content />
    </Container>
  );
};

export default Object.assign(List, { ListHeader });
