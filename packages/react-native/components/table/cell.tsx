import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { CellProps } from './type';
import { px } from '../helper';

const Cell: FC<CellProps> = props => {
  const { data, width, flex = 1, textStyle, cellStyle, ...resprops } = props;

  const textDom = React.isValidElement(data) ? (
    data
  ) : (
    <Text style={[textStyle, { backgroundColor: 'transparent' }]} {...props} numberOfLines={4} ellipsizeMode="tail">
      {data}
    </Text>
  );

  const borderBottomWidth = resprops && resprops['borderWidth'];
  const borderRightWidth = resprops && resprops['borderWidth'];
  const borderColor = resprops && resprops['borderColor'];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          borderRightWidth,
          borderColor,
          borderBottomWidth,
          paddingVertical: px(5),
          flex: flex,
          width: width,
          overflow: 'hidden',
        },
        cellStyle,
      ]}
    >
      {textDom}
    </View>
  );
};

export default Cell;
