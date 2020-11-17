import React, { useState } from 'react';
import { Button, Icon, Switch, WhiteSpace, helpers } from '@td-design/react-native';
import { View } from 'react-native';
import Iconfont from './Iconfont';

const { px } = helpers;
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
        checkLabel="开"
        uncheckLabel="关"
        onChange={checked => {
          setChecked(checked);
        }}
      />
      <WhiteSpace></WhiteSpace>
      <Switch
        checked={checked}
        checkLabel={<Iconfont name="icon_selected" size={px(24)}></Iconfont>}
        uncheckLabel={<Iconfont name="icon_close" size={px(24)}></Iconfont>}
        onChange={checked => {
          setChecked(checked);
        }}
      />
    </View>
  );
};
