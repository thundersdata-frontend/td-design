import React, { useState } from 'react';
import { Button, Switch } from '@td-design/react-native';
import { View } from 'react-native';

export default () => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <View>
      <Switch
        checked={checked}
        onChange={checked => {
          console.log(checked, 'checked');
          setChecked(checked);
        }}
      />
      <Switch
        checked={checked}
        disabled={true}
        onChange={checked => {
          console.log(checked, 'checked');
          setChecked(checked);
        }}
      />
      <Button
        label={checked + ''}
        onPress={() => {
          setChecked(!checked);
        }}
      ></Button>
    </View>
  );
};
