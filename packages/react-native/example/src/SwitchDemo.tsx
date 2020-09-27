import React, { useState } from 'react';
import { Button, Icon, Switch, WhiteSpace } from '@td-design/react-native';
import { View } from 'react-native';
import Iconfont from './Iconfont';

export default () => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <View style={{ flex: 1 }}>
      <WhiteSpace></WhiteSpace>
      <Switch
        checked={checked}
        onChange={checked => {
          setChecked(checked);
        }}
      />
      <WhiteSpace></WhiteSpace>
      <Switch
        checked={checked}
        disabled
        onChange={checked => {
          setChecked(checked);
        }}
      />
      <WhiteSpace></WhiteSpace>
      <Switch
        checked={checked}
        color="#875467"
        onChange={checked => {
          setChecked(checked);
        }}
      />
      <WhiteSpace></WhiteSpace>
      <Switch
        checked={checked}
        circleActive="开"
        circleInactive="关"
        onChange={checked => {
          setChecked(checked);
        }}
      />
      <WhiteSpace></WhiteSpace>
      <Switch
        checked={checked}
        circleActive={<Iconfont name="icon_selected" size={24}></Iconfont>}
        circleInactive={<Iconfont name="icon_close"></Iconfont>}
        onChange={checked => {
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
