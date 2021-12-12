import React, { forwardRef } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

import { TabItemProps } from './type';

const TabItem = forwardRef<View, TabItemProps>((props, ref) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[{ justifyContent: 'center', alignItems: 'center' }, props.scrollEnabled ? {} : { flex: 1 }]}
    >
      <View ref={ref}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default TabItem;
