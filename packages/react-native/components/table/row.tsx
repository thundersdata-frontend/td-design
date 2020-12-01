import React, { FC, Children, isValidElement, ReactElement, cloneElement } from 'react';
import { RowProps } from './type';
import Cell from './cell';
import { View } from 'react-native';

const Row: FC<RowProps> = props => {
  const { data = [], widthArr = [], flexArr = [], rowStyle = {}, children: childrenProps, ...resProps } = props;

  const children = Children.toArray(childrenProps).filter(child => {
    return isValidElement(child);
  }) as Array<ReactElement>;

  const rowRender = () => {
    return data.map((cell, i) => {
      return <Cell key={i} data={cell} flex={flexArr?.[i] ?? 1} width={widthArr?.[i]} {...resProps} />;
    });
  };

  return (
    <View style={[{ flexDirection: 'row', width: '100%' }, rowStyle]}>
      {rowRender()}
      {children.map((child, i) => {
        return cloneElement(child, {
          width: widthArr?.[data.length + i],
          ...resProps,
          ...child.props,
        });
      })}
    </View>
  );
};

export default Row;
