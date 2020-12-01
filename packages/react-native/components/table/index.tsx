import React, { FC, Children, isValidElement, cloneElement, ReactElement } from 'react';
import { View } from 'react-native';
import { TableProps } from './type';
import Row from './row';
import Cell from './cell';

const Table: FC<TableProps> = props => {
  const {
    borderWidth = 1,
    borderColor = '#000',
    children: childrenProp,
    flexArr,
    widthArr,
    textStyle = {},
    tableStyle = {},
    cellStyle = {},
  } = props;

  const children = Children.toArray(childrenProp).filter(child => {
    return isValidElement(child);
  }) as Array<ReactElement>;

  return (
    <View
      style={[
        {
          borderLeftWidth: borderWidth,
          borderTopWidth: borderWidth,
          borderColor: borderColor,
        },
        tableStyle,
      ]}
    >
      {children.map(child => {
        return cloneElement(
          child,
          child.type['displayName'] !== 'ScrollView'
            ? {
                flexArr,
                widthArr,
                borderWidth,
                borderColor,
                textStyle,
                cellStyle,
                ...child.props,
              }
            : {}
        );
      })}
    </View>
  );
};

export default Object.assign(Table, {
  Row,
  Cell,
});
