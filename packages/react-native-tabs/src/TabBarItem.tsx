import React, { forwardRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { TabBarItemProps } from './type';

const TabBarItem = forwardRef<View, TabBarItemProps>((props, ref) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        { justifyContent: 'center', alignItems: 'center', height: '100%' },
        { flex: 1 }, //scrollEnabled
      ]}
    >
      <View ref={ref} style={[{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
        {props.showIcon && !!props.renderIcon && (
          <View style={{ marginRight: 4 }}>{props.renderIcon?.(props.active)}</View>
        )}
        <Text style={props.textStyle}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default TabBarItem;
