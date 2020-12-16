import React, { useState } from 'react';
import { Switch, WhiteSpace, helpers } from '@td-design/react-native';
import Iconfont from '../Iconfont';
import Container from '../components/Container';
import { ScrollView, Switch as SwitchRN } from 'react-native';

const { px } = helpers;
export default () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [checked1, setChecked1] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const [checked3, setChecked3] = useState<boolean>(false);
  const [checked4, setChecked4] = useState<boolean>(true);
  const [checked5, setChecked5] = useState<boolean>(true);
  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Switch
          checked={checked}
          onChange={checked => {
            setChecked(checked);
          }}
        />
        <WhiteSpace />
        <Switch
          checked={checked1}
          disabled
          onChange={checked => {
            setChecked1(checked);
          }}
        />
        <WhiteSpace />
        <Switch
          checked={checked2}
          color="#875467"
          onChange={checked => {
            setChecked2(checked);
          }}
        />
        <WhiteSpace />
        <Switch
          checked={checked3}
          checkLabel="开"
          uncheckLabel="关"
          onChange={checked => {
            setChecked3(checked);
          }}
        />
        <WhiteSpace />
        <Switch
          checked={checked4}
          checkLabel={<Iconfont name="icon_selected" size={px(24)}></Iconfont>}
          uncheckLabel={<Iconfont name="icon_close" size={px(24)}></Iconfont>}
          onChange={checked => {
            setChecked4(checked);
          }}
        />
        <WhiteSpace />
        <SwitchRN
          value={checked5}
          onValueChange={e => {
            setChecked5(e);
          }}
        />
      </ScrollView>
    </Container>
  );
};
