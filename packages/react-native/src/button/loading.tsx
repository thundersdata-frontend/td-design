import React, { FC } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ButtonType } from '.';
import { useTheme } from '@shopify/restyle';
import { Theme } from '..';
import { px } from '../helper';

interface LoadingProps {
  loading: boolean;
  type: ButtonType;
}

const Loading: FC<LoadingProps> = ({ loading, type }) => {
  const theme = useTheme<Theme>();
  const roundColor = theme.colors[['default', 'link'].includes(type) ? 'primaryColor' : 'white'];

  return loading ? <ActivityIndicator style={{ marginRight: px(6) }} size="small" color={roundColor} /> : <View />;
};

export default Loading;
